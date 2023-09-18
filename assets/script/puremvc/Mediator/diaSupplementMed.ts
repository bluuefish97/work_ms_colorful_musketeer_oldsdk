
import { _decorator, Component, Node } from 'cc';
import { INotification } from '../../../Plugin/core/puremvc/interfaces/INotification';
import { Mediator } from '../../../Plugin/core/puremvc/patterns/mediator/Mediator';
import { PanelType } from '../../../Plugin/UIFrameWork/PanelType';
import UIPanelController from '../../../Plugin/UIFrameWork/UIPanelControllor';
import { ConsumablesAlterInfo, ConsumablesType } from '../../GloalDefine';
import { DiaSupplementPanel } from '../../panels/diaSupplementPanel';
import { CommandDefine } from '../commandDefine';
import { AudioEffectCtrl, ClipEffectType } from '../../../Plugin/AudioEffectCtrl';
// import ASCAd from '../../../Plugin/ADSDK/ASCAd';
import AudioManager from '../../../Plugin/audioPlayer/AudioManager';
import { MsghintManager } from '../../tools/msghintManager';
import ASCAd_New from '../../../Plugin/ASCAd_New';
const { ccclass, property } = _decorator;

@ccclass('DiaSupplementMed')
export class DiaSupplementMed extends Mediator {

    private _panel: DiaSupplementPanel = null;

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);
    }

    private bindListener(): void {
        this._panel.setReturnButtonClick(() => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
                UIPanelController.getInstance().popView();
        });
        this._panel.setDiaAdBtnClickEvent(() => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
            AudioManager.GetInstance(AudioManager).player.pauseMusic();
            if (ASCAd_New.getInstance().getVideoFlag()) {
                ASCAd_New.getInstance().showVideo((isSucces: any) => {
                AudioManager.GetInstance(AudioManager).player.resumeMusic();
                    if(isSucces)
                    {
                        this.sendNotification(CommandDefine.Consumables,
                            {
                                info: new ConsumablesAlterInfo(ConsumablesType.dia, 200),
                                callback: null
                            }
                        );
                    }
                })
            } else {
                MsghintManager.getInstance().mainMsgHint("暂无广告!")
            }
        })

        this._panel.onEnterCall = () => {
            let adcall = () => {
                ASCAd_New.getInstance().showBanner();
            }
            if (ASCAd_New.getInstance().getIntersFlag()) {
                ASCAd_New.getInstance().showInters(()=>{
                    adcall()
                });
            } else {
                adcall()
            }
            this.sendNotification(CommandDefine.SwitchCurrencyType, {
                type: ConsumablesType.dia,
                openCal: (node: Node) => {
                }
            })
        }

        this._panel.onExitCall = () => {
            this.sendNotification(CommandDefine.SwitchCurrencyType, {
                type: ConsumablesType.dia,
                openCal: (node: Node) => {
                }
            })
            this._panel = null
            ASCAd_New.getInstance().hideBanner();
            //ASCAd.getInstance().hideNativeImage();
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
                    if (info == PanelType.DiaSupplement) {
                        if (UIPanelController.getInstance().checkIsTopView(PanelType.DiaSupplement)) {
                            // console.log("当前最高层级为 DiaSupplement");
                            return;
                        }
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
            UIPanelController.getInstance().pushView(PanelType.DiaSupplement, true, null)
        }
    };

    /**
    * 添加Panel
    */
    private createPanel() {
        let BindMed = (node: Node) => {
            this._panel = node.getComponent(DiaSupplementPanel);
            this._panel.define();
            this.bindListener();
        }
        UIPanelController.getInstance().pushView(PanelType.DiaSupplement, true, BindMed);
    }
}
