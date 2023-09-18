import { BlockInputEventsComponent, CanvasComponent, Color, director, LabelComponent, Node, SpriteComponent, SpriteFrame, UIOpacityComponent, UITransformComponent, Vec3, view, WidgetComponent, MaskComponent, tween } from "cc";
import CheckConfig from "../utils/CheckConfig";
import GetConfig from "../utils/GetConfig";
import LoadRes from "../utils/LoadRes";
import LocalStorage from "../utils/LocalStorage";
import { AdInterface } from "./AdInterface";

export default class HuaweiAd implements AdInterface {
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
     * 原生大图广告开关
     */
    SW_NativeImage = false;
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
     * 原生banner广告ID
     */
    ID_NativeBanner;
    /**
     * 原生插屏广告ID
     */
    ID_NativeInters;
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
    NUM_BannerUpdateTime = 60;
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
    NUM_BannerCloseShowIntervalTime = 60;

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
     * 已经调用过showBanner?
     */
    hasShowBanner = false;
    /**
     * 正在展示系统banner
     */
    isShow_SystemBanner = false;
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
     * banner被用户关闭后的间隔时间
     */
    NUM_UserCloseBannerIntervalTime = 60;
    /**
     * banner关闭间隔定时器是否已经开始计时
     */
    hasStart_BannerCloseInterval = false;



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
     * 原生广告对象
     */
    nativeAd = null;
    /**
     * 已创建原生广告?
     */
    hasCreateNative = false;
    /**
     * 是否拉取的是新的原生广告
     */
    loadSucc_NewNativeAd = false;
    /**
     * 正在展示的原生广告id 0-原生banner 1-原生插屏 2-原生大图
     */
    nativeAdShowInfo = ["", "", ""];



    /**
     * 原生banner广告对象
     */
    nativeBannerAd = null;
    /**
     * 原生banner资源
     */
    nativeBannerRes = null;
    /**
     * 原生banner是否加载成功
     */
    loadSucc_NativeBanner = false;
    /**
     * 原生banner节点
     */
    node_nativeBanner: Node = null;
    /**
     * 原生banner广告信息
     */
    nativeBannerAdInfo = null;
    /**
     * 是否加载成功最新的原生banner广告
     */
    loadSucc_NewNativeBannerAd = false;



    /**
     * 原生插屏广告对象
     */
    nativeIntersAd = null;
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
     * 原生插屏广告信息
     */
    nativeIntersAdInfo = null;
    /**
     * 是否加载成功最新的原生插屏广告
     */
    loadSucc_NewNativeIntersAd = false;
    /**
     * 插屏关闭回调
     */
    intersHideCallback = null;




    /**
     * 原生大图广告对象
     */
    nativeImageAd = null;
    /**
     * 原生大图资源
     */
    nativeImageRes = null;
    /**
     * 原生大图资源是否加载成功
     */
    loadSucc_NativeImage = false;
    /**
     * 原生大图节点
     */
    node_nativeImage = null;
    /**
     * 程序传入的原生大图参数
     */
    params_nativeImage = {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        type: 1,
        hideCallback: null
    };
    /**
     * 原生大图广告信息
     */
    nativeImageAdInfo = null;
    /**
     * 是否加载成功最新的原生大图广告
     */
    loadSucc_NewNativeImageAd = false;


    /**
     * 隐私协议节点
     */
    node_privacyAgreement: Node = null;
    /**
     * 正在展示隐私协议
     */
    isShow_PrivacyAgreement = false;




    /**
     * 原生banner广告多id
     */
    ID_NativeBannerArray = [];
    /**
     * 原生banner广告多id当前索引
     */
    index_NativeBannerID = 0;

    /**
     * 原生大图多广告id
     */
    ID_NativeImageArray = [];
    /**
     * 原生大图多广告id当前索引
     */
    index_NativeImageID = 0;

    /**
     * 原生插屏多广告id
     */
    ID_NativeIntersArray = [];
    /**
     * 原生插屏多广告id当前索引
     */
    index_NativeIntersID = 0;




    /**
     * 正在展示的原生广告
     */
    isShowNativeAd = {
        nativeBannerAd: null,
        nativeIntersAd: null,
        nativeImageAd: null
    }

    /**
     * 原生广告ready2Show
     */
    ready2Show = {
        nativeBannerAd: false,
        nativeIntersAd: false,
        nativeImageAd: false
    }




    /**
     * 广告资源分组
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

        if (this.NUM_IntersIntervalTime > 0) this.runIntersInterval();

        if (this.SW_Video && this.ID_Video != "") this.createVideo();

        if (this.SW_Native) {
            if (this.SW_NativeBanner && this.ID_NativeBanner) {
                this.ID_NativeBannerArray = this.ID_NativeBanner.split(";");
                if (this.ID_NativeBannerArray.length != 1) {
                    this.index_NativeBannerID = Math.floor(Math.random() * (this.ID_NativeBannerArray.length));
                }
                this.loadNativeBannerRes();
            }
            if (this.SW_NativeInters && this.ID_NativeInters) {
                this.ID_NativeIntersArray = this.ID_NativeInters.split(";");
                if (this.ID_NativeIntersArray.length != 1) {
                    this.index_NativeIntersID = Math.floor(Math.random() * (this.ID_NativeIntersArray.length));
                }
                this.loadNativeInterRes();
            }
            if (this.SW_NativeImage && this.ID_NativeImage) {
                this.ID_NativeImageArray = this.ID_NativeImage.split(";");
                if (this.ID_NativeImageArray.length != 1) {
                    this.index_NativeImageID = Math.floor(Math.random() * (this.ID_NativeImageArray.length));
                }
                this.loadNativeImageRes();
            }

            this.onGameShow();
        }
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
        this.systemIntersAd = qg.createInterstitialAd({
            adUnitId: this.ID_SystemInters
        });

        //监听插屏加载完成
        this.systemIntersAd.onLoad((res) => {
            console.log("XminigameSDK", "HW 系统插屏广告加载完成");
            this.systemIntersAd.show();
        })

        //监听插屏广告加载错误
        this.systemIntersAd.onError((err) => {
            console.log("XminigameSDK", "HW 系统插屏加载失败：", JSON.stringify(err));
            if (this.intersHideCallback) this.intersHideCallback();
        })

        //监听插屏广告关闭
        this.systemIntersAd.onClose(() => {
            console.log("XminigameSDK", "HW 用户手动关闭系统插屏");
            this.NUM_IntersNowIntervalTime = 0;
            if (this.intersHideCallback) this.intersHideCallback();
        });

        //加载一次
        this.systemIntersAd.load();
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
        let windowWidth = qg.getSystemInfoSync().windowWidth;
        // @ts-ignore
        let windowHeight = qg.getSystemInfoSync().windowHeight;

        // @ts-ignore
        this.bannerAd = qg.createBannerAd({
            adUnitId: this.ID_SystemBanner,
            style: {
                top: windowHeight - 57,
                left: windowWidth < windowHeight ? (windowWidth - 360) / 2 : 0,
                height: 57,
                width: 360
            }
        })

        this.bannerAd.onLoad(() => {
            console.log("XminigameSDK", "HW 系统banner展示成功");
            this.isShow_SystemBanner = true;
        })

        this.bannerAd.onError((err) => {
            console.log("XminigameSDK", "HW 系统banner加载错误：", JSON.stringify(err));
        })

        this.bannerAd.onClose(() => {
            console.log("XminigameSDK", "HW 系统banner被用户关闭", this.NUM_BannerUpdateTime, "S后再次刷新");
            this.NUM_UserCloseBannerIntervalTime = 0;
            this.runBannerCloseInterval();
        })

        if (this.hasShowBanner) {
            this.bannerAd.show();
        }
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
        this.videoAd = hbs.createRewardedVideoAd({
            adUnitId: this.ID_Video,
        });

        //监听视频广告加载完成
        this.videoAd.onLoad(() => {
            console.log("XminigameSDK", "HW 视频广告加载完成");
            this.loadSucc_Video = true;
        })

        //监听视频广告加载出错
        this.videoAd.onError(err => {
            console.log("XminigameSDK", "HW 视频加载失败：" + JSON.stringify(err));
            this.loadSucc_Video = false;
            if (this.videoAd) {
                setTimeout(() => {
                    this.videoAd && this.videoAd.load()
                }, 30 * 1000)
            }
        })

        //监听视频广告播放完成
        this.videoAd.onClose(res => {
            if (res.isEnded) {
                console.log("XminigameSDK", "HW 激励视频广告完成，发放奖励");
                if (this.callback_Video) {
                    this.callback_Video(true);
                    this.videoAd.load();
                }
            } else {
                console.log("XminigameSDK", "HW 激励视频广告取消关闭，不发放奖励");
                if (this.callback_Video) {
                    this.callback_Video(false);
                    this.videoAd.load();
                }
            }
        })

        this.videoAd.load();
    }

    /**
     * 创建原生广告
     */
    // createNative() {
    //     console.log("XminigameSDK", "--createNative--");
    //     // if (CheckConfig.stringHasSpace(this.ID_Native)) {
    //     //     console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道原生广告ID中含有空字符串,请检查后台原生广告ID*********************");
    //     //     return;
    //     // }

