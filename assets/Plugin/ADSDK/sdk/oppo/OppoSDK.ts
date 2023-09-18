import MoblieTokenDTO from "../../server/dto/MoblieTokenDTO";
import VisitorTokenDTO from "../../server/dto/VisitorTokenDTO";
import ServerCenter from "../../server/ServerCenter";
import ServerInterface from "../../server/ServerInterface";
import GetConfig from "../../utils/GetConfig";
import LocalStorage from "../../utils/LocalStorage";
import OppoLoginGetToken from "./dto/OppoDTO";

export default class OppoSDK implements ServerInterface {

    userId: string = LocalStorage.getData("ServerUserId");
    channelId: string = GetConfig.getChannelId(); // 渠道号

    initAd() {
        // @ts-ignore
        qg.reportMonitor("game_scene", 0);

        this.startLogin();
    }

    /**
     * 登录
     */
    startLogin() {
        // @ts-ignore
        qg.login({
            success: (res) => {
                console.log("XminigameSDK", "OPPO 登录成功：" + JSON.stringify(res.data));
                let loginGetToken = new OppoLoginGetToken(res.data.token)
                this.loginSucc(loginGetToken);
            },
            fail: (res) => {
                console.log("XminigameSDK", "OPPO 登录失败,", JSON.stringify(res));
                console.log("XminigameSDK", "OPPO 启用游客登录");
                this.loginFail();
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
