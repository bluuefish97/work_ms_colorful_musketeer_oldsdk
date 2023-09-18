import { director, view, Node, CanvasComponent, SpriteComponent, SpriteFrame, BlockInputEventsComponent, Color, LabelComponent, UITransformComponent, Vec3, WidgetComponent, UIOpacityComponent, MaskComponent, tween } from "cc";
import PrivacyAgreement from "../common/PrivacyAgreement";
import CheckConfig from "../utils/CheckConfig";
import GetConfig from "../utils/GetConfig";
import LoadRes from "../utils/LoadRes";
import LocalStorage from "../utils/LocalStorage";
import { AdInterface } from "./AdInterface";

export default class VivoAd implements AdInterface {
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
     * 原生模板插屏广告开关
     */
    SW_NativeTemplate = false;
    /**
     * 原生模板banner广告开关
     */
    SW_NativeTemplateBanner = false;


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
     * 原生模板插屏广告ID
     */
    ID_NativeTemplate = "";
    /**
     * 原生模板banner广告ID
     */
    ID_NativeTemplateBanner = "";


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
     * 互推区域************************************
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
     * banner加载成功(系统banner或者原生banner)
     */
    loadSucc_Banner = false;
    /**
     * 系统banner加载成功
     */
    loadSucc_SystemBanner = false;
    /**
     * 原生banner加载成功
     */
    loadSucc_NativeBanner = false;
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
     * banner已经被用户关闭的次数
     */
    NUM_BannerClose = 0;
    /**
     * 系统banner延时展示定时器
     */
    timeout_showSystemBanner = null;



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
     * 延迟加载视频定时器
     */
    timeout_loadVideo = null;
    /**
     * 视频广告加载错误延时
     */
    timeout_videoLoadErr = null;



    /**
     * 其他原生资源
     */
    nativeOtherRes = null;
    /**
     * 其他原生资源是否加载成功
     */
    loadSucc_NativeOther = false;

    /**
     * 原生banner资源
     */
    nativeBannerRes = null;
    /**
     * 原生banner节点
     */
    node_nativeBanner: Node = null;



    /**
     * 原生插屏资源
     */
    nativeIntersRes = null;
    /**
     * 原生插屏资源是否加载成功
     */
    loadSucc_NativeInters = false;
    /**
     * 原生插屏节点
     */
    node_nativeInters: Node = null;



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
     * 互推盒子横幅广告对象
     */
    navigateBoxBannerAd = null;
    /**
     * 互推盒子横幅广告是否加载成功
     */
    loadSucc_NavigateBoxBanner = false;
    /**
     * 互推盒子九宫格广告对象
     */
    navigateBoxPortalAd = null;
    /**
     * 互推盒子九宫格广告是否加载成功
     */
    loadSucc_NavigateBoxPortal = false;
    /**
     * 临时保存 互推盒子九宫格/原生插屏出现前是否调用过showBanner
     */
    temp_hasShowBanner = false;



    /**
     * 插屏关闭后的回调
     */
    callback_IntersClose = null;



    /**
     * 原生模板插屏广告对象
     */
    nativeTemplateIntersAd = null;
    /**
     * 原生模板广告是否加载完成
     */
    loadSucc_NativeTemplate = false;
    /**
     * 原生模板广告是否加载完成
     */
    loadSucc_NativeTemplateRes = false;
    /**
     * 原生模板插屏资源
     */
    nativeTemplateRes = null;
    /**
     * 原生模板背景节点
     */
    node_nativeTemplate: Node = null;



    /**
     * 隐私协议节点
     */
    node_privacyAgreement = null;
    /**
     * 正在展示隐私协议
     */
    isShow_PrivacyAgreement = false;



    /**
     * 原生广告多id
     */
    ID_NativeArray = [];
    /**
     * 原生广告多id当前索引
     */
    index_NativeID = 0;
    /**
     * 原生广告加载错误次数
     */
    loadNativeErrorTimes = 0;
    /**
     * 原生广告拉取到的广告id
     */
    nativeAdPullAdId = [];



    /**
     * 原生大图广告
     */
    /**
     * 原生大图多广告id
     */
    ID_NativeImageArray = [];
    /**
     * 原生大图多广告id当前索引
     */
    index_NativeImageID = 0;
    /**
     * 原生大图广告加载错误次数
     */
    loadNativeImageErrorTimes = 0;
    /**
     * 原生大图广告对象
     */
    nativeImageAd = null;
    /**
     * 原生大图广告info
     */
    nativeImageAdInfo = null;
    /**
     * 原生大图广告是否加载成功
     */
    loadSucc_NativeImage = false;
    /**
     * 研发获取原生大图广告信息
     */
    secondNativeImageAdInfo = null;



    /**
     * 原生大图广告组件
     */
    /**
     * 原生大图节点
     */
    node_nativeImage = null;



    /**
     * 原生广告
     */
    /**
     * 原生广告对象
     */
    nativeAd = null;
    /**
     * 原生广告是否加载成功
     */
    loadSucc_NativeAd = false;
    /**
     * 原生广告信息
     */
    nativeAdInfo = null;
    /**
     * 研发获取原生广告信息
     */
    firstNativeAdInfo = null;



    /**
     * 原生icon广告组件
     */
    /**
     * 原生icon广告是否加载成功(根据原生广告是否加载到原生icon)
     */
    loadSucc_NativeIcon = false;
    /**
     * 保存原生icon展示时的位置
     */
    param_nativeIcon = null;
    /**
     * 原生icon刷新定时器
     */
    timeout_updateNativeIcon = null;
    /**
     * 原生icon节点
     */
    node_nativeIcon = null;





    /**
     * 原生模板banner广告对象
     */
    nativeTemplateBannerAd = null;
    /**
     * 原生模板banner广告是否加载完成
     */
    loadSucc_NativeTemplateBanner = false;
    /**
     * 原生模板banner延时展示定时器
     */
    timeout_showNativeTemplateBanner = null;
    /**
     * 原生模板banner节点
     */
    node_nativeTemplateBanner = null;
    /**
     * 原生模板banner被原生模板插屏关闭
     */
    nativeTemplateBannerBeHideByNativeTemplateInters = false;






    /**
     * 正在展示系统banner
     */
    isShow_SystemBanner = false;
    /**
     * 正在展示原生banner
     */
    isShow_NativeBanner = false;
    /**
     * 是否正在展示原生icon
     */
    isShow_NativeIcon = false;
    /**
     * 是否正在展示原生大图
     */
    isShow_NativeImage = false;
    /**
     * 正在展示结算互推(互推盒子)
     */
    isShow_NavigateSettle = false;
    /**
     * 正在展示原生插屏
     */
    isShow_NativeInters = false;
    /**
     * 视频广告是否正在播放
     */
    isShow_Video = false;
    /**
     * 是否正在展示原生模板banner
     */
    isShow_NativeTemplateBanner = false;
    /**
     * 是否正在展示原生模板插屏
     */
    isShow_NativeTemplateInters = false;




    /**
     * 系统banner创建延时器
     */
    timeout_createSystemBanner = null;



    /**
     * 原生模板插屏创建延时器
     */
    timeout_createNativeTemplateInters = null;
    /**
     * 原生模板插屏超时未加载成功时间
     */
    loadFailTime_NativeTemplateInters = -1;



    /**
     * 展示banner广告类型
     */
    bannerType = 0;
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
        PrivacyAgreement.getInstance().load();

        if (this.SW_SystemBanner && this.ID_SystemBanner != "") this.createSystemBanner();
        if (this.SW_SystemInters && this.ID_SystemInters != "") this.createSystemInters();
        if (this.SW_Box && this.ID_Box != "") this.createNavigateBoxPortal();
        if (this.SW_Box && this.ID_Block != "") this.createNavigateBoxBanner();
        if (this.SW_Video && this.ID_Video != "") this.createVideo();
        if (this.SW_NativeTemplate && this.ID_NativeTemplate != "") {
            this.createNativeTemplate();
            this.loadNativeTemplateRes();
            this.runNativeTemplateInterval();
        }
        if (this.SW_NativeTemplateBanner && this.ID_NativeTemplateBanner != "") {
            setTimeout(() => {
                this.createNativeTemplateBanner();
            }, 3000);
        }
        if (this.SW_NativeBanner || this.SW_NativeTemplateBanner) this.loadNativeBannerRes();
        if (this.SW_Native && this.ID_Native != "") {
            this.ID_NativeArray = this.ID_Native.split(";");
            if (this.ID_NativeArray.length != 1) {
                this.index_NativeID = Math.floor(Math.random() * (this.ID_NativeArray.length));
            }
            this.createNative();

            if (this.SW_NativeInters) this.loadNativeInterRes();
        }
        if (this.SW_Native && this.ID_NativeImage != "") {
            this.ID_NativeImageArray = this.ID_NativeImage.split(";");
            if (this.ID_NativeImageArray.length != 1) {
                this.index_NativeImageID = Math.floor(Math.random() * (this.ID_NativeImageArray.length));
            }
            this.createNativeImage();
        }
        this.loadNativeOtherRes();

        if (this.NUM_IntersIntervalTime > 0) this.runIntersInterval();
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
        this.bannerAd = qg.createBannerAd({
            posId: this.ID_SystemBanner,
            style: {}
        });

        this.bannerAd.onLoad(() => {
            this.loadSucc_SystemBanner = true;
            console.log("XminigameSDK", "VIVO 系统banner加载成功");
        })


        this.bannerAd.onError((err) => {
            console.log("XminigameSDK", "VIVO 系统banner加载失败：", JSON.stringify(err));
            this.loadSucc_SystemBanner = false;
            if (err.errCode == 30007) {
                console.log("XminigameSDK", "VIVO 系统banner广告播放次数已达限制");
                this.hideSystemBanner();
                this.showBanner();
                return;
            }
            if (this.timeout_createSystemBanner != null) return;
            this.timeout_createSystemBanner =
                setTimeout(() => {
                    this.createSystemBanner();
                    this.timeout_createSystemBanner = null;
                }, 5000);
        })

