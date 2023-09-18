import GetConfig from "../utils/GetConfig";
import { AdInterface } from "./AdInterface";

enum webViewCall {
    showBanner = 'showBanner',
    hideBanner = 'hideBanner',
    showInters = 'showInters',
    showVideo = 'showVideo',
    getVideoFlag = 'getVideoFlag',
    getIntersFlag = 'getIntersFlag',
    getChannelName = 'getChannelName',
    getAndroidChannel = 'getAndroidChannel',
    phoneVibrateShort = 'phoneVibrateShort',
    phoneVibrateLong = 'phoneVibrateLong',
    exitWeb = 'exitWeb',
    showWebView = 'showWebView',
}
(<any>window).webViewVideoCallBack = (data: any) => {

};
(<any>window).webViewGetIntersFlag = (data: any) => {

};
(<any>window).webViewGetVideoFlag = (data: any) => {

};
(<any>window).webViewGetChannelName = (data: any) => {

};
(<any>window).webViewGetAndroidChannel = (data: any) => {

};

function webCall(call: webViewCall) {
    document.location = `adkey://${call}`;
}


export default class WebViewAd implements AdInterface {


    SW_NativeTemplateBanner: any;
    ID_NativeTemplateBanner: any;
    queryUnfilledOrder(callback: any) {
        // throw new Error("Method not implemented.");
    }
    reqRemoteConfig(callback: any) {
        // throw new Error("Method not implemented.");
    }
    getRemoteConfig(key: any) {
        // throw new Error("Method not implemented.");
    }
    getAllRemoteConfig() {
        // throw new Error("Method not implemented.");
    }
    reqPaySubInfo(callback: any) {
        // throw new Error("Method not implemented.");
    }
    getAllPaySubInfo() {
        // throw new Error("Method not implemented.");
    }
    getNetworkType() {
        // throw new Error("Method not implemented.");
    }
    login(callback: any) {
        // throw new Error("Method not implemented.");
    }
    reqProductInfo(callback: any) {
        // throw new Error("Method not implemented.");
    }
    getProductInfo() {
        // throw new Error("Method not implemented.");
    }
    setBannerState(state: any) {
        // throw new Error("Method not implemented.");
    }
    setIntersState(state: any) {
        // throw new Error("Method not implemented.");
    }
    getDIYFlag() {
        // throw new Error("Method not implemented.");
    }
    showDIY(diy: any) {
        // throw new Error("Method not implemented.");
    }
    hideDIY() {
        // throw new Error("Method not implemented.");
    }
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
     * 正在展示的测试广告
     */
    /**
     * 已经调用showBanner
     */
    hasShowBanner = false;
    /**
     * 正在展示插屏
     */
    isShow_Inters = false;
    /**
     * 正在展示视频
     */
    isShow_Video = false;
    /**
     * 正在展示原生icon
     */
    isShow_NativeIcon = false;
    /**
     * 正在展示原生大图
     */
    isShow_NativeImage = false;
    /**
     * 正在展示互推icon
     */
    isShow_NavigateIcon = false;
    /**
     * 正在展示互推列表
     */
    isShow_NavigateGroup = false;
    /**
     * 正在展示结算互推
     */
    isShow_NavigateSettle = false;
    /**
     * 正在展示结算互推类型1
     */
    isShow_NavigateSettle1 = false;
    /**
     * 正在展示互推盒子横幅
     */
    isShow_NavigateBoxBanner = false;
    /**
     * 正在展示互推盒子九宫格
     */
    isShow_NavigateBoxPortal = false;
    /**
     * 正在展示更多游戏横幅
     */
    isShow_MoreGamesBanner = false;
    /**
     * 正在展示积木广告
     */
    isShow_Block = false;
    /**
     * 正在展示隐私协议
     */
    isShow_PrivacyAgreement = false;
    /**
     * 正在展示互推贴片
     */
    isShow_NavigatePaster = false;

