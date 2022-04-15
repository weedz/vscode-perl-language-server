/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
	createConnection,
	TextDocuments,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	CompletionItemKind,
	TextDocumentPositionParams,
	TextDocumentSyncKind,
	InitializeResult,
	FileChangeType
} from 'vscode-languageserver/node';

import {
	CompletionItem,
	DefinitionLink,
	Position,
	SymbolInformation,
	SymbolKind,
	TextDocumentIdentifier
} from "vscode-languageserver";

import {
	TextDocument
} from 'vscode-languageserver-textdocument';

import * as fs from "fs/promises";
import * as path from "path";

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = true;
let hasDiagnosticRelatedInformationCapability = false;
const DEBUG_MEASURE_TIME = false;
const DEBUG_MEASURE_SINGLE_FILE = false;

let activeWorkspaceRoot: string;

connection.onInitialize(async (params: InitializeParams) => {
	const capabilities = params.capabilities;

	// TODO: Support multiple workspace folders?
	if (params.workspaceFolders?.length) {
		activeWorkspaceRoot = params.workspaceFolders[0].uri.substring(7);

		DEBUG_MEASURE_TIME && console.time("readWorkspace");
		await readWorkspaceFolder(activeWorkspaceRoot);
		DEBUG_MEASURE_TIME && console.timeEnd("readWorkspace");
	}

	// Does the client support the `workspace/configuration` request?
	// If not, we fall back using global settings.
	hasConfigurationCapability = !!(
		capabilities.workspace && !!capabilities.workspace.configuration
	);
	hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);
	hasDiagnosticRelatedInformationCapability = !!(
		capabilities.textDocument &&
		capabilities.textDocument.publishDiagnostics &&
		capabilities.textDocument.publishDiagnostics.relatedInformation
	);

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: {
				openClose: true,
				change: TextDocumentSyncKind.Incremental,
			},
			// Tell the client that this server supports code completion.
			completionProvider: {
				// TODO: This could maybe add argument lists or parse comment/doc for the given function?
				// resolveProvider: true,
				triggerCharacters: ["::"]
			},
			definitionProvider: true,
			documentSymbolProvider: true,
			// workspaceSymbolProvider: true,

		},
	};
	if (hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
			workspaceFolders: {
				supported: true
			}
		};
	}
	return result;
});

connection.onInitialized(() => {
	if (hasConfigurationCapability) {
		// Register for all configuration changes.
		connection.client.register(DidChangeConfigurationNotification.type, undefined);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			console.log("Workspace folder change event received.", _event);
			connection.console.log('Workspace folder change event received.');
		});
	}
});

// The example settings
interface ExampleSettings {
	maxNumberOfProblems: number;
}

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000 };
let globalSettings: ExampleSettings = defaultSettings;

// Cache the settings of all open documents
const documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();

connection.onDidChangeConfiguration(change => {
	if (hasConfigurationCapability) {
		// Reset all cached document settings
		documentSettings.clear();
	} else {
		globalSettings = <ExampleSettings>(
			(change.settings.languageServerExample || defaultSettings)
		);
	}
});

// Only keep settings for open documents
documents.onDidClose(e => {
	documentSettings.delete(e.document.uri);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
	clearDefinitions(change.document.uri);
	readSingleFile(change.document.uri, change.document.getText());
});

connection.onDocumentSymbol((symbolParams): SymbolInformation[] => {
	DEBUG_MEASURE_TIME && console.time("onDocumentSymbol()");

	const documentURI = symbolParams.textDocument.uri;
	if (!FILES[documentURI]) {
		DEBUG_MEASURE_TIME && console.timeEnd("onDocumentSymbol()");
		return [];
	}

	const symbols = Object.entries(FILES[documentURI].functions).map(([f, position]) => ({
		kind: SymbolKind.Function,
		name: f,
		location: {
			uri: documentURI,
			range: {
				start: {
					line: position.line - 1,
					character: 0,
				},
				end: {
					line: (position.endLine || position.line) - 1,
					character: 0
				}
			}
		}
	}));

	DEBUG_MEASURE_TIME && console.timeEnd("onDocumentSymbol()");

	return symbols;
});

function getTargetLineInDocument(textDocument: TextDocumentIdentifier, position: Position) {
	const documentURI = textDocument.uri;
	const document = documents.get(documentURI);
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
	}).trim();
}

function getPackageNameFromCursorPosition(textDocument: TextDocumentIdentifier, position: Position) {
	const pattern = /[^a-zA-Z0-9_:]?([a-zA-Z0-9_:]+)[^a-zA-Z0-9_:]?$/;

	const currentLine = getTargetLineInDocument(textDocument, position);
	if (currentLine === undefined) {
		return;
	}

	let word = currentLine.substring(0, position.character).match(pattern)?.[1];

	if (word) {
		const start = currentLine.indexOf(word, position.character - word.length);
		const end = currentLine.indexOf("::", position.character);
		if (end !== -1) {
			word = currentLine.substring(start, end);
		} else {
			const characterPatter = /[a-zA-Z0-9_:]/;
			for (let i = position.character; i < currentLine.length && characterPatter.test(currentLine[i]); ++i) {
				word = word.concat(currentLine[i]);
			}
		}
	}

	return word || "";
}

