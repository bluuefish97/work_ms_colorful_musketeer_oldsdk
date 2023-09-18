import { huaweiAdConfig, m4399boxAdConfig } from "../SdkConfig";
import AdFactory from "./AdFactory";

export default class AdCenter {
    private static instance: AdCenter;

    /**
     * AdCenter 单例
     */
    public static getInstance(): AdCenter {
        if (!AdCenter.instance) {
            AdCenter.instance = new AdCenter();
        }
        return AdCenter.instance;
    }

    /**
     * 广告工厂对象
     */
    adFactory = null;

    /**
     * 所有的广告参数
     */
    adConfig = null;

    /**
     * 所有的互推游戏参数
     */
    pushGamesConfig;

    constructor() {
        this.adFactory = AdFactory.produceAD();
    }


    /**
     * 开始加载广告
     */
    startLoadAd() {
        if (this.adConfig != null) {
            console.log("XminigameSDK", "adConfig:", JSON.stringify(this.adConfig));

            if (typeof this.adConfig.mainSwitch == "undefined") {
                console.log("XminigameSDK", "广告总开关未开启");
            } else if (typeof this.adConfig.advertIdentity == "undefined") {
                console.log("XminigameSDK", "广告ID未启用");
            } else {
                if (!this.adConfig.mainSwitch) {
                    console.log("XminigameSDK", "广告总开关未开启");
                } else if (this.adConfig.advertIdentity == null) {
                    console.log("XminigameSDK", "广告ID未启用");
                } else {
                    this.setAllAdConfig();
                    this.adFactory.createAd();
                }
            }
        }
    }

