import { SongInfo, LocalKeys } from "../../GloalDefine";
import { error, log, sys } from "cc";
import { CommandDefine } from "../commandDefine";
import { MusicPxy } from "./musicPxy";

export class GameMusicPxy extends MusicPxy {

    private curPlaySongInfo: SongInfo = null;      //目前播放的歌曲信息
    private curGameSongInfo: SongInfo = null;      //目前游戏的歌曲信息
    private curPlayBgSongName: string;
    private curPuaseBgSongName: string;

    public constructor(proxyName: string = null, data: any = null) {
        super(proxyName, data);
    }

    /**
     * 获得一首歌的星星数量
     * @param songId 
     */
    public getSongStarNum(songId: string) {
        let key = LocalKeys.Key_starNumSongId + songId;
        if (sys.localStorage.getItem(key)) {
            return JSON.parse(sys.localStorage.getItem(key));
        }
        else {
            return 0;
        }

    }

    /**
     * 保存一首歌的星星数量
     */
    public setSongStarNum(songId: string, data: number) {
        let key = LocalKeys.Key_starNumSongId + songId;
        sys.localStorage.setItem(key, JSON.stringify(data));
        this.sendNotification(CommandDefine.SongStarResponce,
            {
                id: songId,
                val: data
            });
    }

    /**
     * 获得一首歌的最高分
     * @param songId 
     */
    public getSongBestScore(songId: string) {
        let key = LocalKeys.Key_bestScoreSongId + songId;
        if (sys.localStorage.getItem(key)) {
            return JSON.parse(sys.localStorage.getItem(key));
        }
        else {
            return 0;
        }
    }

    /**
     * 设置一首歌的最高分
     */
    public setSongBestScore(songId: string, data: number) {
        let key = LocalKeys.Key_bestScoreSongId + songId;
        sys.localStorage.setItem(key, JSON.stringify(data));
        console.log(songId + "  歌的分数为  " + data)
        this.sendNotification(CommandDefine.SongScoreResponce, {
            id: songId,
            val: data
        });
    }

