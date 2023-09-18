import GetEngine from "./GetEngine";

export default class LocalStorage {
    private static instance: LocalStorage;
    /**
     * LocalStorage 单例
     */
    public static getInstance(): LocalStorage {
        if (!LocalStorage.instance) {
            LocalStorage.instance = new LocalStorage();
        }
        return LocalStorage.instance;
    }

    /**
     * 保存字符串数据
     */
    static setData(key, value) {
        if (key == "" || value == "") return;
        if (GetEngine.getEngineName() == "Cocos") {
            // @ts-ignore
            cc.sys.localStorage.setItem(key, value);
        } else {
            // @ts-ignore
            Laya.localStorage.setItem(key, value);
        }
    }
    /**
     * 获取字符串数据
     */
    static getData(key) {
        let value;
        if (GetEngine.getEngineName() == "Cocos") {
            // @ts-ignore
            value = cc.sys.localStorage.getItem(key);
        } else {
            // @ts-ignore
            value = Laya.localStorage.getItem(key);
        }
        if (value == "" || value == undefined || value == null) value = "";
        return value;
    }


    /**
     * 保存对象数据
     */
    static setJsonData(key, value) {
        if (key == "" || value == "") return;
        if (GetEngine.getEngineName() == "Cocos") {
            // @ts-ignore
            cc.sys.localStorage.setItem(key, JSON.stringify(value));
        } else {
            // @ts-ignore
            Laya.localStorage.setItem(key, JSON.stringify(value));
        }
    }
    /**
     * 获取对象数据
     */
    static getJsonData(key) {
        let value;
        if (GetEngine.getEngineName() == "Cocos") {
            // @ts-ignore
            value = cc.sys.localStorage.getItem(key);
        } else {
            // @ts-ignore
            value = Laya.localStorage.getItem(key);
        }
        if (value == "" || value == undefined || value == null || value == {}) return null;
        return JSON.parse(value);
    }


}
