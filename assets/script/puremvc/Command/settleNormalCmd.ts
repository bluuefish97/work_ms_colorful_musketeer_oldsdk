
import { _decorator, Component, Node } from 'cc';
import { SimpleCommand } from '../../../Plugin/core/puremvc/patterns/command/SimpleCommand';
import { INotification } from '../../../Plugin/core/puremvc/interfaces/INotification';
import { ProxyDefine } from '../proxyDefine';
import { GameMusicPxy } from '../Proxy/gameMusicPxy';
import { Facade } from '../../../Plugin/core/puremvc/patterns/facade/Facade';
import { GameUserPxy } from '../Proxy/gameUserPxy';
import { GameDirector } from '../../game/gameDirector';
import { NormalSettleInfo, SongInfo, SwitchType } from '../../GloalDefine';
import { CommandDefine } from '../commandDefine';
import { AppPlatformController, App_Platform } from '../../../Plugin/AppPlatformController';
const { ccclass, property } = _decorator;

@ccclass('SettleNormalCmd')

export class SettleNormalCmd extends SimpleCommand {

    public execute(notification: INotification) {
        console.log("execute:" + "SettleNormalCmd");
        let gameMusicPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_MusicPxy) as GameMusicPxy;
        let gameUsePxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_UserPxy) as GameUserPxy;
        this.sendNotification(CommandDefine.UIRSwitchRequest, SwitchType.OPEN);

        let _scoreNum = GameDirector.getInstance().ScoreVal;
        let _isWin = GameDirector.getInstance().IsWin;
        if (gameUsePxy.checkUserNew()) {
            gameUsePxy.setGameNew();
        }

        let _curSongInfo = gameMusicPxy.getCurGameSongInfo();
        let arr = gameMusicPxy.getData();
        gameMusicPxy.setLastPlaySongName(_curSongInfo.musicName);
        let _starNum = GameDirector.getInstance().ProStarGrade != null ? GameDirector.getInstance().ProStarGrade + 1 : 0;
        if (gameMusicPxy.getSongStarNum(_curSongInfo.musicId) < _starNum) {
            gameMusicPxy.setSongStarNum(_curSongInfo.musicId, _starNum);   //更新当前歌的最大星星数
        }

        let _newSongInfo: SongInfo = null;  //结束面板要显示的歌曲信息
        let tempUnlockType: string;   //结束面板要显示的歌曲信息配置的解锁类型
        let _isHaveNewSong: boolean = false;
        if(_isWin) {
            if (!gameMusicPxy.affordLockSongInfoList(arr)) {
                _isHaveNewSong = false;
                _newSongInfo = arr[Math.floor(Math.random() * arr.length)];
            }
            else {
                _isHaveNewSong = true;
                _newSongInfo = gameMusicPxy.affordAdInfo(arr);
                tempUnlockType = _newSongInfo.unlockType;
                if((AppPlatformController.Platform == App_Platform.GP_Android || AppPlatformController.Platform == App_Platform.GP_Vivo|| AppPlatformController.Platform == App_Platform.GP_Test)) {
                    let keys = gameMusicPxy.getPassSongKeys();
                    if (keys == null || keys.indexOf(_curSongInfo.musicId) == -1) {
                        gameMusicPxy.UnlockSong(_newSongInfo.musicId);
                    } else {
                         _newSongInfo.unlockType = "video";
                    }
                } else {
                    _newSongInfo.unlockType = "video";
                }
            }
        } else {
            if (!gameMusicPxy.affordUnLockSongInfoList(arr)) {
                _isHaveNewSong = true;
                _newSongInfo = arr[Math.floor(Math.random() * arr.length)];
            }
            else {
                _isHaveNewSong = false;
                _newSongInfo = gameMusicPxy.affordUnlockInfo(arr);
                tempUnlockType = _newSongInfo.unlockType;
                _newSongInfo.unlockType = "video";
            }
        }

        if (gameMusicPxy.getSongBestScore(_curSongInfo.musicId) < _scoreNum) {
            gameMusicPxy.setSongBestScore(_curSongInfo.musicId, _scoreNum);   //更新当前歌的最高分数
        }

        let _topRecord: number = gameMusicPxy.getSongBestScore(_curSongInfo.musicId);
        if (_isWin) {
            gameMusicPxy.addPassSong(_curSongInfo.musicId);
        } else {
            gameMusicPxy.addFailSong(_curSongInfo.musicId);
        }

        let diaVal = GameDirector.getInstance().DiaVal;
        let _freeNextSongInfo = gameMusicPxy.affordUnlockInfo(arr);
        let settleInfo = new NormalSettleInfo();
        settleInfo.starsValue = _starNum;
        settleInfo.scoreValue = _scoreNum;
        settleInfo.diaValue = diaVal;
        settleInfo._topRecord = _topRecord
        settleInfo.newSongInfo = _newSongInfo;
        settleInfo.curSongInfo = _curSongInfo;
        settleInfo.isHaveNewSong = _isHaveNewSong;
        settleInfo.freeNextSongInfo = _freeNextSongInfo;
        settleInfo.isWin = _isWin;

        this.sendNotification(CommandDefine.SettleNormalResponce, settleInfo);
    }

}