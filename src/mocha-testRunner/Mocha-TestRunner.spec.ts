import { MochaTestRunner } from "./Mocha-TestRunner";
import * as ts from "typescript";
import { expect } from "chai";
import { TestFileHandler } from "../testFileHandler/TestFileHandler";

describe("Mocha-TestRunner", () => {
    let testRunner: MochaTestRunner;
    beforeEach(() => {
        testRunner = new MochaTestRunner(new TestFileHandler());
    });

    it("returns false when no test files are added", () => {
        testRunner.testFiles = [];
        expect(testRunner.addFiles()).to.equal(false);
    });

    it("returns true when a file is added", () => {
        testRunner.testFiles = ["src/test.spec.ts"];
        testRunner.addFiles();
        expect(testRunner.addFiles()).to.equal(true);
    });
});