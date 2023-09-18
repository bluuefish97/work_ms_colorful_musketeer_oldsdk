import { CanvasComponent, Color, director, LabelComponent, Node, SpriteComponent, SpriteFrame, tween, UI, UIOpacityComponent, UITransformComponent, Vec3, view } from "cc";
import QQPrivacyAgreement from "../common/QQPrivacyAgreement";
import GetConfig from "../utils/GetConfig";
import LoadRes from "../utils/LoadRes";
import LocalStorage from "../utils/LocalStorage";
import { AdInterface } from "./AdInterface";

export default class TestAd implements AdInterface {
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
     * 正在展示的测试广告
     */
    /**
     * 已经调用showBanner
     */
    hasShowBanner = false;
    /**
     * 正在展示插屏
     */
    isShow_Inters = false;
    /**
     * 正在展示视频
     */
    isShow_Video = false;
    /**
     * 正在展示原生icon
     */
    isShow_NativeIcon = false;
    /**
     * 正在展示原生大图
     */
    isShow_NativeImage = false;
    /**
     * 正在展示互推icon
     */
    isShow_NavigateIcon = false;
    /**
     * 正在展示互推列表
     */
    isShow_NavigateGroup = false;
    /**
     * 正在展示结算互推
     */
    isShow_NavigateSettle = false;
    /**
     * 正在展示结算互推类型1
     */
    isShow_NavigateSettle1 = false;
    /**
     * 正在展示互推盒子横幅
     */
    isShow_NavigateBoxBanner = false;
    /**
     * 正在展示互推盒子九宫格
     */
    isShow_NavigateBoxPortal = false;
    /**
     * 正在展示更多游戏横幅
     */
    isShow_MoreGamesBanner = false;
    /**
     * 正在展示积木广告
     */
    isShow_Block = false;
    /**
     * 正在展示隐私协议
     */
    isShow_PrivacyAgreement = false;
    /**
     * 正在展示互推贴片
     */
    isShow_NavigatePaster = false;



