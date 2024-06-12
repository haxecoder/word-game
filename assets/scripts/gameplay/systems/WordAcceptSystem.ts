import { System } from "db://assets/scripts/gameplay/systems/System";
import { Entity, LetterEntity, WordPlaceEntity } from "db://assets/scripts/gameplay/entity/Entity";
import {
    AnimatePreviewLettersEventInfo,
    EventEntity,
    WordAcceptEventInfo
} from "db://assets/scripts/gameplay/entity/EventEntity";

export class WordAcceptSystem extends System {

    private wordsPlaces: WordPlaceEntity[] = [];

    constructor() {
        super();

        this.listen("word.input", this.onWordInput);
    }

    public override onEntityAdded(entity: Entity) {
        if (entity.type === "word.place") {
            this.wordsPlaces.push(entity as WordPlaceEntity);
        }
    }

    private onWordInput(e: EventEntity) {
        const previewLetters = this.engine.getEntitiesByType("letter.preview") as LetterEntity[];

        const letters = e.info as LetterEntity[];
        const word = letters.map(it => it.info.letter).join("");
        const wordPlace = this.wordsPlaces.find(it => it.info.word === word);

        if (!wordPlace) {
            previewLetters.forEach(it => {
                this.engine.remove(it);
                this.engine.emitEvent("letter.preview.remove", {
                    letter: it, index: 0
                } as AnimatePreviewLettersEventInfo)
            });

            return;
        }

        previewLetters.forEach(it => {
            this.engine.remove(it);
        });

        this.engine.emitEvent("word.accept", { wordPlace, previewLetters } as WordAcceptEventInfo);

        this.model.user.solvedWords.push(word);
    }
}