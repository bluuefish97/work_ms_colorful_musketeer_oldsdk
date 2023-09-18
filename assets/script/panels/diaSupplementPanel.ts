
import { _decorator, Component, Node, Button, Tween, v3, UIOpacity, tween, easing, UITransform } from 'cc';
import BasePanel from '../../Plugin/UIFrameWork/BasePanel';
const { ccclass, property } = _decorator;

@ccclass('DiaSupplementPanel')
export class DiaSupplementPanel extends BasePanel {

    private returnButton: Button = null;
    private box: Node = null;
    private adBtn: Button = null;

    onLoad() {
        super.onLoad();
        this.define();
    }

    define() {
        this.box = this.node.getChildByName("content").getChildByName("box");
        this.adBtn = this.box.getChildByName("adGetButton").getComponent(Button);
        this.returnButton = this.node.getChildByName("content").getChildByName("ReturnButton").getComponent(Button);
    }

    onEnter() {
        super.onEnter();
        Tween.stopAllByTarget(this.box.parent);
        this.box.parent.scale = v3(0, 0, 0);
        tween(this.box.parent)
            .to(0.3, { scale: v3(1.05, 1.05, 1.05) }, { easing: easing.sineInOut })
            .to(0.2, { scale: v3(0.95, 0.95, 0.95) })
            .to(0.1, { scale: v3(1, 1, 1) })
            .start();
    }

    public setReturnButtonClick(callback: Function) {
        this.returnButton.node.on("click", callback, this);
    }

    /**
    * 设置钻石详情页面广告获取按钮的点击事件监听
    * @param callback 
    */
    setDiaAdBtnClickEvent(callback: Function) {
        this.adBtn.node.on("click", callback, this);
    }
}
