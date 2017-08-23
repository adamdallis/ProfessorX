import * as ts from "typescript";

export class CodeInspector {
    private retrievedObjects: Array<ts.Node> = [];
    constructor (private sourceObject: ts.SourceFile) {}

    public findObjectsOfSyntaxKind (kind: ts.SyntaxKind) {
        this.retrievedObjects = [];
        this.findTokenObjectsOfKind(this.sourceObject, kind);
        return this.retrievedObjects;
    }

    public findFunctionNames () {
        const functionNames: Array<string> = [];
        const functionGrab = this.sourceObject
        .getChildren()[0]
        .getSourceFile()
        .text.match(/(?:public)\s+(\w+)\s*(?:\()/g);
        functionGrab.forEach((name) => {
            functionNames.push(name.match(/\s(\w+)\s/g).toString().trim());
        });
        return functionNames;
    }

    private findTokenObjectsOfKind (object: ts.Node, kind: ts.SyntaxKind): Array<ts.Node> {
        if (object.kind === kind) {
            this.retrievedObjects.push(object);
        }
        object.getChildren().forEach((element) => {
            this.findTokenObjectsOfKind(element, kind);
        });
        return this.retrievedObjects;
    }
}
