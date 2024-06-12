import { System } from "db://assets/scripts/gameplay/systems/System";
import { EventEntity } from "db://assets/scripts/gameplay/entity/EventEntity";
import { LetterEntity } from "db://assets/scripts/gameplay/entity/Entity";
import { Node, UITransform } from "cc";
import { LetterComponent } from "db://assets/scripts/gameplay/components/LetterComponent";

export class WordLettersPlaceSystem extends System {

    private readonly letterSize = 72;
    private readonly letterOffset = 5;

    private readonly wordsContainerMaxHeight = 400;

    constructor() {
        super();

        this.listen("words.ready", this.onWordsReady);
    }

    private onWordsReady(e: EventEntity) {
        const words = e.info as string[];
        words.sort((a, b) => a.length - b.length);
        const wordsHeight = - Math.floor((this.letterSize + this.letterOffset) * (words.length - 1));

        const wordsContainer = new Node();
        wordsContainer.addComponent(UITransform);

        words.forEach((word, wordIndex) => {
            const wordLetters: LetterEntity[] = [];

            word.split("").forEach(letter => {
                const wordLetterNode = this.model.prefabs.getWordLetter();
                const wordLetter = this.model.entities.createWordLetter(wordLetterNode, letter);

                wordLetterNode.getComponent(LetterComponent).setLabel("");
                wordLetterNode.getComponent(LetterComponent).deselect();

                wordLetters.push(wordLetter);
            });

            const wordPlace = this.model.entities.createWordPlace(word, wordLetters);
            this.engine.add(wordPlace);

            const lettersContainer = new Node();

            wordLetters.forEach((letter, i) => {
                letter.view.node.setPosition(i * (this.letterSize + this.letterOffset), 0);
                lettersContainer.addChild(letter.view.node);
            });

            wordsContainer.addChild(lettersContainer);

            const containerXPos = - Math.floor(((wordLetters.length - 1) * (this.letterSize + this.letterOffset)) / 2);

            lettersContainer.setPosition(containerXPos, -(this.letterSize + this.letterOffset) * wordIndex);
        });

        if (Math.abs(wordsHeight) > this.wordsContainerMaxHeight) {
            const scale = this.wordsContainerMaxHeight / Math.abs(wordsHeight);
            wordsContainer.setScale(scale, scale);
            wordsContainer.setPosition(0, - wordsHeight * scale / 2);
        } else {
            wordsContainer.setPosition(0, - wordsHeight / 2);
        }

        this.model.layers.wordsLetters.addChild(wordsContainer);
    }
}