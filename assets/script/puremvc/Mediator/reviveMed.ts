import { Mediator } from "../../../Plugin/core/puremvc/patterns/mediator/Mediator";
import { INotification } from "../../../Plugin/core/puremvc/interfaces/INotification";
import { RevivePanel } from "../../panels/revivePanel";
import { CommandDefine } from "../commandDefine";
import { PanelType } from "../../../Plugin/UIFrameWork/PanelType";
import { log, Node, view } from "cc";
import UIPanelController from "../../../Plugin/UIFrameWork/UIPanelControllor";
import { GameDirector } from "../../game/gameDirector";
import { SwitchType } from "../../GloalDefine";
import { AudioEffectCtrl, ClipEffectType } from "../../../Plugin/AudioEffectCtrl";
//import ASCAd from "../../../Plugin/ADSDK/ASCAd";
import { MsghintManager } from "../../tools/msghintManager";
import ASCAd_New from "../../../Plugin/ASCAd_New";

export class ReviveMed extends Mediator {

    private _panel: RevivePanel = null;
    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);
    }

    private bindListener(): void {
        this._panel.onEnterCall = () => {
            if(ASCAd_New.getInstance().getIntersFlag()) {
                this._panel.isStop = true;
                ASCAd_New.getInstance().showInters(() => {
                    this._panel.isStop = false;
                })
            }
        }
        this._panel.onPauseCall = () => {
            this.sendNotification(CommandDefine.UIRSwitchRequest, SwitchType.CLOSE);
        }
        this._panel.registerAdReviveBtnClickEvent(() => {
            this._panel.isStop = true;
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
            if (ASCAd_New.getInstance().getVideoFlag()) {
                ASCAd_New.getInstance().showVideo((isSucces: any) => {
                    this._panel.isStop = false;
                    if (isSucces) {
                        GameDirector.getInstance().gameRevive();
                        UIPanelController.getInstance().popPanel();
                    } else {
                        this.cancalRevive();
                    }
                })
            } else {
                this._panel.isStop = false;
                MsghintManager.getInstance().mainMsgHint("暂无广告!")
            }
        })
        this._panel.RegisterCancalButtonClick(() => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
            this.cancalRevive();
        })
        this._panel.onAutoStop = () => {
            this.cancalRevive();
        }
        this._panel.onExitCall = () => {
            this._panel = null;
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
                    if (info == PanelType.Revive) {
                        this.pushPanel();
                    }
                    break;
                }
            default:
                break;
        }
    }

    private pushPanel() {
        if (!this._panel) {
            this.createPanel();
        } else {
            UIPanelController.getInstance().pushPanel(PanelType.Revive, null)
        }
    };

    /**
    * 添加Panel
    */
    private createPanel() {
        let BindMed = (node: Node) => {
            this._panel = node.getComponent(RevivePanel);
            this._panel.define();
            this.bindListener();
        }
        UIPanelController.getInstance().pushPanel(PanelType.Revive, BindMed);
    }

    /**
     * 取消复活
     */
    public cancalRevive() {
        this._panel.isBreak = true;
        GameDirector.getInstance().gameFail();
        UIPanelController.getInstance().popPanel();
        this.sendNotification(CommandDefine.PushPanelReqiest, PanelType.Settle_Normal);
    }
}
