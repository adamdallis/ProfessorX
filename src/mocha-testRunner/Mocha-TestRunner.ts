import * as Mocha from "mocha";

import { ITestResult } from "../../interfaces/ITestResult";
import { Printer } from "../output/printer/Printer";
import { OutputStore } from "../output/OutputStore";
import { TestFileHandler } from "../testFileHandler/TestFileHandler";
import { MochaConfig } from "./MochaConfig";

export class MochaTestRunner {

    testResult: ITestResult;
    testFiles: Array<string> = [];
    mocha: Mocha;
    private readonly printer = new Printer();

    constructor (testFiles : Array<string>, mocha: Mocha) {
        this.mocha = mocha;
        this.testFiles = testFiles;
    }

    addFiles (): boolean {
        if (this.testFiles.length === 0){
            return false;
        }
        for (let i = 0; i < this.testFiles.length; i++){
            this.mocha.addFile(this.testFiles[i]);
        }
        return true;
    }

    run () {
        if (this.testFiles.length === 0 || this.testFiles === void 0) {
            return;
        }
        let runner;
        runner = this.mocha.run(() => {
            const testResult: ITestResult = this.createTestResult(runner.stats);
            OutputStore.setStore(testResult, this.testFiles);
            this.printer.printSourceChanges();
        });
    }

    createTestResult (stats): ITestResult {
        if (stats === void 0){
            throw new Error("Test result is undefined");
        }
        const result =
        {
            passed: stats.passes,
            failed: stats.failures,
            totalRan: stats.tests,
            duration: stats.duration
        };
        return result;
    }
}
