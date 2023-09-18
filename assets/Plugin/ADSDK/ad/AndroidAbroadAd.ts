// import { view } from "cc";
import { AdInterface } from "./AdInterface";

let videoCallback = null;
let videoIntersCallBack = null;
let payCallback = null;

let checkItemListCallback = null;
let getSubsRemainTimeCallback = null;
let purchaseItemCallback = null;
let queryPurchasesInAppCallback = null;

export enum ItemType {
    GOODS = "inapp",
    SUBS = "subs",
    NULL = "null"
}

export interface Purchase {
    "orderId": string,
    "packageName": string,
    "productId": string,
    "purchaseTime": number,
    "purchaseState": number,
    "purchaseToken": string,
    "quantity": number,
    "acknowledged": boolean
}

export interface GoodsItem {
    "productId": string,
    "type": string,
    "title": string,
    "name": string,
    "price": string,
    "price_amount_micros": number,
    "price_currency_code": string,
    "description": string,
    "skuDetailsToken": string
}

export default class AndroidAbroadAd implements AdInterface {
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
     * 插屏三合一区域**********************************
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

    getIntersFlag(sceneName?) {
        if (!sceneName) sceneName = "";
        // @ts-ignore
        return JSON.parse(this.callSdkAndroidMethod("getIntersFlag", sceneName));
    }

    showInters(callback?, sceneName?) {
        if (callback) videoIntersCallBack = callback;
        if (!sceneName) sceneName = "";
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{'calling_method_name':'showInters','calling_method_params':"${sceneName}"}`);
    }
    getVideoFlag() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "SendMessageGetAdFlag", "(Ljava/lang/String;)Z", "getVideoFlag");
    }

    showVideo(callback, reason?) {
        if (!reason) reason = "";
        videoCallback = callback;
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showVideo","calling_method_params":"${reason}"}`);
    }

    getNativeIconFlag() {
        // // @ts-ignore
        // return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "SendMessageGetAdFlag", "(Ljava/lang/String;)Z", "getIconNativeFlag");
        return false;
    }
    showNativeIcon(width, height, x, y) {
        // let winSize = view.getVisibleSize();
        // let size = width / winSize.width;
        // let posX = (x - width / 2) / winSize.width;
        // let posY = (winSize.height - (y + width / 2)) / winSize.height;
        // // @ts-ignore
        // jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V",
        //     `{"calling_method_name":"showNativeIcon","calling_method_params":{"icon_size":${size},"viewX":${posX},"viewY":${posY}}}`);
    }
    hideNativeIcon() {
        // // @ts-ignore
        // jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"hideNativeIcon",'calling_method_params':0}`);
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
        // @ts-ignore
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
        // // @ts-ignore
        // jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "reportNavigatePasterClick", "()V");
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
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "getLanguage", "()Ljava/lang/String;");
    }

    showScore() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "xgameComment", "()V");
    }

    getNetworkstatus() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "isNetworkConnected", "()Ljava/lang/String;") == "true";
    }

    openSettings() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "openSettings", "()V");
    }

    showADWithType(key, type) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "showAndroidADWithType", "(Ljava/lang/String;Ljava/lang/String;)V", key.toString(), type);
    }

    showTAEventData(data) {
    }

    showTAWithType(type, data) {
    }

    addUser(data) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage",
            "(Ljava/lang/String;)V", `{"calling_method_name":"setUserProperty","calling_method_params":"${JSON.stringify(data)}"`);
    }

    setUser(data) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage",
            "(Ljava/lang/String;)V", `{"calling_method_name":"setUserProperty","calling_method_params":"${JSON.stringify(data)}"`);
    }


    // checkItemListCallback?: (data: { itemType: ItemType, list: GoodsItem[] }) => void;
    /**
     * 获取商品列表
     * @param type 商品类型  订阅或物品
     * @param callback
     */
    async checkItemList(type: ItemType, callback: (data: { itemType: ItemType, list: GoodsItem[] }) => void): Promise<{ itemType: ItemType, list: GoodsItem[] }> {
        let callData = this.getAsyncFunction(callback);
        checkItemListCallback = callData[1];
        this.callBillAndroidMethod("checkItemList", type, false);
        return await callData[0];
    }



    // getSubsRemainTimeCallback?: (data: { id: string, remainTime: number }) => void;
    /**
     * 获取订阅剩余时间
     * @param id
     * @param callback
     */
    async getSubsRemainTime(id: string, callback: (data: { id: string, remainTime: number }) => void): Promise<{ id: string, remainTime: number }> {
        let callData = this.getAsyncFunction(callback);
        getSubsRemainTimeCallback = callData[1];
        this.callBillAndroidMethod("getSubsRemainTime", id, false);
        return await callData[0];
    }



    // purchaseItemCallback?: (result: boolean) => void;
    /**
     * 购买商品
     * @param id
     * @param type
     * @param callback
     */
    async purchaseItem(id: string, type: ItemType, callback: (isSuccess: boolean) => void): Promise<boolean> {
        let callData = this.getAsyncFunction(callback);
        purchaseItemCallback = callData[1];
        this.callBillAndroidMethod("purchaseItem", id, type, false);
        return await callData[0];
    }



    // queryPurchasesInAppCallback?: (result: Purchase[]) => void;
    /**
     * 查询已购买物品列表(商品&订阅)
     * @param type
     * @param callback
     */
    async queryPurchases(type: ItemType, callback: (result: Purchase[]) => void): Promise<Purchase[]> {
        let callData = this.getAsyncFunction(callback);
        queryPurchasesInAppCallback = callData[1];
        this.callBillAndroidMethod("queryPurchases", type, false);
        return await callData[0];
    }


    async waitVideoLoad(waitTime, callback) {
        return null;
    }

    reportVideoBtn(scene) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage",
            "(Ljava/lang/String;)V", `{"calling_method_name":"reportVideoBtn","calling_method_params":"${scene}"}`);
    }

    reportVideoClick(scene) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage",
            "(Ljava/lang/String;)V", `{"calling_method_name":"reportVideoClick","calling_method_params":"${scene}"}`);
    }

    hideSplash() {
        // @ts-ignore
        this.callSdkAndroidMethod("hideSplash");
    }



    /**
     * 内部方法
     */
    //
    getAsyncFunction<T extends (result: any) => any>(callback?: T): [Promise<any>, T] {
        let isCallback = false;
        let result: any;
        let promise = new Promise((resolve => {
            let interval: number;
            interval = setInterval(() => {
                if (isCallback) {
                    clearInterval(interval);
                    resolve(result);
                }
            }, 50)
        }));
        return [promise, <T><any>((re: any) => {
            // @ts-ignore
            callback && callback(re);
            result = re;
            isCallback = true;
        })];
    }

    //
    callBillAndroidMethod(method: string, ...args: any[]): string {
        let callJson = {
            calling_method_name: method,
            calling_method_params: args
        };
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "billingReceiveCppMessage",
            "(Ljava/lang/String;)Ljava/lang/String;", JSON.stringify(callJson));
    }

    callSdkAndroidMethod(method: string, ...args: any[]): string {
        let callJson = {
            calling_method_name: method,
            calling_method_params: args
        };
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "sdkReceiveCppMessage",
            "(Ljava/lang/String;)Ljava/lang/String;", JSON.stringify(callJson));
    }

}

