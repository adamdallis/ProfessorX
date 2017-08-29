import * as ts from "typescript";
import * as Mocha from "mocha";

import { FileHandler } from "./FileHandler/FileHandler";
import { CodeInspector } from "./CodeInspector/CodeInspector";
import { SourceCodeHandler } from "./SourceCodeHandler/SourceCodeHandler";
import { MutationFactory } from "./mutationFactory/MutationFactory";
import { MochaTestRunner } from "./mocha-TestRunner/Mocha-TestRunner";
import { ConfigManager } from "./configManager/ConfigManager";
import { TestFileHandler } from "./testFileHandler/TestFileHandler";
import { OutputStore } from "./output/OutputStore";
import { Cleaner } from "./cleanup/Cleaner";

const config = new ConfigManager();
OutputStore.setSourceFile(config.filePath + config.fileToMutate);
const obj = new FileHandler(config.filePath, config.fileToMutate);
const sourceObj = new SourceCodeHandler(obj.getSourceObject());
const codeInspector = new CodeInspector(obj.getSourceObject());
const minusNodes = codeInspector.findObjectsOfSyntaxKind(ts.SyntaxKind.PlusToken);
const sampleNode = minusNodes[0];
sourceObj.modifyCode(sampleNode.pos, sampleNode.end, MutationFactory.getSingleMutation(ts.SyntaxKind.PlusToken));


obj.writeTempSourceModifiedFile(sourceObj.getModifiedSourceCode());
obj.createTempTestModifiedFile();

OutputStore.setOrigionalSourceCode(sourceObj.getOriginalSourceCode(), sampleNode.pos, true);
OutputStore.setOrigionalSourceCode(sourceObj.getModifiedSourceCode(), sampleNode.pos, false);

const fileHandler = new TestFileHandler(config.filePath);
fileHandler.readTestFileDirectory();
const testFiles = fileHandler.testFiles;

const mochaRunner = new MochaTestRunner(testFiles, config.runnerConfig);
mochaRunner.addFiles();
mochaRunner.run(); //ASYNC MAY CAUSE UNEXPECTED BEHAVIOUR

const cleaner = new Cleaner(config.filePath);
cleaner.deleteMutatedFiles(cleaner.findMutatedFiles());

