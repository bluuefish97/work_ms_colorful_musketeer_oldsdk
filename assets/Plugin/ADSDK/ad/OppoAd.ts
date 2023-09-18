import { Node, CanvasComponent, director, SpriteComponent, SpriteFrame, UITransformComponent, LabelComponent, Color, BlockInputEventsComponent, UIOpacityComponent, WidgetComponent, view, Vec3, MaskComponent, tween } from "cc";
import PrivacyAgreement from "../common/PrivacyAgreement";
import CheckConfig from "../utils/CheckConfig";
import GetConfig from "../utils/GetConfig";
import LoadRes from "../utils/LoadRes";
import LocalStorage from "../utils/LocalStorage";
import XplayTracking from "../utils/XplayTracking";
import { AdInterface } from "./AdInterface";

export enum AdType {
    SystemBanner = 1,
    SystemInters = 2,
    Video = 3,
    NativeBanner = 4,
    NativeInters = 5,
    NativeIcon = 6,
    NativeBig = 7,
    NativePaster = 8,
    NativeTmpBanner = 9,
    NativeTmpInters = 10,
    NativeTmpBig = 11,
    NavigateBoxBanner = 12,
    NavigateBoxPortal = 13,
}

export enum AdTriggerType {
    Show = 1,
    Hide = 2,
    Click = 3,
}

export default class OppoAd implements AdInterface {
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
     * 原生大图广告开关
     */
    SW_NativeImage = false;
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
     * 原生banner广告ID
     */
    ID_NativeBanner = "";
    /**
    * 原生插屏广告ID
    */
    ID_NativeInters = "";
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
    NUM_BannerMostShow = 999;
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
     * 正在展示系统banner
     */
    isShow_SystemBanner = false;
    /**
     * 正在展示原生banner
     */
    isShow_NativeBanner = false;
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
     * 视频广告是否正在播放
     */
    isShow_Video = false;



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
     * 原生贴片节点
     */
    node_nativePaster = null;




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
     * 临时保存 互推盒子九宫格出现前是否调用过showBanner
     */
    temp_hasShowBanner = false;

    /**
     * 正在展示结算互推(互推盒子)
     */
    isShow_NavigateSettle = false;



    /**
     * 原生模板广告对象
     */
    nativeTemplateAd = null;
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
    node_nativeTemplate = null;
    /**
     * 原生模板正在展示
     */
    isShow_NativeTemplate = false;





    /**
     * 原生大图广告组件
     */
    /**
     * 是否正在展示原生大图
     */
    isShow_NativeImage = false;
    /**
     * 原生大图节点
     */
    node_nativeImage = null;




    /**
     * 原生icon广告组件
     */
    /**
     * 原生icon广告是否加载成功(根据原生广告是否加载到原生icon)
     */
    loadSucc_NativeIcon = false;
    /**
     * 是否正在展示原生icon
     */
    isShow_NativeIcon = false;
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
     * 原生banner广告对象
     */
    nativeBannerAd = null;
    /**
     * 原生插屏广告对象
     */
    nativeIntersAd = null;
    /**
     * 原生大图广告对象
     */
    nativeImageAd = null;


    /**
     * 原生banner广告加载成功
     */
    loadSucc_NativeBannerAd = false;
    /**
     * 原生插屏广告加载成功
     */
    loadSucc_NativeIntersAd = false;
    /**
    * 原生大图广告加载成功
    */
    loadSucc_NativeImageAd = false;

    /**
     * 原生banner广告加载错误次数
     */
    loadNativeBannerErrorTimes = 0;
    /**
     * 原生插屏广告加载错误次数
     */
    loadNativeIntersErrorTimes = 0;
    /**
     * 原生大图广告加载错误次数
     */
    loadNativeImageErrorTimes = 0;


    /**
     * 原生插屏广告
     */
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
    node_nativeInters = null;
    /**
     * 正在展示原生插屏
     */
    isShow_NativeInters = false;
    /**
     * 插屏关闭后的回调
     */
    callback_IntersClose = null;


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
     * 原生banner广告信息
     */
    nativeBannerAdInfo = null;
    /**
     * 原生插屏广告信息
     */
    nativeIntersAdInfo = null;
    /**
     * 原生大图广告信息
     */
    nativeImageAdInfo = null;



    /**
     * 用户拉取的自定义原生广告
     */
    pullNativeBannerAdInfo = {
        adId: null,
        title: null,
        desc: null,
        Native_icon: null,
        Native_BigImage: null,
        NativeClose: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeClose.png",
        NativeAdTip: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeAdTip.png",
    };
    pullNativeIntersAdInfo = {
        adId: null,
        title: null,
        desc: null,
        Native_icon: null,
        Native_BigImage: null,
        NativeClose: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeClose.png",
        NativeAdTip: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeAdTip.png",
    };
    pullNativeImageAdInfo = {
        adId: null,
        title: null,
        desc: null,
        Native_icon: null,
        Native_BigImage: null,
        NativeClose: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeClose.png",
        NativeAdTip: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeAdTip.png",
    };






    /**
     * 正在展示隐私协议
     */
    isShow_PrivacyAgreement = false;


    platformVersionCode: number;


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

        // @ts-ignore
        this.platformVersionCode = qg.getSystemInfoSync().platformVersionCode;

        if (this.platformVersionCode >= 1096) {
            XplayTracking.recordStartTime();
            this.getDeviceId((suc, deviceId) => {
                if (suc) {
                    XplayTracking.setDeviceId(deviceId);
                    XplayTracking.active();
                }
            });
            // @ts-ignore
            qg.onHide(() => {
                XplayTracking.reportOnlineTime();
            });
        } else {
            console.error("XminigameSDK", "platformVersionCode", this.platformVersionCode, "low than 1096.");
        }

        if (this.SW_SystemBanner && this.ID_SystemBanner != "") this.createSystemBanner();
        if (this.SW_Video && this.ID_Video != "") this.createVideo();
        if (this.SW_Box && this.ID_Box != "") this.createNavigateBoxPortal();
        if (this.SW_Box && this.ID_Block != "") this.createNavigateBoxBanner();

        if (this.SW_Native) {
            if (this.SW_NativeBanner && this.ID_NativeBanner) {
                this.ID_NativeBannerArray = this.ID_NativeBanner.split(";");
                if (this.ID_NativeBannerArray.length != 1) {
                    this.index_NativeBannerID = Math.floor(Math.random() * (this.ID_NativeBannerArray.length));
                }
                this.loadNativeBannerRes();
                this.createNativeBanner();
            }
            if (this.SW_NativeInters && this.ID_NativeInters) {
                this.ID_NativeIntersArray = this.ID_NativeInters.split(";");
                if (this.ID_NativeIntersArray.length != 1) {
                    this.index_NativeIntersID = Math.floor(Math.random() * (this.ID_NativeIntersArray.length));
                }
                this.loadNativeInterRes();
                this.createNativeInters();
            }
            if (this.SW_NativeImage && this.ID_NativeImage) {
                this.ID_NativeImageArray = this.ID_NativeImage.split(";");
                if (this.ID_NativeImageArray.length != 1) {
                    this.index_NativeImageID = Math.floor(Math.random() * (this.ID_NativeImageArray.length));
                }
                this.loadNativeOtherRes();
                this.createNativeImage();
            }
            if (this.SW_NativeTemplate && this.ID_NativeTemplate != "") {
                this.createNativeTemplate();
                this.loadNativeTemplateRes();
            }
        }

