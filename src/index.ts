import * as ts from "typescript";

import { FileHandler } from "./FileHandler/FileHandler";
import { CodeInspector } from "./CodeInspector/CodeInspector";
import { SourceCodeHandler } from "./SourceCodeHandler/SourceCodeHandler";
import { MutationFactory } from "./mutationFactory/MutationFactory";

const obj = new FileHandler();
obj.readFile(".testProject/src/index.ts");
const sourceObj = new SourceCodeHandler(obj.getSourceObject());
const mf = new CodeInspector(obj.getSourceObject());
const list = mf.findObjectsOfSyntaxKind(ts.SyntaxKind.PlusToken);
const a = list[0];
sourceObj.modifyCode(a.pos, a.end, MutationFactory.getSingleMutation(ts.SyntaxKind.PlusToken));
// console.log(ts.SyntaxKind.PlusToken);
// console.log(obj.getSourceObject().statements)
obj.writeTempModifiedFile(sourceObj.getModifiedSourceCode());

/*
read file
get source object from source code handler
code inspector
*/