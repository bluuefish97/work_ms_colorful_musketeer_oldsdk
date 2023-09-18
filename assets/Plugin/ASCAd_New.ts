import XGame from "sdk/src/XGame";

const TAG = "XminigameSDK_NEW";

/**
 * 接口调用类(详细的可在网站文档观看使用指南)
 * @author Vae
 * QQ&WX 903783021
 */
export default class ASCAd_New {
    private static instance: ASCAd_New;

    /**
     * 已经初始化广告？防止多次初始化操作
     */
    hasInit = false;
    //new sdk
    channelId: number;
    ad:any;
    banner:any;
    inters:any;
    video:any;
    /**
     * ASCAd 单例
     */
    public static getInstance(): ASCAd_New {
        if (!ASCAd_New.instance) {
            ASCAd_New.instance = new ASCAd_New();
        }
        return ASCAd_New.instance;
    }


    /**
     * ALL
     * 设置渠道ID
     * 必须要在调用该ASCAd类其他方法之前调用,否则会不生效！
     */
    setChannelId(id: number) {
        console.log(TAG, "setChannelId", id);
        this.channelId = id;
    }


    /**
     * ALL(必接)
     * 初始化广告
     */
    initAd() {
        if(this.channelId==0) return;
        console.log(TAG, "initAd");
        let user
        console.log('开始初始化SDK');
        XGameGlobal["xgame.sdk.init"]((sdk: XGame) => {
            sdk.init(this.channelId, (ret) => {    //channelId为游戏渠道的Id
                //广告模块
                user = sdk.User();
                user.login((ret, res)=>{
                  console.log("login:", ret, res);
                  this.ad = sdk.Ad();
                  console.log('SDK成功');
                });
              
            });
        })
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
        return -1;
        // let flag = AdCenter.getInstance().getChannelId();
        // console.log(TAG, "getChannelId:" + flag)
        // return flag;
    }


    /**
     * ALL
     * 展示横幅
     */
    showBanner(type?: Number) {
        if(this.channelId==0) return;
        console.log(this.ad)
        this.ad&&this.ad.showBanner(this.ad.newResult()); 
    }
    /**
     * ALL
     * 隐藏横幅
     */
    hideBanner() {
        if(this.channelId==0) return;
        console.log(TAG, "hideBanner");
        this.ad&& this.ad.hideBanner();
    }


    // 判断是否有插屏
    public async getIntersFlag(): Promise<boolean> {
        if(this.channelId==0) return;
        return await new Promise((resolve) => {
            this.ad.getIntersFlag((flag: boolean) => {
                resolve(flag)
            })
        })
    }
   //展示插屏广告
   showInters(callback:any) {
    if(this.channelId==0) return;
    let res = this.ad.newResult();
    res.onResult = (e) => {
        console.log("onResult", e.isReward)    //设置回调是否下发奖励
        if (e.isReward) {
            console.log('local-----------------展示插屏成功')
            callback(true);
        } else {
            console.log('local----------------展示插屏失败')
            callback(false);
        }
    }
    this.ad.showInters(res);


}

    // 判断是否有视频
    public async getVideoFlag(): Promise<boolean> {
        if(this.channelId==0) return;
        return await new Promise((resolve) => {
            this.ad.getVideoFlag((flag: boolean) => {
                resolve(flag)
            })
        })
    }
     //展示视频广告
     showVideo(callback:any) {
        if(this.channelId==0) return;
        let res = this.ad.newResult();
        res.onResult = (e) => {
            console.log("onResult", e.isReward)    //设置回调是否下发奖励
            if (e.isReward) {
                console.log('local-----------------视频播放成功')
      
                callback(true);
            } else {
                // if (AdController.instance.isImmediatelyReuse) {
                //     console.log('立刻恢复音乐');
                //     AudioManager.GetInstance(AudioManager).player.resumeMusic();
                // }
                console.log('local-----------------视频播放失败')
               // GameManager.getInstance().showMsgTip("暂无视频！")
                callback(false);
            }
        }
        this.ad.showVideo(res);
    }