//视频回调
{
    (<any>window).AndroidAbroadVideoCallback = function (result: string) {
        console.log("XminigameSDK", "视频是否播放完成?", result == "1");
        videoCallback && videoCallback(result == "1");
    }
};

//视频插屏回调
{
    (<any>window).AndroidAbroadVideoIntersCallBack = function () {
        //do something 视频播放完成所做的操作 恢复游戏
        console.log("XminigameSDK", "videoInsertCallBack")
        videoIntersCallBack && videoIntersCallBack();
    }
};

//订单支付回调
{
    (<any>window).AndroidAbroadPayCallback = function (paySucc: string, orderId: string, propId: string) {
        console.log("XminigameSDK", "orderId:" + orderId, "propId:" + propId, "该订单是否支付成功?", paySucc == "1");
        payCallback && payCallback(paySucc == "1", orderId, propId);
    }
};

// 获取商品列表列表
(<any>window).AndroidAbroadCheckItemList = (result: string) => {
    if (checkItemListCallback != null) {
        try {
            let formatResult = JSON.parse(result);
            checkItemListCallback(formatResult);
        } catch (e) {
            checkItemListCallback({ itemType: ItemType.NULL, list: [] });
        }
    }
};

// 获取订阅剩余时间回调
(<any>window).AndroidAbroadGetSubsRemainTime = (result: string) => {
    if (getSubsRemainTimeCallback) {
        try {
            let formatResult = JSON.parse(result);
            getSubsRemainTimeCallback(formatResult);
        } catch (e) {
            getSubsRemainTimeCallback({ id: "", remainTime: -1 });
        }
    }
};

// 查询已购买物品列表回调
(<any>window).AndroidAbroadQueryPurchases = (result: string) => {
    if (queryPurchasesInAppCallback) {
        try {
            let formatResult = JSON.parse(result);
            queryPurchasesInAppCallback(formatResult);
        } catch (e) {
            queryPurchasesInAppCallback([]);
        }
    }
};

// 购买商品回调
(<any>window).AndroidAbroadPurchaseItem = (result: string) => {
    if (purchaseItemCallback) {
        try {
            let formatResult = JSON.parse(result);
            purchaseItemCallback(formatResult);
        } catch (e) {
            purchaseItemCallback(false);
        }
    }
};