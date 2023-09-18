import { Mediator } from "../../../Plugin/core/puremvc/patterns/mediator/Mediator";
import { INotification } from "../../../Plugin/core/puremvc/interfaces/INotification";
import { SetPanel } from "../../panels/setPanel";
import { CommandDefine } from "../commandDefine";
import { PanelType } from "../../../Plugin/UIFrameWork/PanelType";
import { log, Node, UIOpacity, Slider } from "cc";
import UIPanelController from "../../../Plugin/UIFrameWork/UIPanelControllor";
import AudioManager from "../../../Plugin/audioPlayer/AudioManager";
import { GameUserPxy } from "../Proxy/gameUserPxy";
import { Facade } from "../../../Plugin/core/puremvc/patterns/facade/Facade";
import { ProxyDefine } from "../proxyDefine";
import { AudioEffectCtrl, ClipEffectType } from "../../../Plugin/AudioEffectCtrl";
// import ASCAd from "../../../Plugin/ADSDK/ASCAd";

export class SetMed extends Mediator {

    private panel: SetPanel = null;
    private _gameUserPxy: GameUserPxy = null;
    
    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);
        this._gameUserPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_UserPxy) as GameUserPxy;
    }

    private bindListener(): void {
        this.panel.registerEffectSlider((slider: Slider) => {
            AudioEffectCtrl.getInstance().updateVolume(slider.progress);
            this._gameUserPxy.setEffectVolume(slider.progress)
        })
        this.panel.registerMusicSlider((slider: Slider) => {
            AudioManager.GetInstance(AudioManager).player.setVolume(slider.progress);
            this._gameUserPxy.setMusicVolume(slider.progress)
        })
        this.panel.setToggleEvent('on', () => {
            if(this._gameUserPxy.getMusicVibrate() == true) {
                return;
            }
            this._gameUserPxy.setMusicVibrate(true);
            AudioEffectCtrl.getInstance().setPhoneVibrate(true);
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.songListScrollClip);
            AudioEffectCtrl.getInstance().phoneVibrate();
        })
        this.panel.setToggleEvent('off', () => {
            if(this._gameUserPxy.getMusicVibrate() == false) {
                return;
            }
            this._gameUserPxy.setMusicVibrate(false);
            AudioEffectCtrl.getInstance().setPhoneVibrate(false);
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.songListScrollClip);
        })
        this.panel.setKeFuLabel();
        this.panel.setEffectSliderProgress(this._gameUserPxy.getEffectVolume());
        this.panel.setMusicSliderProgress(this._gameUserPxy.getMusicVolume());
        this.panel.setCloseBtnClick(() => {
            UIPanelController.getInstance().popView();
        })
        this.panel.setToggleState(this._gameUserPxy.getMusicVibrate());
        this.panel.onExitCall = () => {
            this.panel = null;
        }
    }

    public listNotificationInterests(): string[] {
        return [
            CommandDefine.PushPanelReqiest,
        ];
    }

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        switch (notification.getName()) {
            case CommandDefine.PushPanelReqiest:
                {
                    if (info == PanelType.Set) {
                        log("PushPanelReqiest  接收成功", info)
                        this.pushPanel();
                    }
                    break;
                }
            default:
                break;
        }
    }

    private pushPanel() {
        if (!this.panel) {
            this.createPanel();
        } else {
            UIPanelController.getInstance().pushView(PanelType.Set, true, null)
        }
    };

    /**
    * 添加Panel
    */
    private createPanel() {
        let BindMed = (node: Node) => {
            this.panel = node.getComponent(SetPanel);
            this.panel.define();
            this.bindListener();
        }
        UIPanelController.getInstance().pushView(PanelType.Set, true, BindMed);
    }
}