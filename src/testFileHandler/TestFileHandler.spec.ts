import { TestFileHandler } from "./TestFileHandler";
import { expect } from "chai";

describe("Test File Handler", () => {
    let testFileHandler: TestFileHandler;
    beforeEach(() => {
        testFileHandler = new TestFileHandler();
    });

    it("when given 1 test file returns 1 filename", () => {
        const fakeFileNames = ["filename1.spec"];
        testFileHandler.addFiles(fakeFileNames);
        expect(testFileHandler.testFiles.length).to.equal(1);
    });

    it("when given 2 test files returns 2 filenames", () => {
        const fakeFileNames = ["filename1.spec", "filename2.spec"];
        testFileHandler.addFiles(fakeFileNames);
        expect(testFileHandler.testFiles.length).to.equal(2);
    });

    it("when given 2 test files returns file names equal inputed plus origional dir path", () => {
        const fakeFileNames = ["filename1.spec", "filename2.spec"];
        testFileHandler.addFiles(fakeFileNames);
        expect(testFileHandler.testFiles[0]).to.equal(testFileHandler.testDirPath + fakeFileNames[0]);
        expect(testFileHandler.testFiles[1]).to.equal(testFileHandler.testDirPath + fakeFileNames[1]);
    });

    it("when given no file names, it should throw an error", () => {
        const fakeFileNames = [];
        expect(() => {
            testFileHandler.addFiles(fakeFileNames);
        }).to.throw();
    });

    it("a string of spec should return true", () => {
        const testSpecFile = ".spec";
        const actual = testFileHandler.isTestFile(testSpecFile);
        expect(actual).to.equal(true);
    });

    it("a string containing .spec should return true", () => {
        const testSpecFile = "dir/lowerDir/filename.spec.ts";
        const actual = testFileHandler.isTestFile(testSpecFile);
        expect(actual).to.equal(true);
    });

    it("a string without .spec should return false", () => {
        const testSpecFile = "dir/lowerDir/filename.ts";
        const actual = testFileHandler.isTestFile(testSpecFile);
        expect(actual).to.equal(false);
    });

    it("a string with spec in the file name return false", () => {
        const testSpecFile = "dir/lowerDir/Filenamespec.ts";
        const actual = testFileHandler.isTestFile(testSpecFile);
        expect(actual).to.equal(false);
    });
});