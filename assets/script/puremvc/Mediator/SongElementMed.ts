
import { Mediator } from '../../../Plugin/core/puremvc/patterns/mediator/Mediator';
import GloalDefine, { ConsumablesAlterInfo, ConsumablesType, PlaySongInfo, PlayState, SongInfo, SongPlayType, SwitchType, CollectState } from '../../GloalDefine';
import { BaseSongElement } from '../../view/BaseSongElement';
import { GameMusicPxy } from '../Proxy/gameMusicPxy';
import { MusicPxy } from '../Proxy/musicPxy';
import { SpriteFrame, Node, Texture2D, Toggle, log } from 'cc';
import { PoolManager } from '../../../Plugin/PoolManager';
import { ProxyDefine } from '../proxyDefine';
import { Facade } from '../../../Plugin/core/puremvc/patterns/facade/Facade';
import { CommandDefine } from '../commandDefine';
import { INotification } from '../../../Plugin/core/puremvc/interfaces/INotification';
import AudioManager from '../../../Plugin/audioPlayer/AudioManager';
import { AudioEffectCtrl, ClipEffectType } from '../../../Plugin/AudioEffectCtrl';
import { ReportAnalytics } from '../../../Plugin/reportAnalytics';
import { GameAssetPxy } from '../Proxy/gameAssetPxy';
import UIPanelController from '../../../Plugin/UIFrameWork/UIPanelControllor';
import { PanelType } from '../../../Plugin/UIFrameWork/PanelType';
import GetEvenTypeNameTool from '../../../Plugin/tools/getEvenTypeNameTool';

export class SongElementMed extends Mediator {

    private songElement: BaseSongElement = null;
    private songElementInfo: SongInfo = null;
    private gameMusicPxy: GameMusicPxy;
    private tempInfo: any = null;
    private AdRefreshInterval: any;
    private isInitiativeSwitch: boolean = false;
    eventName: string = '';
    id: number = null;

    public songId: number = null;

    get songInfo(): SongInfo {
        return this.songElementInfo;
    }

