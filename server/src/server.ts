/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
	createConnection,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	TextDocumentSyncKind,
	InitializeResult
} from 'vscode-languageserver/node';

import * as fs from "fs/promises";
import { watch, FSWatcher } from "chokidar";
import { clearDefinitions, onCompletion, onDefinition, onDocumentSymbol, onWorkspaceSymbol, readSingleFile, validPerlFile } from './Perl';
import { DEBUG_MEASURE_SINGLE_FILE, DEBUG_MEASURE_TIME, documentsListen, getDocuments } from './config';

let watcher: FSWatcher;

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = true;
// let hasDiagnosticRelatedInformationCapability = false;


// The example settings
interface ExampleSettings {
	maxNumberOfProblems: number;
	ignoreFolders: string[];
}

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000, ignoreFolders: [] };
let globalSettings: ExampleSettings = defaultSettings;

// Cache the settings of all open documents, but we only need one global settings object.
const documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();
let IGNORED_FOLDERS: ExampleSettings["ignoreFolders"] = [];


let activeWorkspaceRoot: string;

connection.onInitialize(async (params: InitializeParams) => {
	const capabilities = params.capabilities;

	// TODO: Support multiple workspace folders?
	if (params.workspaceFolders?.length) {
		activeWorkspaceRoot = params.workspaceFolders[0].uri;
	}

	// Does the client support the `workspace/configuration` request?
	// If not, we fall back using global settings.
	hasConfigurationCapability = !!(
		capabilities.workspace && !!capabilities.workspace.configuration
	);
	hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);
	// hasDiagnosticRelatedInformationCapability = !!(
	// 	capabilities.textDocument &&
	// 	capabilities.textDocument.publishDiagnostics &&
	// 	capabilities.textDocument.publishDiagnostics.relatedInformation
	// );

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
				// triggerCharacters: []
			},
			definitionProvider: true,
			documentSymbolProvider: true,
			workspaceSymbolProvider: true,
			// signatureHelpProvider: true, // TODO: Implement this?
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

connection.onInitialized(async _ => {
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

	const settings = await getDocumentSettings("global");
	IGNORED_FOLDERS = settings.ignoreFolders;

	// Only run file watcher for workspace folders
	if (activeWorkspaceRoot) {
		// This solves renamed/deleted folders not emiting filewatch events
		watcher = watch(".", {
			ignored: IGNORED_FOLDERS,
			persistent: true,
			useFsEvents: true,
		});
		watcher.on("unlink", filePath => {
			if (!validPerlFile(filePath)) {
				return;
			}
			clearDefinitions(`${activeWorkspaceRoot}/${filePath}`);
		});
		watcher.on("add", async filePath => {
			if (!validPerlFile(filePath)) {
				return;
			}
			const documentURI = new URL(`${activeWorkspaceRoot}/${filePath}`);
			try {
				await fs.access(documentURI);
			} catch(_) {
				return;
			}
			const content = await fs.readFile(documentURI);
			readSingleFile(`${activeWorkspaceRoot}/${filePath}`, content.toString());
		});
		watcher.on("change", async filePath => {
			if (!validPerlFile(filePath)) {
				return;
			}
			const documentURI = new URL(`${activeWorkspaceRoot}/${filePath}`);
			try {
				await fs.access(documentURI);
			} catch(_) {
				return;
			}
			const content = await fs.readFile(documentURI);
			readSingleFile(`${activeWorkspaceRoot}/${filePath}`, content.toString());
		});
	}
});

connection.onDidChangeConfiguration(async change => {
	if (hasConfigurationCapability) {
		// Reset all cached document settings
		documentSettings.clear();
	} else {
		globalSettings = <ExampleSettings>(
			(change.settings.languageServerExample || defaultSettings)
		);
	}

	await getDocumentSettings("global");
	// TODO: Check if ignoreFolders have changed and clear definitions and restart watcher
});

function getDocumentSettings(resource: string): Thenable<ExampleSettings> {
	if (!hasConfigurationCapability) {
		return Promise.resolve(globalSettings);
	}
	let result = documentSettings.get(resource);
	if (!result) {
		result = connection.workspace.getConfiguration({
			scopeUri: resource,
			section: "perlLanguageServer"
		});
		documentSettings.set(resource, result);
	}
	return result;
}

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
getDocuments().onDidChangeContent(change => {
	readSingleFile(change.document.uri, change.document.getText());
});
getDocuments().onDidClose(change => {
	// Clear definitions for files outside of active workspace when closed
	if (!activeWorkspaceRoot || !change.document.uri.startsWith(activeWorkspaceRoot)) {
		clearDefinitions(change.document.uri);
	}
});

connection.onDocumentSymbol(onDocumentSymbol);

connection.onWorkspaceSymbol(onWorkspaceSymbol);

connection.onDefinition(onDefinition);

// This handler provides the initial list of the completion items.
connection.onCompletion(onCompletion);

// Make the text document manager listen on the connection
// for open, change and close text document events
documentsListen(connection);

// Listen on the connection
connection.listen();

connection.onShutdown(() => {
	if (watcher) {
		watcher.close();
	}
});
