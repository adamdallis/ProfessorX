import * as ts from "typescript";

import { FileHandler } from "./FileHandler/FileHandler";
import { CodeInspector } from "./CodeInspector/CodeInspector";
import { SourceCodeHandler } from "./SourceCodeHandler/SourceCodeHandler";

const obj = new FileHandler();
obj.readFile("./src/sample.ts");
const sourceObj = new SourceCodeHandler(obj.getSourceObject());
const mf = new CodeInspector(obj.getSourceObject());
const list = mf.findObjectsOfSyntaxKind(ts.SyntaxKind.PlusToken);
const a = list[0];
sourceObj.modifyCode(a.pos, a.end, "-");
// console.log(ts.SyntaxKind.PlusToken);
// console.log(obj.getSourceObject().statements)
obj.writeTempModifiedFile(sourceObj.getModifiedSourceCode());