    public constructor(mediatorName: string = null, viewComponent: any = null, eventType: string) {
        super(mediatorName, viewComponent);
        if (viewComponent == null) {
            return;
        }
        let viewNode = viewComponent as Node;
        if (!viewNode) {
            return;
        }
        this.eventName = GetEvenTypeNameTool.nameMap[eventType];
        this.gameMusicPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_MusicPxy) as GameMusicPxy;
        this.songElement = viewNode.getComponent(BaseSongElement);
        this.songElement.define();
        this.bindListener();
    }

    private bindListener(): void {
        this.songElement.setDiasBtnClickEvent(() => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
            this.diasBtnClickEvent();
        })
        this.songElement.songPlaySwitchBtnClickEvent(() => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
            this.songPlaySwitchBtnClickEvent();
        })
        this.songElement.setAdBtnClickEvent(() => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
            this.AdBtnClickEvent();
        })
        this.songElement.setStartBtnClickEvent(() => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
            this.startBtnClickEvent();
        })

        this.songElement.setlikeToggleEvent((toggle: Toggle) => {
            this.sendNotification(CommandDefine.CollectSongRequest, new CollectState(this.songElementInfo.musicId, toggle.isChecked));
            if (toggle.isChecked) {
                this.gameMusicPxy.addCollectSong(this.songElementInfo.musicId);
            } else {
                this.gameMusicPxy.decreaseCollectSong(this.songElementInfo.musicId);
            }
        })
    }

    public listNotificationInterests(): string[] {
        return [
            CommandDefine.UnluckSongSucceedResponce,
            CommandDefine.SongStarResponce,
            CommandDefine.PlaySongResponce,
            CommandDefine.SongPlayStateChange,
            CommandDefine.StartSongSucceedResponce,
            CommandDefine.CollectSongRequest,
        ];
    }

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        switch (notification.getName()) {
            case CommandDefine.UnluckSongSucceedResponce:
                {
                    if (this.songElementInfo && notification.getBody() == this.songElementInfo.musicId)     //解锁的当前的歌
                    {
                        this.songElement.setUnlockState()
                    }
                    break;
                }
            case CommandDefine.SongStarResponce:
                {
                    if (this.songElementInfo && info.id == this.songElementInfo.musicId)     //当前的歌的星星数
                    {
                        this.songElement.setStarsNum(notification.getBody().val);
                    }
                    break;
                }
            case CommandDefine.PlaySongResponce:
                {
                    
                    let playSongInfo = info as PlaySongInfo;
                    if (this.songElementInfo && playSongInfo.songName == this.songElementInfo.musicName)     //播放当前的歌
                    {
                        this.songElement.setSelectTipShowState(true);
                        this.songElement.waitingEndAct();
                        this.songElement.setPlayStateShow();
                    } else if (this.songElementInfo && playSongInfo.songName != this.songElementInfo.musicName && this.songElement.IsPlayState) {
                        this.songElement.setStopStateShow();
                        this.songElement.isPause = false;
                        this.songElement.setSelectTipShowState(false);
                    }
                    break;
                }
            case CommandDefine.SongPlayStateChange:
                {
                    let playState = info as PlayState
                    if (this.songElementInfo && playState.songName == this.songElementInfo.musicName) {
                        if (!this.isInitiativeSwitch) {
                            this.songElement.isPause = playState._isPause;
                            if (this.songElement.isPause) {
                                this.songElement.setStopStateShow();
                            }
                            else {
                                this.songElement.setPlayStateShow();
                            }
                        }

                    }

                    break;
                }
            case CommandDefine.StartSongSucceedResponce:
                {
                    if (this.songElementInfo && info == this.songElementInfo.musicId) {
                        this.songElement.showNewStateTip(false);
                    }
                    break;
                }
            case CommandDefine.CollectSongRequest:
                {
                    let collectState = info as CollectState;
                    if (this.songElementInfo && collectState._songId == this.songElementInfo.musicId) {
                        this.songElement.showCollectStateTip(collectState._isCollect);
                    }
                    break;
                }
        }
    }

    public AdBtnClickEvent() {
        let self = this;
        let onUnlockCallback = function (isSucces: boolean) {
            self.sendNotification(CommandDefine.PlaySongRequest, new PlaySongInfo(self.songElementInfo.musicName, SongPlayType.Immediately));
            if (isSucces) {
                self.startPlaySong();
            }
        }
        Facade.getInstance().sendNotification(CommandDefine.UnluckSongRequest, ({
            song: this.songElementInfo,
            cal: onUnlockCallback
        }))
    };

    public diasBtnClickEvent() {
        let self = this;
        let onUnlockCallback = function (issucces: boolean) {
            self.sendNotification(CommandDefine.PlaySongRequest, new PlaySongInfo(self.songElementInfo.musicName, SongPlayType.Immediately));
            if (issucces) {
                self.startPlaySong();
            }
        }
        Facade.getInstance().sendNotification(CommandDefine.UnluckSongRequest, ({
            song: this.songElementInfo,
            cal: onUnlockCallback
        }))
    };

    public startBtnClickEvent() {
        this.startPlaySong();
    };

    private startPlaySong() {
        this.sendNotification(CommandDefine.StartGame, this.songElementInfo);
    }

    public songPlaySwitchBtnClickEvent() {
        this.isInitiativeSwitch = true;
        if (this.songElement.isPlayState)       //被选择的状态下
        {
            if (this.songElement.isPause)        //当前的歌曲播放被暂停
            {
                this.songElement.isPause = false;
                AudioManager.GetInstance(AudioManager).player.resumeMusic();
                this.songElement.setPlayStateShow();
                this.gameMusicPxy.setIsPause(null);
            }
            else {
                this.songElement.isPause = true;
                AudioManager.GetInstance(AudioManager).player.pauseMusic();
                this.songElement.setStopStateShow();
                this.gameMusicPxy.setIsPause(this.songElementInfo.musicName);
            }
            this.sendNotification(CommandDefine.SongPlayStateChange, new PlayState(this.songElementInfo.musicName, this.songElement.isPause))
        }
        else {
            this.songElement.waitingAct();
            this.sendNotification(CommandDefine.PlaySongRequest, new PlaySongInfo(this.songElementInfo.musicName, SongPlayType.Immediately));
        }
        this.isInitiativeSwitch = false;
    };

    public initSongInfo(info: SongInfo, id: number) {
        this.id = id;
        this.songElementInfo = info;
        this.songElement.node.name = this.songElementInfo.musicName;
        clearInterval(this.AdRefreshInterval);
        let playState = this.gameMusicPxy.getIsPlayState(this.songElementInfo.musicName)
        let isPause = this.gameMusicPxy.getIsPause(this.songElementInfo.musicName)
        this.songElement.setSongPlayState(playState, isPause);
        this.songElement.setSongNameLabel(this.songElementInfo.musicName);
        this.songElement.setSingerNameLabel(this.songElementInfo.singerName);
        this.songElement.showHardTip(this.songElementInfo.ex_lv);
        let isCollect = this.gameMusicPxy.checkCollectSong(this.songElementInfo.musicId);
        this.songElement.showCollectStateTip(isCollect);
        if (this.gameMusicPxy.getSongIdUnlockState(this.songElementInfo.musicId)) {
            this.songElement.setUnlockState();
            this.songElement.setStarsNum(this.gameMusicPxy.getSongStarNum(this.songElementInfo.musicId));
            this.songElement.setBestScore(this.gameMusicPxy.getSongBestScore(this.songElementInfo.musicId))
        }
        else {
            this.songElement.setUnlockType(this.songElementInfo.unlockType, parseInt(this.songElementInfo.unlockCost));
            this.songElement.setStarsNum(0);
            this.songElement.setBestScore(0);
        }
        let self = this;
        let tempId = id % 10;
        let str = "songirons/" + tempId;
        PoolManager.instance.getSpriteFrame(str, (spriteFrame: SpriteFrame) => {
            self.songElement.setSongIronSpr(spriteFrame);
        })
    }

    /**
    *快速开始歌曲单元 
    */
    public initQuickStartSongInfo(info: SongInfo) {
        this.songElementInfo = info;
        console.log("快速开始的歌曲单元  ");
        console.log(this.songElementInfo.musicName);
        let str = this.songElementInfo.musicName + " —— " + this.songElementInfo.singerName
        this.songElement.setSongNameLabel(str);
        if (this.gameMusicPxy.getSongIdUnlockState(this.songElementInfo.musicId)) {
            this.songElement.setUnlockState();
        }
        else {
            this.songElement.setUnlockType(this.songElementInfo.unlockType, parseInt(this.songElementInfo.unlockCost));
        }
    }

    clearSongElement() {
        PoolManager.instance.putNode(this.songElement.node);
    }
}


