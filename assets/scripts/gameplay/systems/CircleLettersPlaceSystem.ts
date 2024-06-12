import { System } from "db://assets/scripts/gameplay/systems/System";
import { LettersCollector } from "db://assets/scripts/utils/LettersCollector";
import { EventEntity } from "db://assets/scripts/gameplay/entity/EventEntity";
import { LetterComponent } from "db://assets/scripts/gameplay/components/LetterComponent";
import { LetterEntity } from "db://assets/scripts/gameplay/entity/Entity";

export class CircleLettersPlaceSystem extends System {

    private readonly circleRadius = 140;

    private collector: LettersCollector = new LettersCollector();
    private letters: LetterEntity[] = [];

    constructor() {
        super();

        this.listen("words.ready", this.onWordsReady);
        this.listen("level.complete", this.onLevelComplete);
    }

    private onLevelComplete() {
        this.letters.clear();
    }

    private onWordsReady(e: EventEntity) {
        const words = e.info as string[];
        const letters = this.collector.collect(words);
        const sector = 2 * Math.PI / letters.length;

        letters.forEach((letter, index) => {
            const node = this.model.prefabs.getCircleLetter();
            const entity = this.model.entities.createCircleLetter(node, letter);

            node.getComponent(LetterComponent).setLabel(letter.toUpperCase());

            this.model.layers.circleLetters.addChild(node);
            node.setPosition(
                this.circleRadius * Math.sin(sector * index),
                this.circleRadius * Math.cos(sector * index)
            );

            this.letters.push(entity);
        });

        this.letters.forEach(it => this.engine.add(it));
    }

}