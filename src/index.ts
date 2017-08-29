import * as ts from "typescript";
import * as Mocha from "mocha";

import { FileHandler } from "./FileHandler/FileHandler";
import { CodeInspector } from "./CodeInspector/CodeInspector";
import { SourceCodeHandler } from "./SourceCodeHandler/SourceCodeHandler";
import { MutationFactory } from "./mutationFactory/MutationFactory";
import { MochaTestRunner } from "./mocha-testRunner/Mocha-TestRunner";
import { MochaConfig } from "./mocha-testRunner/MochaConfig";
import { TestFileHandler } from "./testFileHandler/TestFileHandler";
import { OutputStore } from "./output/OutputStore";
import { Cleaner } from "./cleanup/Cleaner";
import { ITestResult } from "../interfaces/ITestResult";
import { Printer } from "./output/printer/Printer";

const filePath = "./testProject/src/";
const fileToMutate = "HelloWorld.ts";

let  outputStore: OutputStore;
const mochaConfig = new MochaConfig().mocha;
const testFileHandler = new TestFileHandler(filePath);
const fileHandler = new FileHandler(filePath, fileToMutate);
const sourceObj = new SourceCodeHandler(fileHandler.getSourceObject());
const codeInspector = new CodeInspector(fileHandler.getSourceObject());
const nodes = codeInspector.findObjectsOfSyntaxKind(ts.SyntaxKind.PlusToken);
const cleaner = new Cleaner(filePath);

for (const sampleNode of nodes) {
    outputStore = new OutputStore();
    sourceObj.resetModified();
    sourceObj.modifyCode(sampleNode.pos, sampleNode.end, MutationFactory.getSingleMutation(ts.SyntaxKind.PlusToken));
    fileHandler.writeTempSourceModifiedFile(sourceObj.getModifiedSourceCode());
    const testFile = fileHandler.createTempTestModifiedFile();
    // console.log(testFile);
    outputStore.setTestFile(testFile);
    outputStore.setLineNumber
    (ts.getLineAndCharacterOfPosition(sourceObj.getOriginalSourceObject(), sampleNode.pos).line);
    outputStore.setOrigionalSourceCode(sourceObj.getOriginalSourceCode());
    outputStore.setModifiedSourceCode(sourceObj.getModifiedSourceCode());

    const mochaRunner = new MochaTestRunner([testFile], mochaConfig);
    mochaRunner.addFiles();
    mochaRunner.run(finishRun);
}


function finishRun (testResult: ITestResult, testFileNames: Array<string>) {
    outputStore.setScores(testResult);
    const printer = new Printer(outputStore);
    printer.printSourceChanges();
    console.log("-----------------------------------------");
    cleaner.deleteTestFile(outputStore.testFilePath);
}
