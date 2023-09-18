
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum App_Platform {
    GP_Oppo,  //Oppo渠道
    GP_Vivo,  //Vivo渠道
    GP_Tiktok,//抖音渠道
    GP_QQ,    //qq渠道
    GP_Test,  //测试
    GP_Android, //安卓
    GP_IOS,    //IOS
    GP_WX,     //微信
    GP_KS,     //快手
    GP_HW,     //华为
    GP_XM,     //小米
}

@ccclass('AppPlatform')
export class AppPlatformController extends Component {
    static Platform: App_Platform = App_Platform.GP_Tiktok;

    static setPlatform(platform: App_Platform) {
        this.Platform = platform;
    }
}

