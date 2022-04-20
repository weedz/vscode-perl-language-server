import { CompletionItem, CompletionItemKind, DefinitionLink, DefinitionParams, DocumentSymbol, DocumentSymbolParams, Position, SymbolInformation, SymbolKind, TextDocumentIdentifier, TextDocumentPositionParams, WorkspaceSymbolParams } from "vscode-languageserver";
import { DEBUG_MEASURE_SINGLE_FILE, DEBUG_MEASURE_TIME, getDocument } from "./config";

interface Location {
	file: string
	line: number
}

interface Packages {
	[packageName: string]: {
		locations: Location[]
		packages: {
			[packageName: string]: number
		}
		functions: string[]
	}
}

interface Functions {
	[packageAndFunction: string]: Location[]
}

interface Files {
	[filePath: string]: {
		packages: Array<{
			packageName: string
			line: number
		}>
		functions: {
			[functionName: string]: {
				line: number
				endLine: number
			}
		}
	}
}

const PACKAGES: Packages = {
	main: {
		locations: [],
		functions: [],
		packages: {},
	}
};
const FUNCTIONS: Functions = {};
const FILES: Files = {};


export function onDocumentSymbol(symbolParams: DocumentSymbolParams): DocumentSymbol[] {
	DEBUG_MEASURE_TIME && console.time("onDocumentSymbol()");

	const documentURI = symbolParams.textDocument.uri;
	if (!FILES[documentURI]) {
		DEBUG_MEASURE_TIME && console.timeEnd("onDocumentSymbol()");
		return [];
	}

	const symbols: DocumentSymbol[] = Object.entries(FILES[documentURI].functions).map(([f, position]) => {
		const seperatorPosition = f.lastIndexOf("::");
		const functionName = seperatorPosition !== -1 ? f.slice(seperatorPosition + 2) : f;
		return {
			kind: SymbolKind.Function,
			name: functionName,
			detail: f,
			range: {
				start: {
					line: position.line - 1,
					character: 0
				},
				end: {
					line: position.endLine - 1,
					character: functionName.length + 4
				}
			},
			selectionRange: {
				start: {
					line: position.line - 1,
					character: 0
				},
				end: {
					line: position.line - 1,
					character: functionName.length + 4
				}
			}
		};
	});

	for (const p of FILES[documentURI].packages) {
		const range = {
			start: {
				line: p.line - 1,
				character: 0,
			},
			end: {
				line: p.line - 1,
				character: p.packageName.length + 8,
			}
		};
		symbols.push({
			kind: SymbolKind.Package,
			name: p.packageName,
			range,
			selectionRange: range
		});
	}

	DEBUG_MEASURE_TIME && console.timeEnd("onDocumentSymbol()");

	return symbols;
}

export function onWorkspaceSymbol(symbolParams: WorkspaceSymbolParams): SymbolInformation[] {
	DEBUG_MEASURE_TIME && console.time("workspace-symbols");

	const query = symbolParams.query.toLowerCase();
	if (query.length === 0) {
		DEBUG_MEASURE_TIME && console.timeEnd("workspace-symbols");
		return [];
	}

	const symbols: SymbolInformation[] = [];

	for (const [functionName, positions] of Object.entries(FUNCTIONS)) {
		if (!functionName.toLowerCase().includes(query)) {
			continue;
		}
		for (const position of positions) {
			symbols.push({
				kind: SymbolKind.Function,
				name: functionName,
				location: {
					uri: position.file,
					range: {
						start: {
							line: position.line - 1,
							character: 0,
						},
						end: {
							line: position.line,
							character: 0,
						},
					}
				}
			});
		}
	}

	for (const [packageName, p] of Object.entries(PACKAGES)) {
		if (!packageName.toLowerCase().includes(query)) {
			continue;
		}
		for (const position of p.locations) {
			symbols.push({
				kind: SymbolKind.Package,
				name: packageName,
				location: {
					uri: position.file,
					range: {
						start: {
							line: position.line - 1,
							character: 0,
						},
						end: {
							line: position.line,
							character: 0,
						},
					}
				}
			});
		}
	}

	DEBUG_MEASURE_TIME && console.timeEnd("workspace-symbols");
	return symbols;
}

