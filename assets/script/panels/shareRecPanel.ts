
import { _decorator, Component, Node, Button, Tween, UIOpacity, v3, easing, tween, UITransform } from 'cc';
import BasePanel from '../../Plugin/UIFrameWork/BasePanel';
const { ccclass, property } = _decorator;

@ccclass('ShareRecPanel')
export class ShareRecPanel extends BasePanel {
    private returnButton: Button = null;
    private box: Node = null;
    private shareBtn: Button = null;

    onLoad() {
        super.onLoad();
        this.define();
    }

    define() {
        this.box = this.node.getChildByName("content").getChildByName("box");
        this.shareBtn = this.box.getChildByName("ShareGetButton").getComponent(Button);
        this.returnButton = this.box.getChildByName("ReturnButton").getComponent(Button);
    }

    onEnter() {
        super.onEnter();
        Tween.stopAllByTarget(this.box);
        Tween.stopAllByTarget(this.getComponent(UIOpacity));
        this.box.scale = v3(0, 0, 0);
        this.box.getComponent(UIOpacity).opacity = 0;
        tween(this.box.getComponent(UIOpacity))
            .to(0.3, { opacity: 255 }, { easing: easing.sineInOut }).start();
        tween(this.box)
            .to(0.3, { scale: v3(1.05, 1.05, 1.05) }, { easing: easing.sineInOut })
            .to(0.2, { scale: v3(0.95, 0.95, 0.95) })
            .to(0.1, { scale: v3(1, 1, 1) })
            .start();
    }

    public setReturnButtonClick(callback: Function) {
        this.returnButton.node.on("click", callback, this);
    }

    /**
    * 设置分享按钮的点击事件监听
    * @param callback 
    */
    setShareBtnClickEvent(callback: Function) {
        this.shareBtn.node.on("click", callback, this);
    }
   
}
