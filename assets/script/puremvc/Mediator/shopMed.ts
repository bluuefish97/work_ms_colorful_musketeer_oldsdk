import { Node } from "cc";
// import ASCAd from "../../../Plugin/ADSDK/ASCAd";
import AudioManager from "../../../Plugin/audioPlayer/AudioManager";
import { INotification } from "../../../Plugin/core/puremvc/interfaces/INotification";
import { Facade } from "../../../Plugin/core/puremvc/patterns/facade/Facade";
import { Mediator } from "../../../Plugin/core/puremvc/patterns/mediator/Mediator";
import { PanelType } from "../../../Plugin/UIFrameWork/PanelType";
import UIPanelController from "../../../Plugin/UIFrameWork/UIPanelControllor";
import { ConsumablesAlterInfo, ConsumablesType } from "../../GloalDefine";
import { ShopPanel } from "../../panels/shopPanel";
import { MsghintManager } from "../../tools/msghintManager";
import { CommandDefine } from "../commandDefine";
import { GameUserPxy } from "../Proxy/gameUserPxy";
import { ProxyDefine } from "../proxyDefine";
import ASCAd_New from "../../../Plugin/ASCAd_New";


export class ShopMed extends Mediator {

    private panel: ShopPanel = null;
    private _gameUserPxy: GameUserPxy = null;
    
    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);
        this._gameUserPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_UserPxy) as GameUserPxy;
    }

    private bindListener(): void {
        this.panel.adCallback = (name: string, call: Function) => {
            if(ASCAd_New.getInstance().getVideoFlag()) {
                AudioManager.GetInstance(AudioManager).player.pauseMusic();
                ASCAd_New.getInstance().showVideo((suc: any) => {
                    AudioManager.GetInstance(AudioManager).player.resumeMusic();
                    if(suc) {
                        this._gameUserPxy.setLockSkin(name);
                        call()
                    }
                })
            } else {
                MsghintManager.getInstance().mainMsgHint("暂无广告!")
            }
        }
        this.panel.diaCallBack = (name: string, call: Function) => {
            let succeCallback = () => {
                this._gameUserPxy.setLockSkin(name);
                call();
            };
            this.sendNotification(CommandDefine.Consumables,
                {
                    info: new ConsumablesAlterInfo(ConsumablesType.dia, -200),
                    callback: succeCallback
                }
            );
        }
        this.panel.useCallBack = (name: string) => {
            this._gameUserPxy.setUseSkinName(name);
        }
        this.panel.lockBgCallBack = (id: number, call: Function) => {
            let succeCallback = () => {
                this._gameUserPxy.setLockThem(id);
                call();
            };
            this.sendNotification(CommandDefine.Consumables,
                {
                    info: new ConsumablesAlterInfo(ConsumablesType.dia, -200),
                    callback: succeCallback
                }
            );
        }
        this.panel.useBgCallBack = (id: number, call: Function) => {
            this._gameUserPxy.setUseThemId(id);
            call();
        }
        this.panel.onEnterCall = () => {
        }
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
                    if (info == PanelType.ShopPanel) {
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
            UIPanelController.getInstance().pushPanel(PanelType.ShopPanel, null)
        }
    };

    /**
    * 添加Panel
    */
    private createPanel() {
        let BindMed = (node: Node) => {
            this.panel = node.getComponent(ShopPanel);
            this.panel.define();
            this.bindListener();
        }
        UIPanelController.getInstance().pushPanel(PanelType.ShopPanel, BindMed);
    }
}