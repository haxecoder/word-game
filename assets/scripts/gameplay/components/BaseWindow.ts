import { _decorator, Button, Component, Label, NodeEventType } from "cc";

const { ccclass, property } = _decorator;

@ccclass('BaseWindow')
export class BaseWindow extends Component {

    @property(Label)
    private header: Label;

    @property(Label)
    private body: Label;

    @property(Button)
    private btnNext: Button;


    public updateTexts(headerText: string, bodyText: string, buttonText: string) {
        this.btnNext.getComponentInChildren(Label).string = buttonText;
        this.body.string = bodyText;
        this.header.string = headerText;
    }

    public setAction(action: () => void) {
        this.btnNext.node.on(NodeEventType.TOUCH_END, action);
    }

}