//import * as data from "../../profx.conf.json";
import * as Mocha from "mocha";
import { IRunner, IRunnable } from "mocha";
import { ITestResult } from "../../interfaces/ITestResult";
import { Printer } from "../output/printer/Printer";
import { OutputStore } from "../output/OutputStore";
import * as fs from "fs";

export class MochaTestRunner {

    testDirPath = "C:/git/ProfessorX/testProject/src/";
    testResult: ITestResult;
    testFiles: Array<string> = [];

    private readonly REPORT_TITLE: string = "MUTATION TEST REPORT";

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
        this.addFiles(fs.readdirSync(this.testDirPath));
        //TODO REMOVE MOCHA RUN INTO OWN FUNCTION
        //SO THAT ADDFILES CAN ABORT TEST RUN
        let runner;
        runner = this.mocha.run(() => {
            const testResult: ITestResult = this.createTestResult(runner.stats);
            OutputStore.setStore(testResult, this.testFiles);
            this.printer.printSourceChanges();
        });
    }

    isTestFile (filePath: string): boolean {
        return filePath.indexOf(".spec") >= 0;
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

    addFiles (arrayOfFileNames: Array<string>) {
        arrayOfFileNames.forEach((fileName) => {
            if (this.isTestFile(fileName)) {
                this.testFiles.push(this.testDirPath + fileName);
                this.mocha.addFile(this.testDirPath + fileName);
            }
        });
        if (this.testFiles.length === 0){
            throw new Error("Aborting Mocha test run, no test files found");
        }
    }

}
