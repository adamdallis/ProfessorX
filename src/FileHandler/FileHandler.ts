import * as ts from "typescript";
import * as fs from "fs";

export class FileHandler {
    private sourceCode = "";
    private sourceObject: ts.SourceFile;
    private path = "";

    readFile(path: string) {
        this.path = path;
        this.sourceCode = fs.readFileSync(path).toString();
        this.sourceObject = ts.createSourceFile(this.path, this.sourceCode, ts.ScriptTarget.ES5, true);
    }

    getSourceCode(): string {
        return this.sourceCode;
    }

    getSourceObject(): ts.SourceFile {
        return this.sourceObject;
    }

    writeTempModifiedFile(code: string):void {
        fs.writeFileSync(this.path+".temp.ts", code);
    }
}