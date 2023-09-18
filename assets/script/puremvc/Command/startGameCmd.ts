
import { _decorator, Component, Node, log, director, ProgressBar, tween, Tween, view, math } from 'cc';
import { SimpleCommand } from '../../../Plugin/core/puremvc/patterns/command/SimpleCommand';
import GloalDefine, { SongInfo, PlaySongInfo, SongPlayType, SwitchType, FMRSwitchRequestInfo, FuncModule, ConsumablesType, ConsumablesAlterInfo } from '../../GloalDefine';
import { INotification } from '../../../Plugin/core/puremvc/interfaces/INotification';
import AudioManager from '../../../Plugin/audioPlayer/AudioManager';
import { Facade } from '../../../Plugin/core/puremvc/patterns/facade/Facade';
import { ProxyDefine } from '../proxyDefine';
import { GameMusicPxy } from '../Proxy/gameMusicPxy';
import { CommandDefine } from '../commandDefine';
import { GameDirector } from '../../game/gameDirector';
import MusicManager from '../../../Plugin/musicLoader/MusicManager';
import UIPanelController from '../../../Plugin/UIFrameWork/UIPanelControllor';
import { ApplicationManager } from '../../applicationManager';
import { PanelType } from '../../../Plugin/UIFrameWork/PanelType';
import { GameUserPxy } from '../Proxy/gameUserPxy';
import { ThemeController } from '../../game/themeController';
// import ASCAd from '../../../Plugin/ADSDK/ASCAd';
import ASCAd_New from '../../../Plugin/ASCAd_New';

export class StartGameCmd extends SimpleCommand {
    private info: SongInfo;
    public execute(notification: INotification): void {
        GameDirector.getInstance().IsGame = true;
        ASCAd_New.getInstance().hideBanner();
        this.info = notification.getBody() as SongInfo;
        let startProgress = ApplicationManager.getInstance().startGamePanel.getComponentInChildren(ProgressBar);
        const _gamemusicPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_MusicPxy) as GameMusicPxy;
        const userPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_UserPxy) as GameUserPxy;
        AudioManager.GetInstance(AudioManager).player.stopMusic();
        ApplicationManager.getInstance().showStartGamePanel();
        ApplicationManager.getInstance().mainBG.active = false;
        ThemeController.getInstance().CurThemeId = userPxy.getUseThemId();
        ThemeController.getInstance().CurBgId = math.randomRangeInt(0, 3);
        ThemeController.getInstance().envParnet.active = true;
        GameDirector.getInstance().initGame();
        this.sendNotification(CommandDefine.UIRSwitchRequest, SwitchType.CLOSE);
        this.sendNotification(CommandDefine.FMRSwitchRequest, new FMRSwitchRequestInfo(SwitchType.CLOSE, FuncModule.HomeModule));
        _gamemusicPxy.saveCurGameSongInfo(this.info);
        _gamemusicPxy.setLastPlaySongName(this.info.musicName);
        let loadSongTask = this.loadSong(this.info.musicFile, this.info.musicId);
        let loadJsonTask = this.loadPointJson(this.info.json_normal);
        tween(startProgress).by(3, { progress: 0.2 }).start();
        UIPanelController.getInstance().preloadPanel(PanelType.Settle_Normal);
        UIPanelController.getInstance().preloadPanel(PanelType.Revive);
        Promise.all([loadSongTask, loadJsonTask]).then((result) => {
            this.sendNotification(CommandDefine.PlaySongResponce, new PlaySongInfo(this.info.musicName, SongPlayType.Wait));
            let clipRes = result[0];
            let jsonRes = result[1]
            let cal = () => {
                UIPanelController.getInstance().clearViewStack();
                UIPanelController.getInstance().clearPanelStack();
                UIPanelController.getInstance().clearExistPanelDict();
                GameDirector.getInstance().switchPlayHardLv(this.info.ex_lv);
                GameDirector.getInstance().gameConfigure(clipRes, jsonRes)
                this.sendNotification(CommandDefine.StartSongSucceedResponce, this.info.musicId);
                ApplicationManager.getInstance().hideStartGamePanel();
                ASCAd_New.getInstance().showBanner();
            }
            Tween.stopAllByTarget(startProgress);
            this.fakeLoad(startProgress, cal);
        }).catch((error) => {
            console.log(error)
        })
    }

    loadSong(url: string, musicId: any) {
        return new Promise((resolve, reject) => {
            MusicManager.GetInstance(MusicManager).Loader.LoadSongClip(url, musicId, (res: any) => {
                resolve(res);
            });
        });
    }

    loadPointJson(jsonUrl: string) {
        return new Promise((resolve, reject) => {
            MusicManager.GetInstance(MusicManager).Loader.LoadPoint(jsonUrl, (res: any) => {
                resolve(res);
            });
        });
    }

    private fakeLoad(progressBar: ProgressBar, cal: Function) {
        let completedCount = 0.2
        let id = setInterval(() => {
            let pro = completedCount / 1;
            progressBar.progress = pro
            completedCount += 0.006;
            if (pro >= 1) {
                clearInterval(id);
                cal();
            }
        }, 10)
    }
}
