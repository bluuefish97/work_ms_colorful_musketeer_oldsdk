import AdCenter from "./ad/AdCenter";
import { sdkConfig } from "./SdkConfig";
import ServerCenter from "./server/ServerCenter";
import LocalStorage from "./utils/LocalStorage";

const TAG = "XminigameSDK";

/**
 * 接口调用类(详细的可在网站文档观看使用指南)
 * @author Vae
 * QQ&WX 903783021
 */
export default class ASCAd {
    private static instance: ASCAd;

    /**
     * 已经初始化广告？防止多次初始化操作
     */
    hasInit = false;

    /**
     * ASCAd 单例
     */
    public static getInstance(): ASCAd {
        if (!ASCAd.instance) {
            ASCAd.instance = new ASCAd();
        }
        return ASCAd.instance;
    }


    /**
     * ALL
     * 设置渠道ID
     * 必须要在调用该ASCAd类其他方法之前调用,否则会不生效！
     */
    setChannelId(channelId) {
        console.log(TAG, "setChannelId", channelId);
        sdkConfig.channelId = channelId;
    }


    /**
     * ALL(必接)
     * 初始化广告
     */
    initAd() {
        console.log(TAG, "initAd");
        if (!this.hasInit) ServerCenter.getInstance().initAd();
    }


    /**
     * Android
     * 获取渠道ID,根据返回值区分渠道
     * "1005" - 小米
     * "1007" - oppo
     * "1008" - vivo
     * "1012" - 华为
     * "1238" - 广告渠道
     */
    getChannelId() {
        let flag = AdCenter.getInstance().getChannelId();
        console.log(TAG, "getChannelId:" + flag)
        return flag;
    }


    /**
     * ALL
     * 展示横幅
     */
    showBanner(type?: Number) {
        console.log(TAG, "showBanner");
        AdCenter.getInstance().showBanner(type);
    }
    /**
     * ALL
     * 隐藏横幅
     */
    hideBanner() {
        console.log(TAG, "hideBanner");
        AdCenter.getInstance().hideBanner();
    }


    /**
     * ALL
     * 获取插屏是否可以展示标志
     */
    getIntersFlag(sceneName?) {
        let flag = AdCenter.getInstance().getIntersFlag(sceneName);
        console.log(TAG, "getIntersFlag:" + flag)
        return flag;
    }
    /**
     * ALL
     * 展示插屏
     */
    showInters(callback?, sceneName?) {
        console.log(TAG, "showInters");
        AdCenter.getInstance().showInters(callback, sceneName);
    }


    /**
     * ALL
     * 获取视频是否可以展示标志
     * 为false时需要提示 暂无视频广告
     */
    getVideoFlag() {
        let flag = AdCenter.getInstance().getVideoFlag();
        console.log(TAG, "getVideoFlag:" + flag)
        return flag;
    }
    /**
     * ALL
     * 展示视频
     * @param callback 视频播放回调
     * @param reason IOS渠道播放视频原因
     */
    showVideo(callback, reason?) {
        console.log(TAG, "showVideo");
        AdCenter.getInstance().showVideo(callback, reason);
    }


    /**
     * OPPO & VIVO & WX & Android
     * 获取原生ICON是否可以展示标志
     */
    getNativeIconFlag() {
        let flag = AdCenter.getInstance().getNativeIconFlag();
        console.log(TAG, "getNativeIconFlag:" + flag)
        return flag;
    }
    /**
     * OPPO & VIVO & WX & Android
     * 展示原生ICON
     * @param width ICON的宽(微信无法设置,可填任意值)
     * @param height ICON的高(微信无法设置,可填任意值)
     * @param x ICON的横坐标
     * @param y ICON的横坐标
     */
    showNativeIcon(width, height, x, y) {
        console.log(TAG, "showNativeIcon");
        AdCenter.getInstance().showNativeIcon(width, height, x, y);
    }
    /**
     * OPPO & VIVO & WX & Android
     * 隐藏原生ICON
     */
    hideNativeIcon() {
        console.log(TAG, "hideNativeIcon");
        AdCenter.getInstance().hideNativeIcon();
    }

