import CheckConfig from "../utils/CheckConfig";
import GetConfig from "../utils/GetConfig";
import LocalStorage from "../utils/LocalStorage";
import { AdInterface } from "./AdInterface";

export default class KwaiAd implements AdInterface {
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
     * 系统插屏广告对象
     */
    systemIntersAd = null;
    /**
     * 系统插屏是否加载成功
     */
    loadSucc_SystemInters = false;
    /**
     * 系统插屏加载错误次数
     */
    NUM_SystemIntersLoadError = 0;


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
    NUM_IntersNowIntervalTime = 999;
    /**
     * 插屏当前变添加桌面次数
     */
    NUM_IntersNowToAddDesktop = 0;


    /**
     * 插屏关闭后的回调
     */
    callback_IntersClose = null;




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
     * 录屏地址
     */
    videoPath = null;
    /**
     * 录屏摄像机
     */
    gameRecorder = null;
    /**
     * 录屏回调
     */
    callback_Recorder = null;




    /**
     * 创建广告
     */
    createAd() {
        console.log("XminigameSDK", GetConfig.getChannelName(), "createAd======================");
        if (this.SW_Video && this.ID_Video != "") this.createVideo();
        if (this.SW_SystemInters && this.ID_SystemInters != "") this.createSystemInters();
        if (this.NUM_IntersIntervalTime > 0) this.runIntersInterval();
    }

