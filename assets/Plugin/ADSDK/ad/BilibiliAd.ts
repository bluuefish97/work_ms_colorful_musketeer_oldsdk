import CheckConfig from "../utils/CheckConfig";
import GetConfig from "../utils/GetConfig";
import LocalStorage from "../utils/LocalStorage";
import { AdInterface } from "./AdInterface";

export default class BilibiliAd implements AdInterface {
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
     * 系统banner广告对象
     */
    bannerAd = null;
    /**
     * 系统banner是否加载成功
     */
    loadSucc_SystemBanner = false;
    /**
     * banner是否加载成功
     */
    loadSucc_Banner = false;
    /**
     * 已经调用过showBanner?
     */
    hasShowBanner = false;
    /**
     * banner刷新定时器
     */
    interval_updateBanner = null;
    /**
     * 检查banner加载成功定时器
     */
    timeout_checkBannerLoadSucc = null;
    /**
     * 当前总共查询banner加载是否成功的次数
     */
    NUM_CheckBannerLoadSucc = 0;
    /**
     * 最多查询banner加载是否成功的次数
     */
    NUM_MaxCheckBannerLoadSucc = 5;


    /**
     * 视频广告对象
     */
    videoAd = null;
    /**
     * 视频广告是否加载成功
     */
    loadSucc_Video = false;

    /**
     * 视频广告回调
     */
    callback_Video = null;




    /**
     * 创建广告
     */
    createAd() {
        console.log("XminigameSDK", GetConfig.getChannelName(), "createAd======================");
        if (this.SW_SystemBanner) this.createSystemBanner();
        if (this.SW_Video) this.createVideo();
    }

    /**
     * 加载互推
     */
    startLoadPushGamaes() {
    }

    /**
     * 创建系统banner广告
     */
    createSystemBanner() {
        console.log("XminigameSDK", "--createSystemBanner--");
        if (CheckConfig.stringHasSpace(this.ID_SystemBanner)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道系统banner广告ID中含有空字符串,请检查后台系统banner广告ID*********************");
            return;
        }

        // @ts-ignore
        let windowWidth = bl.getSystemInfoSync().windowWidth;
        // @ts-ignore
        let windowHeight = bl.getSystemInfoSync().windowHeight;

        // @ts-ignore
        this.bannerAd = bl.createBannerAd({
            style: {
                left: (windowWidth - 300) / 2,
                top: windowHeight - 88,
                width: 300,
                height: 88
            },
        })

        this.bannerAd.onLoad(() => {
            console.log("XminigameSDK", "BL banner加载成功");
            this.loadSucc_SystemBanner = true;
            if (this.hasShowBanner) {
                this.showSystemBanner();
            }
        })

        this.bannerAd.onError((err) => {
            console.log("XminigameSDK", "BL banner加载失败" + JSON.stringify(err))
        })

        this.bannerAd.onClose(() => {
            console.log("XminigameSDK", "BL banner被用户主动关闭,", this.NUM_BannerUpdateTime + "S后再次刷新");
            this.updateSystemBanner();
        })
    }
    /**
     * 创建视频广告
     */
    createVideo() {
        console.log("XminigameSDK", "--createVideo--");
        if (CheckConfig.stringHasSpace(this.ID_Video)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道视频广告ID中含有空字符串,请检查后台视频广告ID*********************");
            return;
        }

        // @ts-ignore
        this.videoAd = bl.createRewardedVideoAd();

        // 监听加载完成
        this.videoAd.onLoad((e) => {
            console.log("XminigameSDK", "BL 视频广告加载成功");
            this.loadSucc_Video = true;
        })

        // 激励广告出错
        this.videoAd.onError((e) => {
            console.log("XminigameSDK", "BL 视频广告加载错误:", JSON.stringify(e));
            this.videoAd.destroy();
            this.createVideo();
        })

        // 用户点击“关闭广告”
        this.videoAd.onClose((e) => {
            if (e.isEnded) {
                console.log("XminigameSDK", "BL 激励视频广告完成，发放奖励");
                this.callback_Video(true);
            } else {
                console.log("XminigameSDK", "BL 激励视频广告取消，不发放奖励");
                this.callback_Video(false);
            }
            this.loadSucc_Video = false;
            this.videoAd.destroy();
            this.createVideo();
        })

        // 加载
        this.videoAd.load();
    }



    getChannelId() {
        return GetConfig.getChannelId();
    }

