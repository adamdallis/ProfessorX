import { expect } from "chai";
import * as Mocha from "mocha";

import { OutputStore } from "./OutputStore";
import { ITestResult } from "../../interfaces/ITestResult";

describe("Output Store", () => {
    const origionalCode = `export class HelloWorld {
    public addNumbers (a: number, b: number) {
        return a + b;
    }
}`;
    let testResult: ITestResult;
    const firstLine = "export class HelloWorld {";
    beforeEach(() => {
        testResult = {passed: "0", failed: "2", totalRan: "0", duration: "20"};
    });

    it("ITestResult.passed of 0 should set passed tests to 0", () => {
        OutputStore.setNumberOfTests(testResult);
        expect(OutputStore.numberOfPassedTests).to.equal(0);
    });

    it("ITestResult.failed of 2 should set passed tests to 2", () => {
        OutputStore.setNumberOfTests(testResult);
        expect(OutputStore.numberOfFailedTests).to.equal(2);
    });

    it("should set line number to 0 for a character number of 20", () => {
        OutputStore.setLineNumber(origionalCode, 20);
        expect(OutputStore.lineNumber).to.equal(0);
    });

    it("should set line number to 1 for a character number of 36", () => {
        OutputStore.setLineNumber(origionalCode, 36);
        expect(OutputStore.lineNumber).to.equal(1);
    });

    it("should set line number to 1 for a character number of 50", () => {
        OutputStore.setLineNumber(origionalCode, 50);
        expect(OutputStore.lineNumber).to.equal(1);
    });

    it("should set line number to 4 for a character number of string length-1", () => {
        OutputStore.setLineNumber(origionalCode, origionalCode.length - 1);
        expect(OutputStore.lineNumber).to.equal(4);
    });

    it("should set line number to 0 for a character number of 0", () => {
        OutputStore.setLineNumber(origionalCode, 0);
        expect(OutputStore.lineNumber).to.equal(0);
    });

    it("should set line number to last line (4) for a character number of code length", () => {
        OutputStore.setLineNumber(origionalCode, origionalCode.length);
        expect(OutputStore.lineNumber).to.equal(4);
    });

    it("should set origional code to the 0th line when given char number of 20", () => {
        OutputStore.setOrigionalSourceCode(origionalCode, 20, true);
        expect(OutputStore.origionalCode.toString()).to.equal(firstLine);
    });

    it("should set origional code to the 0th line when given char number of 0", () => {
        OutputStore.setOrigionalSourceCode(origionalCode, 0, true);
        expect(OutputStore.origionalCode.toString()).to.equal(firstLine);
    });

    it("should set origional code to the last line when given char number of stringlength", () => {
        OutputStore.setOrigionalSourceCode(origionalCode, origionalCode.length, true);
        expect(OutputStore.origionalCode.toString()).to.equal("}");
    });

    it("should set mutation score to 100 when given 0, 1", () => {
        OutputStore.setMutationScore(0, 1);
        expect(OutputStore.mutationScore).to.equal(100);
    });

    it("should set mutation score to 0 when given 1, 0", () => {
        OutputStore.setMutationScore(1, 0);
        expect(OutputStore.mutationScore).to.equal(0);
    });

    it("should set mutation score to 67 when given 1, 2", () => {
        OutputStore.setMutationScore(1, 2);
        expect(OutputStore.mutationScore).to.equal(67);
    });
});
