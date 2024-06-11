import { _decorator, Color, Component, Label, Node } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('CircleLetter')
export class CircleLetter extends Component {

    @property(Node)
    private idle: Node;

    @property(Node)
    private selected: Node;

    @property(Label)
    private label: Label;

    public select() {
        this.selected.active = true;
        this.idle.active = false;
        this.label.color = new Color("#FFFFFF");
    }

    public deselect() {
        this.selected.active = false;
        this.idle.active = true;
        this.label.color = new Color("#4D4D4D");
    }

    protected override start() {

    }

    protected override update(deltaTime: number) {
        
    }

}