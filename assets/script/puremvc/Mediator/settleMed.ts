import { Mediator } from "../../../Plugin/core/puremvc/patterns/mediator/Mediator";
import { INotification } from "../../../Plugin/core/puremvc/interfaces/INotification";
import GloalDefine, { SongInfo, ConsumablesType, ConsumablesAlterInfo, PlayType, NormalSettleInfo, PlaySongInfo, SongPlayType, FMRSwitchRequestInfo, SwitchType, FuncModule, SongTableType } from "../../GloalDefine";
import { Facade } from "../../../Plugin/core/puremvc/patterns/facade/Facade";
import { SettlePanel } from "../../panels/settlePanel";
import { ProxyDefine } from "../proxyDefine";
import { CommandDefine } from "../commandDefine";
import { PanelType } from "../../../Plugin/UIFrameWork/PanelType";
import { log, Node, view } from "cc";
import UIPanelController from "../../../Plugin/UIFrameWork/UIPanelControllor";
import { MediatorDefine } from "../mediatorDefine";
import { SongElementMed } from "./SongElementMed";
import { ApplicationManager } from "../../applicationManager";
import { AudioEffectCtrl, ClipEffectType } from "../../../Plugin/AudioEffectCtrl";
import RecController, { RecState } from "../../../Plugin/bytedance_screenRec/recController";
import { ThemeController } from "../../game/themeController";
// import ASCAd from "../../../Plugin/ADSDK/ASCAd";
import { GameMusicPxy } from "../Proxy/gameMusicPxy";
import SongListManager from "../../tools/SongListManager";
import { AppPlatformController, App_Platform } from "../../../Plugin/AppPlatformController";
import ASCAd_New from "../../../Plugin/ASCAd_New";

export class SettleMed extends Mediator {

    private _panel: SettlePanel = null;
    private gameMusicPxy: GameMusicPxy;
    private _nextPlaySong: SongInfo = null;
    private songListManager: SongListManager = SongListManager.getInstance();
    private _curSongInfo: SongInfo = null;
    private isWin: boolean = false;

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);
        this.gameMusicPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_MusicPxy) as GameMusicPxy;
    }
    private bindListener(): void {
        this._panel.onEnterCall = () => {
            ThemeController.getInstance().envParnet.active = false;
         
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
            this.sendNotification(CommandDefine.Settle_Normal);
        }
        this._panel.RegisterReturnButtonClick(() => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
            this.backHome();
        });
        this._panel.RegisterAgainStartButtonClick(() => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
            this.onStartAgainPlaySong();
        })
        this._panel.RegisterNextButtonClick(() => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
            let songMed = Facade.getInstance().retrieveMediator(MediatorDefine.SongElementMed + "FinshElement") as SongElementMed;
            if(this.gameMusicPxy.getSongIdUnlockState(songMed.songInfo.musicId)) {
                songMed.startBtnClickEvent();
            } else {
                if(songMed.songInfo.unlockType == 'coin') {
                    songMed.diasBtnClickEvent()
                } else {
                    songMed.AdBtnClickEvent();
                }
            }
        })
        this._panel.onExitCall = () => {
            this._panel = null;
            ASCAd_New.getInstance().hideBanner();
            Facade.getInstance().removeMediator(MediatorDefine.SongElementMed + "FinshElement");
            this.songListManager.clearAll();
        }
    }

    public listNotificationInterests(): string[] {
        return [
            CommandDefine.SettleNormalResponce,
            CommandDefine.PushPanelReqiest,
            CommandDefine.EndRecResponce,
        ];
    }

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        switch (notification.getName()) {
            case CommandDefine.PushPanelReqiest:
                {
                    if (info == PanelType.Settle_Normal) {
                        this.pushPanel();
                    }
                    break;
                }
            case CommandDefine.SettleNormalResponce:
                {
                    let _info = info as NormalSettleInfo;
                    this._panel.setStarsLight(_info.starsValue);
                    this._panel.setScoreLabelShow(_info.scoreValue, _info.diaValue);
                    this._panel.seDiaLabelShow(_info.diaValue);
                    this._nextPlaySong = _info.newSongInfo;
                    this._curSongInfo = _info.curSongInfo;
                    this.isWin = _info.isWin;
                    this._panel.ADIcon.active = !this.gameMusicPxy.getSongIdUnlockState(this._nextPlaySong.musicId);
                    Facade.getInstance().registerMediator(new SongElementMed(MediatorDefine.SongElementMed + "FinshElement" , this._panel.settleSongElement.node, `${this.isWin}`));
                    let songMed = Facade.getInstance().retrieveMediator(MediatorDefine.SongElementMed + "FinshElement") as SongElementMed;
                    let id = this.gameMusicPxy.getSongListId(this._nextPlaySong.musicName);
                    songMed.initSongInfo(this._nextPlaySong, id);
                    Facade.getInstance().sendNotification(CommandDefine.PlaySongRequest, new PlaySongInfo(this._nextPlaySong.musicName, SongPlayType.Immediately));
                    this.sendNotification(CommandDefine.Consumables,
                        {
                            info: new ConsumablesAlterInfo(ConsumablesType.dia, _info.diaValue),
                            callback: null
                        }
                    );
                    if (RecController.getInstance().recState == RecState.InRecing) {
                        this.sendNotification(CommandDefine.EndRec);
                    }
                    break;
                }
            case CommandDefine.EndRecResponce:
                {
                    if(AppPlatformController.Platform == App_Platform.GP_Tiktok) {
                        this.sendNotification(CommandDefine.PushPanelReqiest, PanelType.ShareRec);
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
            UIPanelController.getInstance().pushPanel(PanelType.Settle_Normal, null)
        }
    };

    /**
    * 添加Panel
    */
    private createPanel() {
        let BindMed = (node: Node) => {
            this._panel = node.getComponent(SettlePanel);
            this._panel.define();
            this.bindListener();

        }
        UIPanelController.getInstance().pushPanel(PanelType.Settle_Normal, BindMed);
    }

    private backHome() {
        ApplicationManager.getInstance().mainBG.active = true;
        UIPanelController.getInstance().clearPanelStack();
        UIPanelController.getInstance().clearExistPanelDict();
        this.sendNotification(CommandDefine.PushPanelReqiest, PanelType.Home);
    }

    private onStartAgainPlaySong() {
        Facade.getInstance().sendNotification(CommandDefine.StartGame, this._curSongInfo);
    }
}