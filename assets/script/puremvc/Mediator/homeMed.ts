import { Mediator } from "../../../Plugin/core/puremvc/patterns/mediator/Mediator";
import { INotification } from "../../../Plugin/core/puremvc/interfaces/INotification";
import { HomePanel } from "../../panels/homePanel";
import { CommandDefine } from "../commandDefine";
import { PanelType } from "../../../Plugin/UIFrameWork/PanelType";
import { log, Node, find, ScrollView, view, UITransform, PageView, Toggle, SpriteFrame } from "cc";
import UIPanelController from "../../../Plugin/UIFrameWork/UIPanelControllor";
import { PlaySongInfo, SongTableType, SongPlayType, FMRSwitchRequestInfo, SwitchType, FuncModule } from "../../GloalDefine";
import SongListManager from "../../tools/SongListManager";
import { ProxyDefine } from "../proxyDefine";
import { Facade } from "../../../Plugin/core/puremvc/patterns/facade/Facade";
import { GameMusicPxy } from "../Proxy/gameMusicPxy";
import { GameUserPxy } from "../Proxy/gameUserPxy";
import { ReportAnalytics } from "../../../Plugin/reportAnalytics";

export class HomeMed extends Mediator {

    private panel: HomePanel = null;
    private curContentY: number = 0;
    private lastContentY: number = 0;
    private curSongTableType: SongTableType = null;
    private _gameMusicPxy: GameMusicPxy = null;
    private songListManager: SongListManager = SongListManager.getInstance();

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);
        this._gameMusicPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_MusicPxy) as GameMusicPxy;;
    }

    private bindListener(): void {
        this.panel.setListCallback(this.onSongListScrolling.bind(this))
        this.panel.setMoreBtn();
        this.panel.setClickSet(() => {
            this.sendNotification(CommandDefine.PushPanelReqiest, PanelType.Set);
        });
        this.panel.onEnterCall = () => {
            this.sendNotification(CommandDefine.FMRSwitchRequest, new FMRSwitchRequestInfo(SwitchType.OPEN, FuncModule.HomeModule));
            ReportAnalytics.getInstance().reportAnalytics("viewShow_eventAnalytics", "main", 1)
        }
        this.panel.onExitCall = () => {
            this.panel = null;
            this.curContentY = 0;
            this.lastContentY = 0;
            this.curSongTableType = null;
            this.songListManager.clearAll();
        }
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
                    if (info == PanelType.Home) {
                        log("PushPanelReqiest  接收成功", info)
                        this.pushPanel();
                    }
                    break;
                }
            case CommandDefine.TableResponce:
                {
                    switch(type) {
                        case 'All':
                            this.songListManager.pushSongTable(this.curSongTableType, info, this.panel.setCursongTableContentSizeY.bind(this.panel), this.panel.createAllSongUnit.bind(this.panel));
                            break;
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
            UIPanelController.getInstance().pushPanel(PanelType.Home, null)
        }
    };

    /**
    * 添加Panel
    */
    private createPanel() {
        let homePanel = find("Canvas/panelRoot/HomePanel");
        if (!homePanel) {
            let BindMed = (node: Node) => {
                this.panel = node.getComponent(HomePanel);
                this.bindListener();
                this.dealSongTableTypeActive(SongTableType.All);
                this.sendNotification(CommandDefine.PushPanelReqiest, PanelType.Recommend);
            }
            UIPanelController.getInstance().pushPanel(PanelType.Home, BindMed);
        } else {
            this.panel = homePanel.getComponent(HomePanel);
            homePanel.active = true;
            this.bindListener();
            const userPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_UserPxy) as GameUserPxy;
            if (!userPxy.checkUserNew()) {
                this.dealSongTableTypeActive(SongTableType.All);
                this.sendNotification(CommandDefine.PushPanelReqiest, PanelType.Recommend);
            }
        }
    }

    private onSongListScrolling(scrollView: ScrollView) {
        this.curContentY = scrollView.content.position.y;
        let offset = this.curContentY - this.lastContentY;
        this.lastContentY = this.curContentY;
        if (offset > 5) {
            //上滑操作时
            // console.log("上滑")
            let topNode = this.songListManager.getTopSongNode(SongTableType.All);  //数组内第一个节点
            let worldTop = scrollView.node.worldPosition.y + 300;
            if (topNode && topNode.worldPosition.y > worldTop) {
                this.songListManager.topToButtom(SongTableType.All);
            }
        }
        else if (offset < -5) {
            //  console.log("下滑")
            let buttomNode = this.songListManager.getButtomSongNode(SongTableType.All);  //数组内最后一个节点
            let worldButtom = scrollView.node.worldPosition.y - scrollView.node.getComponent(UITransform).height - 300;
            if (buttomNode && buttomNode.worldPosition.y < worldButtom) {
                this.songListManager.buttomToTop(SongTableType.All);
            }
        }
    }

    /**
    * 处理相应的歌单的激活
    * @param _funcModule 
    */
    public dealSongTableTypeActive(_tableType: SongTableType) {
        if (this.curSongTableType == _tableType) {
            //  DefTool.log("当前正处于" + _tableType + " 模块!")
            return;
        }
        this.curSongTableType = _tableType;
        switch (_tableType) {
            case SongTableType.All:
                this._gameMusicPxy.offerTotalTable();
                break;
            default:
                break;
        }
    }

    private toSongPanel() {
        this.sendNotification(CommandDefine.FMRSwitchRequest, new FMRSwitchRequestInfo(SwitchType.OPEN, FuncModule.SkinModule));
    }
}