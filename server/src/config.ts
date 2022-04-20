import { Connection, TextDocuments } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

export const DEBUG_MEASURE_TIME = false;
export const DEBUG_MEASURE_SINGLE_FILE = false;

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

export function documentsListen(connection: Connection) {
    documents.listen(connection);
}

export function getDocuments() {
    return documents;
}

export function getDocument(documentURI: string) {
    return documents.get(documentURI);
}