    /**
     * OPPO & VIVO
     * 获取原生大图是否可以展示标志
     */
    getNativeImageFlag() {
        let flag = AdCenter.getInstance().getNativeImageFlag();
        console.log(TAG, "getNativeImageFlag:" + flag)
        return flag;
    }
    /**
     * OPPO & VIVO & Android
     * 展示原生大图
     * Android渠道其参数可任意
     * @param width 原生大图的宽 ps:建议宽：高 = 2:1 否则图片可能模糊
     * @param height 原生大图的高
     * @param x 原生大图的横坐标
     * @param y 原生大图的横坐标
     * @param hideCallback 用户隐藏原生大图广告后的回调
     */
    showNativeImage(width, height, x, y, type?: Number, hideCallback?: Function) {
        console.log(TAG, "showNativeImage");
        AdCenter.getInstance().showNativeImage(width, height, x, y, type, hideCallback);
    }
    /**
     * OPPO & VIVO & Android
     * 隐藏原生大图
     */
    hideNativeImage() {
        console.log(TAG, "hideNativeImage");
        AdCenter.getInstance().hideNativeImage();
    }

    /**
     * OPPO
     * 获取原生贴片是否可以展示标志
     */
    getNativePasterFlag() {
        let flag = AdCenter.getInstance().getNativePasterFlag();
        console.log(TAG, "getNativePasterFlag:" + flag)
        return flag;
    }
    /**
     * OPPO
     * 展示原生贴片
     */
    showNativePaster() {
        console.log(TAG, "showNativePaster");
        AdCenter.getInstance().showNativePaster();
    }

    /**
     * OPPO & VIVO
     * 自由获取原生广告信息
     * @param type 1-后台原生广告id拉取的原生广告 2-后台自定义原生广告id拉取的原生广告
     */
    getNativeAdInfo(type) {
        let info = AdCenter.getInstance().getNativeAdInfo(type);
        console.log(TAG, "getNativeAdInfo:" + JSON.stringify(info));
        return info;
    }
    /**
     * OPPO & VIVO
     * 上报原生广告展示
     * @param adId 获取的原生广告的adId
     */
    reportNativeAdShow(adId) {
        console.log(TAG, "reportNativeAdShow");
        AdCenter.getInstance().reportNativeAdShow(adId);
    }
    /**
     * OPPO & VIVO & Android
     * 上报原生广告点击
     * Android渠道其参数可任意
     * @param adId 获取的原生广告的adId
     */
    reportNativeAdClick(adId) {
        console.log(TAG, "reportNativeAdClick");
        AdCenter.getInstance().reportNativeAdClick(adId);
    }

    /**
     * Android & IOS & WX
     * 获取互推ICON是否可以展示标签
     */
    getNavigateIconFlag() {
        let flag = AdCenter.getInstance().getNavigateIconFlag();
        console.log(TAG, "getNavigateIconFlag:" + flag);
        return flag;
    }
    /**
     * Android & IOS & WX
     * 展示互推ICON
     * @param width ICON的宽
     * @param height ICON的高
     * @param x ICON的横坐标
     * @param y ICON的纵坐标
     */
    showNavigateIcon(width, height, x, y) {
        console.log(TAG, "showNavigateIcon");
        AdCenter.getInstance().showNavigateIcon(width, height, x, y);
    }
    /**
     * Android & IOS & WX
     * 隐藏互推ICON
     */
    hideNavigateIcon() {
        console.log(TAG, "hideNavigateIcon");
        AdCenter.getInstance().hideNavigateIcon();
    }

    /**
     * Android & IOS & WX
     * 获取互推列表是否可以展示标志
     */
    getNavigateGroupFlag() {
        let flag = AdCenter.getInstance().getNavigateGroupFlag();
        console.log(TAG, "getNavigateGroupFlag:" + flag);
        return flag;
    }
    /**
     * Android & IOS & WX
     * 展示互推列表(OPPO仅竖版可用)
     * @param type vertical-竖版 (不支持--horizontal-横版)
     * @param side left-左侧 right-右侧
     * @param size OPPO - 按钮大小
     * @param y OPPO - 按钮的纵坐标,默认0,处在屏幕左侧或者右侧中间
     */
    showNavigateGroup(type, side, size, y) {
        console.log(TAG, "showNavigateGroup");
        AdCenter.getInstance().showNavigateGroup(type, side, size, y);
    }
    /**
     * Android & IOS & WX
     * 隐藏互推列表
     */
    hideNavigateGroup() {
        console.log(TAG, "hideNavigateGroup");
        AdCenter.getInstance().hideNavigateGroup();
    }

