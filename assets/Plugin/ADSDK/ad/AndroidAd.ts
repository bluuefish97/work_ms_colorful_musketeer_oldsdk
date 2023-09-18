// import { view } from "cc";
import { AdInterface } from "./AdInterface";

let videoCallback = null;
let videoIntersCallBack = null;
let payCallback = null;
let reqRemoteConfigCallback = null;
let reqSubInfoCallback = null;
let loginCallback = null;
let loginData = null;
let onResultListener = null;


export default class AndroidAd implements AdInterface {
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
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "reqeustChannelValue", "()Ljava/lang/String;");
    }

    showBanner() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showBanner","calling_method_params":0}`);
    }

    hideBanner() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"hideBanner",'calling_method_params':0}`);
    }

    getIntersFlag() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "SendMessageGetAdFlag", "(Ljava/lang/String;)Z", "getIntersFlag");
    }

    showInters(callback?) {
        if (callback) videoIntersCallBack = callback;
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{'calling_method_name':'showInters','calling_method_params':0}`);
    }
    getVideoFlag() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "SendMessageGetAdFlag", "(Ljava/lang/String;)Z", "getVideoFlag");
    }

    showVideo(callback, reason?) {
        videoCallback = callback;
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showVideo","calling_method_params":0}`);
    }

    getNativeIconFlag() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "getNativeIconFlag", "()Z");
    }
    showNativeIcon(width, height, x, y) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "showNativeIcon", "(FF)V", x, y);
    }
    hideNativeIcon() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "hideNativeIcon", "()V");
    }

    getNativeImageFlag() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "getBigNativeFlag", "()Z");
    }
    showNativeImage(width, height, x, y) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "showSettlePasterBanner", "()V");
    }
    hideNativeImage() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "hideSettlePasterBanner", "()V");
    }

    getNativePasterFlag() {
        return false;
    }
    showNativePaster() {
    }

    getNativeAdInfo(type) {
    }
    reportNativeAdShow(adId) {
    }
    reportNativeAdClick(adId) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "onClickNativaAd", "()V");
    }

    getNavigateIconFlag() {
        // return true;
        return false;
    }
    showNavigateIcon(width, height, x, y) {
        // let winSize = view.getVisibleSize();
        // let size = width / winSize.width;
        // let posX = (x - width / 2) / winSize.width;
        // let posY = (winSize.height - (y + width / 2)) / winSize.height;
        // // @ts-ignore
        // jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showNavigateIcon","calling_method_params":{"icon_size":${size},"icon_x":${posX},"icon_y":${posY}}}`);
    }
    hideNavigateIcon() {
        // // @ts-ignore
        // jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"hideNavigateIcon",'calling_method_params':0}`);
    }

    getNavigateGroupFlag() {
        // return true;
        return false;
    }
    showNavigateGroup(type, side, size, y) {
        // // @ts-ignore
        // jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showNavigateGroup","calling_method_params":{"type":${type},"slide":${side}}}`);
    }
    hideNavigateGroup() {
        // // @ts-ignore
        // jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"hideNavigateGroup",'calling_method_params':0}`);
    }

    getNavigateSettleFlag() {
        // return true;
        return false;
    }
    showNavigateSettle(type, x, y) {
        // let winSize = view.getVisibleSize();
        // let posX = x / winSize.width;
        // let posY = (winSize.height - y) / winSize.height;
        // // @ts-ignore
        // jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showNavigateSettle","calling_method_params":{"type":${type},"viewX":${posX},"viewY":${posY}}}`);
    }
    hideNavigateSettle() {
        // // @ts-ignore
        // jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"hideNavigateSettle",'calling_method_params':0}`);
    }

    getNavigatePasterFlag() {
        // // @ts-ignore
        // return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "getNavigatePasterFlag", "()Z");
        return false;
    }
    showNavigatePaster() {
        // // @ts-ignore
        // jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "showNavigatePaster", "()V");
    }
    hideNavigatePaster() {
        // // @ts-ignore
        // jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "hideNavigatePaster", "()V");
    }
    reportNavigatePasterClick() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "reportNavigatePasterClick", "()V");
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
    }

    phoneVibrate(type) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"shakePhone","calling_method_params":${type}}`);
    }

    startGameVideo(duration) {
    }
    pauseGameVideo() {
    }
    resumeGameVideo() {
    }
    stopGameVideo(callback) {
    }
    shareVideo(title, desc, topics, videoPath, callback) {
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
    }

    getUserInfo(callback) {
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
        // @ts-ignore
        // jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{'calling_method_name':'exit'}`);
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "exitTheGame", "()V");
    }

    reportAnalytics(params, data) {
        let reportData = JSON.stringify({ calling_method_name: "reportAnalytics", calling_method_params: { "eventName": params, "data": data } });
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", reportData);
    }

    showAuthentication(callback) {
        // // @ts-ignore
        // jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showAuthentication","calling_method_params":0}`);
    }

    visitorExperience(callback) {
        // // @ts-ignore
        // jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"TouristModel","calling_method_params":0}`);
    }

    showNativeAd(width, height, viewX, viewY) {
        // // @ts-ignore
        // jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showNativeAd","calling_method_params":{"width":${width},"height":${height},"viewX":${viewX},"viewY":${viewY}}}`);
    }

    getOPPOShowMoreGameFlag() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "SendMessageGetAdFlag", "(Ljava/lang/String;)Z", "getShowMoreGameFlag");
    }
    showOPPOMoreGame() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showOPPOMoreGame","calling_method_params":0}`);
    }

    openProtocol() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "openProtocol", "()V");
    }

    hasNetwork(callback) {
    }

    showReviewAlert() {
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
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "pay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", `${money}`, `${propId}`, `${propName}`);
    }

    payComplete(orderId) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "completePay", "(Ljava/lang/String;)V", `${orderId}`);
    }

    getLanguage() {
    }
    showScore() {
    }
    getNetworkstatus() {
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
            "com/asc/sdk/ndk/AndroidNDKHelper", "setUserProperty", "(Ljava/lang/String;)V", JSON.stringify(data));
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

    reqPaySubInfo(callback) {
        callback(false);
    }

    getAllPaySubInfo() {
        return null;
    }

    reqRemoteConfig(callback) {
        reqRemoteConfigCallback = callback;
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "reqRemoteConfig", "()V");
    }

    getRemoteConfig(key) {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "getRemoteConfig", "(Ljava/lang/String;)Ljava/lang/String;", `${key}`);
    }

    getAllRemoteConfig() {
        // @ts-ignore
        let res = jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "getAllRemoteConfig", "()Ljava/lang/String;");
        if (!res) {
            return null;
        }
        return JSON.stringify(res);
    }

    getNetworkType() {
        return "UNKNOWN";
    }

    login(callback) {
        if (loginData) {
            callback(loginData.loginSucc, loginData.userId, loginData.token, loginData.extension);
            return;
        }
        loginCallback = callback;
    }

    setOnResultListener(callback) {
        onResultListener = callback;
    }

    showForum(){
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "showForum", "()V");
    }

}