    showBanner() {
        if (!this.loadSucc_Banner) {
            this.checkBannerLoadSucc();
            return;
        }
        if (this.hasShowBanner) {
            console.log("XminigameSDK", "已经调用过showBanner,请勿重复调用");
            return;
        }
        // 已经调用过showBanner
        this.hasShowBanner = true;

        if (this.SW_SystemBanner) {
            this.showSystemBanner();
            this.updateSystemBanner();
        }
    }

    hideBanner() {
        this.hasShowBanner = false;
        this.hideSystemBanner();
        if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
        if (this.timeout_checkBannerLoadSucc) clearTimeout(this.timeout_checkBannerLoadSucc);
    }

    getIntersFlag() {
        return false;
    }

    showInters(callback?) {
    }

    getVideoFlag() {
        return this.loadSucc_Video;
    }

    showVideo(videoCallback, reason?) {
        if (this.videoAd && this.loadSucc_Video) {
            this.callback_Video = videoCallback;
            console.log("XminigameSDK", "BL showVideo========================");
            this.videoAd.show();
            this.loadSucc_Video = false;
        }
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
        if (type == "long") {
            // @ts-ignore
            bl.vibrateLong({
                success(res) {
                },
                fail(res) {
                    console.log("XminigameSDK", "BL vibrateLong调用失败", JSON.stringify(res));
                }
            });
        }
        else if (type == "short") {
            // @ts-ignore
            bl.vibrateShort({
                success(res) {
                },
                fail(res) {
                    console.log("XminigameSDK", "BL vibrateShort调用失败", JSON.stringify(res));
                }
            });
        }
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
        console.log("XminigameSDK", "BL getUserData=====================");
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
        // @ts-ignore
        bl.getUserInfo({
            success: (res) => {
                console.log("XminigameSDK", "BL 授权获取用户信息成功", res);
                userInfo.head = res.userInfo.avatarUrl;
                userInfo.name = res.userInfo.nickname;
                userInfo.country = res.userInfo.country;
                userInfo.province = res.userInfo.province;
                userInfo.city = res.userInfo.city;
                if (res.userInfo.gender == 1) {
                    userInfo.sex = "M";
                } else if (res.userInfo.gender == 2) {
                    userInfo.sex = "F";
                } else {
                    userInfo.sex = "0";
                }
                userInfo.power = true;
                LocalStorage.setData("avatarUrl", userInfo.head);
                LocalStorage.setData("nickName", userInfo.name);
                LocalStorage.setData("gender", userInfo.sex);
                callback(userInfo);
            },
            fail: (res) => {
                console.log("XminigameSDK", "BL 授权获取用户信息失败", res);
                userInfo.power = false;
            }
        });
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
        callback(false, "");
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
    /**
     * 检查banner是否加载成功
     */
    checkBannerLoadSucc() {
        this.loadSucc_Banner = this.SW_SystemBanner && this.loadSucc_SystemBanner;
        console.log("XminigameSDK", "banner加载成功?", this.loadSucc_Banner, ++this.NUM_CheckBannerLoadSucc);

        if (this.timeout_checkBannerLoadSucc) clearTimeout(this.timeout_checkBannerLoadSucc);

        if (this.loadSucc_Banner) {
            this.showBanner();
        } else {
            if (this.NUM_CheckBannerLoadSucc >= this.NUM_MaxCheckBannerLoadSucc) return;
            this.timeout_checkBannerLoadSucc =
                setTimeout(() => {
                    this.checkBannerLoadSucc();
                }, 5 * 1000)
        }
    }

    /**
     * 展示系统banner
     */
    showSystemBanner() {
        if (this.bannerAd) {
            console.log("XminigameSDK", "BL showSystemBanner========================");
            this.hasShowBanner = true;
            this.bannerAd.show()
        }
    }

    /**
     * 刷新系统banner
     */
    updateSystemBanner() {
        // 关闭上一个showBanner产生的定时器
        if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
        this.interval_updateBanner =
            setInterval(() => {
                console.log("XminigameSDK", "BL updateSystemBanner========================");
                this.bannerAd.destroy();
                this.bannerAd = null;
                this.createSystemBanner();
            }, this.NUM_BannerUpdateTime * 1000)
    }

    /**
     * 隐藏系统banner
     */
    hideSystemBanner() {
        if (this.bannerAd) {
            console.log("XminigameSDK", "BL hideSystemBanner========================");
            this.bannerAd.hide();
        }

        if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
    }

}