    /**
     * OPPO & VIVO & WX & Android
     * 获取原生ICON是否可以展示标志
     */
    getNativeIconFlag() {
        // let flag = AdCenter.getInstance().getNativeIconFlag();
        // console.log(TAG, "getNativeIconFlag:" + flag)
        return false;
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

    }
    /**
     * OPPO & VIVO & WX & Android
     * 隐藏原生ICON
     */
    hideNativeIcon() {

    }

    /**
     * OPPO & VIVO
     * 获取原生大图是否可以展示标志
     */
    getNativeImageFlag() {

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
     
    }
    /**
     * OPPO & VIVO & Android
     * 隐藏原生大图
     */
    hideNativeImage() {

    }

    /**
     * OPPO
     * 获取原生贴片是否可以展示标志
     */
    getNativePasterFlag() {

        return false;
    }
    /**
     * OPPO
     * 展示原生贴片
     */
    showNativePaster() {

    }

    /**
     * OPPO & VIVO
     * 自由获取原生广告信息
     * @param type 1-后台原生广告id拉取的原生广告 2-后台自定义原生广告id拉取的原生广告
     */
    getNativeAdInfo(type) {

        return;
    }
    /**
     * OPPO & VIVO
     * 上报原生广告展示
     * @param adId 获取的原生广告的adId
     */
    reportNativeAdShow(adId) {

    }
    /**
     * OPPO & VIVO & Android
     * 上报原生广告点击
     * Android渠道其参数可任意
     * @param adId 获取的原生广告的adId
     */
    reportNativeAdClick(adId) {

    }

    /**
     * Android & IOS & WX
     * 获取互推ICON是否可以展示标签
     */
    getNavigateIconFlag() {

        return false;
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
       
    }
    /**
     * Android & IOS & WX
     * 隐藏互推ICON
     */
    hideNavigateIcon() {
      
    }

    /**
     * Android & IOS & WX
     * 获取互推列表是否可以展示标志
     */
    getNavigateGroupFlag() {
      
        return false;
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
     
    }
    /**
     * Android & IOS & WX
     * 隐藏互推列表
     */
    hideNavigateGroup() {
       
    }

    /**
     * Android & IOS & WX
     * 获取结算互推能否展示
     */
    getNavigateSettleFlag() {
      
        return false;
    }
    /**
     * Android & IOS & WX
     * 展示结算互推
     * @param type 1-大窗口类型,2-两边类型,3-横条类型,4-横幅类型
     * @param x 结算互推的横坐标
     * @param y 结算互推的纵坐标
     */
    showNavigateSettle(type, x, y) {
     
    }
    /**
     * Android & IOS & WX
     * 隐藏结算互推
     */
    hideNavigateSettle() {
     
    }

    /**
     * Android
     * 获取互推贴片能否展示
     */
    getNavigatePasterFlag() {
    
        return false;
    }
    /**
     * Android
     * 展示互推贴片
     */
    showNavigatePaster() {
     
    }
    /**
     * Android
     * 隐藏互推贴片
     */
    hideNavigatePaster() {
      
    }
    /**
     * 上报互推贴片点击
     */
    reportNavigatePasterClick() {
    
    }

    /**
     * WX
     * 获取互推插屏能否展示
     */
    getNavigateInters() {
      
        return false;
    }
    /**
     * WX
     * 展示互推插屏
     */
    showNavigateInters() {
       
    }

    /**
     * WX
     * 分享游戏给好友(在用户点击播放视频时弹出暂无视频并调用该接口)
     */
    shareApp() {

    }

    /**
     * OPPO & VIVO
     * 获取互推盒子横幅广告能否展示标志
     */
    getNavigateBoxBannerFlag() {

        return false;
    }
    /**
     * OPPO & VIVO
     * 展示互推盒子横幅广告
     */
    showNavigateBoxBanner() {
     
    }
    /**
     * OPPO & VIVO
     * 隐藏互推盒子横幅广告
     */
    hideNavigateBoxBanner() {
      
    }

