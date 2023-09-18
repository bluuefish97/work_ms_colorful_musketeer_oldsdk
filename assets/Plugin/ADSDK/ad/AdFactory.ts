import OppoAd from "./OppoAd";
import { AdInterface } from "./AdInterface";
import GetConfig from "../utils/GetConfig";
import VivoAd from "./VivoAd";
import BilibiliAd from "./BilibiliAd";
import HuaweiAd from "./HuaweiAd";
import KwaiAd from "./KwaiAd";
import TencentqqAd from "./TencentqqAd";
import TiktokAd from "./TiktokAd";
import WeixinAd from "./WeixinAd";
import XiaomiAd from "./XiaomiAd";
import AndroidAd from "./AndroidAd";
import IosAd from "./IosAd";
import TestAd from "./TestAd";
import M4399boxAd from "./M4399boxAd";
import BlankAd from "./BlankAd";
import AndroidAbroadAd from "./AndroidAbroadAd";
import AndroidXAAd from "./AndroidXAAd";
import WebViewAd from "./WebViewAd";

export default class AdFactory {
    public static produceAD(): AdInterface {
        switch (GetConfig.getChannelName()) {
            case "oppo":
                return new OppoAd();
            case "vivo":
                return new VivoAd();
            case "tiktok":
                return new TiktokAd();
            case "tencentqq":
                return new TencentqqAd();
            case "weixin":
                return new WeixinAd();
            case "kwai":
                return new KwaiAd();
            case "huawei":
                return new HuaweiAd();
            case "xiaomi":
                return new XiaomiAd();
            case "bilibili":
                return new BilibiliAd();
            case "m4399box":
                return new M4399boxAd();
            case "webView":
                return new WebViewAd();
            case "android":
                return new AndroidAd();
            case "androidAbroad":
                return new AndroidAbroadAd();
            case "androidXA":
                return new AndroidXAAd();
            case "ios":
                return new IosAd();
            case "test":
                return new TestAd();
            case "blank":
                return new BlankAd();
            default:
                return;
        }
    }
}