import { expect } from "chai";
import * as Mocha from "mocha";

import { OutputStore } from "./OutputStore";

describe("Output Store", () => {
    const origionalCode = `export class HelloWorld {
    public addNumbers (a: number, b: number) {
        return a + b;
    }
}`;
    const firstLine = "export class HelloWorld {";
    beforeEach(() => {
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
        OutputStore.setOrigionalSourceCode(origionalCode, 20);
        expect(OutputStore.origionalCode.toString()).to.equal(firstLine);
    });

    it("should set origional code to the 0th line when given char number of 0", () => {
        OutputStore.setOrigionalSourceCode(origionalCode, 0);
        expect(OutputStore.origionalCode.toString()).to.equal(firstLine);
    });

    it("should set origional code to the last line when given char number of stringlength", () => {
        OutputStore.setOrigionalSourceCode(origionalCode, origionalCode.length);
        expect(OutputStore.origionalCode.toString()).to.equal("}");
    });
});