    /**
     * 设置所有参数
     */
    setAllAdConfig() {
        // 所有广告开关
        if (typeof this.adConfig.advertSwitch != "undefined" && this.adConfig.advertSwitch != null && this.adConfig.advertSwitch) {
            console.log("XminigameSDK", "广告开关参数：", JSON.stringify(this.adConfig.advertSwitch));
            this.adFactory.SW_SystemBanner = this.adConfig.advertSwitch.bannerSwitch;
            this.adFactory.SW_SystemInters = this.adConfig.advertSwitch.intersSwitch;
            this.adFactory.SW_Video = this.adConfig.advertSwitch.videoSwitch;
            this.adFactory.SW_Native = this.adConfig.advertSwitch.nativeBigIntersSwitch;
            this.adFactory.SW_NativeBanner = this.adConfig.advertSwitch.nativeBannerSwitch;
            this.adFactory.SW_NativeInters = this.adConfig.advertSwitch.nativeIntersSwitch;
            this.adFactory.SW_NativeImage = this.adConfig.advertSwitch.nativeBigPicSwitch;
            this.adFactory.SW_Box = this.adConfig.advertSwitch.boxSwitch;
            this.adFactory.SW_NativeTemplate = this.adConfig.advertSwitch.nativeTemplateSwitch;
            this.adFactory.SW_NativeTemplateBanner = this.adConfig.advertSwitch.nativeTemplateBannerSwitch;
        }

        // 所有广告ID
        if (typeof this.adConfig.advertIdentity != "undefined" && this.adConfig.advertIdentity != null && this.adConfig.advertIdentity) {
            console.log("XminigameSDK", "广告ID参数：", JSON.stringify(this.adConfig.advertIdentity));
            this.adFactory.ID_SystemBanner = this.adConfig.advertIdentity.adBannerId;
            this.adFactory.ID_SystemInters = this.adConfig.advertIdentity.adIntersId;
            this.adFactory.ID_Native = this.adConfig.advertIdentity.adNativeId;
            this.adFactory.ID_NativeBanner = this.adConfig.advertIdentity.adNativeId;
            this.adFactory.ID_NativeInters = this.adConfig.advertIdentity.adNativeInterstitialId;
            this.adFactory.ID_NativeImage = this.adConfig.advertIdentity.adNativeIntersId;
            this.adFactory.ID_Video = this.adConfig.advertIdentity.adVideoId;
            this.adFactory.ID_Box = this.adConfig.advertIdentity.adBoxId;
            this.adFactory.ID_Block = this.adConfig.advertIdentity.adBrickId;
            this.adFactory.ID_NativeTemplate = this.adConfig.advertIdentity.adNativeTemplateId;
            this.adFactory.ID_NativeTemplateBanner = this.adConfig.advertIdentity.adNativeTemplateBannerId;
        }

        // 插屏四合一
        if (typeof this.adConfig.combineInters != "undefined" && this.adConfig.combineInters != null) {
            console.log("XminigameSDK", "插屏四合一参数：", JSON.stringify(this.adConfig.combineInters));
            if (this.adConfig.combineInters.enableSwitch) {
                this.adFactory.NUM_NativeIntersP = this.adConfig.combineInters.nativeIntersRatio;
                this.adFactory.NUM_SystemIntersP = this.adConfig.combineInters.intersRatio;
                this.adFactory.NUM_NavigateIntersP = this.adConfig.combineInters.navigateIntersRatio;
                this.adFactory.NUM_NativeTemplateP = this.adConfig.combineInters.nativeTemplateIntersRatio;
            }
        }

        // 动态控制
        if (typeof this.adConfig.dynamicNativeInters != "undefined" && this.adConfig.dynamicNativeInters != null) {
            console.log("XminigameSDK", "动态控制参数：", JSON.stringify(this.adConfig.dynamicNativeInters));
        }

        // 广告基础控制
        if (typeof this.adConfig.baseControl != "undefined" && this.adConfig.baseControl != null) {
            console.log("XminigameSDK", "广告基础控制参数：", JSON.stringify(this.adConfig.baseControl));
            // banner控制
            if (typeof this.adConfig.baseControl.bannerSwitch != "undefined" && this.adConfig.baseControl.bannerSwitch != null && this.adConfig.baseControl.bannerSwitch) {
                if (typeof this.adConfig.baseControl.refreshTime != "undefined" && this.adConfig.baseControl.refreshTime != null && this.adConfig.baseControl.refreshTime != 0) {
                    this.adFactory.NUM_BannerUpdateTime = this.adConfig.baseControl.refreshTime;
                }
                if (typeof this.adConfig.baseControl.priority != "undefined" && this.adConfig.baseControl.priority != null && this.adConfig.baseControl.priority) {
                    if (this.adConfig.baseControl.priority == "nativeBanner") {
                        this.adFactory.SW_SystemBannerFirst = false;
                    }
                }
                if (typeof this.adConfig.baseControl.maxClose != "undefined" && this.adConfig.baseControl.maxClose != null && this.adConfig.baseControl.maxClose != 0) {
                    this.adFactory.NUM_BannerMostShow = this.adConfig.baseControl.maxClose;
                }
                if (typeof this.adConfig.baseControl.closeShowIntervalTime != "undefined" && this.adConfig.baseControl.closeShowIntervalTime != null && this.adConfig.baseControl.closeShowIntervalTime != 0) {
                    this.adFactory.NUM_BannerCloseShowIntervalTime = this.adConfig.baseControl.closeShowIntervalTime;
                }
            }
            // 插屏控制
            if (typeof this.adConfig.baseControl.intersSwitch != "undefined" && this.adConfig.baseControl.intersSwitch != null && this.adConfig.baseControl.intersSwitch) {
                this.adFactory.SW_IntersBaseControl = this.adConfig.baseControl.intersSwitch;
                if (typeof this.adConfig.baseControl.startNum != "undefined" && this.adConfig.baseControl.startNum != null && this.adConfig.baseControl.startNum != 0) {
                    this.adFactory.NUM_IntersStart = this.adConfig.baseControl.startNum;
                }
                if (typeof this.adConfig.baseControl.intervalNum != "undefined" && this.adConfig.baseControl.intervalNum != null && this.adConfig.baseControl.intervalNum) {
                    this.adFactory.NUM_IntersIntervalNum = this.adConfig.baseControl.intervalNum;
                }
                if (typeof this.adConfig.baseControl.intervalTime != "undefined" && this.adConfig.baseControl.intervalTime != null && this.adConfig.baseControl.intervalTime != 0) {
                    this.adFactory.NUM_IntersIntervalTime = this.adConfig.baseControl.intervalTime;
                }
                if (typeof this.adConfig.baseControl.delayEject != "undefined" && this.adConfig.baseControl.delayEject != null && this.adConfig.baseControl.delayEject != 0) {
                    this.adFactory.NUM_IntersDelayTime = this.adConfig.baseControl.delayEject;
                }
                if (typeof this.adConfig.baseControl.delayProbability != "undefined" && this.adConfig.baseControl.delayProbability != null && this.adConfig.baseControl.delayProbability != 0) {
                    this.adFactory.NUM_IntersDelayP = this.adConfig.baseControl.delayProbability;
                }
            }
            // 原生控制
            if (typeof this.adConfig.baseControl.originalSwitch != "undefined" && this.adConfig.baseControl.originalSwitch != null && this.adConfig.baseControl.originalSwitch) {
                if (typeof this.adConfig.baseControl.originalRefreshTime != "undefined" && this.adConfig.baseControl.originalRefreshTime != null && this.adConfig.baseControl.originalRefreshTime > 0) {
                    this.adFactory.NUM_NativeUpdateTime = this.adConfig.baseControl.originalRefreshTime;
                }
            }
        }

        // 桌面开关
        if (typeof this.adConfig.desktopSwitch != "undefined" && this.adConfig.desktopSwitch != null) {
            console.log("XminigameSDK", "桌面开关参数：", JSON.stringify(this.adConfig.desktopSwitch));
            if (typeof this.adConfig.desktopSwitch.desktopIconSwitch != "undefined" && this.adConfig.desktopSwitch.desktopIconSwitch != null && this.adConfig.desktopSwitch.desktopIconSwitch) {
                this.adFactory.SW_AddDesktop = this.adConfig.desktopSwitch.desktopIconSwitch;
            }
            if (typeof this.adConfig.desktopSwitch.activateDesktopIconSwitch != "undefined" && this.adConfig.desktopSwitch.activateDesktopIconSwitch != null && this.adConfig.desktopSwitch.activateDesktopIconSwitch) {
                this.adFactory.SW_IntersIntervalToAddDesktop = this.adConfig.desktopSwitch.activateDesktopIconSwitch;          // 插屏间隔弹桌面图标开关
            }
            if (typeof this.adConfig.desktopSwitch.autoAddDesktopNumber != "undefined" && this.adConfig.desktopSwitch.autoAddDesktopNumber != null && this.adConfig.desktopSwitch.desktopIconSwitch && this.adConfig.desktopSwitch.activateDesktopIconSwitch && this.adConfig.desktopSwitch.autoAddDesktopNumber != 0) {
                this.adFactory.NUM_AutoAddDeskMostTimes = this.adConfig.desktopSwitch.autoAddDesktopNumber;        // 自动弹添加桌面次数
            }
            if (typeof this.adConfig.desktopSwitch.intersAddDesktopNumber != "undefined" && this.adConfig.desktopSwitch.intersAddDesktopNumber != null && this.adConfig.desktopSwitch.activateDesktopIconSwitch && this.adConfig.desktopSwitch.intersAddDesktopNumber != 0) {
                this.adFactory.NUM_IntersToAddDesktopNumber = this.adConfig.desktopSwitch.intersAddDesktopNumber;         // 第几次插屏变添加桌面
            }
        }

        // 区域屏蔽
        this.adFactory.IP = this.adConfig.ip;
        this.adFactory.SW_AreaShielding = this.adConfig.areaShieldingSwitch;

    }

