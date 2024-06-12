import { Node } from "cc";
import { Entity, LetterEntity, WordPlaceEntity } from "db://assets/scripts/gameplay/entity/Entity";

export class EntityFactory {

    public createCircleLetter(node: Node, letter: string): LetterEntity {
        return {
            type: "letter.circle",
            view: { node },
            info: { letter }
        };
    }

    public createWordPlace(word: string, letters: LetterEntity[]): WordPlaceEntity {
        return {
            type: "word.place",
            info: { word, letters }
        }
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

    public createSwapButton(node: Node): Entity {
        return {
            type: "button.swap",
            view: { node }
        };
    }

    public createGameUI(node: Node): Entity {
        return {
            type: "game.ui",
            view: { node }
        };
    }
}