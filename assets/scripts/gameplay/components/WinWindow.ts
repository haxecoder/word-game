import { _decorator, Button, Component, Label, NodeEventType } from "cc";
import { locale } from "db://assets/scripts/locale";

const { ccclass, property } = _decorator;

@ccclass('WinWindow')
export class WinWindow extends Component {

    @property(Label)
    private header: Label;

    @property(Label)
    private body: Label;

    @property(Button)
    private btnNext: Button;


    public updateTexts(currentLevel: number, nextLevel: number) {
        this.btnNext.getComponentInChildren(Label).string = locale.translate("window.win.btnNextLevel", nextLevel.toString());
        this.body.string = locale.translate("window.win.txtBody");
        this.header.string = locale.translate("window.win.txtHeader", currentLevel.toString());
    }

    public setAction(action: () => void) {
        this.btnNext.node.on(NodeEventType.TOUCH_END, action);
    }

}