export function onDefinition(definition: DefinitionParams): DefinitionLink[] {
	DEBUG_MEASURE_TIME && console.time("onDefinition()");

	const word = getIdentifierNameAtPosition(definition.textDocument, definition.position);
	if (!word?.identifier) {
		DEBUG_MEASURE_TIME && console.timeEnd("onDefinition()");
		return [];
	}
	let identifier = word.identifier;

	
	const definitions: DefinitionLink[] = [];
	
	// Resolve something like Obj::A->new() to Obj::A::new
	if (!identifier.includes("::")) {
		if (word.line.substring(word.startIndex - 2, word.startIndex) === "->") {
			const instance = getIdentifierNameFromLine(word.line, { line: 0, character: word.startIndex - 2 });
			if (PACKAGES[instance.identifier]) {
				identifier = `${instance.identifier}::${identifier}`;
			}
		}
	}

	if (!identifier.includes("::")) {
		// Find package scoped functions
		const filePackage = FILES[definition.textDocument.uri];
		for (const p of filePackage.packages) {
			const funcs = FUNCTIONS[`${p.packageName}::${identifier}`] || [];
			for (const f of funcs.filter(f => f.file === definition.textDocument.uri)) {
				definitions.push(createDefinition(identifier, f, 4));
			}
		}
	}
	if (FUNCTIONS[identifier]) {
		for (const f of FUNCTIONS[identifier]) {
			definitions.push(createDefinition(identifier, f, 4));
		}
	} else {
		// Lookup package
		if (PACKAGES[identifier]) {
			for (const location of PACKAGES[identifier].locations) {
				for (const p of FILES[location.file].packages.filter(p => p.packageName === identifier)) {
					definitions.push(createDefinition(identifier, location, 8));
				}
			}
		}
	}

	if (!definitions.length) {
		for (const [f, locations] of Object.entries(FUNCTIONS)) {
			if (f.endsWith(identifier)) {
				definitions.push(...locations.map(position => createDefinition(f, position, 4)));
			}
		}
	}

	DEBUG_MEASURE_TIME && console.timeEnd("onDefinition()");

	return definitions;
}

function createDefinition(definitionName: string, location: Location, prefixLength: number) {
	return {
		targetUri: location.file,
		targetRange: {
			start: {
				line: location.line - 1,
				character: 0
			},
			end: {
				line: location.line - 1,
				character: definitionName.length + prefixLength
			}
		},
		targetSelectionRange: {
			start: {
				line: location.line - 1,
				character: 0
			},
			end: {
				line: location.line - 1,
				character: definitionName.length + prefixLength
			}
		},
	};
}

export function onCompletion(textDocumentPosition: TextDocumentPositionParams): CompletionItem[] {
	DEBUG_MEASURE_TIME && console.time("onCompletion");

	const word = getIdentifierNameAtPosition(textDocumentPosition.textDocument, textDocumentPosition.position);
	const identifier = word?.identifier;
	if (identifier === undefined || word?.line.startsWith("sub ")) {
		DEBUG_MEASURE_TIME && console.timeEnd("onCompletion");
		return [];
	}

	const documentURI = textDocumentPosition.textDocument.uri;

	let packages: CompletionItem[] = [];
	const functions: CompletionItem[] = [];

	if (identifier.includes("::")) {
		const packageName = identifier.slice(0, identifier.lastIndexOf("::"));
		if (PACKAGES[packageName]) {
			const flatPackageTree = getFlatPackageTree(packageName).filter(p => p !== packageName);
			packages = flatPackageTree.map(p => ({
				label: p,
				kind: CompletionItemKind.Module,
				insertText: p.substring(packageName.length + 2), // skip "parent" package name and "::"
			}));

			for (const f of PACKAGES[packageName].functions) {
				functions.push({
					label: f,
					kind: CompletionItemKind.Function,
				});
			}
		}
	} else {
		packages = Object.keys(PACKAGES).map(p => ({
			label: p,
			kind: CompletionItemKind.Module,
		}));

		for (const p of FILES[documentURI].packages) {
			for (const f of PACKAGES[p.packageName].functions) {
				functions.push({
					label: f,
					detail: `${p.packageName}::${f}`,
					kind: CompletionItemKind.Function,
				});
			}
		}
	}

	// The pass parameter contains the position of the text document in
	// which code complete got requested. For the example we ignore this
	// info and always provide the same completion items.

	DEBUG_MEASURE_TIME && console.timeEnd("onCompletion");

	return functions.concat(packages);
}

function objectIsEmpty(obj: any) {
	for (const key in obj) {
		return false;
	}
	return true;
}

function getFlatPackageTree(packageName: string) {
	if (objectIsEmpty(PACKAGES[packageName].packages)) {
		return [packageName];
	}
	const packages: string[] = [];
	if (PACKAGES[packageName].functions.length) {
		packages.push(packageName);
	}
	for (const p of Object.keys(PACKAGES[packageName].packages)) {
		packages.push(...getFlatPackageTree(`${packageName}::${p}`));
	}

	return packages;
}


function getTargetLineInDocument(textDocument: TextDocumentIdentifier, position: Position) {
	const documentURI = textDocument.uri;
	const document = getDocument(documentURI);
	if (!document) {
		return;
	}

	return document.getText({
		start: {
			line: position.line,
			character: 0,
		},
		end: {
			line: position.line + 1,
			character: 0,
		}
	});
}

function getIdentifierNameFromLine(line: string, position: Position) {
	const prefix = line.substring(0, position.character);
	const suffix = line.substring(position.character).trimEnd();

	const prefixRegExp = prefix.match(/[^a-zA-Z0-9_:]?([a-zA-Z0-9_:]+)$/);
	const prefixMatch = prefixRegExp?.[1] || prefix;
	const suffixMatch = suffix.search(/[^a-zA-Z0-9_]/);

	const identifier = prefixMatch.concat(suffixMatch !== -1 ? suffix.substring(0, suffixMatch) : suffix);

	return {
		startIndex: prefixRegExp && prefixRegExp.index ? prefixRegExp.index + 1 : 0,
		endIndex: suffixMatch !== -1 ? suffixMatch : line.length,
		line,
		identifier,
	};
}
function getIdentifierNameAtPosition(textDocument: TextDocumentIdentifier, position: Position) {
	const currentLine = getTargetLineInDocument(textDocument, position);
	if (currentLine === undefined) {
		return;
	}

	return getIdentifierNameFromLine(currentLine, position);
}

