import * as ts from "typescript";
import { expect } from "chai";
import { CodeInspector } from "./CodeInspector";

describe("Testing CodeInspector", () => {
    const code = `
    public testName () {
        let x: number = 3 + 9;
        const y: number = 11;
        const z = x+y;
    }
    public functionTwo () {}
    `;
    const sourceObj = ts.createSourceFile("", code, ts.ScriptTarget.ES5, true);
    const ci: CodeInspector = new CodeInspector(sourceObj);

    beforeEach(() => {
    });

    it("All plus signs are detected", () => {
        const actual = ci.findObjectsOfSyntaxKind(ts.SyntaxKind.PlusToken);
        expect(actual.length).to.equal(2);
    });

    it("All binary expressions are detected", () => {
        const actual = ci.findObjectsOfSyntaxKind(ts.SyntaxKind.BinaryExpression);
        expect(actual.length).to.equal(2);
    });

    it("All function names are found", () => {
        const names = ci.findFunctionNames();
        expect(names.length).to.equal(2);
    });


});