    /**
     * 开始加载互推游戏信息
     */
    startLoadPushGamaes() {

        if (this.pushGamesConfig != null) {
            console.log("XminigameSDK", "pushGamesConfig:", JSON.stringify(this.pushGamesConfig));

            if (typeof this.pushGamesConfig.masterSwitch == "undefined" || !this.pushGamesConfig.masterSwitch) {
                console.log("XminigameSDK", "互推主开关未开启");
            } else {
                this.adFactory.SW_Statistics = this.pushGamesConfig.statisSwitch;
                this.adFactory.SW_NavigateIcon = this.pushGamesConfig.pushSwitch.iconSwitch;
                this.adFactory.SW_NavigateGroup = this.pushGamesConfig.pushSwitch.listSwitch;
                this.adFactory.SW_NavigateSettle = this.pushGamesConfig.pushSwitch.settleSwitch;
                this.adFactory.pushGameList = this.pushGamesConfig.pushGameList;

                this.adFactory.startLoadPushGamaes();
            }
        }

    }

    /**
     * 华为手动填参模式
     */
    huaweiManualModel() {
        console.log("XminigameSDK", "华为广告参数:", JSON.stringify(huaweiAdConfig));

        // 开关参数
        this.adFactory.SW_SystemBanner = huaweiAdConfig.SW_SystemBanner;
        this.adFactory.SW_SystemInters = huaweiAdConfig.SW_SystemInters;
        this.adFactory.SW_Video = huaweiAdConfig.SW_Video;
        this.adFactory.SW_Native = huaweiAdConfig.SW_Native;
        this.adFactory.SW_NativeBanner = huaweiAdConfig.SW_NativeBanner;
        this.adFactory.SW_NativeInters = huaweiAdConfig.SW_NativeInters;

        // 广告id参数
        this.adFactory.ID_SystemBanner = huaweiAdConfig.ID_SystemBanner;
        this.adFactory.ID_SystemInters = huaweiAdConfig.ID_SystemInters;
        this.adFactory.ID_Native = huaweiAdConfig.ID_Native;
        this.adFactory.ID_Video = huaweiAdConfig.ID_Video;

        // banner控制参数
        this.adFactory.NUM_BannerUpdateTime = huaweiAdConfig.NUM_BannerUpdateTime;
        this.adFactory.SW_SystemBannerFirst = huaweiAdConfig.SW_SystemBannerFirst;

        // 原生插屏出现概率
        this.adFactory.NUM_NativeIntersP = huaweiAdConfig.NUM_NativeIntersP;

        // 插屏基础控制
        if (huaweiAdConfig.SW_IntersBaseControl) {
            this.adFactory.SW_IntersBaseControl = huaweiAdConfig.SW_IntersBaseControl;
            this.adFactory.NUM_IntersStart = huaweiAdConfig.NUM_IntersStart;
            this.adFactory.NUM_IntersIntervalNum = huaweiAdConfig.NUM_IntersIntervalNum;
            this.adFactory.NUM_IntersIntervalTime = huaweiAdConfig.NUM_IntersIntervalTime;
            this.adFactory.NUM_IntersDelayTime = huaweiAdConfig.NUM_IntersDelayTime;
            this.adFactory.NUM_IntersDelayP = huaweiAdConfig.NUM_IntersDelayP;
        }

        // 创建广告
        this.adFactory.createAd();
    }

