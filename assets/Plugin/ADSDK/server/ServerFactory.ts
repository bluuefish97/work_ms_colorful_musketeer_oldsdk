import AndroidSDK from "../sdk/android/AndroidSDK";
import androidAbroadSDK from "../sdk/androidAbroad/androidAbroadSDK";
import androidXASDK from "../sdk/androidXA/androidXASDK";
import BilibiliSDK from "../sdk/bilibili/BilibiliSDK";
import BlankSDK from "../sdk/blank/BlankSDK";
import HuaweiSDK from "../sdk/huawei/HuaweiSDK";
import IosSDK from "../sdk/ios/IosSDK";
import KwaiSDK from "../sdk/kwai/KwaiSDK";
import M4399boxSDK from "../sdk/m4399box/M4399boxSDK";
import OppoSDK from "../sdk/oppo/OppoSDK";
import TencentqqSDK from "../sdk/tencentqq/TencentqqSDK";
import TestSDK from "../sdk/test/TestSDK";
import TiktokSDK from "../sdk/tiktok/TiktokSDK";
import VivoSDK from "../sdk/vivo/VivoSDK";
import WeixinSDK from "../sdk/weixin/WeixinSDK";
import XiaomiSDK from "../sdk/xiaomi/XiaomiSDK";
import GetConfig from "../utils/GetConfig";
import ServerInterface from "./ServerInterface";
import WebViewSDK from "../sdk/webView/WebViewSDK";

export default class ServerFactory {
    public static produceServer(): ServerInterface {
        switch (GetConfig.getChannelName()) {
            case "oppo":
                return new OppoSDK();
            case "vivo":
                return new VivoSDK();
            case "tiktok":
                return new TiktokSDK();
            case "tencentqq":
                return new TencentqqSDK();
            case "weixin":
                return new WeixinSDK();
            case "kwai":
                return new KwaiSDK();
            case "huawei":
                return new HuaweiSDK();
            case "xiaomi":
                return new XiaomiSDK();
            case "bilibili":
                return new BilibiliSDK();
            case "m4399box":
                return new M4399boxSDK();
            case "webView":
                return new WebViewSDK();
            case "android":
                return new AndroidSDK();
            case "androidAbroad":
                return new androidAbroadSDK();
            case "androidXA":
                return new androidXASDK();
            case "ios":
                return new IosSDK();
            case "blank":
                return new BlankSDK();
            case "test":
                return new TestSDK();
            default:
                return;
        }
    }
}