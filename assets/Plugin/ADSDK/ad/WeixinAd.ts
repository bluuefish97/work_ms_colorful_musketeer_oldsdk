import { Node, CanvasComponent, director, view, SpriteComponent, MaskComponent, Vec3, tween, LabelComponent, Color, SpriteFrame, UITransformComponent, UIOpacityComponent } from "cc";
import ServerCenter from "../server/ServerCenter";
import CheckConfig from "../utils/CheckConfig";
import GetConfig from "../utils/GetConfig";
import LocalStorage from "../utils/LocalStorage";
import { AdInterface } from "./AdInterface";
import WeixinSDK from "../sdk/weixin/WeixinSDK";

const URL = "https://cnwebserver.xplaymobile.com";
let payResultCallback = null;

export default class WeixinAd implements AdInterface {
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
     * 原生模板插屏广告开关
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
     * 视频广告ID
     */
    ID_Video = "";
    /**
     * 积木广告ID
     */
    ID_Block = "";
    /**
     * 原生模板插屏广告ID
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
     * 区域屏蔽
     */
    /**
     * IP地址
     */
    IP = '';
    /**
     * 区域屏蔽开关
     */
    SW_AreaShielding = false;


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
     * banner已经被用户关闭的次数
     */
    NUM_BannerClose = 0;
    /**
     * banner延时加载定时器
     */
    timeout_againLoadBanner = null;



    /**
     * 系统插屏广告对象
     */
    systemIntersAd = null;
    /**
     * 系统插屏是否加载成功
     */
    loadSucc_SystemInters = false;
    /**
     * 系统插屏展示的必须间隔时间(默认10s)
     */
    time_SystemIntersShowInterval = 10;
    /**
     * 系统插屏展示当前间隔时间
     */
    time_SystemIntersShowNowInterval = 0;
    /**
     * 展示间隔时间倒计时器
     */
    timeout_SystemIntersShowCountdown = null;
    /**
     * 系统插屏当前展示次数
     */
    NUM_SystemIntersNowShow = 0;
    /**
     * 系统插屏最大展示次数
     */
    NUM_SystemIntersMostShow = 4;



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
     * 视频广告加载错误延时
     */
    timeout_videoLoadErr = null;




    /**
     * 原生广告对象
     */
    nativeAd = null;
    /**
     * 原生icon的参数
     */
    param_nativeIcon = {
        x: 0,
        y: 0
    };
    /**
     * 原生icon是否加载成功
     */
    loadSucc_NativeIcon = false;
    /**
     * 是否正在展示原生icon
     */
    isShow_NativeIcon = false;
    /**
     * 原生icon刷新定时器
     */
    timeout_updateNativeIcon = null;


    /**
     * 原生多格子广告
     */
    nativeMoreGrid = null;
    /**
     * 原生多格子广告是否加载完成
     */
    loadSucc_NativeMoreGrid = false;
    /**
     * 原生多格子广告加载定时器
     */
    timeout_LoadNativeMoreGrid = null;


    /**
     * 原生矩阵格子广告（矩阵格子）
     */
    nativeMatrixGrid = null;
    /**
     * 原生矩阵格子广告是否加载完成
     */
    loadSucc_NativeMatrixGrid = false;
    /**
     * 原生矩阵格子广告加载定时器
     */
    timeout_LoadNativeMatrixGrid = null;


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

        if (this.SW_SystemBanner && this.ID_SystemBanner != "") this.createSystemBanner();
        if (this.SW_SystemInters && this.ID_SystemInters != "") this.createSystemInters();
        if (this.SW_Video && this.ID_Video != "") this.createVideo();
        // show的时候创建
        if (this.SW_Native && this.ID_Native != "") this.createNative();
        if (this.ID_Block != "") this.createNativeMoreGrid();

        if (this.NUM_NativeTemplateP > 0 && this.ID_NativeTemplate != "" && this.SW_NativeTemplate) {
            this.createNativeMatrixGrid();
        }