    /**
     * m4399box手动填参模式
     */
    m4399boxManualModel() {
        console.log("XminigameSDK", "m4399box广告参数:", JSON.stringify(m4399boxAdConfig));

        // 开关参数
        this.adFactory.SW_SystemBanner = m4399boxAdConfig.SW_SystemBanner;
        this.adFactory.SW_SystemInters = m4399boxAdConfig.SW_SystemInters;
        this.adFactory.SW_Video = m4399boxAdConfig.SW_Video;

        // banner刷新时间
        this.adFactory.NUM_BannerUpdateTime = m4399boxAdConfig.NUM_BannerUpdateTime;

        // 插屏基础控制
        if (m4399boxAdConfig.SW_IntersBaseControl) {
            this.adFactory.SW_IntersBaseControl = m4399boxAdConfig.SW_IntersBaseControl;
            this.adFactory.NUM_IntersStart = m4399boxAdConfig.NUM_IntersStart;
            this.adFactory.NUM_IntersIntervalNum = m4399boxAdConfig.NUM_IntersIntervalNum;
            this.adFactory.NUM_IntersIntervalTime = m4399boxAdConfig.NUM_IntersIntervalTime;
            this.adFactory.NUM_IntersDelayTime = m4399boxAdConfig.NUM_IntersDelayTime;
            this.adFactory.NUM_IntersDelayP = m4399boxAdConfig.NUM_IntersDelayP;
        }

        // 创建广告
        this.adFactory.createAd();
    }




