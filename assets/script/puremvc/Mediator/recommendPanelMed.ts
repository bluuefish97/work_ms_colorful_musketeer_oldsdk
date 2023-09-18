
import { _decorator, Node, SpriteFrame, log, view } from 'cc';
import { Mediator } from '../../../Plugin/core/puremvc/patterns/mediator/Mediator';
import { RecommendPanel } from '../../panels/recommendPanel';
import { GameMusicPxy } from '../Proxy/gameMusicPxy';
import { SongInfo, PlaySongInfo, SongPlayType, ConsumablesType, PlayState } from '../../GloalDefine';
import { ProxyDefine } from '../proxyDefine';
import { Facade } from '../../../Plugin/core/puremvc/patterns/facade/Facade';
import { PoolManager } from '../../../Plugin/PoolManager';
import { CommandDefine } from '../commandDefine';
import { AudioEffectCtrl, ClipEffectType } from '../../../Plugin/AudioEffectCtrl';
import UIPanelController from '../../../Plugin/UIFrameWork/UIPanelControllor';
import { PanelType } from '../../../Plugin/UIFrameWork/PanelType';
import { INotification } from '../../../Plugin/core/puremvc/interfaces/INotification';
import AudioManager from '../../../Plugin/audioPlayer/AudioManager';
import ASCAd_New from '../../../Plugin/ASCAd_New';
// import ASCAd from '../../../Plugin/ADSDK/ASCAd';
const { ccclass, property } = _decorator;

@ccclass('RecommendPanelMed')
export class RecommendPanelMed extends Mediator {

