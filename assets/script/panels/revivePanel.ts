
import { _decorator, Component, Node, Button, Label, Vec3, UIOpacity, UITransform, sp, ProgressBar } from 'cc';
import BasePanel from '../../Plugin/UIFrameWork/BasePanel';
import GloalDefine from '../GloalDefine';
import { AudioEffectCtrl, ClipEffectType } from '../../Plugin/AudioEffectCtrl';
import { AppPlatformController, App_Platform } from '../../Plugin/AppPlatformController';
const { ccclass, property } = _decorator;

@ccclass('RevivePanel')
export class RevivePanel extends BasePanel {
    // @property(sp.Skeleton)
    // clockSpine: sp.Skeleton = null;

    @property(ProgressBar)
    private bar: ProgressBar = null;

    private reviveButton: Button = null;
    private cancalButton: Button = null;
    private theTimer: Node = null;
    private timeLabel: Label = null;
    private timer: number = 0;
    private t: number = 0
    public isStop: boolean = true;           //停止计时
    public isPrivate: boolean  = false;      //是否有插屏广告保护
    public isBreak: boolean = false;
    public onAutoStop: Function;

    onLoad() {
        super.onLoad();
        this.define();
    }

    define() {
        this.reviveButton = this.node.getChildByName("AdButton").getComponent(Button);
        this.cancalButton = this.node.getChildByName("CancelButton").getComponent(Button);
        this.theTimer = this.node.getChildByName("clock");
        this.timeLabel = this.theTimer.getChildByName("timeLabel").getComponent(Label);
    }

    onEnter() {
        super.onEnter();
        this.clickReset(GloalDefine.DownTime);
    }

    onPause() {
        super.onPause();
        this.node.setSiblingIndex(0);
        this.onPauseCall && this.onPauseCall();
        this.node.resumeSystemEvents(false);
    }

    onExit() {
        super.onExit();
        this.isStop = true
    }

    public RegisterCancalButtonClick(callback: Function) {
        this.cancalButton.node.on("click", callback, this);
    }

    public registerAdReviveBtnClickEvent(callback: Function) {
        this.reviveButton.node.on("click", callback, this);
    }

    /**
     * 重置倒计时
     */
    clickReset(num: number) {
        this.t = 1;
        this.isBreak = false;
        this.isStop = false;
        this.isPrivate = false;
        // this.timeLabel.node.setScale(new Vec3(1, 1, 1));
        // this.timeLabel.node.getComponent(UIOpacity).opacity = 255;
        this.timeLabel.string = num.toString();
        this.timer = num;
    }

    update(dt: any) {
        if (!this.isBreak && !this.isStop) {
            this.t += dt;
            this.bar.progress = (this.timer + 1 - this.t) / 10;
            if (this.t > 1 && this.timer >= 0) {
                if (!this.isBreak) {
                    AudioEffectCtrl.getInstance().playEffect(ClipEffectType.downTimeClip);
                    // this.timeLabel.node.setScale(new Vec3(1, 1, 1));
                    // this.timeLabel.node.getComponent(UIOpacity).opacity = 255;
                    this.timeLabel.string = this.timer.toString();
                    this.timer--;
                }
                this.t = 0;
            }
            if (this.timer < 0 && !this.isPrivate) {
                this.isStop = true;
                this.onAutoStop();
            }
        }

    }

}