    /**
     * 外部方法调用入口
     */
    getChannelId() {
        return this.adFactory.getChannelId();
    }

    showBanner(type?) {
        this.adFactory.showBanner(type);
    }
    hideBanner() {
        this.adFactory.hideBanner();
    }

    getIntersFlag(sceneName?) {
        return this.adFactory.getIntersFlag(sceneName);
    }
    showInters(callback?, sceneName?) {
        this.adFactory.showInters(callback, sceneName);
    }

    getVideoFlag() {
        return this.adFactory.getVideoFlag();
    }
    showVideo(callback, reason?) {
        this.adFactory.showVideo(callback, reason);
    }

    getNativeIconFlag() {
        return this.adFactory.getNativeIconFlag();
    }
    showNativeIcon(width, height, x, y) {
        this.adFactory.showNativeIcon(width, height, x, y);
    }
    hideNativeIcon() {
        this.adFactory.hideNativeIcon();
    }

    getNativeImageFlag() {
        return this.adFactory.getNativeImageFlag();
    }
    showNativeImage(width, height, x, y, type?, hideCallback?) {
        this.adFactory.showNativeImage(width, height, x, y, type, hideCallback);
    }
    hideNativeImage() {
        this.adFactory.hideNativeImage();
    }

    getNativePasterFlag() {
        return this.adFactory.getNativePasterFlag();
    }
    showNativePaster() {
        this.adFactory.showNativePaster();
    }

    getNativeAdInfo(type) {
        return this.adFactory.getNativeAdInfo(type);
    }
    reportNativeAdShow(adId) {
        this.adFactory.reportNativeAdShow(adId);
    }
    reportNativeAdClick(adId) {
        this.adFactory.reportNativeAdClick(adId);
    }

    getNavigateIconFlag() {
        return this.adFactory.getNavigateIconFlag();
    }
    showNavigateIcon(width, height, x, y) {
        this.adFactory.showNavigateIcon(width, height, x, y);
    }
    hideNavigateIcon() {
        this.adFactory.hideNavigateIcon();
    }

    getNavigateGroupFlag() {
        return this.adFactory.getNavigateGroupFlag();
    }
    showNavigateGroup(type, side, size, y) {
        this.adFactory.showNavigateGroup(type, side, size, y);
    }
    hideNavigateGroup() {
        this.adFactory.hideNavigateGroup();
    }

    getNavigateSettleFlag() {
        return this.adFactory.getNavigateSettleFlag();
    }
    showNavigateSettle(type, x, y) {
        this.adFactory.showNavigateSettle(type, x, y);
    }
    hideNavigateSettle() {
        this.adFactory.hideNavigateSettle();
    }

    getNavigatePasterFlag() {
        return this.adFactory.getNavigatePasterFlag();
    }
    showNavigatePaster() {
        this.adFactory.showNavigatePaster();
    }
    hideNavigatePaster() {
        this.adFactory.hideNavigatePaster();
    }
    reportNavigatePasterClick() {
        this.adFactory.reportNavigatePasterClick();
    }

    getNavigateInters() {
        return this.adFactory.getNavigateInters();
    }
    showNavigateInters() {
        this.adFactory.showNavigateInters();
    }

