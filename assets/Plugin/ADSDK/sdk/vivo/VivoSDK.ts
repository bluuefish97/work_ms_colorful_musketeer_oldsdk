import VisitorTokenDTO from "../../server/dto/VisitorTokenDTO";
import ServerCenter from "../../server/ServerCenter";
import ServerInterface from "../../server/ServerInterface";
import GetConfig from "../../utils/GetConfig";
import LocalStorage from "../../utils/LocalStorage";

export default class VivoSDK implements ServerInterface {

    userId: string = LocalStorage.getData("ServerUserId");
    channelId: string = GetConfig.getChannelId(); // 渠道号

    initAd() {
        this.startLogin();
    }

    /**
     * 登录
     */
    startLogin() {
        // vivo只能走游客渠道
        this.loginFail();
    }
    
    /**
     * 登录成功
     */
    loginSucc(loginGetToken) {
    }

    /**
     * 登录失败
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
