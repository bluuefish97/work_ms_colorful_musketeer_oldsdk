/**
 * 获取引擎相关
 */
export default class GetEngine {

    /**
     * 获取引擎名
     * @returns Cocos,Laya
     */
    static getEngineName() {
        // @ts-ignore
        if (window.CocosEngine) {
            return "Cocos";
        } else {
            return "Laya";
        }
    }

    /**
     * 获取Cocos引擎版本 
     * 2.3.3会返回233 
     * 3.0.0会返回300
     */
    static getCocosEngineVersion() {
        // @ts-ignore
        if (window.CocosEngine) {
            // @ts-ignore
            let arr = window.CocosEngine.split('.');
            let num = Number(arr[0]) * 100 + Number(arr[1]) * 10 + Number(arr[2]) * 1;
            return num;
        } else {
            console.log("XminigameSDK", "非Cocos引擎");
            return 0;
        }
    }

}