    shareApp() {
        this.adFactory.shareApp();
    }

    getNavigateBoxBannerFlag() {
        return this.adFactory.getNavigateBoxBannerFlag();
    }
    showNavigateBoxBanner() {
        this.adFactory.showNavigateBoxBanner();
    }
    hideNavigateBoxBanner() {
        this.adFactory.hideNavigateBoxBanner();
    }

    getNavigateBoxPortalFlag() {
        return this.adFactory.getNavigateBoxPortalFlag();
    }
    showNavigateBoxPortal(imageUrl?, marginTop?) {
        this.adFactory.showNavigateBoxPortal(imageUrl, marginTop);
    }
    hideNavigateBoxPortal() {
        this.adFactory.hideNavigateBoxPortal();
    }

    setGroup(group) {
        this.adFactory.setGroup(group);
    }

    hasAddDesktopFunc() {
        return this.adFactory.hasAddDesktopFunc();
    }
    getAddDesktopFlag(callback) {
        this.adFactory.getAddDesktopFlag(callback);
    }
    addDesktop(callback) {
        this.adFactory.addDesktop(callback);
    }

    phoneVibrate(type) {
        this.adFactory.phoneVibrate(type);
    }

    startGameVideo(duration) {
        this.adFactory.startGameVideo(duration);
    }
    pauseGameVideo() {
        this.adFactory.pauseGameVideo();
    }
    resumeGameVideo() {
        this.adFactory.resumeGameVideo();
    }
    stopGameVideo(callback) {
        this.adFactory.stopGameVideo(callback);
    }
    shareVideo(title, desc, topics, videoPath, callback) {
        this.adFactory.shareVideo(title, desc, topics, videoPath, callback);
    }
    shareAppById(templateId) {
        this.adFactory.shareAppById(templateId);
    }

    jumpToMoreGamesCenter() {
        this.adFactory.jumpToMoreGamesCenter();
    }

    showMoreGamesBanner() {
        this.adFactory.showMoreGamesBanner();
    }
    hideMoreGamesBanner() {
        this.adFactory.hideMoreGamesBanner();
    }

    showFavoriteGuide(type, content, position) {
        this.adFactory.showFavoriteGuide(type, content, position);
    }

    getUserData(callback) {
        this.adFactory.getUserData(callback);
    }
    getUserInfo(callback) {
        this.adFactory.getUserInfo(callback);
    }

    getBoxFlag() {
        return this.adFactory.getBoxFlag();
    }
    showAppBox() {
        this.adFactory.showAppBox();
    }

    getBlockFlag() {
        return this.adFactory.getBlockFlag();
    }
    showBlock(type, x, y, blockSize) {
        this.adFactory.showBlock(type, x, y, blockSize);
    }
    hideBlock() {
        this.adFactory.hideBlock();
    }

    exitTheGame() {
        this.adFactory.exitTheGame();
    }

    reportAnalytics(params, data) {
        this.adFactory.reportAnalytics(params, data);
    }

    showAuthentication(callback) {
        this.adFactory.showAuthentication(callback);
    }

    visitorExperience(callback) {
        this.adFactory.visitorExperience(callback);
    }

    showNativeAd(width, height, viewX, viewY) {
        this.adFactory.showNativeAd(width, height, viewX, viewY);
    }

    getOPPOShowMoreGameFlag() {
        return this.adFactory.getOPPOShowMoreGameFlag();
    }
    showOPPOMoreGame() {
        this.adFactory.showOPPOMoreGame();
    }

    openProtocol() {
        this.adFactory.openProtocol();
    }

    openServiceAgreement() {
        this.adFactory.openServiceAgreement();
    }

    hasNetwork(callback) {
        this.adFactory.hasNetwork(callback);
    }

    showReviewAlert() {
        this.adFactory.showReviewAlert();
    }

    showiOSADWithScene(key, type) {
        this.adFactory.showiOSADWithScene(key, type);
    }
    showiOSADWithType(key, type) {
        this.adFactory.showiOSADWithType(key, type);
    }
    videoUIShow(key) {
        this.adFactory.videoUIShow(key);
    }