        // 监听系统banner隐藏
        this.bannerAd.onClose(() => {
            console.log("XminigameSDK", "VIVO 系统banner关闭", this.NUM_BannerUpdateTime + "S之后再次刷新");
            this.NUM_BannerClose++;
            // this.updateBanner();
            // 每个场景用户关闭就不再出现
            this.hideBanner();
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
        this.systemIntersAd = qg.createInterstitialAd({
            posId: this.ID_SystemInters
        })

        //监听插屏加载完成
        this.systemIntersAd.onLoad(() => {
            console.log("XminigameSDK", "VIVO 系统插屏广告加载完成")
            this.loadSucc_SystemInters = true;
        })

        //监听插屏广告错误
        this.systemIntersAd.onError(err => {
            this.NUM_SystemIntersLoadError++;
            this.loadSucc_SystemInters = false;
            console.log("XminigameSDK", this.NUM_SystemIntersLoadError, "VIVO 系统插屏加载失败：", JSON.stringify(err))
            if (this.NUM_SystemIntersLoadError < 5) {
                setTimeout(() => {
                    this.createSystemInters();
                }, 10 * 1000);
            }
        })

        //监听插屏广告关闭
        this.systemIntersAd.onClose(() => {
            console.log("XminigameSDK", "VIVO 系统插屏广告关闭");
            this.NUM_IntersNowIntervalTime = 0;
            this.loadSucc_SystemInters = false;
            if (this.callback_IntersClose) this.callback_IntersClose();
            // 系统插屏关闭后10s后再次load
            setTimeout(() => {
                this.createSystemInters();
            }, 10 * 1000);
        })
    }

    /**
     * 创建互推盒子横幅广告
     */
    createNavigateBoxBanner() {
        console.log("XminigameSDK", "--createNavigateBoxBanner--");
        if (CheckConfig.stringHasSpace(this.ID_Block)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道互推盒子横幅广告ID中含有空字符串,请检查后台互推盒子横幅广告ID*********************");
            return;
        }

        // @ts-ignore
        if (!qg.createBoxBannerAd) {
            console.log("XminigameSDK", "VIVO 快应用版本较低,不支持互推盒子广告");
            return;
        }

        // @ts-ignore
        this.navigateBoxBannerAd = qg.createBoxBannerAd({
            adUnitId: this.ID_Block
        })


        // 监听互推盒子横幅广告加载失败
        this.navigateBoxBannerAd.onError((err) => {
            console.log("XminigameSDK", "VIVO 互推盒子横幅广告加载失败:", JSON.stringify(err));
        })

        // 监听互推盒子横幅广告加载成功
        this.navigateBoxBannerAd.onLoad(() => {
            console.log("XminigameSDK", '互推盒子横幅广告加载成功');
            this.loadSucc_NavigateBoxBanner = true;
        })

        // 监听互推盒子横幅广告关闭
        this.navigateBoxBannerAd.onClose(() => {
            console.log("XminigameSDK", '互推盒子横幅广告关闭');
        })
    }

    /**
     * 创建互推盒子九宫格广告
     */
    createNavigateBoxPortal() {
        console.log("XminigameSDK", "--createNavigateBoxPortal--");
        if (CheckConfig.stringHasSpace(this.ID_Box)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道互推盒子九宫格广告ID中含有空字符串,请检查后台互推盒子九宫格广告ID*********************");
            return;
        }

        // @ts-ignore
        if (!qg.createBoxPortalAd) {
            console.log("XminigameSDK", "VIVO 快应用版本较低,不支持互推盒子广告");
            return;
        }

        console.log("XminigameSDK", "可展示互推盒子九宫格广告");
        this.loadSucc_NavigateBoxPortal = true;
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
        this.videoAd = qg.createRewardedVideoAd({
            posId: this.ID_Video
        })

        //监听视频广告加载完成
        this.videoAd.onLoad(() => {
            console.log("XminigameSDK", "VIVO 视频广告加载完成")
            this.loadSucc_Video = true;
        })

        //监听视频广告加载出错
        this.videoAd.onError(err => {
            console.log("XminigameSDK", "VIVO 视频加载失败：", JSON.stringify(err))
            this.loadSucc_Video = false;

            if (this.isShow_Video) {
                this.isShow_Video = false;
                if (this.callback_Video) this.callback_Video(false);
            }
            if (this.videoAd) {
                if (this.timeout_videoLoadErr != null) return;
                this.timeout_videoLoadErr =
                    setTimeout(() => {
                        this.videoAd && this.videoAd.load()
                        clearTimeout(this.timeout_videoLoadErr);
                        this.timeout_videoLoadErr = null;
                    }, 3000)
            }
        })

        //监听视频广告播放完成
        this.videoAd.onClose((res) => {
            this.isShow_Video = false;
            if (res.isEnded) {
                console.log("XminigameSDK", "VIVO 激励视频广告完成，发放奖励")
                if (this.callback_Video) {
                    this.callback_Video(true);
                    this.callback_Video = null;
                }
            } else {
                console.log("XminigameSDK", "VIVO 激励视频广告取消关闭，不发放奖励")
                if (this.callback_Video) {
                    this.callback_Video(false);
                    this.callback_Video = null;
                }
            }
            this.loadSucc_Video = false;
            setTimeout(() => {
                this.videoAd && this.videoAd.load();
            }, 3000)
        })
    }

    /**
     * 创建原生广告
     */
    createNative() {
        console.log("XminigameSDK", "--createNative--");
        if (CheckConfig.stringHasSpace(this.ID_Native)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道原生广告ID中含有空字符串,请检查后台原生广告ID*********************");
            return;
        }

        this.ID_Native = this.ID_NativeArray[this.index_NativeID];
        console.log("XminigameSDK", "this.ID_Native:" + this.ID_Native);

        // @ts-ignore
        this.nativeAd = qg.createNativeAd({
            posId: this.ID_Native
        })

        this.nativeAdInfo = {
            adId: null,
            title: null,
            desc: null,
            Native_icon: null,
            Native_BigImage: null
        };

        this.firstNativeAdInfo = {
            adId: null,
            title: null,
            desc: null,
            Native_icon: null,
            Native_BigImage: null,
            NativeClose: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeClose.png",
            NativeAdTip: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeAdTip.png",
        };

        this.nativeAd.onLoad((res) => {

            let index = 0;
            if (typeof res.adList != undefined && res.adList.length != 0) {
                index = res.adList.length - 1;
            } else {
                console.log("XminigameSDK", "VIVO 原生广告列表为空 return");
                return;
            }

            console.log("XminigameSDK", "VIVO 原生广告加载成功：", JSON.stringify(res.adList[index]));

            if (res.adList[index].icon != "" && res.adList[index].imgUrlList.length > 0) {
                console.log("XminigameSDK", "VIVO 原生广告同时存在原生ICON和大图");
            } else {
                console.log("XminigameSDK", "VIVO 原生广告只存在原生ICON或大图");
            }

            this.firstNativeAdInfo.adId = res.adList[index].adId;
            this.firstNativeAdInfo.title = res.adList[index].title;
            this.firstNativeAdInfo.desc = res.adList[index].desc;
            this.nativeAdPullAdId.unshift(this.firstNativeAdInfo.adId);

            this.nativeAdInfo.adId = res.adList[index].adId;
            this.nativeAdInfo.title = res.adList[index].title;
            this.nativeAdInfo.desc = res.adList[index].desc;

            if (res.adList && res.adList[index].icon != "") {
                // 去掉jpg后缀
                let iconUrl = res.adList[index].icon;
                if (iconUrl.indexOf(".jpg?") != -1) {
                    iconUrl = iconUrl.substring(0, iconUrl.indexOf(".jpg?") + 4);
                }

                // 加载
                let arr = new Array();
                arr[0] = iconUrl;
                LoadRes.loadResArray(arr, (err, texture) => {
                    if (err) {
                        console.log("XminigameSDK", "VIVO 原生广告ICON加载失败");
                        this.nativeAdInfo.Native_icon = null;
                        this.loadSucc_NativeIcon = false;
                        return;
                    }
                    console.log("XminigameSDK", "VIVO 原生广告ICON加载成功");
                    this.nativeAdInfo.Native_icon = texture[0];
                    this.loadSucc_NativeIcon = true;
                });
                this.firstNativeAdInfo.Native_icon = iconUrl;
            } else {
                this.nativeAdInfo.Native_icon = null;
                this.loadSucc_NativeIcon = false;

                this.firstNativeAdInfo.Native_icon = null;
            }

            if (res.adList[index].imgUrlList.length != 0) {
                // 去掉jpg后缀
                let imgUrl = res.adList[index].imgUrlList[0];
                if (imgUrl.indexOf(".jpg?") != -1) {
                    imgUrl = imgUrl.substring(0, imgUrl.indexOf(".jpg?") + 4);
                }

                // 加载
                let arr = new Array();
                arr[0] = imgUrl;
                LoadRes.loadResArray(arr, (err, texture) => {
                    if (err) {
                        console.log("XminigameSDK", "VIVO 原生广告大图加载失败");
                        this.nativeAdInfo.Native_BigImage = null;
                        return;
                    }
                    console.log("XminigameSDK", "VIVO 原生广告大图加载成功");
                    this.nativeAdInfo.Native_BigImage = texture[0];
                });
                this.firstNativeAdInfo.Native_BigImage = imgUrl;
            } else {
                this.nativeAdInfo.Native_BigImage = null;

                this.firstNativeAdInfo.Native_BigImage = null;
            }

            this.loadSucc_NativeAd = true;
            this.loadNativeErrorTimes = 0;
            this.nativeAdAutoUpdate();
        });

        //监听原生广告加载错误
        this.nativeAd.onError((err) => {
            console.log("XminigameSDK", "VIVO 原生广告加载失败：", JSON.stringify(err));
            this.loadSucc_NativeIcon = false;
            this.loadSucc_NativeAd = false;

            this.nativeAdInfo = {
                adId: null,
                title: null,
                desc: null,
                Native_icon: null,
                Native_BigImage: null
            };

            this.firstNativeAdInfo = {
                adId: null,
                title: null,
                desc: null,
                Native_icon: null,
                Native_BigImage: null,
                NativeClose: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeClose.png",
                NativeAdTip: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeAdTip.png",
            };

            this.loadNativeErrorTimes++;
            if (this.loadNativeErrorTimes <= 10) {
                // this.nativeAd.destroy();
                this.nativeAd = null;
                setTimeout(() => {
                    this.createNative();
                }, 5000);
            } else {
                this.nativeAdAutoUpdate();
            }
        });

        if (this.index_NativeID != (this.ID_NativeArray.length - 1)) {
            this.index_NativeID++;
        } else {
            this.index_NativeID = 0;
        }

        this.nativeAd.load();
    }


    /**
     * 创建原生大图广告
     */
    createNativeImage() {
        console.log("XminigameSDK", "--createNativeImage--");
        if (CheckConfig.stringHasSpace(this.ID_NativeImage)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道原生广告ID中含有空字符串,请检查后台原生广告ID*********************");
            return;
        }

        this.ID_NativeImage = this.ID_NativeImageArray[this.index_NativeImageID];
        console.log("XminigameSDK", "this.ID_NativeImage:" + this.ID_NativeImage);

        // @ts-ignore
        this.nativeImageAd = qg.createNativeAd({
            posId: this.ID_NativeImage
        })

        this.nativeImageAdInfo = {
            adId: null,
            title: null,
            desc: null,
            Native_BigImage: null,
        };

        this.secondNativeImageAdInfo = {
            adId: null,
            title: null,
            desc: null,
            Native_icon: null,
            Native_BigImage: null,
            NativeClose: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeClose.png",
            NativeAdTip: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeAdTip.png",
        };

        this.nativeImageAd.onLoad((res) => {
            let index = 0;
            if (typeof res.adList != undefined && res.adList.length != 0) {
                index = res.adList.length - 1;
            } else {
                console.log("XminigameSDK", "VIVO 原生大图广告列表为空 return");
                return;
            }

            console.log("XminigameSDK", "VIVO 原生大图广告加载成功：", JSON.stringify(res.adList[index]))

            this.nativeImageAdInfo.adId = res.adList[index].adId;
            this.nativeImageAdInfo.title = res.adList[index].title;
            this.nativeImageAdInfo.desc = res.adList[index].desc;

            this.secondNativeImageAdInfo.adId = res.adList[index].adId;
            this.secondNativeImageAdInfo.title = res.adList[index].title;
            this.secondNativeImageAdInfo.desc = res.adList[index].desc;

            if (res.adList && res.adList[index].icon != "") {
                this.secondNativeImageAdInfo.Native_icon = res.adList[index].icon;
            } else {
                this.secondNativeImageAdInfo.Native_icon = null;
            }

            if (res.adList && res.adList[index].imgUrlList.length > 0) {
                // 去掉jpg后缀
                let imgUrl = res.adList[index].imgUrlList[0];
                if (imgUrl.indexOf(".jpg?") != -1) {
                    imgUrl = imgUrl.substring(0, imgUrl.indexOf(".jpg?") + 4);
                }

                // 加载
                let arr = new Array();
                arr[0] = imgUrl;
                LoadRes.loadResArray(arr, (err, texture) => {
                    if (err) {
                        console.log("XminigameSDK", "VIVO 原生大图广告 大图 加载失败");
                        this.nativeImageAdInfo.Native_BigImage = null;
                        this.loadSucc_NativeImage = false;
                        return;
                    }
                    console.log("XminigameSDK", "VIVO 原生大图广告 大图 加载成功");
                    this.nativeImageAdInfo.Native_BigImage = texture[0];
                    this.loadSucc_NativeImage = true;
                });
            } else {
                this.nativeImageAdInfo.Native_BigImage = null;
                this.loadSucc_NativeImage = false;
            }

            this.loadNativeErrorTimes = 0;
            this.nativeImageAdAutoUpdate();
        });

        //监听原生大图广告加载错误
        this.nativeImageAd.onError(err => {
            console.log("XminigameSDK", "VIVO 原生大图广告加载失败：", JSON.stringify(err));
            this.loadSucc_NativeImage = false;

            this.nativeImageAdInfo = {
                adId: null,
                title: null,
                desc: null,
                Native_BigImage: null,
            };

            this.secondNativeImageAdInfo = {
                adId: null,
                title: null,
                desc: null,
                Native_icon: null,
                Native_BigImage: null,
                NativeClose: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeClose.png",
                NativeAdTip: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeAdTip.png",
            };

            this.loadNativeImageErrorTimes++;
            if (this.loadNativeImageErrorTimes <= 10) {
                this.nativeImageAd.destroy();
                this.nativeImageAd = null;
                setTimeout(() => {
                    this.createNativeImage();
                }, 5000);
            } else {
                this.nativeImageAdAutoUpdate();
            }
        });

        if (this.index_NativeImageID != (this.ID_NativeImageArray.length - 1)) {
            this.index_NativeImageID++;
        } else {
            this.index_NativeImageID = 0;
        }

        this.nativeImageAd.load();
    }

    createNativeTemplate() {
        console.log("XminigameSDK", "--createNativeTemplate--");
        if (CheckConfig.stringHasSpace(this.ID_NativeTemplate)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道原生模板插屏广告ID中含有空字符串,请检查后台原生模板插屏广告ID*********************");
            return;
        }
        // @ts-ignore
        let code = qg.getSystemInfoSync().platformVersionCode;
        if (code < 1091) {
            console.log("XminigameSDK", "平台版本过低,无法展示原生模板广告");
            return;
        }

        this.nativeTemplateBannerAd && this.nativeTemplateBannerAd.destroy();
        this.loadFailTime_NativeTemplateInters = 0;

        if (this.timeout_createNativeTemplateInters) return;

        let size = view.getVisibleSize();
        let wid = size.width < size.height ? 1080 : 2340;
        let hei = size.width < size.height ? 1920 : 1080;
        this.nativeTemplateIntersAd =
            // @ts-ignore
            qg.createCustomAd({
                adUnitId: this.ID_NativeTemplate,
                style: {
                    left: (wid - (size.width < size.height ? 1080 : 1280)) / 2,
                    top: (hei - 720) / 2
                }
            })

        this.nativeTemplateIntersAd.onLoad(() => {
            console.log("XminigameSDK", "VIVO 原生模板插屏广告加载成功");
            this.loadSucc_NativeTemplate = true;
            this.loadFailTime_NativeTemplateInters = -1;
        })


        this.nativeTemplateIntersAd.onError((err) => {
            console.log("XminigameSDK", "VIVO 原生模板插屏广告加载失败：", JSON.stringify(err));
            this.loadFailTime_NativeTemplateInters = -1;
            this.timeout_createNativeTemplateInters =
                setTimeout(() => {
                    this.createNativeTemplate();
                    this.timeout_createNativeTemplateInters = null;
                }, 10000);
        })

        // 监听原生模板广告隐藏
        this.nativeTemplateIntersAd.onClose(() => {
            console.log("XminigameSDK", "VIVO 原生模板插屏广告关闭");
            this.NUM_IntersNowIntervalTime = 0;
            this.loadSucc_NativeTemplate = false;
            if (this.callback_IntersClose) this.callback_IntersClose();
            this.nativeTemplateIntersAd.destroy();
            this.node_nativeTemplate && this.node_nativeTemplate.removeFromParent();
            this.timeout_createNativeTemplateInters =
                setTimeout(() => {
                    this.createNativeTemplate();
                    this.timeout_createNativeTemplateInters = null;
                }, 3000);
            if (this.nativeTemplateBannerBeHideByNativeTemplateInters) {
                this.nativeTemplateBannerBeHideByNativeTemplateInters = false;
                this.showNativeTemplateBanner();
            }
        })
    }

    createNativeTemplateBanner() {
        console.log("XminigameSDK", "--createNativeTemplateBanner--");
        if (CheckConfig.stringHasSpace(this.ID_NativeTemplateBanner)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道原生模板banner广告ID中含有空字符串,请检查后台原生模板banner广告ID*********************");
            return;
        }
        // @ts-ignore
        let code = qg.getSystemInfoSync().platformVersionCode;
        if (code < 1091) {
            console.log("XminigameSDK", "平台版本过低,无法展示原生模板广告");
            return;
        }

        this.nativeTemplateBannerAd =
            // @ts-ignore
            qg.createCustomAd({
                adUnitId: this.ID_NativeTemplateBanner,
                style: {}
            })

        this.nativeTemplateBannerAd.onLoad(() => {
            this.loadSucc_NativeTemplateBanner = true;
            console.log("XminigameSDK", "VIVO 原生模板banner广告加载成功");
        })


        this.nativeTemplateBannerAd.onError((err) => {
            console.log("XminigameSDK", "VIVO 原生模板banner广告加载失败：", JSON.stringify(err));
            setTimeout(() => {
                this.createNativeTemplateBanner();
            }, 10000);
        })

        // 监听原生模板广告隐藏
        this.nativeTemplateBannerAd.onClose(() => {
            console.log("XminigameSDK", "VIVO 原生模板banner广告关闭");
            this.nativeTemplateBannerAd && this.nativeTemplateBannerAd.destroy();
            this.hideNativeTemplateBanner();
        })
    }

    /**
     * 加载原生banner广告资源
     */
    loadNativeBannerRes() {
        console.log("XminigameSDK", "--loadNativeBannerRes--");

        this.nativeBannerRes = {
            BannerBg: null,
            Color: null,
            BannerMask: null,
            Close: null,
            Button: null,
            AdTip: null,

            NativeBannerBg: null,
            NativeBannerButton: null,
            NativeClose: null,
            NativeAdTip: null,
        }

        let nativeBannerResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/banner/BannerBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/banner/Color.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/banner/BannerMask.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/banner/Close.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/banner/Button.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/banner/AdTip.png",

            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeBannerBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeBannerButton.png",
        ]

        LoadRes.loadResArray(nativeBannerResArr, (err, texture) => {
            this.nativeBannerRes.BannerBg = texture[0];
            this.nativeBannerRes.Color = texture[1];
            this.nativeBannerRes.BannerMask = texture[2];
            this.nativeBannerRes.Close = texture[3];
            this.nativeBannerRes.Button = texture[4];
            this.nativeBannerRes.AdTip = texture[5];

            this.nativeBannerRes.NativeBannerBg = texture[6];
            this.nativeBannerRes.NativeBannerButton = texture[7];
            this.nativeBannerRes.NativeClose = texture[3];
            this.nativeBannerRes.NativeAdTip = texture[5];
            this.loadSucc_NativeBanner = true;
            console.log("XminigameSDK", "原生banner资源加载成功");
        })
    }

