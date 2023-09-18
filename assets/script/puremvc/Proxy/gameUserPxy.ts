import { Proxy } from "../../../Plugin/core/puremvc/patterns/proxy/Proxy";
import { LocalKeys } from "../../GloalDefine";
import { sys } from "cc";
import DateTool, { CustomDate } from "../../../Plugin/tools/DateTool";

export class GameUserPxy extends Proxy {

    public constructor(proxyName: string = null, data: any = null) {
        super(proxyName, data);
    }

    /**
    * 获得一个玩家是不是新玩家
    */
    public checkUserNew() {
        if (sys.localStorage.getItem(LocalKeys.Key_new)) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 设置一个新玩家的数据
     */
    public setGameNew() {
        sys.localStorage.setItem(LocalKeys.Key_new, JSON.stringify("已存在用户"));
    }
    /**
     * 设置隐私协议
     */
    public setUserInfo() {
        sys.localStorage.setItem("xcqs_隐私协议", JSON.stringify("已存在用户"));
    }
    /**
     * 
     * 获取隐私协议
     */
    public getUserInfo() {
        if(sys.localStorage.getItem("xcqs_隐私协议")) {
            return true;
        } else {
            return false;
        }
    }



    /**
    * 设置游戏音乐音量
    */
    public setMusicVolume(val: number) {
        let key = LocalKeys.Key_musicVolume;
        sys.localStorage.setItem(key, JSON.stringify(val));
    }

    /**
     * 获得游戏的音乐音量
     */
    public getMusicVolume() {
        let key = LocalKeys.Key_musicVolume;
        if (sys.localStorage.getItem(key)) {
            return JSON.parse(sys.localStorage.getItem(key)) as number;
        }
        else {
            return 0.5;
        }
    }

    /**
    * 设置游戏音效音量
    */
    public setEffectVolume(val: number) {
        let key = LocalKeys.Key_effectVolume;
        sys.localStorage.setItem(key, JSON.stringify(val));
    }

    /**
     * 获得游戏的音效音量
     */
    public getEffectVolume() {
        let key = LocalKeys.Key_effectVolume;
        if (sys.localStorage.getItem(key)) {
            return JSON.parse(sys.localStorage.getItem(key)) as number;
        }
        else {
            return 0.5;
        }
    }

    /**
    * 设置游戏震动
    */
    public setMusicVibrate(val: boolean) {
        let key = LocalKeys.Key_musicVibrate;
        sys.localStorage.setItem(key, JSON.stringify(val));
    }

    /**
     * 获得游戏震动
     */
    public getMusicVibrate() {
        let key = LocalKeys.Key_musicVibrate;
        if (sys.localStorage.getItem(key)) {
            return JSON.parse(sys.localStorage.getItem(key)) as boolean;
        }
        else {
            return true;
        }
    }

    public getUseSkinName() {
        let key = LocalKeys.Key_UseSkin;
        if (sys.localStorage.getItem(key)) {
            return JSON.parse(sys.localStorage.getItem(key)) as string;
        }
        else {
            return 'nor';
        }
    }

    public setUseSkinName(name: string) {
        sys.localStorage.setItem(LocalKeys.Key_UseSkin, JSON.stringify(name));
    }
    
    public getUseThemId() {
        let key = LocalKeys.Key_UseThem;
        if (sys.localStorage.getItem(key)) {
            return JSON.parse(sys.localStorage.getItem(key)) as number;
        }
        else {
            return 0;
        }
    }

    public setUseThemId(id: number) {
        sys.localStorage.setItem(LocalKeys.Key_UseThem, JSON.stringify(id));
    }

    public getLockSkins() {
        let key = LocalKeys.KeY_LockSkin;
        if (sys.localStorage.getItem(key)) {
            return JSON.parse(sys.localStorage.getItem(key)) as string[];
        }
        else {
            return ['nor'];
        }
    }

    public setLockSkin(name: string) {
        let skins = this.getLockSkins();
        skins.push(name);
        sys.localStorage.setItem(LocalKeys.KeY_LockSkin, JSON.stringify(skins));
    }

    
    public getLockThems() {
        let key = LocalKeys.Key_LockThem;
        if (sys.localStorage.getItem(key)) {
            return JSON.parse(sys.localStorage.getItem(key)) as number[];
        }
        else {
            return [0];
        }
    }

    public setLockThem(id: number) {
        let skins = this.getLockThems();
        skins.push(id);
        sys.localStorage.setItem(LocalKeys.Key_LockThem, JSON.stringify(skins));
    }
}