import * as ts from "typescript";

import { FileHandler } from "./FileHandler/FileHandler";
import { CodeInspector } from "./CodeInspector/CodeInspector";
import { SourceCodeHandler } from "./SourceCodeHandler/SourceCodeHandler";
import { MutationFactory } from "./mutationFactory/MutationFactory";
import { MochaTestRunner } from "./mocha-TestRunner/Mocha-TestRunner";
import { MochaConfig } from "./mocha-TestRunner/MochaConfig";
import { TestFileHandler } from "./testFileHandler/TestFileHandler";

const obj = new FileHandler();
obj.readFile("./testProject/src/index.ts");
const sourceObj = new SourceCodeHandler(obj.getSourceObject());
const mf = new CodeInspector(obj.getSourceObject());
const list = mf.findObjectsOfSyntaxKind(ts.SyntaxKind.PlusToken);
const a = list[0];
sourceObj.modifyCode(a.pos, a.end, MutationFactory.getSingleMutation(ts.SyntaxKind.PlusToken));

obj.writeTempModifiedFile(sourceObj.getModifiedSourceCode());
console.log(sourceObj.getModifiedSourceCode());

const fileHandler = new TestFileHandler();
fileHandler.readTestFileDirectory();
const testFiles = fileHandler.testFiles;

const mochaConfig = new MochaConfig().mocha;
const mochaRunner = new MochaTestRunner(testFiles, mochaConfig);
mochaRunner.addFiles();
mochaRunner.run();