    /**
     * Android & IOS & WX
     * 获取结算互推能否展示
     */
    getNavigateSettleFlag() {
        let flag = AdCenter.getInstance().getNavigateSettleFlag();
        console.log(TAG, "getNavigateSettleFlag:" + flag);
        return flag;
    }
    /**
     * Android & IOS & WX
     * 展示结算互推
     * @param type 1-大窗口类型,2-两边类型,3-横条类型,4-横幅类型
     * @param x 结算互推的横坐标
     * @param y 结算互推的纵坐标
     */
    showNavigateSettle(type, x, y) {
        console.log(TAG, "showNavigateSettle");
        AdCenter.getInstance().showNavigateSettle(type, x, y);
    }
    /**
     * Android & IOS & WX
     * 隐藏结算互推
     */
    hideNavigateSettle() {
        console.log(TAG, "hideNavigateSettle");
        AdCenter.getInstance().hideNavigateSettle();
    }

    /**
     * Android
     * 获取互推贴片能否展示
     */
    getNavigatePasterFlag() {
        let flag = AdCenter.getInstance().getNavigatePasterFlag();
        console.log(TAG, "getNavigatePasterFlag:" + flag);
        return flag;
    }
    /**
     * Android
     * 展示互推贴片
     */
    showNavigatePaster() {
        console.log(TAG, "showNavigatePaster");
        AdCenter.getInstance().showNavigatePaster();
    }
    /**
     * Android
     * 隐藏互推贴片
     */
    hideNavigatePaster() {
        console.log(TAG, "hideNavigatePaster");
        AdCenter.getInstance().hideNavigatePaster();
    }
    /**
     * 上报互推贴片点击
     */
    reportNavigatePasterClick() {
        console.log(TAG, "reportNavigatePasterClick");
        AdCenter.getInstance().reportNavigatePasterClick();
    }

    /**
     * WX
     * 获取互推插屏能否展示
     */
    getNavigateInters() {
        let flag = AdCenter.getInstance().getNavigateInters();
        console.log(TAG, "getNavigateInters:" + flag);
        return flag;
    }
    /**
     * WX
     * 展示互推插屏
     */
    showNavigateInters() {
        console.log(TAG, "showNavigateInters");
        AdCenter.getInstance().showNavigateInters();
    }

    /**
     * WX
     * 分享游戏给好友(在用户点击播放视频时弹出暂无视频并调用该接口)
     */
    shareApp() {
        console.log(TAG, "shareApp");
        AdCenter.getInstance().shareApp();
    }

    /**
     * OPPO & VIVO
     * 获取互推盒子横幅广告能否展示标志
     */
    getNavigateBoxBannerFlag() {
        let flag = AdCenter.getInstance().getNavigateBoxBannerFlag();
        console.log(TAG, "getNavigateBoxBannerFlag:" + flag);
        return flag;
    }
    /**
     * OPPO & VIVO
     * 展示互推盒子横幅广告
     */
    showNavigateBoxBanner() {
        console.log(TAG, "showNavigateBoxBanner");
        AdCenter.getInstance().showNavigateBoxBanner();
    }
    /**
     * OPPO & VIVO
     * 隐藏互推盒子横幅广告
     */
    hideNavigateBoxBanner() {
        console.log(TAG, "hideNavigateBoxBanner");
        AdCenter.getInstance().hideNavigateBoxBanner();
    }

    /**
     * OPPO & VIVO
     * 获取互推盒子九宫格广告能否展示标志
     */
    getNavigateBoxPortalFlag() {
        let flag = AdCenter.getInstance().getNavigateBoxPortalFlag();
        console.log(TAG, "getNavigateBoxPortalFlag:" + flag);
        return flag;
    }
    /**
     * OPPO & VIVO
     * 展示互推盒子九宫格广告
     * 仅VIVO需要设置以下参数
     * @param imageUrl 替换悬浮icon的默认图标的图片样式url
     * @param marginTop 悬浮icon只能靠右边显示，只提供控制上下位置,盒子九宫格广告悬浮Icon相对顶部的距离，单位：px
     */
    showNavigateBoxPortal(imageUrl?: string, marginTop?: number) {
        console.log(TAG, "showNavigateBoxPortal");
        AdCenter.getInstance().showNavigateBoxPortal(imageUrl, marginTop);
    }
    /**
     * VIVO
     * 隐藏互推盒子九宫格广告(场景跳转销毁必调)
     */
    hideNavigateBoxPortal() {
        console.log(TAG, "hideNavigateBoxPortal");
        AdCenter.getInstance().hideNavigateBoxPortal();
    }

