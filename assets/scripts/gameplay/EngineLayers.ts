import { _decorator, Component, Node } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('EngineLayers')
export class EngineLayers extends Component {

    @property(Node)
    public touch: Node;

    @property(Node)
    public wordsLetters: Node;

    @property(Node)
    public circleLetters: Node;

    @property(Node)
    public previewLetters: Node;

    @property(Node)
    public swapButton: Node;

}