
import { _decorator, Component, Node } from 'cc';
import { INotification } from '../../../Plugin/core/puremvc/interfaces/INotification';
import { Mediator } from '../../../Plugin/core/puremvc/patterns/mediator/Mediator';
import { PanelType } from '../../../Plugin/UIFrameWork/PanelType';
import UIPanelController from '../../../Plugin/UIFrameWork/UIPanelControllor';
import { ConsumablesAlterInfo, ConsumablesType } from '../../GloalDefine';
import { DiaSupplementPanel } from '../../panels/diaSupplementPanel';
import { CommandDefine } from '../commandDefine';
import { AudioEffectCtrl, ClipEffectType } from '../../../Plugin/AudioEffectCtrl';
import { ShareRecPanel } from '../../panels/shareRecPanel';
const { ccclass, property } = _decorator;

@ccclass('ShareRecMed')
export class ShareRecMed extends Mediator {
    private _panel: ShareRecPanel = null;

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);
    }

    private bindListener(): void {
        this._panel.setReturnButtonClick(() => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
            UIPanelController.getInstance().popView();
        });
        this._panel.setShareBtnClickEvent(() => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
                this.sendNotification(CommandDefine.ShareRec);
               // ReportAnalytics.getInstance().reportAnalytics("Noad_Click","ShareUI_ShareBtn_Click",1);
        })

        this._panel.onEnterCall = () => {
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
                    if (info == PanelType.ShareRec) {
                        // log("PushPanelReqiest  接收成功", info)
                        if(UIPanelController.getInstance().checkIsTopPanel(PanelType.Settle_Normal)) {
                            this.pushPanel();
                        }
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
            UIPanelController.getInstance().pushView(PanelType.ShareRec, true, null)
        }
    };

    /**
    * 添加Panel
    */
    private createPanel() {
        let BindMed = (node: Node) => {
            this._panel = node.getComponent(ShareRecPanel);
            this._panel.define();
            this.bindListener();
        }
        UIPanelController.getInstance().pushView(PanelType.ShareRec, true, BindMed);
    }
}