connection.onDefinition((definition) => {
	DEBUG_MEASURE_TIME && console.time("onDefinition()");

	const word = getPackageNameFromCursorPosition(definition.textDocument, definition.position);
	if (!word) {
		DEBUG_MEASURE_TIME && console.timeEnd("onDefinition()");
		return [];
	}

	// TODO:  Resolve something like Obj::A->new() to Obj::A::new

	const definitions: DefinitionLink[] = [];

	if (!word.includes("::")) {
		// Find package scoped functions
		const filePackage = FILES[definition.textDocument.uri];
		for (const p of filePackage.packages) {
			const funcs = FUNCTIONS[`${p.packageName}::${word}`] || [];
			for (const f of funcs.filter(f => f.file === definition.textDocument.uri)) {
				definitions.push({
					targetUri: definition.textDocument.uri,
					targetRange: {
						start: {
							line: f.line - 1,
							character: 0
						},
						end: {
							line: f.line - 1,
							character: word.length + 4
						}
					},
					targetSelectionRange: {
						start: {
							line: f.line - 1,
							character: 0
						},
						end: {
							line: f.line - 1,
							character: word.length + 4
						}
					},
				});
			}
		}
	}
	if (FUNCTIONS[word]) {
		for (const f of FUNCTIONS[word]) {
			definitions.push({
				targetUri: f.file,
				targetRange: {
					start: {
						line: f.line - 1,
						character: 0
					},
					end: {
						line: f.line - 1,
						character: word.length + 4
					}
				},
				targetSelectionRange: {
					start: {
						line: f.line - 1,
						character: 0
					},
					end: {
						line: f.line - 1,
						character: word.length + 4
					}
				},
			});
		}
	} else {
		// Lookup package
		if (PACKAGES[word]) {
			for (const f of PACKAGES[word].files) {
				for (const p of FILES[f].packages.filter(p => p.packageName === word)) {
					definitions.push({
						targetUri: f,
						targetRange: {
							start: {
								line: p.line - 1,
								character: 0
							},
							end: {
								line: p.line - 1,
								character: word.length + 8
							}
						},
						targetSelectionRange: {
							start: {
								line: p.line - 1,
								character: 0
							},
							end: {
								line: p.line - 1,
								character: word.length + 8
							}
						},
					});
				}
			}
		}
	}

	if (!definitions.length) {
		for (const [f, locations] of Object.entries(FUNCTIONS)) {
			if (f.endsWith(word)) {
				definitions.push(...locations.map(position => ({
					targetUri: position.file,
					targetRange: {
						start: {
							line: position.line - 1,
							character: 0
						},
						end: {
							line: position.line - 1,
							character: word.length + 8
						}
					},
					targetSelectionRange: {
						start: {
							line: position.line - 1,
							character: 0
						},
						end: {
							line: position.line - 1,
							character: word.length + 8
						}
					},
				})));
			}
		}
	}

	DEBUG_MEASURE_TIME && console.timeEnd("onDefinition()");

	return definitions;
});

connection.onDidChangeWatchedFiles(async change => {
	// Monitored files have change in VSCode

	// FIXME: Does not detect when a folder is deleted? Workaround is to just reload the window when large changes happen..
	for (const fileEvent of change.changes) {
		if (!isValidDirectory(fileEvent.uri.substring(7))) {
			continue;
		}

		//type: 1 = created, 2 = modified, 3 = deleted
		if (fileEvent.type !== FileChangeType.Created) {
			clearDefinitions(fileEvent.uri);
		}
		if (fileEvent.type !== FileChangeType.Deleted) {
			readSingleFile(fileEvent.uri, (await fs.readFile(new URL(fileEvent.uri))).toString());
		}
	}
});

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

