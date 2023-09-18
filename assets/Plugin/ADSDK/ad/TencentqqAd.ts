import { Node, view, CanvasComponent, director } from "cc";
import QQPrivacyAgreement from "../common/QQPrivacyAgreement";
import CheckConfig from "../utils/CheckConfig";
import GetConfig from "../utils/GetConfig";
import LocalStorage from "../utils/LocalStorage";
import { AdInterface } from "./AdInterface";

export default class TencentqqAd implements AdInterface {
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
     * 盒子广告对象
     */
    boxAd = null;
    /**
     * 盒子广告是否加载成功
     */
    loadSucc_Box = false;



    /**
     * 积木广告对象
     */
    blockAd = null;
    /**
     * 积木广告是否加载成功
     */
    loadSucc_Block = false;
    /**
     * 当前总共查询积木广告加载是否成功的次数
     */
    NUM_CheckBlockLoadSucc = 0;
    /**
     * 最多查询积木广告加载是否成功的次数
     */
    NUM_MaxCheckBlockLoadSucc = 5;
    /**
     * 积木广告的参数
     */
    param_block = {
        blockSize: 5,
        blockType: "landscape",
        blockX: 0.5,
        blockY: 0.5,
    };
    /**
     * 积木广告刷新定时器
     */
    timeout_updateBlock = null;



    /**
     * 隐私协议节点
     */
    node_privacyAgreement = null;
    /**
     * 正在展示隐私协议
     */
    isShow_PrivacyAgreement = false;


    /**
     * 广告分组
     */
    AdGroup = -1;



    /**
     * SDK画布
     */
    sdkCanvas = null;

    /**
     * 获取SDK画布
     */
    public getSdkCanvas() {
        let scene = director.getScene();
        if (this.sdkCanvas == null || scene.getChildByName("sdkCanvas") == null) {
            this.sdkCanvas = new Node("sdkCanvas");
            this.sdkCanvas.addComponent(CanvasComponent);
            scene.addChild(this.sdkCanvas);
        }
        return this.sdkCanvas;
    }


    /**
     * 创建广告
     */
    createAd() {
        console.log("XminigameSDK", GetConfig.getChannelName(), "createAd======================");
        QQPrivacyAgreement.getInstance().load();

        if (this.NUM_IntersIntervalTime > 0) this.runIntersInterval();

        if (this.SW_SystemBanner && this.ID_SystemBanner != "") this.createSystemBanner();
        if (this.SW_SystemInters && this.ID_SystemInters != "") this.createSystemInters();
        if (this.SW_Video && this.ID_Video != "") this.createVideo();
        if (this.SW_Box && this.ID_Box != "") this.createBox();
        if (this.ID_Block != "") this.createBlock();
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
        var windowWidth = Number(qq.getSystemInfoSync().windowWidth);
        // @ts-ignore
        var windowHeight = Number(qq.getSystemInfoSync().windowHeight);

        // @ts-ignore
        this.bannerAd = qq.createBannerAd({
            adUnitId: this.ID_SystemBanner,
            style: {
                left: 0,
                top: 0,
                width: (windowHeight > windowWidth) ? windowWidth : 400,//iOS似乎无法通过onResize重设banner宽高
                height: 120
            },
            testDemoType: "65"
        })

        this.bannerAd.onResize((size) => {
            if (windowHeight > windowWidth || view.getVisibleSize().height > view.getVisibleSize().width) {
                this.bannerAd.style.width = windowWidth;
                this.bannerAd.style.height = windowWidth;
            }
            else {
                this.bannerAd.style.width = windowWidth / 2;
                this.bannerAd.style.height = windowWidth / 2;
            }
            this.bannerAd.style.top = windowHeight - size.height;
            this.bannerAd.style.left = (windowWidth - size.width) / 2;
        })

        this.bannerAd.onLoad(() => {
            console.log("XminigameSDK", "QQ banner加载成功");
            this.loadSucc_SystemBanner = true;
            if (this.hasShowBanner) {
                this.showSystemBanner();
            }
        })

        this.bannerAd.onError((err) => {
            console.log("XminigameSDK", "QQ banner加载失败：", JSON.stringify(err))
        })
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
        this.systemIntersAd = qq.createInterstitialAd({
            adUnitId: this.ID_SystemInters
        });

        //监听插屏广告加载完成
        this.systemIntersAd.onLoad(() => {
            console.log("XminigameSDK", "QQ 系统插屏广告加载完成")
            this.loadSucc_SystemInters = true
        })

        //监听插屏广告加载出错
        this.systemIntersAd.onError(err => {
            console.log("XminigameSDK", "QQ 系统插屏广告加载失败：" + JSON.stringify(err))
            this.loadSucc_SystemInters = false;
            setTimeout(() => {
                this.systemIntersAd && this.systemIntersAd.load()
            }, 30 * 1000)
        })

        // 监听插屏广告关闭
        this.systemIntersAd.onClose(() => {
            this.NUM_IntersNowIntervalTime = 0;
        })

        // 加载一次
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
        this.videoAd = qq.createRewardedVideoAd({
            adUnitId: this.ID_Video
        })

        //监听视屏广告加载完成
        this.videoAd.onLoad(() => {
            console.log("XminigameSDK", "QQ 视频广告加载完成")
            this.loadSucc_Video = true;
        })

        //监听视屏广告加载出错
        this.videoAd.onError(err => {
            console.log("XminigameSDK", "QQ 视频加载失败：", JSON.stringify(err))
            this.loadSucc_Video = false;
            setTimeout(() => {
                this.videoAd && this.videoAd.load()
            }, 30 * 1000)
        })

        //监听视屏广告播放完成
        this.videoAd.onClose(res => {
            setTimeout(() => {
                if (res.isEnded) {
                    console.log("XminigameSDK", "QQ 激励视频广告完成，发放奖励")
                    if (this.callback_Video) {
                        this.callback_Video(true);
                        this.videoAd.load();
                    }
                } else {
                    console.log("XminigameSDK", "QQ 激励视频广告取消，不发放奖励")
                    if (this.callback_Video) {
                        this.callback_Video(false);
                        this.videoAd.load();
                    }
                }
            }, 500);
        })

        // 加载一次
        this.videoAd.load();
    }