{
    //视频回调
    {
        (<any>window).AndroidVideoCallback = function (result: string) {
            console.log("XminigameSDK", "视频是否播放完成?", result == "1");
            videoCallback && videoCallback(result == "1");
        }
    };

    //视频插屏回调
    {
        (<any>window).AndroidVideoIntersCallBack = function () {
            //do something 视频播放完成所做的操作 恢复游戏
            console.log("XminigameSDK", "videoInsertCallBack")
            videoIntersCallBack && videoIntersCallBack();
        }
    };

    //订单支付回调
    {
        (<any>window).AndroidPayCallback = function (paySucc: string, orderId: string, propId: string) {
            console.log("XminigameSDK", "orderId:" + orderId, "propId:" + propId, "该订单是否支付成功?", paySucc == "1");
            payCallback && payCallback(paySucc == "1", orderId, propId);
        }
    };

    //云控配置参数回调
    (<any>window).AndroidReqRemoteConfigCallback = function () {
        console.log("XminigameSDK", "reqRemoteConfig success");
        reqRemoteConfigCallback && reqRemoteConfigCallback();
    };

    //登录回调
    (<any>window).AndroidLoginCallback = function (loginSucc: string, userId: string, token: string, extension: string) {
        console.log("MARSDK", "userId:", userId, "token:", token, "extension:", extension, "登录是否成功?", loginSucc == "1");
        loginData = {
            loginSucc: loginSucc == "1",
            userId: userId,
            token: token,
            extension: extension
        }
        loginCallback && loginCallback(loginSucc == "1", userId, token, extension);
    };


    //mar onResult回调
    (<any>window).AndroidOnResult = function (code, msg: string) {
        console.log("MARSDK", "AndroidOnResult", "code:", code, "msg:", msg);
        onResultListener && onResultListener(Number(code), msg);
    };
}