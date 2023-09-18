
import { _decorator, Component, Node, SpriteFrame, Label, Button, Sprite, UIOpacity, Animation, tween, v3, Vec3, SkeletalAnimation, Skeleton, sp, Toggle, math, Tween, easing } from 'cc';
import { BaseSongElement } from './BaseSongElement';
const { ccclass, property } = _decorator;

@ccclass('SongElement')
export class SongElement extends BaseSongElement {
    @property({
        type: Sprite,
    })
    private songIronSpr: Sprite = null;

    @property({
        type: SpriteFrame,
    })
    hardSF: SpriteFrame = null;

    @property({
        type: SpriteFrame,
    })
    varyhardSF: SpriteFrame = null;

    @property({
        type: SpriteFrame,
    })
    playStateSF: SpriteFrame = null;

    @property({
        type: SpriteFrame,
    })
    stopStateSF: SpriteFrame = null;

    // @property({
    //     type: SpriteFrame,
    // })
    // ADStartBtnSF: SpriteFrame = null;

    // @property(Node)
    // private vcdNode: Node = null;

    // @property()
    // private rotate: boolean = false;

    private singerNameLabel: Label = null;
    private waitingNode: Node = null;
    private starsContent: Node = null
    private diaUnlockBtn: Button = null;
    private selectTip: Node = null
    private hardTip: Node = null
    private StartBtnSF: SpriteFrame = null;

    public songPlaySwitchBtn: Button = null;
    public likeToggle: Toggle = null;
    isADstate: boolean = false;
    ADInfo: any = null;
    updateNewTipShow: Function = null;

    public get StartBtnNode(): Node {
        return this.startBtn.node;
    }

    onLoad(){
        this.define();
    }

    define(){
        super.define();
        this.songNameLabel = this.node.getChildByName("songNameLabel").getComponent(Label);
        this.starsContent = this.node.getChildByName("stars");
        this.selectTip = this.node.getChildByName("selelctedBg");
        this.waitingNode = this.node.getChildByName("waiting");
        this.hardTip = this.node.getChildByName("hardTip");
        // this.newTip = this.node.getChildByName("newTip");
        this.diaUnlockBtn = this.node.getChildByName("unlock_diaButton").getComponent(Button);
        this.songPlaySwitchBtn = this.node.getChildByName("btn_switch").getComponent(Button);
        this.likeToggle = this.node.getChildByName("likeToggle").getComponent(Toggle);
        this.singerNameLabel = this.node.getChildByName("singerNameLabel").getComponent(Label);
        for (let i = 0; i < this.starsContent.children.length; i++) {
            this.starsContent.children[i].active = false;
        }
        this.isPause = true;
        this.setStopStateShow();
        this.setSelectTipShowState(false);
        // this.newTip.getComponent(UIOpacity).opacity = 0;
        this.StartBtnSF = this.startBtn.getComponent(Sprite).spriteFrame;
    }

    onEnable() {
        this.waitingNode.active = false;
        // this.updateNewTipShow && this.updateNewTipShow();
        this.setEntranceAct(0);
    }

    /**
     * 设置广告按钮点击事件监听
     */
    setAdBtnClickEvent(callback: Function) {
        super.setAdBtnClickEvent(callback)
        this.adUnlockBtn.node.on("click", callback, this)
    }

    /**
     * 设置钻石按钮点击事件监听
     */
    setDiasBtnClickEvent(callback: Function) {
        super.setDiasBtnClickEvent(callback)
        this.diaUnlockBtn.node.on("click", callback, this);
    }

    /**
     * 设置开始按钮点击事件监听
     */
    setStartBtnClickEvent(callback: Function) {
        super.setStartBtnClickEvent(callback)
        this.startBtn.node.on("click", callback, this)
    }

    /**
     * 设置播放按钮点击事件监听
     */
    songPlaySwitchBtnClickEvent(callback: Function) {
        super.songPlaySwitchBtnClickEvent(callback)
        this.songPlaySwitchBtn.node.on("click", () => {
            callback();
        }, this);
    }

