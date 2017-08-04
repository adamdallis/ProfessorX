function importTest (name, path) {
    describe(name, () => {
        require(path);
    });
}

describe("wrapper for all user project tests", () => {
    beforeEach(() => {
       console.log("running something before each test");
    });
    importTest("index1", "../testProject/src/index.spec.ts");
    importTest("index2", "../testProject/src/test2.spec.ts");
    after(() => {
        console.log("after all tests");
    });
});