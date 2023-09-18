import { BlockInputEventsComponent, CanvasComponent, director, find, game, MaskComponent, Node, ScrollViewComponent, SpriteComponent, SpriteFrame, UIOpacityComponent, UITransformComponent, Vec3, view, WidgetComponent } from "cc";
import GetConfig from "../utils/GetConfig";
import LoadRes from "../utils/LoadRes";
import LocalStorage from "../utils/LocalStorage";

export default class QQPrivacyAgreement {
    private static instance: QQPrivacyAgreement;

    /**
     * QQPrivacyAgreement 单例
     */
    public static getInstance(): QQPrivacyAgreement {
        if (!QQPrivacyAgreement.instance) {
            QQPrivacyAgreement.instance = new QQPrivacyAgreement();
        }
        return QQPrivacyAgreement.instance;
    }

    // 是否加载完成
    private isLoad = false;

    // 隐私协议资源
    private privacyAgreementRes = [];

    // 隐私协议总根节点
    private node_PrivacyAgreement: Node;

    // 是否竖屏
    private isPort = true;

    // 分组
    private adGroup = -1;

    showflag: boolean = false;

    /**
     * SDK画布节点
     */
    sdkCanvas = null;
    /**
     * 获取SDK画布
     */
    public getSdkCanvas() {
        let scene = director.getScene();
        if (find("sdkCanvas") == null) {
            this.sdkCanvas = new Node("sdkCanvas");
            this.sdkCanvas.addComponent(CanvasComponent);
            scene.addChild(this.sdkCanvas);
        }
        this.sdkCanvas = find("sdkCanvas");
        return this.sdkCanvas;
    }

    load() {
        console.log("XminigameSDK", "QQPrivacyAgreement load");

        if (this.isLoad) {
            return;
        }

        if (view.getVisibleSize().width < view.getVisibleSize().height) {
            this.isPort = true;
        } else {
            this.isPort = false;
        }

        let privacyAgreementResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/black.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/doubleBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/btn.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/agree.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/refuse.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/textBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/border.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/text.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/title.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/sure.png",

            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/textYX.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/textMQ.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/textXYY.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/textXMY.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/textQYW.png",

            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/serviceBtn.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/textService.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/titleService.png",

            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement2/textMML.png",
        ]

