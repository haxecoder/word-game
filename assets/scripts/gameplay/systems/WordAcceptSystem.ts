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
        this.listen("level.complete", this.onLevelComplete);
    }

    private onLevelComplete() {
        this.wordsPlaces.clear();
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
            this.removeLetterPreviews(previewLetters);
            return;
        }

        if (this.model.user.solvedWords.includes(word)) {
            this.removeLetterPreviews(previewLetters);
            this.engine.emitEvent("word.repeat", wordPlace);
            return;
        }

        previewLetters.forEach(it => {
            this.engine.remove(it);
        });

        this.model.user.solvedWords.push(word);
        this.engine.emitEvent("word.accept", { wordPlace, previewLetters } as WordAcceptEventInfo);

        if (this.model.user.solvedWords.length === this.wordsPlaces.length) {
            this.model.user.solvedWords.clear();
            this.model.user.currentLevel++;
            this.engine.emitEvent("level.complete");
        }
    }

    private removeLetterPreviews(previewLetters: LetterEntity[]) {
        previewLetters.forEach(it => {
            this.engine.remove(it);
            this.engine.emitEvent("letter.preview.remove", {
                letter: it, index: 0
            } as AnimatePreviewLettersEventInfo)
        });
    }
}