const defs = {
	function: /^\s*sub\s+([a-zA-Z0-9_]+)/,
	package: /^package\s+([a-zA-Z0-9:_]+);/m,
};

function processContent(documentURI: string, content: string) {
	if (FILES[documentURI]) {
		console.log("already read this file:", documentURI);
		return;
	}

	// This holds the current "active" package name
	let filePackageName = "";

	let lastFunctionName: string | null = null;

	const lines = content.split("\n");
	const packages: Files[0]["packages"] = [];
	const functions: Files[0]["functions"] = {};
	for (let i = 0; i < lines.length; ++i) {
		const line = lines[i];

		const packageName = line.match(defs.package)?.[1];
		if (packageName) {
			packages.push({
				packageName: packageName,
				line: i + 1
			});

			const packageTree = packageName.split("::");

			// Set all PACKAGES for packageTree and PACKAGES[0].packages
			for (let i = 0; i < packageTree.length; ++i) {
				const fullPackageTree = packageTree.slice(0, i+1).join("::");

				if (!PACKAGES[fullPackageTree]) {
					PACKAGES[fullPackageTree] = {
						locations: [],
						packages: {},
						functions: [],
					};
				}
			
				if (i < packageTree.length - 1) {
					// FIXME: This is not the nicest thing i've seen...
					if (PACKAGES[fullPackageTree].packages[packageTree[i+1]]) {
						PACKAGES[fullPackageTree].packages[packageTree[i+1]]++;
					} else {
						PACKAGES[fullPackageTree].packages[packageTree[i+1]] = 1;
					}
				}
			}
			PACKAGES[packageName].locations.push({
				file: documentURI,
				line: i + 1
			});

			filePackageName = packageName;
		}
		const functionDefinition = line.match(defs.function)?.[1];
		if (functionDefinition) {
			if (!filePackageName) {
				// Assume a missing "main" package definition
				filePackageName = "main";
				packages.push({
					packageName: filePackageName,
					line: 1,
				});
				PACKAGES[filePackageName].locations.push({
					file: documentURI,
					line: 1
				});
			}
			PACKAGES[filePackageName].functions.push(functionDefinition);

			if (lastFunctionName) {
				functions[lastFunctionName].endLine = i;
			}

			const packageAndFunction = `${filePackageName}::${functionDefinition}`;

			lastFunctionName = packageAndFunction;

			if (!FUNCTIONS[packageAndFunction]) {
				FUNCTIONS[packageAndFunction] = [];
			}

			FUNCTIONS[packageAndFunction].push({
				file: documentURI,
				line: i + 1,
			});

			functions[packageAndFunction] = {
				line: i + 1,
				endLine: i + 1,
			};
		}
	}

	if (lastFunctionName) {
		functions[lastFunctionName].endLine = lines.length;
	}

	FILES[documentURI] = {
		packages,
		functions
	};
}

// TODO: Move this to a Worker thread?
export function readSingleFile(fullPath: string, fileContent: string) {
	DEBUG_MEASURE_TIME && DEBUG_MEASURE_SINGLE_FILE && console.time(`process: ${fullPath}`);
	processContent(fullPath, fileContent);
	DEBUG_MEASURE_TIME && DEBUG_MEASURE_SINGLE_FILE && console.timeEnd(`process: ${fullPath}`);
}

export function clearDefinitions(documentURI: string) {
	const file = FILES[documentURI];
	if (!file) {
		return;
	}

	for (const p of file.packages) {
		const packageName = p.packageName;

		// Remove references to all functions defined in this file
		for (const f of PACKAGES[packageName].functions) {
			const funcFullName = `${packageName}::${f}`;
			if (!FUNCTIONS[funcFullName]) {
				// FIXME: Should probably look into why this happens
				continue;
			}
	
			FUNCTIONS[funcFullName].splice(FUNCTIONS[funcFullName].findIndex(f => f.file === documentURI)>>>0, 1);
	
			if (FUNCTIONS[funcFullName].length === 0) {
				delete FUNCTIONS[funcFullName];
			}
		}
	
		// Remove references to this file in PACKAGES
		PACKAGES[packageName].locations.splice(PACKAGES[packageName].locations.findIndex(l => l.file === documentURI)>>>0, 1);
		if (PACKAGES[packageName].locations.length === 0) {
			delete PACKAGES[packageName];
		} else {
			for (let i = PACKAGES[packageName].functions.length - 1; i > 0; --i) {
				if (file.functions[`${packageName}::${PACKAGES[packageName].functions[i]}`]) {
					PACKAGES[packageName].functions.splice(i, 1);
				}
			}
		}
	}
	
	// And lastly delete the FILES reference to this file.
	delete FILES[documentURI];
}
