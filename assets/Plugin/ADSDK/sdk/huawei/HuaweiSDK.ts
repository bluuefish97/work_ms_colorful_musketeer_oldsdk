import AdCenter from "../../ad/AdCenter";
import { huaweiAdConfig } from "../../SdkConfig";
import MoblieTokenDTO from "../../server/dto/MoblieTokenDTO";
import VisitorTokenDTO from "../../server/dto/VisitorTokenDTO";
import ServerCenter from "../../server/ServerCenter";
import ServerInterface from "../../server/ServerInterface";
import GetConfig from "../../utils/GetConfig";
import LocalStorage from "../../utils/LocalStorage";
import HuaweiLoginGetToken from "./dto/HuaweiDTO";

export default class HuaweiSDK implements ServerInterface {

    userId: string = LocalStorage.getData("ServerUserId");
    channelId: string = GetConfig.getChannelId(); // 渠道号
    appId: string = GetConfig.getAppId();

    initAd() {
        if (this.appId == "") {
            console.log("XminigameSDK", "请在SdkConfig.ts中填入appId return=================");
            return;
        }

        if (huaweiAdConfig.openHuaweiManualModel) {
            // @ts-ignore
            qg.gameLoginWithReal({
                forceLogin: 1, //强制登录，未登录时会弹出登录对话框
                appid: this.appId, //appid需要与华为开发者联盟后台配置一致
                success: (res) => {
                    console.log("XminigameSDK", "HW 登录成功：", JSON.stringify(res));
                    LocalStorage.setData("nickName", res.displayName);
                    AdCenter.getInstance().huaweiManualModel();
                },
                fail: (data, code) => {
                    console.log("XminigameSDK", "HW 登录失败", JSON.stringify(data) + "," + JSON.stringify(code));
                    // AdCenter.getInstance().huaweiManualModel();
                    this.processLoginFail(code);
                }
            });

            return;
        }
        this.startLogin();
    }

    processLoginFail(code: number) {
        if (code == 7004 || code == 2012) {
            // @ts-ignore
            qg.showModal({
                title: "登录失败",
                content: "是否重新登录",
                cancelText: "退出游戏",
                confirmText: "重新登录",
                success: (res: any) => {
                    if (res) {
                        this.initAd();
                    } else {
                        // @ts-ignore
                        qg.exitApplication({});
                    }
                },
            })
        }
    }

    /**
     * 登录
     */
    startLogin() {
        // @ts-ignore
        qg.gameLoginWithReal({
            forceLogin: 1, //强制登录，未登录时会弹出登录对话框
            appid: this.appId, //appid需要与华为开发者联盟后台配置一致
            success: (res) => {
                console.log("XminigameSDK", "HW 登录成功：", JSON.stringify(res));
                LocalStorage.setData("nickName", res.displayName);
                let loginGetToken = new HuaweiLoginGetToken(res.playerId);
                this.loginSucc(loginGetToken);
            },
            fail: (data, code) => {
                console.log("XminigameSDK", "HW 登录失败", JSON.stringify(data) + "," + JSON.stringify(code));
                console.log("XminigameSDK", "HW 启用游客登录");
                // this.loginFail();
                this.processLoginFail(code);
            }
        });
    }

    /**
     * 登录成功,获取用户token
     */
    loginSucc(loginGetToken) {
        let moblieTokenDTO = new MoblieTokenDTO(this.channelId, this.userId, loginGetToken);
        ServerCenter.getInstance().getMoblieToken(moblieTokenDTO, (suc, res) => {
            if (suc && res.status == 200) {
                ServerCenter.getInstance().downAdConfigure((succ, res) => {
                    if (succ && res.status == 200) {
                        LocalStorage.setJsonData('adConfig', res.data);
                        ServerCenter.getInstance().getLocalStorageAdConfig();
                    } else {
                        ServerCenter.getInstance().getLocalStorageAdConfig();
                    }
                });
            } else {
                ServerCenter.getInstance().getLocalStorageAdConfig();
            }
        });
    }

    /**
     * 登录失败,获取游客token
     */
    loginFail() {
        let visitorTokenDTO = new VisitorTokenDTO(this.channelId, this.userId);
        ServerCenter.getInstance().getVisitorToken(visitorTokenDTO, (suc, res) => {
            if (suc && res.status == 200) {
                ServerCenter.getInstance().downAdConfigure((succ, res) => {
                    if (succ && res.status == 200) {
                        LocalStorage.setJsonData('adConfig', res.data);
                        ServerCenter.getInstance().getLocalStorageAdConfig();
                    } else {
                        ServerCenter.getInstance().getLocalStorageAdConfig();
                    }
                });
            } else {
                ServerCenter.getInstance().getLocalStorageAdConfig();
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
