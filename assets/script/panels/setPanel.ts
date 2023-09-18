
import { _decorator, Component, Node, Slider, ToggleContainer, Toggle, Tween, tween, v3, easing } from 'cc';
import ASCAd from '../../Plugin/ADSDK/ASCAd';
import { AudioEffectCtrl, ClipEffectType } from '../../Plugin/AudioEffectCtrl';
import BasePanel from '../../Plugin/UIFrameWork/BasePanel';
const { ccclass, property } = _decorator;

@ccclass('SetPanel')
export class SetPanel extends BasePanel {
    
    private _audioEffectSlider: Slider = null;
    private _audioMusicSlider: Slider = null;
    private toggleContainer: ToggleContainer = null;
    private KeFULabelNode: Node = null;
    private closeBtnNode: Node = null;
    private box: Node = null;

    onLoad(){
        super.onLoad();
        // this._audioEffectSlider = this.node.getChildByName("audioEffect").getComponentInChildren(Slider);
        // this._audioMusicSlider = this.node.getChildByName("audioMusic").getComponentInChildren(Slider);
    }

    define(){
        this.box = this.node.getChildByName("box");
        this._audioEffectSlider = this.box.getChildByName("audioEffect").getComponentInChildren(Slider);
        this._audioMusicSlider = this.box.getChildByName("audioMusic").getComponentInChildren(Slider);
        this.toggleContainer = this.box.getChildByName("vibrating").getComponentInChildren(ToggleContainer);
        this.closeBtnNode = this.box.getChildByName("closeBtn");
        // this.KeFULabelNode = this.node.getChildByName("Label");
    }
    
    onEnter() {
        super.onEnter();
        Tween.stopAllByTarget(this.box.parent);
        this.box.scale = v3(0, 0, 0);
        tween(this.box)
            .to(0.3, { scale: v3(1.05, 1.05, 1.05) }, { easing: easing.sineInOut })
            .to(0.2, { scale: v3(0.95, 0.95, 0.95) })
            .to(0.1, { scale: v3(1, 1, 1) })
            .start();
    }
    setToggleEvent(_module: string, callback: Function, target: any = null) {
        let toggle = this.getFuncModluleToggle(_module);
        toggle.node.on("toggle", callback, target)
    }

    setToggleState(val: boolean) {
        this.getFuncModluleToggle('on').setIsCheckedWithoutNotify(val);
        this.getFuncModluleToggle('off').setIsCheckedWithoutNotify(!val);
    }

    setKeFuLabel() {
        // if(ASCAd.getInstance().getChannelId() == '1007' || ASCAd.getInstance().getChannelId() == '1008'|| ASCAd.getInstance().getChannelId() == '1238') {
        //     this.KeFULabelNode.active = true;
        // } else {
        //     this.KeFULabelNode.active = false;
        // }
    }

    public getFuncModluleToggle(_module: string): Toggle {
        let name: string;
        switch (_module) {
            case "on":
                name = "Toggle_on";
                break;

            case "off":
                name = "Toggle_off";
                break;
            default:
                break;
        }
        let toggle = this.toggleContainer.toggleItems.find((item) => {
            return item.node.name == name
        });
        return toggle;
    }

    public registerEffectSlider(callback: Function) {
        this._audioEffectSlider.node.on('slide',callback, this);
    }

    public registerMusicSlider(callback: Function) {
        this._audioMusicSlider.node.on('slide',callback, this);
    }

    public setEffectSliderProgress(val: number) {
        this._audioEffectSlider.progress = val;
    }

    public setMusicSliderProgress(val: number) {
        this._audioMusicSlider.progress = val;
    }

    setCloseBtnClick(call: Function) {
        this.closeBtnNode.on("click", () => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
            call();
        })
    } 
}


