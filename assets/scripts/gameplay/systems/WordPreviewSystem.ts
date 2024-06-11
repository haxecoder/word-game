import { System } from "db://assets/scripts/gameplay/systems/System";
import { AnimatePreviewLettersEventInfo, ChangeSelectedLettersEvent } from "db://assets/scripts/gameplay/entity/EventEntity";
import { LetterEntity } from "db://assets/scripts/gameplay/entity/Entity";
import { LetterComponent } from "db://assets/scripts/gameplay/components/LetterComponent";
import { tween, Vec3 } from "cc";


export class WordPreviewSystem extends System {

    private readonly tweenLettersContainerDuration = 0.12;
    private readonly lettersOffset = 50;
    private letters: LetterEntity[] = [];

    constructor() {
        super();

        this.listen("letters.changeSelected", this.onChangeSelectedLetters);
        this.listen("word.input", this.onWordInput);
    }

    private get word(): string {
        return this.letters.map(it => it.info.letter).join("");
    }

    private onWordInput() {
        this.letters.forEach(it => this.engine.emitEvent("letter.preview.remove", {
            letter: it, index: 0
        } as AnimatePreviewLettersEventInfo));

        this.letters.clear();
    }

    private onChangeSelectedLetters(e: ChangeSelectedLettersEvent) {
        const newWord = e.info.letters.map(it => it.info.letter).join("");

        if (this.word === newWord) {
            return;
        }

        if (newWord.length === 1 && this.word.length === 0) {
            this.model.layers.previewLetters.setPosition(0, 0);
        }

        if (newWord.length > this.word.length) {
            const letter = this.createPreviewLetter(newWord.split("").pop());
            this.letters.push(letter);
            this.model.layers.previewLetters.addChild(letter.view.node);
            this.engine.emitEvent("letter.preview.add", {
                letter, index: this.letters.length - 1
            } as AnimatePreviewLettersEventInfo);
        } else {
            const letter = this.letters.pop();
            this.engine.emitEvent("letter.preview.remove", {
                letter, index: 0
            } as AnimatePreviewLettersEventInfo);
        }

        tween(this.model.layers.previewLetters)
            .to(this.tweenLettersContainerDuration, { position: new Vec3((- (this.letters.length - 1) * this.lettersOffset) / 2, 0) })
            .start();
    }

    private createPreviewLetter(letter: string): LetterEntity {
        const node = this.model.prefabs.getPreviewLetter();
        const entity = this.model.entities.createPreviewLetter(node, letter);
        node.getComponent(LetterComponent).deselect();
        node.getComponent(LetterComponent).setLabel(letter.toUpperCase());
        return entity;
    }

}