    /**
     * 设置AD点击事件监听
     */
    ADClickEvent(callback: Function) {
        super.ADClickEvent(callback)
        this.node.on(Node.EventType.TOUCH_START, callback, this)
    }

    /**
     * 设置开始按钮点击事件监听
     */
    setlikeToggleEvent(callback: Function) {
        this.likeToggle.node.on("toggle", callback, this)
    }

    /**
     * 设置歌手名
     */
    setSingerNameLabel(text: string) {
        super.setSingerNameLabel(text);
        this.singerNameLabel.string = text;
    }

    /**
     * 设置获得的星星数
     */
    setStarsNum(num: number) {
        super.setStarsNum(num)
        let temp = 0;
        for (let i = 0; i < this.starsContent.children.length; i++) {
            if (num > temp) {
                this.starsContent.children[i].active = true;
                temp++;
            }
            else {
                this.starsContent.children[i].active = false;
            }
        }
    }

    /**
     * 设置最高分
     */
    setBestScore(num: number) {
        super.setBestScore(num);
    }

    /**
     * 设置歌曲的图片
     */
    setSongIronSpr(fs: SpriteFrame) {
        super.setSongIronSpr(fs)
        this.songIronSpr.spriteFrame = fs;
    }

    /**
     * 设置歌曲的解锁类型
     */
    setUnlockType(type: string, val: number = null) {
        super.setUnlockType(type, val)
        this.adUnlockBtn.node.active = false;
        this.startBtn.node.active = false;

        this.diaUnlockBtn.node.active = false;
        if (type == "coin") {
            this.diaUnlockBtn.node.active = true;
            // this.diaUnlockBtn.node.getComponentInChildren(Label).string = val.toString();
        }
        else if (type == "video") {
            this.adUnlockBtn.node.active = true;
        }
        this.isADstate = false;
    }

    /**
     * 设置歌曲的解锁状态
     */
    setUnlockState() {
        super.setUnlockState();
        this.adUnlockBtn.node.active = false;
        this.diaUnlockBtn.node.active = false;
        this.startBtn.node.active = true;
        this.startBtn.getComponent(Sprite).spriteFrame = this.StartBtnSF;
        this.isADstate = false;
        this.startBtn.node.children.forEach((item) => {
            item.active = true;
        })
    }

    /**
     * 设置歌曲的AD状态
     */
    setADState() {
        super.setADState();
        this.adUnlockBtn.node.active = false;
        this.diaUnlockBtn.node.active = false;
        this.startBtn.node.active = true;
        // this.startBtn.getComponent(Sprite).spriteFrame = this.ADStartBtnSF;
        this.isADstate = true;
        this.startBtn.node.children.forEach((item) => {
            item.active = false;
        })
    }

    /**
     * 设置歌曲为播放时状态
     */
    setPlayStateShow() {
        super.setPlayStateShow();
        this.songPlaySwitchBtn.node.getChildByName("bg").getComponent(Sprite).spriteFrame = this.playStateSF;
        // this.node.getChildByName("Bg").getComponent(cc.Sprite).spriteFrame = this.playBgSF;
        this.playingWaveAct();
    }

    /**
    * 设置歌曲为选中时状态
    */
    setSelectTipShowState(IsShow: boolean) {
        super.setSelectTipShowState(IsShow)
        this.selectTip.active = IsShow;
        this.isPlayState = IsShow;
    }

    showCollectStateTip(isCheck:boolean){
        super.showCollectStateTip(isCheck);
        this.likeToggle.isChecked=isCheck;
    }

    /**
    * 设置结束歌曲为解锁状态
    */
    setEndUnlokTipShow(IsShow: boolean) {
        super.setEndUnlokTipShow(IsShow)
        let newTip = this.node.getChildByName("EndNewTip");
        newTip.active = IsShow;
        if (IsShow) {
            this.adUnlockBtn.node.active = false;
            this.diaUnlockBtn.node.active = false;
            this.startBtn.node.active = false;
        }
    }

    /**
      * 设置结束歌曲的解锁状态
      */
    setEndUnlockState() {
        super.setEndUnlockState();
        let newTip = this.node.getChildByName("EndNewTip");
        newTip.active = false;
        this.adUnlockBtn.node.active = false;
        this.diaUnlockBtn.node.active = false;
        this.startBtn.node.active = true;
    }

