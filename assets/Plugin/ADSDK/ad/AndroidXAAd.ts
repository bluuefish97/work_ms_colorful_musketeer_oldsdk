import GetConfig from "../utils/GetConfig";
import LocalStorage from "../utils/LocalStorage";
import { AdInterface } from "./AdInterface";

let videoCallback = null;
let intersCallback = null;
let reqRemoteConfigCallback = null;
let payCallback = null;
let reqSubInfoCallback = null;
let reqProductInfoCallback = null;


export default class AndroidXAAd implements AdInterface {
    /**
     * 变量区域*******************************************
     */
    /**
     * 广告开关区域*********************************
     */
    /**
     * 系统banner广告开关
     */
    SW_SystemBanner = false;
    /**
     * 系统插屏广告开关
     */
    SW_SystemInters = false;
    /**
     * 视频广告开关
     */
    SW_Video = false;
    /**
     * 原生广告开关
     */
    SW_Native = false;
    /**
     * 原生banner广告开关
     */
    SW_NativeBanner = false;
    /**
     * 原生插屏广告开关
     */
    SW_NativeInters = false;
    /**
     * 盒子广告开关
     */
    SW_Box = false;
    /**
     * 原生模板广告开关
     */
    SW_NativeTemplate = false;


    /**
     * 广告ID区域*************************************
     */
    /**
     * 系统banner广告ID
     */
    ID_SystemBanner = "";
    /**
     * 系统插屏广告ID
     */
    ID_SystemInters = "";
    /**
     * 原生广告ID
     */
    ID_Native = "";
    /**
     * 原生大图广告ID
     */
    ID_NativeImage = "";
    /**
     * 视频广告ID
     */
    ID_Video = "";
    /**
     * 盒子广告ID
     */
    ID_Box = "";
    /**
     * 积木广告ID
     */
    ID_Block = "";
    /**
     * 原生模板广告ID
     */
    ID_NativeTemplate = "";


    /**
     * 插屏四合一区域**********************************
     */
    /**
     * 原生插屏出现概率
     */
    NUM_NativeIntersP = 0;
    /**
     * 系统插屏出现概率
     */
    NUM_SystemIntersP = 100;
    /**
     * 互推插屏出现概率
     */
    NUM_NavigateIntersP = 0;
    /**
     * 原生模板插屏出现概率
     */
    NUM_NativeTemplateP = 0;




    /**
     * 广告基础控制区域******************************
     */
    /**
     * banner控制区域***************************
     */
    /**
     * banner刷新时间
     */
    NUM_BannerUpdateTime = 30;
    /**
     * 系统banner优先？
     */
    SW_SystemBannerFirst = true;
    /**
     * banner最多展示次数
     */
    NUM_BannerMostShow = 99;
    /**
     * banner关闭展示间隔时间
     */
    NUM_BannerCloseShowIntervalTime = 0;

    /**
     * 插屏控制区域*****************************
     */
    /**
     * 插屏基础控制
     */
    SW_IntersBaseControl = false;
    /**
     * 插屏第几次开始展示
     */
    NUM_IntersStart = 0;
    /**
     * 插屏展示间隔次数
     */
    NUM_IntersIntervalNum = 0;
    /**
     * 插屏间隔最小时间
     */
    NUM_IntersIntervalTime = 0;
    /**
     * 插屏延迟时间(ms)
     */
    NUM_IntersDelayTime = 0;
    /**
     * 插屏延迟概率
     */
    NUM_IntersDelayP = 0;

    /**
     * 插屏视频控制区域**************************
     */
    /**
     * 插屏视频延迟时间(ms)
     */
    NUM_IntersVideoDelayTime = 0;
    /**
     * 插屏视频延迟展示概率0-100(%)
     */
    NUM_IntersVideoDelayP = 0;

    /**
     * 原生控制区域******************************
     */
    /**
     * 原生广告刷新时间
     */
    NUM_NativeUpdateTime = 30;


    /**
     * 桌面开关区域************************************
     */
    /**
     * 添加桌面图标开关
     */
    SW_AddDesktop = false;
    /**
     * 插屏间隔弹桌面图标开关
     */
    SW_IntersIntervalToAddDesktop = false;
    /**
     * 自动弹添加桌面次数
     */
    NUM_AutoAddDeskMostTimes = 0;
    /**
     * 第几次插屏变添加桌面
     */
    NUM_IntersToAddDesktopNumber = 0;



    /**
     * 互推区域
     */
    /**
     * 互推统计开关(默认开启)
     */
    SW_Statistics = true;
    /**
     * 互推icon开关
     */
    SW_NavigateIcon = false;
    /**
     * 互推列表开关
     */
    SW_NavigateGroup = false;
    /**
     * 结算互推开关
     */
    SW_NavigateSettle = false;
    /**
     * 互推游戏
     */
    pushGameList = [];




    /**
     * 创建广告
     */
    createAd() {
    }

    /**
     * 加载互推
     */
    startLoadPushGamaes() {
    }