    /**
     * 加载互推
     */
    startLoadPushGamaes() {
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
        this.systemIntersAd = ks.createInterstitialAd({
            adUnitId: this.ID_SystemInters
        })

        this.loadSucc_SystemInters = true;

        //监听插屏广告错误
        this.systemIntersAd.onError((err) => {
            this.NUM_SystemIntersLoadError++;
            this.loadSucc_SystemInters = false;
            console.log("XminigameSDK", this.NUM_SystemIntersLoadError, "KS 系统插屏加载失败：", JSON.stringify(err))
            if (this.NUM_SystemIntersLoadError < 5) {
                setTimeout(() => {
                    this.createSystemInters();
                }, 10 * 1000);
            }
        })

        //监听插屏广告关闭
        this.systemIntersAd.onClose(() => {
            console.log("XminigameSDK", "KS 系统插屏广告关闭");
            this.NUM_IntersNowIntervalTime = 0;
            this.loadSucc_SystemInters = false;
            if (this.callback_IntersClose) this.callback_IntersClose();
            // 系统插屏关闭后10s后再次load
            setTimeout(() => {
                this.createSystemInters();
            }, 60 * 1000);
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
        this.videoAd = ks.createRewardedVideoAd({
            adUnitId: this.ID_Video
        })

        this.loadSucc_Video = true;

        this.videoAd.onError((err) => {
            console.log("XminigameSDK", "激励视频加载失败");
        })

        // 用户点击了【关闭广告】按钮
        this.videoAd.onClose((result) => {
            if (result && result.isEnded || result === undefined) {
                // 正常播放结束，可以下发游戏奖励
                console.log("XminigameSDK", "激励视频播放完成");
                this.callback_Video(true);
            }
            else {
                // 播放中途退出，不下发游戏奖励
                console.log("XminigameSDK", "激励视频取消播放");
                this.callback_Video(false);
            }
        });
    }


    getChannelId() {
        return GetConfig.getChannelId();
    }

    showBanner() {
    }

    hideBanner() {
    }

    getIntersFlag() {
        return this.loadSucc_SystemInters;
    }
    showInters(callback?) {
        this.callback_IntersClose = callback;
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

        // 插屏当前间隔的次数
        this.NUM_intersNowInterval = 0;

        // 是否有延时
        let hasDelay = false;
        // 生成一个1-100的随机数(判断是否延时)
        let randomNumP = Math.floor(Math.random() * 100);

        if (randomNumP < this.NUM_IntersDelayP && this.NUM_IntersDelayTime > 0) {
            hasDelay = true;
        }

        // 展示哪种插屏?
        let type = "1";
        // 生成一个1-100的随机数(判断展示插屏)
        // let randomNumInters = Math.floor(Math.random() * 100);
        // console.log("XminigameSDK", "randomNumInters:" + randomNumInters + " this.NUM_NativeTemplateP:" + this.NUM_NativeTemplateP);
        // if (randomNumInters <= this.NUM_NativeTemplateP) {
        //     if (this.SW_NativeTemplate && this.nativeTemplateAd) {
        //         type = "1";
        //     }
        // } else if (randomNumInters <= (this.NUM_NativeTemplateP + this.NUM_NativeIntersP)) {
        //     if (this.SW_NativeInters && this.nativeAd) {
        //         type = "2";
        //     }
        // }

        // console.log("XminigameSDK", "hasDelay:" + hasDelay + " intersType:" + type);


        let showFunc = (t) => {
            this.showSystemInters();
        }

        if (hasDelay) {
            setTimeout(() => {
                showFunc(type);
            }, this.NUM_IntersDelayTime)
        } else {
            showFunc(type);
        }

    }


    getVideoFlag() {
        return this.loadSucc_Video;
    }

    showVideo(videoCallback, reason?) {
        if (this.videoAd && this.loadSucc_Video) {
            this.callback_Video = videoCallback;
            console.log('XminigameSDK', 'KS showVideo========================')
            this.videoAd.show().catch(
                (err) => {
                    console.log("XminigameSDK", "激励视频播放失败: " + JSON.stringify(err));
                    this.callback_Video(false);
                });
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
    }

    startGameVideo(duration) {

        this.videoPath = null;

        // @ts-ignore
        this.gameRecorder = kwaigame.createMediaRecorder();
        if (this.gameRecorder === null) {
            console.log("XminigameSDK", "当前版本App不支持录屏");
            return;
        }

        this.gameRecorder.onStart(res => {
            console.log("XminigameSDK", "KS 录屏开始");
        });

        this.gameRecorder.onStop(res => {
            console.log("XminigameSDK", 'KS 录屏结束', JSON.stringify(res));
            this.videoPath = res.videoID;
            this.callback_Recorder(this.videoPath);
        });

        this.gameRecorder.onError((err) => {
            console.log("XminigameSDK", "发生录屏错误：", JSON.stringify(err));
        });

        this.gameRecorder.start();
    }
    pauseGameVideo() {
        console.log("XminigameSDK", "KS 暂停录屏==================");
        this.gameRecorder && this.gameRecorder.pause();
    }
    resumeGameVideo() {
        console.log("XminigameSDK", "KS 继续录屏==================");
        this.gameRecorder && this.gameRecorder.resume();
    }
    stopGameVideo(callback) {
        this.callback_Recorder = callback;
        console.log("XminigameSDK", "KS stopGameVideo==================");
        this.gameRecorder && this.gameRecorder.stop();
    }
    shareVideo(title, desc, topics, videoPath, callback) {
        this.gameRecorder && this.gameRecorder.publishVideo({
            mouldId: title,
            video: videoPath,
            callback: (error) => {
                if (error != null && error != undefined) {
                    console.log("XminigameSDK", "KS 分享录屏失败: ", JSON.stringify(error));
                    if (error.code == -10014) console.log("XminigameSDK", "录屏时间过短");
                    callback(false);
                } else {
                    console.log("XminigameSDK", "KS 分享录屏成功");
                    callback(true);
                }
            }
        })
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
        console.log("XminigameSDK", "BL getUserInfo=====================");
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
        kwaigame.authorize({
            scope: "Scope.userInfo",
            success: () => {
                console.log("XminigameSDK", "BL 授权获取用户信息成功");
            },
            fail: (error) => {
                console.log("XminigameSDK", "BL 授权获取用户信息失败：" + JSON.stringify(error));
            },
            complete: () => {
                console.log("XminigameSDK", "BL 授权获取用户信息完成");
            }
        });
        // @ts-ignore
        kwaigame.getUserInfo({
            success: (result) => {
                console.log("XminigameSDK", "获取用户信息成功：" + JSON.stringify(result));
                userInfo.head = result.userHead;
                userInfo.name = result.userName;
                userInfo.sex = result.gender;
                userInfo.power = true;
                LocalStorage.setData("avatarUrl", userInfo.head);
                LocalStorage.setData("nickName", userInfo.name);
                LocalStorage.setData("gender", userInfo.sex);
                callback(userInfo);
            },
            fail: (error) => {
                console.log("XminigameSDK", "获取用户信息失败: " + JSON.stringify(error));
                userInfo.power = false;
                callback(userInfo);
            },
            complete: () => {
                console.log("XminigameSDK", "获取用户信息完成");
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
     * 展示系统插屏
     */
    showSystemInters() {
        if (this.systemIntersAd && this.loadSucc_SystemInters) {
            console.log("XminigameSDK", "KS showSystemInters==================");
            this.systemIntersAd.show().then(() => {
                console.log("XminigameSDK", "KS 系统插屏广告展示成功==================");
            }).catch((err) => {
                console.log("XminigameSDK", "KS 系统插屏展示错误:" + JSON.stringify(err));
            })
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