    /**
     * OPPO & VIVO & WX & HW
     * 设置渲染层级最高的组
     * 以下方法仅针对cocos、cocos3d引擎UI使用多个摄像机的情况，如果没有用到多个摄像机请忽略
     * 为了保证sdk的原生广告和互推等UI始终显示在最上层，请将组设置成最上层。
     * @param group
     */
    setGroup(group) {
        console.log(TAG, "setGroup", group);
        AdCenter.getInstance().setGroup(group);
    }


    /**
     * ALL
     * 判断渠道是否拥有添加桌面接口
     */
    hasAddDesktopFunc() {
        let flag = AdCenter.getInstance().hasAddDesktopFunc();
        console.log(TAG, "hasAddDesktopFunc:" + flag);
        return flag;
    }
    /**
     * OPPO & VIVO & QQ & Tiktok & HW
     * 获取能否添加桌面图标标志
     * @param callback
     */
    getAddDesktopFlag(callback) {
        console.log(TAG, "getAddDesktopFlag");
        return AdCenter.getInstance().getAddDesktopFlag(callback);
    }
    /**
     * OPPO & VIVO & QQ & Tiktok & HW
     * 添加桌面图标
     * @param callback
     */
    addDesktop(callback) {
        console.log(TAG, "addDesktop");
        AdCenter.getInstance().addDesktop(callback);
    }


    /**
     * ALL
     * 手机震动
     * @param type short-短震动 long-长震动
     */
    phoneVibrate(type) {
        console.log(TAG, "phoneVibrate", type);
        AdCenter.getInstance().phoneVibrate(type);
    }


    /**
     * TIKTOK & KS
     * 开始录屏
     * @param duration 录屏的时长,单位s,必须大于3s,最大值300s(5分钟) KS可填任意数
     */
    startGameVideo(duration) {
        console.log(TAG, "startGameVideo", duration);
        AdCenter.getInstance().startGameVideo(duration);
    }

    /**
     * TIKTOK & KS
     * 暂停录屏
     */
    pauseGameVideo() {
        console.log(TAG, "pauseGameVideo");
        AdCenter.getInstance().pauseGameVideo();
    }

    /**
     * TIKTOK & KS
     * 继续录屏(暂停录屏之后)
     */
    resumeGameVideo() {
        console.log(TAG, "resumeGameVideo");
        AdCenter.getInstance().resumeGameVideo();
    }

    /**
     * TIKTOK & KS
     * 停止录屏
     * @param callback 停止录屏后的回调,返回视频地址 KS返回录屏的ID
     */
    stopGameVideo(callback) {
        console.log(TAG, "stopGameVideo");
        AdCenter.getInstance().stopGameVideo(callback);
    }

    /**
     * TIKTOK & KS
     * 分享视频
     * @param title 这是抖音分享视频的标题 KS可在快手后台申请样式添加样式ID,无样式ID需为""
     * @param desc 这是头条分享视频的描述 KS可填任意
     * @param topics 这是抖音分享视频的话题 KS可填任意
     * @param videoPath TT-视频地址 KS-录屏ID 停止录屏返回的地址或ID
     * @param callback 分享视频的回调
     */
    shareVideo(title, desc, topics, videoPath, callback) {
        console.log(TAG, "shareVideo");
        AdCenter.getInstance().shareVideo(title, desc, topics, videoPath, callback);
    }

    /**
     * TIKTOK
     * 将小游戏分享给抖音好友
     * @param templateId 字节后台通过审核的分享ID
     */
    shareAppById(templateId) {
        console.log(TAG, "shareAppById");
        AdCenter.getInstance().shareAppById(templateId);
    }



    /**
     * TIKTOK
     * 跳转到更多游戏中心,按钮绑定点击事件即可
     */
    jumpToMoreGamesCenter() {
        console.log(TAG, "jumpToMoreGamesCenter");
        AdCenter.getInstance().jumpToMoreGamesCenter();
    }

    /**
     * TIKTOK
     * 展示更多游戏横幅
     */
    showMoreGamesBanner() {
        console.log(TAG, "showMoreGamesBanner");
        AdCenter.getInstance().showMoreGamesBanner();
    }
    /**
     * TIKTOK
     * 隐藏更多游戏横幅
     */
    hideMoreGamesBanner() {
        console.log(TAG, "hideMoreGamesBanner");
        AdCenter.getInstance().hideMoreGamesBanner();
    }

