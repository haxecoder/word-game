import { _decorator, Component, instantiate, Node, Prefab } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('EnginePrefabs')
export class EnginePrefabs extends Component {

    @property(Prefab)
    private circleLetter: Prefab;

    @property(Prefab)
    private previewLetter: Prefab;


    public getCircleLetter(): Node {
        return instantiate(this.circleLetter);
    }

    public getPreviewLetter(): Node {
        return instantiate(this.previewLetter);
    }

}