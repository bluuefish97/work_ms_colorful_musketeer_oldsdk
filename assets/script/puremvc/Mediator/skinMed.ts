import { Mediator } from "../../../Plugin/core/puremvc/patterns/mediator/Mediator";
import { INotification } from "../../../Plugin/core/puremvc/interfaces/INotification";
import { SkinPanel } from "../../panels/skinPanel";
import { CommandDefine } from "../commandDefine";
import { _decorator, Node, log, ScrollView, UITransform } from 'cc';
import UIPanelController from "../../../Plugin/UIFrameWork/UIPanelControllor";
import { PanelType } from "../../../Plugin/UIFrameWork/PanelType";
import { SkinElementInfo, SongTableType } from "../../GloalDefine";
import { Facade } from "../../../Plugin/core/puremvc/patterns/facade/Facade";
import { ProxyDefine } from "../proxyDefine";
import SongListManager from "../../tools/SongListManager";
import { GameMusicPxy } from "../Proxy/gameMusicPxy";
import { AudioEffectCtrl, ClipEffectType } from "../../../Plugin/AudioEffectCtrl";

export class SkinMed extends Mediator {

    private panel: SkinPanel = null;
    private _gameMusicPxy: GameMusicPxy;
    private songListManager: SongListManager = SongListManager.getInstance();
    private curFuncModule: SongTableType = null;
    
    private curContentY: number[] = [];
    private lastContentY: number[] = [];

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);
        this._gameMusicPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_MusicPxy) as GameMusicPxy;
    }

    private bindListener(): void {
        this.panel.setFuncModuleToggleEvent(SongTableType.type_My_Fail, () => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.songListScrollClip);
            this.dealModuleActive(SongTableType.type_My_Fail);
        });
        this.panel.setFuncModuleToggleEvent(SongTableType.type_My_Pass, () => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.songListScrollClip);
            this.dealModuleActive(SongTableType.type_My_Pass);
        });
        this.panel.setFuncModuleToggleEvent(SongTableType.type_My_Collect, () => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.songListScrollClip);
            this.dealModuleActive(SongTableType.type_My_Collect);
        });
        this.panel.setFuncModuleToggleEvent(SongTableType.type_All, () => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.songListScrollClip);
            this.dealModuleActive(SongTableType.type_All);
        });
        this.panel.setScrollViewCallback(this.onSongListScrolling.bind(this));
        this.panel.onExitCall = () => {
            this.panel = null;
            this.songListManager.clearAll();
        }
        this._gameMusicPxy.offerType3Table()
    }

    public listNotificationInterests(): string[] {
        return [
            CommandDefine.PushPanelReqiest,
            CommandDefine.TableResponce,
        ];
    }

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        let type = notification.getType();
        switch (notification.getName()) {
            case CommandDefine.PushPanelReqiest:
                {
                    if (info == PanelType.Skin) {
                        this.pushPanel();
                    }
                    break;
                }
            case CommandDefine.TableResponce:
                    switch(type) {
                        case 'Fail':
                            this.songListManager.pushSongTable(SongTableType.type_My_Fail, info, this.panel.setCursongTableContentSizeY.bind(this.panel), this.panel.creatFailList.bind(this.panel));
                            break;
                        case 'Pass':
                            this.songListManager.pushSongTable(SongTableType.type_My_Pass, info, this.panel.setCursongTableContentSizeY.bind(this.panel), this.panel.creatPassList.bind(this.panel));
                            break;
                        case "Collect":
                            this.songListManager.updateSongTable(SongTableType.type_My_Collect, info, this.panel.setCursongTableContentSizeY.bind(this.panel), this.panel.creatCollectList.bind(this.panel));
                            break;
                        case 'Type_All':
                            this.songListManager.pushSongTable(SongTableType.type_All, info, this.panel.setCursongTableContentSizeY.bind(this.panel), this.panel.creatAllList.bind(this.panel));
                            break;
                    }
                    break;
            default:
                break;
        }
    }

    private pushPanel() {
        if (!this.panel) {
            this.createPanel();
        } else {
            UIPanelController.getInstance().pushPanel(PanelType.Skin, null)
        }
    };

    /**
    * 添加Panel
    */
    private createPanel() {
        let BindMed = (node: Node) => {
            this.panel = node.getComponent(SkinPanel);
            this.panel.define();
            this.bindListener();
            this.dealModuleActive(SongTableType.type_All);
        }
        UIPanelController.getInstance().pushPanel(PanelType.Skin, BindMed);
    }

    private dealModuleActive(_funcModule: SongTableType) {
        if (this.curFuncModule == _funcModule) {
            return;
        }
        this.curFuncModule = _funcModule;
        switch(_funcModule) {
            case SongTableType.type_My_Collect:
                this._gameMusicPxy.offerTypeCollectTable();
                break;
            case SongTableType.type_My_Fail:
                this._gameMusicPxy.offerTypeFailTable();
                break;
            case SongTableType.type_My_Pass:
                this._gameMusicPxy.offerTypePassTable();
                break;
        }
        this.panel.changeList(_funcModule)
    }


    private onSongListScrolling(scrollView: ScrollView, type: SongTableType) {
        this.curContentY[type] = scrollView.content.position.y;
        let offset = this.curContentY[type] - (this.lastContentY[type] ? this.lastContentY[type] : 0);
        this.lastContentY[type] = this.curContentY[type];
        if (offset > 5) {
            //上滑操作时
            let topNode = this.songListManager.getTopSongNode(type);  //数组内第一个节点
            let worldTop = scrollView.node.worldPosition.y + scrollView.node.getComponent(UITransform).height / 2 + 200
            if (topNode.worldPosition.y > worldTop) {
                this.songListManager.topToButtom(type);

            }
        }
        else if (offset < -5) {
            let buttomNode = this.songListManager.getButtomSongNode(type);  //数组内最后一个节点
            let worldButtom = scrollView.node.worldPosition.y - scrollView.node.getComponent(UITransform).height / 2 - 200
            if (buttomNode.worldPosition.y < worldButtom) {
                this.songListManager.buttomToTop(type);
            }
        }
    }
}