    /**
     * TIKTOK
     * 收藏
     * @param type "tip"-顶部气泡 "bar"-底部弹窗
     * @param content 弹窗文案,最多显示 12 个字符,建议默认使用 一键添加到我的小程序
     * @param position 弹窗类型为 bar 时的位置参数 "bottom"-贴近底部 "overtab"-悬于页面 tab 区域上方
     */
    showFavoriteGuide(type, content, position) {
        console.log(TAG, "showFavoriteGuide");
        AdCenter.getInstance().showFavoriteGuide(type, content, position);
    }

    /**
     * ALL
     * 获取用户数据
     * @callback {userId:"",token:"",userType:0}
     * userType-0,游客类型;
     * userType-1,用户类型;
     */
    getUserData(callback) {
        console.log(TAG, "getUserData");
        AdCenter.getInstance().getUserData(callback);
    }

    /**
     * TIKTOK & OPPO & KS & HW & BL
     * 获取用户信息
     * @callback {head:"",name:"",sex:"0",power:false}
     * power-false,未授权获取用户信息
     * power-true,已授权获取用户信息
     * sex "M"为男,"F"为女,"0"为未知
     */
    getUserInfo(callback) {
        console.log(TAG, "getUserInfo");
        AdCenter.getInstance().getUserInfo(callback);
    }

    /**
     * Tiktok
     * 强制游客登录之后再次获取用户信息
     * @param callback 登录成功返回true,失败返回false
     */
    mustLogin(callback) {
        console.log(TAG, "mustLogin");
        ServerCenter.getInstance().mustLogin(callback);
    }


    /**
     * QQ
     * 获取盒子是否可以展示标志
     */
    getBoxFlag() {
        let flag = AdCenter.getInstance().getBoxFlag();
        console.log(TAG, "getBoxFlag:" + flag);
        return flag;
    }
    /**
     * QQ
     * 展示盒子广告
     */
    showAppBox() {
        console.log(TAG, "showAppBox");
        AdCenter.getInstance().showAppBox();
    }


    /**
     * QQ & WX
     * 获取积木是否可以展示标志
     */
    getBlockFlag() {
        let flag = AdCenter.getInstance().getBlockFlag();
        console.log(TAG, "getBlockFlag:" + flag);
        return flag;
    }
    /**
     * QQ & WX
     * 展示积木/原生多格子广告
     * 微信为固定样式,可填任意参数
     * @param type QQ: "landscape"-横向展示 "vertical"-竖向展示
     * @param x 积木广告左上角横坐标
     * @param y 积木广告左上角纵坐标
     * @param blockSize QQ：积木广告数量：1~5 实际数量以拉取的为准
     */
    showBlock(type, x, y, blockSize) {
        console.log(TAG, "showBlock");
        AdCenter.getInstance().showBlock(type, x, y, blockSize);
    }
    /**
     * QQ & WX
     * 关闭积木广告
     */
    hideBlock() {
        console.log(TAG, "hideBlock");
        AdCenter.getInstance().hideBlock();
    }


    /**
     * Android & IOS
     * 退出游戏
     */
    exitTheGame() {
        console.log(TAG, "exitTheGame");
        AdCenter.getInstance().exitTheGame();
    }


    /**
     * Android & IOS & Tiktok & WX
     * 自定义事件上报
     * @param params Android&IOS&WX-友盟后台自定义事件ID,Tiktok-字节后台自定义事件ID
     * @param data Android&IOS&WX-友盟后台自定义事件参数,Tiktok-字节后台自定义事件参数
     */
    reportAnalytics(params, data) {
        console.log(TAG, "reportAnalytics", params, JSON.stringify(data));
        AdCenter.getInstance().reportAnalytics(params, data);
    }


    /**
     * Android & IOS
     * Android无回调
     * 实名认证(防沉迷)
     */
    showAuthentication(callback) {
        console.log(TAG, "showAuthentication");
        AdCenter.getInstance().showAuthentication(callback);
    }
    /**
     * Android & IOS
     * Android无回调
     * 游客体验
     */
    visitorExperience(callback) {
        console.log(TAG, "visitorExperience");
        AdCenter.getInstance().visitorExperience(callback);
    }


    /**
     * Android
     * 展示原生广告
     * width ：宽
     * height ：高
     * viewX：界面的左上角距离整个界面左边的占比
     * viewY：界面的左上角距离整个界面上边的占比
     */
    showNativeAd(width, height, viewX, viewY) {
        console.log(TAG, "showNativeAd");
        AdCenter.getInstance().showNativeAd(width, height, viewX, viewY);
    }