    /**
     * 设置歌曲为停止时状态
     */
    setStopStateShow() {
        super.setStopStateShow();
        // this.stopWave();
        if(this.waitingNode == null) {
            return;
        }
        this.waitingNode.active = false;
        this.songPlaySwitchBtn.node.active = true;
        this.songPlaySwitchBtn.node.getChildByName("bg").getComponent(Sprite).spriteFrame = this.stopStateSF;
    }

    /**
     * 设置歌曲的播放图标状态
     */
    setSongPlayState(_playState: boolean, _isPause: boolean) {
        super.setSongPlayState(_playState, _isPause)
        this.isPause = _isPause;
        this.setSelectTipShowState(_playState)
        if (_playState) {
            if (this.isPause) {
                this.setStopStateShow();
            }
            else {
                this.setPlayStateShow();
            }
        }
        else {
            this.setStopStateShow();
        }
    }

    /**
   * 设置歌曲的难度显示
   */
    showHardTip(hardLv: string) {
        super.showHardTip(hardLv);
        switch (hardLv) {
            case "hard":
                this.hardTip.active = true;
                this.hardTip.getComponent(Sprite).spriteFrame = this.hardSF;
                break;
            case "superhard":
                this.hardTip.active = true;
                this.hardTip.getComponent(Sprite).spriteFrame = this.varyhardSF;
                break;
            default:
                this.hardTip.active = false;
                break;
        }

    }

    /**
    * 设置歌曲的全新标识显示
    */
    showNewStateTip(isShow: boolean) {
        super.showNewStateTip(isShow);
        //   console.log("isShow   ",isShow); 
        // if (isShow) {
        //     this.newTip.getComponent(UIOpacity).opacity = 255;
        //     this.newTip.getComponentInChildren(Animation).play();
        // } else {
        //     this.updateNewTipShow = () => {
        //         tween(this.newTip.getComponent(UIOpacity)).to(1, { opacity: 0 }).start();
        //     }
            // if (this.node.active) {
            //     this.updateNewTipShow();
            // }
        // }

    }

    /**
     * 设置歌曲条的入场动画
     */
    setEntranceAct(delayTime: number) {
        super.setEntranceAct(delayTime)
        Tween.stopAllByTarget(this.node);
        let targetPos = this.node.position;
        delayTime = Math.abs(targetPos.y/8000);
        this.node.setPosition(v3(1500, targetPos.y, targetPos.z))
        tween(this.node).sequence(
            tween().delay(delayTime),
            tween().to(0.25, { position: v3(0, targetPos.y, targetPos.z) }, { easing: easing.cubicOut })
        ).start();
    }

    /**
     * 歌曲播放加载中
     */
    waitingAct() {
        super.waitingAct();
        this.waitingNode.active = true;
        //this.songPlaySwitchBtn.node.active = false;
    }

    /**
     * 歌曲播放加载完成
     */
    waitingEndAct() {
        super.waitingEndAct();
        this.waitingNode.active = false;
        this.songPlaySwitchBtn.node.active = true;
    }

    /**
     * 歌曲播放中
     */
    playingWaveAct() {
        super.playingWaveAct();
        // if(this.rotate) {
        //     this.oneWave();
        //     this.schedule(this.oneWave, 0.1)
        // }
    }

    /**
     * 提供开始按钮的世界坐标
     */
    getStartBtnWorldPos() {
        super.getStartBtnWorldPos();
        let worldPos = this.startBtn.node.worldPosition;
        return worldPos
    }

    // oneWave()
    // {
    //     tween(this.songIronSpr.node).by(0.1, {eulerAngles: new Vec3(0,0,-6)}).start();
    //     this.vcdNode && tween(this.vcdNode).by(0.1, {eulerAngles: new Vec3(0,0,-6)}).start();
    // }

    // stopWave() {
    //    this.unscheduleAllCallbacks();
    //    Tween.stopAllByTarget(this.songIronSpr.node);
    //    this.vcdNode && Tween.stopAllByTarget(this.vcdNode);
    // }
}