    //     if (this.nativeAd) {
    //         this.nativeAd.offLoad();
    //         this.nativeAd.offError();
    //         this.nativeAd = null;
    //     }

    //     let id = "";

    //     if (this.createNative_NativeBanner) {
    //         id = this.ID_NativeBannerArray[this.index_NativeBannerID];
    //         if (this.index_NativeBannerID < this.ID_NativeBannerArray.length - 1) {
    //             this.index_NativeBannerID++;
    //         } else {
    //             this.index_NativeBannerID = 0;
    //         }
    //     }
    //     else if (this.createNative_NativeInters) {
    //         id = this.ID_NativeIntersArray[this.index_NativeIntersID];
    //         if (this.index_NativeIntersID < this.ID_NativeIntersArray.length - 1) {
    //             this.index_NativeIntersID++;
    //         } else {
    //             this.index_NativeIntersID = 0;
    //         }
    //     }
    //     else if (this.createNative_NativeImage) {
    //         id = this.ID_NativeImageArray[this.index_NativeImageID];
    //         if (this.index_NativeImageID < this.ID_NativeImageArray.length - 1) {
    //             this.index_NativeImageID++;
    //         } else {
    //             this.index_NativeImageID = 0;
    //         }
    //     }

    //     console.log("XminigameSDK", "id:" + id);

    //     // @ts-ignore
    //     this.nativeAd = hbs.createNativeAd({
    //         adUnitId: id
    //     })


    //     this.nativeAdInfo = {
    //         adId: null,
    //         title: "",
    //         source: "",
    //         Native_icon: null,
    //         Native_BigImage: null
    //     };

    //     this.hasCreateNative = true;


    //     this.nativeAd.onLoad((res) => {

    //         console.log("XminigameSDK", "HW 原生广告加载成功", JSON.stringify(res.adList[0]));

    //         this.loadSucc_NewNativeAd = true;

    //         let ad = res.adList[0];

    //         if (ad.adId != undefined && ad.adId != "") this.nativeAdInfo.adId = ad.adId;
    //         if (ad.title != undefined && ad.title != "") this.nativeAdInfo.title = ad.title;
    //         if (ad.source != undefined && ad.source != "") this.nativeAdInfo.source = ad.source;

    //         if (ad && ad.imgUrlList != undefined && ad.imgUrlList.length > 0) {
    //             let arr = new Array();
    //             arr[0] = ad.imgUrlList[0];
    //             LoadRes.loadResArray(arr, (err, texture) => {
    //                 this.nativeAdInfo.Native_BigImage = texture[0];
    //                 if (this.createNative_NativeBanner) {
    //                     this.createNative_NativeBanner = false;
    //                     this.res_NativeBannerLoadNative = this.nativeAdInfo;
    //                     this.showNativeBanner();
    //                 }
    //                 else if (this.createNative_NativeInters) {
    //                     this.createNative_NativeInters = false;
    //                     this.res_NativeIntersLoadNative = this.nativeAdInfo;
    //                     this.showNativeInters();
    //                 }
    //                 else if (this.createNative_NativeImage) {
    //                     this.createNative_NativeImage = false;
    //                     this.res_NativeImageLoadNative = this.nativeAdInfo;
    //                     this.showNativeImage(this.params_nativeImage.width, this.params_nativeImage.height,
    //                         this.params_nativeImage.x, this.params_nativeImage.y, this.params_nativeImage.type, this.params_nativeImage.hideCallback);
    //                 }
    //                 this.hasCreateNative = false;
    //             });
    //         } else {
    //             this.nativeAdInfo.Native_BigImage = null;
    //         }

    //     });


    //     //监听原生广告加载错误
    //     this.nativeAd.onError(err => {
    //         console.log("XminigameSDK", "HW 原生广告加载失败：", JSON.stringify(err));
    //         this.hasCreateNative = false;
    //         this.createNative_NativeBanner = false;
    //         this.createNative_NativeInters = false;
    //         this.createNative_NativeImage = false;
    //     });

    //     this.nativeAd.load();
    // }


    isOtherReady2Show() {
        for (const key in this.ready2Show) {
            if (this.ready2Show[key] === true) {
                return true;
            }
        }
        return false;
    }

    hideOtherShowing() {
        for (const key in this.isShowNativeAd) {
            if (this.isShowNativeAd[key] != null) {
                this.hideBanner();
                this.hideNativeInters();
                this.hideNativeImage();
                // this.isShowNativeAd[key].offLoad();
                // this.isShowNativeAd[key].offError();
                // this.isShowNativeAd[key] = null;
            }
        }
    }

    /**
     * 创建原生banner广告
     */
    createNativeBanner() {
        console.log("XminigameSDK", "--createNativeBanner--");

        if (this.isOtherReady2Show()) {
            console.log("XminigameSDK", "其他原生广告正ready2Show return");
            return;
        }

        this.ready2Show.nativeBannerAd = true;

        this.hideOtherShowing();


        let id = this.ID_NativeBannerArray[this.index_NativeBannerID];
        if (this.index_NativeBannerID < this.ID_NativeBannerArray.length - 1) {
            this.index_NativeBannerID++;
        } else {
            this.index_NativeBannerID = 0;
        }

        console.log("XminigameSDK", "createNativeBanner id:" + id);

        // @ts-ignore
        this.nativeBannerAd = hbs.createNativeAd({
            adUnitId: id
        })


        this.nativeBannerAdInfo = {
            adId: null,
            title: "",
            source: "",
            Native_icon: null,
            Native_BigImage: null
        };


        this.nativeBannerAd.onLoad((res) => {

            console.log("XminigameSDK", "HW 原生banner广告加载成功", JSON.stringify(res.adList[0]));

            let ad = res.adList[0];

            if (ad.adId != undefined && ad.adId != "") this.nativeBannerAdInfo.adId = ad.adId;
            if (ad.title != undefined && ad.title != "") this.nativeBannerAdInfo.title = ad.title;
            if (ad.source != undefined && ad.source != "") this.nativeBannerAdInfo.source = ad.source;

            if (ad && ad.imgUrlList != undefined && ad.imgUrlList.length > 0) {
                cc.loader.load(ad.imgUrlList[0], (err, texture) => {
                    this.loadSucc_NewNativeBannerAd = true;
                    this.nativeBannerAdInfo.Native_BigImage = texture;
                    this.showNativeBanner();
                });
            } else {
                console.log("XminigameSDK", "HW 原生banner广告图片加载失败");
                this.nativeBannerAdInfo.Native_BigImage = null;
                this.loadSucc_NewNativeBannerAd = false;
                this.ready2Show.nativeBannerAd = false;
            }
        });


        //监听原生广告加载错误
        this.nativeBannerAd.onError(err => {
            console.log("XminigameSDK", "HW 原生banner广告加载失败：", JSON.stringify(err));
            this.ready2Show.nativeBannerAd = false;
            this.loadSucc_NewNativeBannerAd = false;
            this.nativeBannerAdInfo.Native_BigImage = null;
        });

        this.nativeBannerAd.load();
    }

