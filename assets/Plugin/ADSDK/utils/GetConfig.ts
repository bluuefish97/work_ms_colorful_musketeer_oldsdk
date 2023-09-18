import { sdkConfig, sdkVersionConfig } from "../SdkConfig";

export default class GetConfig {
    /**
     * 获取渠道名称
     */
    static getChannelName() {
        if (sdkConfig.channelId.length != 7) return "test";
        let suffix = sdkConfig.channelId.substring(4, 7);
        switch (suffix) {
            case "142":
                return "oppo";
            case "108":
                return "vivo";
            case "154":
                return "tiktok";
            case "155":
                return "tencentqq";
            case "161":
                return "weixin";
            case "162":
                return "kwai";
            case "163":
                return "huawei";
            case "164":
                return "xiaomi";
            case "165":
                return "bilibili";
            case "166":
                return "m4399box";
            case "654":
                return "webView";
            case "666":
                return "android";
            case "667":
                return "androidAbroad";
            case "668":
                return "androidXA";
            case "888":
                return "ios";
            case "000":
                return "blank";
            default:
                return "test";
        }
    }

    /**
     * 获取渠道ID
     */
    static getChannelId() {
        return sdkConfig.channelId;
    }

    /**
     * 获取SDK版本
     */
    static getSdkVersion() {
        return sdkVersionConfig.sdkVersion;
    }

    /**
     * 获取appId
     */
    static getAppId() {
        return sdkConfig.appId;
    }

}