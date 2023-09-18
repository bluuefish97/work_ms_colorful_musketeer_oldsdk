import GetConfig from "../../../utils/GetConfig";
import LocalStorage from "../../../utils/LocalStorage";

/**
 * 登录时候获取签名参数，根据不同渠道需要传给后台的不同数据
 */
export default class HuaweiLoginGetToken {

    openId; //登录时获得的openId
    appId;
    nickName;
    avatar;
    // gender;

    constructor(openId) {
        this.openId = openId;
        this.appId = GetConfig.getAppId();
        this.nickName = LocalStorage.getData('nickName');
        this.avatar = LocalStorage.getData('avatarUrl');
        // this.gender = LocalStorage.getData('gender');
    }

}