    /**
     * 广告分组
     */
    AdGroup = -1;

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
        webCall(webViewCall.showBanner)
    }

    hideBanner() {
        webCall(webViewCall.hideBanner)
    }

    getIntersFlag() {
        return true;
    }

    showInters(callback?, sceneName?) {
        webCall(webViewCall.showInters)
        callback && callback(true)
    }

    getVideoFlag() {
        return true;
    }

    showVideo(videoCallback, reason?) {
        //  @ts-ignore
        window.webViewVideoCallBack = videoCallback
        webCall(webViewCall.showVideo)
    }

    getNativeIconFlag() {
        return true;
    }

    showNativeIcon(width, height, x, y) {
    }

    hideNativeIcon() {

    }

    getNativeImageFlag() {
        return true;
    }

    showNativeImage(width, height, x, y) {

    }

    hideNativeImage() {

    }

    getNativePasterFlag() {
        return true;
    }
    showNativePaster() {

    }

    getNativeAdInfo(type) {

    }

    reportNativeAdShow(adId) {

    }
    reportNativeAdClick(adId) {

    }

    getNavigateIconFlag() {
        return true;
    }

    showNavigateIcon(width, height, x, y) {

    }

    hideNavigateIcon() {

    }

    getNavigateGroupFlag() {
        return true;
    }

    showNavigateGroup(type, side, size, y) {

    }

    hideNavigateGroup() {

    }

    getNavigateSettleFlag() {
        return true;
    }

    showNavigateSettle(type, x, y) {

    }

    hideNavigateSettle() {

    }

    getNavigatePasterFlag() {
        return false
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
        return true;
    }

    showNavigateBoxBanner() {

    }

    hideNavigateBoxBanner() {

    }

    getNavigateBoxPortalFlag() {
        return true;
    }

    hideNavigateBoxPortal() {
    }
    showNavigateBoxPortal(imageUrl?, marginTop?) {


    }

    setGroup(group) {
        this.AdGroup = group;
    }

    hasAddDesktopFunc() {
        return true;
    }

    getAddDesktopFlag(callback) {
        callback(true);
    }

    addDesktop(callback) {
        callback(true);
    }

    phoneVibrate(type) {
        if (type == 'long') {
            webCall(webViewCall.phoneVibrateLong)
        } else if (type == 'short') {
            webCall(webViewCall.phoneVibrateShort)
        }

    }

    startGameVideo(duration) {

    }
    pauseGameVideo() {

    }
    resumeGameVideo() {

    }
    stopGameVideo(callback) {
        callback("0");
    }
    shareVideo(title, desc, topics, videoPath, callback) {
        callback(true);
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
        console.log("XminigameSDK", "webview getUserData==================");
        let userData = {
            userId: "webviewUserId",
            token: "webviewToken",
            userType: 1,//用户类型
        }
        callback(userData);
    }

    getUserInfo(callback) {
        console.log("XminigameSDK", "webview getUserInfo==================");
        let userInfo = {
            head: "",
            name: "",
            sex: "",
            city: "",
            province: "",
            country: "",
            power: true //已授权用户
        }
        callback(userInfo);
    }

    getBoxFlag() {
        return false;
    }
    showAppBox() {

    }

    getBlockFlag() {
        return true;
    }

    showBlock(type, x, y, blockSize) {

    }

    hideBlock() {

    }

    exitTheGame() {
        webCall(webViewCall.exitWeb)
    }

    reportAnalytics(params, data) {

    }

    showAuthentication(callback) {

    }

    visitorExperience(callback) {

    }

    showNativeAd(width, height, viewX, viewY) {

    }

    getOPPOShowMoreGameFlag() {
        return true;
    }
    showOPPOMoreGame() {

    }

    openProtocol() {

    }

    openServiceAgreement() {

    }

    hasNetwork(callback) {
        callback(true);
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

    }


    buyProps(money, propId, propName, callback) {
        callback(true, "webviewOrderId");
    }

    payComplete(orderId) {
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


    /**
     * 内部方法
     */
}
