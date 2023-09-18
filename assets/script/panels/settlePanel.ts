
import { _decorator, Component, Node, Button, Label, UIOpacity, v3, tween, sp, Prefab, resources, ScrollView, UITransform } from 'cc';
import BasePanel from '../../Plugin/UIFrameWork/BasePanel';
import { BaseSongElement } from '../view/BaseSongElement';
import { AudioEffectCtrl, ClipEffectType } from '../../Plugin/AudioEffectCtrl';
import { GlobalTool } from '../../Plugin/tools/GlobalTool';
import { AppPlatformController, App_Platform } from '../../Plugin/AppPlatformController';
const { ccclass, property } = _decorator;

@ccclass('SettlePanel')
export class SettlePanel extends BasePanel {

    private returnButton: Button = null;
    private stars: Node = null;
    private _scoreLabel: Label = null;
    private _diaLabel: Label = null;
    // private topLabel: Label = null;

    @property(BaseSongElement)
    public settleSongElement: BaseSongElement = null;

    @property(Button)
    private nextBtn: Button = null;

    @property(Button)
    private again: Button = null;

    @property(Node)
    public ADIcon: Node = null;

    @property(Node)
    private topTipNode: Node = null;

    onLoad() {
        super.onLoad();
        this.define();
    }

    define() {
        this.returnButton = this.node.getChildByName("ReturnButton").getComponent(Button);
        this.stars = this.node.getChildByName("StarsGroup");
        this._scoreLabel = this.node.getChildByName("ScoreRegion").getChildByName("value").getComponent(Label);
        this._diaLabel = this.node.getChildByName("RewardRegion").getChildByName("value").getComponent(Label);
        // this.topLabel = this.node.getChildByName("ScoreRegion").getChildByName("topLabel").getComponent(Label);
    }

    onEnter() {
        super.onEnter();
    }

    public RegisterReturnButtonClick(callback: Function) {
        this.returnButton.node.on("click", callback, this);
    }
    
    public RegisterNextButtonClick(callback: Function) {
        this.nextBtn.node.on("click", callback, this);
    }

    public RegisterAgainStartButtonClick(callback: Function) {
        this.again.node.on("click", callback, this)
    }

    /**
       * 设置星星的显示
       */
    setStarsLight(val: number) {
        console.log("点亮的星星数     " + val);
        for (let i = 1; i <= this.stars.children.length / 2; i++) {
            let temp = i * 2;
            if (i <= val) {
                this.stars.children[temp - 1].getComponent(UIOpacity).opacity = 255;
                this.starLightShow(this.stars.children[temp - 1], (i - 1) * 0.2);

            }
            else {
                this.stars.children[temp - 1].getComponent(UIOpacity).opacity = 0;
            }

        }
    }

    /**
    * 星星点亮动画
    */
    private starLightShow(node: Node, delayTime: number) {
        node.getComponent(UIOpacity).opacity = 255;
        node.scale = v3(0, 0, 0);
        node.getComponent(UIOpacity).opacity = 0
        let dur = 0.5;
        let scaleAct = tween(node).to(dur / 2, { scale: v3(1.3, 1.3, 1.3) })
            .to(dur / 2, { scale: v3(1, 1, 1) })
        let opacityAct = tween(node.getComponent(UIOpacity)).to(dur, { opacity: 255 });
        this.scheduleOnce(() => {
            console.log("播放星星音频！");
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.finishStarClip);
            scaleAct.start();
            opacityAct.start();
        }, delayTime);

    }

    /**
    * 设置分数的显示
    */
    setScoreLabelShow(val: number, top: number) {
        GlobalTool.addScoreAnim(0, val, 0.05, (val: string) => {
            this._scoreLabel.string = val.toString();
        });
        this.topTipNode.active = val >= top;
        // this.topLabel.node.active = !this.topTipNode.active;
        // this.topLabel.string = `最高分:${top}`;
    }

    /**
    * 设置分数的显示
    */
    seDiaLabelShow(val: number) {
        GlobalTool.addScoreAnim(0, val, 0.05, (val: string) => {
            this._diaLabel.string = val.toString();
        });

    }

    /**
     * 设置最高分
     */
    // openNewRecordTip(_topRecord: number) {
    //     this.topLabel.string = `最高分:${_topRecord}`;
    // }
}
