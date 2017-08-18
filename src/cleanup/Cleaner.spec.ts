import { expect } from "chai";
import { Cleaner } from "./Cleaner";
import { FileHandler } from "../FileHandler/FileHandler";


describe("Cleaner", () => {
    let cleaner: Cleaner;
    let fileHandler: FileHandler;
    const suffix = FileHandler.M_TEST_FILE_SUFFIX;
    const testFileDir = "./testProject/src/";
    beforeEach(() => {
        cleaner = new Cleaner(testFileDir);
        fileHandler = new FileHandler();
        fileHandler.path = testFileDir + "HelloWorld";
        fileHandler.writeTempModifiedFile("CODECODECODE");
    });

    it("should find an array of files ending in the testfile suffix", () => {
        cleaner.findMutatedTestFiles();
        //expect().to.equal(false);
    });
});