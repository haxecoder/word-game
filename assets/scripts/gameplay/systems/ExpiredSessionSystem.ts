import { System } from "db://assets/scripts/gameplay/systems/System";
import { director } from "cc";
import { BaseWindow } from "db://assets/scripts/gameplay/components/BaseWindow";
import { locale } from "db://assets/scripts/locale";

export class ExpiredSessionSystem extends System {

    constructor() {
        super();

        director.getScene().on("sessionExpired", this.onSessionExpired.bind(this));
    }

    private onSessionExpired() {
        this.engine.emitEvent("input.lock");
        const windowNode = this.model.prefabs.getSessionErrorWindow();
        this.model.layers.errorWindowLayer.addChild(windowNode);

        const baseWindowComponent = windowNode.getComponent(BaseWindow);

        const textActionButton = locale.translate("window.error.session.btnAction");
        const textBody = locale.translate("window.error.session.body");
        const textHeader = locale.translate("window.error.session.header");

        baseWindowComponent.updateTexts(textHeader, textBody, textActionButton);
        baseWindowComponent.setAction(() => {
            window.location.reload();
        });
    }

}