    /**
     * 创建原生插屏广告
     */
    createNativeInters() {
        console.log("XminigameSDK", "--createNativeInters--");

        if (this.isOtherReady2Show()) {
            console.log("XminigameSDK", "其他原生广告正ready2Show return");
            return;
        }

        this.ready2Show.nativeIntersAd = true;

        this.hideOtherShowing();

        let id = this.ID_NativeIntersArray[this.index_NativeIntersID];
        if (this.index_NativeIntersID < this.ID_NativeIntersArray.length - 1) {
            this.index_NativeIntersID++;
        } else {
            this.index_NativeIntersID = 0;
        }

        console.log("XminigameSDK", "createNativeInters id:" + id);

        // @ts-ignore
        this.nativeIntersAd = hbs.createNativeAd({
            adUnitId: id
        })


        this.nativeIntersAdInfo = {
            adId: null,
            title: "",
            source: "",
            Native_icon: null,
            Native_BigImage: null
        };


        this.nativeIntersAd.onLoad((res) => {

            console.log("XminigameSDK", "HW 原生插屏广告加载成功", JSON.stringify(res.adList[0]));

            let ad = res.adList[0];

            if (ad.adId != undefined && ad.adId != "") this.nativeIntersAdInfo.adId = ad.adId;
            if (ad.title != undefined && ad.title != "") this.nativeIntersAdInfo.title = ad.title;
            if (ad.source != undefined && ad.source != "") this.nativeIntersAdInfo.source = ad.source;

            if (ad && ad.imgUrlList != undefined && ad.imgUrlList.length > 0) {
                cc.loader.load(ad.imgUrlList[0], (err, texture) => {
                    this.nativeIntersAdInfo.Native_BigImage = texture;
                    this.loadSucc_NewNativeIntersAd = true;
                    this.showNativeInters();
                });
            } else {
                console.log("XminigameSDK", "HW 原生插屏广告图片加载失败");
                this.nativeIntersAdInfo.Native_BigImage = null;
                this.loadSucc_NewNativeIntersAd = false;
                this.ready2Show.nativeIntersAd = false;
            }
        });


        //监听原生广告加载错误
        this.nativeIntersAd.onError((err) => {
            console.log("XminigameSDK", "HW 原生插屏广告加载失败：", JSON.stringify(err));
            this.loadSucc_NewNativeIntersAd = false;
            this.nativeIntersAdInfo.Native_BigImage = null;
            this.ready2Show.nativeIntersAd = false;
            if (this.intersHideCallback) this.intersHideCallback();
        });

        this.nativeIntersAd.load();
    }


    /**
     * 创建原生大图广告
     */
    createNativeImage() {
        console.log("XminigameSDK", "--createNativeImage--");

        if (this.isOtherReady2Show()) {
            console.log("XminigameSDK", "其他原生广告正ready2Show return");
            return;
        }

        this.ready2Show.nativeImageAd = true;

        this.hideOtherShowing();


        let id = this.ID_NativeImageArray[this.index_NativeImageID];
        if (this.index_NativeImageID < this.ID_NativeImageArray.length - 1) {
            this.index_NativeImageID++;
        } else {
            this.index_NativeImageID = 0;
        }

        console.log("XminigameSDK", "createNativeImage id:" + id);

        // @ts-ignore
        this.nativeImageAd = hbs.createNativeAd({
            adUnitId: id
        })


        this.nativeImageAdInfo = {
            adId: null,
            title: "",
            source: "",
            Native_icon: null,
            Native_BigImage: null
        };


        this.nativeImageAd.onLoad((res) => {

            console.log("XminigameSDK", "HW 原生大图广告加载成功", JSON.stringify(res.adList[0]));

            let ad = res.adList[0];

            if (ad.adId != undefined && ad.adId != "") this.nativeImageAdInfo.adId = ad.adId;
            if (ad.title != undefined && ad.title != "") this.nativeImageAdInfo.title = ad.title;
            if (ad.source != undefined && ad.source != "") this.nativeImageAdInfo.source = ad.source;

            if (ad && ad.imgUrlList != undefined && ad.imgUrlList.length > 0) {
                cc.loader.load(ad.imgUrlList[0], (err, texture) => {
                    this.loadSucc_NewNativeImageAd = true;
                    this.nativeImageAdInfo.Native_BigImage = texture;
                    this.showNativeImage(this.params_nativeImage.width, this.params_nativeImage.height,
                        this.params_nativeImage.x, this.params_nativeImage.y, this.params_nativeImage.type, this.params_nativeImage.hideCallback);
                });
            } else {
                console.log("XminigameSDK", "HW 原生大图广告图片加载失败");
                this.loadSucc_NewNativeImageAd = false;
                this.nativeImageAdInfo.Native_BigImage = null;
                this.ready2Show.nativeImageAd = false;
            }
        });


        //监听原生广告加载错误
        this.nativeImageAd.onError(err => {
            console.log("XminigameSDK", "HW 原生大图广告加载失败：", JSON.stringify(err));
            this.loadSucc_NewNativeImageAd = false;
            this.nativeImageAdInfo.Native_BigImage = null;
            this.ready2Show.nativeImageAd = false;
        });

        this.nativeImageAd.load();
    }



    /**
     * 加载原生banner广告资源
     */
    loadNativeBannerRes() {
        console.log("XminigameSDK", "--loadNativeBannerRes--");

        this.nativeBannerRes = {
            NativeBannerBg: null,
            NativeBannerButton: null,
            NativeClose: null,
            NativeAdTip: null,
        }

        let nativeBannerResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeBannerBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeBannerButtonDownload.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeClose.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeAdTip.png",
        ]

        LoadRes.loadResArray(nativeBannerResArr, (err, texture) => {
            this.nativeBannerRes.NativeBannerBg = texture[0];
            this.nativeBannerRes.NativeBannerButton = texture[1];
            this.nativeBannerRes.NativeClose = texture[2];
            this.nativeBannerRes.NativeAdTip = texture[3];
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
            NativeInterMask: null,
            NativeIntersBg: null,
            NativeIntersButton: null,
            NativeIntersClose: null,
            NativeIntersAdTip: null,
        }

        let nativeIntersResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/NativeInters2/BlackBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/NativeInters2/Bg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/NativeInters2/Button.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/NativeInters2/Close.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/NativeInters2/AdTip.png",
        ]

