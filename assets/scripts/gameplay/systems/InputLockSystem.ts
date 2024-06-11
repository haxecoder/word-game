import { System } from "db://assets/scripts/gameplay/systems/System";
import { BlockInputEvents, director } from "cc";

export class InputLockSystem extends System {

    constructor() {
        super();

        this.listen("input.lock", this.onInputLock);
        this.listen("input.unlock", this.onInputUnlock);
    }

    private onInputLock() {
        if (this.blockComponent) {
            this.blockComponent.node.active = true;
        }
    }

    private onInputUnlock() {
        if (this.blockComponent) {
            this.blockComponent.node.active = false;
        }
    }

    private get blockComponent() {
        const scene = director.getScene();

        if (!scene) {
            return null;
        }

        return scene.getComponentInChildren(BlockInputEvents);
    }
}