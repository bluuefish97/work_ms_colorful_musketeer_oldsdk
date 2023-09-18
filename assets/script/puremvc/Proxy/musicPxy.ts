
import { Proxy } from "../../../Plugin/core/puremvc/patterns/proxy/Proxy";
import GloalDefine, { SongInfo, LocalKeys, PlaySongInfo, SongPlayType } from "../../GloalDefine";
import { log, sys } from "cc";
import MusicManager from "../../../Plugin/musicLoader/MusicManager";
import { CommandDefine } from "../commandDefine";
import { Facade } from "../../../Plugin/core/puremvc/patterns/facade/Facade";
import { ProxyDefine } from "../proxyDefine";
import { GameMusicPxy } from "./gameMusicPxy";
import { ApplicationManager } from "../../applicationManager";

export class MusicPxy extends Proxy {

    public TempSongInfo: SongInfo;
    private isGetTable: boolean = false;

    public constructor(proxyName: string = null, data: any = null) {
        super(proxyName, data);
        this.getTable();
    }

    /**
        * 加载歌单
        */
    private getTable() {
        console.log("MusicPxy 开始请求歌单配置...")
        let url=GloalDefine.MusicTableUrl
        console.log("ApplicationManager.getInstance().getAreaShieldingSwitch()...",ApplicationManager.getInstance().getAreaShieldingSwitch())
        if(ApplicationManager.getInstance().getAreaShieldingSwitch()){
            url =GloalDefine.MusicTableCNUrl;
        }else{
            url =GloalDefine.MusicTableUrl;
        }

        MusicManager.GetInstance(MusicManager).Loader.LoadMusicTable(url, (res: any) => {
            this.data = this.filterBag(res);
            log(  this.data);
            this.filterDefaultUnlockSong(res);
            log("歌单配置下载成功")
            if (this.isGetTable) {
                this.sendNotification(CommandDefine.TableResponce, this.data);
            }
        });

    }

    /**
     * 提供全部歌单
     */
    public offerTotalTable() {
        if (this.data) {
            this.sendNotification(CommandDefine.TableResponce, this.data, 'All');
        }
        else {
            this.isGetTable = true;
        }
    }

    /**
     * 提供歌曲类别为0的歌单
     */
    public offerType0Table() {
        if (this.data) {
            let temp = this.data.slice(3, 6);
            //  console.log(temp);
            this.sendNotification(CommandDefine.TableResponce, temp, 'Hot');
        }
    }

    /**
 * 提供歌曲类别为1的歌单
 */
    public offerType1Table() {
        if (this.data) {
            let temp = this.data.slice(15, 20);
            //  console.log(temp);
            this.sendNotification(CommandDefine.TableResponce, temp, 'more');
        }
    }

    /**
 * 提供歌曲类别为2的歌单
 */
    public offerType2Table() {
        if (this.data) {
            let temp = this.data.slice(15, 18);
            this.sendNotification(CommandDefine.TableResponce, temp, 'Recommend');
        }
    }

    /**
    * 提供歌曲类别为3的歌单
    */
    public offerType3Table() {
        if (this.data) {;
            this.sendNotification(CommandDefine.TableResponce, this.data, 'Type_All');
        }
    }

    /**
    * 提供歌曲类别为新歌的歌单
    */
    public offerTypeNewTable() {
        if (this.data) {
            let temp = this.data.slice(0, 3);
            //console.log(temp);
            this.sendNotification(CommandDefine.TableResponce, {
                // type:SubSongTableType.NEW,
                // table: temp
            });
        }
    }

    /**
     * 检测歌单是否存在
     */

    public checkTable() {
        if (this.data) {
            //   this.sendNotification(CommandDefine.tableResponce, this.data);
            return true;
        }
        else {
            this.getTable();
            return false;
        }
    }

    /**
     * 过滤曲包
     */
    private filterBag(arr: Array<SongInfo>) {
        let self = this;
        function checkAdult(songInfo: SongInfo) {
            return songInfo.ex_bag == null;
        }
        let normalArr = arr.filter(checkAdult);
        if (normalArr.length > 0) {
            return normalArr;
        }
    }

    /**
     * 过滤默认解锁的歌曲   setDefaultUnlockSong
     */
    private filterDefaultUnlockSong(arr: Array<SongInfo>) {
        let game_MusicPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_MusicPxy) as GameMusicPxy;
        function checkAdult(songInfo: SongInfo) {
            return songInfo.unlockCost == "0" && songInfo.unlockType == "coin";
        }
        let unlockArr = arr.filter(checkAdult);
        for (let i = 0; i < unlockArr.length; i++) {
            game_MusicPxy.setDefaultUnlockSong(unlockArr[i].musicId);
        }
    }

    public postSongInfoById(idx: number) {

        let self = this;
        let getSongInfobyId = function (data: any) {
            let info = data[idx];
            // console.log(info);
            // self.sendNotification(CommandDefine.SongUnitInfoResponce,info);
        }
        if (!this.data) {
            console.warn("歌单列表未下载完成");
            //  this.PostAsync(getSongInfobyId);
        }
        else {
            getSongInfobyId(this.data);
        }
    }

    /**
     * 获得歌曲的信息
     */
    public getSongInfo(name: string) {
        let checkAdult = function (info: SongInfo) {
            return info.musicName == name;
        }
        let info = this.data.find(checkAdult);
        return info;
    }

    /**
     * 获得歌曲在列表内的id
     */
    public getSongListId(name: string) {
        if (!this.data) return 0;
        let checkAdult = function (info: SongInfo) {
            return info.musicName == name;
        }
        let info = this.data.find(checkAdult);
        let id = this.data.indexOf(info);
        return id;
    }

    /**
     * 获得一首歌曲在列表内的下一首歌
     */
    public getSongListNext(name: string) {
        let curId = this.getSongListId(name);
        let nextId = curId >= this.data.length - 1 ? curId : curId + 1;
        let info = this.data[nextId];
        return info;
    }

    /**
     * 获得歌曲的信息
     */
    public getSongInfoById(id: string) {
        let checkAdult = function (info: SongInfo) {
            return info.musicId == id;
        }
        return this.data.find(checkAdult);
    }

    /**
     * 通过歌曲名获得歌曲的信息
     */
    public getSongInfoByName(name: string) {
        let checkAdult = function (info: SongInfo) {
            return info.musicName == name;
        }
        return this.data.find(checkAdult);
    }

    /**
   * 设置上一次游戏最后播放的歌曲
   */
    public setLastPlaySongName(musicName: string) {
        sys.localStorage.setItem(LocalKeys.Key_lastPlaySongName, JSON.stringify(musicName));
    }

    /**
        * 获得上一次游戏最后播放的歌曲
        */
    public getLastPlaySongName() {
        if (sys.localStorage.getItem(LocalKeys.Key_lastPlaySongName)) {
            return JSON.parse(sys.localStorage.getItem(LocalKeys.Key_lastPlaySongName));
        } else {
            return null;
        }
    }

    /**
        * 新增一个广告的歌曲信息
        */
    addADInfo(_style: string) {
        let info = new SongInfo();
        info.style = _style;
        return info;
    }

}
