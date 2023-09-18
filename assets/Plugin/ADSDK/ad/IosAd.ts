import { game, view } from "cc";
import GetConfig from "../utils/GetConfig";
import { AdInterface } from "./AdInterface";

let videoCallback = null;
let videoIntersCallBack = null;
let showAuthenticationCallback = null;
let hasNetworkCallback = null;

export default class IosAd implements AdInterface {
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
        jsb.reflection.callStaticMethod("DJADManagerVC", "showBanner");
    }

    hideBanner() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("DJADManagerVC", "hideBanner");
    }

    getIntersFlag() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("DJADManagerVC", "getIntersFlag") == "1";
    }

    showInters(callback?) {
        if (callback) videoIntersCallBack = callback;
        // @ts-ignore
        jsb.reflection.callStaticMethod("DJADManagerVC", "showInters");
    }

    getVideoFlag() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("DJADManagerVC", "getVideoFlag") == "1";
    }

    showVideo(callback, reason?) {
        videoCallback = callback;
        // @ts-ignore
        jsb.reflection.callStaticMethod("DJADManagerVC", "showVideo");
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
    }
    reportNativeAdShow(adId) {
    }
    reportNativeAdClick(adId) {
    }

    getNavigateIconFlag() {
        return true;
    }
    showNavigateIcon(width, height, x, y) {
        let winSize = view.getVisibleSize();
        let size = width / winSize.width;
        let posX = (x - width / 2) / winSize.width;
        let posY = (winSize.height - (y + width / 2)) / winSize.height;
        // @ts-ignore
        jsb.reflection.callStaticMethod("DJADManagerVC", "showNavigateIcon:withX:withY:", size.toString(), posX.toString(), posY.toString());
    }
    hideNavigateIcon() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("DJADManagerVC", "hideNavigateIcon");
    }

    getNavigateGroupFlag() {
        return true;
    }
    showNavigateGroup(type, side, size, y) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("DJADManagerVC", "showNavigateGroup:withSide:", type, side);
    }
    hideNavigateGroup() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("DJADManagerVC", "hideNavigateGroup");
    }

    getNavigateSettleFlag() {
        return true;
    }
    showNavigateSettle(type, x, y) {
        let winSize = view.getVisibleSize();
        let posX = x / winSize.width;
        let posY = (winSize.height - y) / winSize.height;
        // @ts-ignore
        jsb.reflection.callStaticMethod("DJADManagerVC", "showNavigateSettle:withX:withY:", type.toString(), posX.toString(), posY.toString());
    }
    hideNavigateSettle() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("DJADManagerVC", "hideNavigateSettle");
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
        jsb.reflection.callStaticMethod("systemSetting", "shakePhone:", type);
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
        game.end();
    }

    reportAnalytics(params, data) {
        // 上报友盟
        // @ts-ignore
        jsb.reflection.callStaticMethod("systemSetting", "showUMWithType:withData:", params, JSON.stringify(data));
        // 上报数数科技
        // @ts-ignore
        jsb.reflection.callStaticMethod("systemSetting", "showTAWithType:withData:", params, JSON.stringify(data));
    }

    showAuthentication(callback) {
        showAuthenticationCallback = callback;
        // @ts-ignore
        jsb.reflection.callStaticMethod("systemSetting", "showAuthentication");
    }

    visitorExperience(callback) {
        showAuthenticationCallback = callback;
        // @ts-ignore
        jsb.reflection.callStaticMethod("systemSetting", "showAuthentication");
    }

    showNativeAd(width, height, viewX, viewY) {
    }

    getOPPOShowMoreGameFlag() {
    }
    showOPPOMoreGame() {
    }

    openProtocol() {
    }

    hasNetwork(callback) {
        hasNetworkCallback = callback;
        // @ts-ignore
        jsb.reflection.callStaticMethod("systemSetting", "hasNetwork");
    }

    showReviewAlert() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("systemSetting", "showReviewAlert");
    }

    showiOSADWithScene(key, type) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("DJADManagerVC", "showiOSADWithScene:Platform:", key.toString(), type);
    }

    showiOSADWithType(key, type) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("DJADManagerVC", "showiOSADWithType:Platform:", key.toString(), type);
    }

    videoUIShow(key) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("DJADManagerVC", "videoUIShow:", key.toString());
    }

    showPrivacyAgreement(companyLogUrl, htmlUrl, callback) {
        callback(true);
    }


    buyProps(money, propId, propName, callback) {
        callback(false, "");
    }

    payComplete(orderId) {
    }


    getLanguage() {
        return "zh";
    }

    showScore() {
    }

    getNetworkstatus() {
        return true;
    }

    openSettings() {
    }

    showADWithType(key, type) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("DJADManagerVC", "showiOSADWithType:Platform:", key.toString(), type);
    }

    showTAEventData(data) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("systemSetting", "showTAEventData:", JSON.stringify(data));
    }

    showTAWithType(type, data) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("systemSetting", "showTAWithType:withData:", type, JSON.stringify(data));
    }

    addUser(data) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("systemSetting", "addUser:", JSON.stringify(data));
    }

    setUser(data) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("systemSetting", "setUser:", JSON.stringify(data));
    }

    // checkItemListCallback?: (data: { itemType: ItemType, list: GoodsItem[] }) => void;
    /**
     * 获取商品列表
     * @param type 商品类型  订阅或物品
     * @param callback
     */
    async checkItemList(type, callback) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("systemSetting", "checkItemList:", JSON.stringify(type));
    }



    // getSubsRemainTimeCallback?: (data: { id: string, remainTime: number }) => void;
    /**
     * 获取订阅剩余时间
     * @param id
     * @param callback
     */
    async getSubsRemainTime(id, callback) {
        return null;
    }



    // purchaseItemCallback?: (result: boolean) => void;
    /**
     * 购买商品
     * @param id
     * @param type
     * @param callback
     */
    async purchaseItem(id, type, callback) {
        return null;
    }



    // queryPurchasesInAppCallback?: (result: Purchase[]) => void;
    /**
     * 查询已购买物品列表(商品&订阅)
     * @param type
     * @param callback
     */
    async queryPurchases(type, callback) {
        return null;
    }


    async waitVideoLoad(waitTime, callback) {
        return null;
    }

    reportVideoBtn(scene) {
    }

    reportVideoClick(scene) {
    }


    /**
     * 内部方法
     */

}

//防沉迷回调
{
    (<any>window).IosShowAuthenticationCallback = function (result: string) {
        console.log("ASCSDK", "showAuthenticationCallback", showAuthenticationCallback)
        showAuthenticationCallback && showAuthenticationCallback(result == "1");
    }
}

//是否有网络回调
{
    (<any>window).IosHasNetworkCallback = function (result: string) {
        console.log("ASCSDK", "hasNetworkCallback", hasNetworkCallback)
        hasNetworkCallback && hasNetworkCallback(result == "1");
    }
}

//视频回调
{
    (<any>window).IosVideoCallback = function (result: string) {
        console.log("XminigameSDK", "视频是否播放完成?", result == "1");
        videoCallback && videoCallback(result == "1");
    }
}

//视频插屏回调
{
    (<any>window).IosVideoIntersCallBack = function () {
        console.log("XminigameSDK", "videoInsertCallBack")
        videoIntersCallBack && videoIntersCallBack();
    }
}