    getChannelId() {
        return GetConfig.getChannelId();
    }

    showBanner() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "showBanner", "()V");
    }

    hideBanner() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "hideBanner", "()V");
    }

    getIntersFlag() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "getIntersFlag", "()Z");
    }

    showInters(callback?, sceneName?) {
        intersCallback = callback;
        if (!sceneName) {
            sceneName = "";
        }
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "showIntersSceneName", "(Ljava/lang/String;)V", sceneName);
    }

    getVideoFlag() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "getVideoFlag", "()Z");
    }

    showVideo(callback, sceneName?) {
        videoCallback = callback;
        if (!sceneName) {
            sceneName = "";
        }
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "showVideoSceneName", "(Ljava/lang/String;)V", sceneName);
    }

    getNativeIconFlag() {
        return false;
    }
    showNativeIcon(width, height, x, y) {
    }
    hideNativeIcon() {
    }

    getNativeImageFlag() {
        return false;
    }
    showNativeImage(width, height, x, y) {
    }
    hideNativeImage() {
    }

    getNativePasterFlag() {
        return false;
    }
    showNativePaster() {
    }

    getNativeAdInfo(type) {
        return null;
    }
    reportNativeAdShow(adId) {
    }
    reportNativeAdClick(adId) {
    }

    getNavigateIconFlag() {
        return false;
    }
    showNavigateIcon(width, height, x, y) {
    }
    hideNavigateIcon() {
    }

    getNavigateGroupFlag() {
        return false;
    }
    showNavigateGroup(type, side, size, y) {
    }
    hideNavigateGroup() {
    }

    getNavigateSettleFlag() {
        return false;
    }
    showNavigateSettle(type, x, y) {
    }
    hideNavigateSettle() {
    }

    getNavigatePasterFlag() {
        return false;
    }
    showNavigatePaster() {
    }
    hideNavigatePaster() {
    }
    reportNavigatePasterClick() {
    }

    getNavigateInters() {
        return false;
    }
    showNavigateInters() {
    }

    shareApp() {
    }

    getNavigateBoxBannerFlag() {
        return false;
    }
    showNavigateBoxBanner() {
    }
    hideNavigateBoxBanner() {
    }

    getNavigateBoxPortalFlag() {
        return false;
    }
    showNavigateBoxPortal(imageUrl?, marginTop?) {
    }
    hideNavigateBoxPortal() {
    }

    setGroup(group) {
    }

    hasAddDesktopFunc() {
        return false;
    }

    getAddDesktopFlag(callback) {
        callback(false);
    }

    addDesktop(callback) {
        callback(false);
    }

    phoneVibrate(type) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "phoneVibrate", "(Ljava/lang/String;)V", `${type}`);
    }

    startGameVideo(duration) {
    }
    pauseGameVideo() {
    }
    resumeGameVideo() {
    }
    stopGameVideo(callback) {
        callback(null);
    }
    shareVideo(title, desc, topics, videoPath, callback) {
        callback(false);
    }
    shareAppById(templateId) {
    }

    jumpToMoreGamesCenter() {
    }

    showMoreGamesBanner() {
    }
    hideMoreGamesBanner() {
    }

    showFavoriteGuide(type, content, position) {
    }

    getUserData(callback) {
        console.log("XminigameSDK", "getUserData=====================");
        let userData = {
            userId: LocalStorage.getData("userId"),
            token: LocalStorage.getData("token"),
            userType: LocalStorage.getData("userType"),
        }
        callback(userData);
    }

    getUserInfo(callback) {
        console.log("XminigameSDK", "getUserInfo=====================");
        let userInfo = {
            head: "",
            name: "",
            sex: "",
            city: "",
            province: "",
            country: "",
            power: false
        }
        callback(userInfo);
    }

    getBoxFlag() {
        return false;
    }
    showAppBox() {
    }

    getBlockFlag() {
        return false;
    }
    showBlock(type, x, y, blockSize) {
    }
    hideBlock() {
    }

    exitTheGame() {
    }

    reportAnalytics(params, data) {
        // @ts-ignore
        jsb.reflection.callStaticMethod(
            "com/xgame/sdk/cocos/helper/HelperInterface", "reportEvent", "(Ljava/lang/String;Ljava/lang/String;)V",
            params, JSON.stringify(data));
    }

    showAuthentication(callback) {
        callback(false);
    }

    visitorExperience(callback) {
        callback(false);
    }

    showNativeAd(width, height, viewX, viewY) {
    }

    getOPPOShowMoreGameFlag() {
        return false;
    }
    showOPPOMoreGame() {
    }

    openProtocol() {
    }

    hasNetwork(callback) {
        callback(false);
    }

    showReviewAlert() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "showReviewAlert", "()V");
    }

    showiOSADWithScene(key, type) {
    }

    showiOSADWithType(key, type) {
    }

    videoUIShow(key) {
    }

    showPrivacyAgreement(companyLogUrl, htmlUrl, callback) {
        callback(true);
    }


    buyProps(money, propId, propName, callback) {
        payCallback = callback;
        let s = JSON.stringify({
            productId: propId,
            productName: propName,
        })
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "pay", "(Ljava/lang/String;)V", s);
    }

    payComplete(orderId) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "completePay", "(Ljava/lang/String;)V", `${orderId}`);
    }

    getLanguage() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "getLanguage", "()Ljava/lang/String;");
    }
    showScore() {
    }
    getNetworkstatus() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "isNetworkConnected", "()Z");
    }
    openSettings() {
    }
    showADWithType(key, type) {
    }
    showTAEventData(data) {
    }
    showTAWithType(type, data) {
    }
    addUser(data) {
    }
    setUser(data) {
        // @ts-ignore
        jsb.reflection.callStaticMethod(
            "com/xgame/sdk/cocos/helper/HelperInterface", "setUserProperty", "(Ljava/lang/String;)V", JSON.stringify(data));
    }
    checkItemList(type, callback) {
    }
    getSubsRemainTime(id, callback) {
    }
    purchaseItem(id, type, callback) {
    }
    queryPurchases(type, callback) {
    }
    waitVideoLoad(waitTime, callback) {
    }
    reportVideoBtn(scene) {
    }
    reportVideoClick(scene) {
    }


    reqRemoteConfig(callback) {
        reqRemoteConfigCallback = callback;
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "reqRemoteConfig", "()V");
    }

    getRemoteConfig(key) {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "getRemoteConfig", "(Ljava/lang/String;)Ljava/lang/String;", `${key}`);
    }

    getAllRemoteConfig() {
        // @ts-ignore
        let res = jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "getAllRemoteConfig", "()Ljava/lang/String;");
        if (!res) {
            return null;
        }
        return JSON.parse(res);
    }

    reqPaySubInfo(callback) {
        reqSubInfoCallback = callback;
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "reqPaySubInfo", "()V");
    }

    getAllPaySubInfo() {
        // @ts-ignore
        let json = jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "getAllPaySubInfo", "()Ljava/lang/String;");
        return JSON.parse(json);
    }

    getNetworkType() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "getNetworkType", "()Ljava/lang/String;");
    }

    reqProductInfo(callback) {
        reqProductInfoCallback = callback;
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "reqProductInfo", "()V");
    }

    getProductInfo() {
        // @ts-ignore
        let res = jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "getProductInfo", "()Ljava/lang/String;");
        if (!res) {
            return null;
        }
        return JSON.parse(res);
    }

    setBannerState(state) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "setBannerState", "(I)V", `${state}`);
    }

    setIntersState(state) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "setIntersState", "(I)V", `${state}`);
    }

    getDIYFlag() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "getDIYFlag", "()Z");
    }

    showDIY(diy) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "showDIY", "(Ljava/lang/String;)V", `${diy}`);
    }

    hideDIY() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "hideDIY", "()V");
    }

    startAppStore(packageName) {
        let str = "";
        if (packageName) str = packageName;
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "startAppStore", "(Ljava/lang/String;)V", str);
    }

    customEvent(num, name, params) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "reportEvent", "(ILjava/lang/String;Ljava/lang/String;)V", num, name, JSON.stringify(params));
    }

    setPayRemoveAd(removeAd) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "setPayRemoveAd", "(Z)V", removeAd);
    }

    getNewWorkCountryIso() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "getNewWorkCountryIso", "()Ljava/lang/String;");
    }

    getDeviceInfo() {
        // @ts-ignore
        let info = jsb.reflection.callStaticMethod("com/xgame/sdk/cocos/helper/HelperInterface", "getDeviceInfo", "()Ljava/lang/String;");
        return JSON.parse(info);
    }

    /**
     * 内部方法
     */

}


