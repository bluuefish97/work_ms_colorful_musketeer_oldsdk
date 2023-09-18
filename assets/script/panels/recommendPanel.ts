
import { _decorator, Component, Node, sp, v3, SpriteFrame, Button, Label, Sprite, tween, Vec3, Tween, easing } from 'cc';
import BasePanel from '../../Plugin/UIFrameWork/BasePanel';
import HomeMusicLineTS from '../view/HomeMusicLineTS';
const { ccclass, property } = _decorator;

@ccclass('RecommendPanel')
export class RecommendPanel extends BasePanel {

    @property({
        type: SpriteFrame,
    })
    playStateSF: SpriteFrame = null;

    @property({
        type: SpriteFrame,
    })
    stopStateSF: SpriteFrame = null;

    private cancelButton: Button = null;
    private box: Node = null;
    private adBtn: Button = null;
    private normalStartButton: Button = null;
    private songIron: Sprite = null;
    private songNameLabel: Label = null;
    private waitingNode: Node = null;
    private cdSp: Node = null;
    private needleNode: Node = null;
    private line: HomeMusicLineTS = null;

    public songPlaySwitchBtn: Button = null
    public isPause: boolean = false;
    onLoad() {
        super.onLoad();
        this.define();
    }

    define() {
        this.box = this.node.getChildByName("Box");
        this.cancelButton = this.box.getChildByName("CancelButton").getComponent(Button);
        this.adBtn = this.box.getChildByName("AdGetButton").getComponent(Button);
        this.songIron = this.box.getChildByName("iron").getComponent(Sprite);
        this.songNameLabel = this.box.getChildByName("songNameLabel").getComponent(Label);
        this.normalStartButton = this.box.getChildByName("NormalStartButton").getComponent(Button);
        this.songPlaySwitchBtn = this.box.getChildByName("Switch").getComponent(Button);
        this.waitingNode = this.box.getChildByName("waiting");
        this.cdSp = this.box.getChildByName("CD");
        this.needleNode = this.box.getChildByName("needle");
        this.line = this.box.getChildByName("homeLine").getComponent(HomeMusicLineTS);
    }

    onEnter() {
        super.onEnter();
        Tween.stopAllByTarget(this.box);
        this.box.scale = v3(0, 0, 0);
        tween(this.box)
            .to(0.3, { scale: v3(1.05, 1.05, 1.05) }, { easing: easing.sineInOut })
            .to(0.2, { scale: v3(0.95, 0.95, 0.95) })
            .to(0.1, { scale: v3(1, 1, 1) })
            .start();
    }

    public RegisterCancelButtonClick(callback: Function) {
        this.cancelButton.node.on("click", callback, this);
    }

    /**
    * 设置专属推荐页面广告获取按钮的点击事件监听
    * @param callback 
    */
    setADUnLockBtnClickEvent(callback: Function) {
        this.adBtn.node.on("click", callback, this);
    }

    /**
    * 设置开始游戏按钮点击事件监听
    */
    public setStartBtnClickEvent(callback: Function) {
        this.normalStartButton.node.on("click", callback, this);
    }

    /**
    * 设置播放按钮点击事件监听
    */
    songPlaySwitchBtnClickEvent(callback: Function) {
        this.songPlaySwitchBtn.node.on("click", callback, this);
    }

    /**
     * 设置歌曲名
     */
    setSongNameLabel(text: string) {
        this.songNameLabel.string = text;
    }

    /**
     * 设置歌曲的图片
     */
    setSongIronSpr(fs: SpriteFrame) {
        this.songIron.spriteFrame = fs;

    }

    public switchUnlockState(isUnlock: boolean) {
        this.normalStartButton.node.active = isUnlock;
        this.adBtn.node.active = !isUnlock;
    }

    /**
   * 歌曲播放加载中
   */
    waitingAct() {
        this.waitingNode.active = true;
        this.songPlaySwitchBtn.node.active = false;
    }

    public waitingEndAct() {
        this.waitingNode.active = false;
        this.songPlaySwitchBtn.node.active = true;
    }

    /**
    * 设置歌曲为播放时状态
    */
    setPlayStateShow() {
        this.songPlaySwitchBtn.node.getChildByName("bg").getComponent(Sprite).spriteFrame = this.playStateSF;
        // this.box .getChildByName("bg").getChildByName("playstateParticle").getComponent(cc.ParticleSystem).resetSystem();
        this.startTween();
    }

    /**
   * 设置歌曲为停止时状态
   */
    setStopStateShow() {
        this.waitingNode.active = false;
        this.songPlaySwitchBtn.node.active = true;
        this.songPlaySwitchBtn.node.getChildByName("bg").getComponent(Sprite).spriteFrame = this.stopStateSF;
        this.stopTween();
        // this.box .getChildByName("bg").getChildByName("playstateParticle").getComponent(cc.ParticleSystem).stopSystem();
    }
    
    /**
     * 提供开始按钮的世界坐标
     */
    getStartBtnWorldPos() {
        let worldPos = this.normalStartButton.node.worldPosition;
        return worldPos
    }

    CDTween() {
        Tween.stopAllByTarget(this.cdSp);
        tween(this.cdSp).by(0.1, {eulerAngles: new Vec3(0,0,-6)}).start();
        tween(this.songIron.node).by(0.1, {eulerAngles: new Vec3(0,0,-6)}).start();
    }

    needleTween() {
        Tween.stopAllByTarget(this.needleNode);
        tween(this.needleNode).to(1.5, {eulerAngles: new Vec3(0,0,0)}).to(1.5, {eulerAngles: new Vec3(0,0,20)}).start();
    }

    startTween() {
        this.line.startLine();
        this.CDTween();
        this.schedule(this.CDTween, 0.1);

        this.needleTween();
        this.schedule(this.needleTween, 2.4);
    }

    stopTween() {
        this.line.stopLine();
        this.unschedule(this.CDTween);
        Tween.stopAllByTarget(this.cdSp);

        this.unschedule(this.needleTween)
        Tween.stopAllByTarget(this.needleNode);
        tween(this.needleNode).to(0.5, {eulerAngles: new Vec3(0,0,30)}).start();
    }

}
