import { _decorator, Component, Node } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('EngineLayers')
export class EngineLayers extends Component {

    @property(Node)
    public touch: Node;

    @property(Node)
    public letters: Node;

}