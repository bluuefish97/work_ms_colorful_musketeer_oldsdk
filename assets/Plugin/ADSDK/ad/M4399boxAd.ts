import CheckConfig from "../utils/CheckConfig";
import GetConfig from "../utils/GetConfig";
import LocalStorage from "../utils/LocalStorage";
import { AdInterface } from "./AdInterface";


export default class M4399boxAd implements AdInterface {
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
     * 系统插屏广告对象
     */
    systemIntersAd = null;
    /**
     * 系统插屏是否加载成功
     */
    loadSucc_SystemInters = false;

    /**
     * 已经调用展示插屏的次数
     */
    NUM_hasShowInters = 0;
    /**
     * 插屏当前间隔的次数
     */
    NUM_intersNowInterval = 0;
    /**
     * 插屏当前间隔时间
     */
    NUM_IntersNowIntervalTime = 99;
    /**
     * 插屏当前变添加桌面次数
     */
    NUM_IntersNowToAddDesktop = 0;




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
     * 视频广告是否正在播放
     */
    isShow_Video = false;



    /**
     * 创建广告
     */
    createAd() {
        console.log("XminigameSDK", GetConfig.getChannelName(), "createAd======================");

        if (this.SW_SystemBanner) this.createSystemBanner();

        if (this.SW_SystemInters) this.createSystemInters();
        if (this.NUM_IntersIntervalTime > 0) this.runIntersInterval();

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

        //获取真机设备像素比
        // @ts-ignore
        let pixelRatio = gamebox.getSystemInfoSync().pixelRatio;
        let bannerWidth = 320 * pixelRatio;
        let bannerHeight = 50 * pixelRatio;

        // @ts-ignore
        let windowWidth = gamebox.getSystemInfoSync().windowWidth;
        // @ts-ignore
        let windowHeight = gamebox.getSystemInfoSync().windowHeight;

        // @ts-ignore
        this.bannerAd = gamebox.createBannerAd({
            style: {
                width: bannerWidth,
                height: bannerHeight,
                left: (windowWidth * pixelRatio - bannerWidth) / 2,
                top: windowHeight * pixelRatio - bannerHeight
            }
        });

        //监听banner广告加载事件
        this.bannerAd.onLoad((res) => {
            console.log("XminigameSDK", "M4399box 系统banner广告加载成功");
            this.loadSucc_SystemBanner = true;
            if (this.hasShowBanner) {
                this.showSystemBanner();
            }
        });

        //监听banner广告错误事件
        this.bannerAd.onError((res) => {
            console.log("XminigameSDK", "M4399box 系统banner广告加载失败", JSON.stringify(res));
        });

    }

    /**
     * 创建系统插屏广告
     */
    createSystemInters() {
        console.log("XminigameSDK", "--createSystemInters--");
        if (CheckConfig.stringHasSpace(this.ID_SystemInters)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道系统插屏广告ID中含有空字符串,请检查后台系统插屏广告ID*********************");
            return;
        }

        // @ts-ignore
        this.systemIntersAd = gamebox.createInterstitialAd();

        //监听插屏加载完成
        this.systemIntersAd.onLoad((res) => {
            console.log("XminigameSDK", "M4399box 系统插屏广告加载成功", JSON.stringify(res));
            this.loadSucc_SystemInters = true;
        })

        //监听插屏广告加载错误
        this.systemIntersAd.onError((err) => {
            console.log("XminigameSDK", "M4399box 插屏加载失败", JSON.stringify(err));
        })

        //监听插屏广告关闭
        this.systemIntersAd.onClose((res) => {
            console.log("XminigameSDK", "M4399box 关闭插屏", JSON.stringify(res));
            this.NUM_IntersNowIntervalTime = 0;
        });

        //加载一次
        this.systemIntersAd.load();
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
        this.videoAd = gamebox.createRewardedVideoAd();

        //监听视频广告加载完成
        this.videoAd.onLoad((res) => {
            console.log("XminigameSDK", "M4399box 视频广告加载完成", JSON.stringify(res));
            this.loadSucc_Video = true;
        })

        //监听视频广告加载出错
        this.videoAd.onError((err) => {
            console.log("XminigameSDK", "M4399box 视频广告加载失败", JSON.stringify(err));
            this.loadSucc_Video = false;
            setTimeout(() => {
                this.videoAd && this.videoAd.load();
            }, 30 * 1000)
        })

        //监听视频广告关闭
        this.videoAd.onClose((res) => {
            console.log("XminigameSDK", "M4399box 视频广告关闭", JSON.stringify(res));
            if (res.isEnded) {
                console.log("XminigameSDK", "M4399box 激励视频广告完成，发放奖励");
                if (this.callback_Video) {
                    this.callback_Video(true);
                    this.loadSucc_Video = false;
                    this.videoAd.load();
                }
            } else {
                console.log("XminigameSDK", "M4399box 激励视频广告取消关闭，不发放奖励");
                if (this.callback_Video) {
                    this.callback_Video(false)
                    this.loadSucc_Video = false;
                    this.videoAd.load();
                }
            }
            this.isShow_Video = false;
        })

        // 加载一次
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
        return this.loadSucc_SystemInters;
    }