// This handler provides the initial list of the completion items.
connection.onCompletion((textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
	DEBUG_MEASURE_TIME && console.time("onCompletion");

	const word = getPackageNameFromCursorPosition(textDocumentPosition.textDocument, textDocumentPosition.position);
	if (word === undefined) {
		DEBUG_MEASURE_TIME && console.timeEnd("onCompletion");
		return [];
	}

	const documentURI = textDocumentPosition.textDocument.uri;

	let packages: CompletionItem[] = [];
	const functions: CompletionItem[] = [];

	if (word.includes("::")) {
		const packageName = word.slice(0, word.lastIndexOf("::"));
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
					label: `${p.packageName}::${f}`,
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
});

// This handler resolves additional information for the item selected in
// the completion list.
// connection.onCompletionResolve(
// 	(item: CompletionItem): CompletionItem => {
// 		if (item.data === 1) {
// 			item.detail = 'TypeScript details';
// 			item.documentation = 'TypeScript documentation';
// 		} else if (item.data === 2) {
// 			item.detail = 'JavaScript details';
// 			item.documentation = 'JavaScript documentation';
// 		}
// 		return item;
// 	}
// );

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();



const defs = {
	functions: /^\s*sub\s+([a-zA-Z0-9_]+)/gm,
	function: /^\s*sub\s+([a-zA-Z0-9_]+)/,
	package: /^package\s+([a-zA-Z0-9:_]+);/m,
	file: /[.](pl|pm|fcgi)$/i,
};

function processContent(fullPath: string, content: string) {
	// This holds the current "active" package name
	let filePackageName = "main";

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
						files: [],
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
			PACKAGES[packageName].files.push(fullPath);

			filePackageName = packageName;
		}
		const functionDefinition = line.match(defs.function)?.[1];
		if (functionDefinition) {
			// Assumes a package definition has been created before we define functions in said package (?)
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
				file: fullPath,
				line: i + 1
			});

			functions[packageAndFunction] = {
				line: i + 1
			};
		}
	}

	FILES[fullPath] = {
		packages,
		functions
	};
}

// TODO: Move this to a Worker thread?
function readSingleFile(fullPath: string, fileContent: string) {
	DEBUG_MEASURE_TIME && DEBUG_MEASURE_SINGLE_FILE && console.time(`process: ${fullPath}`);
	processContent(fullPath, fileContent);
	DEBUG_MEASURE_TIME && DEBUG_MEASURE_SINGLE_FILE && console.timeEnd(`process: ${fullPath}`);
}

interface Packages {
	[packageName: string]: {
		files: string[]
		packages: {
			[packageName: string]: number
		}
		functions: string[]
	}
}

interface Functions {
	[packageAndFunction: string]: Array<{
		file: string
		line: number
	}>
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
				endLine?: number
			}
		}
	}
}

const PACKAGES: Packages = {
	main: {
		files: [],
		functions: [],
		packages: {},
	}
};
const FUNCTIONS: Functions = {};
const FILES: Files = {};

function clearDefinitions(documentURI: string) {
	const file = FILES[documentURI];
	if (!file) {
		return;
	}

	for (const p of file.packages) {
		const packageName = p.packageName;

		// Remove references to all functions defined in this file
		for (const f of PACKAGES[packageName].functions) {
			const funcFullName = `${packageName}::${f}`;
	
			FUNCTIONS[funcFullName].splice(FUNCTIONS[funcFullName].findIndex(f => f.file === documentURI)>>>0, 1);
	
			if (FUNCTIONS[funcFullName].length === 0) {
				delete FUNCTIONS[funcFullName];
			}
		}
	
		// Remove references to this file in PACKAGES
		PACKAGES[packageName].files.splice(PACKAGES[packageName].files.indexOf(documentURI)>>>0, 1);
		if (PACKAGES[packageName].files.length === 0) {
			delete PACKAGES[packageName];
		} else {
			// for (const f of PACKAGES[packageName].functions)
			PACKAGES[packageName].functions = PACKAGES[packageName].functions.filter(f => !file.functions[`${packageName}::${f}`]);
		}
	}
	
	// And lastly delete the FILES reference to this file.
	delete FILES[documentURI];
}

function isValidFile(fileName: string) {
	return defs.file.test(fileName);
}

// FIXME: Move this to a config value
const IGNORED_FOLDERS = [
	"/CLEAN",
	".git",
	"/_VERKTYG/Koddokumentation",
	"/_VERKTYG/Taggdokumentation",
	".vscode",
	"node_modules",
	"/ci/docker/askas-environment/www",
	"/ci/docker/air-local/air-cdsuperstore/www",
	"/ci/docker/askas-environment/askas-ecommerce/init",
	".tidyall.d"
];

function isValidDirectory(fullPath: string) {
	const basename = path.basename(fullPath);
	if (basename === "." || basename === "..") {
		return false;
	}

	for (let folder of IGNORED_FOLDERS) {
		if (folder.startsWith("/")) {
			folder = `${activeWorkspaceRoot}${folder}`;
		}
		if (fullPath.includes(folder)) {
			return false;
		}
	}

	return true;
}

// NOTE: `fullPath` must be without `file://` protocol
async function readWorkspaceFolder(fullPath: string) {
	const files = await fs.readdir(fullPath);
	for (const file of files) {
		const currentFile = path.join(fullPath, file);
		const stats = await fs.stat(currentFile);
		if (isValidFile(file) || (stats.isDirectory() && isValidDirectory(currentFile))) {
			if (stats.isDirectory()) {
				readWorkspaceFolder(currentFile);
			} else {
				fs.readFile(currentFile).then(content => {
					readSingleFile(`file://${currentFile}`, content.toString());
				});
			}
		}
	}
}
