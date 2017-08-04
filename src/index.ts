import * as ts from "typescript";

import { FileHandler } from "./FileHandler/FileHandler";
import { CodeInspector } from "./CodeInspector/CodeInspector";
import { SourceCodeHandler } from "./SourceCodeHandler/SourceCodeHandler";

const obj = new FileHandler();
obj.readFile("./testProject/src/index.ts");
const sourceObj = new SourceCodeHandler(obj.getSourceObject());
const codeInspector = new CodeInspector(obj.getSourceObject());
const list = codeInspector.findObjectsOfSyntaxKind(ts.SyntaxKind.MinusToken);
const a = list[0];
sourceObj.modifyCode(a.pos, a.end, "+");
console.log(a);
obj.writeTempModifiedFile(sourceObj.getModifiedSourceCode());
// console.log(a.operatorToken);
// console.log("\n\n----------------------");
// console.log(ts.updateBinary(a, a.left, a.right, ts.SyntaxKind.PlusToken).operatorToken);
console.log(obj.getSourceObject());