    /**
     * 创建盒子广告
     */
    createBox() {
        console.log("XminigameSDK", "--createBox--");
        if (CheckConfig.stringHasSpace(this.ID_Box)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道盒子广告ID中含有空字符串,请检查后台盒子广告ID*********************");
            return;
        }

        // @ts-ignore
        this.boxAd = qq.createAppBox({
            adUnitId: this.ID_Box
        });

        // 加载盒子广告
        this.boxAd.load().then(() => {
            console.log("XminigameSDK", "QQ 加载盒子广告完成===================");
            this.loadSucc_Box = true;
        })

        // 监听用户关闭盒子广告
        this.boxAd.onClose(() => {
            console.log("XminigameSDK", "QQ 关闭盒子广告");
            this.boxAd.load().then(() => {
                console.log("XminigameSDK", "QQ 加载盒子广告完成===================");
                this.loadSucc_Box = true;
            })
        })
    }

    /**
     * 创建积木广告
     */
    createBlock() {
        console.log("XminigameSDK", "--createBlock--");
        if (CheckConfig.stringHasSpace(this.ID_Block)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道积木广告ID中含有空字符串,请检查后台积木广告ID*********************");
            return;
        }

        console.log("XminigameSDK", "this.param_block:", JSON.stringify(this.param_block));

        // @ts-ignore
        let windowWidth = Number(qq.getSystemInfoSync().windowWidth);
        // @ts-ignore
        let windowHeight = Number(qq.getSystemInfoSync().windowHeight);

        // @ts-ignore
        this.blockAd = qq.createBlockAd({
            adUnitId: this.ID_Block,
            size: this.param_block.blockSize,
            orientation: this.param_block.blockType,
            style: {
                left: windowWidth * this.param_block.blockX,
                top: windowHeight * this.param_block.blockY
            },
        })

        // 监听积木广告加载
        this.blockAd.onLoad(() => {
            console.log("XminigameSDK", "QQ 积木广告加载成功");
            this.loadSucc_Block = true;
        })

        // 监听积木广告错误
        this.blockAd.onError((err) => {
            this.NUM_CheckBlockLoadSucc++;
            console.log("XminigameSDK", this.NUM_CheckBlockLoadSucc, "QQ 积木广告加载失败：", JSON.stringify(err));
            if (this.NUM_CheckBlockLoadSucc >= this.NUM_MaxCheckBlockLoadSucc) return;
            this.loadSucc_Block = false;
            setTimeout(() => {
                this.createBlock();
            }, 20 * 1000);
        })
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
        return this.loadSucc_SystemInters || (this.SW_AddDesktop && this.NUM_AutoAddDeskMostTimes > 0);
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

    showVideo(videoCallback, reason?) {
        if (this.videoAd && this.loadSucc_Video) {
            this.callback_Video = videoCallback;
            console.log("XminigameSDK", "QQ showVideo========================")
            this.loadSucc_Video = false;
            this.videoAd.show()
                .then(() => {
                    console.log("XminigameSDK", "QQ 激励视频广告显示成功");
                })
                .catch(err => {
                    console.log("XminigameSDK", "QQ 激励视频广告组件出现问题", JSON.stringify(err));
                    // 可以手动加载一次
                    this.videoAd.load().then(() => {
                        console.log("XminigameSDK", "QQ 激励视频广告手动加载成功");
                        // 加载成功后需要再显示广告
                        this.videoAd.show().catch(err => {
                            console.log("XminigameSDK", "QQ 激励视频广告播放失败", JSON.stringify(err));
                            this.callback_Video(false);
                        });
                    }).catch(err => {
                        console.log("XminigameSDK", "QQ 激励视频广告手动加载失败：", JSON.stringify(err));
                        this.callback_Video(false);
                        this.videoAd.load();
                    });
                });
        }
        else {
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
        // @ts-ignore
        qq.shareAppMessage({
            shareAppType: "qqFastShareList"
        })
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
        this.AdGroup = group;
        QQPrivacyAgreement.getInstance().setGroup(group);
    }

    hasAddDesktopFunc() {
        return true;
    }

    getAddDesktopFlag(callback) {
        callback(true);
    }

    addDesktop(callback) {
        // @ts-ignore
        qq.saveAppToDesktop({
            success: function () {
                console.log("XminigameSDK", "QQ 创建桌面图标成功")
                // 执行用户创建图标奖励
                callback(true);
            },
            fail: function (err) {
                console.log("XminigameSDK", "QQ 创建桌面图标失败：", JSON.stringify(err));
                callback(false);
            },
            complete: function () { }
        })
    }

    phoneVibrate(type) {
        if (type == "long") {
            // @ts-ignore
            qq.vibrateLong({
                success(res) {
                },
                fail(res) {
                    console.log("XminigameSDK", "QQ vibrateLong调用失败：", JSON.stringify(res));
                }
            });
        }
        else if (type == "short") {
            // @ts-ignore
            qq.vibrateShort({
                success(res) {
                },
                fail(res) {
                    console.log("XminigameSDK", "QQ vibrateShort调用失败：", JSON.stringify(res));
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
        console.log("XminigameSDK", "QQ getUserData=====================");
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
        return this.loadSucc_Box;
    }

    showAppBox() {
        if (this.loadSucc_Box && this.boxAd) {
            console.log("XminigameSDK", "QQ 展示盒子广告=====================");
            this.boxAd.show();
        }
    }

    getBlockFlag() {
        return this.loadSucc_Block;
    }

    showBlock(type, x, y, blockSize) {

        this.param_block = {
            blockX: x,
            blockY: y,
            blockType: type,
            blockSize: blockSize,
        }
        if (this.ID_Block != "") this.createBlock();
        setTimeout(() => {
            console.log("XminigameSDK", "QQ showBlock=====================");
            this.blockAd.show();
        }, 500);
        this.timeout_updateBlock =
            setTimeout(() => {
                console.log("XminigameSDK", "QQ updateBlock=====================");
                this.blockAd.destroy();
                this.showBlock(type, x, y, blockSize);
            }, 30 * 1000)
    }

    hideBlock() {
        if (this.blockAd) {
            console.log("XminigameSDK", "QQ hideBlock=====================");
            this.blockAd.destroy();
        }
        if (this.timeout_updateBlock) clearTimeout(this.timeout_updateBlock);
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
        console.log("XminigameSDK", "QQ openProtocol==================");
        QQPrivacyAgreement.getInstance().open();
    }

    openServiceAgreement() {
        console.log("XminigameSDK", "QQ openServiceAgreement==================");
        QQPrivacyAgreement.getInstance().openServiceAgreement();
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
        if (LocalStorage.getData("agreePrivacy") == "true") {
            console.log("XminigameSDK", "已经同意隐私协议,不再展示,直接回调true");
            callback(true);
            return;
        }
        LocalStorage.setData("privacyAgreementCompany", companyLogUrl);
        if (this.isShow_PrivacyAgreement) {
            console.log("XminigameSDK", "已经调用过showPrivacyAgreement,请勿重复调用");
            return;
        }
        this.isShow_PrivacyAgreement = true;

        console.log("XminigameSDK", "QQ showPrivacyAgreement==================");

        QQPrivacyAgreement.getInstance().show(callback);
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
            console.log("XminigameSDK", "QQ showSystemBanner========================");
            this.hasShowBanner = true;
            this.bannerAd.show();
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
                console.log("XminigameSDK", "QQ updateSystemBanner========================");
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
            console.log("XminigameSDK", "QQ hideSystemBanner========================");
            this.bannerAd.hide();
        }

        if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
    }

    /**
     * 展示系统插屏
     */
    showSystemInters() {
        if (this.systemIntersAd && this.loadSucc_SystemInters) {
            console.log("XminigameSDK", "QQ showSystemBanner========================");
            this.systemIntersAd.show();
        }
    }



    /**
     * 设置该节点本身和所有子节点的分组
     */
    setChildrenNodeLayer(node: Node) {
        if (this.AdGroup == -1) return;
        node.layer = 1 << (this.AdGroup);
        let children = node.children;
        for (let i = 0; i < children.length; ++i) {
            this.setChildrenNodeLayer(children[i])
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



    hidePrivacyAgreement() {
        this.isShow_PrivacyAgreement = false;
        if (this.node_privacyAgreement) {
            console.log("XminigameSDK", "QQ hidePrivacyAgreement==================");
            this.node_privacyAgreement.removeFromParent();
            this.node_privacyAgreement = null;
        }
    }


}
