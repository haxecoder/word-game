import { _decorator, Component, Label } from "cc";

const { ccclass, property } = _decorator;
@ccclass("GameUI")
export class GameUI extends Component {

    @property(Label)
    private txtCurrentLevel: Label;

    public setCurrentLevelText(value: string) {
        this.txtCurrentLevel.string = value;
    }

}