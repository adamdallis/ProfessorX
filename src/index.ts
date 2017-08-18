import * as ts from "typescript";
import * as Mocha from "mocha";

import { FileHandler } from "./FileHandler/FileHandler";
import { CodeInspector } from "./CodeInspector/CodeInspector";
import { SourceCodeHandler } from "./SourceCodeHandler/SourceCodeHandler";
import { MutationFactory } from "./mutationFactory/MutationFactory";
import { MochaTestRunner } from "./mocha-TestRunner/Mocha-TestRunner";
import { MochaConfig } from "./mocha-TestRunner/MochaConfig";
import { TestFileHandler } from "./testFileHandler/TestFileHandler";
import { OutputStore } from "./output/OutputStore";

const obj = new FileHandler("./testProject/src/", "HelloWorld.ts");
const sourceObj = new SourceCodeHandler(obj.getSourceObject());
const codeInspector = new CodeInspector(obj.getSourceObject());
const minusNodes = codeInspector.findObjectsOfSyntaxKind(ts.SyntaxKind.PlusToken);
const sampleNode = minusNodes[0];
sourceObj.modifyCode(sampleNode.pos, sampleNode.end, MutationFactory.getSingleMutation(ts.SyntaxKind.PlusToken));

OutputStore.setLineNumber(sourceObj.getOriginalSourceCode(), sampleNode.pos);

obj.writeTempSourceModifiedFile(sourceObj.getModifiedSourceCode());
obj.createTempTestModifiedFile();

const fileHandler = new TestFileHandler();
fileHandler.readTestFileDirectory();
fileHandler.addFiles(fileHandler.testFiles);
const testFiles = fileHandler.testFiles;
console.log(testFiles);
const mochaConfig = new MochaConfig().mocha;
const mochaRunner = new MochaTestRunner(testFiles, mochaConfig);
mochaRunner.addFiles();
mochaRunner.run();

//run cleanup