    /**
     * 加载原生插屏广告资源
     */
    loadNativeInterRes() {
        console.log("XminigameSDK", "--loadNativeInterRes--");

        this.nativeIntersRes = {
            Black: null,
            Bg: null,
            TitleBg: null,
            Close: null,
            AdTip: null,
            Button: null,
            Slide: null,
        }

        let nativeIntersResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/inters/Black.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/inters/Bg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/inters/TitleBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/inters/Close.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/inters/AdTip.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/inters/ViewAds.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/inters/Slide.png",
        ]

        LoadRes.loadResArray(nativeIntersResArr, (err, texture) => {
            this.nativeIntersRes.Black = texture[0];
            this.nativeIntersRes.Bg = texture[1];
            this.nativeIntersRes.TitleBg = texture[2];
            this.nativeIntersRes.Close = texture[3];
            this.nativeIntersRes.AdTip = texture[4];
            this.nativeIntersRes.Button = texture[5];
            this.nativeIntersRes.Slide = texture[6];
            this.loadSucc_NativeInters = true;
            console.log("XminigameSDK", "原生插屏资源加载成功");
        })
    }

    /**
     * 加载其他原生广告资源(原生大图、原生ICON的关闭,广告角标)
     */
    loadNativeOtherRes() {
        console.log("XminigameSDK", "--loadNativeOtherRes--");

        this.nativeOtherRes = {
            Bg: null,
            Color: null,
            Close: null,
            AdTip: null,
            Button: null,

            NativeAdTip: null,
            NativeClose: null,
        }

        let nativeOtherResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/image/Bg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/image/Color.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/image/Close.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/image/AdTip.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/image/Button.png",
        ]

        LoadRes.loadResArray(nativeOtherResArr, (err, texture) => {
            this.nativeOtherRes.Bg = texture[0];
            this.nativeOtherRes.Color = texture[1];
            this.nativeOtherRes.Close = texture[2];
            this.nativeOtherRes.AdTip = texture[3];
            this.nativeOtherRes.Button = texture[4];

            this.nativeOtherRes.NativeAdTip = texture[3];
            this.nativeOtherRes.NativeClose = texture[2];
            this.loadSucc_NativeOther = true;
            console.log("XminigameSDK", "其他原生资源加载成功");
        })

    }


    /**
     * 加载原生模板广告资源
     */
    loadNativeTemplateRes() {
        console.log("XminigameSDK", "--loadNativeTemplateRes--");

        this.nativeTemplateRes = {
            Bg: null,
        }

        let nativeTemplateResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/inters/Black.png",
        ]

        LoadRes.loadResArray(nativeTemplateResArr, (err, texture) => {
            this.nativeTemplateRes.Bg = texture[0];
            this.loadSucc_NativeTemplateRes = true;
            console.log("XminigameSDK", "其他原生资源加载成功");
        })
    }


    getChannelId() {
        return GetConfig.getChannelId();
    }

    showBanner(type?) {
        if (type != undefined && type != null) this.bannerType = type;

        if (!this.loadSucc_Banner) {
            this.checkBannerLoadSucc();
            return;
        }

        if (this.NUM_BannerMostShow <= this.NUM_BannerClose) {
            console.log("XminigameSDK", "banner最大关闭次数", this.NUM_BannerMostShow, " 已达上限 return");
            // 清除banner刷新定时器
            if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
            return;
        }

        if (this.isShow_NavigateSettle) {
            console.log("XminigameSDK", "VIVO 正在展示互推盒子 return");
            return;
        }

        if (this.isShow_NativeInters) {
            console.log("XminigameSDK", "正在展示原生插屏");
            return;
        }

        // 已经调用过showBanner
        if (this.hasShowBanner) {
            console.log("XminigameSDK", "已经调用过showBanner,请勿重复调用");
            return;
        }
        this.hasShowBanner = true;

        // 两个开关同时打开
        if (this.SW_SystemBanner && (this.SW_NativeBanner || this.SW_NativeTemplateBanner)) {
            if (this.SW_SystemBannerFirst) {
                console.log("XminigameSDK", "系统banner优先");
                if (this.loadSucc_SystemBanner) {
                    this.showSystemBanner();
                } else if ((this.loadSucc_NativeBanner && this.loadSucc_NativeAd) || this.loadSucc_NativeTemplateBanner) {
                    console.log("XminigameSDK", "系统banner未加载完成,改为展示原生banner");
                    if (this.loadSucc_NativeBanner && this.loadSucc_NativeAd) {
                        this.showNativeBanner();
                    } else {
                        this.showNativeTemplateBanner();
                    }
                }
            } else {
                console.log("XminigameSDK", "原生banner优先");
                if ((this.loadSucc_NativeBanner && this.loadSucc_NativeAd) || this.loadSucc_NativeTemplateBanner) {
                    if (this.loadSucc_NativeBanner && this.loadSucc_NativeAd) {
                        this.showNativeBanner();
                    } else {
                        this.showNativeTemplateBanner();
                    }
                } else if (this.loadSucc_SystemBanner) {
                    console.log("XminigameSDK", "原生banner未加载完成,改为展示系统banner");
                    this.showSystemBanner();
                }
            }
        } else if (this.SW_SystemBanner) {
            this.showSystemBanner();
        } else if ((this.SW_NativeBanner && this.ID_Native != "") || (this.SW_NativeTemplateBanner && this.ID_NativeTemplateBanner != "")) {
            if (this.SW_NativeBanner && this.ID_Native != "") {
                this.showNativeBanner();
            } else {
                this.showNativeTemplateBanner();
            }
        }
        // 刷新Banner
        this.updateBanner();
    }

    hideBanner() {
        this.hasShowBanner = false;
        this.hideNativeBanner();
        this.hideNativeTemplateBanner();
        this.hideSystemBanner();
        if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
        if (this.timeout_showSystemBanner) clearTimeout(this.timeout_showSystemBanner);
        if (this.timeout_showNativeTemplateBanner) clearTimeout(this.timeout_showNativeTemplateBanner);
        if (this.timeout_checkBannerLoadSucc) clearTimeout(this.timeout_checkBannerLoadSucc);
    }

    getIntersFlag() {
        return (this.loadSucc_NativeInters && this.loadSucc_NativeAd) || this.loadSucc_SystemInters || this.loadSucc_NativeTemplate;
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
        let type = "3";
        // 生成一个1-100的随机数(判断展示插屏)
        let randomNumInters = Math.floor(Math.random() * 100);
        console.log("XminigameSDK", "randomNumInters:" + randomNumInters + " this.NUM_NativeTemplateP:" + this.NUM_NativeTemplateP);
        if (randomNumInters <= this.NUM_NativeTemplateP) {
            if (this.loadSucc_NativeTemplate) {
                type = "1";
            }
        } else if (randomNumInters <= (this.NUM_NativeTemplateP + this.NUM_NativeIntersP)) {
            if (this.loadSucc_NativeInters && this.loadSucc_NativeAd) {
                type = "2";
            }
        }

        console.log("XminigameSDK", "hasDelay:" + hasDelay + " intersType:" + type);


        let showFunc = (t) => {
            if (t == "1") {
                this.showNativeTemplateInters();
            } else if (t == "2") {
                this.showNativeInters();
            } else {
                this.showSystemInters();
            }
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
            console.log("XminigameSDK", "VIVO showVideo===========================");
            this.isShow_Video = true;
            this.callback_Video = videoCallback;
            this.videoAd.show();
        }
    }

    getNativeIconFlag() {
        return this.loadSucc_NativeOther && this.loadSucc_NativeIcon;
    }

    showNativeIcon(width, height, x, y) {
        if (!this.loadSucc_NativeIcon || !this.loadSucc_NativeOther) {
            console.log("XminigameSDK", "原生icon或资源未加载成功 return");
            return;
        }

        if (this.isShow_NativeIcon) {
            console.log("XminigameSDK", "原生icon正在展示中,请勿多次show return");
            return;
        }
        this.isShow_NativeIcon = true;

        this.param_nativeIcon = {
            width: width,
            height: height,
            x: x,
            y: y,
        }

        console.log("XminigameSDK", "showNativeIcon===========================");

        // 上报原生广告展示
        let tempid = this.nativeAdInfo.adId;
        this.reportNativeAdShow(tempid);

        // icon
        this.node_nativeIcon = new Node("node_nativeIcon");
        this.getSdkCanvas().addChild(this.node_nativeIcon);
        this.node_nativeIcon.addComponent(SpriteComponent);
        let spriteFrameNode_nativeIcon = new SpriteFrame();
        spriteFrameNode_nativeIcon.texture = this.nativeAdInfo.Native_icon;
        this.node_nativeIcon.getComponent(SpriteComponent).spriteFrame = spriteFrameNode_nativeIcon;
        let node_nativeIconWidth = width;
        let node_nativeIconHeight = height;

        this.node_nativeIcon.getComponent(UITransformComponent).setContentSize(node_nativeIconWidth, node_nativeIconHeight);
        let node_nativeIconX = x;
        let node_nativeIconY = y;
        this.node_nativeIcon.setPosition(node_nativeIconX, node_nativeIconY);
        this.node_nativeIcon.getComponent(UITransformComponent).priority = 30000;

        // 广告角标
        var NativeAdTip = new Node("NativeAdTip");
        this.node_nativeIcon.addChild(NativeAdTip);
        NativeAdTip.addComponent(SpriteComponent);
        let spriteFrameNativeAdTip = new SpriteFrame();
        spriteFrameNativeAdTip.texture = this.nativeOtherRes.NativeAdTip;
        NativeAdTip.getComponent(SpriteComponent).spriteFrame = spriteFrameNativeAdTip;
        let NativeAdTipWidth = width / 3;
        let NativeAdTipHeight = NativeAdTipWidth / 70 * 34;
        NativeAdTip.getComponent(UITransformComponent).setContentSize(NativeAdTipWidth, NativeAdTipHeight);
        let NativeAdTipX = width / 2 - NativeAdTipWidth / 2;
        let NativeAdTipY = height / 2 - NativeAdTipHeight / 2;
        NativeAdTip.setPosition(NativeAdTipX, NativeAdTipY);

        // 关闭按钮
        var NativeClose = new Node("NativeClose");
        this.node_nativeIcon.addChild(NativeClose);
        NativeClose.addComponent(SpriteComponent);
        let spriteFrameNativeClose = new SpriteFrame();
        spriteFrameNativeClose.texture = this.nativeOtherRes.NativeClose;
        NativeClose.getComponent(SpriteComponent).spriteFrame = spriteFrameNativeClose;
        let NativeCloseWidth = 45;
        let NativeCloseHeight = 45;

        NativeClose.getComponent(UITransformComponent).setContentSize(NativeCloseWidth, NativeCloseHeight);
        let NativeCloseX = -node_nativeIconWidth / 2 + NativeCloseWidth / 2;
        let NativeCloseY = node_nativeIconHeight / 2 - NativeCloseWidth / 2;
        NativeClose.setPosition(NativeCloseX, NativeCloseY);
        // 防止触摸冒泡
        NativeClose.addComponent(BlockInputEventsComponent);

        // 文本
        var titleLabel = new Node("titleLabel");
        this.node_nativeIcon.addChild(titleLabel);
        titleLabel.addComponent(LabelComponent);
        if (view.getVisibleSize().width < view.getVisibleSize().height) {
            titleLabel.getComponent(LabelComponent).fontSize = 40 * (view.getDesignResolutionSize().width / 1080);
        } else {
            titleLabel.getComponent(LabelComponent).fontSize = 40 * (view.getDesignResolutionSize().height / 1080);
        }
        if (this.nativeAdInfo.title.length <= 5) {
            titleLabel.getComponent(LabelComponent).string = this.nativeAdInfo.title;
        } else {
            titleLabel.getComponent(LabelComponent).string = "";
        }
        let titleLabelY = -height / 2 - 30;
        titleLabel.setPosition(0, titleLabelY);
        titleLabel.getComponent(LabelComponent).color = new Color(0xFF, 0xFF, 0xFF);

        //关闭原生ICON广告
        NativeClose.on(Node.EventType.TOUCH_START, (event) => {
            console.log("XminigameSDK", "手动关闭原生ICON");
            this.node_nativeIcon.removeFromParent();
            this.node_nativeIcon = null;
        })

        //点击原生广告
        this.node_nativeIcon.on(Node.EventType.TOUCH_START, (event) => {
            console.log("XminigameSDK", "点击原生ICON");
            this.reportNativeAdClick(tempid);
        });

        this.setChildrenNodeLayer(this.node_nativeIcon);


        // 刷新原生icon
        this.timeout_updateNativeIcon = setTimeout(() => {
            console.log("XminigameSDK", "原生icon刷新");
            this.hideNativeIcon();
            this.showNativeIcon(this.param_nativeIcon.width, this.param_nativeIcon.height, this.param_nativeIcon.x, this.param_nativeIcon.y);
        }, this.NUM_NativeUpdateTime * 1000);

    }

    hideNativeIcon() {
        this.isShow_NativeIcon = false;
        if (this.timeout_updateNativeIcon) {
            clearTimeout(this.timeout_updateNativeIcon);
        }
        if (this.node_nativeIcon) {
            console.log("XminigameSDK", "VIVO hideNativeIcon===========================");
            this.node_nativeIcon.removeFromParent();
            this.node_nativeIcon = null;
        }
    }

    getNativeImageFlag() {
        return this.loadSucc_NativeOther && this.loadSucc_NativeImage;
    }

    showNativeImage(width, height, x, y, type?, hideCallback?) {
        if (!this.loadSucc_NativeImage || !this.loadSucc_NativeOther) {
            console.log("XminigameSDK", "原生大图或资源未加载成功 return");
            return;
        }

        if (this.isShow_NativeImage) {
            console.log("XminigameSDK", "原生大图正在展示中,请勿多次show");
            return;
        }
        this.isShow_NativeImage = true;

        console.log("XminigameSDK", "VIVO showNativeImage===========================");

        if (type == 1) {
            this.showNewNativeImage(1, hideCallback);
            return;
        }

        let tempid = this.nativeImageAdInfo.adId;
        this.reportNativeImageAdShow(tempid);

        this.node_nativeImage = new Node("node_nativeImage");
        this.getSdkCanvas().addChild(this.node_nativeImage);
        this.node_nativeImage.addComponent(SpriteComponent);
        let spriteFrameNative_BigImage = new SpriteFrame();
        spriteFrameNative_BigImage.texture = this.nativeImageAdInfo.Native_BigImage;
        this.node_nativeImage.getComponent(SpriteComponent).spriteFrame = spriteFrameNative_BigImage;

        this.node_nativeImage.getComponent(UITransformComponent).priority = 30000;
        this.node_nativeImage.getComponent(UITransformComponent).setContentSize(width, height);
        this.node_nativeImage.setPosition(x, y);


        let NativeAdTip: Node = new Node("NativeAdTip");
        this.node_nativeImage.addChild(NativeAdTip);
        NativeAdTip.addComponent(SpriteComponent);
        let spriteFrameNativeAdTip = new SpriteFrame();
        spriteFrameNativeAdTip.texture = this.nativeOtherRes.NativeAdTip;
        NativeAdTip.getComponent(SpriteComponent).spriteFrame = spriteFrameNativeAdTip;
        NativeAdTip.addComponent(WidgetComponent);
        NativeAdTip.getComponent(WidgetComponent).isAlignLeft = true;
        NativeAdTip.getComponent(WidgetComponent).isAlignTop = true;
        NativeAdTip.getComponent(WidgetComponent).left = 0;
        NativeAdTip.getComponent(WidgetComponent).top = 0;

        NativeAdTip.getComponent(UITransformComponent).setContentSize(width / 5, width / 10);

        let NativeClose: Node = new Node("NativeClose");
        this.node_nativeImage.addChild(NativeClose);
        NativeClose.addComponent(SpriteComponent);
        let spriteFrameNativeClose = new SpriteFrame();
        spriteFrameNativeClose.texture = this.nativeOtherRes.NativeClose;
        NativeClose.getComponent(SpriteComponent).spriteFrame = spriteFrameNativeClose;
        NativeClose.addComponent(WidgetComponent);
        NativeClose.getComponent(WidgetComponent).isAlignRight = true;
        NativeClose.getComponent(WidgetComponent).isAlignTop = true;
        NativeClose.getComponent(WidgetComponent).right = 0;
        NativeClose.getComponent(WidgetComponent).top = 0;
        let NativeCloseWidth = 0;
        let NativeCloseHeight = 0;
        if (view.getVisibleSize().width < view.getVisibleSize().height) {
            NativeCloseWidth = 80 * (view.getDesignResolutionSize().width / 1080);
            NativeCloseHeight = NativeClose.width;
        } else {
            NativeCloseWidth = 80 * (view.getDesignResolutionSize().height / 1080);
            NativeCloseHeight = NativeClose.width;
        }
        NativeClose.getComponent(UITransformComponent).setContentSize(NativeCloseWidth, NativeCloseHeight);
        // 防止触摸冒泡
        NativeClose.addComponent(BlockInputEventsComponent);

        //关闭原生大图广告
        NativeClose.on(Node.EventType.TOUCH_START, (event) => {
            console.log("XminigameSDK", "手动关闭原生大图");
            this.hideNativeImage();
            if (hideCallback) hideCallback();
        })

        //点击原生广告
        this.node_nativeImage.on(Node.EventType.TOUCH_START, (event) => {
            console.log("XminigameSDK", "点击原生大图");
            this.reportNativeImageAdClick(tempid);
        });

        this.setChildrenNodeLayer(this.node_nativeImage);
    }

    showNewNativeImage(type, hideCallback) {
        let tempid = this.nativeImageAdInfo.adId;
        this.reportNativeImageAdShow(tempid);

        let width = view.getVisibleSize().width;
        let height = view.getVisibleSize().height;
        this.node_nativeImage = new Node("node_nativeImage");
        this.getSdkCanvas().addChild(this.node_nativeImage);
        this.node_nativeImage.addComponent(SpriteComponent);
        let node_nativeImageSp = new SpriteFrame();
        node_nativeImageSp.texture = this.nativeOtherRes.Bg;
        this.node_nativeImage.getComponent(SpriteComponent).spriteFrame = node_nativeImageSp;
        let node_nativeImageWidth = width < height ? width : width / 3;
        let node_nativeImageHeight = node_nativeImageWidth / 2 + node_nativeImageWidth * 0.05;
        this.node_nativeImage.getComponent(UITransformComponent).setContentSize(node_nativeImageWidth, node_nativeImageHeight);
        let node_nativeImageX = width < height ? node_nativeImageWidth / 2 : width / 2;
        let node_nativeImageY = node_nativeImageHeight / 2;
        this.node_nativeImage.setPosition(node_nativeImageX, node_nativeImageY);
        this.node_nativeImage.getComponent(UITransformComponent).priority = 30000;
        this.node_nativeImage.on(Node.EventType.TOUCH_START, (event) => {
            console.log("XminigameSDK", "点击新原生大图");
            this.reportNativeImageAdClick(tempid);
        });

        let Mask1 = new Node();
        this.node_nativeImage.addChild(Mask1);
        Mask1.addComponent(MaskComponent);
        let Mask1Width = node_nativeImageWidth;
        let Mask1Height = node_nativeImageHeight;
        Mask1.getComponent(UITransformComponent).setContentSize(Mask1Width, Mask1Height);

        let Mask2 = new Node();
        Mask1.addChild(Mask2);
        Mask2.addComponent(MaskComponent);
        Mask2.getComponent(MaskComponent).inverted = true;
        let Mask2Width = node_nativeImageWidth * 0.98;
        let Mask2Height = Mask2Width / 2;
        Mask2.getComponent(UITransformComponent).setContentSize(Mask2Width, Mask2Height);

        let runColor = new Node();
        Mask2.addChild(runColor);
        runColor.addComponent(SpriteComponent);
        let runColorSp = new SpriteFrame();
        runColorSp.texture = this.nativeOtherRes.Color;
        runColor.getComponent(SpriteComponent).spriteFrame = runColorSp;
        let runColorWidth = node_nativeImageWidth * 1.5;
        let runColorHeight = runColorWidth;
        runColor.getComponent(UITransformComponent).setContentSize(runColorWidth, runColorHeight);
        tween(runColor)
            .repeatForever(
                tween()
                    .by(1, { angle: -70 })
            )
            .start();

        let image = new Node();
        this.node_nativeImage.addChild(image);
        image.addComponent(SpriteComponent);
        let imageSp = new SpriteFrame();
        imageSp.texture = this.nativeImageAdInfo.Native_BigImage;
        image.getComponent(SpriteComponent).spriteFrame = imageSp;
        let imageWidth = Mask2Width;
        let imageHeight = Mask2Height;
        image.getComponent(UITransformComponent).setContentSize(imageWidth, imageHeight);

        // 按钮
        let button = new Node();
        image.addChild(button);
        button.addComponent(SpriteComponent);
        let buttonSp = new SpriteFrame();
        buttonSp.texture = this.nativeOtherRes.Button;
        button.getComponent(SpriteComponent).spriteFrame = buttonSp;
        let buttonWidth = imageWidth / 3;
        let buttonHeight = buttonWidth * 0.34;
        button.getComponent(UITransformComponent).setContentSize(buttonWidth, buttonHeight);
        let buttonY = imageHeight / 2 - buttonHeight;
        button.setPosition(0, buttonY);

        // 关闭
        let close = new Node();
        image.addChild(close);
        close.addComponent(SpriteComponent);
        let closeSp = new SpriteFrame();
        closeSp.texture = this.nativeOtherRes.Close;
        close.getComponent(SpriteComponent).spriteFrame = closeSp;
        let closeWidth = imageHeight / 7;
        let closeHeight = closeWidth;
        close.getComponent(UITransformComponent).setContentSize(closeWidth, closeHeight);
        let closeX = closeWidth / 2 - imageWidth / 2;
        let closeY = imageHeight / 2 - closeHeight / 2;
        close.setPosition(closeX, closeY);
        close.addComponent(BlockInputEventsComponent);
        close.on(Node.EventType.TOUCH_START, (event) => {
            this.hideNativeImage();
            if (hideCallback) hideCallback();
        });

        // 广告标识
        let adTip = new Node();
        image.addChild(adTip);
        adTip.addComponent(SpriteComponent);
        let adTipSp = new SpriteFrame();
        adTipSp.texture = this.nativeOtherRes.AdTip;
        adTip.getComponent(SpriteComponent).spriteFrame = adTipSp;
        let adTipHeight = imageHeight / 7;
        let adTipWidth = adTipHeight * (35 / 17);
        adTip.getComponent(UITransformComponent).setContentSize(adTipWidth, adTipHeight);
        let adTipX = imageWidth / 2 - adTipWidth / 2;
        let adTipY = imageHeight / 2 - adTipHeight / 2;
        adTip.setPosition(adTipX, adTipY);

        this.setChildrenNodeLayer(this.node_nativeImage);
    }

    hideNativeImage() {
        this.isShow_NativeImage = false;
        if (this.node_nativeImage) {
            console.log("XminigameSDK", "VIVO hideNativeImage===========================");
            this.node_nativeImage.removeFromParent();
            this.node_nativeImage = null;
        }
    }

    getNativePasterFlag() {
        return false;
    }
    showNativePaster() {
    }

    getNativeAdInfo(type) {
        if (type == 1) {
            console.log("XminigameSDK", "getNativeAdInfo type 1");
            return this.firstNativeAdInfo;
        } else {
            console.log("XminigameSDK", "getNativeAdInfo type 2");
            return this.secondNativeImageAdInfo;
        }
    }

    reportNativeAdShow(adId) {
        if (!adId) return;
        if (this.nativeAdPullAdId.indexOf(adId) != -1) {
            console.log("XminigameSDK", "VIVO 原生广告上报展示", adId);
            this.nativeAd && this.nativeAd.reportAdShow({
                adId: adId
            })
        } else {
            this.reportNativeImageAdShow(adId);
        }
    }

    reportNativeAdClick(adId) {
        if (!adId) return;
        if (this.nativeAdPullAdId.indexOf(adId) != -1) {
            console.log("XminigameSDK", "VIVO 原生广告上报点击", adId);
            this.nativeAd && this.nativeAd.reportAdClick({
                adId: adId
            })
        } else {
            this.reportNativeImageAdClick(adId);
        }
    }

    reportNativeImageAdShow(adId) {
        if (!adId) return;
        console.log("XminigameSDK", "VIVO 原生大图广告上报展示", adId);
        this.nativeImageAd && this.nativeImageAd.reportAdShow({
            adId: adId
        })
    }

    reportNativeImageAdClick(adId) {
        if (!adId) return;
        console.log("XminigameSDK", "VIVO 原生大图广告上报点击", adId);
        this.nativeImageAd && this.nativeImageAd.reportAdClick({
            adId: adId
        })
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
        return this.loadSucc_NavigateBoxBanner;
    }

    showNavigateBoxBanner() {
        if (!this.loadSucc_NavigateBoxBanner) {
            console.log("XminigameSDK", "互推盒子横幅广告未加载完成");
            return;
        }
        if (this.isShow_NavigateSettle) {
            console.log("XminigameSDK", "已经调用过showNavigateBoxBanner,请勿重复调用");
            return;
        }
        this.isShow_NavigateSettle = true;

        this.hideBanner();
        console.log("XminigameSDK", "showNavigateBoxBanner=====================");
        this.navigateBoxBannerAd.show();
    }

    hideNavigateBoxBanner() {
        this.isShow_NavigateSettle = false;
        if (this.navigateBoxBannerAd) {
            console.log("XminigameSDK", "hideNavigateBoxBanner=====================");
            this.loadSucc_NavigateBoxBanner = false;
            this.navigateBoxBannerAd.destroy();
            setTimeout(() => {
                this.createNavigateBoxBanner();
            }, 5 * 1000);
        }
    }

    getNavigateBoxPortalFlag() {
        return this.loadSucc_NavigateBoxPortal;
    }

    showNavigateBoxPortal(imageUrl?, marginTop?) {
        if (!imageUrl || !marginTop) {
            console.log("XminigameSDK", "需要参数imageUrl与marginTop");
            return;
        }
        if (!this.loadSucc_NavigateBoxPortal) {
            return;
        }

        console.log("XminigameSDK", "VIVO showNavigateBoxPortal===========================");

        // @ts-ignore
        this.navigateBoxPortalAd = qg.createBoxPortalAd({
            posId: this.ID_Box,
            image: imageUrl,
            marginTop: marginTop
        })

        this.navigateBoxPortalAd.onError((err) => {
            console.log("XminigameSDK", "互推盒子九宫格广告加载失败", JSON.stringify(err));
        })

        this.navigateBoxPortalAd.onClose(() => {
            console.log("XminigameSDK", "互推盒子九宫格关闭");
            if (this.navigateBoxPortalAd.isDestroyed) {
                return;
            }
            // 当九宫格关闭之后，再次展示Icon
            this.navigateBoxPortalAd.show();
            // 当九宫格关闭之后，再次展示banner
            if (this.temp_hasShowBanner) {
                this.showBanner();
                this.temp_hasShowBanner = false;
            }
        })

        this.navigateBoxPortalAd.onShow((err) => {
            console.log("XminigameSDK", "互推盒子九宫格展示成功");
            this.temp_hasShowBanner = this.hasShowBanner;
            this.hideBanner();
        })

        // 广告数据加载成功后展示
        this.navigateBoxPortalAd.show().then(() => {
            console.log("XminigameSDK", "互推盒子九宫格悬浮icon展示成功");
        })
    }
    hideNavigateBoxPortal() {
        if (this.navigateBoxPortalAd != null) {
            console.log("XminigameSDK", "VIVO hideNavigateBoxPortal===========================");
            this.navigateBoxPortalAd.isDestroyed = true;
            this.navigateBoxPortalAd.destroy();
            this.navigateBoxPortalAd = null;
        }
    }

    setGroup(group) {
        this.AdGroup = group;
        PrivacyAgreement.getInstance().setGroup(group);
    }

    hasAddDesktopFunc() {
        return true;
    }

    getAddDesktopFlag(callback) {
        // @ts-ignore
        qg.hasShortcutInstalled({
            success: function (status) {
                if (status) {
                    console.log("XminigameSDK", "VIVO 已创建桌面图标");
                    callback(false);
                } else {
                    console.log("XminigameSDK", "VIVO 未创建桌面图标")
                    callback(true);
                }
            }
        })
    }

    addDesktop(callback) {
        // @ts-ignore
        qg.installShortcut({
            success: function () {
                console.log("XminigameSDK", "VIVO 创建桌面图标成功")
                callback(true);
            },
            fail: function (err) {
                console.log("XminigameSDK", "VIVO 创建桌面图标失败：", JSON.stringify(err));
                callback(false);
            },
            complete: function () { }
        })
    }

    phoneVibrate(type) {
        if (type == "short") {
            // @ts-ignore
            qg.vibrateShort()
        } else if (type == "long") {
            // @ts-ignore
            qg.vibrateLong()
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
        console.log("XminigameSDK", "VIVO getUserData=====================");
        let userData = {
            userId: LocalStorage.getData("userId"),
            token: LocalStorage.getData("token"),
            userType: LocalStorage.getData("userType"),
        }
        callback(userData);
    }

    getUserInfo(callback) {
        let userInfo = {
            head: "",
            name: "",
            sex: "",
            city: "",
            province: "",
            country: "",
            power: false
        }
        userInfo.head = LocalStorage.getData("avatarUrl");
        userInfo.name = LocalStorage.getData("nickName");
        userInfo.sex = LocalStorage.getData("gender");
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
    }

    visitorExperience(callback) {
    }

    showNativeAd(width, height, viewX, viewY) {
    }

    getOPPOShowMoreGameFlag() {
        return false;
    }
    showOPPOMoreGame() {
    }

    openProtocol() {
        console.log("XminigameSDK", "VIVO openProtocol==================");
        PrivacyAgreement.getInstance().open();
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
        if (LocalStorage.getData("agreePrivacy") == "true") {
            console.log("XminigameSDK", "已经同意隐私协议,不再展示,直接回调true");
            callback(true);
            return;
        }
        if (this.isShow_PrivacyAgreement) {
            console.log("XminigameSDK", "已经调用过showPrivacyAgreement,请勿重复调用");
            return;
        }
        this.isShow_PrivacyAgreement = true;

        console.log("XminigameSDK", "VIVO showPrivacyAgreement==================");

        PrivacyAgreement.getInstance().show(callback);
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

        this.loadSucc_Banner = (this.loadSucc_NativeBanner && this.loadSucc_NativeAd) || this.loadSucc_SystemBanner || this.loadSucc_NativeTemplateBanner;

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
     * 展示原生banner
     */
    showNativeBanner() {
        this.isShow_NativeBanner = true;

        if (this.bannerType == 1) {
            this.showNewNativeBanner();
            return;
        }

        //原生广告id
        let tempid = this.nativeAdInfo.adId;
        this.reportNativeAdShow(tempid);

        console.log("XminigameSDK", "showNativeBanner========================");

        this.node_nativeBanner = new Node("node_nativeBanner");
        this.getSdkCanvas().addChild(this.node_nativeBanner);
        this.node_nativeBanner.addComponent(SpriteComponent);
        let spriteFrameBg = new SpriteFrame();
        spriteFrameBg.texture = this.nativeBannerRes.NativeBannerBg;
        this.node_nativeBanner.getComponent(SpriteComponent).spriteFrame = spriteFrameBg;
        let node_nativeBannerWidth = 0;
        let node_nativeBannerHeight = 0;
        if (view.getVisibleSize().width < view.getVisibleSize().height) {
            node_nativeBannerWidth = view.getVisibleSize().width;
            node_nativeBannerHeight = view.getVisibleSize().width * 0.18;
        }
        else {
            node_nativeBannerWidth = view.getVisibleSize().width / 2;
            node_nativeBannerHeight = view.getVisibleSize().width / 2 * 0.18;
        }

        this.node_nativeBanner.getComponent(UITransformComponent).setContentSize(node_nativeBannerWidth, node_nativeBannerHeight);
        this.node_nativeBanner.getComponent(UITransformComponent).priority = 30020;

        if (view.getVisibleSize().width < view.getVisibleSize().height) {
            this.node_nativeBanner.setPosition(node_nativeBannerWidth / 2, node_nativeBannerHeight / 2);
        } else {
            this.node_nativeBanner.setPosition(view.getVisibleSize().width - node_nativeBannerWidth, node_nativeBannerHeight / 2);
        }

        this.node_nativeBanner.on(Node.EventType.TOUCH_START, (event) => {
            this.reportNativeAdClick(tempid);
        });

        // 广告
        let adTip: Node = new Node("adTip");
        this.node_nativeBanner.addChild(adTip);
        adTip.addComponent(SpriteComponent);
        let spriteFrameAdTip = new SpriteFrame();
        spriteFrameAdTip.texture = this.nativeBannerRes.NativeAdTip;
        adTip.getComponent(SpriteComponent).spriteFrame = spriteFrameAdTip;
        let adTipHeight = 0.2 * node_nativeBannerHeight;
        let adTipWidth = adTipHeight / 0.45;

        adTip.getComponent(UITransformComponent).setContentSize(adTipWidth, adTipHeight);
        let adTipX = node_nativeBannerWidth / 2 - adTipWidth / 2;
        let adTipY = node_nativeBannerHeight / 2 - adTipHeight / 2;
        adTip.setPosition(new Vec3(adTipX, adTipY));

        // 点击安装
        let bannerButton: Node = new Node("bannerButton");
        this.node_nativeBanner.addChild(bannerButton);
        bannerButton.addComponent(SpriteComponent);
        let spriteFrameBannerButton = new SpriteFrame();
        spriteFrameBannerButton.texture = this.nativeBannerRes.NativeBannerButton;
        bannerButton.getComponent(SpriteComponent).spriteFrame = spriteFrameBannerButton;
        let bannerButtonWidth = node_nativeBannerWidth * 0.255;
        let bannerButtonHeight = bannerButtonWidth * 0.351;

        bannerButton.getComponent(UITransformComponent).setContentSize(bannerButtonWidth, bannerButtonHeight);
        let bannerButtonX = node_nativeBannerWidth / 2 - node_nativeBannerWidth * 0.185;
        let bannerButtonY = 0;
        bannerButton.setPosition(bannerButtonX, bannerButtonY);

        if (this.nativeAdInfo.Native_BigImage) {
            // 大图
            let image: Node = new Node("image");
            this.node_nativeBanner.addChild(image);
            image.addComponent(SpriteComponent);
            let spriteFrameImage = new SpriteFrame();
            spriteFrameImage.texture = this.nativeAdInfo.Native_BigImage;
            image.getComponent(SpriteComponent).spriteFrame = spriteFrameImage;
            let imageHeight = node_nativeBannerHeight;
            let imageWidth = imageHeight * 2;
            image.getComponent(UITransformComponent).setContentSize(imageWidth, imageHeight);
            let imageX = imageWidth / 2 - node_nativeBannerWidth / 2;
            let imageY = 0;
            image.setPosition(imageX, imageY);
        } else if (this.nativeAdInfo.Native_icon) {
            // icon
            let icon: Node = new Node("icon");
            this.node_nativeBanner.addChild(icon);
            icon.addComponent(SpriteComponent);
            let spriteFrameIcon = new SpriteFrame();
            spriteFrameIcon.texture = this.nativeAdInfo.Native_icon;
            icon.getComponent(SpriteComponent).spriteFrame = spriteFrameIcon;
            let iconHeight = node_nativeBannerHeight * 0.8;
            let iconWidth = iconHeight;
            icon.getComponent(UITransformComponent).setContentSize(iconWidth, iconHeight);
            let iconX = iconWidth * 0.8 - node_nativeBannerWidth / 2;
            let iconY = 0;
            icon.setPosition(iconX, iconY);
        }

        // 标题或描述
        let titleLabel: Node = new Node("titleLabel");
        this.node_nativeBanner.addChild(titleLabel);
        titleLabel.addComponent(LabelComponent);
        titleLabel.getComponent(LabelComponent).overflow = LabelComponent.Overflow.CLAMP;
        if (view.getVisibleSize().width < view.getVisibleSize().height) {
            titleLabel.getComponent(LabelComponent).fontSize = 35 * (view.getDesignResolutionSize().width / 1080);
        } else {
            titleLabel.getComponent(LabelComponent).fontSize = 35 * (view.getDesignResolutionSize().height / 1080);
        }
        if (this.nativeAdInfo.desc == "") {
            titleLabel.getComponent(LabelComponent).string = this.nativeAdInfo.title;
        } else {
            titleLabel.getComponent(LabelComponent).string = this.nativeAdInfo.desc;
        }
        titleLabel.getComponent(LabelComponent).horizontalAlign = LabelComponent.HorizontalAlign.LEFT;
        titleLabel.getComponent(LabelComponent).verticalAlign = LabelComponent.VerticalAlign.CENTER;
        titleLabel.getComponent(LabelComponent).lineHeight = titleLabel.getComponent(LabelComponent).fontSize;
        titleLabel.getComponent(LabelComponent).color = new Color(0xFF, 0x00, 0x00);
        let titleLabelWidth = node_nativeBannerWidth - node_nativeBannerHeight * 2 - bannerButtonWidth - 0.2 * node_nativeBannerHeight / 0.45;
        let titleLabelHeight = node_nativeBannerHeight;

        titleLabel.getComponent(UITransformComponent).setContentSize(titleLabelWidth, titleLabelHeight);
        let titleLabelY = 0;
        let titleLabelX = -node_nativeBannerWidth / 2 + node_nativeBannerHeight * 2.1 + titleLabelWidth / 2;
        titleLabel.setPosition(titleLabelX, titleLabelY);


        // 关闭按钮背景
        let closeICON: Node = new Node("closeICON");
        this.node_nativeBanner.addChild(closeICON);
        closeICON.addComponent(SpriteComponent);
        let spriteFrameCloseICON = new SpriteFrame();
        spriteFrameCloseICON.texture = this.nativeBannerRes.NativeClose;
        closeICON.getComponent(SpriteComponent).spriteFrame = spriteFrameCloseICON;
        let closeICONWidth = 0.27 * node_nativeBannerHeight;
        let closeICONHeight = 0.27 * node_nativeBannerHeight;

        closeICON.getComponent(UITransformComponent).setContentSize(closeICONWidth, closeICONHeight);
        let closeICONX = -node_nativeBannerWidth / 2 + closeICONWidth / 2;
        let closeICONY = node_nativeBannerHeight / 2 - closeICONWidth / 2;
        closeICON.setPosition(closeICONX, closeICONY);

        // 关闭按钮
        let closeButton: Node = new Node("closeButton");
        this.node_nativeBanner.addChild(closeButton);
        let closeButtonWidth = closeICONHeight;
        let closeButtonHeight = closeICONHeight;
        closeButton.addComponent(UITransformComponent);
        closeButton.getComponent(UITransformComponent).setContentSize(closeButtonWidth, closeButtonHeight);
        let closeButtonX = -node_nativeBannerWidth / 2 + closeICONWidth / 2;
        let closeButtonY = node_nativeBannerHeight / 2 - closeICONWidth / 2;
        closeButton.setPosition(closeButtonX, closeButtonY);
        // 防止触摸冒泡
        closeButton.addComponent(BlockInputEventsComponent);


        // 监听原生banner关闭
        closeButton.on(Node.EventType.TOUCH_START, (event) => {
            console.log("XminigameSDK", "原生banner关闭");
            this.hideBanner();
            // this.hideNativeBanner();
            // 广告关闭统计
            this.NUM_BannerClose++;
            // this.updateBanner();
        });

        this.setChildrenNodeLayer(this.node_nativeBanner);
    }


    showNewNativeBanner() {

        //原生广告id
        let tempid = this.nativeAdInfo.adId;
        this.reportNativeAdShow(tempid);

        console.log("XminigameSDK", "showNativeBanner========================");

        let width = view.getVisibleSize().width;
        let height = view.getVisibleSize().height;
        this.node_nativeBanner = new Node("node_nativeBanner");
        this.getSdkCanvas().addChild(this.node_nativeBanner);
        this.node_nativeBanner.addComponent(SpriteComponent);
        let node_nativeBannerSp = new SpriteFrame();
        node_nativeBannerSp.texture = this.nativeBannerRes.BannerBg;
        this.node_nativeBanner.getComponent(SpriteComponent).spriteFrame = node_nativeBannerSp;
        let node_nativeBannerWidth = width < height ? width : width / 2;
        let node_nativeBannerHeight = node_nativeBannerWidth * (width < height ? 5 / 18 : 0.18);
        this.node_nativeBanner.getComponent(UITransformComponent).setContentSize(node_nativeBannerWidth, node_nativeBannerHeight);
        let node_nativeBannerX = width / 2;
        let node_nativeBannerY = node_nativeBannerHeight / 2;
        this.node_nativeBanner.setPosition(node_nativeBannerX, node_nativeBannerY);

        this.node_nativeBanner.getComponent(UITransformComponent).priority = 30000;
        this.node_nativeBanner.on(Node.EventType.TOUCH_START, (event) => {
            this.reportNativeAdClick(tempid);
        });

        let bannerMask = new Node();
        this.node_nativeBanner.addChild(bannerMask);
        bannerMask.addComponent(MaskComponent);
        bannerMask.getComponent(MaskComponent).inverted = true;
        let bannerMaskWidth = node_nativeBannerWidth - 12;
        let bannerMaskHeight = node_nativeBannerHeight - 10;
        bannerMask.getComponent(UITransformComponent).setContentSize(bannerMaskWidth, bannerMaskHeight);

        let bannerMask2 = new Node();
        bannerMask.addChild(bannerMask2);
        bannerMask2.addComponent(MaskComponent);
        bannerMask2.getComponent(MaskComponent).type = MaskComponent.Type.RECT;
        let bannerMask2Width = node_nativeBannerWidth;
        let bannerMask2Height = node_nativeBannerHeight;
        bannerMask2.getComponent(UITransformComponent).setContentSize(bannerMask2Width, bannerMask2Height);

        let runColor = new Node();
        bannerMask2.addChild(runColor);
        runColor.addComponent(SpriteComponent);
        let runColorSp = new SpriteFrame();
        runColorSp.texture = this.nativeBannerRes.Color;
        runColor.getComponent(SpriteComponent).spriteFrame = runColorSp;
        let runColorWidth = node_nativeBannerWidth * 1.5;
        let runColorHeight = runColorWidth;
        runColor.getComponent(UITransformComponent).setContentSize(runColorWidth, runColorHeight);
        tween(runColor)
            .repeatForever(
                tween()
                    .by(1, { angle: -70 })
            )
            .start();


        let bannerAdBg = new Node();
        this.node_nativeBanner.addChild(bannerAdBg);
        bannerAdBg.addComponent(SpriteComponent);
        let bannerAdBgSp = new SpriteFrame();
        bannerAdBgSp.texture = this.nativeBannerRes.BannerMask;
        bannerAdBg.getComponent(SpriteComponent).spriteFrame = bannerAdBgSp;
        let bannerAdBgWidth = bannerMaskWidth;
        let bannerAdBgHeight = bannerMaskHeight;
        bannerAdBg.getComponent(UITransformComponent).setContentSize(bannerAdBgWidth, bannerAdBgHeight);

        // 关闭
        let close = new Node();
        bannerAdBg.addChild(close);
        close.addComponent(SpriteComponent);
        let closeSp = new SpriteFrame();
        closeSp.texture = this.nativeBannerRes.Close;
        close.getComponent(SpriteComponent).spriteFrame = closeSp;
        let closeWidth = bannerAdBgHeight / 6;
        let closeHeight = closeWidth;
        close.getComponent(UITransformComponent).setContentSize(closeWidth, closeHeight);
        let closeX = closeWidth * 0.75 - bannerAdBgWidth / 2;
        let closeY = bannerAdBgHeight / 2 - closeHeight * 0.75;
        close.setPosition(closeX, closeY);
        close.addComponent(BlockInputEventsComponent);
        close.on(Node.EventType.TOUCH_START, (event) => {
            console.log("XminigameSDK", "原生banner关闭");
            this.hideBanner();
            // this.hideNativeBanner();
            // 广告关闭统计
            this.NUM_BannerClose++;
            // this.updateBanner();
        });

        // 点击查看按钮
        let button = new Node();
        bannerAdBg.addChild(button);
        button.addComponent(SpriteComponent);
        let buttonSp = new SpriteFrame();
        buttonSp.texture = this.nativeBannerRes.Button;
        button.getComponent(SpriteComponent).spriteFrame = buttonSp;
        let buttonHeight = bannerAdBgHeight / 3;
        let buttonWidth = buttonHeight * (278 / 95);
        button.getComponent(UITransformComponent).setContentSize(buttonWidth, buttonHeight);
        let buttonX = bannerAdBgWidth / 2 - buttonWidth * 0.6;
        button.setPosition(buttonX, 0);

        // 广告标识
        let adTip = new Node();
        bannerAdBg.addChild(adTip);
        adTip.addComponent(SpriteComponent);
        let adTipSp = new SpriteFrame();
        adTipSp.texture = this.nativeBannerRes.AdTip;
        adTip.getComponent(SpriteComponent).spriteFrame = adTipSp;
        let adTipHeight = bannerAdBgHeight / 7;
        let adTipWidth = adTipHeight * (35 / 17);
        adTip.getComponent(UITransformComponent).setContentSize(adTipWidth, adTipHeight);
        let adTipX = bannerAdBgWidth / 2 - adTipWidth / 2;
        let adTipY = bannerAdBgHeight / 2 - adTipHeight / 2;
        adTip.setPosition(adTipX, adTipY);

        let DESIGNWIDTH = view.getDesignResolutionSize().width;
        let DESIGNHEIGHT = view.getDesignResolutionSize().height;
        // 标题
        let title = new Node();
        bannerAdBg.addChild(title);
        title.addComponent(LabelComponent);
        title.getComponent(LabelComponent).color = Color.BLACK;
        title.getComponent(LabelComponent).overflow = LabelComponent.Overflow.CLAMP;
        title.getComponent(LabelComponent).fontSize = 40 * (width < height ? DESIGNWIDTH / 1080 : DESIGNHEIGHT / 1080);
        title.getComponent(LabelComponent).lineHeight = 50 * (width < height ? DESIGNWIDTH / 1080 : DESIGNHEIGHT / 1080);
        title.getComponent(LabelComponent).horizontalAlign = LabelComponent.HorizontalAlign.CENTER;
        title.getComponent(LabelComponent).verticalAlign = LabelComponent.VerticalAlign.CENTER;
        title.getComponent(LabelComponent).string = this.nativeAdInfo.title;

        // 描述
        let description = new Node();
        bannerAdBg.addChild(description);
        description.addComponent(LabelComponent);
        description.getComponent(LabelComponent).color = new Color(0x85, 0x81, 0x81);
        description.getComponent(LabelComponent).overflow = LabelComponent.Overflow.CLAMP;
        description.getComponent(LabelComponent).fontSize = 40 * (width < height ? DESIGNWIDTH / 1080 : DESIGNHEIGHT / 1080);
        description.getComponent(LabelComponent).lineHeight = 50 * (width < height ? DESIGNWIDTH / 1080 : DESIGNHEIGHT / 1080);
        description.getComponent(LabelComponent).horizontalAlign = LabelComponent.HorizontalAlign.CENTER;
        description.getComponent(LabelComponent).verticalAlign = LabelComponent.VerticalAlign.TOP;
        description.getComponent(LabelComponent).string = this.nativeAdInfo.desc;

        // 原生大图或icon
        if (this.nativeAdInfo.Native_BigImage) {
            // 大图
            let image = new Node();
            bannerAdBg.addChild(image);
            image.addComponent(SpriteComponent);
            let imageSp = new SpriteFrame();
            imageSp.texture = this.nativeAdInfo.Native_BigImage;
            image.getComponent(SpriteComponent).spriteFrame = imageSp;
            let imageHeight = bannerAdBgHeight - closeHeight * 2.5;
            let imageWidth = imageHeight * 2;
            image.getComponent(UITransformComponent).setContentSize(imageWidth, imageHeight);
            let imageX = imageWidth / 2 - bannerAdBgWidth / 2 + closeWidth * 1.25;
            image.setPosition(imageX, 0);

            let titleWidth = bannerAdBgWidth - closeWidth * 1.25 - imageWidth - buttonWidth * 1.2;
            let titleHeight = bannerAdBgHeight / 2;
            title.getComponent(UITransformComponent).setContentSize(titleWidth, titleHeight);
            let titleX = ((imageX + imageWidth / 2) + (buttonX - buttonWidth / 2)) / 2;
            let titleY = bannerAdBgHeight * 0.25;
            title.setPosition(titleX, titleY);

            let descriptionWidth = bannerAdBgWidth - closeWidth * 1.25 - imageWidth - buttonWidth * 1.2;
            let descriptionHeight = bannerAdBgHeight / 2;
            description.getComponent(UITransformComponent).setContentSize(descriptionWidth, descriptionHeight);
            let descriptionX = titleX;
            let descriptionY = -bannerAdBgHeight * 0.25;
            description.setPosition(descriptionX, descriptionY);
        } else if (this.nativeAdInfo.Native_icon) {
            // icon
            let icon = new Node();
            bannerAdBg.addChild(icon);
            icon.addComponent(SpriteComponent);
            let iconSp = new SpriteFrame();
            iconSp.texture = this.nativeAdInfo.Native_icon;
            icon.getComponent(SpriteComponent).spriteFrame = iconSp;
            let iconHeight = bannerAdBgHeight - closeHeight * 2.5;
            let iconWidth = iconHeight;
            icon.getComponent(UITransformComponent).setContentSize(iconWidth, iconHeight);
            let iconX = iconWidth / 2 - bannerAdBgWidth / 2 + closeWidth * 1.25;
            icon.setPosition(iconX, 0);

            let titleWidth = bannerAdBgWidth - closeWidth * 1.25 - iconWidth - buttonWidth * 1.2;
            let titleHeight = bannerAdBgHeight / 2;
            title.getComponent(UITransformComponent).setContentSize(titleWidth, titleHeight);
            let titleX = ((iconX + iconWidth / 2) + (buttonX - buttonWidth / 2)) / 2;
            let titleY = bannerAdBgHeight * 0.25;
            title.setPosition(titleX, titleY);

            let descriptionWidth = bannerAdBgWidth - closeWidth * 1.25 - iconWidth - buttonWidth * 1.2;
            let descriptionHeight = bannerAdBgHeight / 2;
            description.getComponent(UITransformComponent).setContentSize(descriptionWidth, descriptionHeight);
            let descriptionX = titleX;
            let descriptionY = -bannerAdBgHeight * 0.25;
            description.setPosition(descriptionX, descriptionY);
        }

        this.setChildrenNodeLayer(this.node_nativeBanner);
    }


    showNativeTemplateBanner() {
        if (this.nativeTemplateBannerAd) {
            console.log("XminigameSDK", "VIVO showNativeTemplateBanner========================");
            this.nativeTemplateBannerAd.show().then(() => {
                console.log("XminigameSDK", "VIVO 原生模板banner广告展示成功==================");
                this.isShow_NativeTemplateBanner = true;

                let width = view.getVisibleSize().width;
                let height = view.getVisibleSize().height;
                this.node_nativeTemplateBanner = new Node("node_nativeTemplateBanner");
                this.getSdkCanvas().addChild(this.node_nativeTemplateBanner);
                this.node_nativeTemplateBanner.addComponent(SpriteComponent);
                let node_nativeTemplateBannerSp = new SpriteFrame();
                node_nativeTemplateBannerSp.texture = this.nativeBannerRes.BannerBg;
                this.node_nativeTemplateBanner.getComponent(SpriteComponent).spriteFrame = node_nativeTemplateBannerSp;
                let node_nativeTemplateBannerWidth = width < height ? width : width / 2;
                let node_nativeTemplateBannerHeight = node_nativeTemplateBannerWidth * (width < height ? 7 / 18 : 0.18);
                this.node_nativeTemplateBanner.getComponent(UITransformComponent).setContentSize(node_nativeTemplateBannerWidth, node_nativeTemplateBannerHeight);
                let node_nativeBannerX = width / 2;
                let node_nativeBannerY = node_nativeTemplateBannerHeight / 2;
                this.node_nativeTemplateBanner.setPosition(node_nativeBannerX, node_nativeBannerY);

                this.node_nativeTemplateBanner.getComponent(UITransformComponent).priority = 30000;

                let bannerMask = new Node();
                this.node_nativeTemplateBanner.addChild(bannerMask);
                bannerMask.addComponent(MaskComponent);
                bannerMask.getComponent(MaskComponent).inverted = true;
                let bannerMaskWidth = node_nativeTemplateBannerWidth - 12;
                let bannerMaskHeight = node_nativeTemplateBannerHeight - 10;
                bannerMask.getComponent(UITransformComponent).setContentSize(bannerMaskWidth, bannerMaskHeight);

                let bannerMask2 = new Node();
                bannerMask.addChild(bannerMask2);
                bannerMask2.addComponent(MaskComponent);
                bannerMask2.getComponent(MaskComponent).type = MaskComponent.Type.RECT;
                let bannerMask2Width = node_nativeTemplateBannerWidth;
                let bannerMask2Height = node_nativeTemplateBannerHeight;
                bannerMask2.getComponent(UITransformComponent).setContentSize(bannerMask2Width, bannerMask2Height);

                let runColor = new Node();
                bannerMask2.addChild(runColor);
                runColor.addComponent(SpriteComponent);
                let runColorSp = new SpriteFrame();
                runColorSp.texture = this.nativeBannerRes.Color;
                runColor.getComponent(SpriteComponent).spriteFrame = runColorSp;
                let runColorWidth = node_nativeTemplateBannerWidth * 1.5;
                let runColorHeight = runColorWidth;
                runColor.getComponent(UITransformComponent).setContentSize(runColorWidth, runColorHeight);
                tween(runColor)
                    .repeatForever(
                        tween()
                            .by(1, { angle: -70 })
                    )
                    .start();
            }).catch((err) => {
                console.log("XminigameSDK", "VIVO 原生模板banner广告展示错误:" + JSON.stringify(err));
                this.node_nativeTemplateBanner && this.node_nativeTemplateBanner.removeFromParent();
            });
        }
    }


    /**
     * 展示系统banner
     */
    showSystemBanner() {
        if (this.bannerAd) {
            console.log("XminigameSDK", "VIVO showSystemBanner========================");
            this.isShow_SystemBanner = true;
            this.bannerAd.show();
        }
    }


    /**
     * 刷新banner
     */
    updateBanner() {
        if (this.NUM_BannerMostShow <= this.NUM_BannerClose) {
            console.log("XminigameSDK", "banner最大关闭(最多展示)次数", this.NUM_BannerMostShow, " 已达上限 return");
            // 清除banner刷新定时器
            if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
            return;
        }

        if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);

        // 刷新广告条
        this.interval_updateBanner = setInterval(() => {

            if (this.NUM_BannerMostShow <= this.NUM_BannerClose) {
                console.log("XminigameSDK", "banner最大关闭(最多展示)次数", this.NUM_BannerMostShow, " 已达上限 return");
                // 清除banner刷新定时器
                if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
                return;
            }

            if (this.SW_SystemBanner && (this.SW_NativeBanner || this.SW_NativeTemplateBanner)) {
                if (this.SW_SystemBannerFirst) {
                    console.log("XminigameSDK", "系统banner优先");
                    if (this.loadSucc_SystemBanner) {
                        console.log("XminigameSDK", "刷新系统banner");
                        this.updateSystemBanner();
                    } else if ((this.loadSucc_NativeBanner && this.loadSucc_NativeAd) || this.loadSucc_NativeTemplateBanner) {
                        console.log("XminigameSDK", "系统banner未加载完成,改为刷新原生banner");
                        if (this.loadSucc_NativeBanner && this.loadSucc_NativeAd) {
                            this.updateNativeBanner();
                        } else {
                            this.updateNativeTemplateBanner();
                        }
                    }
                } else {
                    console.log("XminigameSDK", "原生banner优先");
                    if ((this.loadSucc_NativeBanner && this.loadSucc_NativeAd) || this.loadSucc_NativeTemplateBanner) {
                        console.log("XminigameSDK", "刷新原生banner");
                        if (this.loadSucc_NativeBanner && this.loadSucc_NativeAd) {
                            this.updateNativeBanner();
                        } else {
                            this.updateNativeTemplateBanner();
                        }
                    } else if (this.loadSucc_SystemBanner) {
                        console.log("XminigameSDK", "原生banner未加载完成,改为刷新系统banner");
                        this.updateSystemBanner();
                    }
                }
            } else if (this.SW_SystemBanner) {
                this.updateSystemBanner();
            } else if ((this.SW_NativeBanner && this.ID_Native != "") || (this.SW_NativeTemplateBanner && this.ID_NativeTemplateBanner != "")) {
                if (this.SW_NativeBanner && this.ID_Native != "") {
                    this.updateNativeBanner();
                } else {
                    this.updateNativeTemplateBanner();
                }
            }
        }, this.NUM_BannerUpdateTime * 1000)

    }


    /**
     * 刷新系统banner
     */
    updateSystemBanner() {
        console.log("XminigameSDK", "VIVO updateSystemBanner========================");
        this.hideNativeBanner();
        this.hideNativeTemplateBanner();
        this.hideSystemBanner();
        this.timeout_showSystemBanner =
            setTimeout(() => {
                this.bannerAd && this.showSystemBanner();
            }, 1000)
    }

    /**
     * 隐藏系统banner
     */
    hideSystemBanner() {
        if (this.isShow_SystemBanner && this.bannerAd) {
            console.log("XminigameSDK", "VIVO hideSystemBanner========================");
            this.isShow_SystemBanner = false;
            this.loadSucc_SystemBanner = false;
            this.bannerAd.hide();
            this.bannerAd.destroy();
            this.createSystemBanner();
        }
    }


    /**
     * 刷新原生banner
     */
    updateNativeBanner() {
        console.log("XminigameSDK", "VIVO updateNativeBanner========================");
        this.hideNativeBanner();
        this.hideNativeTemplateBanner();
        this.hideSystemBanner();
        this.showNativeBanner();
    }

    /**
     * 隐藏原生banner
     */
    hideNativeBanner() {
        this.isShow_NativeBanner = false;
        if (this.node_nativeBanner) {
            console.log("XminigameSDK", "VIVO hideNativeBanner========================");
            this.node_nativeBanner.removeFromParent();
            this.node_nativeBanner = null;
        }
    }


    /**
     * 刷新原生模板banner
     */
    updateNativeTemplateBanner() {
        console.log("XminigameSDK", "VIVO updateNativeTemplateBanner========================");
        this.hideNativeBanner();
        this.hideNativeTemplateBanner();
        this.hideSystemBanner();
        this.timeout_showNativeTemplateBanner =
            setTimeout(() => {
                this.nativeTemplateBannerAd && this.showNativeTemplateBanner();
            }, 1000)
    }

    /**
     * 隐藏原生模板banner
     */
    hideNativeTemplateBanner() {
        console.log("XminigameSDK", "VIVO hideNativeTemplateBanner========================");
        if (this.isShow_NativeTemplateBanner) {
            this.node_nativeTemplateBanner && this.node_nativeTemplateBanner.removeFromParent();
            this.isShow_NativeTemplateBanner = false;
            this.loadSucc_NativeTemplateBanner = false;
            if (this.nativeTemplateBannerAd) {
                this.nativeTemplateBannerAd.hide();
                this.nativeTemplateBannerAd.destroy();
                this.nativeTemplateBannerAd = null;
                this.createNativeTemplateBanner();
            }
        }
    }




    /**
     * 展示原生模板
     */
    showNativeTemplateInters() {
        if (this.loadSucc_NativeTemplate && this.nativeTemplateIntersAd) {
            if (this.isShow_NativeTemplateBanner) {
                this.nativeTemplateBannerBeHideByNativeTemplateInters = true;
                this.hideNativeTemplateBanner();
            }
            console.log("XminigameSDK", "VIVO showNativeTemplateInters========================");
            this.nativeTemplateIntersAd.show().then(() => {
                console.log("XminigameSDK", "VIVO 原生模板广告展示成功==================");
                this.isShow_NativeTemplateInters = true;
                this.node_nativeTemplate = new Node();
                this.getSdkCanvas().addChild(this.node_nativeTemplate);
                this.node_nativeTemplate.addComponent(SpriteComponent);
                let node_nativeTemplateSp = new SpriteFrame();
                node_nativeTemplateSp.texture = this.nativeTemplateRes.Bg;
                this.node_nativeTemplate.getComponent(SpriteComponent).spriteFrame = node_nativeTemplateSp;
                let node_nativeTemplateWidth = view.getVisibleSize().width * 2;
                let node_nativeTemplateHeight = view.getVisibleSize().height * 2;
                this.node_nativeTemplate.getComponent(UITransformComponent).setContentSize(node_nativeTemplateWidth, node_nativeTemplateHeight);
                this.node_nativeTemplate.setPosition(view.getVisibleSize().width / 2, view.getVisibleSize().height / 2);
                this.node_nativeTemplate.addComponent(UIOpacityComponent).opacity = 225;
                this.node_nativeTemplate.getComponent(UITransformComponent).priority = 30000;
                // 监听原生模板点击 防止背景被点击
                this.node_nativeTemplate.on(Node.EventType.TOUCH_START, (event) => {
                    console.log("XminigameSDK333");
                });
                this.node_nativeTemplate.addComponent(BlockInputEventsComponent);
                this.setChildrenNodeLayer(this.node_nativeTemplate);
            }).catch((err) => {
                console.log("XminigameSDK", "VIVO 原生模板广告展示错误:" + JSON.stringify(err));
            });
        }
    }


    /**
     * 展示系统插屏
     */
    showSystemInters() {
        if (this.systemIntersAd && this.loadSucc_SystemInters) {
            console.log("XminigameSDK", "VIVO showSystemInters==================");
            this.systemIntersAd.show().then(() => {
                console.log("XminigameSDK", "VIVO 系统插屏广告展示成功==================");
            }).catch((err) => {
                console.log("XminigameSDK", "VIVO 系统插屏展示错误:" + JSON.stringify(err));
            })
        }
    }

    /**
     * 展示原生插屏
     */
    showNativeInters() {
        console.log("XminigameSDK", "showNativeInters==================");

        if (!this.loadSucc_NativeInters || (!this.loadSucc_NativeImage && !this.loadSucc_NativeIcon)) {
            console.log("XminigameSDK", "原生插屏资源或原生广告未加载完成,展示原生插屏失败");
            return;
        }

        if (this.isShow_NativeInters) return;
        this.isShow_NativeInters = true;

        this.temp_hasShowBanner = this.hasShowBanner;
        // 隐藏banner
        this.hideBanner();

        // 上报
        let tempid = this.nativeAdInfo.adId;
        this.reportNativeAdShow(tempid);

        let width = view.getVisibleSize().width;
        let height = view.getVisibleSize().height;

        this.node_nativeInters = new Node();
        this.getSdkCanvas().addChild(this.node_nativeInters);
        this.node_nativeInters.active = false;
        let node_nativeIntersWidth = width;
        let node_nativeIntersHeight = height;
        this.node_nativeInters.addComponent(UITransformComponent);
        this.node_nativeInters.getComponent(UITransformComponent).setContentSize(node_nativeIntersWidth, node_nativeIntersHeight);
        let node_nativeIntersX = node_nativeIntersWidth / 2;
        let node_nativeIntersY = node_nativeIntersHeight / 2;
        this.node_nativeInters.setPosition(node_nativeIntersX, node_nativeIntersY);
        this.node_nativeInters.active = true;
        this.node_nativeInters.getComponent(UITransformComponent).priority = 29999;
        this.node_nativeInters.on(Node.EventType.TOUCH_START, function (event) {
        })

        // 黑色遮罩
        let Black = new Node();
        this.node_nativeInters.addChild(Black);
        Black.addComponent(SpriteComponent);
        let node_nativeIntersSp = new SpriteFrame();
        node_nativeIntersSp.texture = this.nativeIntersRes.Black;
        Black.getComponent(SpriteComponent).spriteFrame = node_nativeIntersSp;
        let BlackWidth = node_nativeIntersWidth;
        let BlackHeight = node_nativeIntersHeight;
        Black.getComponent(UITransformComponent).setContentSize(BlackWidth, BlackHeight);
        Black.addComponent(UIOpacityComponent).opacity = 225;

        // 背景图
        let Bg = new Node();
        this.node_nativeInters.addChild(Bg);
        Bg.addComponent(SpriteComponent);
        let BgSp = new SpriteFrame();
        BgSp.texture = this.nativeIntersRes.Bg;
        Bg.getComponent(SpriteComponent).spriteFrame = BgSp;

        let BgWidth = 0;
        let BgHeight = 0;
        if (width < height) {
            BgWidth = width * 0.95;
            BgHeight = BgWidth * 0.88;
            Bg.getComponent(UITransformComponent).setContentSize(BgWidth, BgHeight);
            let BgY = height * 0.1;
            Bg.setPosition(0, BgY);

            // // 按钮
            // let Button = new Node();
            // Bg.addChild(Button);
            // Button.addComponent(SpriteComponent);
            // let ButtonSp = new SpriteFrame();
            // ButtonSp.texture = this.nativeIntersRes.Button;
            // Button.getComponent(SpriteComponent).spriteFrame = ButtonSp;
            // let ButtonWidth = BgWidth * 0.7;
            // let ButtonHeight = ButtonWidth * 0.36;
            // Button.getComponent(UITransformComponent).setContentSize(ButtonWidth, ButtonHeight);
            // let ButtonY = -BgHeight / 2 - ButtonHeight / 2 - ButtonHeight * 0.4;
            // Button.setPosition(0, ButtonY);

            // // 按钮上的遮罩
            // let ButtonMask = new Node();
            // Button.addChild(ButtonMask);
            // ButtonMask.addComponent(MaskComponent);
            // let ButtonMaskWidth = ButtonWidth * 0.9;
            // let ButtonMaskHeight = ButtonHeight * 0.68;
            // ButtonMask.getComponent(UITransformComponent).setContentSize(ButtonMaskWidth, ButtonMaskHeight);

            // // 按钮流光
            // let Slide = new Node();
            // ButtonMask.addChild(Slide);
            // Slide.addComponent(SpriteComponent);
            // let SlideSp = new SpriteFrame();
            // SlideSp.texture = this.nativeIntersRes.Slide;
            // Slide.getComponent(SpriteComponent).spriteFrame = SlideSp;
            // let SlideHeight = ButtonHeight;
            // let SlideWidth = SlideHeight * (215 / 233);
            // Slide.getComponent(UITransformComponent).setContentSize(SlideWidth, SlideHeight);
            // let SlideX = -ButtonMaskWidth / 2;
            // Slide.setPosition(SlideX, 0);
            // tween(Slide)
            //     .repeatForever(
            //         tween()
            //             .by(1, { position: new Vec3(ButtonWidth, 0) })
            //             .call(() => {
            //                 SlideX = -ButtonMaskWidth / 2;
            //                 Slide.setPosition(SlideX, 0);
            //             })
            //     )
            //     .start();

            // //点击原生插屏
            // Button.on(Node.EventType.TOUCH_START, (event) => {
            //     this.reportNativeAdClick(tempid);
            //     this.isShow_NativeInters = false;
            //     this.NUM_IntersNowIntervalTime = 0;
            //     this.node_nativeInters.removeFromParent();
            //     this.node_nativeInters = null;
            //     if (this.callback_IntersClose) this.callback_IntersClose();
            //     if (this.temp_hasShowBanner) {
            //         this.showBanner();
            //         this.temp_hasShowBanner = false;
            //     }
            // });
        }
        else {
            BgHeight = height * 0.8;
            BgWidth = BgHeight * 1.13;
            Bg.getComponent(UITransformComponent).setContentSize(BgWidth, BgHeight);
        }

        //点击原生插屏
        Bg.on(Node.EventType.TOUCH_START, (event) => {
            this.reportNativeAdClick(tempid);
            this.isShow_NativeInters = false;
            this.NUM_IntersNowIntervalTime = 0;
            this.node_nativeInters.removeFromParent();
            this.node_nativeInters = null;
            if (this.callback_IntersClose) this.callback_IntersClose();
            if (this.temp_hasShowBanner) {
                this.showBanner();
                this.temp_hasShowBanner = false;
            }
        });


        // 大图
        if (this.loadSucc_NativeImage) {
            console.log("XminigameSDK", "原生插屏广告大图展示")
            let image = new Node();
            Bg.addChild(image);
            image.addComponent(SpriteComponent);
            let imageSp = new SpriteFrame();
            imageSp.texture = this.nativeAdInfo.Native_BigImage;
            image.getComponent(SpriteComponent).spriteFrame = imageSp;
            let imageWidth = BgWidth * 0.98;
            let imageHeight = imageWidth / 2;
            image.getComponent(UITransformComponent).setContentSize(imageWidth, imageHeight);
            let imageY = BgHeight / 2 - imageHeight / 2 - BgHeight * 0.01;
            image.setPosition(0, imageY);

            // icon
            let icon = new Node();
            Bg.addChild(icon);
            icon.addComponent(SpriteComponent);
            let iconSp = new SpriteFrame();
            iconSp.texture = this.loadSucc_NativeIcon ? this.nativeAdInfo.Native_icon : this.nativeAdInfo.Native_BigImage;
            icon.getComponent(SpriteComponent).spriteFrame = iconSp;
            let iconWidth = (BgHeight - imageHeight) / 2;
            let iconHeight = iconWidth;
            icon.getComponent(UITransformComponent).setContentSize(iconWidth, iconHeight);
            let iconX = iconWidth * 0.9 - BgWidth / 2;
            let iconY = imageY - imageHeight / 2 - iconHeight + iconHeight / 5;
            icon.setPosition(iconX, iconY);

            let TitleBg = new Node();
            Bg.addChild(TitleBg);
            TitleBg.addComponent(SpriteComponent);
            let TitleBgSp = new SpriteFrame();
            TitleBgSp.texture = this.nativeIntersRes.TitleBg;
            TitleBg.getComponent(SpriteComponent).spriteFrame = TitleBgSp;
            let TitleBgWidth = BgWidth - iconWidth * 2;
            let TitleBgHeight = TitleBgWidth * 0.28;
            TitleBg.getComponent(UITransformComponent).setContentSize(TitleBgWidth, TitleBgHeight);
            let TitleBgX = iconX + iconWidth * 0.7 + TitleBgWidth / 2;
            let TitleBgY = iconY;
            TitleBg.setPosition(TitleBgX, TitleBgY);

            let title = new Node();
            TitleBg.addChild(title);
            title.addComponent(LabelComponent);
            title.getComponent(LabelComponent).string = this.nativeAdInfo.title;
            title.getComponent(LabelComponent)._enabled = true;
            title.getComponent(LabelComponent).overflow = LabelComponent.Overflow.SHRINK;
            title.getComponent(LabelComponent).horizontalAlign = LabelComponent.HorizontalAlign.CENTER;
            title.getComponent(LabelComponent).verticalAlign = LabelComponent.VerticalAlign.CENTER;
            let titleWidth = TitleBgWidth;
            let titleHeight = TitleBgHeight;
            title.getComponent(UITransformComponent).setContentSize(titleWidth, titleHeight);

            let desc = new Node();
            Bg.addChild(desc);
            desc.addComponent(LabelComponent);
            desc.getComponent(LabelComponent).color = new Color(0x85, 0x81, 0x81);
            desc.getComponent(LabelComponent).string = this.nativeAdInfo.desc;
            desc.getComponent(LabelComponent).overflow = LabelComponent.Overflow.CLAMP;
            desc.getComponent(LabelComponent).horizontalAlign = LabelComponent.HorizontalAlign.CENTER;
            desc.getComponent(LabelComponent).verticalAlign = LabelComponent.VerticalAlign.CENTER;
            let descWidth = BgWidth;
            let descHeight = TitleBgHeight;
            desc.getComponent(UITransformComponent).setContentSize(descWidth, descHeight);
            let descY = TitleBgY - TitleBgHeight;
            desc.setPosition(0, descY);
        }
        else if (this.loadSucc_NativeIcon) {
            console.log("XminigameSDK", "原生插屏广告ICON展示")
            let icon = new Node("icon");
            Bg.addChild(icon);
            icon.addComponent(SpriteComponent);
            let iconSp = new SpriteFrame();
            iconSp.texture = this.nativeAdInfo.Native_icon;
            icon.getComponent(SpriteComponent).spriteFrame = iconSp;
            let iconHeight = BgHeight * 0.55;
            let iconWidth = iconHeight;
            icon.getComponent(UITransformComponent).setContentSize(iconWidth, iconHeight);
            let iconY = BgHeight / 2 - iconHeight / 2 - BgHeight * 0.02;
            icon.setPosition(0, iconY);

            // icon2
            let icon2 = new Node();
            Bg.addChild(icon2);
            icon2.addComponent(SpriteComponent);
            let icon2Sp = new SpriteFrame();
            icon2Sp.texture = this.nativeAdInfo.Native_icon;
            icon2.getComponent(SpriteComponent).spriteFrame = icon2Sp;
            let icon2Width = (BgHeight - iconHeight) / 2;
            let icon2Height = icon2Width;
            icon2.getComponent(UITransformComponent).setContentSize(icon2Width, icon2Height);
            let icon2X = icon2Width * 0.9 - BgWidth / 2;
            let icon2Y = iconY - iconHeight / 2 - icon2Height + icon2Height / 5;
            icon2.setPosition(icon2X, icon2Y);

            let TitleBg = new Node();
            Bg.addChild(TitleBg);
            TitleBg.addComponent(SpriteComponent);
            let TitleBgSp = new SpriteFrame();
            TitleBgSp.texture = this.nativeIntersRes.TitleBg;
            TitleBg.getComponent(SpriteComponent).spriteFrame = TitleBgSp;
            let TitleBgWidth = BgWidth - icon2Width * 2;
            let TitleBgHeight = TitleBgWidth * 0.28;
            TitleBg.getComponent(UITransformComponent).setContentSize(TitleBgWidth, TitleBgHeight);
            let TitleBgX = icon2X + icon2Width * 0.7 + TitleBgWidth / 2;
            let TitleBgY = icon2Y;
            TitleBg.setPosition(TitleBgX, TitleBgY);

            let title = new Node();
            TitleBg.addChild(title);
            title.addComponent(LabelComponent);
            title.getComponent(LabelComponent).string = this.nativeAdInfo.title;
            title.getComponent(LabelComponent)._enabled = true;
            title.getComponent(LabelComponent).overflow = LabelComponent.Overflow.SHRINK;
            title.getComponent(LabelComponent).horizontalAlign = LabelComponent.HorizontalAlign.CENTER;
            title.getComponent(LabelComponent).verticalAlign = LabelComponent.VerticalAlign.CENTER;
            let titleWidth = TitleBgWidth;
            let titleHeight = TitleBgHeight;
            title.getComponent(UITransformComponent).setContentSize(titleWidth, titleHeight);

            let desc = new Node();
            Bg.addChild(desc);
            desc.addComponent(LabelComponent);
            desc.getComponent(LabelComponent).color = new Color(0x85, 0x81, 0x81);
            desc.getComponent(LabelComponent).string = this.nativeAdInfo.desc;
            desc.getComponent(LabelComponent).overflow = LabelComponent.Overflow.CLAMP;
            desc.getComponent(LabelComponent).horizontalAlign = LabelComponent.HorizontalAlign.CENTER;
            desc.getComponent(LabelComponent).verticalAlign = LabelComponent.VerticalAlign.CENTER;
            let descWidth = BgWidth;
            let descHeight = TitleBgHeight;
            desc.getComponent(UITransformComponent).setContentSize(descWidth, descHeight);
            let descY = TitleBgY - TitleBgHeight;
            desc.setPosition(0, descY);
        }

        // 广告角标
        let AdTip = new Node();
        Bg.addChild(AdTip);
        AdTip.addComponent(SpriteComponent);
        let AdTipSp = new SpriteFrame();
        AdTipSp.texture = this.nativeIntersRes.AdTip;
        AdTip.getComponent(SpriteComponent).spriteFrame = AdTipSp;
        let AdTipWidth = BgWidth * 0.1;
        let AdTipHeight = AdTipWidth * (34 / 70);
        AdTip.getComponent(UITransformComponent).setContentSize(AdTipWidth, AdTipHeight);
        let AdTipX = BgWidth / 2 - AdTipWidth / 2;
        let AdTipY = AdTipHeight / 2 - BgHeight / 2;
        AdTip.setPosition(AdTipX, AdTipY);

        // 关闭按钮
        let Close = new Node();
        Bg.addChild(Close);
        Close.addComponent(SpriteComponent);
        let CloseSp = new SpriteFrame();
        CloseSp.texture = this.nativeIntersRes.Close;
        Close.getComponent(SpriteComponent).spriteFrame = CloseSp;
        let CloseWidth = BgWidth * 0.065;
        let CloseHeight = CloseWidth;
        Close.getComponent(UITransformComponent).setContentSize(CloseWidth, CloseHeight);
        let CloseX = CloseWidth * 1.5 - BgWidth * 0.5;
        let CloseY = BgHeight * 0.5 - CloseHeight * 1.5;
        Close.setPosition(CloseX, CloseY);
        Close.addComponent(BlockInputEventsComponent);

        //监听点击关闭按钮
        Close.on(Node.EventType.TOUCH_START, (event) => {
            this.isShow_NativeInters = false;
            this.NUM_IntersNowIntervalTime = 0;
            this.node_nativeInters.removeFromParent();
            this.node_nativeInters = null;
            if (this.callback_IntersClose) this.callback_IntersClose();
            if (this.temp_hasShowBanner) {
                this.showBanner();
                this.temp_hasShowBanner = false;
            }
        });

        this.setChildrenNodeLayer(this.node_nativeInters);
    }



    /**
     * 原生广告自动刷新
     */
    nativeAdAutoUpdate() {
        setTimeout(() => {
            this.nativeAd && this.nativeAd.load();
        }, this.NUM_NativeUpdateTime * 1000)
    }

    /**
     * 原生大图广告自动刷新
     */
    nativeImageAdAutoUpdate() {
        setTimeout(() => {
            this.nativeImageAd && this.nativeImageAd.load();
        }, this.NUM_NativeUpdateTime * 1000)
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
     * 每秒钟判断原生模板插屏是否加载超时(10s)
     */
    runNativeTemplateInterval() {
        setInterval(() => {
            if (this.loadFailTime_NativeTemplateInters >= 0) {
                this.loadFailTime_NativeTemplateInters++;
                if (this.loadFailTime_NativeTemplateInters > 10) {
                    this.createNativeTemplate();
                }
            }
        }, 1000);
    }
}
