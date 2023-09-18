import { _decorator, Component, Node, Button, Tween, v3, UIOpacity, tween, easing } from 'cc';
import BasePanel from '../../Plugin/UIFrameWork/BasePanel';
const { ccclass, property } = _decorator;

@ccclass('PowerSupplementPanel')
export class PowerSupplementPanel extends BasePanel {

    private returnButton: Button = null;
    private supplementBox: Node = null;

    public RegisterReturnButtonClick(callback: Function) {
        this.returnButton.node.on("click", callback, this);
    }

    onLoad() {
        super.onLoad();
        this.define();
    }
    
    define() {
        this.returnButton = this.node.getChildByName("ReturnButton").getComponent(Button);
        this.supplementBox = this.node.getChildByName("SupplementBox");
    }

    getPowerSupplements() {
        return this.supplementBox.children;
    }
}