    /**
     * OPPO & VIVO
     * 获取互推盒子九宫格广告能否展示标志
     */
    getNavigateBoxPortalFlag() {
       
        return false;
    }
    /**
     * OPPO & VIVO
     * 展示互推盒子九宫格广告
     * 仅VIVO需要设置以下参数
     * @param imageUrl 替换悬浮icon的默认图标的图片样式url
     * @param marginTop 悬浮icon只能靠右边显示，只提供控制上下位置,盒子九宫格广告悬浮Icon相对顶部的距离，单位：px
     */
    showNavigateBoxPortal(imageUrl?: string, marginTop?: number) {
     
    }
    /**
     * VIVO
     * 隐藏互推盒子九宫格广告(场景跳转销毁必调)
     */
    hideNavigateBoxPortal() {
      
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
        // AdCenter.getInstance().setGroup(group);
    }


    /**
     * ALL
     * 判断渠道是否拥有添加桌面接口
     */
    hasAddDesktopFunc() {
       
        return false;
    }
    /**
     * OPPO & VIVO & QQ & Tiktok & HW
     * 获取能否添加桌面图标标志
     * @param callback
     */
    getAddDesktopFlag(callback) {
      
        return ;
    }
    /**
     * OPPO & VIVO & QQ & Tiktok & HW
     * 添加桌面图标
     * @param callback
     */
    addDesktop(callback) {
      
    }


    /**
     * ALL
     * 手机震动
     * @param type short-短震动 long-长震动
     */
    phoneVibrate(type) {
      
    }


    /**
     * TIKTOK & KS
     * 开始录屏
     * @param duration 录屏的时长,单位s,必须大于3s,最大值300s(5分钟) KS可填任意数
     */
    startGameVideo(duration) {
     
    }

    /**
     * TIKTOK & KS
     * 暂停录屏
     */
    pauseGameVideo() {
     
    }

    /**
     * TIKTOK & KS
     * 继续录屏(暂停录屏之后)
     */
    resumeGameVideo() {
        
    }

    /**
     * TIKTOK & KS
     * 停止录屏
     * @param callback 停止录屏后的回调,返回视频地址 KS返回录屏的ID
     */
    stopGameVideo(callback) {
       
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
       
    }

    /**
     * TIKTOK
     * 将小游戏分享给抖音好友
     * @param templateId 字节后台通过审核的分享ID
     */
    shareAppById(templateId) {
       
    }

    blockAdMap = new Map<number, any>();

    async getBlockFlag(index: number, x: number, y: number) {
        return await new Promise(resolve => {
            let size = cc.view.getVisibleSize();
            x = x / size.width;
            y = 1 - y / size.height;
            let ad = this.getBlock(index, x, y);
            if (ad) {
                console.log("getBlockFlag  true")
                ad.getFlag(resolve);
            } else {
                console.log("getBlockFlag false")
                resolve(false);
            }
        })
    }

    private getBlock(index: number, x: number, y: number) {
        if (this.blockAdMap.has(index)) {
            return this.blockAdMap.get(index);
        }
        if (this.ad && this.ad.createCustomAd) {
            let ad = this.ad.createCustomAd(index);
            if (ad) {
                ad.setPosition(x, y);
                this.blockAdMap.set(index, ad);
                ad.create();
            }
            return ad;
        }
        return null;
    }

    hideBlock(index: number) {
        if(this.channelId==0) return;
        if (this.blockAdMap.has(index)) {
            let ad = this.blockAdMap.get(index);
            if (ad) {
                ad.hide();
            }
        }
    }

    showBlock(index: number, x: number, y: number) {
        if(this.channelId==0) return;
        let size = cc.view.getVisibleSize();
        x = x / size.width;
        y = 1 - y / size.height;
        let ad = this.getBlock(index, x, y);
        if (ad) {
            let res = this.ad.newResult();
            console.log("showBlock  show")
            ad.show(res);
        }
    }
}