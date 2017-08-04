import {SyntaxKind} from "typescript";
import {IsyntaxMutationMap} from "../../interfaces/IsyntaxMutationMap";

export class MutationFactory {
    private syntaxMutationMap: IsyntaxMutationMap = {
        37: [SyntaxKind.MinusToken],
        38: [SyntaxKind.PlusToken],
        39: [SyntaxKind.SlashToken],
        101: [SyntaxKind.FalseKeyword],
        86: [SyntaxKind.TrueKeyword]
    };

    getSingleMutation (syntaxKind: SyntaxKind): number {
        return this.syntaxMutationMap[syntaxKind][0];
    }
}
