//import * as data from "../../profx.conf.json";
import * as Mocha from "mocha";
import { IRunner, IRunnable } from "mocha";
import { ITestResult } from "../../interfaces/ITestResult";
import { Printer } from "../output/printer/Printer";
import { OutputStore } from "../output/OutputStore";

export class MochaTestRunner {

    testResult: ITestResult;

    private readonly PATH: string = "C:/git/ProfessorX/testProject/src/index.spec.ts";
    private readonly REPORT_TITLE: string = "MUTATION TEST REPORT";
    private files: Array<string>;
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
        const printer = new Printer();
        this.addFiles();
        this.mocha.addFile(this.files[0]);
        let runner;
        runner = this.mocha.run(() => {
            const testResult: ITestResult = this.createTestResult(runner.stats);
            this.setStore(testResult);
            printer.printSourceChanges();
        });
    }

    private addFiles () {
        this.files = [this.PATH];
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
            OutputStore.sourceFile = this.files[0];
            OutputStore.numberOfPassedTests = testResult.passed;
            OutputStore.numberOfFailedTests = testResult.failed;
    }
}

const m = new MochaTestRunner();
m.run();