    /**
     * 测试节点区域
     */
    /**
     * 测试banner节点
     */
    node_testBanner: Node = null;
    /**
     * 测试插屏节点
     */
    node_testInters: Node = null;
    /**
     * 测试原生贴片节点
     */
    node_testNativePaster: Node = null;
    /**
     * 测试视频节点
     */
    node_testVideo: Node = null;
    /**
     * 测试原生icon节点
     */
    node_testNativeIcon: Node = null;
    /**
     * 测试原生大图节点
     */
    node_testNativeImage: Node = null;
    /**
     * 测试互推icon节点
     */
    node_testNavigateIcon: Node = null;
    /**
     * 测试互推列表节点
     */
    node_testNavigateGroup: Node = null;
    /**
     * 测试结算互推节点
     */
    node_testNavigateSettle: Node = null;
    /**
     * 测试互推盒子横幅节点
     */
    node_testNavigateBoxBanner: Node = null;
    /**
     * 测试互推盒子九宫格节点
     */
    node_testNavigateBoxPortal: Node = null;
    /**
     * 测试更多游戏横幅节点
     */
    node_testMoreGamesBanner: Node = null;
    /**
     * 测试积木节点
     */
    node_testBlock: Node = null;
    /**
     * 测试隐私协议节点
     */
    node_testPrivacyAgreement: Node = null;
    /**
     * 测试互推贴片节点
     */
    node_testNavigatePaster: Node = null;




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
    }

    /**
     * 加载互推
     */
    startLoadPushGamaes() {
    }


    getChannelId() {
        return GetConfig.getChannelId();
    }

    showBanner() {
        // 正在展示结算互推?
        if (this.isShow_NavigateSettle1) {
            console.log("XminigameSDK", "正在展示结算互推1,无法showBanner");
            return;
        }

        // 已经调用过showBanner
        if (this.hasShowBanner) {
            console.log("XminigameSDK", "已经调用过showBanner,请勿重复调用");
            return;
        }
        this.hasShowBanner = true;

        console.log("XminigameSDK", "Test showBanner==================");

        let testBannerRes = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestBanner.png"
        ]

        LoadRes.loadResArray(testBannerRes, (err, texture) => {
            this.node_testBanner = new Node("node_testBanner");
            this.getSdkCanvas().addChild(this.node_testBanner);
            this.node_testBanner.addComponent(SpriteComponent);
            let spriteFrameNode_testBanner = new SpriteFrame();
            spriteFrameNode_testBanner.texture = texture[0];
            this.node_testBanner.getComponent(SpriteComponent).spriteFrame = spriteFrameNode_testBanner;

            let node_testBannerWidth = 0;
            let node_testBannerHeight = 0;
            if (view.getVisibleSize().width < view.getVisibleSize().height) {
                node_testBannerWidth = view.getVisibleSize().width;
                node_testBannerHeight = node_testBannerWidth * 0.18;
            } else {
                node_testBannerWidth = view.getVisibleSize().width / 2;
                node_testBannerHeight = node_testBannerWidth * 0.18;
            }
            this.node_testBanner.getComponent(UITransformComponent).setContentSize(node_testBannerWidth, node_testBannerHeight);
            this.node_testBanner.getComponent(UITransformComponent).priority = 30000;

            if (view.getVisibleSize().width < view.getVisibleSize().height) {
                this.node_testBanner.setPosition(node_testBannerWidth / 2, node_testBannerHeight / 2);
            } else {
                this.node_testBanner.setPosition(view.getVisibleSize().width - node_testBannerWidth, node_testBannerHeight / 2);
            }

            this.setChildrenNodeLayer(this.node_testBanner);
        })

    }

    hideBanner() {
        this.hasShowBanner = false;
        if (this.node_testBanner) {
            console.log("XminigameSDK", "Test hideBanner==================");
            this.node_testBanner.removeFromParent();
            this.node_testBanner = null;
        }
    }

    getIntersFlag() {
        return true;
    }

    showInters(callback?) {
        // 正在展示插屏
        if (this.isShow_Inters) {
            console.log("XminigameSDK", "已经调用过showInters,请勿重复调用");
            return;
        }
        this.isShow_Inters = true;

        console.log("XminigameSDK", "Test showInters==================");

        let testIntersRes = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestBlackBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestIntersClose.png"
        ]

        LoadRes.loadResArray(testIntersRes, (err, texture) => {
            this.node_testInters = new Node("node_testInters");
            this.getSdkCanvas().addChild(this.node_testInters);
            this.node_testInters.addComponent(SpriteComponent);
            let spriteFrameNode_testInters = new SpriteFrame();
            spriteFrameNode_testInters.texture = texture[0];
            this.node_testInters.getComponent(SpriteComponent).spriteFrame = spriteFrameNode_testInters;

            let node_testIntersWidth = view.getVisibleSize().width;
            let node_testIntersHeight = view.getVisibleSize().height;

            this.node_testInters.getComponent(UITransformComponent).setContentSize(node_testIntersWidth, node_testIntersHeight);
            let node_testIntersX = view.getVisibleSize().width / 2;
            let node_testIntersY = view.getVisibleSize().height / 2;
            this.node_testInters.setPosition(node_testIntersX, node_testIntersY);

            this.node_testInters.addComponent(UIOpacityComponent);
            this.node_testInters.getComponent(UIOpacityComponent).opacity = 150;
            this.node_testInters.getComponent(UITransformComponent).priority = 30010;

            this.node_testInters.on(Node.EventType.TOUCH_START, function (event) {
            })

            let text = new Node("text");
            this.node_testInters.addChild(text);
            text.addComponent(LabelComponent);
            text.getComponent(LabelComponent).color = Color.RED;
            text.getComponent(LabelComponent).string = "这是一个测试插屏,请点击右上角关闭";
            text.getComponent(LabelComponent).fontSize = 50;
            text.getComponent(LabelComponent).lineHeight = 50;

            let TestIntersClose = new Node("TestIntersClose");
            this.node_testInters.addChild(TestIntersClose);
            TestIntersClose.addComponent(SpriteComponent);
            let spriteFrameTestIntersClose = new SpriteFrame();
            spriteFrameTestIntersClose.texture = texture[1];
            TestIntersClose.getComponent(SpriteComponent).spriteFrame = spriteFrameTestIntersClose;
            let TestIntersCloseX = view.getVisibleSize().width * 1 / 4;
            let TestIntersCloseY = view.getVisibleSize().height * 1 / 5;
            TestIntersClose.setPosition(TestIntersCloseX, TestIntersCloseY);

            this.setChildrenNodeLayer(this.node_testInters);

            TestIntersClose.on(Node.EventType.TOUCH_START, (event) => {
                console.log("XminigameSDK", "关闭测试插屏");
                this.isShow_Inters = false;
                this.node_testInters.removeFromParent();
                this.node_testInters = null;
            });
        })
    }

    getVideoFlag() {
        return true;
    }

    showVideo(videoCallback, reason?) {
        // 正在展示视频
        if (this.isShow_Video) {
            console.log("XminigameSDK", "已经调用过showVideo,请勿重复调用");
            return;
        }
        this.isShow_Video = true;

        console.log("XminigameSDK", "Test showVideo==================");

        let testVideoRes = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestBlackBg.png",
        ]

        LoadRes.loadResArray(testVideoRes, (err, texture) => {
            this.node_testVideo = new Node("node_testVideo");
            this.getSdkCanvas().addChild(this.node_testVideo);
            this.node_testVideo.addComponent(SpriteComponent);
            let spriteFrameNode_testVideo = new SpriteFrame();
            spriteFrameNode_testVideo.texture = texture[0];
            this.node_testVideo.getComponent(SpriteComponent).spriteFrame = spriteFrameNode_testVideo;
            let node_testVideoWidth = view.getVisibleSize().width;
            let node_testVideoHeight = view.getVisibleSize().height;
            this.node_testVideo.getComponent(UITransformComponent).setContentSize(node_testVideoWidth, node_testVideoHeight);
            let node_testVideoX = view.getVisibleSize().width / 2;
            let node_testVideoY = view.getVisibleSize().height / 2;
            this.node_testVideo.setPosition(node_testVideoX, node_testVideoY);
            this.node_testVideo.addComponent(UIOpacityComponent);
            this.node_testVideo.getComponent(UIOpacityComponent).opacity = 200;
            this.node_testVideo.getComponent(UITransformComponent).priority = 30000;
            this.node_testVideo.on(Node.EventType.TOUCH_START, (event) => {
            });


            let titleLabel = new Node("titleLabel");
            this.node_testVideo.addChild(titleLabel);
            titleLabel.addComponent(LabelComponent);
            titleLabel.getComponent(LabelComponent).fontSize = 50;
            titleLabel.getComponent(LabelComponent).lineHeight = 50;
            titleLabel.getComponent(LabelComponent).string = "视频播放回调的测试";
            let titleLabelWidth = view.getVisibleSize().width;

            let titleLabelHeight = titleLabel.getComponent(UITransformComponent).height;
            titleLabel.getComponent(UITransformComponent).setContentSize(titleLabelWidth, titleLabelHeight);
            let titleLabelY = view.getVisibleSize().height / 5;
            let titleLabelX = titleLabel.position.x;
            titleLabel.setPosition(titleLabelX, titleLabelY);


            // 播放成功
            let succBtn = new Node("succBtn");
            this.node_testVideo.addChild(succBtn);
            succBtn.addComponent(LabelComponent);
            succBtn.getComponent(LabelComponent).fontSize = 30;
            succBtn.getComponent(LabelComponent).lineHeight = 30;
            succBtn.getComponent(LabelComponent).string = "播放成功";
            let succBtnX = -view.getVisibleSize().width / 5;
            let succBtnY = -view.getVisibleSize().height / 5;
            succBtn.setPosition(succBtnX, succBtnY);
            succBtn.on(Node.EventType.TOUCH_START, (event) => {
                this.isShow_Video = false;
                this.node_testVideo.removeFromParent();
                this.node_testVideo = null;
                videoCallback(true);
            });

            // 播放失败
            let failBtn = new Node("failBtn");
            this.node_testVideo.addChild(failBtn);
            failBtn.addComponent(LabelComponent);
            failBtn.getComponent(LabelComponent).fontSize = 30;
            failBtn.getComponent(LabelComponent).lineHeight = 30;
            failBtn.getComponent(LabelComponent).string = "播放失败";
            let failBtnX = view.getVisibleSize().width / 5;
            let failBtnY = -view.getVisibleSize().height / 5;
            failBtn.setPosition(failBtnX, failBtnY);

            failBtn.on(Node.EventType.TOUCH_START, (event) => {
                this.isShow_Video = false;
                this.node_testVideo.removeFromParent();
                this.node_testVideo = null;
                videoCallback(false);
            });

            this.setChildrenNodeLayer(this.node_testVideo);
        })
    }

    getNativeIconFlag() {
        return true;
    }

    showNativeIcon(width, height, x, y) {
        if (this.isShow_NativeIcon) {
            console.log("XminigameSDK", "已经调用过showNativeIcon,请勿重复调用");
            return;
        }
        this.isShow_NativeIcon = true;

        console.log("XminigameSDK", "Test showNativeIcon==================");

        let testNativeIconRes = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNativeIcon.png",
        ]

        LoadRes.loadResArray(testNativeIconRes, (err, texture) => {
            this.node_testNativeIcon = new Node("node_testNativeIcon");
            this.getSdkCanvas().addChild(this.node_testNativeIcon);
            this.node_testNativeIcon.addComponent(SpriteComponent);
            let spriteFrameNode_testNativeIcon = new SpriteFrame();
            spriteFrameNode_testNativeIcon.texture = texture[0];
            this.node_testNativeIcon.getComponent(SpriteComponent).spriteFrame = spriteFrameNode_testNativeIcon;
            let node_testNativeIconWidth = width;
            let node_testNativeIconHeight = height;

            this.node_testNativeIcon.getComponent(UITransformComponent).setContentSize(node_testNativeIconWidth, node_testNativeIconHeight);
            let node_testNativeIconX = x;
            let node_testNativeIconY = y;
            this.node_testNativeIcon.setPosition(node_testNativeIconX, node_testNativeIconY);
            this.node_testNativeIcon.getComponent(UITransformComponent).priority = 29999;

            this.setChildrenNodeLayer(this.node_testNativeIcon);
        });
    }

    hideNativeIcon() {
        this.isShow_NativeIcon = false;
        if (this.node_testNativeIcon) {
            console.log("XminigameSDK", "Test hideNativeIcon==================");
            this.node_testNativeIcon.removeFromParent();
            this.node_testNativeIcon = null;
        }
    }

    getNativeImageFlag() {
        return true;
    }

    showNativeImage(width, height, x, y) {
        if (this.isShow_NativeImage) {
            console.log("XminigameSDK", "已经调用过showNativeImage,请勿重复调用");
            return;
        }
        this.isShow_NativeImage = true;

        console.log("XminigameSDK", "Test showNativeImage==================");

        let testNativeImageRes = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNativeImage.png",
        ]

        LoadRes.loadResArray(testNativeImageRes, (err, texture) => {
            this.node_testNativeImage = new Node("node_testNativeImage");
            this.getSdkCanvas().addChild(this.node_testNativeImage);
            this.node_testNativeImage.addComponent(SpriteComponent);
            let spriteFrameNode_testNativeImage = new SpriteFrame();
            spriteFrameNode_testNativeImage.texture = texture[0];
            this.node_testNativeImage.getComponent(SpriteComponent).spriteFrame = spriteFrameNode_testNativeImage;
            let node_testNativeImageWidth = width;
            let node_testNativeImageHeight = height;

            this.node_testNativeImage.getComponent(UITransformComponent).setContentSize(node_testNativeImageWidth, node_testNativeImageHeight);
            let node_testNativeImageX = x;
            let node_testNativeImageY = y;
            this.node_testNativeImage.setPosition(node_testNativeImageX, node_testNativeImageY);
            this.node_testNativeImage.getComponent(UITransformComponent).priority = 29999;

            this.setChildrenNodeLayer(this.node_testNativeImage);
        });
    }

    hideNativeImage() {
        this.isShow_NativeImage = false;
        if (this.node_testNativeImage) {
            console.log("XminigameSDK", "Test hideNativeImage==================");
            this.node_testNativeImage.removeFromParent();
            this.node_testNativeImage = null;
        }
    }

    getNativePasterFlag() {
        return true;
    }
    showNativePaster() {
        console.log("XminigameSDK", "Test showInters==================");

        let testNativePasterRes = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestBlackBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestIntersClose.png"
        ]

        LoadRes.loadResArray(testNativePasterRes, (err, texture) => {
            this.node_testNativePaster = new Node("node_testNativePaster");
            this.getSdkCanvas().addChild(this.node_testNativePaster);
            this.node_testNativePaster.addComponent(SpriteComponent);
            let spriteFrameNode_testNativePaster = new SpriteFrame();
            spriteFrameNode_testNativePaster.texture = texture[0];
            this.node_testNativePaster.getComponent(SpriteComponent).spriteFrame = spriteFrameNode_testNativePaster;

            let node_testNativePasterWidth = view.getVisibleSize().width;
            let node_testNativePasterHeight = view.getVisibleSize().height;

            this.node_testNativePaster.getComponent(UITransformComponent).setContentSize(node_testNativePasterWidth, node_testNativePasterHeight);
            let node_testNativePasterX = node_testNativePasterWidth / 2;
            let node_testNativePasterY = node_testNativePasterHeight / 2;
            this.node_testNativePaster.setPosition(node_testNativePasterX, node_testNativePasterY, 0);

            this.node_testNativePaster.addComponent(UIOpacityComponent);
            this.node_testNativePaster.getComponent(UIOpacityComponent).opacity = 150;
            this.node_testNativePaster.getComponent(UITransformComponent).priority = 30010;

            this.node_testNativePaster.on(Node.EventType.TOUCH_START, function (event) {
            })

            let text = new Node("text");
            this.node_testNativePaster.addChild(text);
            text.addComponent(LabelComponent);
            text.getComponent(LabelComponent).color = Color.RED;
            text.getComponent(LabelComponent).string = "这是一个测试原生贴片,请点击右上角关闭";
            text.getComponent(LabelComponent).fontSize = 50;
            text.getComponent(LabelComponent).lineHeight = 50;

            let TestNativeClose = new Node("TestNativeClose");
            this.node_testNativePaster.addChild(TestNativeClose);
            TestNativeClose.addComponent(SpriteComponent);
            let spriteFrameTestNativeClose = new SpriteFrame();
            spriteFrameTestNativeClose.texture = texture[1];
            TestNativeClose.getComponent(SpriteComponent).spriteFrame = spriteFrameTestNativeClose;
            let TestNativeCloseX = view.getVisibleSize().width * 1 / 4;
            let TestNativeCloseY = view.getVisibleSize().height * 1 / 5;
            TestNativeClose.setPosition(TestNativeCloseX, TestNativeCloseY, 0);

            this.setChildrenNodeLayer(this.node_testNativePaster);

            TestNativeClose.on(Node.EventType.TOUCH_START, (event) => {
                console.log("XminigameSDK", "关闭测试原生贴片");
                this.isShow_Inters = false;
                this.node_testNativePaster.removeFromParent();
                this.node_testNativePaster = null;
            });
        })
    }

    getNativeAdInfo(type) {
        console.log("XminigameSDK", "Test getNativeAdInfo==================");
        return {
            adId: "88888888",
            title: "测试标题",
            desc: "测试详情",
            Native_icon: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestGetNativeAdIcon.png",
            Native_BigImage: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestGetNativeAdImage.png",
            NativeAdTip: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestGetNativeAdAdTip.png",
            NativeClose: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestGetNativeAdClose.png",
        }
    }

    reportNativeAdShow(adId) {
        console.log("XminigameSDK", "Test reportNativeAdShow==================", adId);
    }
    reportNativeAdClick(adId) {
        console.log("XminigameSDK", "Test reportNativeAdClick==================", adId);
    }

    getNavigateIconFlag() {
        return true;
    }

    showNavigateIcon(width, height, x, y) {
        if (this.isShow_NavigateIcon) {
            console.log("XminigameSDK", "已经调用过showNavigateIcon,请勿重复调用");
            return;
        }
        this.isShow_NavigateIcon = true;

        console.log("XminigameSDK", "Test showNavigateIcon==================");

        let testNavigateIconRes = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateIcon.png",
        ]

        LoadRes.loadResArray(testNavigateIconRes, (err, texture) => {
            this.node_testNavigateIcon = new Node("node_testNavigateIcon");
            this.getSdkCanvas().addChild(this.node_testNavigateIcon);
            this.node_testNavigateIcon.addComponent(SpriteComponent);
            let spriteFrameNode_testNavigateIcon = new SpriteFrame();
            spriteFrameNode_testNavigateIcon.texture = texture[0];
            this.node_testNavigateIcon.getComponent(SpriteComponent).spriteFrame = spriteFrameNode_testNavigateIcon;
            let node_testNavigateIconWidth = width;
            let node_testNavigateIconHeight = height;

            this.node_testNavigateIcon.getComponent(UITransformComponent).setContentSize(node_testNavigateIconWidth, node_testNavigateIconHeight);
            let node_testNavigateIconX = x;
            let node_testNavigateIconY = y;
            this.node_testNavigateIcon.setPosition(node_testNavigateIconX, node_testNavigateIconY);
            this.node_testNavigateIcon.getComponent(UITransformComponent).priority = 29999;

            this.setChildrenNodeLayer(this.node_testNavigateIcon);
        });
    }

    hideNavigateIcon() {
        this.isShow_NavigateIcon = false;
        if (this.node_testNavigateIcon) {
            console.log("XminigameSDK", "Test hideNavigateIcon==================");
            this.node_testNavigateIcon.removeFromParent();
            this.node_testNavigateIcon = null;
        }
    }

    getNavigateGroupFlag() {
        return true;
    }

    showNavigateGroup(type, side, size, y) {
        if (this.isShow_NavigateGroup) {
            console.log("XminigameSDK", "已经调用过showNavigateGroup,请勿重复调用");
            return;
        }
        this.isShow_NavigateGroup = true;

        console.log("XminigameSDK", "Test showNavigateGroup==================");

        this.node_testNavigateGroup = new Node("node_testNavigateGroup");
        this.getSdkCanvas().addChild(this.node_testNavigateGroup);
        let node_testNavigateGroupX = view.getVisibleSize().width / 2;
        let node_testNavigateGroupY = view.getVisibleSize().height / 2;
        this.node_testNavigateGroup.setPosition(node_testNavigateGroupX, node_testNavigateGroupY);


        let testNavigateGroupRes =
            [
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateGroupIconBtn.png",
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateGroupLeftTuck.png",
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateGroupRightTuck.png",
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateGroupListLeft.png",
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateGroupListRight.png",
            ]

        LoadRes.loadResArray(testNavigateGroupRes, (err, texture) => {
            let TestNavigateGroupIconBtn = new Node("TestNavigateGroupIconBtn");
            this.node_testNavigateGroup.addChild(TestNavigateGroupIconBtn);
            TestNavigateGroupIconBtn.addComponent(SpriteComponent);
            let spriteFrameTestNavigateGroupIconBtn = new SpriteFrame();
            spriteFrameTestNavigateGroupIconBtn.texture = texture[0];
            TestNavigateGroupIconBtn.getComponent(SpriteComponent).spriteFrame = spriteFrameTestNavigateGroupIconBtn;
            let TestNavigateGroupIconBtnWidth = size;
            let TestNavigateGroupIconBtnHeight = size;

            TestNavigateGroupIconBtn.getComponent(UITransformComponent).setContentSize(TestNavigateGroupIconBtnWidth, TestNavigateGroupIconBtnHeight);

            let TestNavigateGroupIconBtnX = 0;
            let TestNavigateGroupIconBtnY = 0;
            // 如果参数side是left,默认互推列表icon在左侧中间
            if (side == "left") {
                // 互推列表icon在左侧中间
                TestNavigateGroupIconBtnX = TestNavigateGroupIconBtnWidth / 2 - view.getVisibleSize().width / 2;
                TestNavigateGroupIconBtnY = y;
            } else {
                // 互推列表icon在右侧中间
                TestNavigateGroupIconBtnX = view.getVisibleSize().width / 2 - TestNavigateGroupIconBtnWidth / 2;
                TestNavigateGroupIconBtnY = y;
            }
            TestNavigateGroupIconBtn.setPosition(TestNavigateGroupIconBtnX, TestNavigateGroupIconBtnY);


            let isOpenNavigateGroup = false;

            // 在左侧打开或在右侧打开互推列表
            let openNavigateGroup = (left: boolean) => {
                TestNavigateGroupIconBtn.active = false;
                if (left) {
                    console.log("XminigameSDK", "在左侧打开互推游戏列表");
                    // 互推游戏列表 左
                    let TestNavigateGroupListLeft = new Node("TestNavigateGroupListLeft");
                    this.node_testNavigateGroup.addChild(TestNavigateGroupListLeft);
                    TestNavigateGroupListLeft.addComponent(SpriteComponent);
                    let spriteFrameTestNavigateGroupListLeft = new SpriteFrame();
                    spriteFrameTestNavigateGroupListLeft.texture = texture[3];
                    TestNavigateGroupListLeft.getComponent(SpriteComponent).spriteFrame = spriteFrameTestNavigateGroupListLeft;
                    // 竖屏
                    let TestNavigateGroupListLeftHeight = view.getVisibleSize().height / 2;
                    let TestNavigateGroupListLeftWidth = TestNavigateGroupListLeftHeight / 4.8;

                    TestNavigateGroupListLeft.getComponent(UITransformComponent).setContentSize(TestNavigateGroupListLeftWidth, TestNavigateGroupListLeftHeight);
                    let TestNavigateGroupListLeftX = -TestNavigateGroupListLeftWidth / 2 - view.getVisibleSize().width / 2;
                    let TestNavigateGroupListLeftY = 0;
                    TestNavigateGroupListLeft.setPosition(TestNavigateGroupListLeftX, TestNavigateGroupListLeftY);

                    tween(TestNavigateGroupListLeft)
                        .by(0.2, { position: new Vec3(TestNavigateGroupListLeftWidth, 0, 0) })
                        .call(() => {
                            isOpenNavigateGroup = true;
                        })
                        .start();

                    // 左侧缩进按钮
                    let leftTuck = new Node("leftTuck");
                    TestNavigateGroupListLeft.addChild(leftTuck);
                    leftTuck.addComponent(SpriteComponent);
                    let spriteFrameLeftTuck = new SpriteFrame();
                    spriteFrameLeftTuck.texture = texture[1];
                    leftTuck.getComponent(SpriteComponent).spriteFrame = spriteFrameLeftTuck;
                    let leftTuckWidth = TestNavigateGroupListLeftWidth * 0.5;
                    let leftTuckHeight = leftTuckWidth * 1.2;

                    leftTuck.getComponent(UITransformComponent).setContentSize(leftTuckWidth, leftTuckHeight);
                    let leftTuckX = TestNavigateGroupListLeftWidth * 0.65;
                    let leftTuckY = TestNavigateGroupListLeftHeight * 0.3;
                    leftTuck.setPosition(leftTuckX, leftTuckY);

                    leftTuck.on(Node.EventType.TOUCH_END, () => {
                        if (!isOpenNavigateGroup) return;
                        tween(TestNavigateGroupListLeft)
                            .by(0.5, { position: new Vec3(-TestNavigateGroupListLeftWidth, 0, 0) })
                            .call(() => {
                                isOpenNavigateGroup = false;
                                TestNavigateGroupIconBtn.active = true;
                                TestNavigateGroupIconBtnWidth = size;
                                TestNavigateGroupIconBtnHeight = size;
                                TestNavigateGroupListLeft.destroy();
                            })
                            .start();
                    })

                } else {
                    console.log("XminigameSDK", "在右侧打开互推游戏列表");
                    // 互推游戏列表 右
                    let TestNavigateGroupListRight = new Node("TestNavigateGroupListRight");
                    this.node_testNavigateGroup.addChild(TestNavigateGroupListRight);
                    TestNavigateGroupListRight.addComponent(SpriteComponent);
                    let spriteFrameTestNavigateGroupListRight = new SpriteFrame();
                    spriteFrameTestNavigateGroupListRight.texture = texture[4];
                    TestNavigateGroupListRight.getComponent(SpriteComponent).spriteFrame = spriteFrameTestNavigateGroupListRight;
                    // 竖屏
                    let TestNavigateGroupListRightHeight = view.getVisibleSize().height / 2;
                    let TestNavigateGroupListRightWidth = TestNavigateGroupListRightHeight / 4.8;

                    TestNavigateGroupListRight.getComponent(UITransformComponent).setContentSize(TestNavigateGroupListRightWidth, TestNavigateGroupListRightHeight);
                    let TestNavigateGroupListRightX = TestNavigateGroupListRightWidth / 2 + view.getVisibleSize().width / 2;
                    let TestNavigateGroupListRightY = 0;
                    TestNavigateGroupListRight.setPosition(TestNavigateGroupListRightX, TestNavigateGroupListRightY);

                    tween(TestNavigateGroupListRight)
                        .by(0.2, { position: new Vec3(-TestNavigateGroupListRightWidth, 0, 0) })
                        .call(() => {
                            isOpenNavigateGroup = true;
                        })
                        .start();

                    // 右侧缩进按钮
                    let rightTuck = new Node();
                    TestNavigateGroupListRight.addChild(rightTuck);
                    rightTuck.addComponent(SpriteComponent);
                    let spriteFrameRightTuck = new SpriteFrame();
                    spriteFrameRightTuck.texture = texture[2];
                    rightTuck.getComponent(SpriteComponent).spriteFrame = spriteFrameRightTuck;
                    let rightTuckWidth = TestNavigateGroupListRightWidth * 0.5;
                    let rightTuckHeight = rightTuckWidth * 1.2;

                    rightTuck.getComponent(UITransformComponent).setContentSize(rightTuckWidth, rightTuckHeight);

                    let rightTuckX = -TestNavigateGroupListRightWidth * 0.65;
                    let rightTuckY = TestNavigateGroupListRightHeight * 0.3;
                    rightTuck.setPosition(rightTuckX, rightTuckY);

                    rightTuck.on(Node.EventType.TOUCH_END, () => {
                        if (!isOpenNavigateGroup) return;
                        tween(TestNavigateGroupListRight)
                            .by(0.5, { position: new Vec3(TestNavigateGroupListRightWidth, 0, 0) })
                            .call(() => {
                                isOpenNavigateGroup = false;
                                TestNavigateGroupIconBtn.active = true;
                                TestNavigateGroupIconBtnWidth = size;
                                TestNavigateGroupIconBtnHeight = size;
                                TestNavigateGroupListRight.destroy();
                            })
                            .start();
                    })
                }

                this.setChildrenNodeLayer(this.node_testNavigateGroup);
            }

            TestNavigateGroupIconBtn.on(Node.EventType.TOUCH_END, () => {
                if (TestNavigateGroupIconBtnX <= 0) {
                    openNavigateGroup(true);
                } else {
                    openNavigateGroup(false);
                }
            })


            this.setChildrenNodeLayer(this.node_testNavigateGroup);
        })
    }

    hideNavigateGroup() {
        this.isShow_NavigateGroup = false;
        if (this.node_testNavigateGroup) {
            console.log("XminigameSDK", "Test hideNavigateGroup==================");
            this.node_testNavigateGroup.removeFromParent();
            this.node_testNavigateGroup = null;
        }
    }

    getNavigateSettleFlag() {
        return true;
    }

    showNavigateSettle(type, x, y) {
        if (type != 1 && type != 2) {
            console.log("XminigameSDK", "结算互推只存在类型1和类型2 return");
            return;
        }

        if (this.isShow_NavigateSettle) {
            console.log("XminigameSDK", "已经调用过showNavigateSettle,请勿重复调用");
            return;
        }
        this.isShow_NavigateSettle = true;


        let testNavigateSettleRes =
            [
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateSettle1.png",
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateSettle4.png",
            ]

        if (type == 1 && (view.getVisibleSize().height / view.getVisibleSize().width) <= (16 / 9)) {
            console.log("XminigameSDK", "该游戏为横屏游戏或设备分辨率低于16/9 改为展示类型2");
            type = 2;
            y = 0;
        }

        console.log("XminigameSDK", "Test showNavigateSettle==================");

        LoadRes.loadResArray(testNavigateSettleRes, (err, texture) => {
            this.node_testNavigateSettle = new Node("node_testNavigateSettle");
            this.getSdkCanvas().addChild(this.node_testNavigateSettle);
            this.node_testNavigateSettle.addComponent(UITransformComponent);
            this.node_testNavigateSettle.getComponent(UITransformComponent).priority = 30000;

            switch (type) {
                case 1:
                    {
                        this.isShow_NavigateSettle1 = true;
                        this.hideBanner();

                        this.node_testNavigateSettle.addComponent(SpriteComponent);
                        let spriteFrameNode_testNavigateSettle = new SpriteFrame();
                        spriteFrameNode_testNavigateSettle.texture = texture[0];
                        this.node_testNavigateSettle.getComponent(SpriteComponent).spriteFrame = spriteFrameNode_testNavigateSettle;

                        let node_testNavigateSettleWidth = 0;
                        let node_testNavigateSettleHeight = 0;
                        if (view.getVisibleSize().width < view.getVisibleSize().height) {
                            node_testNavigateSettleWidth = view.getVisibleSize().width * 9 / 10;
                            node_testNavigateSettleHeight = node_testNavigateSettleWidth * 2 / 3;
                        } else {
                            node_testNavigateSettleWidth = view.getVisibleSize().height * 9 / 10;
                            node_testNavigateSettleHeight = node_testNavigateSettleWidth * 2 / 3;
                        }
                        this.node_testNavigateSettle.getComponent(UITransformComponent).setContentSize(node_testNavigateSettleWidth, node_testNavigateSettleHeight);

                        // 横坐标默认居中,纵坐标默认贴近底部
                        let node_testNavigateSettleX = view.getVisibleSize().width / 2;
                        let node_testNavigateSettleY = node_testNavigateSettleHeight / 2 + y;
                        this.node_testNavigateSettle.setPosition(node_testNavigateSettleX, node_testNavigateSettleY);
                    }
                    break;
                case 2:
                    {
                        this.node_testNavigateSettle.addComponent(SpriteComponent);
                        let spriteFrameNode_testNavigateSettle = new SpriteFrame();
                        spriteFrameNode_testNavigateSettle.texture = texture[1];
                        this.node_testNavigateSettle.getComponent(SpriteComponent).spriteFrame = spriteFrameNode_testNavigateSettle;

                        let node_testNavigateSettleWidth = 0;
                        let node_testNavigateSettleHeight = 0;
                        if (view.getVisibleSize().width < view.getVisibleSize().height) {
                            node_testNavigateSettleWidth = view.getVisibleSize().width;
                            node_testNavigateSettleHeight = node_testNavigateSettleWidth * 0.3;
                        } else {
                            node_testNavigateSettleWidth = view.getVisibleSize().width / 2;
                            node_testNavigateSettleHeight = node_testNavigateSettleWidth * 0.25;
                        }

                        this.node_testNavigateSettle.getComponent(UITransformComponent).setContentSize(node_testNavigateSettleWidth, node_testNavigateSettleHeight);

                        // 横坐标默认居中,纵坐标默认贴近底部
                        let node_testNavigateSettleX = view.getVisibleSize().width / 2;
                        let node_testNavigateSettleY = node_testNavigateSettleHeight / 2 + y;
                        this.node_testNavigateSettle.setPosition(node_testNavigateSettleX, node_testNavigateSettleY);
                    }
                    break;
                default:
                    break;
            }

            this.setChildrenNodeLayer(this.node_testNavigateSettle);
        })
    }

    hideNavigateSettle() {
        this.isShow_NavigateSettle = false;
        this.isShow_NavigateSettle1 = false;
        if (this.node_testNavigateSettle) {
            console.log("XminigameSDK", "Test hideNavigateSettle==================");
            this.node_testNavigateSettle.removeFromParent();
            this.node_testNavigateSettle = null;
        }
    }

    getNavigatePasterFlag() {
        return !this.isShow_NavigatePaster;
    }
    showNavigatePaster() {
        if (this.isShow_NavigatePaster) {
            console.log("XminigameSDK", "已经调用过showNavigatePaster,请勿重复调用");
            return;
        }
        this.isShow_NavigatePaster = true;

        console.log("XminigameSDK", "Test showNavigatePaster==================");

        let testNavigatePasterRes =
            [
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestBlackBg.png",
            ]

        LoadRes.loadResArray(testNavigatePasterRes, (err, texture) => {
            this.node_testNavigatePaster = new Node("node_testNavigatePaster");
            this.getSdkCanvas().addChild(this.node_testNavigatePaster);
            this.node_testNavigatePaster.addComponent(SpriteComponent);
            let node_testNavigatePasterSF = new SpriteFrame();
            node_testNavigatePasterSF.texture = texture[0];
            this.node_testNavigatePaster.getComponent(SpriteComponent).spriteFrame = node_testNavigatePasterSF;
            let node_testNavigatePasterWidth = 0;
            if (view.getVisibleSize().width < view.getVisibleSize().height) {
                node_testNavigatePasterWidth = view.getVisibleSize().width;
            } else {
                node_testNavigatePasterWidth = view.getVisibleSize().width / 2;
            }
            let node_testNavigatePasterHeight = node_testNavigatePasterWidth / 2;
            this.node_testNavigatePaster.getComponent(UITransformComponent).setContentSize(node_testNavigatePasterWidth, node_testNavigatePasterHeight);
            // 横坐标默认居中,纵坐标默认贴近底部
            let node_testNavigatePasterX = view.getVisibleSize().width / 2;
            let node_testNavigatePasterY = node_testNavigatePasterHeight / 2;
            this.node_testNavigatePaster.setPosition(node_testNavigatePasterX, node_testNavigatePasterY, 0);

            this.node_testNavigatePaster.getComponent(UITransformComponent).priority = 30000;
            this.node_testNavigatePaster.on(Node.EventType.TOUCH_START, (event) => {
                this.hideNavigatePaster();
            })

            let label = new Node("label");
            this.node_testNavigatePaster.addChild(label);
            label.addComponent(LabelComponent);
            label.getComponent(LabelComponent).string = "测试互推贴片,点击即可关闭";
            let labelWidth = node_testNavigatePasterWidth;
            let labelHeight = node_testNavigatePasterHeight;
            label.getComponent(UITransformComponent).setContentSize(labelWidth, labelHeight);
            let labelY = labelHeight / 2 - node_testNavigatePasterHeight / 2;
            label.setPosition(0, labelY, 0);

            this.setChildrenNodeLayer(this.node_testNavigatePaster);
        })
    }
    hideNavigatePaster() {
        this.isShow_NavigatePaster = false;
        if (this.node_testNavigatePaster) {
            console.log("XminigameSDK", "Test hideNavigatePaster==================");
            this.node_testNavigatePaster.removeFromParent();
            this.node_testNavigatePaster = null;
        }
    }
    reportNavigatePasterClick() {
        console.log("XminigameSDK", "Test reportNavigatePasterClick==================");
    }

    getNavigateInters() {
        return false;
    }
    showNavigateInters() {
    }

    shareApp() {
    }

    getNavigateBoxBannerFlag() {
        return true;
    }

    showNavigateBoxBanner() {
        if (this.isShow_NavigateBoxBanner) {
            console.log("XminigameSDK", "已经调用过showNavigateBoxBanner,请勿重复调用");
            return;
        }
        this.isShow_NavigateBoxBanner = true;

        this.hideBanner();

        console.log("XminigameSDK", "Test showNavigateBoxBanner==================");

        let testNavigateBoxBannerRes =
            [
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateBoxBanner.png",
            ]

        LoadRes.loadResArray(testNavigateBoxBannerRes, (err, texture) => {
            this.node_testNavigateBoxBanner = new Node("node_testNavigateBoxBanner");
            this.getSdkCanvas().addChild(this.node_testNavigateBoxBanner);
            this.node_testNavigateBoxBanner.addComponent(SpriteComponent);
            let spriteFrameNode_testNavigateBoxBanner = new SpriteFrame();
            spriteFrameNode_testNavigateBoxBanner.texture = texture[0];
            this.node_testNavigateBoxBanner.getComponent(SpriteComponent).spriteFrame = spriteFrameNode_testNavigateBoxBanner;

            let node_testNavigateBoxBannerWidth = 0;
            let node_testNavigateBoxBannerHeight = 0;
            if (view.getVisibleSize().width < view.getVisibleSize().height) {
                node_testNavigateBoxBannerWidth = view.getVisibleSize().width * 9 / 10;
                node_testNavigateBoxBannerHeight = node_testNavigateBoxBannerWidth / 3;
            } else {
                node_testNavigateBoxBannerWidth = view.getVisibleSize().height * 9 / 10;
                node_testNavigateBoxBannerHeight = node_testNavigateBoxBannerWidth / 3;
            }

            this.node_testNavigateBoxBanner.getComponent(UITransformComponent).setContentSize(node_testNavigateBoxBannerWidth, node_testNavigateBoxBannerHeight);

            // 横坐标默认居中,纵坐标默认贴近底部
            let node_testNavigateBoxBannerX = view.getVisibleSize().width / 2;
            let node_testNavigateBoxBannerY = node_testNavigateBoxBannerHeight / 2;
            this.node_testNavigateBoxBanner.setPosition(node_testNavigateBoxBannerX, node_testNavigateBoxBannerY);
            this.node_testNavigateBoxBanner.getComponent(UITransformComponent).priority = 29999;

            this.setChildrenNodeLayer(this.node_testNavigateBoxBanner);
        })
    }

    hideNavigateBoxBanner() {
        this.isShow_NavigateBoxBanner = false;
        if (this.node_testNavigateBoxBanner) {
            console.log("XminigameSDK", "Test hideNavigateBoxBanner==================");
            this.node_testNavigateBoxBanner.removeFromParent();
            this.node_testNavigateBoxBanner = null;
        }
    }

    getNavigateBoxPortalFlag() {
        return true;
    }

    hideNavigateBoxPortal() {
    }
    showNavigateBoxPortal(imageUrl?, marginTop?) {
        if (this.isShow_NavigateBoxPortal) {
            console.log("XminigameSDK", "已经调用过showNavigateBoxPortal,请勿重复调用");
            return;
        }
        this.isShow_NavigateBoxPortal = true;

        let tempHasShowBanner = this.hasShowBanner;
        this.hideBanner();

        console.log("XminigameSDK", "Test showNavigateBoxPortal==================");

        let testNavigateBoxPortalRes =
            [
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestBlackBg.png",
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateBoxPortal.png",
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateBoxPortalClose.png",
            ]

        LoadRes.loadResArray(testNavigateBoxPortalRes, (err, texture) => {
            // 背景
            this.node_testNavigateBoxPortal = new Node("TestBlackBg");
            this.getSdkCanvas().addChild(this.node_testNavigateBoxPortal);
            this.node_testNavigateBoxPortal.addComponent(SpriteComponent);
            let spriteFrameNode_testNavigateBoxPortal = new SpriteFrame();
            spriteFrameNode_testNavigateBoxPortal.texture = texture[0];
            this.node_testNavigateBoxPortal.getComponent(SpriteComponent).spriteFrame = spriteFrameNode_testNavigateBoxPortal;
            let node_testNavigateBoxPortalWidth = view.getVisibleSize().width;
            let node_testNavigateBoxPortalHeight = view.getVisibleSize().height;

            this.node_testNavigateBoxPortal.getComponent(UITransformComponent).setContentSize(node_testNavigateBoxPortalWidth, node_testNavigateBoxPortalHeight);
            this.node_testNavigateBoxPortal.getComponent(UITransformComponent).priority = 30000;

            this.node_testNavigateBoxPortal.setPosition(node_testNavigateBoxPortalWidth / 2, node_testNavigateBoxPortalHeight / 2);

            // 九宫格
            let testNavigateBoxPortal = new Node("testNavigateBoxPortal");
            this.node_testNavigateBoxPortal.addChild(testNavigateBoxPortal);
            testNavigateBoxPortal.addComponent(SpriteComponent);
            let spriteFrameTestNavigateBoxPortal = new SpriteFrame();
            spriteFrameTestNavigateBoxPortal.texture = texture[1];
            testNavigateBoxPortal.getComponent(SpriteComponent).spriteFrame = spriteFrameTestNavigateBoxPortal;
            // let testNavigateBoxPortalWidth = 520;
            // let testNavigateBoxPortalHeight = 628;
            let testNavigateBoxPortalWidth = view.getVisibleSize().width * 0.8;
            let testNavigateBoxPortalHeight = testNavigateBoxPortalWidth * (628 / 520);

            testNavigateBoxPortal.getComponent(UITransformComponent).setContentSize(testNavigateBoxPortalWidth, testNavigateBoxPortalHeight);


            // 关闭按钮
            let TestNavigateBoxPortalClose = new Node("TestNavigateBoxPortalClose");
            testNavigateBoxPortal.addChild(TestNavigateBoxPortalClose);
            TestNavigateBoxPortalClose.addComponent(SpriteComponent);
            let spriteFrameTestNavigateBoxPortalClose = new SpriteFrame();
            spriteFrameTestNavigateBoxPortalClose.texture = texture[2];
            TestNavigateBoxPortalClose.getComponent(SpriteComponent).spriteFrame = spriteFrameTestNavigateBoxPortalClose;
            let TestNavigateBoxPortalCloseWidth = testNavigateBoxPortalWidth / 8;
            let TestNavigateBoxPortalCloseHeight = TestNavigateBoxPortalCloseWidth;

            TestNavigateBoxPortalClose.getComponent(UITransformComponent).setContentSize(TestNavigateBoxPortalCloseWidth, TestNavigateBoxPortalCloseHeight);
            let TestNavigateBoxPortalCloseX = testNavigateBoxPortalWidth / 2 - TestNavigateBoxPortalCloseWidth / 2;
            let TestNavigateBoxPortalCloseY = testNavigateBoxPortalHeight * 13 / 32 - TestNavigateBoxPortalCloseHeight / 2;
            TestNavigateBoxPortalClose.setPosition(TestNavigateBoxPortalCloseX, TestNavigateBoxPortalCloseY);

            TestNavigateBoxPortalClose.on(Node.EventType.TOUCH_START, (event) => {
                this.isShow_NavigateBoxPortal = false;
                if (this.node_testNavigateBoxPortal) {
                    this.node_testNavigateBoxPortal.removeFromParent();
                    this.node_testNavigateBoxPortal = null;
                }
                if (tempHasShowBanner) {
                    this.showBanner();
                }
            });

            this.setChildrenNodeLayer(this.node_testNavigateBoxPortal);
        })

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
        callback(true);
    }

    phoneVibrate(type) {
    }

    startGameVideo(duration) {
        console.log("XminigameSDK", "Test startGameVideo==================", duration);
    }
    pauseGameVideo() {
        console.log("XminigameSDK", "Test pauseGameVideo==================");
    }
    resumeGameVideo() {
        console.log("XminigameSDK", "Test resumeGameVideo==================");
    }
    stopGameVideo(callback) {
        console.log("XminigameSDK", "Test stopGameVideo==================");
        callback("0");
    }
    shareVideo(title, desc, topics, videoPath, callback) {
        console.log("XminigameSDK", "Test shareVideo==================");
        callback(true);
    }
    shareAppById(templateId) {
    }

    jumpToMoreGamesCenter() {
        console.log("XminigameSDK", "Test jumpToMoreGamesCenter==================");
    }

    showMoreGamesBanner() {
        if (this.isShow_MoreGamesBanner) {
            console.log("XminigameSDK", "已经调用过showMoreGamesBanner,请勿重复调用");
            return;
        }
        this.isShow_MoreGamesBanner = true;

        this.hideBanner();

        console.log("XminigameSDK", "Test showMoreGamesBanner==================");

        let testMoreGamesBannerRes =
            [
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestMoreGamesBanner.png",
            ]

        LoadRes.loadResArray(testMoreGamesBannerRes, (err, texture) => {
            this.node_testMoreGamesBanner = new Node("node_testMoreGamesBanner");
            this.getSdkCanvas().addChild(this.node_testMoreGamesBanner);
            this.node_testMoreGamesBanner.addComponent(SpriteComponent);
            let spriteFrameNode_testMoreGamesBanner = new SpriteFrame();
            spriteFrameNode_testMoreGamesBanner.texture = texture[0];
            this.node_testMoreGamesBanner.getComponent(SpriteComponent).spriteFrame = spriteFrameNode_testMoreGamesBanner;
            let node_testMoreGamesBannerWidth = 900;
            let node_testMoreGamesBannerHeight = 312;

            this.node_testMoreGamesBanner.getComponent(UITransformComponent).setContentSize(node_testMoreGamesBannerWidth, node_testMoreGamesBannerHeight);
            this.node_testMoreGamesBanner.getComponent(UITransformComponent).priority = 30000;

            this.node_testMoreGamesBanner.setPosition(view.getVisibleSize().width / 2, node_testMoreGamesBannerHeight / 2);

            this.setChildrenNodeLayer(this.node_testMoreGamesBanner);
        })
    }

    hideMoreGamesBanner() {
        this.isShow_MoreGamesBanner = false;
        if (this.node_testMoreGamesBanner) {
            console.log("XminigameSDK", "Test hideMoreGamesBanner==================");
            this.node_testMoreGamesBanner.removeFromParent();
            this.node_testMoreGamesBanner = null;
        }
    }

    showFavoriteGuide(type, content, position) {
        console.log("XminigameSDK", "Test showFavoriteGuide==================");
        console.log("XminigameSDK", "Test 没有测试收藏引导");
    }

    getUserData(callback) {
        console.log("XminigameSDK", "Test getUserData==================");
        let userData = {
            userId: "testUserId",
            token: "testToken",
            userType: 1,//用户类型
        }
        callback(userData);
    }

    getUserInfo(callback) {
        console.log("XminigameSDK", "Test getUserInfo==================");
        let userInfo = {
            head: "",
            name: "",
            sex: "",
            city: "",
            province: "",
            country: "",
            power: true //已授权用户
        }
        callback(userInfo);
    }

    getBoxFlag() {
        return false;
    }
    showAppBox() {
        console.log("XminigameSDK", "Test showAppBox==================");
        console.log("XminigameSDK", "Test 没有测试盒子广告");
    }

    getBlockFlag() {
        return true;
    }

    showBlock(type, x, y, blockSize) {
        if (this.isShow_Block) {
            console.log("XminigameSDK", "已经调用过showBlock,请勿重复调用");
            return;
        }
        this.isShow_Block = true;

        console.log("XminigameSDK", "Test showBlock==================");

        let testBlockRes =
            [
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestBlockIcon.png",
            ]
        LoadRes.loadResArray(testBlockRes, (err, texture) => {
            this.node_testBlock = new Node("node_testBlock");
            this.getSdkCanvas().addChild(this.node_testBlock);
            this.node_testBlock.addComponent(SpriteComponent);
            let spriteFrameNode_testBlock = new SpriteFrame();
            spriteFrameNode_testBlock.texture = texture[0];
            this.node_testBlock.getComponent(SpriteComponent).spriteFrame = spriteFrameNode_testBlock;
            let node_testBlockWidth = 200;
            let node_testBlockHeight = 200;
            this.node_testBlock.getComponent(UITransformComponent).setContentSize(node_testBlockWidth, node_testBlockHeight);
            let node_testBlockX = view.getVisibleSize().width * x + node_testBlockWidth / 2;
            let node_testBlockY = view.getVisibleSize().height * (1 - y) - node_testBlockHeight / 2;
            this.node_testBlock.setPosition(node_testBlockX, node_testBlockY);
            this.node_testBlock.getComponent(UITransformComponent).priority = 29999;

            this.setChildrenNodeLayer(this.node_testBlock);
        })
    }

    hideBlock() {
        this.isShow_Block = false;
        if (this.node_testBlock) {
            console.log("XminigameSDK", "Test hideBlock==================");
            this.node_testBlock.removeFromParent();
            this.node_testBlock = null;
        }
    }

    exitTheGame() {
        console.log("XminigameSDK", "Test exitTheGame==================");
    }

    reportAnalytics(params, data) {
        console.log("XminigameSDK", "Test reportAnalytics==================");
    }

    showAuthentication(callback) {
        console.log("XminigameSDK", "Test showAuthentication==================");
    }

    visitorExperience(callback) {
        console.log("XminigameSDK", "Test visitorExperience==================");
    }

    showNativeAd(width, height, viewX, viewY) {
        console.log("XminigameSDK", "Test showNativeAd==================");
    }

    getOPPOShowMoreGameFlag() {
        return true;
    }
    showOPPOMoreGame() {
        console.log("XminigameSDK", "Test showOPPOMoreGame==================");
    }

    openProtocol() {
        console.log("XminigameSDK", "Test openProtocol==================");
        QQPrivacyAgreement.getInstance().load();
        QQPrivacyAgreement.getInstance().open();
    }

    openServiceAgreement() {
        console.log("XminigameSDK", "QQ openServiceAgreement==================");
        QQPrivacyAgreement.getInstance().load();
        QQPrivacyAgreement.getInstance().openServiceAgreement();
    }

    hasNetwork(callback) {
        console.log("XminigameSDK", "Test hasNetwork==================");
        callback(true);
    }

    showReviewAlert() {
        console.log("XminigameSDK", "Test showReviewAlert==================");
    }

    showiOSADWithScene(key, type) {
        console.log("XminigameSDK", "Test showiOSADWithScene==================");
    }

    showiOSADWithType(key, type) {
        console.log("XminigameSDK", "Test showiOSADWithType==================");
    }

    videoUIShow(key) {
        console.log("XminigameSDK", "Test videoUIShow==================");
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

        console.log("XminigameSDK", "Test showPrivacyAgreement==================");

        QQPrivacyAgreement.getInstance().load();
        QQPrivacyAgreement.getInstance().show(callback);
    }


    buyProps(money, propId, propName, callback) {
        callback(true, "testOrderId");
    }

    payComplete(orderId) {
        console.log("XminigameSDK", "Test payComplete==================", orderId);
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
     * 隐藏隐私协议
     */
    hidePrivacyAgreement() {
        this.isShow_PrivacyAgreement = false;
        if (this.node_testPrivacyAgreement) {
            console.log("XminigameSDK", "Test hidePrivacyAgreement==================");
            this.node_testPrivacyAgreement.removeFromParent();
            this.node_testPrivacyAgreement = null;
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

}
