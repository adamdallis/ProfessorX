import * as ts from "typescript";

import { FileHandler } from "./FileHandler";
import { CodeInspector } from "./CodeInspector";
import { SourceFileObject } from "./SourceFileObject";

let obj = new FileHandler();
obj.readFile("./sample.ts");
let sourceObj = new SourceFileObject(obj.getSourceObject());
let mf = new CodeInspector(obj.getSourceObject());
const list = mf.findObjectsOfSyntaxKind(ts.SyntaxKind.PlusToken);
const a =list[0];
sourceObj.modifyCode(a.pos, a.end, "-");
// console.log(ts.SyntaxKind.PlusToken);
// console.log(obj.getSourceObject().statements)
obj.writeTempModifiedFile(sourceObj.getModifiedSourceCode());