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
import { ITestResult } from "../interfaces/ITestResult";
import { Printer } from "./output/printer/Printer";

const filePath = "./testProject/src/";
const fileToMutate = "HelloWorld.ts";

let  outputStore: OutputStore;
const mochaConfig = new MochaConfig().mocha;
const fileHandler = new TestFileHandler(filePath);
const obj = new FileHandler(filePath, fileToMutate);
const sourceObj = new SourceCodeHandler(obj.getSourceObject());
const codeInspector = new CodeInspector(obj.getSourceObject());
const nodes = codeInspector.findObjectsOfSyntaxKind(ts.SyntaxKind.PlusToken);

for (const sampleNode of nodes) {
    sourceObj.resetModified();
    sourceObj.modifyCode(sampleNode.pos, sampleNode.end, MutationFactory.getSingleMutation(ts.SyntaxKind.PlusToken));
    obj.writeTempSourceModifiedFile(sourceObj.getModifiedSourceCode());
    obj.createTempTestModifiedFile();
    outputStore = new OutputStore();
    outputStore.setLineNumber
    (ts.getLineAndCharacterOfPosition(sourceObj.getOriginalSourceObject(), sampleNode.pos).line);
    outputStore.setOrigionalSourceCode(sourceObj.getOriginalSourceCode());
    outputStore.setModifiedSourceCode(sourceObj.getModifiedSourceCode());

    fileHandler.readTestFileDirectory();
    const testFiles = fileHandler.testFiles;
    const mochaRunner = new MochaTestRunner(testFiles, mochaConfig);
    mochaRunner.addFiles();
    mochaRunner.run(finishRun);
}

function finishRun (testResult: ITestResult, testFileNames: Array<string>) {
    outputStore.setStore(testResult, testFileNames);
    const printer = new Printer(outputStore);
    printer.printSourceChanges();
    console.log("-----------------------------------------");

}

const cleaner = new Cleaner(filePath);
cleaner.deleteMutatedFiles(cleaner.findMutatedFiles());
