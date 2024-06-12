import { _decorator, Component, instantiate, Node, Prefab } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('EnginePrefabs')
export class EnginePrefabs extends Component {

    @property(Prefab)
    private circleLetter: Prefab;

    @property(Prefab)
    private previewLetter: Prefab;

    @property(Prefab)
    private wordLetter: Prefab;

    @property(Prefab)
    private buttonSwap: Prefab;

    @property(Prefab)
    private winWindow: Prefab;

    @property(Prefab)
    private sessionErrorWindow: Prefab;

    @property(Prefab)
    private gameUI: Prefab;

    public getSessionErrorWindow(): Node {
        return instantiate(this.sessionErrorWindow);
    }

    public getGameUI(): Node {
        return instantiate(this.gameUI);
    }

    public getWinWindow(): Node {
        return instantiate(this.winWindow);
    }

    public getSwapButton(): Node {
        return instantiate(this.buttonSwap);
    }

    public getWordLetter(): Node {
        return instantiate(this.wordLetter);
    }

    public getCircleLetter(): Node {
        return instantiate(this.circleLetter);
    }

    public getPreviewLetter(): Node {
        return instantiate(this.previewLetter);
    }

}