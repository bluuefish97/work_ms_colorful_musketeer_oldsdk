import MoblieTokenDTO from "../../server/dto/MoblieTokenDTO";
import VisitorTokenDTO from "../../server/dto/VisitorTokenDTO";
import ServerCenter from "../../server/ServerCenter";
import ServerInterface from "../../server/ServerInterface";
import GetConfig from "../../utils/GetConfig";
import LocalStorage from "../../utils/LocalStorage";
import WeixinLoginGetToken from "./dto/WeixinDTO";

export default class WeixinSDK implements ServerInterface {

    userId: string = LocalStorage.getData("ServerUserId");
    channelId: string = GetConfig.getChannelId(); // 渠道号

    initAd() {
        this.startLogin();
        // 使分享到朋友、分享到朋友圈可用
        // @ts-ignore
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        })
    }

    /**
     * 登录
     */
    startLogin() {
        // @ts-ignore
        wx.login({
            success: (res) => {
                if (res.code) {
                    console.log("XminigameSDK", "WX 登录成功：" + JSON.stringify(res));
                    let loginGetToken = new WeixinLoginGetToken(res.code)
                    this.loginSucc(loginGetToken);
                } else {
                    console.log("XminigameSDK", "WX 登录失败," + JSON.stringify(res));
                    console.log("XminigameSDK", "WX 启用游客登录");
                    this.loginFail();
                }
            },
            fail: (res) => {
                console.log("XminigameSDK", "WX 登录失败,", JSON.stringify(res));
                console.log("XminigameSDK", "WX 启用游客登录");
                this.loginFail();
            }
        })

    }

    /**
     * 登录成功,获取用户token
     */
    loginSucc(loginGetToken) {
        let moblieTokenDTO = new MoblieTokenDTO(this.channelId, this.userId, loginGetToken);
        // 获取用户token
        ServerCenter.getInstance().getMoblieToken(moblieTokenDTO, (suc, res) => {
            if (suc && res.status == 200) {
                // 下发广告
                ServerCenter.getInstance().downAdConfigure((succ, res) => {
                    if (succ && res.status == 200) {
                        LocalStorage.setJsonData('adConfig', res.data);
                        ServerCenter.getInstance().getLocalStorageAdConfig();
                    } else {
                        ServerCenter.getInstance().getLocalStorageAdConfig();
                    }
                });
                // 下发互推
                ServerCenter.getInstance().downPushGames((succ, res) => {
                    if (succ && res.status == 200) {
                        LocalStorage.setJsonData('pushGamesConfig', res.data);
                        ServerCenter.getInstance().getLocalStoragePushGamesConfig();
                    } else {
                        ServerCenter.getInstance().getLocalStoragePushGamesConfig();
                    }
                });
            } else {
                ServerCenter.getInstance().getLocalStorageAdConfig();
                ServerCenter.getInstance().getLocalStoragePushGamesConfig();
            }
        });
    }

    /**
     * 登录失败,获取游客token
     */
    loginFail() {
        let visitorTokenDTO = new VisitorTokenDTO(this.channelId, this.userId);
        // 获取游客token
        ServerCenter.getInstance().getVisitorToken(visitorTokenDTO, (suc, res) => {
            if (suc && res.status == 200) {
                // 下发广告
                ServerCenter.getInstance().downAdConfigure((succ, res) => {
                    if (succ && res.status == 200) {
                        LocalStorage.setJsonData('adConfig', res.data);
                        ServerCenter.getInstance().getLocalStorageAdConfig();
                    } else {
                        ServerCenter.getInstance().getLocalStorageAdConfig();
                    }
                });
                // 下发互推
                ServerCenter.getInstance().downPushGames((succ, res) => {
                    if (succ && res.status == 200) {
                        LocalStorage.setJsonData('pushGamesConfig', res.data);
                        ServerCenter.getInstance().getLocalStoragePushGamesConfig();
                    } else {
                        ServerCenter.getInstance().getLocalStoragePushGamesConfig();
                    }
                });
            } else {
                ServerCenter.getInstance().getLocalStorageAdConfig();
                ServerCenter.getInstance().getLocalStoragePushGamesConfig();
            }
        });
    }

    /**
     * 强制登录
     */
    mustLogin(callback) {
        callback(false);
    }
}