    /**
     * Android
     * 能否展示oppo超休闲（首页更多游戏按钮）
     */
    getOPPOShowMoreGameFlag() {
        let flag = AdCenter.getInstance().getOPPOShowMoreGameFlag();
        console.log(TAG, "getOPPOShowMoreGameFlag:" + flag);
        return flag;
    }

    /**
     * Android
     * oppo超休闲（首页更多游戏）
     */
    showOPPOMoreGame() {
        console.log(TAG, "showOPPOMoreGame");
        AdCenter.getInstance().showOPPOMoreGame();
    }

    /**
     * OPPO & VIVO & QQ
     * 打开隐私协议
     */
    openProtocol() {
        console.log(TAG, "openProtocol");
        AdCenter.getInstance().openProtocol();
    }

    /**
     * OPPO & VIVO & QQ
     * 打开服务协议
     */
    openServiceAgreement() {
        console.log(TAG, "openServiceAgreement");
        AdCenter.getInstance().openServiceAgreement();
    }


    /**
     * IOS
     * 是否有网络
     */
    hasNetwork(callback) {
        console.log(TAG, "hasNetwork", AdCenter.getInstance().hasNetwork(callback));
        AdCenter.getInstance().hasNetwork(callback);
    }


    /**
     * IOS
     * 展示评论
     */
    showReviewAlert() {
        console.log(TAG, "showReviewAlert");
        AdCenter.getInstance().showReviewAlert();
    }


    /**
     * IOS
     * 每个视频播放之前  0:插屏  1:视频
     */
    showiOSADWithScene(key, type) {
        console.log(TAG, "showiOSADWithScene");
        AdCenter.getInstance().showiOSADWithScene(key, type);
    }
    /**
     * IOS
     * 弹出广告激励视频回调中使用
     */
    showiOSADWithType(key, type) {
        console.log(TAG, "showiOSADWithType");
        AdCenter.getInstance().showiOSADWithType(key, type);
    }
    /**
     * IOS
     * 弹出插屏之前视频界面 和 弹出插屏之后回调调用  0:插屏  1:视频
     */
    videoUIShow(key) {
        console.log(TAG, "videoUIShow");
        AdCenter.getInstance().videoUIShow(key);
    }


    /**
     * HW & OPPO
     * 展示隐私协议(华为必接)
     * @param companyLogUrl
     * 公司Log的图片链接(服务器地址),如果属于益欣则可以填 ""
     * @param htmlUrl
     * 点击隐私协议后跳转到的html网页地址(服务器地址),如果属于益欣则可以填 ""
     * @param callback
     * 用户点击同意则回调true
     * 用户点击取消则回调false
     */
    showPrivacyAgreement(companyLogUrl, htmlUrl, callback) {
        console.log(TAG, "showPrivacyAgreement");
        AdCenter.getInstance().showPrivacyAgreement(companyLogUrl, htmlUrl, callback);
    }


    /**
     * Android & WX
     * 购买道具
     * @param money 金额
     * @param propId 道具ID
     * @function callback(paySucc,orderId)
     * paySucc - true或者false,是否支付成功
     * orderId - 订单id
     */
    buyProps(money, propId, propName, callback) {
        console.log(TAG, "buyProps");
        AdCenter.getInstance().buyProps(money, propId, propName, callback);
    }
    /**
     * Android
     * 道具下发成功后调用,和上面的方法配合使用
     * @param orderId 订单id
     */
    payComplete(orderId) {
        console.log(TAG, "payComplete");
        AdCenter.getInstance().payComplete(orderId);
    }

    /**
     * 微信
     * 查询未发货订单(补单)
     * @func callback (data)=>{  }
     */
    queryUnfilledOrder(callback) {
        console.log(TAG, "queryUnfilledOrder");
        AdCenter.getInstance().queryUnfilledOrder(callback);
    }


    /**
     * AndroidAbroad
     * 获取系统语言
     */
    getLanguage() {
        let flag = AdCenter.getInstance().getLanguage();
        console.log(TAG, "getLanguage:" + flag);
        return flag;
    }

    /**
     * AndroidAbroad
     * 展示评分
     */
    showScore() {
        console.log(TAG, "showScore");
        AdCenter.getInstance().showScore();
    }