        LoadRes.loadResArray(privacyAgreementResArr, (err, texture) => {
            if (!err) {
                this.privacyAgreementRes = texture;
                this.isLoad = true;
            }
        })
    }

    show(callback) {
        if (!this.isLoad) {
            setTimeout(() => {
                this.show(callback);
            }, 100);
            return;
        }

        console.log("XminigameSDK", "QQPrivacyAgreement show");

        this.node_PrivacyAgreement = new Node("node_PrivacyAgreement");
        this.getSdkCanvas().addChild(this.node_PrivacyAgreement);
        let node_PrivacyAgreementX = view.getVisibleSize().width / 2;
        let node_PrivacyAgreementY = view.getVisibleSize().height / 2;
        this.node_PrivacyAgreement.setPosition(node_PrivacyAgreementX, node_PrivacyAgreementY);
        let scaleNum = this.isPort ? view.getDesignResolutionSize().width / 1080 : view.getDesignResolutionSize().height / 1080;
        this.node_PrivacyAgreement.addComponent(UITransformComponent);
        this.node_PrivacyAgreement.setScale(new Vec3(scaleNum, scaleNum, 1));
        this.node_PrivacyAgreement.getComponent(UITransformComponent).priority = 30000;

        // 黑色背景
        let black = new Node("black");
        this.node_PrivacyAgreement.addChild(black);
        black.addComponent(SpriteComponent);
        let sfBlack = new SpriteFrame();
        sfBlack.texture = this.privacyAgreementRes[0];
        black.getComponent(SpriteComponent).spriteFrame = sfBlack;
        let blackWidth = view.getVisibleSize().width * 2;
        let blackHeight = view.getVisibleSize().height * 2;
        black.getComponent(UITransformComponent).setContentSize(blackWidth, blackHeight);
        black.addComponent(UIOpacityComponent).opacity = 150;
        black.addComponent(BlockInputEventsComponent);

        // 背景
        let bg = new Node("bg");
        this.node_PrivacyAgreement.addChild(bg);
        bg.addComponent(SpriteComponent);
        let sfBg = new SpriteFrame();
        sfBg.texture = this.privacyAgreementRes[1];
        bg.getComponent(SpriteComponent).spriteFrame = sfBg;

        // 隐私协议按钮
        let btn = new Node("btn");
        bg.addChild(btn);
        btn.addComponent(SpriteComponent);
        let sfBtn = new SpriteFrame();
        sfBtn.texture = this.privacyAgreementRes[2];
        btn.getComponent(SpriteComponent).spriteFrame = sfBtn;
        btn.addComponent(WidgetComponent);
        btn.getComponent(WidgetComponent).isAlignRight = true;
        btn.getComponent(WidgetComponent).right = 150;
        btn.getComponent(WidgetComponent).isAlignBottom = true;
        btn.getComponent(WidgetComponent).bottom = 190;

        // 服务协议按钮
        let serviceBtn = new Node("serviceBtn");
        bg.addChild(serviceBtn);
        serviceBtn.addComponent(SpriteComponent);
        let sfSBtn = new SpriteFrame();
        sfSBtn.texture = this.privacyAgreementRes[15];
        serviceBtn.getComponent(SpriteComponent).spriteFrame = sfSBtn;
        serviceBtn.addComponent(WidgetComponent);
        serviceBtn.getComponent(WidgetComponent).isAlignRight = true;
        serviceBtn.getComponent(WidgetComponent).right = 150;
        serviceBtn.getComponent(WidgetComponent).isAlignBottom = true;
        serviceBtn.getComponent(WidgetComponent).bottom = 135;

        // 同意按钮
        let agree = new Node("agree");
        bg.addChild(agree);
        agree.addComponent(SpriteComponent);
        let sfAgree = new SpriteFrame();
        sfAgree.texture = this.privacyAgreementRes[3];
        agree.getComponent(SpriteComponent).spriteFrame = sfAgree;
        agree.addComponent(WidgetComponent);
        agree.getComponent(WidgetComponent).isAlignRight = true;
        agree.getComponent(WidgetComponent).right = 80;
        agree.getComponent(WidgetComponent).isAlignBottom = true;
        agree.getComponent(WidgetComponent).bottom = 25;

        // 拒绝按钮
        let refuse = new Node("refuse");
        bg.addChild(refuse);
        refuse.addComponent(SpriteComponent);
        let sfRefuse = new SpriteFrame();
        sfRefuse.texture = this.privacyAgreementRes[4];
        refuse.getComponent(SpriteComponent).spriteFrame = sfRefuse;
        refuse.addComponent(WidgetComponent);
        refuse.getComponent(WidgetComponent).isAlignLeft = true;
        refuse.getComponent(WidgetComponent).left = 80;
        refuse.getComponent(WidgetComponent).isAlignBottom = true;
        refuse.getComponent(WidgetComponent).bottom = 25;

        this.setChildrenNodeLayer(this.node_PrivacyAgreement);

        // 监听用户点击隐私协议
        btn.on(Node.EventType.TOUCH_END, () => {
            console.log("XminigameSDK", "点击隐私协议");
            this.open();
        })

        // 监听用户点击服务协议
        serviceBtn.on(Node.EventType.TOUCH_END, () => {
            console.log("XminigameSDK", "点击服务协议");
            this.openServiceAgreement();
        })

        // 监听用户点击同意
        agree.on(Node.EventType.TOUCH_END, () => {
            console.log("XminigameSDK", "同意隐私协议");
            this.destroy();
            LocalStorage.setData("agreePrivacy", "true");
            callback(true);
        })

        // 监听用户点击关闭
        refuse.on(Node.EventType.TOUCH_END, () => {
            console.log("XminigameSDK", "拒绝隐私协议");
            this.destroy();
            this.exit();
            callback(false);
        })
        this.showflag = true;
    }

    open() {
        console.log("XminigameSDK", "QQPrivacyAgreement open");

        if (!this.isLoad) {
            setTimeout(() => {
                this.open();
            }, 100);
            return;
        }

        if (find("sdkCanvas/node_PrivacyAgreement/view")) {
            console.log("XminigameSDK", "view has exist.open");
            find("sdkCanvas/node_PrivacyAgreement/view").active = true;
            return;
        }

        if (!find("sdkCanvas/node_PrivacyAgreement")) {
            this.node_PrivacyAgreement = new Node("node_PrivacyAgreement");
            this.getSdkCanvas().addChild(this.node_PrivacyAgreement);
            // find("sdkCanvas").addChild(this.node_PrivacyAgreement);
            let node_PrivacyAgreementX = view.getVisibleSize().width / 2;
            let node_PrivacyAgreementY = view.getVisibleSize().height / 2;
            this.node_PrivacyAgreement.setPosition(node_PrivacyAgreementX, node_PrivacyAgreementY);
            let scaleNum = this.isPort ? view.getDesignResolutionSize().width / 1080 : view.getDesignResolutionSize().height / 1080;
            this.node_PrivacyAgreement.addComponent(UITransformComponent);
            this.node_PrivacyAgreement.setScale(new Vec3(scaleNum, scaleNum, 1));
            this.node_PrivacyAgreement.getComponent(UITransformComponent).priority = 30000;

            // 黑色背景
            let black = new Node("black");
            this.node_PrivacyAgreement.addChild(black);
            black.addComponent(SpriteComponent);
            let sfBlack = new SpriteFrame();
            sfBlack.texture = this.privacyAgreementRes[0];
            black.getComponent(SpriteComponent).spriteFrame = sfBlack;
            let blackWidth = view.getVisibleSize().width * 2;
            let blackHeight = view.getVisibleSize().height * 2;
            black.getComponent(UITransformComponent).setContentSize(blackWidth, blackHeight);
            black.addComponent(UIOpacityComponent).opacity = 150;
            black.addComponent(BlockInputEventsComponent);
        }


        // 隐私协议展开页面视图节点
        let view2 = new Node("view");
        this.node_PrivacyAgreement.addChild(view2);

        // 文字背景
        let textBg = new Node("textBg");
        view2.addChild(textBg);
        textBg.addComponent(SpriteComponent);
        let sfTextBg = new SpriteFrame();
        sfTextBg.texture = this.privacyAgreementRes[5];
        textBg.getComponent(SpriteComponent).spriteFrame = sfTextBg;
        textBg.addComponent(ScrollViewComponent);
        textBg.getComponent(ScrollViewComponent).vertical = true;
        textBg.getComponent(ScrollViewComponent).horizontal = false;
        textBg.getComponent(ScrollViewComponent).inertia = false;
        textBg.getComponent(ScrollViewComponent).elastic = false;
        textBg.getComponent(ScrollViewComponent).cancelInnerEvents = true;
        let textBgWidth = 0;
        let textBgHeight = 0;
        if (this.isPort) {
            textBgWidth = 800;
            textBgHeight = 1200;
        } else {
            textBgWidth = 700;
            textBgHeight = 700;
        }
        textBg.getComponent(UITransformComponent).setContentSize(textBgWidth, textBgHeight);

        // 滚动视图
        let scrollView = new Node("scrollView");
        textBg.addChild(scrollView);
        scrollView.addComponent(MaskComponent);
        scrollView.getComponent(MaskComponent).type = MaskComponent.Type.RECT;
        let scrollViewWidth = 0;
        let scrollViewHeight = 0;
        let scrollViewY = 0;
        if (this.isPort) {
            scrollViewWidth = 700;
            scrollViewHeight = 900;
            scrollViewY = 60;
        } else {
            scrollViewWidth = 650;
            scrollViewHeight = 600;
        }
        scrollView.getComponent(UITransformComponent).setContentSize(scrollViewWidth, scrollViewHeight);
        scrollView.setPosition(0, scrollViewY);

        // 文字边框
        let border = new Node("border");
        scrollView.addChild(border);
        border.addComponent(SpriteComponent);
        let sfBorder = new SpriteFrame();
        sfBorder.texture = this.privacyAgreementRes[6];
        border.getComponent(SpriteComponent).spriteFrame = sfBorder;
        let borderWidth = 0;
        let borderHeight = 0;
        if (this.isPort) {
            borderWidth = 700;
            borderHeight = 900;
        } else {
            borderWidth = 650;
            borderHeight = 600;
        }
        border.getComponent(UITransformComponent).setContentSize(borderWidth, borderHeight);

        // 可移动区域
        let move = new Node("move");
        border.addChild(move);
        let moveWidth = 0;
        let moveHeight = 0;
        let moveY = 0;
        if (this.isPort) {
            moveWidth = 700;
            moveHeight = 1426;
            moveY = -260;
        } else {
            moveWidth = 650;
            moveHeight = 1426;
            moveY = -400;
        }
        move.addComponent(UITransformComponent).setContentSize(moveWidth, moveHeight);
        move.setPosition(0, moveY);

        // 文字内容
        let text = new Node("text");
        move.addChild(text);
        text.addComponent(SpriteComponent);
        let res = LocalStorage.getData("privacyAgreementCompany");
        let sf = this.privacyAgreementRes[7];
        switch (res) {
            case "yx":
                sf = this.privacyAgreementRes[10];
                break;
            case "mq":
                sf = this.privacyAgreementRes[11];
                break;
            case "xyy":
                sf = this.privacyAgreementRes[12];
                break;
            case "xmy":
                sf = this.privacyAgreementRes[13];
                break;
            case "qyw":
                sf = this.privacyAgreementRes[14];
                break;
            case "mml":
                sf = this.privacyAgreementRes[18];
                break;
            default:
                sf = this.privacyAgreementRes[7];
                break;
        }
        let sfText = new SpriteFrame();
        sfText.texture = sf;
        text.getComponent(SpriteComponent).spriteFrame = sfText;
        let textWidth = 0;
        let textHeight = 0;
        if (this.isPort) {
            textWidth = 700;
            textHeight = 1426;
        } else {
            textWidth = 650;
            textHeight = 1426;
        }
        text.getComponent(UITransformComponent).setContentSize(textWidth, textHeight);

        // 绑定移动节点
        textBg.getComponent(ScrollViewComponent).content = move;

        // 标题
        let title = new Node("title");
        textBg.addChild(title);
        title.addComponent(SpriteComponent);
        let sfTitle = new SpriteFrame();
        sfTitle.texture = this.privacyAgreementRes[8];
        title.getComponent(SpriteComponent).spriteFrame = sfTitle;
        let titleWidth = 350;
        let titleHeight = 100;
        let titleY = 0;
        if (this.isPort) {
            titleY = 600;
        } else {
            titleY = 360;
        }
        title.getComponent(UITransformComponent).setContentSize(titleWidth, titleHeight);
        title.setPosition(0, titleY);

        // 确定
        let sure = new Node("sure");
        textBg.addChild(sure);
        sure.addComponent(SpriteComponent);
        let sfSure = new SpriteFrame();
        sfSure.texture = this.privacyAgreementRes[9];
        sure.getComponent(SpriteComponent).spriteFrame = sfSure;
        let sureWidth = 300;
        let sureHeight = 100;
        let sureY = 100;
        if (this.isPort) {
            sureY = -490;
        } else {
            sureY = -360;
        }
        sure.getComponent(UITransformComponent).setContentSize(sureWidth, sureHeight);
        sure.setPosition(0, sureY);


        this.setChildrenNodeLayer(this.node_PrivacyAgreement);

        // 监听用户点击确定
        sure.on(Node.EventType.TOUCH_END, () => {
            console.log("XminigameSDK", "点击确定");
            this.hide();
        })
    }

    openServiceAgreement() {
        console.log("XminigameSDK", "QQPrivacyAgreement openServiceAgreement");

        if (!this.isLoad) {
            setTimeout(() => {
                this.openServiceAgreement();
            }, 100);
            return;
        }

        if (find("sdkCanvas/node_PrivacyAgreement/serviceView")) {
            console.log("XminigameSDK", "view has exist.open");
            find("sdkCanvas/node_PrivacyAgreement/serviceView").active = true;
            return;
        }

        if (!find("sdkCanvas/node_PrivacyAgreement")) {
            this.node_PrivacyAgreement = new Node("node_PrivacyAgreement");
            this.getSdkCanvas().addChild(this.node_PrivacyAgreement);
            // find("sdkCanvas").addChild(this.node_PrivacyAgreement);
            let node_PrivacyAgreementX = view.getVisibleSize().width / 2;
            let node_PrivacyAgreementY = view.getVisibleSize().height / 2;
            this.node_PrivacyAgreement.setPosition(node_PrivacyAgreementX, node_PrivacyAgreementY);
            let scaleNum = this.isPort ? view.getDesignResolutionSize().width / 1080 : view.getDesignResolutionSize().height / 1080;
            this.node_PrivacyAgreement.addComponent(UITransformComponent);
            this.node_PrivacyAgreement.setScale(new Vec3(scaleNum, scaleNum, 1));
            this.node_PrivacyAgreement.getComponent(UITransformComponent).priority = 30000;

            // 黑色背景
            let black = new Node("black");
            this.node_PrivacyAgreement.addChild(black);
            black.addComponent(SpriteComponent);
            let sfBlack = new SpriteFrame();
            sfBlack.texture = this.privacyAgreementRes[0];
            black.getComponent(SpriteComponent).spriteFrame = sfBlack;
            let blackWidth = view.getVisibleSize().width * 2;
            let blackHeight = view.getVisibleSize().height * 2;
            black.getComponent(UITransformComponent).setContentSize(blackWidth, blackHeight);
            black.addComponent(UIOpacityComponent).opacity = 150;
            black.addComponent(BlockInputEventsComponent);
        }


        // 隐私协议展开页面视图节点
        let view3 = new Node("serviceView");
        this.node_PrivacyAgreement.addChild(view3);

        // 文字背景
        let textBg = new Node("textBg");
        view3.addChild(textBg);
        textBg.addComponent(SpriteComponent);
        let sfTextBg = new SpriteFrame();
        sfTextBg.texture = this.privacyAgreementRes[5];
        textBg.getComponent(SpriteComponent).spriteFrame = sfTextBg;
        textBg.addComponent(ScrollViewComponent);
        textBg.getComponent(ScrollViewComponent).vertical = true;
        textBg.getComponent(ScrollViewComponent).horizontal = false;
        textBg.getComponent(ScrollViewComponent).inertia = false;
        textBg.getComponent(ScrollViewComponent).elastic = false;
        textBg.getComponent(ScrollViewComponent).cancelInnerEvents = true;
        let textBgWidth = 0;
        let textBgHeight = 0;
        if (this.isPort) {
            textBgWidth = 800;
            textBgHeight = 1200;
        } else {
            textBgWidth = 700;
            textBgHeight = 700;
        }
        textBg.getComponent(UITransformComponent).setContentSize(textBgWidth, textBgHeight);

        // 滚动视图
        let scrollView = new Node("scrollView");
        textBg.addChild(scrollView);
        scrollView.addComponent(MaskComponent);
        scrollView.getComponent(MaskComponent).type = MaskComponent.Type.RECT;
        let scrollViewWidth = 0;
        let scrollViewHeight = 0;
        let scrollViewY = 0;
        if (this.isPort) {
            scrollViewWidth = 700;
            scrollViewHeight = 900;
            scrollViewY = 60;
        } else {
            scrollViewWidth = 650;
            scrollViewHeight = 600;
        }
        scrollView.getComponent(UITransformComponent).setContentSize(scrollViewWidth, scrollViewHeight);
        scrollView.setPosition(0, scrollViewY);

        // 文字边框
        let border = new Node("border");
        scrollView.addChild(border);
        border.addComponent(SpriteComponent);
        let sfBorder = new SpriteFrame();
        sfBorder.texture = this.privacyAgreementRes[6];
        border.getComponent(SpriteComponent).spriteFrame = sfBorder;
        let borderWidth = 0;
        let borderHeight = 0;
        if (this.isPort) {
            borderWidth = 700;
            borderHeight = 900;
        } else {
            borderWidth = 650;
            borderHeight = 600;
        }
        border.getComponent(UITransformComponent).setContentSize(borderWidth, borderHeight);

        // 可移动区域
        let move = new Node("move");
        border.addChild(move);
        let moveWidth = 0;
        let moveHeight = 0;
        let moveY = 0;
        if (this.isPort) {
            moveWidth = 700;
            moveHeight = 2858;
            moveY = -1000;
        } else {
            moveWidth = 650;
            moveHeight = 2858;
            moveY = -1500;
        }
        move.addComponent(UITransformComponent).setContentSize(moveWidth, moveHeight);
        move.setPosition(0, moveY);

        // 文字内容
        let text = new Node("text");
        move.addChild(text);
        text.addComponent(SpriteComponent);
        // let res = LocalStorage.getData("privacyAgreementCompany");
        let sf = this.privacyAgreementRes[16];
        // switch (res) {
        //     case "yx":
        //         sf = this.privacyAgreementRes[10];
        //         break;
        //     case "mq":
        //         sf = this.privacyAgreementRes[11];
        //         break;
        //     case "xyy":
        //         sf = this.privacyAgreementRes[12];
        //         break;
        //     case "xmy":
        //         sf = this.privacyAgreementRes[13];
        //         break;
        //     case "qyw":
        //         sf = this.privacyAgreementRes[14];
        //         break;
        //     default:
        //         sf = this.privacyAgreementRes[7];
        //         break;
        // }
        let sfText = new SpriteFrame();
        sfText.texture = sf;
        text.getComponent(SpriteComponent).spriteFrame = sfText;
        let textWidth = 0;
        let textHeight = 0;
        if (this.isPort) {
            textWidth = 700;
            textHeight = 2858;
        } else {
            textWidth = 650;
            textHeight = 2858;
        }
        text.getComponent(UITransformComponent).setContentSize(textWidth, textHeight);

        // 绑定移动节点
        textBg.getComponent(ScrollViewComponent).content = move;

        // 标题
        let title = new Node("title");
        textBg.addChild(title);
        title.addComponent(SpriteComponent);
        let sfTitle = new SpriteFrame();
        sfTitle.texture = this.privacyAgreementRes[17];
        title.getComponent(SpriteComponent).spriteFrame = sfTitle;
        let titleWidth = 350;
        let titleHeight = 100;
        let titleY = 0;
        if (this.isPort) {
            titleY = 600;
        } else {
            titleY = 360;
        }
        title.getComponent(UITransformComponent).setContentSize(titleWidth, titleHeight);
        title.setPosition(0, titleY);

        // 确定
        let sure = new Node("sure");
        textBg.addChild(sure);
        sure.addComponent(SpriteComponent);
        let sfSure = new SpriteFrame();
        sfSure.texture = this.privacyAgreementRes[9];
        sure.getComponent(SpriteComponent).spriteFrame = sfSure;
        let sureWidth = 300;
        let sureHeight = 100;
        let sureY = 100;
        if (this.isPort) {
            sureY = -490;
        } else {
            sureY = -360;
        }
        sure.getComponent(UITransformComponent).setContentSize(sureWidth, sureHeight);
        sure.setPosition(0, sureY);


        this.setChildrenNodeLayer(this.node_PrivacyAgreement);

        // 监听用户点击确定
        sure.on(Node.EventType.TOUCH_END, () => {
            console.log("XminigameSDK", "点击确定");
            this.hideServiceAgreement();
        })
    }

    setGroup(group) {
        if (group != -1) this.adGroup = group;
    }

    // 点击确定隐藏
    hide() {
        console.log('node_PrivacyAgreement-hide', this.node_PrivacyAgreement)
        // this.node_PrivacyAgreement.active =false;
        // for(let i=0;i<this.node_PrivacyAgreement.children.length;i++){
        //     this.node_PrivacyAgreement.children[i].active = false;
        // }


        let activeBg = find("sdkCanvas/node_PrivacyAgreement/black");
        let activeView = find("sdkCanvas/node_PrivacyAgreement/view");
        if (activeBg) {
            console.log("XminigameSDK", "find QQPrivacyAgreement hide");
            if (activeView) activeView.active = false;
        }

        let getChildBg = this.node_PrivacyAgreement.getChildByName("black");
        let getChildView = this.node_PrivacyAgreement.getChildByName("view");

        if (getChildBg!.isValid && !this.showflag) {
            getChildBg!.active = false;
        }
        if (getChildView!.isValid) {
            getChildView!.active = false;
        }
        if (getChildBg) {
            console.log("XminigameSDK", "child QQPrivacyAgreement hide");
            if (getChildView) getChildView.active = false;
        }
    }

    // 点击确定隐藏
    hideServiceAgreement() {
        console.log('node_PrivacyAgreement-hideServiceAgreement', this.node_PrivacyAgreement);
        // this.node_PrivacyAgreement.active =false;
        // for(let i=0;i<this.node_PrivacyAgreement.children.length;i++){
        //     this.node_PrivacyAgreement.children[i].active = false;
        // }


        let activeBg = find("sdkCanvas/node_PrivacyAgreement/black");
        let activeView = find("sdkCanvas/node_PrivacyAgreement/serviceView");
        if (activeBg) {
            console.log("XminigameSDK", "find QQPrivacyAgreement hide");
            if (activeView) activeView.active = false;
        }

        let getChildBg = this.node_PrivacyAgreement.getChildByName("black");
        let getChildView = this.node_PrivacyAgreement.getChildByName("serviceView");

        if (getChildBg!.isValid && !this.showflag) {
            getChildBg!.active = false;
        }
        if (getChildView!.isValid) {
            getChildView!.active = false;
        }
        if (getChildBg) {
            console.log("XminigameSDK", "child QQPrivacyAgreement hide");
            if (getChildView) getChildView.active = false;
        }
    }

    destroy() {
        this.showflag = false;
        if (find("sdkCanvas/node_PrivacyAgreement")) {
            console.log("XminigameSDK", "find QQPrivacyAgreement destroy");
            find("sdkCanvas/node_PrivacyAgreement").removeFromParent();
        }

        if (this.node_PrivacyAgreement) {
            console.log("XminigameSDK", "QQPrivacyAgreement destroy");
            this.node_PrivacyAgreement.removeFromParent();
            this.node_PrivacyAgreement = null;
        }
    }

    exit() {
        console.log("XminigameSDK", "QQPrivacyAgreement exit");

        switch (GetConfig.getChannelName()) {
            case "tencentqq":
                qq.exitMiniProgram({});
                break;
            default:
                game.end();
                break;
        }
    }

    /**
     * 设置该节点本身和所有子节点的分组
     */
    setChildrenNodeLayer(node: Node) {
        if (this.adGroup == -1) return;
        node.layer = 1 << (this.adGroup);
        let children = node.children;
        for (let i = 0; i < children.length; ++i) {
            this.setChildrenNodeLayer(children[i])
        }
    }


}