{
    //插屏回调
    (<any>window).XAAndroidIntersCallback = function () {
        console.log("XASDK", "XAAndroidIntersCallback", intersCallback != undefined);
        intersCallback && intersCallback();
    };

    //视频回调
    (<any>window).XAAndroidRewardVideoCallback = function (result: boolean) {
        console.log("XASDK", "video play complete?", result);
        videoCallback && videoCallback(result);
    };

    //云控配置参数回调
    (<any>window).XAAndroidReqRemoteConfigCallback = function () {
        console.log("XASDK", "reqRemoteConfig success");
        reqRemoteConfigCallback && reqRemoteConfigCallback();
    };

    // 支付回调
    (<any>window).XAAndroidPayCallback = function (productId: String, result: boolean) {
        console.log("XASDK", "pay callback:", productId, result);
        payCallback && payCallback(productId, result);
    };

    // 获取订阅信息回调
    (<any>window).XAAndroidReqSubCallback = function (result: boolean) {
        console.log("XASDK", "req subInfo callback:", result);
        reqSubInfoCallback && reqSubInfoCallback(result);
    };

    //请求商品信息回调
    (<any>window).XAAndroidReqProductInfoCallback = function (result: boolean) {
        console.log("XASDK", "ReqProductInfo complete?", result);
        reqProductInfoCallback && reqProductInfoCallback(result);
    };
};