        LoadRes.loadResArray(nativeIntersResArr, (err, texture) => {
            this.nativeIntersRes.NativeInterMask = texture[0];
            this.nativeIntersRes.NativeIntersBg = texture[1];
            this.nativeIntersRes.NativeIntersButton = texture[2];
            this.nativeIntersRes.NativeIntersClose = texture[3];
            this.nativeIntersRes.NativeIntersAdTip = texture[4];
            this.loadSucc_NativeInters = true;
            console.log("XminigameSDK", "原生插屏资源加载成功");
        })
    }


    /**
     * 加载原生大图广告资源
     */
    loadNativeImageRes() {
        console.log("XminigameSDK", "--loadNativeImageRes--");

        this.nativeImageRes = {
            Bg: null,
            Color: null,
            Close: null,
            AdTip: null,
            Button: null,
        }

        let nativeImageResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/image/Bg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/image/Color.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/image/Close.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/image/AdTip.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/image/Button.png",
        ]

        LoadRes.loadResArray(nativeImageResArr, (err, texture) => {
            this.nativeImageRes.Bg = texture[0];
            this.nativeImageRes.Color = texture[1];
            this.nativeImageRes.Close = texture[2];
            this.nativeImageRes.AdTip = texture[3];
            this.nativeImageRes.Button = texture[4];

            this.loadSucc_NativeImage = true;
            console.log("XminigameSDK", "其他大图资源加载成功");
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

        if (this.NUM_BannerMostShow <= this.NUM_BannerClose) {
            console.log("XminigameSDK", "banner最大关闭次数", this.NUM_BannerMostShow, " 已达上限 return");
            // 清除banner刷新定时器
            if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
            return;
        }

        if (this.NUM_UserCloseBannerIntervalTime < this.NUM_BannerCloseShowIntervalTime) {
            console.log("XminigameSDK", "banner展示间隔时间未达到", "当前:" + this.NUM_UserCloseBannerIntervalTime + " 预期:" + this.NUM_BannerCloseShowIntervalTime);
            return;
        }

        if (this.hasShowBanner) {
            console.log("XminigameSDK", "已经调用过showBanner,请勿重复调用");
            return;
        }
        // 已经调用过showBanner
        this.hasShowBanner = true;

        this.loadSucc_SystemBanner = this.SW_SystemBanner && this.ID_SystemBanner != "";

        // 两个开关同时打开
        if (this.SW_SystemBanner && this.SW_NativeBanner) {
            if (this.SW_SystemBannerFirst) {
                console.log("XminigameSDK", "系统banner优先");
                if (this.loadSucc_SystemBanner) {
                    this.showSystemBanner();
                } else if (this.loadSucc_NativeBanner) {
                    console.log("XminigameSDK", "系统banner未加载完成,改为展示原生banner");
                    this.showNativeBanner();
                }
            } else {
                console.log("XminigameSDK", "原生banner优先");
                if (this.loadSucc_NativeBanner) {
                    this.showNativeBanner();
                } else if (this.loadSucc_SystemBanner) {
                    console.log("XminigameSDK", "原生banner未加载完成,改为展示系统banner");
                    this.showSystemBanner();
                }
            }
        } else if (this.SW_SystemBanner) {
            this.showSystemBanner();
        } else if (this.SW_NativeBanner) {
            this.showNativeBanner();
        }
        // 刷新Banner
        this.updateBanner();
    }

    hideBanner() {
        // // 防止非预加载导致无法关闭
        // if (this.hasShowBanner) {
        // }
        this.hasShowBanner = false;
        this.hideNativeBanner();
        this.hideSystemBanner();
        if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
        if (this.timeout_checkBannerLoadSucc) clearTimeout(this.timeout_checkBannerLoadSucc);
    }

    getIntersFlag() {
        return this.loadSucc_NativeInters || (this.SW_AddDesktop && this.NUM_AutoAddDeskMostTimes > 0) || this.ID_SystemInters != "";
    }

    showInters(callback?) {
        if (callback) {
            this.intersHideCallback = callback;
        } else {
            this.intersHideCallback = null;
        }
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
        // 两个开关都打开的情况
        if (this.SW_SystemInters && this.SW_NativeInters) {
            // 系统插屏优先
            if (Math.floor(Math.random() * 100) >= this.NUM_NativeIntersP) {
                console.log("XminigameSDK", "系统插屏优先");
                if (this.ID_SystemInters != "") {
                    console.log("XminigameSDK", "系统插屏可以展示");
                    //有插屏延迟的情况下延迟展示插屏
                    if (this.NUM_IntersDelayTime > 0) {
                        let random = Math.floor(Math.random() * 100);
                        if (random < this.NUM_IntersDelayP) {
                            console.log("XminigameSDK", "插屏延迟时间(ms):" + this.NUM_IntersDelayTime);
                            setTimeout(() => {
                                this.showSystemInters();
                            }, this.NUM_IntersDelayTime)
                        } else {
                            this.showSystemInters();
                        }
                    }
                    else {
                        this.showSystemInters();
                    }
                }
                else {
                    console.log("XminigameSDK", "系统插屏没有加载完成");
                    if (this.loadSucc_NativeInters) {
                        console.log("XminigameSDK", "改为展示原生插屏");
                        //有插屏延迟的情况下延迟展示插屏
                        if (this.NUM_IntersDelayTime > 0) {
                            let random = Math.floor(Math.random() * 100);
                            if (random < this.NUM_IntersDelayP) {
                                console.log("XminigameSDK", "插屏延迟时间(ms):" + this.NUM_IntersDelayTime);
                                setTimeout(() => {
                                    this.showNativeInters();
                                }, this.NUM_IntersDelayTime)
                            } else {
                                this.showNativeInters();
                            }
                        }
                        else {
                            this.showNativeInters();
                        }
                    }
                }
            }
            else {
                console.log("XminigameSDK", "原生插屏优先");
                if (this.loadSucc_NativeInters) {
                    console.log("XminigameSDK", "原生插屏可以展示");
                    //有插屏延迟的情况下延迟展示插屏
                    if (this.NUM_IntersDelayTime > 0) {
                        let random = Math.floor(Math.random() * 100);
                        if (random < this.NUM_IntersDelayP) {
                            console.log("XminigameSDK", "插屏延迟时间(ms):" + this.NUM_IntersDelayTime);
                            setTimeout(() => {
                                this.showNativeInters();
                            }, this.NUM_IntersDelayTime)
                        } else {
                            this.showNativeInters();
                        }
                    }
                    else {
                        this.showNativeInters();
                    }
                }
                else {
                    console.log("XminigameSDK", "原生插屏没有加载到");
                    if (this.ID_SystemInters != "") {
                        console.log("XminigameSDK", "改为展示系统插屏");
                        //有插屏延迟的情况下延迟展示插屏
                        if (this.NUM_IntersDelayTime > 0) {
                            let random = Math.floor(Math.random() * 100);
                            if (random < this.NUM_IntersDelayP) {
                                console.log("XminigameSDK", "插屏延迟时间(ms):" + this.NUM_IntersDelayTime);
                                setTimeout(() => {
                                    this.showSystemInters();
                                }, this.NUM_IntersDelayTime)
                            } else {
                                this.showSystemInters();
                            }
                        }
                        else {
                            this.showSystemInters();
                        }
                    }
                }

            }
        }
        // 只打开了系统插屏开关的情况
        else if (this.SW_SystemInters) {
            console.log("XminigameSDK", "只打开了系统插屏");
            //有插屏延迟的情况下延迟展示插屏
            if (this.NUM_IntersDelayTime > 0) {
                let random = Math.floor(Math.random() * 100);
                if (random < this.NUM_IntersDelayP) {
                    console.log("XminigameSDK", "插屏延迟时间(ms):" + this.NUM_IntersDelayTime);
                    setTimeout(() => {
                        this.showSystemInters();
                    }, this.NUM_IntersDelayTime)
                } else {
                    this.showSystemInters();
                }
            }
            else {
                this.showSystemInters();
            }
        }
        // 只打开了原生插屏的情况
        else if (this.SW_NativeInters) {
            console.log("XminigameSDK", "只打开了原生插屏");
            if (this.loadSucc_NativeInters) {
                //有插屏延迟的情况下延迟展示插屏
                if (this.NUM_IntersDelayTime > 0) {
                    let random = Math.floor(Math.random() * 100);
                    if (random < this.NUM_IntersDelayP) {
                        console.log("XminigameSDK", "插屏延迟时间(ms):" + this.NUM_IntersDelayTime);
                        setTimeout(() => {
                            this.showNativeInters();
                        }, this.NUM_IntersDelayTime)
                    } else {
                        this.showNativeInters();
                    }
                }
                else {
                    this.showNativeInters();
                }
            }
        }
        // 两个插屏开关都没有打开
        else {
            console.log("XminigameSDK", "系统插屏开关和原生插屏开关都没有打开");
        }

    }

    getVideoFlag() {
        return this.loadSucc_Video;
    }

    showVideo(videoCallback, reason?) {
        if (this.videoAd && this.loadSucc_Video) {
            console.log("XminigameSDK", "HW showVideo========================");
            this.callback_Video = videoCallback;
            this.videoAd.show();
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
        return this.loadSucc_NativeImage;
    }
    showNativeImage(width, height, x, y, type?, hideCallback?) {
        if (this.node_nativeImage != null) {
            return;
        }

        // 如果已经创建了原生广告 但未拉取到原生广告
        if (!this.loadSucc_NewNativeImageAd) {
            this.createNativeImage();
            return;
        }
        this.loadSucc_NewNativeImageAd = false;

        if (!this.ready2Show.nativeImageAd) {
            return;
        }
        this.ready2Show.nativeImageAd = false;

        this.isShowNativeAd.nativeImageAd = this.nativeImageAd;

        this.params_nativeImage = {
            width: width,
            height: height,
            x: x,
            y: y,
            type: type,
            hideCallback: hideCallback
        }

        if (type == 1) {
            this.showNewNativeImage(1, hideCallback);
            return;
        }

        let tempid = this.nativeImageAdInfo.adId;
        this.reportNativeImageAdShow(tempid);

        this.nativeAdShowInfo[2] = tempid;

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
        spriteFrameNativeAdTip.texture = this.nativeImageRes.AdTip;
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
        spriteFrameNativeClose.texture = this.nativeImageRes.Close;
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
        } else {
            NativeCloseWidth = 80 * (view.getDesignResolutionSize().height / 1080);
        }
        NativeCloseHeight = NativeCloseWidth;
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
            this.hideNativeImage();
            if (hideCallback) hideCallback();
        });

        this.setChildrenNodeLayer(this.node_nativeImage);

    }

    showNewNativeImage(type, hideCallback) {

        let tempid = this.nativeImageAdInfo.adId;
        this.reportNativeImageAdShow(tempid);

        this.nativeAdShowInfo[2] = tempid;

        let width = view.getVisibleSize().width;
        let height = view.getVisibleSize().height;
        this.node_nativeImage = new Node("node_nativeImage");
        this.getSdkCanvas().addChild(this.node_nativeImage);
        this.node_nativeImage.addComponent(SpriteComponent);
        let node_nativeImageSp = new SpriteFrame();
        node_nativeImageSp.texture = this.nativeImageRes.Bg;
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
            this.hideNativeImage();
            if (hideCallback) hideCallback();
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
        runColorSp.texture = this.nativeImageRes.Color;
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
        buttonSp.texture = this.nativeImageRes.Button;
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
        closeSp.texture = this.nativeImageRes.Close;
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
        adTipSp.texture = this.nativeImageRes.AdTip;
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
        if (this.node_nativeImage) {
            console.log("XminigameSDK", "hideNativeImage===========================")
            this.nativeAdShowInfo[2] = "";
            this.node_nativeImage.removeFromParent();
            this.node_nativeImage = null;
        }
        if (this.nativeImageAd) {
            this.nativeImageAd.offLoad();
            this.nativeImageAd.offError();
            this.nativeImageAd = null;
        }
        this.ready2Show.nativeImageAd = false;
        this.isShowNativeAd.nativeImageAd = null;
    }

    getNativePasterFlag() {
        return false;
    }
    showNativePaster() {
    }

    getNativeAdInfo(type) {
    }
    reportNativeBannerAdShow(adId) {
        console.log("XminigameSDK", "HW 原生banner广告上报展示", "广告ID为:" + adId);
        this.nativeBannerAd.reportAdShow({
            adId: adId
        })
    }
    reportNativeBannerAdClick(adId) {
        console.log("XminigameSDK", "HW 原生banner广告上报点击", "广告ID为:" + adId);
        this.nativeBannerAd.reportAdClick({
            adId: adId
        })
    }
    reportNativeIntersAdShow(adId) {
        console.log("XminigameSDK", "HW 原生插屏广告上报展示", "广告ID为:" + adId);
        this.nativeIntersAd.reportAdShow({
            adId: adId
        })
    }
    reportNativeIntersAdClick(adId) {
        console.log("XminigameSDK", "HW 原生插屏广告上报点击", "广告ID为:" + adId);
        this.nativeIntersAd.reportAdClick({
            adId: adId
        })
    }
    reportNativeImageAdShow(adId) {
        console.log("XminigameSDK", "HW 原生大图广告上报展示", "广告ID为:" + adId);
        this.nativeImageAd.reportAdShow({
            adId: adId
        })
    }
    reportNativeImageAdClick(adId) {
        console.log("XminigameSDK", "HW 原生大图广告上报点击", "广告ID为:" + adId);
        this.nativeImageAd.reportAdClick({
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
    }

    hasAddDesktopFunc() {
        return true;
    }

    getAddDesktopFlag(callback) {
        // @ts-ignore
        hbs.hasInstalled({
            success: function (res) {
                if (res) {
                    console.log("XminigameSDK", "HW 已创建桌面图标");
                    callback(false);
                } else {
                    console.log("XminigameSDK", "HW 未创建桌面图标");
                    callback(true);
                }
            },
            fail: function (data) {
                console.log("XminigameSDK", "HW 添加桌面未知错误:" + data);
                callback(false);
            }
        })
    }

    addDesktop(callback) {
        // @ts-ignore
        hbs.install({
            success: function (res) {
                console.log("XminigameSDK", "HW 添加桌面成功");
                callback(true);
            },
            fail: function (erromsg, errocode) {
                console.log("XminigameSDK", "HW 添加桌面失败:" + JSON.stringify(erromsg));
                callback(false);
            }
        });
    }

    phoneVibrate(type) {
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
        callback(null);
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
        console.log("XminigameSDK", "HW getUserData=====================");
        let userData = {
            userId: LocalStorage.getData("userId"),
            token: LocalStorage.getData("token"),
            userType: LocalStorage.getData("userType"),
        }
        callback(userData);
    }

    getUserInfo(callback) {
        console.log("XminigameSDK", "HW getUserInfo=====================");
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
        hbs.authorize({
            scope: 'userInfo',
            params: {
                appid: GetConfig.getAppId(),
                type: "token",
                scope: 'scope.baseProfile',
                state: "200"
            },
            success: (res) => {
                console.log("XminigameSDK", "HW authorize success", res);
                userInfo.name = LocalStorage.getData("nickName");
                userInfo.power = true;
                callback(userInfo);
            },
            fail: () => {
                console.log("XminigameSDK", "HW authorize fail");
                userInfo.power = false;
                callback(userInfo);
            },
        })
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

        console.log("XminigameSDK", "HW showPrivacyAgreement==================");

        switch (companyLogUrl) {
            case "":
                companyLogUrl = "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement/companyLogUrl_Xplay.png";
                htmlUrl = "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement/htmlUrl_Xplay.html";
                break;
            case "xyy":
                companyLogUrl = "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement/companyLogUrl_Xyy.png";
                htmlUrl = "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement/htmlUrl_Xyy.html";
                break;
            default:
                break;
        }

        // if (companyLogUrl == "") companyLogUrl = "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement/companyLogUrl_Xplay.png";
        // if (htmlUrl == "") htmlUrl = "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement/htmlUrl_Xplay.html";

        let privacyAgreementResArr = [
            companyLogUrl,
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement/PrivacyAgreementBtn.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement/Agree.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement/Close.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement/Black.png",
        ]

        LoadRes.loadResArray(privacyAgreementResArr, (err, texture) => {

            this.node_privacyAgreement = new Node("node_privacyAgreement");
            this.getSdkCanvas().addChild(this.node_privacyAgreement);
            this.node_privacyAgreement.setPosition(new Vec3(view.getVisibleSize().width / 2, view.getVisibleSize().height / 2))
            if (view.getVisibleSize().width < view.getVisibleSize().height) {
                let scaleNum = view.getDesignResolutionSize().width / 1080;
                this.node_privacyAgreement.setScale(new Vec3(scaleNum, scaleNum, 1));
            } else {
                let scaleNum = view.getDesignResolutionSize().height / 1080;
                this.node_privacyAgreement.setScale(new Vec3(scaleNum, scaleNum, 1));
            }

            this.node_privacyAgreement.addComponent(UITransformComponent);
            this.node_privacyAgreement.getComponent(UITransformComponent).priority = 30000;

            let Black: Node = new Node("Black");
            this.node_privacyAgreement.addChild(Black);
            Black.addComponent(SpriteComponent);
            let spriteFrameBlack = new SpriteFrame();
            spriteFrameBlack.texture = texture[4];
            Black.getComponent(SpriteComponent).spriteFrame = spriteFrameBlack;
            let blackWidth = view.getVisibleSize().width * 2;
            let blackHeight = view.getVisibleSize().height * 2;
            Black.getComponent(UITransformComponent).setContentSize(blackWidth, blackHeight);
            Black.addComponent(UIOpacityComponent);
            Black.getComponent(UIOpacityComponent).opacity = 150;
            Black.addComponent(BlockInputEventsComponent);
            Black.on(Node.EventType.TOUCH_END, (event) => {
            })

            let main: Node = new Node("main");
            this.node_privacyAgreement.addChild(main);
            main.addComponent(SpriteComponent);
            let spriteFrameMain = new SpriteFrame();
            spriteFrameMain.texture = texture[0];
            main.getComponent(SpriteComponent).spriteFrame = spriteFrameMain;
            main.setPosition(new Vec3(0, 0));

            let privacyAgreementBtn: Node = new Node("privacyAgreementBtn");
            main.addChild(privacyAgreementBtn);
            privacyAgreementBtn.addComponent(SpriteComponent);
            let spriteFrameBtn = new SpriteFrame();
            spriteFrameBtn.texture = texture[1];
            privacyAgreementBtn.getComponent(SpriteComponent).spriteFrame = spriteFrameBtn;
            privacyAgreementBtn.addComponent(WidgetComponent);
            privacyAgreementBtn.getComponent(WidgetComponent).isAlignRight = true;
            privacyAgreementBtn.getComponent(WidgetComponent).right = 236;
            privacyAgreementBtn.getComponent(WidgetComponent).isAlignBottom = true;
            privacyAgreementBtn.getComponent(WidgetComponent).bottom = 207;

            let agree: Node = new Node("agree");
            main.addChild(agree);
            agree.addComponent(SpriteComponent);
            let spriteFrameAgree = new SpriteFrame();
            spriteFrameAgree.texture = texture[2];
            agree.getComponent(SpriteComponent).spriteFrame = spriteFrameAgree;
            agree.addComponent(WidgetComponent);
            agree.getComponent(WidgetComponent).isAlignRight = true;
            agree.getComponent(WidgetComponent).right = 23;
            agree.getComponent(WidgetComponent).isAlignBottom = true;
            agree.getComponent(WidgetComponent).bottom = 50.5;

            let close: Node = new Node("close");
            main.addChild(close);
            close.addComponent(SpriteComponent);
            let spriteFrameClose = new SpriteFrame();
            spriteFrameClose.texture = texture[3];
            close.getComponent(SpriteComponent).spriteFrame = spriteFrameClose;
            close.addComponent(WidgetComponent);
            close.getComponent(WidgetComponent).isAlignLeft = true;
            close.getComponent(WidgetComponent).left = 24.5;
            close.getComponent(WidgetComponent).isAlignBottom = true;
            close.getComponent(WidgetComponent).bottom = 51.5;


            // 监听用户点击隐私协议
            privacyAgreementBtn.on(Node.EventType.TOUCH_END, () => {
                // @ts-ignore
                hbs.openDeeplink({
                    uri: htmlUrl
                })
            })

            // 监听用户点击同意
            agree.on(Node.EventType.TOUCH_END, () => {
                this.hidePrivacyAgreement();
                LocalStorage.setData("agreePrivacy", "true");
                callback(true);
            })

            // 监听用户点击关闭
            close.on(Node.EventType.TOUCH_END, () => {
                this.hidePrivacyAgreement();
                // @ts-ignore
                qg.exitApplication({});
                callback(false);
            })

            this.setChildrenNodeLayer(this.node_privacyAgreement);
        })
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

        this.loadSucc_SystemBanner = this.SW_SystemBanner && this.ID_SystemBanner != "";

        this.loadSucc_Banner = this.loadSucc_NativeBanner || this.loadSucc_SystemBanner;

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
        if (this.node_nativeBanner != null) {
            return;
        }

        if (!this.loadSucc_NewNativeBannerAd) {
            this.createNativeBanner();
            return;
        }
        this.loadSucc_NewNativeBannerAd = false;

        if (!this.ready2Show.nativeBannerAd) {
            return;
        }
        this.ready2Show.nativeBannerAd = false;

        this.isShowNativeAd.nativeBannerAd = this.nativeBannerAd;


        console.log("XminigameSDK", "showNativeBanner========================");

        //原生广告id
        let tempid = this.nativeBannerAdInfo.adId;
        this.reportNativeBannerAdShow(tempid);

        this.nativeAdShowInfo[0] = tempid;

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
            this.reportNativeBannerAdClick(tempid);
            console.log("XminigameSDK", "原生banner关闭", this.NUM_BannerUpdateTime + "S后再次刷新");
            this.hideNativeBanner();
            // 广告关闭统计
            this.NUM_BannerClose++;
            this.updateBanner();
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
        bannerButton.active = true;
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

        // 大图
        let image: Node = new Node("image");
        this.node_nativeBanner.addChild(image);
        image.addComponent(SpriteComponent);
        let spriteFrameImage = new SpriteFrame();
        spriteFrameImage.texture = this.nativeBannerAdInfo.Native_BigImage;
        image.getComponent(SpriteComponent).spriteFrame = spriteFrameImage;
        let imageHeight = node_nativeBannerHeight;
        let imageWidth = imageHeight * 2;

        image.getComponent(UITransformComponent).setContentSize(imageWidth, imageHeight);
        let imageX = imageWidth / 2 - node_nativeBannerWidth / 2;
        let imageY = 0;
        image.setPosition(imageX, imageY);

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
        titleLabel.getComponent(LabelComponent).string = this.nativeBannerAdInfo.title;
        titleLabel.getComponent(LabelComponent).horizontalAlign = LabelComponent.HorizontalAlign.LEFT;
        titleLabel.getComponent(LabelComponent).verticalAlign = LabelComponent.VerticalAlign.TOP;
        titleLabel.getComponent(LabelComponent).lineHeight = titleLabel.getComponent(LabelComponent).fontSize;
        titleLabel.getComponent(LabelComponent).color = new Color(0xFF, 0x00, 0x00);
        let titleLabelWidth = node_nativeBannerWidth - imageWidth - bannerButtonWidth - 0.2 * node_nativeBannerHeight / 0.45;
        let titleLabelHeight = node_nativeBannerHeight / 2;

        titleLabel.getComponent(UITransformComponent).setContentSize(titleLabelWidth, titleLabelHeight);
        let titleLabelY = node_nativeBannerHeight / 2 - titleLabelHeight / 2 - 0.1 * node_nativeBannerHeight;
        let titleLabelX = -node_nativeBannerWidth / 2 + node_nativeBannerHeight * 2.2 + titleLabelWidth / 2;
        titleLabel.setPosition(titleLabelX, titleLabelY);

        // 描述
        let sourceLabel: Node = new Node("sourceLabel");
        this.node_nativeBanner.addChild(sourceLabel);
        sourceLabel.addComponent(LabelComponent);
        sourceLabel.getComponent(LabelComponent).overflow = LabelComponent.Overflow.CLAMP;
        if (view.getVisibleSize().width < view.getVisibleSize().height) {
            sourceLabel.getComponent(LabelComponent).fontSize = 35 * (view.getDesignResolutionSize().width / 1080);
        } else {
            sourceLabel.getComponent(LabelComponent).fontSize = 35 * (view.getDesignResolutionSize().height / 1080);
        }
        sourceLabel.getComponent(LabelComponent).string = this.nativeBannerAdInfo.source;
        sourceLabel.getComponent(LabelComponent).horizontalAlign = LabelComponent.HorizontalAlign.LEFT;
        sourceLabel.getComponent(LabelComponent).verticalAlign = LabelComponent.VerticalAlign.CENTER;
        sourceLabel.getComponent(LabelComponent).lineHeight = sourceLabel.getComponent(LabelComponent).fontSize;
        sourceLabel.getComponent(LabelComponent).color = new Color(0xFF, 0x00, 0x00);
        let sourceLabelWidth = node_nativeBannerWidth - imageWidth - bannerButtonWidth - 0.2 * node_nativeBannerHeight / 0.45;
        let sourceLabelHeight = node_nativeBannerHeight / 2;

        sourceLabel.getComponent(UITransformComponent).setContentSize(sourceLabelWidth, sourceLabelHeight);
        let sourceLabelY = -node_nativeBannerHeight / 2 + sourceLabelHeight / 2;
        let sourceLabelX = -node_nativeBannerWidth / 2 + node_nativeBannerHeight * 2.2 + sourceLabelWidth / 2;
        sourceLabel.setPosition(sourceLabelX, sourceLabelY);

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
            console.log("XminigameSDK", "原生banner关闭", this.NUM_BannerUpdateTime + "S后再次刷新");
            this.hideNativeBanner();
            // 广告关闭统计
            this.NUM_BannerClose++;
            // banner关闭展示间隔计时器
            this.NUM_UserCloseBannerIntervalTime = 0;
            this.runBannerCloseInterval();
            this.updateBanner();
            // 清除触摸事件的冒泡
            // event.stopPropagation();
        });

        this.setChildrenNodeLayer(this.node_nativeBanner);

    }


    /**
     * 展示系统banner
     */
    showSystemBanner() {
        console.log("XminigameSDK", "HW showSystemBanner========================");
        this.createSystemBanner();
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

            this.loadSucc_SystemBanner = this.SW_SystemBanner && this.ID_SystemBanner != "";

            if (this.SW_SystemBanner && this.SW_NativeBanner) {
                if (this.SW_SystemBannerFirst) {
                    console.log("XminigameSDK", "系统banner优先");
                    if (this.loadSucc_SystemBanner) {
                        console.log("XminigameSDK", "刷新系统banner");
                        this.updateSystemBanner();
                    } else if (this.loadSucc_NativeBanner) {
                        console.log("XminigameSDK", "系统banner未加载完成,改为刷新原生banner");
                        this.updateNativeBanner();
                    }
                } else {
                    console.log("XminigameSDK", "原生banner优先");
                    if (this.loadSucc_NativeBanner) {
                        console.log("XminigameSDK", "刷新原生banner");
                        this.updateNativeBanner();
                    } else if (this.loadSucc_SystemBanner) {
                        console.log("XminigameSDK", "原生banner未加载完成,改为刷新系统banner");
                        this.updateSystemBanner();
                    }
                }
            } else if (this.SW_SystemBanner) {
                this.updateSystemBanner();
            } else if (this.SW_NativeBanner) {
                this.updateNativeBanner();
            }
        }, this.NUM_BannerUpdateTime * 1000)

    }


    /**
     * 刷新系统banner
     */
    updateSystemBanner() {
        console.log("XminigameSDK", "HW updateSystemBanner========================");
        this.hideNativeBanner();
        this.hideSystemBanner();
        this.createSystemBanner();
    }

    /**
     * 隐藏系统banner
     */
    hideSystemBanner() {
        if (this.isShow_SystemBanner) {
            console.log("XminigameSDK", "HW hideSystemBanner========================");
            this.isShow_SystemBanner = false;
            if (this.bannerAd) {
                this.bannerAd.destroy();
                this.bannerAd = null;
            }
        }
    }


    /**
     * 刷新原生banner
     */
    updateNativeBanner() {
        console.log("XminigameSDK", "HW updateNativeBanner========================");
        this.hideNativeBanner();
        this.hideSystemBanner();
        this.showNativeBanner();
    }

    /**
     * 隐藏原生banner
     */
    hideNativeBanner() {
        if (this.node_nativeBanner) {
            console.log("XminigameSDK", "HW hideNativeBanner========================");
            this.nativeAdShowInfo[0] = "";
            this.node_nativeBanner.removeFromParent();
            this.node_nativeBanner = null;
        }
        if (this.nativeBannerAd) {
            this.nativeBannerAd.offLoad();
            this.nativeBannerAd.offError();
            this.nativeBannerAd = null;
        }
        this.ready2Show.nativeBannerAd = false;
        this.isShowNativeAd.nativeBannerAd = null;
    }


    /**
     * 展示系统插屏
     */
    showSystemInters() {
        if (this.ID_SystemInters == "") {
            console.log("XminigameSDK", "HW 插屏未加载完成或后台系统插屏广告id为空");
            return;
        }
        console.log("XminigameSDK", "HW showSystemInters========================");
        if (this.systemIntersAd) {
            this.systemIntersAd.load();
        } else {
            this.createSystemInters();
        }
    }


    /**
     * 展示原生插屏
     */
    showNativeInters() {
        if (this.node_nativeInters != null) {
            return;
        }

        if (!this.loadSucc_NewNativeIntersAd) {
            this.createNativeInters();
            return;
        }
        this.loadSucc_NewNativeIntersAd = false;

        if (!this.ready2Show.nativeIntersAd) {
            return;
        }
        this.ready2Show.nativeIntersAd = false;

        this.isShowNativeAd.nativeIntersAd = this.nativeIntersAd;

        console.log("XminigameSDK", "showNativeInters========================");

        //原生广告id
        let tempid = this.nativeIntersAdInfo.adId;
        this.reportNativeIntersAdShow(tempid);

        this.nativeAdShowInfo[1] = tempid;

        // 插屏节点的背景
        this.node_nativeInters = new Node("node_nativeInters");
        this.getSdkCanvas().addChild(this.node_nativeInters);
        let node_nativeIntersWidth = 2560;
        let node_nativeIntersHeight = 2560;
        this.node_nativeInters.addComponent(UITransformComponent);
        this.node_nativeInters.getComponent(UITransformComponent).setContentSize(node_nativeIntersWidth, node_nativeIntersHeight);
        let node_nativeIntersX = view.getVisibleSize().width / 2;
        let node_nativeIntersY = view.getVisibleSize().height / 2;
        this.node_nativeInters.setPosition(node_nativeIntersX, node_nativeIntersY);
        this.node_nativeInters.getComponent(UITransformComponent).priority = 30000;

        this.node_nativeInters.on(Node.EventType.TOUCH_START, function (event) {
        })

        // 插屏黑色背景
        let NativeInterMask: Node = new Node("NativeInterMask");
        this.node_nativeInters.addChild(NativeInterMask);
        NativeInterMask.addComponent(SpriteComponent);
        let spriteFrameNativeInterMask = new SpriteFrame();
        spriteFrameNativeInterMask.texture = this.nativeIntersRes.NativeInterMask;
        NativeInterMask.getComponent(SpriteComponent).spriteFrame = spriteFrameNativeInterMask;
        let NativeInterMaskWidth = node_nativeIntersWidth;
        let NativeInterMaskHeight = node_nativeIntersHeight;

        NativeInterMask.getComponent(UITransformComponent).setContentSize(NativeInterMaskWidth, NativeInterMaskHeight);
        NativeInterMask.addComponent(UIOpacityComponent);
        NativeInterMask.getComponent(UIOpacityComponent).opacity = 150;

        // 插屏主界面背景
        let NativeIntersBg: Node = new Node("NativeIntersBg");
        this.node_nativeInters.addChild(NativeIntersBg);
        NativeIntersBg.addComponent(SpriteComponent);
        let spriteFrameNativeIntersBg = new SpriteFrame();
        spriteFrameNativeIntersBg.texture = this.nativeIntersRes.NativeIntersBg;
        NativeIntersBg.getComponent(SpriteComponent).spriteFrame = spriteFrameNativeIntersBg;

        let NativeIntersBgWidth = 0;
        let NativeIntersBgHeight = 0;
        let NativeIntersBgY = 0;

        let NativeIntersButtonWidth = 0;
        let NativeIntersButtonHeight = 0;
        let NativeIntersButtonY = 0;

        let NativeIntersButton: Node = null;
        if (view.getVisibleSize().width < view.getVisibleSize().height) {
            NativeIntersBgWidth = view.getVisibleSize().width * 0.95;
            NativeIntersBgHeight = NativeIntersBgWidth * 0.65;
            NativeIntersBgY = view.getVisibleSize().height * 0.05;

            // 查看广告按钮
            NativeIntersButton = new Node("NativeIntersButton");
            NativeIntersBg.addChild(NativeIntersButton);
            NativeIntersButton.addComponent(SpriteComponent);
            let spriteFrameNativeIntersButton = new SpriteFrame();
            spriteFrameNativeIntersButton.texture = this.nativeIntersRes.NativeIntersButton;
            NativeIntersButton.getComponent(SpriteComponent).spriteFrame = spriteFrameNativeIntersButton;
            NativeIntersButtonWidth = NativeIntersBgWidth * 0.6;
            NativeIntersButtonHeight = NativeIntersButtonWidth * 0.25;
            NativeIntersButtonY = -NativeIntersBgHeight / 2 - NativeIntersButtonHeight / 2 - NativeIntersButtonHeight * 0.3;

            //点击原生插屏
            NativeIntersButton.on(Node.EventType.TOUCH_START, (event) => {
                this.reportNativeIntersAdClick(tempid);
                this.hideNativeInters();
                // this.reportNativeAdClick(tempid);
                // this.nativeAdShowInfo[1] = "";
                // this.node_nativeInters.removeFromParent();
                // this.node_nativeInters = null;
                // this.NUM_IntersNowIntervalTime = 0;
            });
        }
        // 横屏
        else {
            NativeIntersBgHeight = view.getVisibleSize().height * 0.6;
            NativeIntersBgWidth = NativeIntersBgHeight * 1.5;
            NativeIntersBgY = view.getVisibleSize().height * 0.1;

            // 查看广告按钮
            NativeIntersButton = new Node("NativeIntersButton");
            NativeIntersBg.addChild(NativeIntersButton);
            NativeIntersButton.addComponent(SpriteComponent);
            let spriteFrameNativeIntersButton = new SpriteFrame();
            spriteFrameNativeIntersButton.texture = this.nativeIntersRes.NativeIntersButton;
            NativeIntersButton.getComponent(SpriteComponent).spriteFrame = spriteFrameNativeIntersButton;
            NativeIntersButtonWidth = NativeIntersBgWidth * 0.6;
            NativeIntersButtonHeight = NativeIntersButtonWidth * 0.25;
            NativeIntersButtonY = -NativeIntersBgHeight / 2 - NativeIntersButtonHeight / 2 - NativeIntersButtonHeight * 0.3;

            //点击原生插屏
            NativeIntersButton.on(Node.EventType.TOUCH_START, (event) => {
                this.reportNativeIntersAdClick(tempid);
                this.hideNativeInters();
                // this.reportNativeAdClick(tempid);
                // this.nativeAdShowInfo[1] = "";
                // this.node_nativeInters.removeFromParent();
                // this.node_nativeInters = null;
                // this.NUM_IntersNowIntervalTime = 0;
            });
        }


        NativeIntersBg.getComponent(UITransformComponent).setContentSize(NativeIntersBgWidth, NativeIntersBgHeight);
        NativeIntersBg.setPosition(0, NativeIntersBgY);


        NativeIntersButton.getComponent(UITransformComponent).setContentSize(NativeIntersButtonWidth, NativeIntersButtonHeight);
        NativeIntersButton.setPosition(0, NativeIntersButtonY);


        //点击原生插屏
        NativeIntersBg.on(Node.EventType.TOUCH_START, (event) => {
            this.reportNativeIntersAdClick(tempid);
            this.hideNativeInters();
            // this.reportNativeAdClick(tempid);
            // this.nativeAdShowInfo[1] = "";
            // this.node_nativeInters.removeFromParent();
            // this.node_nativeInters = null;
            // this.NUM_IntersNowIntervalTime = 0;
        });

        // 来源文字
        let sourceLabel: Node = new Node("sourceLabel");
        NativeIntersBg.addChild(sourceLabel);
        sourceLabel.addComponent(LabelComponent);
        if (view.getVisibleSize().width < view.getVisibleSize().height) {
            sourceLabel.getComponent(LabelComponent).fontSize = 30 * (view.getDesignResolutionSize().width / 1080);
        } else {
            sourceLabel.getComponent(LabelComponent).fontSize = 30 * (view.getDesignResolutionSize().height / 1080);
        }
        sourceLabel.getComponent(LabelComponent).color = Color.RED;
        sourceLabel.getComponent(LabelComponent).overflow = LabelComponent.Overflow.RESIZE_HEIGHT;
        sourceLabel.getComponent(LabelComponent).string = this.nativeIntersAdInfo.source;
        sourceLabel.getComponent(LabelComponent).horizontalAlign = LabelComponent.HorizontalAlign.CENTER;
        sourceLabel.getComponent(LabelComponent).lineHeight = sourceLabel.getComponent(LabelComponent).fontSize;
        let sourceLabelWidth = NativeIntersBgWidth * 0.2;
        let sourceLabelHeight = NativeIntersBgHeight * 0.2;

        sourceLabel.getComponent(UITransformComponent).setContentSize(sourceLabelWidth, sourceLabelHeight);
        let sourceLabelX = sourceLabelWidth / 2 - NativeIntersBgWidth / 2;
        let sourceLabelY = NativeIntersBgHeight / 2 - sourceLabelHeight * 0.6;
        sourceLabel.setPosition(sourceLabelX, sourceLabelY);

        // 标题文字
        let titleLabel: Node = new Node("titleLabel");
        NativeIntersBg.addChild(titleLabel);
        titleLabel.addComponent(LabelComponent);
        titleLabel.getComponent(LabelComponent).overflow = LabelComponent.Overflow.SHRINK;
        if (view.getVisibleSize().width < view.getVisibleSize().height) {
            titleLabel.getComponent(LabelComponent).fontSize = 70 * (view.getDesignResolutionSize().width / 1080);
        } else {
            titleLabel.getComponent(LabelComponent).fontSize = 70 * (view.getDesignResolutionSize().height / 1080);
        }
        titleLabel.getComponent(LabelComponent).color = new Color(0xFF, 0xFF, 0xFF);
        if (this.nativeIntersAdInfo.title.length > 10) this.nativeIntersAdInfo.title = this.nativeIntersAdInfo.title.substring(0, 10);
        titleLabel.getComponent(LabelComponent).string = this.nativeIntersAdInfo.title;
        titleLabel.getComponent(LabelComponent).horizontalAlign = LabelComponent.HorizontalAlign.CENTER;
        titleLabel.getComponent(LabelComponent).lineHeight = titleLabel.getComponent(LabelComponent).fontSize;
        let titleLabelWidth = NativeIntersBgWidth * 0.8;
        let titleLabelHeight = NativeIntersBgWidth * 0.1;

        titleLabel.getComponent(UITransformComponent).setContentSize(titleLabelWidth, titleLabelHeight);
        let titleLabelY = NativeIntersBgHeight / 2 - titleLabelHeight / 2 - NativeIntersBgHeight * 0.05;
        titleLabel.setPosition(0, titleLabelY);

        // 大图
        console.log("XminigameSDK", "原生插屏广告大图展示");
        let bigImage: Node = new Node("bigImage");
        NativeIntersBg.addChild(bigImage);
        bigImage.addComponent(SpriteComponent);
        let spriteFrameNativeBigImage = new SpriteFrame();
        spriteFrameNativeBigImage.texture = this.nativeIntersAdInfo.Native_BigImage;
        bigImage.getComponent(SpriteComponent).spriteFrame = spriteFrameNativeBigImage;
        let bigImageWidth = NativeIntersBgWidth * 0.95;
        let bigImageHeight = bigImageWidth * 0.5;

        bigImage.getComponent(UITransformComponent).setContentSize(bigImageWidth, bigImageHeight);
        let bigImageY = bigImageHeight / 2 - NativeIntersBgHeight * 0.47;
        bigImage.setPosition(0, bigImageY);

        // 广告角标
        let NativeIntersAdTip: Node = new Node("NativeIntersAdTip");
        NativeIntersBg.addChild(NativeIntersAdTip);
        NativeIntersAdTip.addComponent(SpriteComponent);
        let spriteFrameNativeIntersAdTip = new SpriteFrame();
        spriteFrameNativeIntersAdTip.texture = this.nativeIntersRes.NativeIntersAdTip;
        NativeIntersAdTip.getComponent(SpriteComponent).spriteFrame = spriteFrameNativeIntersAdTip;
        let NativeIntersAdTipWidth = NativeIntersBgWidth * 0.08;
        let NativeIntersAdTipHeight = NativeIntersAdTipWidth * 0.53;

        NativeIntersAdTip.getComponent(UITransformComponent).setContentSize(NativeIntersAdTipWidth, NativeIntersAdTipHeight);
        let NativeIntersAdTipX = NativeIntersAdTipWidth / 2 - NativeIntersBgWidth / 2;
        let NativeIntersAdTipY = NativeIntersAdTipHeight / 2 - NativeIntersBgHeight / 2;
        NativeIntersAdTip.setPosition(NativeIntersAdTipX, NativeIntersAdTipY);

        // 关闭按钮
        let NativeIntersClose: Node = new Node("NativeIntersClose");
        NativeIntersBg.addChild(NativeIntersClose);
        NativeIntersClose.addComponent(SpriteComponent);
        let spriteFrameNativeIntersClose = new SpriteFrame();
        spriteFrameNativeIntersClose.texture = this.nativeIntersRes.NativeIntersClose;
        NativeIntersClose.getComponent(SpriteComponent).spriteFrame = spriteFrameNativeIntersClose;
        let NativeIntersCloseWidth = NativeIntersBgWidth / 15;
        let NativeIntersCloseHeight = NativeIntersCloseWidth;

        NativeIntersClose.getComponent(UITransformComponent).setContentSize(NativeIntersCloseWidth, NativeIntersCloseHeight);
        let NativeIntersCloseX = NativeIntersBgWidth / 2 - NativeIntersCloseWidth;
        let NativeIntersCloseY = NativeIntersBgHeight / 2 - NativeIntersCloseHeight;
        NativeIntersClose.setPosition(NativeIntersCloseX, NativeIntersCloseY);
        // 防止触摸冒泡
        NativeIntersClose.addComponent(BlockInputEventsComponent);

        // 关闭插屏
        NativeIntersClose.on(Node.EventType.TOUCH_START, (event) => {
            this.hideNativeInters();
            // this.NUM_IntersNowIntervalTime = 0;
            // this.nativeAdShowInfo[1] = "";
            // this.node_nativeInters.removeFromParent();
            // this.node_nativeInters = null;
        });

        this.setChildrenNodeLayer(this.node_nativeInters);
    }

    /**
     * 隐藏原生插屏
     */
    hideNativeInters() {
        this.NUM_IntersNowIntervalTime = 0;
        if (this.node_nativeInters) {
            this.nativeAdShowInfo[1] = "";
            this.node_nativeInters.removeFromParent();
            this.node_nativeInters = null;
        }
        if (this.nativeIntersAd) {
            this.nativeIntersAd.offLoad();
            this.nativeIntersAd.offError();
            this.nativeIntersAd = null;
        }
        this.isShowNativeAd.nativeIntersAd = null;
        if (this.intersHideCallback) this.intersHideCallback();
    }


    // /**
    //  * 拉取新的原生广告
    //  */
    // loadNewNative() {
    //     this.nativeAd && this.nativeAd.load();
    // }


    /**
     * 关闭隐私协议
     */
    hidePrivacyAgreement() {
        if (this.isShow_PrivacyAgreement) {
            console.log("XminigameSDK", "hidePrivacyAgreement========================");
            this.isShow_PrivacyAgreement = false;
            if (this.node_privacyAgreement) {
                this.node_privacyAgreement.removeFromParent();
                this.node_privacyAgreement = null;
            }
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

    /**
     * banner关闭展示间隔计时器
     */
    runBannerCloseInterval() {
        if (this.hasStart_BannerCloseInterval) {
            return;
        }
        this.hasStart_BannerCloseInterval = true;

        if (this.NUM_BannerCloseShowIntervalTime > 0) {
            setInterval(() => {
                this.NUM_UserCloseBannerIntervalTime++;
            }, 1000);
        }
    }


    /**
     * 监听游戏进入前台
     */
    onGameShow() {
        // @ts-ignore
        hbs.onShow(() => {
            console.log("XminigameSDK", "HW 游戏回到前台,是否有原生广告展示中:", this.nativeAdShowInfo[0] != "" || this.nativeAdShowInfo[1] != "" || this.nativeAdShowInfo[2] != "");
            if (this.nativeAdShowInfo[0] != "") {
                this.reportNativeBannerAdShow(this.nativeAdShowInfo[0]);
            }
            if (this.nativeAdShowInfo[1] != "") {
                this.reportNativeIntersAdShow(this.nativeAdShowInfo[1]);
            }
            if (this.nativeAdShowInfo[2] != "") {
                this.reportNativeImageAdShow(this.nativeAdShowInfo[2]);
            }
        });
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

}
