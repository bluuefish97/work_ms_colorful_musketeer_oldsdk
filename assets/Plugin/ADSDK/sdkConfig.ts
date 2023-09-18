/**
 * SDK版本,请勿改动
 */
export const sdkVersionConfig = {
    sdkVersion: "zCocos3.x 4.9.7"
}


/**
 * 参数
 */
export var sdkConfig = {
    /**
     * APPID,仅在华为,快手渠道需要填写(快手渠道请将下面注释掉的初始化代码放至首屏调用)
     */
    appId: "",
    /**
     * 渠道id //1234666为安卓 1234667为安卓海外 1234888为ios 0为测试 1234000为无广告包,播放视频直接回调true (4.6.3新增1234668为AndroidXgameAndroid,暂时只用为安卓海外谷歌渠道)
     */
    channelId: "0",
}

// // @ts-ignore
// kwaigame.readyGo(); // 快手渠道请在游戏首屏加载完成之后调用
// // @ts-ignore
// kwaigame.init({
//     appId: GetConfig.getAppId()
// });


/**
 * (华为广告参数)仅在华为渠道且开启华为手动填参模式可用
 */
export const huaweiAdConfig = {
    /**
     * 开启华为手动填参模式
     */
    openHuaweiManualModel: false,

    // 系统banner广告ID
    ID_SystemBanner: "testw6vs28auh3",
    // 系统插屏广告ID
    ID_SystemInters: "testb4znbuh3n2",
    // 原生广告ID
    ID_Native: "testu7m3hc4gvm",
    // 视频广告ID
    ID_Video: "testx9dtjwj8hp",

    // 系统banner开关
    SW_SystemBanner: true,
    // 系统插屏开关
    SW_SystemInters: true,
    // 视频开关
    SW_Video: true,
    // 原生总开关
    SW_Native: true,
    // 原生Banner开关
    SW_NativeBanner: true,
    // 原生插屏开关
    SW_NativeInters: true,

    // 系统banner优先？
    SW_SystemBannerFirst: true,
    // banner自动刷新时间
    NUM_BannerUpdateTime: 60,
    // 原生插屏出现概率(0-只出现系统插屏)
    NUM_NativeIntersP: 0,

    // 插屏控制开关
    SW_IntersBaseControl: false,
    // 插屏第几次开始展示
    NUM_IntersStart: 0,
    // 插屏展示间隔次数
    NUM_IntersIntervalNum: 0,
    // 插屏间隔最小时间
    NUM_IntersIntervalTime: 0,
    // 插屏延迟时间(ms)
    NUM_IntersDelayTime: 0,
    // 插屏延迟概率
    NUM_IntersDelayP: 0,
}


/**
 * (4399游戏盒广告参数)仅在m4399box渠道且开启手动填参模式可用
 */
export const m4399boxAdConfig = {
    /**
     * 开启m4399box手动填参开关
     */
    openM4399boxManualModel: false,

    // 系统banner开关
    SW_SystemBanner: true,
    // 系统插屏开关
    SW_SystemInters: true,
    // 视频开关
    SW_Video: true,

    // banner自动刷新时间
    NUM_BannerUpdateTime: 30,

    // 插屏控制开关
    SW_IntersBaseControl: false,
    // 插屏第几次开始展示
    NUM_IntersStart: 0,
    // 插屏展示间隔次数
    NUM_IntersIntervalNum: 0,
    // 插屏间隔最小时间
    NUM_IntersIntervalTime: 0,
    // 插屏延迟时间(ms)
    NUM_IntersDelayTime: 0,
    // 插屏延迟概率
    NUM_IntersDelayP: 0,
}