    /**
     * AndroidAbroad
     * 获取网络状态
     */
    getNetworkstatus() {
        let flag = AdCenter.getInstance().getNetworkstatus();
        console.log(TAG, "getNetworkstatus:" + flag);
        return flag;
    }

    /**
     * AndroidAbroad
     * 打开设置页面
     */
    openSettings() {
        console.log(TAG, "openSettings");
        AdCenter.getInstance().openSettings();
    }

    /**
     * AndroidAbroad
     * 弹出广告激励视频回调中使用
     */
    showADWithType(key, type) {
        console.log(TAG, "showADWithType");
        AdCenter.getInstance().showADWithType(key, type);
    }

    /**
     * AndroidAbroad
     * 数数事件属性上报
     */
    showTAEventData(data) {
        console.log(TAG, "showTAEventData");
        AdCenter.getInstance().showTAEventData(data);
    }

    /**
     * AndroidAbroad
     * 数数埋点事件上报
     */
    showTAWithType(type, data) {
        console.log(TAG, "showTAWithType");
        AdCenter.getInstance().showTAWithType(type, data);
    }

    /**
     * AndroidAbroad
     * 数数累加用户属性
     */
    addUser(data) {
        console.log(TAG, "addUser");
        AdCenter.getInstance().addUser(data);
    }

    /**
     * AndroidAbroad
     * 数数设置用户属性
     */
    setUser(data) {
        console.log(TAG, "setUser");
        AdCenter.getInstance().setUser(data);
    }

    /**
     * AndroidAbroad
     * 获取商品列表
     * @param type 商品类型  订阅或物品
     * @param callback
     */
    async checkItemList(type, callback) {
        console.log(TAG, "checkItemList");
        return await AdCenter.getInstance().checkItemList(type, callback);
    }

    /**
     * AndroidAbroad
     * 获取订阅剩余时间
     * @param id
     * @param callback
     */
    async getSubsRemainTime(id, callback) {
        console.log(TAG, "getSubsRemainTime");
        return await AdCenter.getInstance().getSubsRemainTime(id, callback);
    }

    /**
     * AndroidAbroad
     * 购买商品
     * @param id
     * @param type
     * @param callback
     */
    async purchaseItem(id, type, callback) {
        console.log(TAG, "purchaseItem");
        return await AdCenter.getInstance().purchaseItem(id, type, callback);
    }

    /**
     * AndroidAbroad
     * 查询已购买物品列表(商品&订阅)
     * @param type
     * @param callback
     */
    async queryPurchases(type, callback) {
        console.log(TAG, "queryPurchases");
        return await AdCenter.getInstance().queryPurchases(type, callback);
    }


    /**
     * AndroidAbroad
     * 等待广告加载
     */
    async waitVideoLoad(waitTime, callback) {
        console.log(TAG, "waitVideoLoad");
        return await AdCenter.getInstance().waitVideoLoad(waitTime, callback);
    }

    /**
     * AndroidAbroad
     * 视频按钮出现打点
     */
    reportVideoBtn(scene) {
        console.log(TAG, "reportVideoBtn");
        AdCenter.getInstance().reportVideoBtn(scene);
    }

    /**
     * AndroidAbroad
     * 视频按钮点击打点
     */
    reportVideoClick(scene) {
        console.log(TAG, "reportVideoClick");
        AdCenter.getInstance().reportVideoClick(scene);
    }

    /**
     * AndroidAbroad
     * 关闭开屏
     */
    hideSplash() {
        console.log(TAG, "hideSplash");
        AdCenter.getInstance().hideSplash();
    }


    /**
     * AndroidXA & Android
     * 请求云控参数
     * callback:
     * ()=>{console.log(TAG, "reqRemoteConfig success");
     *
     * }
     */
    reqRemoteConfig(callback) {
        console.log(TAG, "reqRemoteConfig");
        AdCenter.getInstance().reqRemoteConfig(callback);
    }

    /**
     * AndroidXA & Android
     * 获得单个云控参数
     * 返回:字符串
     */
    getRemoteConfig(key: string) {
        console.log(TAG, "getRemoteConfig");
        return AdCenter.getInstance().getRemoteConfig(key);
    }

    /**
     * AndroidXA & Android
     * 获取所有云控参数
     * 返回:json
     */
    getAllRemoteConfig() {
        console.log(TAG, "getAllRemoteConfig");
        return AdCenter.getInstance().getAllRemoteConfig();
    }

