import { MochaTestRunner } from "./Mocha-TestRunner";
import * as ts from "typescript";
import { expect } from "chai";

describe("Mocha-TestRunner", () => {
    let testRunner: MochaTestRunner;
    beforeEach(() => {
        testRunner = new MochaTestRunner();
    });

    it("a string of spec should return true", () => {
        const testSpecFile = ".spec";
        const actual = testRunner.isTestFile(testSpecFile);
        expect(actual).to.equal(true);
    });

    it("a string containing .spec should return true", () => {
        const testSpecFile = "dir/lowerDir/filename.spec.ts";
        const actual = testRunner.isTestFile(testSpecFile);
        expect(actual).to.equal(true);
    });

    it("a string without .spec should return false", () => {
        const testSpecFile = "dir/lowerDir/filename.ts";
        const actual = testRunner.isTestFile(testSpecFile);
        expect(actual).to.equal(false);
    });

    it("a string with spec in the file name return false", () => {
        const testSpecFile = "dir/lowerDir/Filenamespec.ts";
        const actual = testRunner.isTestFile(testSpecFile);
        expect(actual).to.equal(false);
    });
});