    showInters(callback?) {
        // 插屏间隔弹添加桌面
        this.NUM_hasShowInters++;
        if (this.SW_IntersIntervalToAddDesktop && this.NUM_hasShowInters <= this.NUM_IntersToAddDesktopNumber) {
            console.log("XminigameSDK", "第" + this.NUM_IntersToAddDesktopNumber + "次插屏变添加桌面", "当前第" + this.NUM_hasShowInters + "次");
            if (this.NUM_hasShowInters == this.NUM_IntersToAddDesktopNumber) {
                this.getAddDesktopFlag((suc) => {
                    if (suc) {
                        console.log("XminigameSDK", "插屏变添加桌面");
                        this.addDesktop((res) => { });
                    }
                });
                return;
            }
        }

        if (this.SW_IntersBaseControl) {
            if (this.NUM_hasShowInters < this.NUM_IntersStart) {
                console.log("XminigameSDK", "插屏开始次数未达到", this.NUM_hasShowInters, "目标次数", this.NUM_IntersStart);
                return;
            }

            if (this.NUM_intersNowInterval < this.NUM_IntersIntervalNum) {
                console.log("XminigameSDK", "插屏间隔次数未达到", this.NUM_intersNowInterval, "目标次数", this.NUM_IntersIntervalNum)
                this.NUM_intersNowInterval++;
                return;
            }

            if (this.NUM_IntersNowIntervalTime < this.NUM_IntersIntervalTime) {
                console.log("XminigameSDK", "插屏间隔时间未达到", this.NUM_IntersNowIntervalTime, "目标时间", this.NUM_IntersIntervalTime);
                if (this.SW_AddDesktop && this.NUM_IntersNowToAddDesktop < this.NUM_AutoAddDeskMostTimes) {
                    this.getAddDesktopFlag((suc) => {
                        if (suc) {
                            this.NUM_IntersNowToAddDesktop++;
                            this.addDesktop(function () {
                                console.log("XminigameSDK", "插屏间隔弹桌面")
                            });
                        }
                    });
                }
                return;
            }
        }

        this.NUM_intersNowInterval = 0;

        //有插屏延迟的情况下延迟展示插屏
        if (this.NUM_IntersDelayTime > 0) {
            let random = Math.floor(Math.random() * 100);
            if (random < this.NUM_IntersDelayP) {
                console.log("XminigameSDK", "插屏延迟时间(ms):" + this.NUM_IntersDelayTime);
                setTimeout(() => {
                    if (this.loadSucc_SystemInters) this.showSystemInters();
                }, this.NUM_IntersDelayTime)
            } else {
                if (this.loadSucc_SystemInters) this.showSystemInters();
            }
        }
        else {
            if (this.loadSucc_SystemInters) this.showSystemInters();
        }
    }

    getVideoFlag() {
        return this.loadSucc_Video;
    }

    showVideo(callback, reason?) {
        if (this.isShow_Video) {
            console.log("XminigameSDK", "视频正在播放中,请勿多次点击！");
            return;
        }
        this.isShow_Video = true;

        this.callback_Video = callback;
        if (this.videoAd) {
            this.videoAd.show()
                .then(() => {
                    console.log("XminigameSDK", "激励视频广告显示成功");
                })
                .catch(err => {
                    console.log("XminigameSDK", "激励视频广告组件出现问题", JSON.stringify(err));
                    // 可以手动加载一次
                    this.videoAd.load().then(() => {
                        console.log("XminigameSDK", "激励视频广告手动加载成功");
                        // 加载成功后需要再显示广告
                        this.videoAd.show().catch(err => {
                            console.log("XminigameSDK", "激励视频广告播放失败", JSON.stringify(err));
                            this.isShow_Video = false;
                            this.callback_Video(false);
                        });
                    });
                });
        }
        else {
            this.isShow_Video = false;
            this.callback_Video(false);
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
        if (type == "long") {
            // @ts-ignore
            gamebox.vibrateLong({
                success: (res) => {
                },
                fail: (res) => {
                    console.log("XminigameSDK", "M4399box vibrateLong fail", JSON.stringify(res));
                },
            })
        } else if (type == "short") {
            // @ts-ignore
            gamebox.vibrateShort({
                success: (res) => {
                },
                fail: (res) => {
                    console.log("XminigameSDK", "M4399box vibrateShort fail", JSON.stringify(res));
                },
            })
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
        // @ts-ignore
        gamebox.getUserInfo({
            success: (res) => {
                console.log("XminigameSDK", "m4399box 授权获取用户信息成功", JSON.stringify(res));
                userInfo.head = res.avatarUrl;
                userInfo.name = res.nickName;
                userInfo.power = true;
                LocalStorage.setData("avatarUrl", userInfo.head);
                LocalStorage.setData("nickName", userInfo.name);
                callback(userInfo);
            }
        })

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
                }, 5000)
        }
    }

    /**
     * 展示系统banner
     */
    showSystemBanner() {
        if (this.bannerAd) {
            console.log("XminigameSDK", "M4399box showSystemBanner========================");
            this.bannerAd.show();
        } else {
            this.createSystemBanner();
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
                console.log("XminigameSDK", "M4399box updateSystemBanner========================");
                this.bannerAd.hide();
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
            console.log("XminigameSDK", "M4399box hideSystemBanner========================");
            this.bannerAd.hide();
            this.bannerAd.destroy();
            this.bannerAd = null;
        }

        if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
    }

    /**
     * 展示系统插屏
     */
    showSystemInters() {
        if (this.systemIntersAd && this.loadSucc_SystemInters) {
            console.log("XminigameSDK", "M4399box showSystemInters========================");
            this.systemIntersAd.show();
        }
    }


    /**
     * 插屏间隔计时器
     */
    runIntersInterval() {
        if (this.NUM_IntersIntervalTime > 0) {
            setInterval(() => {
                this.NUM_IntersNowIntervalTime++;
            }, 1000);
        }
    }
}