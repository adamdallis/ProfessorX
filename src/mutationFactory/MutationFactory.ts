import * as ts from "typescript";
import { SyntaxKind } from "typescript";

interface IsyntaxMutationMap {
    [syntaxKind: number]: Array<SyntaxKind>;
}

export class MutationFactory {
    private syntaxMutationMap: IsyntaxMutationMap = {
        37: [SyntaxKind.MinusToken],
        38: [SyntaxKind.PlusToken],
        39: [SyntaxKind.SlashToken],
        101: [SyntaxKind.FalseKeyword],
        86: [SyntaxKind.TrueKeyword]
    };

    getSingleMutation (syntaxKind: ts.SyntaxKind): number {
        return this.syntaxMutationMap[syntaxKind][0];
    }

}
