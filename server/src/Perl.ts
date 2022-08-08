import { CompletionItem, CompletionItemKind, DefinitionLink, DefinitionParams, DocumentSymbol, DocumentSymbolParams, InlayHint, InlayHintParams, Position, SignatureHelp, SignatureHelpParams, SymbolInformation, SymbolKind, TextDocumentIdentifier, TextDocumentPositionParams, WorkspaceSymbolParams } from "vscode-languageserver";
import { DEBUG_MEASURE_SINGLE_FILE, DEBUG_MEASURE_TIME, getDocument } from "./Document";

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
		functions: Set<string>
	}
}

interface Functions {
	[packageAndFunction: string]: Location[]
}

interface FunctionMap {
	[funcName: string]: {
		[file: string]: {
			package: string
			location: Location
		}
	}
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
				arguments: Array<{
					name: string
				}>
			}
		}
	}
}

const PACKAGES: Packages = {
	main: {
		locations: [],
		functions: new Set(),
		packages: {},
	}
};
const FUNCTIONS: Functions = {};
const FUNCTION_MAP: FunctionMap = {};
const FILES: Files = {};


export function onDocumentSymbol(symbolParams: DocumentSymbolParams): DocumentSymbol[] {
	const documentURI = symbolParams.textDocument.uri;
	DEBUG_MEASURE_TIME && console.time(`onDocumentSymbol(): ${documentURI}`);

	const file = FILES[documentURI];

	if (!file) {
		DEBUG_MEASURE_TIME && console.timeEnd(`onDocumentSymbol(): ${documentURI}`);
		return [];
	}

	const symbols: DocumentSymbol[] = Object.entries(file.functions).map(([f, position]) => {
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

	for (const p of file.packages) {
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

	DEBUG_MEASURE_TIME && console.timeEnd(`onDocumentSymbol(): ${documentURI}`);

	return symbols;
}

export function onWorkspaceSymbol(symbolParams: WorkspaceSymbolParams): SymbolInformation[] {
	const query = symbolParams.query.toLowerCase().trim();
	DEBUG_MEASURE_TIME && console.time(`onWorkspaceSymbol(): ${query}`);

	if (query.length === 0) {
		DEBUG_MEASURE_TIME && console.timeEnd(`onWorkspaceSymbol(): ${query}`);
		return [];
	}

	const symbols: SymbolInformation[] = [];

	const seperatorIndex = query.lastIndexOf("::");
	const possibleFunction = seperatorIndex !== -1 ? query.slice(seperatorIndex + 2) : query;
	const packageName = seperatorIndex !== -1 ? query.slice(0, seperatorIndex) : "";

	for (const [functionName, files] of Object.entries(FUNCTION_MAP)) {
		if (!functionName.toLowerCase().includes(possibleFunction)) {
			continue;
		}
		for (const [uri, where] of Object.entries(files)) {
			if (!packageName || where.package.toLowerCase().includes(packageName)) {
				symbols.push({
					kind: SymbolKind.Function,
					name: `${where.package}::${functionName}`,
					location: {
						uri,
						range: {
							start: {
								line: where.location.line - 1,
								character: 0,
							},
							end: {
								line: where.location.line,
								character: 0,
							},
						}
					}
				});
			}
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

	DEBUG_MEASURE_TIME && console.timeEnd(`onWorkspaceSymbol(): ${query}`);
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
	
	if (!identifier.includes("::")) {
		// Resolve something like Obj::A->new() to Obj::A::new
		if (word.line.substring(word.startIndex - 2, word.startIndex) === "->") {
			const instance = getIdentifierNameFromLine(word.line, { line: 0, character: word.startIndex - 2 });
			if (instance.identifier in PACKAGES) {
				identifier = `${instance.identifier}::${identifier}`;
			} else if (identifier in FUNCTION_MAP) {
				for (const where of Object.values(FUNCTION_MAP[identifier])) {
					definitions.push(createDefinition(identifier, where.location, 4));
				}
			}
		}

		// Find functions in this document
		const filePackage = FILES[definition.textDocument.uri];
		for (const p of filePackage.packages) {
			const funcs = FUNCTIONS[`${p.packageName}::${identifier}`] || [];
			for (const location of funcs.filter(f => f.file === definition.textDocument.uri)) {
				definitions.push(createDefinition(identifier, location, 4));
			}
		}
	}

	if (identifier in FUNCTIONS) {
		for (const location of FUNCTIONS[identifier]) {
			definitions.push(createDefinition(identifier, location, 4));
		}
	}

	// Lookup package
	if (identifier in PACKAGES) {
		definitions.push(...PACKAGES[identifier].locations.map(
			location => FILES[location.file].packages.filter(p => p.packageName === identifier).map(_ => createDefinition(identifier, location, 8))
		).flat());
	}

	if (!definitions.length)
	{
		if (identifier in FUNCTION_MAP) {
			for (const where of Object.values(FUNCTION_MAP[identifier])) {
				definitions.push(createDefinition(identifier, where.location, 4));
			}
		}

		const rindex = identifier.lastIndexOf("::");
		if (rindex !== -1) {
			const func = identifier.substring(rindex + 2);
			const packageName = identifier.substring(0, rindex);
			if (func in FUNCTION_MAP) {
				for (const where of Object.values(FUNCTION_MAP[func])) {
					if (where.package.includes(packageName)) {
						definitions.push(createDefinition(func, where.location, 4));
					}
				}
			}
		}
	}

	DEBUG_MEASURE_TIME && console.timeEnd("onDefinition()");

	return definitions;
}

function createDefinition(definitionName: string, location: Location, prefixLength: number): DefinitionLink {
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

export function onInlayHints(_params: InlayHintParams): InlayHint[] {
	// console.log("onInlayHints", params);
	return [];
}

function createSignature(documentURI: string, activeLine: string, packageAndFunction: string) {
	const currentParameterList = activeLine.substring(activeLine.lastIndexOf("("));
	const activeParameter = currentParameterList.split(",").length - 1;

	// console.log(documentURI, packageAndFunction);
	
	const signature = FILES[documentURI].functions[packageAndFunction].arguments;
	return {
		label: `${packageAndFunction}(${signature.map(arg => arg.name).join(", ")})`,
		parameters: signature.map(arg => ({
			label: arg.name
		})),
		activeParameter
	} as SignatureHelp["signatures"][0];
}

export function onSignatureHelp(params: SignatureHelpParams): SignatureHelp | null {
	DEBUG_MEASURE_TIME && console.time("onSignatureHelp");
	// console.log("onSignatureHelp", params);
	const currentLine = getTargetLineInDocument(params.textDocument, params.position);
	if (!currentLine) {
		DEBUG_MEASURE_TIME && console.timeEnd("onSignatureHelp");
		return null;
	}
	const activeLine = currentLine.substring(0,params.position.character);
	const position: Position = {
		character: activeLine.lastIndexOf("(") - 1,
		line: params.position.line,
	};

	// console.log(activeLine.substring(activeLine.lastIndexOf("(")));

	const word = getIdentifierNameAtPosition(params.textDocument, position);
	if (!word?.identifier || word?.line.startsWith("sub ")) {
		// console.log("no identifier");
		DEBUG_MEASURE_TIME && console.timeEnd("onSignatureHelp");
		return null;
	}

	// console.log(activeLine, word);

	const signatures: SignatureHelp["signatures"] = [];

	let identifier = word.identifier;

	if (!identifier.includes("::")) {
		// Resolve something like Obj::A->new() to Obj::A::new
		if (activeLine.substring(word.startIndex - 2, word.startIndex) === "->") {
			const instance = getIdentifierNameFromLine(activeLine, { line: 0, character: word.startIndex - 2 });
			// console.log(instance);
			if (instance.identifier in PACKAGES) {
				identifier = `${instance.identifier}::${identifier}`;
			} else if (identifier in FUNCTION_MAP) {
				for (const where of Object.values(FUNCTION_MAP[identifier])) {
					signatures.push(createSignature(where.location.file, activeLine, `${where.package}::${identifier}`));
				}
			}
		}

		// Find functions in this document
		const filePackage = FILES[params.textDocument.uri];
		for (const p of filePackage.packages) {
			const funcs = FUNCTIONS[`${p.packageName}::${identifier}`] || [];
			for (const location of funcs.filter(f => f.file === params.textDocument.uri)) {
				signatures.push(createSignature(location.file, activeLine, `${p.packageName}::${identifier}`));
			}
		}
	}

	if (identifier in FUNCTIONS) {
		for (const location of FUNCTIONS[identifier]) {
			signatures.push(createSignature(location.file, activeLine, identifier));
		}
	}

	const signatureHelp: SignatureHelp = {
		activeSignature: 0,
		signatures,
	};
	// console.log(signatures);
	DEBUG_MEASURE_TIME && console.timeEnd("onSignatureHelp");
	return signatureHelp;
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

	console.log("Identifier:", identifier);

	if (identifier.includes("::")) {
		const packageName = identifier.slice(0, identifier.lastIndexOf("::"));
		if (packageName in PACKAGES) {
			const flatPackageTree = getFlatPackageTree(packageName).filter(p => p !== packageName);
			packages = flatPackageTree.map(p => ({
				label: p,
				kind: CompletionItemKind.Module,
				insertText: p.substring(packageName.length + 2), // skip "parent" package name and "::"
			}));

			functions.push(...findFunctionsInPackage(packageName));
		}
	} else {
		packages = Object.keys(PACKAGES).map(p => ({
			label: p,
			kind: CompletionItemKind.Module,
		}));

		for (const p of FILES[documentURI].packages) {
			functions.push(...findFunctionsInPackage(p.packageName));
		}
	}

	// The pass parameter contains the position of the text document in
	// which code complete got requested. For the example we ignore this
	// info and always provide the same completion items.

	DEBUG_MEASURE_TIME && console.timeEnd("onCompletion");

	return functions.concat(packages);
}

function findFunctionsInPackage(packageName: string) {
	const functions: CompletionItem[] = [];

	for (const functionName of PACKAGES[packageName].functions) {
		const packageAndFunction = `${packageName}::${functionName}`;

		for (const location of FUNCTIONS[packageAndFunction]) {
			const signature = FILES[location.file].functions[packageAndFunction].arguments.map(arg => arg.name).join(", ");
			functions.push({
				label: functionName,
				kind: CompletionItemKind.Function,
				detail: `${functionName}(${signature})`,
				labelDetails: {
					description: packageAndFunction,
					detail: `(${signature})`
				},
			});
		}
	}

	return functions;
}

function objectIsEmpty(obj: Record<string, unknown>) {
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
	if (PACKAGES[packageName].functions.size) {
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
	package: /^package\s+([a-zA-Z0-9:_]+);/,
	file: /[.](?:pm|pl|fcgi)$/,
};

function processContent(documentURI: string, content: string) {
	if (FILES[documentURI]) {
		console.log("already read this file:", documentURI);
		return;
	}

	// This holds the current "active" package name
	let filePackageName = "";

	let lastFunctionName: string | null = null;

	let readArgs: boolean | string = false;
	let functionArguments: Files[0]["functions"][0]["arguments"] = [];

	const lines = content.split("\n");
	const packages: Files[0]["packages"] = [];
	const functions: Files[0]["functions"] = {};
	for (let i = 0; i < lines.length; ++i) {
		const line = lines[i];

		if (readArgs) {
			const args = parseFunctionArgs(readArgs);
			if (args.length) {
				functionArguments.push(...args);
				readArgs = false;
			} else {
				readArgs += line;
				if (readArgs.length > 1000) {
					readArgs = false;
				}
			}
		}

		const packageName = line.match(defs.package)?.[1];
		if (packageName) {
			packages.push({
				packageName: packageName,
				line: i + 1
			});

			const packageTree = packageName.split("::");

			// Set all PACKAGES for packageTree and PACKAGES[0].packages
			for (let j = 0; j < packageTree.length; ++j) {
				const fullPackageTree = packageTree.slice(0, j+1).join("::");

				if (!(fullPackageTree in PACKAGES)) {
					PACKAGES[fullPackageTree] = {
						locations: [],
						packages: {},
						functions: new Set(),
					};
				}
			
				if (j < packageTree.length - 1) {
					// FIXME: This is not the nicest thing i've seen...
					if (PACKAGES[fullPackageTree].packages[packageTree[j+1]]) {
						PACKAGES[fullPackageTree].packages[packageTree[j+1]]++;
					} else {
						PACKAGES[fullPackageTree].packages[packageTree[j+1]] = 1;
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
			readArgs = line;
			functionArguments = [];

			if (!filePackageName) {
				// Assume a missing "main" package definition
				filePackageName = "main";
				packages.push({
					packageName: filePackageName,
					line: 1,
				});
				if (!(filePackageName in PACKAGES)) {
					PACKAGES[filePackageName] = {
						locations: [],
						packages: {},
						functions: new Set(),
					};
				}
				PACKAGES[filePackageName].locations.push({
					file: documentURI,
					line: 1
				});
			}

			if (!(functionDefinition in FUNCTION_MAP)) {
				FUNCTION_MAP[functionDefinition] = {};
			}
			FUNCTION_MAP[functionDefinition][documentURI] = {
				package: filePackageName,
				location: {
					file: documentURI,
					line: i + 1
				}
			};

			PACKAGES[filePackageName].functions.add(functionDefinition);

			if (lastFunctionName) {
				functions[lastFunctionName].endLine = i;
				// functions[lastFunctionName].arguments = functionArguments;
			}

			const packageAndFunction = `${filePackageName}::${functionDefinition}`;

			lastFunctionName = packageAndFunction;

			if (!(packageAndFunction in FUNCTIONS)) {
				FUNCTIONS[packageAndFunction] = [];
			}

			FUNCTIONS[packageAndFunction].push({
				file: documentURI,
				line: i + 1,
			});

			functions[packageAndFunction] = {
				line: i + 1,
				endLine: i + 1,
				arguments: functionArguments,
			};
		}
	}

	if (lastFunctionName) {
		functions[lastFunctionName].endLine = lines.length;
		// functions[lastFunctionName].arguments = functionArguments;
	}

	FILES[documentURI] = {
		packages,
		functions
	};
}

function parseFunctionArgs(line: string) {
	const args: Files[0]["functions"][0]["arguments"] = [];

	// Check if line contains a single argument
	let match = /my (?<name>.+) = shift/.exec(line);
	if (match?.groups) {
		if (match.groups.name !== "$self") {
			args.push({name: match.groups.name});
		}
	} else {
		// Check if line contains all arguments
		match = /my [(](?<args>.+)[)]\s*=\s*@_/.exec(line);
		if (match?.groups) {
			args.push(
				...match.groups.args
					.split(",")
					.map(arg => ({
						name: arg.trim()
					}))
					.filter(arg => arg.name !== "$self")
			);
		}
	}

	return args;
}

const debounceFileProcess: Record<string, NodeJS.Timeout> = {};

function clearAndProcessDefinitions(documentURI: string, fileContent: string) {
	DEBUG_MEASURE_TIME && DEBUG_MEASURE_SINGLE_FILE && console.time(`readSingleFile: ${documentURI}`);
	clearDefinitions(documentURI);
	processContent(documentURI, fileContent);
	DEBUG_MEASURE_TIME && DEBUG_MEASURE_SINGLE_FILE && console.timeEnd(`readSingleFile: ${documentURI}`);
}

// TODO: Move this to a Worker thread?
export function readSingleFile(documentURI: string, fileContent: string): void {
	if (!(documentURI in debounceFileProcess)) {
		clearAndProcessDefinitions(documentURI, fileContent);
	} else {
		clearTimeout(debounceFileProcess[documentURI]);
		debounceFileProcess[documentURI] = setTimeout(() => {
			clearAndProcessDefinitions(documentURI, fileContent);
			delete debounceFileProcess[documentURI];
		}, 200);
	}
}

export function clearDefinitions(documentURI: string): void {
	DEBUG_MEASURE_TIME && console.time(`clearDefinitions(): ${documentURI}`);
	const file = FILES[documentURI];
	if (!file) {
		DEBUG_MEASURE_TIME && console.timeEnd(`clearDefinitions(): ${documentURI}`);
		return;
	}

	for (const p of file.packages) {
		const packageName = p.packageName;

		// Remove references to all functions defined in this file
		for (const f of PACKAGES[packageName].functions) {
			delete FUNCTION_MAP[f]?.[documentURI];

			const funcFullName = `${packageName}::${f}`;
			if (!(funcFullName in FUNCTIONS)) {
				// FIXME: Should probably look into why this happens
				continue;
			}
	
			FUNCTIONS[funcFullName].splice(FUNCTIONS[funcFullName].findIndex(f => f.file === documentURI)>>>0, 1);
	
			if (FUNCTIONS[funcFullName].length === 0) {
				delete FUNCTIONS[funcFullName];
				PACKAGES[packageName].functions.delete(f);
			}
		}
	
		// Remove references to this file in PACKAGES
		PACKAGES[packageName].locations.splice(PACKAGES[packageName].locations.findIndex(l => l.file === documentURI)>>>0, 1);
		if (PACKAGES[packageName].locations.length === 0) {
			delete PACKAGES[packageName];
		}
	}
	
	// And lastly delete the FILES reference to this file.
	delete FILES[documentURI];

	DEBUG_MEASURE_TIME && console.timeEnd(`clearDefinitions(): ${documentURI}`);
}

export function validPerlFile(filePath: string): boolean {
	return defs.file.test(filePath);
}
