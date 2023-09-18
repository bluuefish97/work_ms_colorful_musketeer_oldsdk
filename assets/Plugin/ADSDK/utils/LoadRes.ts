import { assetManager, SpriteFrame, Texture2D } from "cc";

/**
 * 加载资源
 */
export default class LoadRes {

    /**
     * 加载资源数组
     */
    static loadResArray(resArray, callback) {
        let arr = [];
        let verNum = 0;
        if (window.CocosEngine) {
            arr = String(window.CocosEngine).split(".");
            verNum = Number(arr[0]) * 10000 + Number(arr[1]) * 100 + Number(arr[2]);
        }
        if (verNum < 30300) {
            // Cocos3.x加载图片资源方法
            let ImageArr = new Array();
            var arrNumber = 0;
            for (let index = 0; index < resArray.length; index++) {
                // if (resArray[index].indexOf(".jpg?") != -1) {
                //     resArray[index] = resArray[index].substring(0, resArray[index].indexOf(".jpg?") + 4);
                // }
                assetManager.loadRemote(resArray[index], { ext: '.png' }, (err, resList) => {
                    ImageArr[index] = resList._texture;
                    if (err != null || ImageArr[index] == null) {
                        console.log("XminigameSDK", "资源加载错误:" + JSON.stringify(err));
                        callback(true, null);
                        return;
                    }
                    arrNumber++;
                    if (arrNumber >= resArray.length) {
                        callback(false, ImageArr);
                    }
                })
            }
        } else {
            // Cocos3.3以上加载图片资源方法
            let ImageArr = new Array();
            var arrNumber = 0;
            for (let index = 0; index < resArray.length; index++) {
                // if (resArray[index].indexOf(".jpg?") != -1) {
                //     resArray[index] = resArray[index].substring(0, resArray[index].indexOf(".jpg?") + 4);
                // }
                assetManager.loadRemote(resArray[index], { ext: '.png' }, (err, resList) => {
                    const spriteFrame = new SpriteFrame();
                    const texture = new Texture2D();
                    texture.image = resList;
                    spriteFrame.texture = texture;
                    ImageArr[index] = spriteFrame.texture;
                    if (err != null || ImageArr[index] == null) {
                        console.log("XminigameSDK", "资源加载错误:" + JSON.stringify(err));
                        callback(true, null);
                        return;
                    }
                    arrNumber++;
                    if (arrNumber >= resArray.length) {
                        callback(false, ImageArr);
                    }
                })
            }
        }

    }

}