function importTest (name, path) {
    describe(name, () => {
        require(path);
    });
}

describe("top",  () => {
    beforeEach(() => {
    });
    importTest("a", "../testProject/src/index.spec.ts");
    after(() => {
        console.log("after all tests");
    });
});