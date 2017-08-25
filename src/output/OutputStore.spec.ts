import { expect } from "chai";

import { ITestResult } from "../../interfaces/ITestResult";
import { OutputStore } from "./OutputStore";

describe("Output Store", () => {
    const origionalCode = `export class HelloWorld {
    public addNumbers (a: number, b: number) {
        return a + b;
    }
}`;
    const firstLine = "export class HelloWorld {";
    const testResult: ITestResult = {
        passed : "1",
        failed : "2",
        totalRan : "3",
        duration : "20"
    };

    beforeEach(() => {
    });

    it("should set the number of passed tests to 1", () => {
        OutputStore.setTests(testResult);
        expect(OutputStore.numberOfPassedTests).to.equal("1");
    });

    it("should set the source file to ./sourceFile.ts", () => {
        OutputStore.setSourceFile("./sourceFile.ts");
        expect(OutputStore.sourceFile).to.equal("./sourceFile.ts");
    });

    it("should set the number of failed tests to 2", () => {
        OutputStore.setTests(testResult);
        expect(OutputStore.numberOfFailedTests).to.equal("2");
    });

    it("should set line number to 1 for a character number of 20", () => {
        OutputStore.setLineNumber(origionalCode, 20);
        expect(OutputStore.lineNumber).to.equal(1);
    });

    it("should set line number to 2 for a character number of 36", () => {
        OutputStore.setLineNumber(origionalCode, 36);
        expect(OutputStore.lineNumber).to.equal(2);
    });

    it("should set line number to 2 for a character number of 50", () => {
        OutputStore.setLineNumber(origionalCode, 50);
        expect(OutputStore.lineNumber).to.equal(2);
    });

    it("should set line number to 5 for a character number of string length-1", () => {
        OutputStore.setLineNumber(origionalCode, origionalCode.length - 1);
        expect(OutputStore.lineNumber).to.equal(5);
    });

    it("should set line number to 1 for a character number of 0", () => {
        OutputStore.setLineNumber(origionalCode, 0);
        expect(OutputStore.lineNumber).to.equal(1);
    });

    it("should set line number to last line (5) for a character number of code length", () => {
        OutputStore.setLineNumber(origionalCode, origionalCode.length);
        expect(OutputStore.lineNumber).to.equal(5);
    });

    it("should set origional code to the 1st line when given char number of 20", () => {
        OutputStore.setOrigionalSourceCode(origionalCode, 20, true);
        expect(OutputStore.origionalCode.toString()).to.equal(firstLine);
    });

    it("should set origional code to the 1st line when given char number of 0", () => {
        OutputStore.setOrigionalSourceCode(origionalCode, 0, true);
        expect(OutputStore.origionalCode.toString()).to.equal(firstLine);
    });

    it("should set origional code to the last line when given char number of stringlength", () => {
        OutputStore.setOrigionalSourceCode(origionalCode, origionalCode.length, true);
        expect(OutputStore.origionalCode.toString()).to.equal("}");
    });
});