    private recomShowNumMAX: number = 2;
    private curRecomShowNum: number = 0;
    private _panel: RecommendPanel = null;
    private game_musicPxy: GameMusicPxy = null;
    private newSongInfo: SongInfo = null;

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);
        this.game_musicPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_MusicPxy) as GameMusicPxy;
    }

    private bindListener(): void {
        this._panel.onEnterCall = () => {
            ASCAd_New.getInstance().showBanner();
            this.newSongInfo = this.getNewSong();
            this._panel.setSongNameLabel(this.newSongInfo.musicName);
            let id = this.game_musicPxy.getSongListId(this.newSongInfo.musicName);
            let tempId = id % 10;
            let str = "songirons/" + tempId;
            PoolManager.instance.getSpriteFrame(str, (spriteFrame: SpriteFrame) => {
                this._panel && this._panel.setSongIronSpr(spriteFrame);
            })
            this._panel.waitingAct();
            Facade.getInstance().sendNotification(CommandDefine.PlaySongRequest, new PlaySongInfo(this.newSongInfo.musicName, SongPlayType.Immediately));
        }
        this._panel.onExitCall = () => {
            ASCAd_New.getInstance().hideNativeImage();
            ASCAd_New.getInstance().hideBanner();
            this._panel = null;
        }
        this._panel.songPlaySwitchBtnClickEvent(() => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
            this.songPlaySwitchBtnClickEvent();
        })
        this._panel.RegisterCancelButtonClick(() => {
            UIPanelController.getInstance().popView();
            let lastSongName = this.game_musicPxy.getLastPlaySongName();
            Facade.getInstance().sendNotification(CommandDefine.PlaySongRequest, new PlaySongInfo(lastSongName, SongPlayType.Immediately));
        });
        this._panel.setADUnLockBtnClickEvent(() => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
            this.adUnlockPlay();
        })
        this._panel.setStartBtnClickEvent(() => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
            this.startPlay();
        })
    }

    public listNotificationInterests(): string[] {
        return [
            CommandDefine.PushPanelReqiest,
            CommandDefine.PlaySongResponce,
        ];
    }

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        switch (notification.getName()) {
            case CommandDefine.PushPanelReqiest:
                {
                    if (info == PanelType.Recommend) {
                        if (this.curRecomShowNum < this.recomShowNumMAX) {
                            this.pushPanel();
                            this.curRecomShowNum++;
                        } else {
                            let name = this.game_musicPxy.getCurGameSongInfo().musicName;
                            Facade.getInstance().sendNotification(CommandDefine.PlaySongRequest, new PlaySongInfo(name, SongPlayType.Immediately));
                        }
                    }
                    break;
                }
            case CommandDefine.PlaySongResponce:
                {
                    let playSongInfo = info as PlaySongInfo
                    if (!this._panel) return;
                    if (this.newSongInfo && playSongInfo.songName == this.newSongInfo.musicName)     //播放当前的歌
                    {
                        this._panel.isPause = false;
                        this._panel.waitingEndAct();
                        this._panel.setPlayStateShow();
                    } else if (this.newSongInfo && playSongInfo.songName != this.newSongInfo.musicName) {
                        this._panel.setStopStateShow();
                        this._panel.isPause = false;
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
            UIPanelController.getInstance().pushView(PanelType.Recommend, true, null)
        }
    };

    /**
    * 添加Panel
    */
    private createPanel() {
        let BindMed = (node: Node) => {
            this._panel = node.getComponent(RecommendPanel);
            this._panel.define();
            this.bindListener();
        }
        UIPanelController.getInstance().pushView(PanelType.Recommend, true, BindMed);
    }

    private getNewSong() {
        let _isHaveNewSong: boolean;
        let _newSongInfo: SongInfo = null;  //结束面板要显示的歌曲信息
        let tempUnlockType: string;   //结束面板要显示的歌曲信息配置的解锁类型

        let arr = this.game_musicPxy.getData();
        if (!this.game_musicPxy.affordLockSongInfoList(arr)) {
            _isHaveNewSong = false;
            _newSongInfo = arr[Math.floor(Math.random() * arr.length)];
        }
        else {
            _isHaveNewSong = true;
            _newSongInfo = this.game_musicPxy.affordAdInfo(arr);
            // console.log("提供的未解锁的歌曲--------------");
            tempUnlockType = _newSongInfo.unlockType;
            _newSongInfo.unlockType = "video";
        }
        return _newSongInfo;
    }

    /**
     * 挑战新游戏
     */
    public adUnlockPlay() {
        // console.log("解锁游戏提供的待解锁的歌曲：" + this.newSongInfo.musicName);
        let self = this;
        let onUnlockCallBack = function (isSucces: boolean) {
            if (isSucces) {
                self._panel.switchUnlockState(true);
                self.startPlay();

            }
        }
        Facade.getInstance().sendNotification(CommandDefine.UnluckSongRequest, ({
            song: this.newSongInfo,
            cal: onUnlockCallBack
        }))

    }

    public onStartPlay() {
        this.startPlay();
    }

    public startPlay() {
        let self = this;
        Facade.getInstance().sendNotification(CommandDefine.StartGame, self.newSongInfo);

    }

    private switchUserInfo() {
        this.sendNotification(CommandDefine.SwitchCurrencyType, {
            type: ConsumablesType.dia,
            openCal: (node: Node) => {
                node.active = true;
            }
        });

        this.sendNotification(CommandDefine.SwitchCurrencyType, {
            type: ConsumablesType.power,
            openCal: (node: Node) => {
                node.active = true;
            }
        })
    }

    public songPlaySwitchBtnClickEvent() {
        if (this._panel.isPause)        //当前的歌曲播放被暂停
        {
            this._panel.isPause = false;
            AudioManager.GetInstance(AudioManager).player.resumeMusic();
            this._panel.setPlayStateShow();
            this.game_musicPxy.setIsPause(null);
        }
        else {
            this._panel.isPause = true;
            AudioManager.GetInstance(AudioManager).player.pauseMusic();
            this._panel.setStopStateShow();
            this.game_musicPxy.setIsPause(this.newSongInfo.musicName);
        }
        this.sendNotification(CommandDefine.SongPlayStateChange, new PlayState(this.newSongInfo.musicName, this._panel.isPause))
    };

}
