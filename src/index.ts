import * as ts from "typescript";
import * as Mocha from "mocha";

import { FileHandler } from "./FileHandler/FileHandler";
import { CodeInspector } from "./CodeInspector/CodeInspector";
import { SourceCodeHandler } from "./SourceCodeHandler/SourceCodeHandler";

const obj = new FileHandler("./testProject/src/", "index.ts");
const sourceObj = new SourceCodeHandler(obj.getSourceObject());
const codeInspector = new CodeInspector(obj.getSourceObject());
const minusNodes = codeInspector.findObjectsOfSyntaxKind(ts.SyntaxKind.PlusToken);
const sampleNode = minusNodes[0];
sourceObj.modifyCode(sampleNode.pos, sampleNode.end, "-");
obj.writeTempSourceModifiedFile(sourceObj.getModifiedSourceCode());
obj.createTempTestModifiedFile();