    showPrivacyAgreement(companyLogUrl, htmlUrl, callback) {
        this.adFactory.showPrivacyAgreement(companyLogUrl, htmlUrl, callback);
    }


    buyProps(money, propId, propName, callback) {
        this.adFactory.buyProps(money, propId, propName, callback);
    }

    payComplete(orderId) {
        this.adFactory.payComplete(orderId);
    }

    queryUnfilledOrder(callback) {
        this.adFactory.queryUnfilledOrder(callback);
    }

    getLanguage() {
        return this.adFactory.getLanguage();
    }

    showScore() {
        this.adFactory.showScore();
    }

    getNetworkstatus() {
        return this.adFactory.getNetworkstatus();
    }

    openSettings() {
        this.adFactory.openSettings();
    }

    showADWithType(key, type) {
        this.adFactory.showADWithType(key, type);
    }

    showTAEventData(data) {
        this.adFactory.showADWithType(data);
    }

    showTAWithType(type, data) {
        this.adFactory.showTAWithType(type, data);
    }

    addUser(data) {
        this.adFactory.addUser(data);
    }

    setUser(data) {
        this.adFactory.setUser(data);
    }

    async checkItemList(type, callback) {
        return await this.adFactory.checkItemList(type, callback);
    }

    async getSubsRemainTime(id, callback) {
        return await this.adFactory.getSubsRemainTime(id, callback);
    }

    async purchaseItem(id, type, callback) {
        return await this.adFactory.purchaseItem(id, type, callback);
    }

    async queryPurchases(type, callback) {
        return await this.adFactory.queryPurchases(type, callback);
    }

    async waitVideoLoad(waitTime, callback) {
        return await this.adFactory.waitVideoLoad(waitTime, callback);
    }

    reportVideoBtn(scene) {
        this.adFactory.reportVideoBtn(scene);
    }

    reportVideoClick(scene) {
        this.adFactory.reportVideoClick(scene);
    }

    hideSplash() {
        this.adFactory.hideSplash();
    }

    reqRemoteConfig(callback) {
        this.adFactory.reqRemoteConfig(callback);
    }

    getRemoteConfig(key) {
        return this.adFactory.getRemoteConfig(key);
    }

    getAllRemoteConfig() {
        return this.adFactory.getAllRemoteConfig();
    }

    reqPaySubInfo(callback) {
        this.adFactory.reqPaySubInfo(callback);
    }

    getAllPaySubInfo() {
        return this.adFactory.getAllPaySubInfo();
    }

    getNetworkType() {
        return this.adFactory.getNetworkType();
    }

    login(callback) {
        this.adFactory.login(callback);
    }

    reqProductInfo(callback) {
        this.adFactory.reqProductInfo(callback);
    }
    getProductInfo() {
        return this.adFactory.getProductInfo();
    }

    setBannerState(state) {
        this.adFactory.setBannerState(state);
    }
    setIntersState(state) {
        this.adFactory.setIntersState(state);
    }
    getDIYFlag() {
        return this.adFactory.getDIYFlag();
    }
    showDIY(diy) {
        this.adFactory.showDIY(diy);
    }
    hideDIY() {
        this.adFactory.hideDIY();
    }

    startAppStore(packageName) {
        this.adFactory.startAppStore(packageName);
    }

    customEvent(num, name, params) {
        this.adFactory.customEvent(num, name, params);
    }

    setPayRemoveAd(removeAd) {
        this.adFactory.setPayRemoveAd(removeAd);
    }

    setOnResultListener(callback) {
        this.adFactory.setOnResultListener(callback);
    }

    getNewWorkCountryIso() {
        return this.adFactory.getNewWorkCountryIso();
    }

    getDeviceInfo() {
        return this.adFactory.getDeviceInfo();
    }

    showForum() {
        this.adFactory.showForum();
    }
}