    /**
     * 获得一首歌的解锁状态
     * @param songId 
     */
    public getSongIdUnlockState(songId: string) {
        let key = LocalKeys.Key_unlockSongId + songId;
        if (sys.localStorage.getItem(key)) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * 解锁一首歌
     */
    public UnlockSong(songId: string) {
        error("-------------解锁一首歌",songId)
        let key = LocalKeys.Key_unlockSongId + songId;
        sys.localStorage.setItem(key, JSON.stringify(true));
        this.sendNotification(CommandDefine.UnluckSongSucceedResponce, songId);
    }

    /**
    * 设置默认解锁的歌
    */
    public setDefaultUnlockSong(songId: string) {
        log("-------------设置默认解锁的歌",songId)
        let key = LocalKeys.Key_unlockSongId + songId;
        if (sys.localStorage.getItem(key)) return;      //已经存入本地数据
        sys.localStorage.setItem(key, JSON.stringify(true));
    }

    /**
     * 提供没有解锁的歌曲列表
     */
    public affordLockSongInfoList(arr: Array<SongInfo>) {
        let self = this;
        function checkAdult(songInfo: SongInfo) {
            return self.getSongIdUnlockState(songInfo.musicId) == false;
        }
        let lockArr = arr.filter(checkAdult);
        if (lockArr.length > 0) {
            return lockArr;
        } else {
            return false;
        }
    }

    /**
     * 提供一个没有解锁的歌曲
     */
    public affordAdInfo(arr: Array<SongInfo>): SongInfo {
        let lockArr = this.affordLockSongInfoList(arr);
        if (lockArr && lockArr.length > 0) {
            let randomID = Math.floor(Math.random() * lockArr.length)
            return lockArr[randomID];
        }
    }

    /**
     * 提供解锁的歌曲列表
     */
    public affordUnLockSongInfoList(arr: Array<SongInfo>) {
        let self = this;
        function checkAdult(songInfo: SongInfo) {
            return self.getSongIdUnlockState(songInfo.musicId) == true;
        }
        let lockArr = arr.filter(checkAdult);
        if (lockArr.length > 0) {
            return lockArr;
        } else {
            return false;
        }
    }

    /**
     * 提供一个解锁的歌曲
     */
    public affordUnlockInfo(arr: Array<SongInfo>): SongInfo {
        let unlockArr = this.affordUnLockSongInfoList(arr);
        if (unlockArr && unlockArr.length > 0) {
            let randomID = Math.floor(Math.random() * unlockArr.length)
            return unlockArr[randomID];
        }
    }

    /**
     * 保存当前播放的游戏的歌曲信息
     */
    public saveCurPlaySongInfo(info: SongInfo) {
        this.curPlaySongInfo = info;

    }

    /**
     * 获得当前播放的歌曲信息
     */
    public getCurPlaySongInfo() {
        return this.curPlaySongInfo;
    }

    /**
     * 保存当前播放的游戏的歌曲信息
     */
    public saveCurGameSongInfo(info: SongInfo) {
        this.curGameSongInfo = info;

    }

    /**
     * 获得当前游戏的歌曲信息
     */
    public getCurGameSongInfo() {
        return this.curGameSongInfo;
    }

    /**
     * 设置歌曲是否播放
     * @param name 
     */
    setPlayState(name: string) {
        this.curPlayBgSongName = name;
    }

    /**
     * 设置歌曲是否播放
     * @param name 
     */
    setIsPause(name: string) {
        this.curPuaseBgSongName = name;
    }

    /**
     * 获取歌曲是否播放
     * @param name 
     */
    getIsPlayState(name: string) {
        return this.curPlayBgSongName == name;
    }

    /**
     * 获取歌曲是否暂停
     * @param name 
     */
    getIsPause(name: string) {
        return this.curPuaseBgSongName == name;
    }

    /**
     * 添加一首未通关的歌曲
     * @param songId 
     */
    public addFailSong(songId: string) {
        let passKeys = this.getPassSongKeys();
        if (passKeys && passKeys.indexOf(songId) != -1) return;
        let keys = this.getFailSongKeys();
        if (keys == null) {
            keys = new Array<string>();
        } else if (keys.indexOf(songId) != -1) {
            return;
        }
        keys.push(songId);
        sys.localStorage.setItem(LocalKeys.Key_failSongList, JSON.stringify(keys));
    }

    /**
     * 减少一首未通关的歌曲
     * @param songId 
     */
    private decreaseFailSong(songId: string) {
        let keys = this.getFailSongKeys();
        if (keys == null) {
            keys = new Array<string>();
        }
        let idx = keys.indexOf(songId);
        if (idx != -1) {
            keys.splice(idx, 1);
            sys.localStorage.setItem(LocalKeys.Key_failSongList, JSON.stringify(keys));
        }
    }

    /**
     * 添加一首通关的歌曲
     * @param songId 
     */
    public addPassSong(songId: string) {
        this.decreaseFailSong(songId);
        let keys = this.getPassSongKeys();
        if (keys == null) {
            keys = new Array<string>();
        } else if (keys.indexOf(songId) != -1) {
            return;
        }
        keys.push(songId);
        sys.localStorage.setItem(LocalKeys.Key_passSongList, JSON.stringify(keys));
    }

    /**
     * 添加一首收藏的歌曲
     * @param songId 
     */
    public addCollectSong(songId: string) {
        if (this.checkCollectSong(songId)) return;
        let keys = this.getCollectSongKeys();
        if (keys == null) {
            keys = new Array<string>();
        }
        let idx = keys.indexOf(songId);
        if (idx != -1) return;    //该歌曲已经收藏
        keys.push(songId);
        sys.localStorage.setItem(LocalKeys.Key_collectList, JSON.stringify(keys));
    }

    /**
     * 减少一首收藏的歌曲
     * @param songId 
     */
    public decreaseCollectSong(songId: string) {
        let keys = this.getCollectSongKeys();
        if (keys == null) {
            keys = new Array<string>();
        }
        let idx = keys.indexOf(songId);
        if (idx != -1) {
            keys.splice(idx, 1);
            sys.localStorage.setItem(LocalKeys.Key_collectList, JSON.stringify(keys));
        }
    }

    public checkCollectSong(songId: string) {
        let keys = this.getCollectSongKeys();
        if (keys == null) {
            keys = new Array<string>();
        }
        let idx = keys.indexOf(songId);
        return idx != -1;
    }

    getFailSongKeys() {
        if (sys.localStorage.getItem(LocalKeys.Key_failSongList)) {
            return JSON.parse(sys.localStorage.getItem(LocalKeys.Key_failSongList)) as Array<string>;
        } else {
            return null;
        }
    }

    getPassSongKeys() {
        if (sys.localStorage.getItem(LocalKeys.Key_passSongList)) {
            return JSON.parse(sys.localStorage.getItem(LocalKeys.Key_passSongList)) as Array<string>;
        } else {
            return null;
        }
    }

    getCollectSongKeys() {
        if (sys.localStorage.getItem(LocalKeys.Key_collectList)) {
            return JSON.parse(sys.localStorage.getItem(LocalKeys.Key_collectList)) as Array<string>;
        } else {
            return null;
        }
    }

    /**
    * 提供未通关的歌曲的歌单
    */
    public offerTypeFailTable() {
        let keys = this.getPassSongKeys();
        let unlock = this.affordUnLockSongInfoList(this.data)
        if (unlock == false) {
            this.sendNotification(CommandDefine.TableResponce, [], 'Fail');
            return;
        }
        if (keys) {
            let temp = new Array<SongInfo>();
            unlock.forEach((info: SongInfo) => {
                let key = keys.findIndex((key: string) => {
                    return info.musicId == key;
                })
                if (key == -1) {
                    temp.push(info);
                }
            });
            this.sendNotification(CommandDefine.TableResponce, temp, 'Fail');
        } else {
            this.sendNotification(CommandDefine.TableResponce, unlock, 'Fail');
        }
    }

    /**
    * 提供通关的歌曲的歌单
    */
    public offerTypePassTable() {
        let keys = this.getPassSongKeys();
        if (keys == null) {
            this.sendNotification(CommandDefine.TableResponce, [], 'Pass');
            return;
        }
        if (this.data) {
            let temp = new Array<SongInfo>();
            this.data.forEach((info: SongInfo) => {
                let key = keys.findIndex((key: string) => {
                    return info.musicId == key;
                })
                if (key != -1) {
                    temp.push(info);
                }
            });
            this.sendNotification(CommandDefine.TableResponce, temp, 'Pass');
        }
    }

    /**
    * 提供收藏的歌曲的歌单
    */
    public offerTypeCollectTable() {
        let keys = this.getCollectSongKeys();
        if (keys == null) {
            this.sendNotification(CommandDefine.TableResponce, [], 'Collect');
            return;
        }
        if (this.data) {
            let temp = new Array<SongInfo>();
            this.data.forEach((info: SongInfo) => {
                let key = keys.findIndex((key: string) => {
                    return info.musicId == key;
                })
                if (key != -1) {
                    temp.push(info);
                }
            });
            this.sendNotification(CommandDefine.TableResponce, temp, 'Collect');
        }
    }
}