    /**
     * AndroidXA
     * 请求订阅信息
     */
    reqPaySubInfo(callback) {
        console.log(TAG, "reqPaySubInfo");
        AdCenter.getInstance().reqPaySubInfo(callback);
    }

    /**
     * AndroidXA
     * 获取所有已订阅信息
     */
    getAllPaySubInfo() {
        console.log(TAG, "getAllPaySubInfo");
        return AdCenter.getInstance().getAllPaySubInfo();
    }

    /**
     * AndroidXA
     * 获取网络连接的类型(WIFI/5G/4G/3G/2G/NO/UNKNOWN)
     */
    getNetworkType() {
        let type = AdCenter.getInstance().getNetworkType();
        console.log(TAG, "getNetworkType:" + type);
        return type;
    }

    /**
     * Android
     * 获取登录成功的token、userid
     */
    login(callback) {
        console.log(TAG, "login");
        AdCenter.getInstance().login(callback);
    }

    /**
     * AndroidXA
     * 请求商品信息
     */
    reqProductInfo(callback) {
        console.log(TAG, "reqProductInfo");
        AdCenter.getInstance().reqProductInfo(callback);
    }
    /**
     * AndroidXA
     * 获取商品信息
     */
    getProductInfo() {
        console.log(TAG, "getProductInfo");
        return AdCenter.getInstance().getProductInfo();
    }

    /**
     * AndroidXA
     * 设置banner状态
     */
    setBannerState(state: number): void {
        console.log(TAG, "setBannerState");
        AdCenter.getInstance().setBannerState(state);
    }
    /**
     * AndroidXA
     * 设置插屏状态
     */
    setIntersState(state: number): void {
        console.log(TAG, "setIntersState");
        AdCenter.getInstance().setIntersState(state);
    }
    /**
     * AndroidXA
     * 获取DIY广告能否展示
     */
    getDIYFlag(): boolean {
        console.log(TAG, "getDIYFlag");
        return AdCenter.getInstance().getDIYFlag();
    }
    /**
     * AndroidXA
     * 展示DIY广告
     */
    showDIY(diy: string) {
        console.log(TAG, "showDIY");
        AdCenter.getInstance().showDIY(diy);
    }
    /**
     * AndroidXA
     * 隐藏DIY广告
     */
    hideDIY() {
        console.log(TAG, "hideDIY");
        AdCenter.getInstance().hideDIY();
    }

    /**
     * AndroidXA
     * 打开appstore并跳转到指定的包名app页面 如填空字符串则仅跳转到appstore首页
     * @param packageName 包名
     */
    startAppStore(packageName: string) {
        console.log(TAG, "startAppStore");
        AdCenter.getInstance().startAppStore(packageName);
    }

    /**
     * AndroidXA
     * 上报事件(reportAnalytics:旧接口)
     * @param num 事件等级1-10(不传或使用reportAnalytics接口默认等级5)
     * @param name 事件名
     * @param params 事件参数
     */
    customEvent(num: number, name: string, params: any) {
        console.log(TAG, "customEvent", "num:", num, "name:", name, "params:", JSON.stringify(params));
        AdCenter.getInstance().customEvent(num, name, params);
    }

    /**
     * AndroidXA
     * 设置付费去除切入切出广告
     * @param removeAd true-去除广告 false-保留广告
     */
    setPayRemoveAd(removeAd: boolean) {
        console.log(TAG, "setPayRemoveAd", removeAd);
        AdCenter.getInstance().setPayRemoveAd(removeAd);
    }

    /**
     * Android
     * 设置onResult监听
     * @param callback
     */
    setOnResultListener(callback: (code: number, msg: string) => void): void {
        console.log(TAG, "setOnResultListener");
        AdCenter.getInstance().setOnResultListener(callback);
    }

    /**
     * AndroidXA
     * 获取国家iso代号
     */
    getNewWorkCountryIso(): string {
        let iso = AdCenter.getInstance().getNewWorkCountryIso();
        console.log(TAG, "getNewWorkCountryIso:", iso);
        return iso;
    }

    /**
     * AndroidXA
     * 获取设备信息
     */
    getDeviceInfo(): any {
        let info = AdCenter.getInstance().getDeviceInfo();
        console.log(TAG, "getDeviceInfo", JSON.stringify(info));
        return info;
    }

    /**
     * VIVO
     * 打开论坛
     */
    showForum(){
        console.log(TAG, "showForum");
        AdCenter.getInstance().showForum();
    }

}