        if (this.NUM_IntersIntervalTime > 0) this.runIntersInterval();
        this.runSystemIntersShowInterval();
    }

    /**
     * 加载互推
     */
    startLoadPushGamaes() {
        console.log("XminigameSDK", GetConfig.getChannelName(), "startLoadPushGamaes======================");
        if (this.SW_NavigateIcon) this.loadNavigateIconRes();
        if (this.SW_NavigateGroup) this.loadNavigateGroupRes();
        if (this.SW_NavigateSettle) this.loadNavigateSettleRes();
        if (this.SW_NavigateIcon || this.SW_NavigateGroup || this.SW_NavigateSettle) this.loadPushGameList();
    }

    /**
     * 加载互推icon资源
     */
    loadNavigateIconRes() {
        console.log("XminigameSDK", "--loadNavigateIconRes--");

        this.navigateIconRes = {
            NavigateIconBg: null,
            NavigateIconMask: null,
            NavigateIconMoreGame: null,
        }

        let navigateIconResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateIconBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateIconMask.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateIconMoreGame.png",
        ]

        LoadRes.loadResArray(navigateIconResArr, (err, texture) => {
            this.navigateIconRes.NavigateIconBg = texture[0];
            this.navigateIconRes.NavigateIconMask = texture[1];
            this.navigateIconRes.NavigateIconMoreGame = texture[2];
            this.loadSucc_NavigateIcon = true;
            console.log("XminigameSDK", "互推ICON资源加载成功");
        });
    }

    /**
     * 加载互推列表资源
     */
    loadNavigateGroupRes() {
        console.log("XminigameSDK", "--loadNavigateGroupRes--");

        this.navigateGroupRes = {
            NavigateGroupIconBtn: null,
            NavigateGroupIconMask: null,
            NavigateGroupLeftTuck: null,
            NavigateGroupListLeft: null,
            NavigateGroupListRight: null,
            NavigateGroupRightTuck: null,
        }

        let navigateGroupResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateGroupIconBtn.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateGroupIconMask.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateGroupLeftTuck.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateGroupListLeft.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateGroupListRight.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateGroupRightTuck.png",
        ]

        LoadRes.loadResArray(navigateGroupResArr, (err, texture) => {
            this.navigateGroupRes.NavigateGroupIconBtn = texture[0];
            this.navigateGroupRes.NavigateGroupIconMask = texture[1];
            this.navigateGroupRes.NavigateGroupLeftTuck = texture[2];
            this.navigateGroupRes.NavigateGroupListLeft = texture[3];
            this.navigateGroupRes.NavigateGroupListRight = texture[4];
            this.navigateGroupRes.NavigateGroupRightTuck = texture[5];
            this.loadSucc_NavigateGroup = true;
            console.log("XminigameSDK", "互推列表资源加载成功");
        });
    }

    /**
     * 加载结算互推资源
     */
    loadNavigateSettleRes() {
        console.log("XminigameSDK", "--loadNavigateSettleRes--");

        this.navigateSettleRes = {
            NavigateSettle1Bg: null,
            NavigateSettle2Bg: null,
            NavigateSettleIconYellow: null,
            NavigateSettleIconMask: null,
            NavigateSettleNameBg: null,
        }

        let navigateSettleResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateSettle1Bg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateSettle2Bg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateSettleIconYellow.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateSettleIconMask.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateSettleNameBg.png",
        ]

        LoadRes.loadResArray(navigateSettleResArr, (err, texture) => {
            this.navigateSettleRes.NavigateSettle1Bg = texture[0];
            this.navigateSettleRes.NavigateSettle2Bg = texture[1];
            this.navigateSettleRes.NavigateSettleIconYellow = texture[2];
            this.navigateSettleRes.NavigateSettleIconMask = texture[3];
            this.navigateSettleRes.NavigateSettleNameBg = texture[4];
            this.loadSucc_NavigateSettle = true;
            console.log("XminigameSDK", "结算互推资源加载成功");
        });
    }

    /**
     * 加载互推游戏列表
     */
    loadPushGameList() {
        console.log("XminigameSDK", "--loadPushGameList--");

        if (this.pushGameList == null) return;

        let hasLoadIconNum = 0;

        for (let i = 0; i < this.pushGameList.length; i++) {
            let arr = new Array();
            arr[0] = this.pushGameList[i].pushGamePicture;
            LoadRes.loadResArray(arr, (err, texture) => {
                if (err) {
                    console.log("XminigameSDK", `pushGameList icon${i}加载失败`);
                    let arr1;
                    arr1[0] = "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NoIcon.png";
                    LoadRes.loadResArray(arr1, (err, texture) => {
                        hasLoadIconNum++;
                        if (err) {
                            this.pushGameListIconTexture[i] = null;
                        }
                        else {
                            // @ts-ignore
                            this.pushGameListIconTexture[i] = texture[0];
                            if (hasLoadIconNum >= this.pushGameList.length) {
                                this.loadSucc_PushGameList = true;
                            }
                        }
                    });
                }
                else {
                    hasLoadIconNum++;
                    this.pushGameListIconTexture[i] = texture[0];
                    if (hasLoadIconNum >= this.pushGameList.length) {
                        this.loadSucc_PushGameList = true;
                    }
                }
            });
        }
    }

    /**
     * 加载互推插屏资源
     */
    loadNavigateIntersRes() {
        console.log("XminigameSDK", "--loadNavigateIntersRes--");

        this.navigateIntersRes = {
            BlackBg: null,
            NavigateIntersBg: null,
            NavigateIntersButton: null,
            NavigateIntersIconMask: null,
            NavigateIntersClose: null,
        }

        let navigateIntersResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/BlackBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateIntersBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateIntersButton.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateIntersIconMask.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateIntersClose.png",
        ]

        LoadRes.loadResArray(navigateIntersResArr, (err, texture) => {
            this.navigateIntersRes.BlackBg = texture[0];
            this.navigateIntersRes.NavigateIntersBg = texture[1];
            this.navigateIntersRes.NavigateIntersButton = texture[2];
            this.navigateIntersRes.NavigateIntersIconMask = texture[3];
            this.navigateIntersRes.NavigateIntersClose = texture[4];
            this.loadSucc_NavigateInters = true;
            console.log("XminigameSDK", "互推插屏资源加载成功");
        });
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
        if (this.timeout_againLoadBanner != null) {
            console.log("XminigameSDK", "正在createSystemBanner,防止多次创建");
            return;
        }

        // @ts-ignore
        let windowWidth = Number(wx.getSystemInfoSync().windowWidth);
        // @ts-ignore
        let windowHeight = Number(wx.getSystemInfoSync().windowHeight);

        // 竖屏游戏?
        let standGame = view.getVisibleSize().width < view.getVisibleSize().height;

        // @ts-ignore
        this.bannerAd = wx.createBannerAd({
            adUnitId: this.ID_SystemBanner,
            style: {
                left: 10,
                top: 76,
                height: 50,
                width: standGame ? windowWidth : 300
            },
        });

        // 监听系统banner尺寸变化
        this.bannerAd.onResize((size) => {
            this.bannerAd.style.top = windowHeight - size.height;
            this.bannerAd.style.left = (windowWidth - size.width) / 2;
        });

        // 监听系统banner加载
        this.bannerAd.onLoad(() => {
            console.log("XminigameSDK", "WX banner加载成功");
            this.loadSucc_SystemBanner = true;
            if (this.hasShowBanner) {
                this.showSystemBanner();
            }
        })

        // 监听系统banner错误
        this.bannerAd.onError((err) => {
            console.log("XminigameSDK", "WX banner加载失败：", JSON.stringify(err));

            this.timeout_againLoadBanner =
                setTimeout(() => {
                    this.createSystemBanner();
                    clearTimeout(this.timeout_againLoadBanner);
                    this.timeout_againLoadBanner = null;
                }, 10 * 1000);
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
        this.systemIntersAd = wx.createInterstitialAd({
            adUnitId: this.ID_SystemInters
        });

        //监听插屏广告加载完成
        this.systemIntersAd.onLoad(() => {
            console.log("XminigameSDK", "WX 插屏广告加载完成")
            this.loadSucc_SystemInters = true;
        })

        //监听插屏广告加载出错
        this.systemIntersAd.onError(err => {
            console.log("XminigameSDK", "WX 插屏广告加载失败：", JSON.stringify(err))
            this.loadSucc_SystemInters = false;
            setTimeout(() => {
                this.systemIntersAd && this.systemIntersAd.load();
            }, 30 * 1000)
        })

        // 监听插屏广告关闭
        this.systemIntersAd.onClose(() => {
            this.NUM_IntersNowIntervalTime = 0;
            this.time_SystemIntersShowNowInterval = 0;
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
        this.videoAd = wx.createRewardedVideoAd({
            adUnitId: this.ID_Video
        })

        //监听视频广告加载完成
        this.videoAd.onLoad(() => {
            console.log("XminigameSDK", "WX 视频广告加载完成")
            this.loadSucc_Video = true;
        })

        //监听视频广告加载出错
        this.videoAd.onError(err => {
            console.log("XminigameSDK", "WX 视频广告加载失败：" + JSON.stringify(err))
            this.loadSucc_Video = false;

            if (this.timeout_videoLoadErr != null) return;
            this.timeout_videoLoadErr =
                setTimeout(() => {
                    this.videoAd && this.videoAd.load();
                    clearTimeout(this.timeout_videoLoadErr);
                    this.timeout_videoLoadErr = null;
                }, 30 * 1000)
        })

        //监听视频广告播放完成
        this.videoAd.onClose(res => {
            setTimeout(() => {
                if (res.isEnded) {
                    console.log("XminigameSDK", "WX 激励视频广告完成,发放奖励")
                    if (this.callback_Video) {
                        this.callback_Video(true);
                        this.videoAd.load();
                    }
                } else {
                    console.log("XminigameSDK", "WX 激励视频广告取消关闭,不发放奖励")
                    if (this.callback_Video) {
                        this.callback_Video(false);
                        this.videoAd.load();
                    }
                }
            }, 500)
        })

        // 加载一次
        this.videoAd.load();
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

        // @ts-ignore
        this.nativeAd = wx.createCustomAd({
            adUnitId: this.ID_Native,
            adIntervals: 30,
            style: {
                left: this.param_nativeIcon.x,
                top: this.param_nativeIcon.y,
                fixed: true
            }
        })

        // 监听原生广告加载
        this.nativeAd.onLoad(() => {
            console.log("XminigameSDK", "WX 原生ICON加载成功");
            this.loadSucc_NativeIcon = true;
        });

        // 监听原生广告错误
        this.nativeAd.onError((err) => {
            console.log("XminigameSDK", "WX 原生ICON加载失败：", JSON.stringify(err));
            this.loadSucc_NativeIcon = false;
        });

        // 监听原生广告关闭
        this.nativeAd.onClose(() => {
            console.log("XminigameSDK", "WX 手动关闭原生ICON 30s后再次刷新");
            if (this.timeout_updateNativeIcon) clearTimeout(this.timeout_updateNativeIcon);
            this.hideNativeIcon();
            this.timeout_updateNativeIcon =
                setTimeout(() => {
                    this.createNative();
                    setTimeout(() => {
                        this.nativeAd.show();
                    }, 500);
                }, 30 * 1000);
        });
    }

    /**
     * 创建原生多格子广告
     */
    createNativeMoreGrid() {
        console.log("XminigameSDK", "--createNativeMoreGrid--");
        if (CheckConfig.stringHasSpace(this.ID_Block)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道积木广告ID中含有空字符串,请检查后台积木广告ID*********************");
            return;
        }

        // @ts-ignore
        let windowWidth = Number(wx.getSystemInfoSync().windowWidth);
        // @ts-ignore
        let windowHeight = Number(wx.getSystemInfoSync().windowHeight);

        // @ts-ignore
        this.nativeMoreGrid = wx.createCustomAd({
            adUnitId: this.ID_Block,
            style: {
                left: (windowWidth > 360 ? windowWidth - 360 : 0) / 2,
                top: windowHeight < windowWidth ? windowHeight * 0.7 : windowHeight - 140,
                fixed: true
            }
        })

        // 监听原生多格子广告加载
        this.nativeMoreGrid.onLoad(() => {
            console.log("XminigameSDK", "WX 原生多格子加载成功");
            this.loadSucc_NativeMoreGrid = true;
        });

        // 监听原生多格子广告错误
        this.nativeMoreGrid.onError((err) => {
            console.log("XminigameSDK", "WX 原生多格子加载失败：", JSON.stringify(err));
        });

        // 监听原生多格子广告关闭
        this.nativeMoreGrid.onClose(() => {
            console.log("XminigameSDK", "WX 手动关闭原生多格子");
            this.hideBlock();
        });
    }

    /**
     * 创建原生矩阵格子广告
     */
    createNativeMatrixGrid() {
        console.log("XminigameSDK", "--createNativeMatrixGrid--");
        if (CheckConfig.stringHasSpace(this.ID_NativeTemplate)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道原生模板插屏广告ID中含有空字符串,请检查后台原生模板插屏广告ID*********************");
            return;
        }

        // @ts-ignore
        let windowWidth = Number(wx.getSystemInfoSync().windowWidth);
        // @ts-ignore
        let windowHeight = Number(wx.getSystemInfoSync().windowHeight);

        // @ts-ignore
        this.nativeMatrixGrid = wx.createCustomAd({
            adUnitId: this.ID_NativeTemplate,
            style: {
                left: (windowWidth > 385 ? windowWidth - 385 : 0) / 2,
                top: windowHeight < windowWidth ? 0 : windowHeight * 0.2,
                fixed: true
            }
        })

        // 监听原生矩阵格子广告加载
        this.nativeMatrixGrid.onLoad(() => {
            console.log("XminigameSDK", "WX 原生矩阵格子加载成功");
            this.loadSucc_NativeMatrixGrid = true;
        });

        // 监听原生矩阵格子广告错误
        this.nativeMatrixGrid.onError((err) => {
            console.log("XminigameSDK", "WX 原生矩阵格子加载失败：", JSON.stringify(err));
            this.hideNativeMatrixGrid();
        });

        // 监听原生矩阵格子广告关闭
        this.nativeMatrixGrid.onHide(() => {
            console.log("XminigameSDK", "WX 用户关闭原生矩阵格子");
            this.hideNativeMatrixGrid();
        });
    }

    showNativeMatrixGrid() {
        if (!this.loadSucc_NativeMatrixGrid) {
            console.log("XminigameSDK", "原生矩阵格子广告未加载完成");
            return;
        }
        if (this.nativeMatrixGrid) this.nativeMatrixGrid.show();
    }

    /**
     * 关闭原生矩阵格子广告
     */
    hideNativeMatrixGrid() {
        this.loadSucc_NativeMatrixGrid = false;
        if (this.nativeMatrixGrid) this.nativeMatrixGrid.destroy();
        this.nativeMatrixGrid = null;
        if (this.timeout_LoadNativeMatrixGrid != null) return;
        this.timeout_LoadNativeMatrixGrid =
            setTimeout(() => {
                this.createNativeMatrixGrid();
                this.timeout_LoadNativeMatrixGrid = null;
            }, 10 * 1000);
    }


    getChannelId() {
        return GetConfig.getChannelId();
    }

    interiorShowBanner() {
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

    showBanner() {
        this.interiorShowBanner();
    }

    hideBanner() {
        this.hasShowBanner = false;
        this.hideSystemBanner();
        // if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
        if (this.timeout_checkBannerLoadSucc) clearTimeout(this.timeout_checkBannerLoadSucc);
    }

    getIntersFlag() {
        // console.log(this.loadSucc_SystemInters, this.NUM_SystemIntersP, this.time_SystemIntersShowNowInterval,
        //     this.time_SystemIntersShowInterval, this.NUM_SystemIntersNowShow, this.NUM_SystemIntersMostShow);
        // console.log(this.loadSucc_Video, this.SW_AreaShielding, this.NUM_NavigateIntersP);
        // console.log(this.loadSucc_NativeMatrixGrid, this.NUM_NativeTemplateP);
        return (this.loadSucc_SystemInters && this.NUM_SystemIntersP > 0 && this.time_SystemIntersShowNowInterval >= this.time_SystemIntersShowInterval && this.NUM_SystemIntersNowShow < this.NUM_SystemIntersMostShow)
            || (this.loadSucc_Video && this.SW_AreaShielding && this.NUM_NavigateIntersP > 0)
            || (this.loadSucc_NativeMatrixGrid && this.NUM_NativeTemplateP > 0);
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

        // 有插屏延迟的情况下延迟展示插屏
        if (this.NUM_IntersDelayTime > 0) {
            console.log("XminigameSDK", "插屏延迟时间(ms):" + this.NUM_IntersDelayTime);
            setTimeout(() => {
                this.showIntersAdByType(this.getShowInterTypeBySetting());
            }, this.NUM_IntersDelayTime)
        } else {
            this.showIntersAdByType(this.getShowInterTypeBySetting());
        }

    }

    /**
     * 根据配置获取展示的插屏类型
     */
    getShowInterTypeBySetting() {
        let canShowType = [];
        if (this.loadSucc_SystemInters && this.NUM_SystemIntersP > 0 && this.time_SystemIntersShowNowInterval >= this.time_SystemIntersShowInterval && this.NUM_SystemIntersNowShow < this.NUM_SystemIntersMostShow) {
            canShowType.push('inters');
        }
        if (this.loadSucc_NativeMatrixGrid && this.NUM_NativeTemplateP > 0) {
            canShowType.push('nativeMatrixGrid');
        }
        if (this.loadSucc_Video && this.SW_AreaShielding && this.NUM_NavigateIntersP > 0) {
            canShowType.push('video');
        }
        if (canShowType.length == 0) {
            return null;
        }
        if (canShowType.length == 1) {
            return canShowType[0];
        }

        // 生成随机数
        let random = Math.floor(Math.random() * 100);
        let temp = 0;
        console.log("XminigameSDK", "WX inters random:" + random);
        for (let i = 0; i < canShowType.length; i++) {
            temp += this.getPByType(canShowType[i]);
            if (random < temp) {
                return canShowType[i];
            }
        }
        return canShowType[0];
    }

    /**
     * 根据类型展示插屏广告
     * @param type inters nativeMatrixGrid video
     */
    showIntersAdByType(type: string): void {
        switch (type) {
            case "inters":
                this.showSystemInters();
                break;
            case "nativeMatrixGrid":
                this.showNativeMatrixGrid();
                break;
            case "video":
                this.showVideo((b) => { });
                break;
            default:
                break;
        }
    }

    /**
     * 根据类型获取插屏四合一概率
     * @param type inters nativeMatrixGrid video
     */
    getPByType(type: string): number {
        switch (type) {
            case "inters":
                return this.NUM_SystemIntersP;
            case "nativeMatrixGrid":
                return this.NUM_NativeTemplateP;
            case "video":
                return this.NUM_NavigateIntersP;
            default:
                return 0;
        }
    }


    getVideoFlag() {
        return this.loadSucc_Video;
    }

    showVideo(videoCallback, reason?) {
        if (this.videoAd && this.loadSucc_Video) {
            this.callback_Video = videoCallback;
            console.log("XminigameSDK", "WX showVideo========================")
            this.videoAd.show()
                .then(() => {
                    console.log("XminigameSDK", "WX 激励视频广告显示成功");
                    this.loadSucc_Video = false;
                })
                .catch(err => {
                    console.log("XminigameSDK", "WX 激励视频广告播放失败：", JSON.stringify(err));
                    // 可以手动加载一次
                    this.videoAd.load().then(() => {
                        console.log("XminigameSDK", "WX 激励视频广告手动加载成功");
                        // 加载成功后需要再显示广告
                        this.videoAd.show().then(() => {
                            console.log("XminigameSDK", "WX 激励视频广告手动加载显示成功");
                            this.loadSucc_Video = false;
                        }).catch(err => {
                            console.log("XminigameSDK", "WX 激励视频广告播放失败：", JSON.stringify(err));
                            this.loadSucc_Video = false;
                            this.callback_Video(false);
                        });
                    }).catch(err => {
                        console.log("XminigameSDK", "WX 激励视频广告手动加载失败：", JSON.stringify(err));
                        this.loadSucc_Video = false;
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
        return this.loadSucc_NativeIcon;
    }

    showNativeIcon(width, height, x, y) {

        if (this.isShow_NativeIcon) {
            console.log("XminigameSDK", "原生icon正在展示中,请勿多次show return");
            return;
        }
        this.isShow_NativeIcon = true;


        // @ts-ignore
        let windowWidth = Number(wx.getSystemInfoSync().windowWidth);
        // @ts-ignore
        let windowHeight = Number(wx.getSystemInfoSync().windowHeight);

        // 存放一开始传入的参数y
        let tempX = x;
        let tempY = y;

        // cocos以左下角为(0,0) 转换为WX的以左上角为(0,0)
        y = view.getVisibleSize().height - y;
        this.param_nativeIcon.x = x * (windowWidth / view.getVisibleSize().width);
        this.param_nativeIcon.y = y * (windowHeight / view.getVisibleSize().height);

        if (this.nativeAd) this.nativeAd.destroy();
        if (this.SW_Native && this.ID_Native != "") this.createNative();

        setTimeout(() => {
            console.log("XminigameSDK", "WX showNativeIcon===============================");
            this.nativeAd.show();
        }, 500);

        this.timeout_updateNativeIcon =
            setTimeout(() => {
                console.log("XminigameSDK", "WX 刷新原生ICON广告================");
                this.hideNativeIcon();
                this.showNativeIcon(0, 0, tempX, tempY);
            }, 30 * 1000)

    }

    hideNativeIcon() {
        console.log("XminigameSDK", "WX hideNativeIcon===========================");
        this.isShow_NativeIcon = false;
        if (this.timeout_updateNativeIcon) {
            clearTimeout(this.timeout_updateNativeIcon);
        }
        this.nativeAd && this.nativeAd.destroy();
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
        wx.shareAppMessage({});
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
            wx.vibrateLong({
                success(res) {
                },
                fail(res) {
                    console.log("XminigameSDK", "WX vibrateLong调用失败", JSON.stringify(res));
                }
            });
        }
        else if (type == "short") {
            // @ts-ignore
            wx.vibrateShort({
                type: "heavy",
                success(res) {
                },
                fail(res) {
                    console.log("XminigameSDK", "WX vibrateShort调用失败", JSON.stringify(res));
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
        let userData = {
            userId: LocalStorage.getData("userId"),
            token: LocalStorage.getData("token"),
            userType: LocalStorage.getData("userType"),
            paySwitch: LocalStorage.getData("paySwitch"),
        }
        console.log("XminigameSDK", "getUserData=====================" + JSON.stringify(userData));
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
        return this.loadSucc_NativeMoreGrid;
    }

    showBlock(type, x, y, blockSize) {
        if (!this.loadSucc_NativeMoreGrid) {
            console.log("XminigameSDK", "原生多格子广告未加载完成");
            return;
        }
        if (this.nativeMoreGrid) this.nativeMoreGrid.show();
    }
    hideBlock() {
        this.loadSucc_NativeMoreGrid = false;
        console.log("XminigameSDK", "WX hideBlock==========================");
        if (this.nativeMoreGrid) this.nativeMoreGrid.destroy();
        this.nativeMoreGrid = null;
        if (this.timeout_LoadNativeMoreGrid != null) return;
        this.timeout_LoadNativeMoreGrid =
            setTimeout(() => {
                this.createNativeMoreGrid();
                this.timeout_LoadNativeMoreGrid = null;
            }, 10 * 1000);
    }

    exitTheGame() {
    }

    reportAnalytics(params, data) {
        // @ts-ignore
        if (wx.uma) wx.uma.trackEvent(params, data);
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
        callback(true);
    }


    buyProps(money, propId, propName, callback) {
        payResultCallback = callback;
        // @ts-ignore
        if (wx.getSystemInfoSync().platform == "android") {
            this.androidPay(money, propId);
            // @ts-ignore
        } else if (wx.getSystemInfoSync().platform == "ios") {
            this.iosPay(money, propId, propName);
        } else {
            console.log("XminigameSDK", "buyProps 非安卓/ios手机微信端");
            this.callPayResult(false, null);
        }
    }

    payComplete(orderId) {
        // @ts-ignore
        if (wx.getSystemInfoSync().platform != "ios") {
            return;
        }
        if (!GetConfig.getAppId()) {
            console.log("XminigameSDK", "SdkConfig未填写appid====================");
            return;
        }
        let openId = LocalStorage.getData("openId");
        if (!openId) {
            console.log("XminigameSDK", "openId:" + openId);
            return;
        }

        let url = URL + "/wxpay/app_api/pay/commit_order";
        let data = {
            "app_id": GetConfig.getAppId(),
            "user_id": openId,
            "order_list": [orderId]
        };

        console.log("XminigameSDK", "payComplete data:" + JSON.stringify(data));

        this.req(url, data, (succ, res) => {
            if (succ && res && res.ret == "ok") {
                console.log("XminigameSDK", "payCompleted OK. orderId:" + orderId);
            }
        });
    }

    queryUnfilledOrder(callback) {
        // @ts-ignore
        if (wx.getSystemInfoSync().platform != "ios") {
            callback(false, null);
            return;
        }
        if (!GetConfig.getAppId()) {
            console.log("XminigameSDK", "SdkConfig未填写appid====================");
            callback(false, null);
            return;
        }
        let openId = LocalStorage.getData("openId");
        if (!openId) {
            console.log("XminigameSDK", "openId:" + openId);
            callback(false, null);
            return;
        }

        let url = URL + "/wxpay/app_api/pay/get_uncommit_order";
        let data = {
            "app_id": GetConfig.getAppId(),
            "user_id": openId
        };

        this.req(url, data, (succ, res) => {
            console.log("XminigameSDK", "queryUnfilledOrder res:" + JSON.stringify(res));
            if (!res && !res.data) {
                callback(false, null);
                return;
            }
            let list = res.data.list;
            if (list.length == undefined) {
                callback(false, null);
                return;
            }
            if (list.length > 0) {
                for (let i = 0; i < list.length; i++) {
                    this.payComplete(list[i].order_id);
                }
            }
            callback(succ, list);
        });
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
            this.interiorShowBanner();
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
        if (this.bannerAd && this.loadSucc_SystemBanner) {
            console.log("XminigameSDK", "WX showSystemBanner========================");
            this.bannerAd.show();
        }
    }

    /**
     * 刷新系统banner
     */
    updateSystemBanner() {
        // 关闭上一个showBanner产生的定时器
        // if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
        if (this.interval_updateBanner) return;
        this.interval_updateBanner =
            setInterval(() => {
                console.log("XminigameSDK", "WX updateSystemBanner========================");
                if (this.bannerAd) {
                    this.bannerAd.destroy();
                    this.bannerAd = null;
                }
                this.createSystemBanner();
            }, this.NUM_BannerUpdateTime * 1000)
    }

    /**
     * 隐藏系统banner
     */
    hideSystemBanner() {
        if (this.bannerAd) {
            console.log("XminigameSDK", "WX hideSystemBanner========================");
            this.bannerAd.hide();
        }
    }

    /**
     * 展示系统插屏
     */
    showSystemInters() {
        if (this.systemIntersAd && this.loadSucc_SystemInters && this.time_SystemIntersShowNowInterval >= this.time_SystemIntersShowInterval && this.NUM_SystemIntersNowShow < this.NUM_SystemIntersMostShow) {
            this.NUM_SystemIntersNowShow++;
            console.log("XminigameSDK", "WX showSystemInters==================" + this.NUM_SystemIntersNowShow);
            this.systemIntersAd.show().catch((err) => {
                console.error("XminigameSDK", "WX showSystemInters:" + JSON.stringify(err));
                if (err.errCode == 2003) {
                    this.systemIntersAd && this.systemIntersAd.destroy();
                    this.systemIntersAd = null;
                    this.createSystemInters();
                }
                if (err.errCode == 2002) {
                    setTimeout(() => {
                        this.systemIntersAd && this.systemIntersAd.destroy();
                        this.systemIntersAd = null;
                        this.createSystemInters();
                    }, 10 * 1000);
                    this.time_SystemIntersShowNowInterval = 0;
                    this.time_SystemIntersShowInterval += this.time_SystemIntersShowInterval;
                }
            })
        }
    }


    /**
     * 点击互推游戏跳转
     */
    jumpToMiniGame(pushGameInfo) {
        // @ts-ignore
        wx.navigateToMiniProgram({
            appId: pushGameInfo.pushGamePackage,
            path: "?foo=bar",
            success(res) {
                ServerCenter.getInstance().collectAdPush(pushGameInfo.pushGamePackage, (suc, res) => {
                    if (suc && res.status == 200) {
                        console.log("XminigameSDK", "statistics success");
                    } else {
                        console.log("XminigameSDK", "statistics fail");
                    }
                });
                // 打开成功
                console.log("XminigameSDK", "WX 跳转成功");
            },
            fail(err) {
                console.log("XminigameSDK", "WX 跳转失败：", JSON.stringify(err));
            }
        })
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

    /**
     * 系统插屏展示间隔计时器
     */
    runSystemIntersShowInterval() {
        setInterval(() => {
            this.time_SystemIntersShowNowInterval++;
        }, 1000);
    }




    /**
     * 安卓端支付
     */
    androidPay(money, propId) {
        console.log("XminigameSDK", "androidPay================");

        if (!GetConfig.getAppId()) {
            console.log("XminigameSDK", "SdkConfig未填写appid====================");
            this.callPayResult(false);
            return;
        }
        let openId = LocalStorage.getData("openId");
        if (!openId) {
            console.log("XminigameSDK", "openId:" + openId);
            new WeixinSDK().startLogin();
            this.callPayResult(false);
            return;
        }

        let url = URL + "/wxpay/app_api/pay/midas_try_pay";
        let amt = Math.floor(money * 10);

        let data = {
            "user_id": openId,  //玩家id
            "open_id": openId, //微信open_id
            "app_id": GetConfig.getAppId(), //小游戏appid
            "amt": amt, //米币价格
        }

        console.log("XminigameSDK", "androidPay data:" + JSON.stringify(data));

        this.req(url, data, (succ, res) => {
            if (succ) {
                if (res.data.errcode == 90013) {
                    console.log("XminigameSDK", "米币余额不足");
                    let offerId = res.data.offer_id;
                    this.requestMidasPayment(offerId, amt, (succ) => {
                        if (succ) {
                            this.androidPay(money, propId);
                        } else {
                            this.callPayResult(false);
                        }
                    });
                } else if (res.data.errcode == 0) {
                    console.log("XminigameSDK", "提示：购买成功");
                    this.callPayResult(true, propId);
                }
            } else {
                this.callPayResult(false);
            }
        });
    }



    requestMidasPayment(offerId, amt, callback) {
        console.log("XminigameSDK", "requestMidasPayment================");
        let data = {
            mode: "game",
            env: "0",
            offerId: offerId,
            platform: "android",
            currencyType: "CNY",
            buyQuantity: amt,
            success: (res) => {
                console.log("XminigameSDK", "requestMidasPayment success. res:" + JSON.stringify(res));
                callback(true);
            },
            fail: (res) => {
                console.log("XminigameSDK", "requestMidasPayment fail. res:" + JSON.stringify(res));
                callback(false);
            }
        }
        console.log("XminigameSDK", "requestMidasPayment data:" + JSON.stringify(data));
        // @ts-ignore
        wx.requestMidasPayment(data);
    }



    /**
     * IOS端支付
     */
    iosPay(money, propId, propName) {
        console.log("XminigameSDK", "iosPay================");

        if (!GetConfig.getAppId()) {
            console.log("XminigameSDK", "SdkConfig未填写appid====================");
            this.callPayResult(false);
            return;
        }
        let openId = LocalStorage.getData("openId");
        if (!openId) {
            console.log("XminigameSDK", "openId:" + openId);
            new WeixinSDK().startLogin();
            this.callPayResult(false);
            return;
        }

        // 创建订单
        let url = URL + "/wxpay/app_api/pay/jspay_order";

        let mm = money * 100 + "";
        let data = {
            "app_id": GetConfig.getAppId(), //小游戏appid
            "user_id": openId,  //玩家id
            "open_id": openId, //微信open_id
            "product_id": propId,
            "product_name": propName,
            "money": mm,
        }

        console.log("XminigameSDK", "iosPay data:" + JSON.stringify(data));

        this.req(url, data, (succ, res) => {
            if (succ) {
                this.openCustomerServiceChat(res.data.order_id, res.data.mini_card_image_url);
            } else {
                this.callPayResult(false);
            }
        });
    }



    // 打开微信客服
    openCustomerServiceChat(orderId, imgUrl) {
        // @ts-ignore
        wx.openCustomerServiceConversation({
            sessionFrom: orderId + "",
            showMessageCard: true,
            sendMessageImg: imgUrl,
            success: (res) => {
                console.log("XminigameSDK", "openCustomerServiceChat success res:" + JSON.stringify(res));
            }
        });
    }



    // 返回安卓支付结果
    callPayResult(b: boolean, propId?: string) {
        if (b) {
            payResultCallback && payResultCallback(true, propId);
        } else {
            payResultCallback && payResultCallback(false, null);
        }
        payResultCallback = null;
    }


    // 服务器请求
    req(url, data, callback) {
        // @ts-ignore
        wx.request({
            url: url,
            data: data,
            method: "POST",
            success: (res) => {
                console.log("XminigameSDK", "pay 返回结果：", JSON.stringify(res.data));
                callback(true, res.data);
            },
            fail: (res) => {
                console.log("XminigameSDK", url, "error", JSON.stringify(res));
                callback(false, null);
            }
        })
    }

}
