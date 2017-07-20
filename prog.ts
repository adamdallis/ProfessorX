import * as ts from "typescript";
import * as tsn from "ntypescript";
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

export class MutationFinder {
    private retrievedObjects: Array<ts.Node> = [];
    constructor(private sourceObject: ts.SourceFile) {}

    findObjectsOfSyntaxKind (kind: ts.SyntaxKind) {
        this.retrievedObjects = [];
        this.findTokenObjectsOfKind(this.sourceObject, kind);
        return this.retrievedObjects;
    }

    private findTokenObjectsOfKind(object: ts.Node, kind: ts.SyntaxKind): Array<ts.Node> {
        if (object.kind === kind) {
            this.retrievedObjects.push(object)
        }
        object.getChildren().forEach(element => {
            this.findTokenObjectsOfKind(element, kind);
        });
        return this.retrievedObjects;
    }
}

let obj = new FileReader();
obj.readFile("./sample.ts");
console.log(obj.getSourceCode());
console.log(obj.getSourceFile());
let obj1 = new MutationFinder(obj.getSourceFile());
console.log(obj1.findObjectsOfSyntaxKind(ts.SyntaxKind.PlusToken));



function printAllChildren(node: ts.Node, depth = 0) {
    console.log(new Array(depth + 1).join('----'), tsn.syntaxKindToName(node.kind), node.pos, node.end);
    depth++;
    node.getChildren().forEach(c => printAllChildren(c, depth));
}


let nodes = [];


