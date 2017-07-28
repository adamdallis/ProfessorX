//import * as data from "../../profx.conf.json";
import * as Mocha from "mocha";
import { IRunner, IRunnable } from "mocha";
import { ITestResult } from "../../interfaces/ITestResult";
import { Printer } from "../output/printer/Printer";
import { OutputStore } from "../output/OutputStore";
import * as fs from "fs";

export class MochaTestRunner {

    testResult: ITestResult;

    private readonly PATH: string = "C:/git/ProfessorX/testProject/src/";
    private readonly REPORT_TITLE: string = "MUTATION TEST REPORT";
    private testFiles: Array<string> = [];

    private mocha = new Mocha({
        reporter: "mochawesome",
        reporterOptions: {
            autoOpen: true,
            quiet: true,
            reportTitle: this.REPORT_TITLE
        }
    });
    private readonly printer = new Printer();

    run () {
        this.addFiles();
        let runner;
        runner = this.mocha.run(() => {
            const testResult: ITestResult = this.createTestResult(runner.stats);
            this.setStore(testResult);
            this.printer.printSourceChanges();
        });
    }


    isTestFile (filePath: string): boolean {
        return filePath.indexOf(".spec") >= 0;
    }

    private addFiles () {
        fs.readdirSync(this.PATH).forEach((fileName) => {
            if (this.isTestFile(fileName)) {
                //  this.testFiles.push(this.PATH + fileName);
                 this.mocha.addFile(this.PATH + fileName);
            }
        });
    }

    private createTestResult (stats): ITestResult {
        if (stats === void 0){
            throw new Error("stats is undefined");
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

    private setStore (testResult: ITestResult){
            OutputStore.sourceFile = this.testFiles[0];
            OutputStore.numberOfPassedTests = testResult.passed;
            OutputStore.numberOfFailedTests = testResult.failed;
    }
}

const m = new MochaTestRunner();
m.run();