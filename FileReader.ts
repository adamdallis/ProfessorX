import * as ts from "typescript";
import * as fs from "fs";

export class FileReader {
    private sourceCode = "";
    private filename = "";

    readFile(filename: string) {
        this.filename = filename;
        this.sourceCode = fs.readFileSync(filename).toString();
    }

    getSourceCode(): string {
        return this.sourceCode;
    }

    getSourceFile(): ts.SourceFile {
        return ts.createSourceFile(this.filename, this.sourceCode, ts.ScriptTarget.ES5, true);
    }
}