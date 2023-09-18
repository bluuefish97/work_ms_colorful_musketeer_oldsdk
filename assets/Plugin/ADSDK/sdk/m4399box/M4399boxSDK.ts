import AdCenter from "../../ad/AdCenter";
import { m4399boxAdConfig } from "../../SdkConfig";
import MoblieTokenDTO from "../../server/dto/MoblieTokenDTO";
import VisitorTokenDTO from "../../server/dto/VisitorTokenDTO";
import ServerCenter from "../../server/ServerCenter";
import ServerInterface from "../../server/ServerInterface";
import GetConfig from "../../utils/GetConfig";
import LocalStorage from "../../utils/LocalStorage";
import M4399boxLoginGetToken from "./dto/M4399boxDTO";

export default class M4399boxSDK implements ServerInterface {

    userId: string = LocalStorage.getData("ServerUserId");
    channelId: string = GetConfig.getChannelId(); // 渠道号

    initAd() {
        if (m4399boxAdConfig.openM4399boxManualModel) {
            // @ts-ignore
            gamebox.login({
                success: (res) => {
                    if (res.code) {
                        console.log("XminigameSDK", "m4399box 登录成功", JSON.stringify(res));
                        AdCenter.getInstance().m4399boxManualModel();
                    } else {
                        console.log("XminigameSDK", "m4399box 登录失败", JSON.stringify(res));
                        console.log("XminigameSDK", "m4399box 启用游客登录");
                        AdCenter.getInstance().m4399boxManualModel();
                    }
                }
            })
            return;
        }

        this.startLogin();
    }

    /**
     * 登录
     */
    startLogin() {
        // @ts-ignore
        gamebox.login({
            success: (res) => {
                if (res.code) {
                    console.log("XminigameSDK", "m4399box 登录成功", JSON.stringify(res));
                    let loginGetToken = new M4399boxLoginGetToken(res.code, res.uid);
                    this.loginSucc(loginGetToken);
                } else {
                    console.log("XminigameSDK", "m4399box 登录失败", JSON.stringify(res));
                    console.log("XminigameSDK", "m4399box 启用游客登录");
                    this.loginFail();
                }
            }
        })
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
