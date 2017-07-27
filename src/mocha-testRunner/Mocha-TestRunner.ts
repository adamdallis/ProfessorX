//import * as data from "../../profx.conf.json";
import * as Mocha from "mocha";
import { IRunner, IRunnable } from "mocha";
import { ITestResult } from "../../interfaces/ITestResult";
import { Printer } from "../output/printer/Printer";
import { OutputStore } from "../output/OutputStore";

export class MochaTestRunner {

    testResult: ITestResult;

    private readonly path: string = "C:/git/ProfessorX/testProject/src/index.spec.ts";
    private files: Array<string>;
    private mocha = new Mocha();
    private readonly printer = new Printer();

    run () {
        const printer = new Printer();
        this.addFiles();
        this.mocha.addFile(this.files[0]);
        let runner;
        runner = this.mocha.run(() => {
            const testResult: ITestResult = this.createTestResult(runner.stats);
            OutputStore.numberOfPassedTests = testResult.passed;
            OutputStore.numberOfFailedTests = testResult.failed;
            printer.printSourceChanges();
        });
    }

    private addFiles () {
        this.files = [this.path];
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
}

const m = new MochaTestRunner();
m.run();