        if (this.NUM_IntersIntervalTime > 0) this.runIntersInterval();
    }

    onAdType(adType: AdType, adTriggerType: AdTriggerType) {
        if (this.platformVersionCode < 1096) return;
        let isNeedReportAdType = adType == AdType.NativeBig || adType == AdType.NativeIcon || adType == AdType.NativeInters
            || adType == AdType.NativePaster || adType == AdType.NativeTmpBig || adType == AdType.NativeTmpInters
            || adType == AdType.SystemInters || adType == AdType.Video;

        if (isNeedReportAdType && adTriggerType == AdTriggerType.Show) {
            XplayTracking.reportAdShow();
        }
        if (isNeedReportAdType && adTriggerType == AdTriggerType.Click) {
            XplayTracking.reportAdClick();
        }
    }

    /**
     *
     */
    getDeviceId(callback) {
        // @ts-ignore
        qg.getDeviceId({
            success: (data) => {
                console.log("XminigameSDK", `handling success: ${data.deviceId}`);
                callback(true, data.deviceId);
            },
            fail: (data, code) => {
                console.log("XminigameSDK", `handling fail, code = ${code}`);
                callback(false, null);
            },
        });
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
            adUnitId: this.ID_SystemBanner,
            style: {}
        })

        this.loadSucc_SystemBanner = true;

        // 监听系统banner错误
        this.bannerAd.onError((err) => {
            console.log("XminigameSDK", "OPPO 系统banner加载/展示失败：", JSON.stringify(err));
        })

        // 监听系统banner隐藏
        this.bannerAd.onHide(() => {
            console.log("XminigameSDK", "OPPO 系统banner关闭", this.NUM_BannerUpdateTime + "S之后再次刷新")
            this.updateBanner();
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
        this.videoAd = qg.createRewardedVideoAd({
            posId: this.ID_Video
        })

        //监听视频广告加载完成
        this.videoAd.onLoad(() => {
            console.log("XminigameSDK", "OPPO 视频广告加载完成");
            this.loadSucc_Video = true;
        })

        //监听视频广告加载出错
        this.videoAd.onError(err => {
            console.log("XminigameSDK", "OPPO 视频加载失败：", JSON.stringify(err));
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
                    }, 30 * 1000)
            }
        })

        //监听视频广告播放完成
        this.videoAd.onClose(res => {
            this.isShow_Video = false;
            if (res.isEnded) {
                console.log("XminigameSDK", "OPPO 激励视频广告完成，发放奖励");
                if (this.callback_Video) {
                    this.callback_Video(true);
                    this.videoAd.load();
                }
            } else {
                console.log("XminigameSDK", "OPPO 激励视频广告关闭，不发放奖励");
                if (this.callback_Video) {
                    this.callback_Video(false);
                    this.videoAd.load();
                }
            }
        })

        this.videoAd.load();
    }

    /**
     * 创建原生banner广告
     */
    createNativeBanner() {
        console.log("XminigameSDK", "--createNativeBanner--");
        if (CheckConfig.stringHasSpace(this.ID_NativeBanner)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId() + "当前渠道原生banner广告ID中含有空字符串,请检查后台原生banner广告ID*********************");
            return;
        }

        let id = this.ID_NativeBannerArray[this.index_NativeBannerID];
        if (this.index_NativeBannerID < this.ID_NativeBannerArray.length - 1) {
            this.index_NativeBannerID++;
        } else {
            this.index_NativeBannerID = 0;
        }

        console.log("XminigameSDK", "createNativeBanner id:", id);

        // @ts-ignore
        this.nativeBannerAd = qg.createNativeAd({
            posId: id
        });

        this.nativeBannerAdInfo = {
            adId: null,
            title: null,
            desc: null,
            Native_icon: null,
            Native_BigImage: null,
        };

        this.nativeBannerAd.onLoad((res) => {
            let index = 0;
            if (typeof res.adList != undefined && res.adList.length != 0) {
                index = res.adList.length - 1;
            } else {
                console.log("XminigameSDK", "OPPO 原生广告列表为空 return");
                return;
            }

            console.log("XminigameSDK", "OPPO 原生广告加载成功：", JSON.stringify(res.adList[index]));

            if (res.adList[index].icon != "" && res.adList[index].imgUrlList.length > 0) {
                console.log("XminigameSDK", "OPPO 原生广告同时存在原生ICON和大图");
            } else {
                console.log("XminigameSDK", "OPPO 原生广告只存在原生ICON或大图");
            }

            this.nativeBannerAdInfo.adId = res.adList[index].adId;
            this.nativeBannerAdInfo.title = res.adList[index].title;
            this.nativeBannerAdInfo.desc = res.adList[index].desc;

            this.pullNativeBannerAdInfo.adId = res.adList[index].adId;
            this.pullNativeBannerAdInfo.title = res.adList[index].title;
            this.pullNativeBannerAdInfo.desc = res.adList[index].desc;


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
                        console.log("XminigameSDK", "OPPO 原生banner广告ICON加载失败");
                        this.nativeBannerAdInfo.Native_icon = null;
                        this.loadSucc_NativeIcon = false;
                        return;
                    }
                    console.log("XminigameSDK", "OPPO 原生banner广告ICON加载成功");
                    this.nativeBannerAdInfo.Native_icon = texture[0];
                    this.loadSucc_NativeIcon = true;
                });
                this.pullNativeBannerAdInfo.Native_icon = iconUrl;
            } else {
                this.nativeBannerAdInfo.Native_icon = null;
                this.loadSucc_NativeIcon = false;
                this.pullNativeBannerAdInfo.Native_icon = null;
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
                        console.log("XminigameSDK", "OPPO 原生banner广告大图加载失败");
                        this.nativeBannerAdInfo.Native_BigImage = null;
                        return;
                    }
                    console.log("XminigameSDK", "OPPO 原生banner广告大图加载成功");
                    this.nativeBannerAdInfo.Native_BigImage = texture[0];
                });
                this.pullNativeBannerAdInfo.Native_BigImage = imgUrl;
            } else {
                this.nativeBannerAdInfo.Native_BigImage = null;
                this.pullNativeBannerAdInfo.Native_BigImage = null;
            }

            this.loadSucc_NativeBannerAd = true;
            this.loadNativeBannerErrorTimes = 0;
            setTimeout(() => {
                this.nativeBannerAd && this.nativeBannerAd.load();
            }, this.NUM_NativeUpdateTime * 1000)
        });


        //监听原生广告加载错误
        this.nativeBannerAd.onError((err) => {
            console.log("XminigameSDK", "OPPO 原生banner广告加载失败：", JSON.stringify(err));
            this.loadSucc_NativeIcon = false;
            this.loadSucc_NativeBannerAd = false;

            this.nativeBannerAdInfo = {
                adId: null,
                title: null,
                desc: null,
                Native_icon: null,
                Native_BigImage: null,
            };

            this.pullNativeBannerAdInfo = {
                adId: null,
                title: null,
                desc: null,
                Native_icon: null,
                Native_BigImage: null,
                NativeClose: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeClose.png",
                NativeAdTip: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeAdTip.png",
            };

            this.loadNativeBannerErrorTimes++;
            if (this.loadNativeBannerErrorTimes <= 10) {
                this.nativeBannerAd.destroy();
                this.nativeBannerAd = null;
                setTimeout(() => {
                    this.createNativeBanner();
                }, 5000);
            } else {
                setTimeout(() => {
                    this.nativeBannerAd && this.nativeBannerAd.load();
                }, this.NUM_NativeUpdateTime * 1000);
            }
        });

        this.nativeBannerAd.load();
    }


    /**
     * 创建原生插屏广告
     */
    createNativeInters() {
        console.log("XminigameSDK", "--createNativeInters--");
        if (CheckConfig.stringHasSpace(this.ID_NativeInters)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), " 当前渠道原生插屏广告ID中含有空字符串,请检查后台原生插屏广告ID*********************");
            return;
        }

        let id = this.ID_NativeIntersArray[this.index_NativeIntersID];
        if (this.index_NativeIntersID < this.ID_NativeIntersArray.length - 1) {
            this.index_NativeIntersID++;
        } else {
            this.index_NativeIntersID = 0;
        }

        console.log("XminigameSDK", "createNativeInters id:", id);

        // @ts-ignore
        this.nativeIntersAd = qg.createNativeAd({
            posId: id
        });
        this.nativeIntersAdInfo = {
            adId: null,
            title: null,
            desc: null,
            Native_icon: null,
            Native_BigImage: null,
        };

        this.nativeIntersAd.onLoad((res) => {
            let index = 0;
            if (typeof res.adList != undefined && res.adList.length != 0) {
                index = res.adList.length - 1;
            } else {
                console.log("XminigameSDK", "OPPO 原生插屏广告列表为空 return");
                return;
            }

            console.log("XminigameSDK", "OPPO 原生插屏广告加载成功：" + JSON.stringify(res.adList[index]))

            if (res.adList[index].icon != "" && res.adList[index].imgUrlList.length > 0) {
                console.log("XminigameSDK", "OPPO 原生插屏广告同时存在原生ICON和大图");
            } else {
                console.log("XminigameSDK", "OPPO 原生插屏广告只存在原生ICON或大图");
            }

            this.nativeIntersAdInfo.adId = res.adList[index].adId;
            this.nativeIntersAdInfo.title = res.adList[index].title;
            this.nativeIntersAdInfo.desc = res.adList[index].desc;

            this.pullNativeIntersAdInfo.adId = res.adList[index].adId;
            this.pullNativeIntersAdInfo.title = res.adList[index].title;
            this.pullNativeIntersAdInfo.desc = res.adList[index].desc;


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
                        console.log("XminigameSDK", "OPPO 原生插屏广告ICON加载失败");
                        this.nativeIntersAdInfo.Native_icon = null;
                        return;
                    }
                    console.log("XminigameSDK", "OPPO 原生插屏广告ICON加载成功");
                    this.nativeIntersAdInfo.Native_icon = texture[0];
                });
                this.pullNativeIntersAdInfo.Native_icon = iconUrl;
            } else {
                this.nativeIntersAdInfo.Native_icon = null;
                this.loadSucc_NativeIcon = false;
                this.pullNativeIntersAdInfo.Native_icon = null;
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
                        console.log("XminigameSDK", "OPPO 原生插屏广告大图加载失败");
                        this.nativeIntersAdInfo.Native_BigImage = null;
                        return;
                    }
                    console.log("XminigameSDK", "OPPO 原生插屏广告大图加载成功");
                    this.nativeIntersAdInfo.Native_BigImage = texture[0];
                });
                this.pullNativeIntersAdInfo.Native_BigImage = imgUrl;
            } else {
                this.nativeIntersAdInfo.Native_BigImage = null;
                this.pullNativeIntersAdInfo.Native_BigImage = null;
            }

            this.loadSucc_NativeIntersAd = true;
            this.loadNativeIntersErrorTimes = 0;
            setTimeout(() => {
                this.nativeIntersAd && this.nativeIntersAd.load();
            }, this.NUM_NativeUpdateTime * 1000)
        });


        //监听原生广告加载错误
        this.nativeIntersAd.onError((err) => {
            console.log("XminigameSDK", "OPPO 原生插屏广告加载失败：", JSON.stringify(err));
            this.loadSucc_NativeIntersAd = false;

            this.nativeIntersAdInfo = {
                adId: null,
                title: null,
                desc: null,
                Native_icon: null,
                Native_BigImage: null,
            };

            this.pullNativeIntersAdInfo = {
                adId: null,
                title: null,
                desc: null,
                Native_icon: null,
                Native_BigImage: null,
                NativeClose: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeClose.png",
                NativeAdTip: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeAdTip.png",
            };

            this.loadNativeIntersErrorTimes++;
            if (this.loadNativeIntersErrorTimes <= 10) {
                this.nativeIntersAd.destroy();
                this.nativeIntersAd = null;
                setTimeout(() => {
                    this.createNativeInters();
                }, 5000);
            } else {
                setTimeout(() => {
                    this.nativeIntersAd && this.nativeIntersAd.load();
                }, this.NUM_NativeUpdateTime * 1000);
            }
        });

        this.nativeIntersAd.load();
    }


    /**
     * 创建原生大图广告
     */
    createNativeImage() {
        console.log("XminigameSDK", "--createNativeImage--");
        if (CheckConfig.stringHasSpace(this.ID_NativeImage)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道原生大图广告ID中含有空字符串,请检查后台原生大图广告ID*********************");
            return;
        }

        let id = this.ID_NativeImageArray[this.index_NativeImageID];
        if (this.index_NativeImageID < this.ID_NativeImageArray.length - 1) {
            this.index_NativeImageID++;
        } else {
            this.index_NativeImageID = 0;
        }

        console.log("XminigameSDK", "createNativeImage id:", id);

        // @ts-ignore
        this.nativeImageAd = qg.createNativeAd({
            posId: id
        });

        this.nativeImageAdInfo = {
            adId: null,
            title: "",
            desc: "",
            Native_icon: null,
            Native_BigImage: null
        };

        this.nativeImageAd.onLoad((res) => {
            let index = 0;
            if (typeof res.adList != undefined && res.adList.length != 0) {
                index = res.adList.length - 1;
            } else {
                console.log("XminigameSDK", "OPPO 原生大图广告列表为空 return");
                return;
            }

            console.log("XminigameSDK", "OPPO 原生大图广告加载成功：" + JSON.stringify(res.adList[index]))

            if (res.adList[index].icon != "" && res.adList[index].imgUrlList.length > 0) {
                console.log("XminigameSDK", "OPPO 原生大图广告同时存在原生ICON和大图");
            } else {
                console.log("XminigameSDK", "OPPO 原生大图广告只存在原生ICON或大图");
            }

            this.nativeImageAdInfo.adId = res.adList[index].adId;
            this.nativeImageAdInfo.title = res.adList[index].title;
            this.nativeImageAdInfo.desc = res.adList[index].desc;

            this.pullNativeImageAdInfo.adId = res.adList[index].adId;
            this.pullNativeImageAdInfo.title = res.adList[index].title;
            this.pullNativeImageAdInfo.desc = res.adList[index].desc;


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
                        console.log("XminigameSDK", "OPPO 原生大图广告ICON加载失败");
                        this.nativeImageAdInfo.Native_icon = null;
                        return;
                    }
                    console.log("XminigameSDK", "OPPO 原生大图广告ICON加载成功");
                    this.nativeImageAdInfo.Native_icon = texture[0];
                });
                this.pullNativeImageAdInfo.Native_icon = iconUrl;
            } else {
                this.nativeImageAdInfo.Native_icon = null;
                this.loadSucc_NativeIcon = false;
                this.pullNativeImageAdInfo.Native_icon = null;
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
                        console.log("XminigameSDK", "OPPO 原生大图广告大图加载失败");
                        this.nativeImageAdInfo.Native_BigImage = null;
                        return;
                    }
                    console.log("XminigameSDK", "OPPO 原生大图广告大图加载成功");
                    this.nativeImageAdInfo.Native_BigImage = texture[0];
                });
                this.pullNativeImageAdInfo.Native_BigImage = imgUrl;
            } else {
                this.nativeImageAdInfo.Native_BigImage = null;
                this.pullNativeImageAdInfo.Native_BigImage = null;
            }

            this.loadSucc_NativeImageAd = true;
            this.loadNativeImageErrorTimes = 0;
            setTimeout(() => {
                this.nativeImageAd && this.nativeImageAd.load();
            }, this.NUM_NativeUpdateTime * 1000)
        });


        //监听原生广告加载错误
        this.nativeImageAd.onError((err) => {
            console.log("XminigameSDK", "OPPO 原生大图广告加载失败：", JSON.stringify(err));
            this.loadSucc_NativeImageAd = false;

            this.nativeImageAdInfo = {
                adId: null,
                title: null,
                desc: null,
                Native_icon: null,
                Native_BigImage: null,
            };

            this.pullNativeImageAdInfo = {
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
                setTimeout(() => {
                    this.nativeImageAd && this.nativeImageAd.load();
                }, this.NUM_NativeUpdateTime * 1000);
            }
        });

        this.nativeImageAd.load();
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
        if (qg.getSystemInfoSync().platformVersionCode < 1076) {
            console.log("XminigameSDK", "OPPO 版本较低,不支持互推盒子广告");
            return;
        }

        // @ts-ignore
        this.navigateBoxBannerAd = qg.createGameBannerAd({
            adUnitId: this.ID_Block
        })

        this.loadSucc_NavigateBoxBanner = true;

        // 监听互推盒子横幅广告加载失败
        this.navigateBoxBannerAd.onError((err) => {
            // this.loadSucc_NavigateBoxBanner = false;
            console.log("XminigameSDK", "OPPO 互推盒子横幅广告出错:", JSON.stringify(err));
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
        if (qg.getSystemInfoSync().platformVersionCode < 1076) {
            console.log("XminigameSDK", "OPPO 版本较低,不支持互推盒子广告");
            return;
        }

        // @ts-ignore
        this.navigateBoxPortalAd = qg.createGamePortalAd({
            adUnitId: this.ID_Box
        })

        // 监听互推盒子九宫格广告加载成功
        this.navigateBoxPortalAd.onLoad(() => {
            console.log("XminigameSDK", "OPPO 互推盒子九宫格广告加载完成");
            this.loadSucc_NavigateBoxPortal = true;
        })

        // 监听互推盒子九宫格广告加载失败
        this.navigateBoxPortalAd.onError((err) => {
            console.log("XminigameSDK", "OPPO 互推盒子九宫格广告加载/展示失败：", JSON.stringify(err));
            this.loadSucc_NavigateBoxPortal = false;
            setTimeout(() => {
                this.navigateBoxPortalAd.load();
            }, 20 * 1000);
        })

        // 监听互推盒子九宫格广告关闭
        this.navigateBoxPortalAd.onClose(() => {
            console.log("XminigameSDK", "OPPO 互推盒子九宫格广告关闭");
            // 关闭后再次加载互推盒子九宫格
            this.navigateBoxPortalAd.load();
            // 如果banner在展示时被互推盒子九宫格关闭则再次showBanner
            this.temp_hasShowBanner && this.showBanner();
        })

        this.navigateBoxPortalAd.load();
    }


    createNativeTemplate() {
        console.log("XminigameSDK", "--createNativeTemplate--");
        if (CheckConfig.stringHasSpace(this.ID_NativeTemplate)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道原生模板广告ID中含有空字符串,请检查后台原生模板广告广告ID*********************");
            return;
        }


        let size = view.getVisibleSize();
        if (size.width > size.height) {
            console.log("XminigameSDK", "横版游戏无原生模板插屏广告");
            return;
        }
        // let topDis = size.width < size.height ? size.height / 4 : 0;
        // let leftDis = size.width < size.height ? 0 : 0;
        let topDis = size.height / 4;
        let leftDis = 0;

        this.nativeTemplateAd =
            // @ts-ignore
            qg.createCustomAd({
                adUnitId: this.ID_NativeTemplate,
                style: {
                    top: topDis,
                    left: leftDis,
                }
            })

        this.loadSucc_NativeTemplate = true;
        console.log("XminigameSDK", "OPPO 原生模板广告展加载成功");

        this.nativeTemplateAd.onLoad(() => {
            console.log("XminigameSDK", "OPPO 原生模板广告展示成功");
        })


        this.nativeTemplateAd.onError((err) => {
            console.log("XminigameSDK", "OPPO 原生模板广告加载失败：", JSON.stringify(err));
        })

        // 监听原生模板广告隐藏
        this.nativeTemplateAd.onHide(() => {
            console.log("XminigameSDK", "OPPO 原生模板广告关闭");
            this.NUM_IntersNowIntervalTime = 0;
            this.loadSucc_NativeTemplate = false;
            this.isShow_NativeTemplate = false;
            this.nativeTemplateAd.destroy();
            this.node_nativeTemplate && this.node_nativeTemplate.removeFromParent();
            setTimeout(() => {
                this.createNativeTemplate();
            }, 3000);
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
        console.log("XminigameSDK " + "--loadNativeInterRes--");

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
            NativeButton: null,
            NativeMask: null,
            NativeBlank: null,
        }

        let nativeOtherResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/image/Bg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/image/Color.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/image/Close.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/image/AdTip.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native2/image/Button.png",

            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeButton.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeInterMask.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeBlank.png",
        ]

        LoadRes.loadResArray(nativeOtherResArr, (err, texture) => {
            this.nativeOtherRes.Bg = texture[0];
            this.nativeOtherRes.Color = texture[1];
            this.nativeOtherRes.Close = texture[2];
            this.nativeOtherRes.AdTip = texture[3];
            this.nativeOtherRes.Button = texture[4];

            this.nativeOtherRes.NativeAdTip = texture[3];
            this.nativeOtherRes.NativeClose = texture[2];
            this.nativeOtherRes.NativeButton = texture[5];
            this.nativeOtherRes.NativeMask = texture[6];
            this.nativeOtherRes.NativeBlank = texture[7];
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
            console.log("XminigameSDK", "原生模板资源加载成功");
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
            console.log("XminigameSDK", "OPPO 正在展示互推盒子 return");
            return;
        }

        if (this.hasShowBanner) {
            console.log("XminigameSDK", "已经调用过showBanner,请勿重复调用");
            return;
        }
        // 已经调用过showBanner
        this.hasShowBanner = true;

        // 两个开关同时打开
        if (this.SW_SystemBanner && this.SW_NativeBanner) {
            if (this.SW_SystemBannerFirst) {
                console.log("XminigameSDK", "系统banner优先");
                if (this.loadSucc_SystemBanner) {
                    this.showSystemBanner();
                } else if (this.loadSucc_NativeBanner && this.loadSucc_NativeBannerAd) {
                    console.log("XminigameSDK", "系统banner未加载完成,改为展示原生banner");
                    this.showNativeBanner();
                }
            } else {
                console.log("XminigameSDK", "原生banner优先");
                if (this.loadSucc_NativeBanner && this.loadSucc_NativeBannerAd) {
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
        this.hasShowBanner = false;
        this.hideNativeBanner();
        this.hideSystemBanner();
        if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
        if (this.timeout_checkBannerLoadSucc) clearTimeout(this.timeout_checkBannerLoadSucc);
    }

    getIntersFlag() {
        if ((this.loadSucc_NativeTemplate && this.loadSucc_NativeTemplateRes) || (this.loadSucc_NativeBanner && this.loadSucc_NativeBannerAd) || this.loadSucc_SystemBanner) {
            return true;
        }
        if (this.SW_AddDesktop && this.SW_IntersIntervalToAddDesktop && this.NUM_AutoAddDeskMostTimes > 0 && this.NUM_IntersToAddDesktopNumber > 0) {
            return true;
        } else {
            console.log("XminigameSDK", "桌面开关未开启或次数未设置");
            return false;
        }
    }

    showInters(callback?) {
        this.callback_IntersClose = callback;
        // 插屏间隔弹添加桌面
        this.NUM_hasShowInters++;
        if (this.NUM_hasShowInters == this.NUM_IntersToAddDesktopNumber && this.NUM_IntersNowToAddDesktop < this.NUM_AutoAddDeskMostTimes) {
            this.getAddDesktopFlag((suc) => {
                if (suc) {
                    this.NUM_IntersNowToAddDesktop++;
                    this.NUM_hasShowInters = 0;
                    console.log("XminigameSDK", "插屏变添加桌面");
                    this.addDesktop((res) => { });
                }
            });
            if (this.callback_IntersClose) this.callback_IntersClose();
            return;
        }

        if (this.SW_IntersBaseControl) {
            if (this.NUM_hasShowInters < this.NUM_IntersStart) {
                console.log("XminigameSDK", "插屏开始次数未达到", this.NUM_hasShowInters, "目标次数", this.NUM_IntersStart);
                if (this.callback_IntersClose) this.callback_IntersClose();
                return;
            }

            if (this.NUM_intersNowInterval < this.NUM_IntersIntervalNum) {
                console.log("XminigameSDK", "插屏间隔次数未达到", this.NUM_intersNowInterval, "目标次数", this.NUM_IntersIntervalNum)
                this.NUM_intersNowInterval++;
                if (this.callback_IntersClose) this.callback_IntersClose();
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
                if (this.callback_IntersClose) this.callback_IntersClose();
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
        let randomNumInters = Math.floor(Math.random() * 100);
        console.log("XminigameSDK " + "randomNumInters:" + randomNumInters + " this.NUM_NativeIntersP:" + this.NUM_NativeIntersP);
        if (randomNumInters <= this.NUM_NativeIntersP) {
            if (this.SW_NativeInters && this.nativeIntersAd) {
                type = "2";
            }
        }

        console.log("XminigameSDK " + "hasDelay:" + hasDelay + " intersType:" + type);


        let showFunc = (t) => {
            if (t == "2") {
                this.showNativeInters();
            } else {
                this.showNativeTemplate();
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
        if (!this.loadSucc_Video && this.timeout_loadVideo == null) {
            this.timeout_loadVideo =
                setTimeout(() => {
                    if (this.videoAd) this.videoAd.destroy();
                    this.createVideo();
                    this.timeout_loadVideo = null;
                }, 1000);
        }
        return this.loadSucc_Video;
    }

    showVideo(videoCallback, reason?) {
        this.callback_Video = videoCallback;
        if (this.videoAd) {
            console.log("XminigameSDK", "OPPO showVideo===========================");
            this.isShow_Video = true;
            this.videoAd.show();
            this.onAdType(AdType.Video, AdTriggerType.Show);
            this.loadSucc_Video = false;
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

        this.onAdType(AdType.NativeIcon, AdTriggerType.Show);

        // 上报原生广告展示
        let tempid = this.nativeBannerAdInfo.adId;
        this.reportNativeBannerAdShow(tempid);

        // icon
        this.node_nativeIcon = new Node("node_nativeIcon");
        this.getSdkCanvas().addChild(this.node_nativeIcon);
        this.node_nativeIcon.addComponent(SpriteComponent);
        let spriteFrameNode_nativeIcon = new SpriteFrame();
        spriteFrameNode_nativeIcon.texture = this.nativeBannerAdInfo.Native_icon;
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
        titleLabel.getComponent(LabelComponent).lineHeight = titleLabel.getComponent(LabelComponent).fontSize;
        titleLabel.getComponent(LabelComponent).color = new Color(0xFF, 0xFF, 0xFF);
        if (this.nativeBannerAdInfo.title.length <= 5) {
            titleLabel.getComponent(LabelComponent).string = this.nativeBannerAdInfo.title;
        } else {
            titleLabel.getComponent(LabelComponent).string = "";
        }
        let titleLabelY = -height / 2 - 30;
        titleLabel.setPosition(0, titleLabelY);

        //关闭原生ICON广告
        NativeClose.on(Node.EventType.TOUCH_START, (event) => {
            console.log("XminigameSDK", "手动关闭原生ICON");
            this.onAdType(AdType.NativeIcon, AdTriggerType.Hide);
            this.node_nativeIcon.removeFromParent();
            this.node_nativeIcon = null;
        })

        //点击原生广告
        this.node_nativeIcon.on(Node.EventType.TOUCH_START, (event) => {
            console.log("XminigameSDK", "点击原生ICON");
            this.onAdType(AdType.NativeIcon, AdTriggerType.Click);
            this.reportNativeBannerAdClick(tempid)
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
            console.log("XminigameSDK", "hideNativeIcon===========================");
            this.onAdType(AdType.NativeIcon, AdTriggerType.Hide);
            this.node_nativeIcon.removeFromParent();
            this.node_nativeIcon = null;
        }
    }

    getNativeImageFlag() {
        return this.loadSucc_NativeOther && this.loadSucc_NativeImageAd;
    }

    showNativeImage(width, height, x, y, type?, hideCallback?) {
        if (!this.loadSucc_NativeImageAd || !this.loadSucc_NativeOther) {
            console.log("XminigameSDK", "原生大图或资源未加载成功 return");
            return;
        }

        if (this.isShow_NativeImage) {
            console.log("XminigameSDK", "原生大图正在展示中,请勿多次show");
            return;
        }
        this.isShow_NativeImage = true;

        console.log("XminigameSDK", "OPPO showNativeImage===========================");

        if (type == 1) {
            this.showNewNativeImage(1, hideCallback);
            return;
        }

        this.onAdType(AdType.NativeBig, AdTriggerType.Show);

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
            this.onAdType(AdType.NativeBig, AdTriggerType.Click);
            this.reportNativeImageAdClick(tempid);
        });

        this.setChildrenNodeLayer(this.node_nativeImage);

    }

    showNewNativeImage(type, hideCallback) {
        let tempid = this.nativeImageAdInfo.adId;
        this.reportNativeImageAdShow(tempid);

        this.onAdType(AdType.NativeBig, AdTriggerType.Show);

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
            this.onAdType(AdType.NativeBig, AdTriggerType.Click);
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
            console.log("XminigameSDK", "OPPO hideNativeImage===========================");
            this.onAdType(AdType.NativeBig, AdTriggerType.Hide);
            this.node_nativeImage.removeFromParent();
            this.node_nativeImage = null;
        }
    }

    getNativePasterFlag() {
        return this.loadSucc_NativeOther && this.loadSucc_NativeImageAd;
    }
    showNativePaster() {
        if (!this.getNativePasterFlag()) return;

        if (this.node_nativePaster != null) {
            this.node_nativePaster.removeFromParent();
            this.node_nativePaster = null;
        }

        console.log("XminigameSDK", "showNativePaster===========================")

        this.onAdType(AdType.NativePaster, AdTriggerType.Show);

        // 上报
        let tempid = this.nativeImageAdInfo.adId;
        this.reportNativeImageAdShow(tempid);

        this.node_nativePaster = new Node("node_nativePaster");
        this.getSdkCanvas().addChild(this.node_nativePaster);
        let node_nativePasterWidth = view.getVisibleSize().width;
        let node_nativePasterHeight = view.getVisibleSize().height;
        this.node_nativePaster.addComponent(UITransformComponent);
        this.node_nativePaster.getComponent(UITransformComponent).setContentSize(node_nativePasterWidth, node_nativePasterHeight);
        this.node_nativePaster.getComponent(UITransformComponent).priority = 30003;
        let node_nativePasterX = node_nativePasterWidth / 2;
        let node_nativePasterY = node_nativePasterHeight / 2;
        this.node_nativePaster.setPosition(node_nativePasterX, node_nativePasterY, 0);

        this.node_nativePaster.on(Node.EventType.TOUCH_START, (event) => {
        })

        // 黑色背景
        // let NativeMask: Node = new Node("NativeMask");
        // this.node_nativePaster.addChild(NativeMask);
        // NativeMask.addComponent(SpriteComponent);
        // let spriteFrameNode_nativePaster = new SpriteFrame();
        // spriteFrameNode_nativePaster.texture = this.nativeOtherRes.NativeMask;
        // NativeMask.getComponent(SpriteComponent).spriteFrame = spriteFrameNode_nativePaster;
        // let NativeMaskWidth = node_nativePasterWidth;
        // let NativeMaskHeight = node_nativePasterHeight;
        // NativeMask.getComponent(UITransformComponent).setContentSize(NativeMaskWidth, NativeMaskHeight);
        // NativeMask.addComponent(UIOpacityComponent);
        // NativeMask.getComponent(UIOpacityComponent).opacity = 150;

        // 贴片白色底框
        let NativeBlank: Node = new Node("NativeBlank");
        this.node_nativePaster.addChild(NativeBlank);
        NativeBlank.addComponent(SpriteComponent);
        let spriteFrameNativeBlank = new SpriteFrame();
        spriteFrameNativeBlank.texture = this.nativeOtherRes.NativeBlank;
        NativeBlank.getComponent(SpriteComponent).spriteFrame = spriteFrameNativeBlank;

        let NativeBlankWidth = 0;
        let NativeBlankHeight = 0;
        let NativeBlankX = 0;
        let NativeBlankY = 0;
        if (view.getVisibleSize().width < view.getVisibleSize().height) {
            NativeBlankWidth = node_nativePasterWidth * 0.96;
            NativeBlankHeight = NativeBlankWidth / 2;
            NativeBlankY = NativeBlankHeight / 2;

            // 查看广告按钮
            let NativeButton: Node = new Node("NativeButton");
            NativeBlank.addChild(NativeButton);
            NativeButton.addComponent(SpriteComponent);
            let spriteFrameNativeButton = new SpriteFrame();
            spriteFrameNativeButton.texture = this.nativeOtherRes.NativeButton;
            NativeButton.getComponent(SpriteComponent).spriteFrame = spriteFrameNativeButton;
            let NativeButtonWidth = NativeBlankWidth * 0.5;
            let NativeButtonHeight = NativeButtonWidth * 0.35;
            NativeButton.getComponent(UITransformComponent).setContentSize(NativeButtonWidth, NativeButtonHeight);
            let NativeButtonY = - NativeBlankHeight / 2 - NativeButtonHeight;
            NativeButton.setPosition(0, NativeButtonY, 0);

            //点击按钮
            NativeButton.on(Node.EventType.TOUCH_START, (event) => {
                this.onAdType(AdType.NativePaster, AdTriggerType.Click);
                this.node_nativePaster.removeFromParent();
                this.node_nativePaster = null;
                this.reportNativeImageAdClick(tempid);
            });
        } else {
            NativeBlankWidth = node_nativePasterWidth * 0.48;
            NativeBlankHeight = NativeBlankWidth / 2;
        }

        NativeBlank.getComponent(UITransformComponent).setContentSize(NativeBlankWidth, NativeBlankHeight);
        NativeBlank.setPosition(NativeBlankX, NativeBlankY, 0);

        // 大图
        let bigImage: Node = new Node("bigImage");
        NativeBlank.addChild(bigImage);
        bigImage.addComponent(SpriteComponent);
        let spriteFrameBigImage = new SpriteFrame();
        spriteFrameBigImage.texture = this.nativeImageAdInfo.Native_BigImage;
        bigImage.getComponent(SpriteComponent).spriteFrame = spriteFrameBigImage;
        let bigImageWidth = NativeBlankWidth * 0.98;
        let bigImageHeight = bigImageWidth / 2;
        bigImage.getComponent(UITransformComponent).setContentSize(bigImageWidth, bigImageHeight);

        //点击大图
        bigImage.on(Node.EventType.TOUCH_START, (event) => {
            this.onAdType(AdType.NativePaster, AdTriggerType.Click);
            this.reportNativeImageAdClick(tempid);
            this.node_nativePaster.removeFromParent();
            this.node_nativePaster = null;
        });

        // 广告角标
        let NativeAdTip: Node = new Node("NativeAdTip");
        bigImage.addChild(NativeAdTip);
        NativeAdTip.addComponent(SpriteComponent);
        let spriteFrameNativeAdTip = new SpriteFrame();
        spriteFrameNativeAdTip.texture = this.nativeOtherRes.NativeAdTip;
        NativeAdTip.getComponent(SpriteComponent).spriteFrame = spriteFrameNativeAdTip;
        let NativeAdTipWidth = 70;
        let NativeAdTipHeight = NativeAdTipWidth / 70 * 34;
        NativeAdTip.getComponent(UITransformComponent).setContentSize(NativeAdTipWidth, NativeAdTipHeight);
        let NativeAdTipX = bigImageWidth / 2 - NativeAdTipWidth / 2;
        let NativeAdTipY = NativeAdTipHeight / 2 - bigImageHeight / 2;
        NativeAdTip.setPosition(NativeAdTipX, NativeAdTipY, 0);

        // 关闭按钮
        let NativeClose: Node = new Node("NativeClose");
        NativeBlank.addChild(NativeClose);
        NativeClose.addComponent(SpriteComponent);
        let spriteFrameNativeClose = new SpriteFrame();
        spriteFrameNativeClose.texture = this.nativeOtherRes.NativeClose;
        NativeClose.getComponent(SpriteComponent).spriteFrame = spriteFrameNativeClose;
        let NativeCloseWidth = bigImageHeight / 7;
        let NativeCloseHeight = NativeCloseWidth;
        NativeClose.getComponent(UITransformComponent).setContentSize(NativeCloseWidth, NativeCloseHeight);
        let NativeCloseX = NativeCloseWidth - bigImageWidth / 2;
        let NativeCloseY = bigImageHeight / 2 - NativeCloseHeight;
        NativeClose.setPosition(NativeCloseX, NativeCloseY, 0);
        // 防止触摸冒泡
        NativeClose.addComponent(BlockInputEventsComponent);

        this.setChildrenNodeLayer(this.node_nativePaster);

        //监听点击关闭按钮
        NativeClose.on(Node.EventType.TOUCH_START, (event) => {
            this.onAdType(AdType.NativePaster, AdTriggerType.Hide);
            this.node_nativePaster.removeFromParent();
            this.node_nativePaster = null;
        });
    }

    // 游戏端拉取的
    pullNativeBannerAdId = [];
    pullNativeIntersAdId = [];
    pullNativeImageAdId = [];
    getNativeAdInfo(type) {
        if (type == 1) {
            console.log("XminigameSDK", "getNativeAdInfo type 1 : nativeBannerId");
            this.pullNativeBannerAdId.push(this.pullNativeBannerAdInfo.adId);
            return this.pullNativeBannerAdInfo;
        } else if (type == 2) {
            console.log("XminigameSDK", "getNativeAdInfo type 2 : nativeIntersId");
            this.pullNativeIntersAdId.push(this.pullNativeIntersAdInfo.adId);
            return this.pullNativeIntersAdInfo;
        } else {
            console.log("XminigameSDK", "getNativeAdInfo type 3 : nativeImageId");
            this.pullNativeImageAdId.push(this.pullNativeImageAdInfo.adId);
            return this.pullNativeImageAdInfo;
        }
    }

    reportNativeAdShow(adId) {
        if (!adId) return;
        if (this.pullNativeBannerAdId.indexOf(adId) != -1) {
            console.log("XminigameSDK", "OPPO 自定义原生广告上报展示", adId);
            this.reportNativeBannerAdShow(adId);
        } else if (this.pullNativeIntersAdId.indexOf(adId) != -1) {
            console.log("XminigameSDK", "OPPO 自定义原生广告上报展示", adId);
            this.reportNativeIntersAdShow(adId);
        } else if (this.pullNativeImageAdId.indexOf(adId) != -1) {
            console.log("XminigameSDK", "OPPO 自定义原生广告上报展示", adId);
            this.reportNativeImageAdShow(adId);
        } else {
            console.error("XminigameSDK", "OPPO 自定义原生广告上报展示的adId异常");
        }
    }
    reportNativeAdClick(adId) {
        if (!adId) return;
        if (this.pullNativeBannerAdId.indexOf(adId) != -1) {
            console.log("XminigameSDK", "OPPO 自定义原生广告上报点击", adId);
            this.reportNativeBannerAdClick(adId);
        } else if (this.pullNativeIntersAdId.indexOf(adId) != -1) {
            console.log("XminigameSDK", "OPPO 自定义原生广告上报点击", adId);
            this.reportNativeIntersAdClick(adId);
        } else if (this.pullNativeImageAdId.indexOf(adId) != -1) {
            console.log("XminigameSDK", "OPPO 自定义原生广告上报点击", adId);
            this.reportNativeImageAdClick(adId);
        } else {
            console.error("XminigameSDK", "OPPO 自定义原生广告上报点击的adId异常");
        }
    }

    reportNativeBannerAdShow(adId) {
        if (!adId) return;
        console.log("XminigameSDK", "OPPO 原生banner广告上报展示 " + adId);
        this.nativeBannerAd && this.nativeBannerAd.reportAdShow({
            adId: adId
        })
    }

    reportNativeBannerAdClick(adId) {
        if (!adId) return;
        console.log("XminigameSDK", "OPPO 原生banner广告上报点击 " + adId);
        this.nativeBannerAd && this.nativeBannerAd.reportAdClick({
            adId: adId
        })
    }

    reportNativeIntersAdShow(adId) {
        if (!adId) return;
        console.log("XminigameSDK", "OPPO 原生插屏广告上报展示 " + adId);
        this.onAdType(AdType.NativeInters, AdTriggerType.Show);
        this.nativeIntersAd && this.nativeIntersAd.reportAdShow({
            adId: adId
        })
    }

    reportNativeIntersAdClick(adId) {
        if (!adId) return;
        console.log("XminigameSDK", "OPPO 原生插屏广告上报点击 " + adId);
        this.onAdType(AdType.NativeInters, AdTriggerType.Click);
        this.nativeIntersAd && this.nativeIntersAd.reportAdClick({
            adId: adId
        })
    }

    reportNativeImageAdShow(adId) {
        if (!adId) return;
        console.log("XminigameSDK", "OPPO 原生大图广告上报展示 " + adId);
        this.nativeImageAd && this.nativeImageAd.reportAdShow({
            adId: adId
        })
    }

    reportNativeImageAdClick(adId) {
        if (!adId) return;
        console.log("XminigameSDK", "OPPO 原生大图广告上报点击 " + adId);
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
        if (this.isShow_NavigateSettle) {
            console.log("XminigameSDK", "已经调用过showNavigateBoxBanner,请勿重复调用");
            return;
        }
        this.isShow_NavigateSettle = true;

        if (this.loadSucc_NavigateBoxBanner) {
            this.hideBanner();
            console.log("XminigameSDK", "showNavigateBoxBanner=====================");
            this.navigateBoxBannerAd.show();
            this.onAdType(AdType.NavigateBoxBanner, AdTriggerType.Show);
        }
    }

    hideNavigateBoxBanner() {
        if (this.isShow_NavigateSettle) {
            console.log("XminigameSDK", "hideNavigateBoxBanner=====================");
            this.isShow_NavigateSettle = false;
            if (this.navigateBoxBannerAd) {
                this.navigateBoxBannerAd.hide();
                this.onAdType(AdType.NavigateBoxBanner, AdTriggerType.Hide);
            }
        }
    }


    getNavigateBoxPortalFlag() {
        return this.loadSucc_NavigateBoxPortal;
    }

    showNavigateBoxPortal(imageUrl?, marginTop?) {
        if (this.loadSucc_NavigateBoxPortal) {
            this.temp_hasShowBanner = this.hasShowBanner;
            this.hideBanner();
            this.navigateBoxPortalAd.show();
            this.onAdType(AdType.NavigateBoxPortal, AdTriggerType.Show);
        }
    }
    hideNavigateBoxPortal() {
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
            success: (res) => {
                // 判断图标未存在时，创建图标
                if (res == false) {
                    console.log("XminigameSDK", "OPPO 不存在桌面图标");
                    callback(true);
                } else {
                    console.log("XminigameSDK", "OPPO 已存在桌面图标");
                    callback(false);
                }
            },
            fail: (err) => {
                console.log("XminigameSDK", "OPPO qg.hasShortcutInstalled err：", JSON.stringify(err));
                callback(false);
            },
            complete: () => { }
        })
    }

    addDesktop(callback) {
        // @ts-ignore
        qg.installShortcut({
            success: () => {
                console.log("XminigameSDK", "OPPO 添加桌面成功");
                // 执行用户创建图标奖励
                callback(true);
            },
            fail: (err) => {
                console.log("XminigameSDK", "OPPO 添加桌面失败:" + JSON.stringify(err));
                callback(false);
            },
            complete: () => { }
        })
    }

    phoneVibrate(type) {
        if (type == "short") {
            // @ts-ignore
            qg.vibrateShort({
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { }
            })
        } else if (type == "long") {
            // @ts-ignore
            qg.vibrateLong({
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { }
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
        console.log("XminigameSDK", "OPPO getUserData=====================");
        let userData = {
            userId: LocalStorage.getData("userId"),
            token: LocalStorage.getData("token"),
            userType: LocalStorage.getData("userType"),
        }
        callback(userData);
    }

    getUserInfo(callback) {
        console.log("XminigameSDK", "OPPO getUserInfo=====================");
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
        userInfo.power = true;
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
    }
    showOPPOMoreGame() {
    }

    openProtocol() {
        console.log("XminigameSDK", "OPPO openProtocol==================");
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

        console.log("XminigameSDK", "OPPO showPrivacyAgreement==================");

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

        this.loadSucc_Banner = (this.loadSucc_NativeBanner && this.loadSucc_NativeBannerAd) || this.loadSucc_SystemBanner;

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
        if (this.isShow_NavigateSettle) {
            console.log("XminigameSDK", "OPPO 正在展示互推盒子 return");
            return;
        }

        this.isShow_NativeBanner = true;

        if (this.bannerType == 1) {
            this.showNewNativeBanner();
            return;
        }

        //原生广告id
        let tempid = this.nativeBannerAdInfo.adId;
        this.reportNativeBannerAdShow(tempid);

        this.onAdType(AdType.NativeBanner, AdTriggerType.Show);

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
            this.onAdType(AdType.NativeBanner, AdTriggerType.Click);
            this.reportNativeBannerAdClick(tempid);
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

        if (this.nativeBannerAdInfo.Native_BigImage) {
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
        } else if (this.nativeBannerAdInfo.Native_icon) {
            // icon
            let icon: Node = new Node("icon");
            this.node_nativeBanner.addChild(icon);
            icon.addComponent(SpriteComponent);
            let spriteFrameIcon = new SpriteFrame();
            spriteFrameIcon.texture = this.nativeBannerAdInfo.Native_icon;
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
        if (this.nativeBannerAdInfo.desc == "") {
            titleLabel.getComponent(LabelComponent).string = this.nativeBannerAdInfo.title;
        } else {
            titleLabel.getComponent(LabelComponent).string = this.nativeBannerAdInfo.desc;
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
            console.log("XminigameSDK", "原生banner关闭", this.NUM_BannerUpdateTime + "S后再次刷新");
            this.hideNativeBanner();
            // 广告关闭统计
            this.NUM_BannerClose++;
            this.updateBanner();
            // 清除触摸事件的冒泡
            // event.stopPropagation();
        });

        this.setChildrenNodeLayer(this.node_nativeBanner);

    }


    showNewNativeBanner() {

        //原生广告id
        let tempid = this.nativeBannerAdInfo.adId;
        this.reportNativeBannerAdShow(tempid);

        this.onAdType(AdType.NativeBanner, AdTriggerType.Show);

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
            this.onAdType(AdType.NativeBanner, AdTriggerType.Click);
            this.reportNativeBannerAdClick(tempid);
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
            console.log("XminigameSDK", "原生banner关闭", this.NUM_BannerUpdateTime + "S后再次刷新");
            this.hideNativeBanner();
            // 广告关闭统计
            this.NUM_BannerClose++;
            this.updateBanner();
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
        title.getComponent(LabelComponent).string = this.nativeBannerAdInfo.title;

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
        description.getComponent(LabelComponent).string = this.nativeBannerAdInfo.desc;

        // 原生大图或icon
        if (this.nativeBannerAdInfo.Native_BigImage) {
            // 大图
            let image = new Node();
            bannerAdBg.addChild(image);
            image.addComponent(SpriteComponent);
            let imageSp = new SpriteFrame();
            imageSp.texture = this.nativeBannerAdInfo.Native_BigImage;
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
        } else if (this.nativeBannerAdInfo.Native_icon) {
            // icon
            let icon = new Node();
            bannerAdBg.addChild(icon);
            icon.addComponent(SpriteComponent);
            let iconSp = new SpriteFrame();
            iconSp.texture = this.nativeBannerAdInfo.Native_icon;
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


    /**
     * 展示系统banner
     */
    showSystemBanner() {
        if (this.isShow_NavigateSettle) {
            console.log("XminigameSDK", "OPPO 正在展示互推盒子 return");
            return;
        }
        console.log("XminigameSDK", "OPPO showSystemBanner========================");
        this.isShow_SystemBanner = true;
        this.bannerAd.show();
        this.onAdType(AdType.SystemBanner, AdTriggerType.Show);
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

            if (this.SW_SystemBanner && this.SW_NativeBanner) {
                if (this.SW_SystemBannerFirst) {
                    console.log("XminigameSDK", "系统banner优先");
                    if (this.loadSucc_SystemBanner) {
                        console.log("XminigameSDK", "刷新系统banner");
                        this.updateSystemBanner();
                    } else if (this.loadSucc_NativeBanner && this.loadSucc_NativeBannerAd) {
                        console.log("XminigameSDK", "系统banner未加载完成,改为刷新原生banner");
                        this.updateNativeBanner();
                    }
                } else {
                    console.log("XminigameSDK", "原生banner优先");
                    if (this.loadSucc_NativeBanner && this.loadSucc_NativeBannerAd) {
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
        console.log("XminigameSDK", "OPPO updateSystemBanner========================");
        this.hideNativeBanner();
        this.hideSystemBanner();
        this.showSystemBanner();
    }

    /**
     * 隐藏系统banner
     */
    hideSystemBanner() {
        if (this.isShow_SystemBanner && this.bannerAd) {
            console.log("XminigameSDK", "OPPO hideSystemBanner========================");
            this.isShow_SystemBanner = false;
            this.bannerAd.offHide();
            this.bannerAd.hide();
            this.onAdType(AdType.SystemBanner, AdTriggerType.Hide);
        }
    }


    /**
     * 刷新原生banner
     */
    updateNativeBanner() {
        console.log("XminigameSDK", "OPPO updateNativeBanner========================");
        this.hideNativeBanner();
        this.hideSystemBanner();
        this.showNativeBanner();
    }

    /**
     * 隐藏原生banner
     */
    hideNativeBanner() {
        this.isShow_NativeBanner = false;
        if (this.node_nativeBanner) {
            console.log("XminigameSDK", "OPPO hideNativeBanner========================");
            this.onAdType(AdType.NativeBanner, AdTriggerType.Hide);
            this.node_nativeBanner.removeFromParent();
            this.node_nativeBanner = null;
        }
    }


    /**
     * 展示原生模板
     */
    showNativeTemplate() {
        if (this.loadSucc_NativeTemplate && this.nativeTemplateAd) {
            if (this.isShow_NativeTemplate) {
                return;
            }
            this.isShow_NativeTemplate = true;
            console.log("XminigameSDK", "OPPO showNativeTemplate========================");
            this.nativeTemplateAd.show().then(() => {
                console.log("XminigameSDK", "OPPO 原生模板广告展示成功==================");
                this.onAdType(AdType.NativeTmpInters, AdTriggerType.Show);
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
                console.log("XminigameSDK", "OPPO 原生模板广告展示错误:" + JSON.stringify(err));
                this.isShow_NativeTemplate = false;
            });
        }
    }

    /**
     * 展示原生插屏
     */
    showNativeInters() {
        console.log("XminigameSDK", "showNativeInters==================");

        if (!this.loadSucc_NativeInters || !this.loadSucc_NativeIntersAd) {
            console.log("XminigameSDK", "原生插屏资源或原生广告未加载完成,展示原生插屏失败");
            return;
        }

        if (this.isShow_NativeInters) return;
        this.isShow_NativeInters = true;

        this.temp_hasShowBanner = this.hasShowBanner;
        // 隐藏banner
        this.hideBanner();

        // 上报
        let tempid = this.nativeIntersAdInfo.adId;
        this.reportNativeIntersAdShow(tempid);

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
            let Button = new Node();
            Bg.addChild(Button);
            Button.addComponent(SpriteComponent);
            let ButtonSp = new SpriteFrame();
            ButtonSp.texture = this.nativeIntersRes.Button;
            Button.getComponent(SpriteComponent).spriteFrame = ButtonSp;
            let ButtonWidth = BgWidth * 0.7;
            let ButtonHeight = ButtonWidth * 0.36;
            Button.getComponent(UITransformComponent).setContentSize(ButtonWidth, ButtonHeight);
            let ButtonY = -BgHeight / 2 - ButtonHeight / 2 - ButtonHeight * 0.4;
            Button.setPosition(0, ButtonY);

            //点击原生插屏
            Button.on(Node.EventType.TOUCH_START, (event) => {
                this.reportNativeIntersAdClick(tempid);
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
        }
        else {
            BgHeight = height * 0.8;
            BgWidth = BgHeight * 1.13;
            Bg.getComponent(UITransformComponent).setContentSize(BgWidth, BgHeight);
        }

        //点击原生插屏
        Bg.on(Node.EventType.TOUCH_START, (event) => {
            this.reportNativeIntersAdClick(tempid);
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
        if (this.nativeIntersAdInfo.Native_BigImage) {
            console.log("XminigameSDK", "原生插屏广告大图展示")
            let image = new Node();
            Bg.addChild(image);
            image.addComponent(SpriteComponent);
            let imageSp = new SpriteFrame();
            imageSp.texture = this.nativeIntersAdInfo.Native_BigImage;
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
            iconSp.texture = this.loadSucc_NativeIcon ? this.nativeIntersAdInfo.Native_icon : this.nativeIntersAdInfo.Native_BigImage;
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
            title.getComponent(LabelComponent).string = this.nativeIntersAdInfo.title;
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
            desc.getComponent(LabelComponent).string = this.nativeIntersAdInfo.desc;
            desc.getComponent(LabelComponent).overflow = LabelComponent.Overflow.CLAMP;
            desc.getComponent(LabelComponent).horizontalAlign = LabelComponent.HorizontalAlign.CENTER;
            desc.getComponent(LabelComponent).verticalAlign = LabelComponent.VerticalAlign.CENTER;
            let descWidth = BgWidth;
            let descHeight = TitleBgHeight;
            desc.getComponent(UITransformComponent).setContentSize(descWidth, descHeight);
            let descY = TitleBgY - TitleBgHeight;
            desc.setPosition(0, descY);
        }
        else if (this.nativeIntersAdInfo.Native_icon) {
            console.log("XminigameSDK", "原生插屏广告ICON展示")
            let icon = new Node("icon");
            Bg.addChild(icon);
            icon.addComponent(SpriteComponent);
            let iconSp = new SpriteFrame();
            iconSp.texture = this.nativeIntersAdInfo.Native_icon;
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
            icon2Sp.texture = this.nativeIntersAdInfo.Native_icon;
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
            title.getComponent(LabelComponent).string = this.nativeIntersAdInfo.title;
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
            desc.getComponent(LabelComponent).string = this.nativeIntersAdInfo.desc;
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
            this.onAdType(AdType.NativeInters, AdTriggerType.Hide);
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
}
