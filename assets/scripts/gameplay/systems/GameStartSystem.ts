import { System } from "db://assets/scripts/gameplay/systems/System";

export class GameStartSystem extends System {

    constructor() {
        super();

        this.listen("game.start", this.onGameStart);
    }

    private onGameStart() {
        this.emitEvent("input.lock");

        const coords = [
            {x: 0, y: 0},
            {x: 200, y: 0},

            {x: 0, y: 200},
            {x: 200, y: 200},
        ];

        for (let i = 0; i < 4; i++) {
            const lNode = this.model.prefabs.getCircleLetter();
            const lEntity = this.model.entities.createCircleLetter(lNode, "А");

            this.model.layers.letters.addChild(lNode);
            lNode.setPosition(coords[i].x, coords[i].y);
            this.engine.add(lEntity);
        }

        this.emitEvent("input.unlock");
    }
}