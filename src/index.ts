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
import { Cleaner } from "./cleanup/Cleaner";

const filePath = "./testProject/src/";
const fileToMutate = "HelloWorld.ts";

OutputStore.setMutatedSourceFile(filePath + fileToMutate);

const obj = new FileHandler(filePath, fileToMutate);
const sourceObj = new SourceCodeHandler(obj.getSourceObject());
const codeInspector = new CodeInspector(obj.getSourceObject());
const minusNodes = codeInspector.findObjectsOfSyntaxKind(ts.SyntaxKind.PlusToken);
const sampleNode = minusNodes[0];
sourceObj.modifyCode(sampleNode.pos, sampleNode.end, MutationFactory.getSingleMutation(ts.SyntaxKind.PlusToken));


obj.writeTempSourceModifiedFile(sourceObj.getModifiedSourceCode());
obj.createTempTestModifiedFile();

OutputStore.setOrigionalSourceCode(sourceObj.getOriginalSourceCode(), sampleNode.pos, true);
OutputStore.setOrigionalSourceCode(sourceObj.getModifiedSourceCode(), sampleNode.pos, false);

const fileHandler = new TestFileHandler(filePath);
fileHandler.readTestFileDirectory();
const testFiles = fileHandler.testFiles;

const mochaConfig = new MochaConfig().mocha;
const mochaRunner = new MochaTestRunner(testFiles, mochaConfig);
mochaRunner.addFiles();
mochaRunner.run(); //ASYNC MAY CAUSE UNEXPECTED BEHAVIOUR

const cleaner = new Cleaner(filePath);
cleaner.deleteMutatedFiles(cleaner.findMutatedFiles());

