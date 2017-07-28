import * as ts from "typescript";

export class SourceFileObject {
    private modifiedSourceCode: string = this.originalSourceObject.getText();

    constructor(private readonly originalSourceObject: ts.SourceFile) {}

    getOriginalSourceObject(): ts.SourceFile {
        return this.originalSourceObject;
    }

    getOriginalSourceCode(): string {
        return this.originalSourceObject.getText();
    }
    
    getModifiedSourceCode(): string {
        return this.modifiedSourceCode;
    }

    resetModified(): void {
        this.modifiedSourceCode = this.originalSourceObject.getText();
    }

    modifyCode( start: number, end: number, replacement: string) {
        this.modifiedSourceCode = this.modifiedSourceCode.substring(0, start) + replacement + this.modifiedSourceCode.substring(end, this.modifiedSourceCode.length);
    }
}