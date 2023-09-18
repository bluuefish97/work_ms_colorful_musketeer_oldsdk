import { SimpleCommand } from "../../../Plugin/core/puremvc/patterns/command/SimpleCommand";
import { INotification } from "../../../Plugin/core/puremvc/interfaces/INotification";
import { log, director, find, ProgressBar } from "cc";
import GloalDefine, { FMRSwitchRequestInfo, SwitchType, FuncModule, SongInfo } from "../../GloalDefine";
import UIPanelController from "../../../Plugin/UIFrameWork/UIPanelControllor";
import { PanelType } from "../../../Plugin/UIFrameWork/PanelType";
import BasePanel from "../../../Plugin/UIFrameWork/BasePanel";
import { ApplicationManager } from "../../applicationManager";
import { Facade } from "../../../Plugin/core/puremvc/patterns/facade/Facade";
import { MediatorDefine } from "../mediatorDefine";
import { ModelToggleGroupMed } from "../Mediator/ModelToggleGroupMed";
import { CommandDefine } from "../commandDefine";
import ASCAd from "../../../Plugin/ADSDK/ASCAd";
import { ProxyDefine } from "../proxyDefine";
import { GameMusicPxy } from "../Proxy/gameMusicPxy";
import { GameUserPxy } from "../Proxy/gameUserPxy";
import { AudioEffectCtrl } from "../../../Plugin/AudioEffectCtrl";
import AudioManager from "../../../Plugin/audioPlayer/AudioManager";
import { AppPlatformController, App_Platform } from "../../../Plugin/AppPlatformController";
import { sdkConfig } from "../../../Plugin/ADSDK/SdkConfig";

export class AppStartCmd extends SimpleCommand {


    public execute(notification: INotification): void {
        this.fitChannelId();
        const userPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_UserPxy) as GameUserPxy;
        let call = () => {
            let startProgress = ApplicationManager.getInstance().startPanel.getComponentInChildren(ProgressBar);
            let onProgress = (completedCount: number, totalCount: number, item: any) => {
                let pro = completedCount / totalCount;
                startProgress.progress = pro * 0.8
            }
            let launchedCal: Function;
            let _gameUserPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_UserPxy) as GameUserPxy;
            AudioEffectCtrl.getInstance().updateVolume(_gameUserPxy.getEffectVolume());
            AudioEffectCtrl.getInstance().setPhoneVibrate(_gameUserPxy.getMusicVibrate());
            AudioManager.GetInstance(AudioManager).player.setVolume(_gameUserPxy.getMusicVolume());
            this.initModelToggleGroup(SwitchType.CLOSE);
            launchedCal = userPxy.checkUserNew() ? this.onSceneLaunchedNewUse : this.onSceneLaunched
            director.preloadScene(GloalDefine.gameSceneName, onProgress, () => {
                director.loadScene(GloalDefine.gameSceneName, launchedCal.bind(this))
            });
        }

        if(App_Platform.GP_Android) {
            call();
        } else {
            if(userPxy.getUserInfo()) {
                call();
            } else {
                ASCAd.getInstance().showPrivacyAgreement("", "", (suc: any) => {
                    if(suc) {
                        userPxy.setUserInfo();
                        call();
                    }
                })
            }
        }
    }

    private onSceneLaunched() {
        let startProgress = ApplicationManager.getInstance().startPanel.getComponentInChildren(ProgressBar);
        this.fakeLoad(startProgress, () => {
            ApplicationManager.getInstance().clearStartPanel();
            const musicPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_MusicPxy) as GameMusicPxy;
            let info = musicPxy.affordUnlockInfo(musicPxy.data)
            this.sendNotification(CommandDefine.StartGame, info);
        })
    }

    private onSceneLaunchedNewUse() {
        const startProgress = ApplicationManager.getInstance().startPanel.getComponentInChildren(ProgressBar);
        this.initModelToggleGroup(SwitchType.CLOSE);
        this.fakeLoad(startProgress, () => {
            ApplicationManager.getInstance().clearStartPanel();
            const musicPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_MusicPxy) as GameMusicPxy;
            let info = musicPxy.getSongInfoById("zdjz3")
            musicPxy.UnlockSong(info.musicId);
            // let data: SongInfo[] = musicPxy.getData()
            // for(let i = 0; i < 1; i++) {
            //     musicPxy.UnlockSong(data[i].musicId);
            // }
            this.sendNotification(CommandDefine.StartGame, info);
        })
    }

    //初始化功能模块区
    private initModelToggleGroup(switchType: SwitchType) {
        const modelToggleGroup = find("Canvas/ModelToggleGroup")
        const med = new ModelToggleGroupMed(MediatorDefine.ModelToggleGroupMed, modelToggleGroup);
        Facade.getInstance().registerMediator(med);
        this.sendNotification(CommandDefine.FMRSwitchRequest, new FMRSwitchRequestInfo(switchType, FuncModule.HomeModule));
    }

    //注册homePanels
    private registerHomePanel(isShow = true) {
        const homePanel = find("Canvas/panelRoot/HomePanel");
        if (!homePanel) {
            console.error("未找到main场景存在的HomePanel");
            return;
        }
        let panel = homePanel.getComponent(BasePanel);
        UIPanelController.getInstance().pushExistPanel(PanelType.Home, panel);
        homePanel.active = isShow;
    }

    private fakeLoad(progressBar: ProgressBar, cal: Function) {
        let completedCount = 0.8
        let id = setInterval(() => {
            let pro = completedCount / 1;
            progressBar.progress = pro
            completedCount += 0.016;
            if (pro >= 1) {
                clearInterval(id);
                cal();
            }
        }, 16)

    }

    private fitChannelId() {
        switch (AppPlatformController.Platform) {
            case App_Platform.GP_Vivo:
                sdkConfig.channelId = '5645108'
                break;
            case App_Platform.GP_Oppo:
                sdkConfig.channelId = '5645142'
                break;
            case App_Platform.GP_Tiktok:
                sdkConfig.channelId = '5645154'
                break;
            case App_Platform.GP_Android:
                sdkConfig.channelId = '1234666';
                break;
            case App_Platform.GP_WX:
                sdkConfig.channelId = '5777161'
                break;
            default:
                sdkConfig.channelId = '0'
                break;
        }
        ASCAd.getInstance().initAd();
        ASCAd.getInstance().setGroup(25)
    }
}
