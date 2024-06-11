import { Node } from "cc";
import { LetterEntity } from "db://assets/scripts/gameplay/entity/Entity";

export class EntityFactory {

    public createCircleLetter(node: Node, letter: string): LetterEntity {
        return {
            type: "letter.circle",
            view: { node },
            info: { letter }
        };
    }

    public createWordLetter(node: Node, letter: string): LetterEntity {
        return {
            type: "letter.word",
            view: { node },
            info: { letter }
        };
    }

    public createPreviewLetter(node: Node, letter: string): LetterEntity {
        return {
            type: "letter.preview",
            view: { node },
            info: { letter }
        };
    }

}