import { MutationFactory } from "./MutationFactory";
import * as ts from "typescript";
import { expect } from "chai";

describe("Testing MutationFactory", () => {
    let factory: MutationFactory;
    beforeEach(() => {
        factory = new MutationFactory();
    });

    it("inputing a plus token value (37) should return a minus token value (38)", () => {
        const expected = 38;
        const actual = factory.getSingleMutation(ts.SyntaxKind.PlusToken);
        expect(actual).to.equal(expected);
    });
    it("inputing a minus token value (38) should return a plus token value (37)", () => {
        const expected = 37;
        const actual = factory.getSingleMutation(ts.SyntaxKind.MinusToken);
        expect(actual).to.equal(expected);
    });
    it("inputing an asterix token value (39) should return a plus token value (41)", () => {
        const expected = 41;
        const actual = factory.getSingleMutation(ts.SyntaxKind.AsteriskToken);
        expect(actual).to.equal(expected);
    });
    it("inputing a true keyword value (101) should return a false keyword value (86)", () => {
        const expected = 86;
        const actual = factory.getSingleMutation(ts.SyntaxKind.TrueKeyword);
        expect(actual).to.equal(expected);
    });
    it("inputing a false keyword value (86) should return a true keyword value (101)", () => {
        const expected = 101;
        const actual = factory.getSingleMutation(ts.SyntaxKind.FalseKeyword);
        expect(actual).to.equal(expected);
    });
});