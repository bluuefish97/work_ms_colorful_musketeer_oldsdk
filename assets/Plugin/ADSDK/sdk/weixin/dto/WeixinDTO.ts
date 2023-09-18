import LocalStorage from "../../../utils/LocalStorage";

/**
 * 登录时候获取签名参数，根据不同渠道需要传给后台的不同数据
 */
export default class WeixinLoginGetToken {

    code; //登录时获得的code
    nickName;
    avatar;
    // gender;

    constructor(code) {
        this.code = code;
        this.nickName = LocalStorage.getData('nickName');
        this.avatar = LocalStorage.getData('avatarUrl');
        // this.gender = LocalStorage.getData('gender');
    }

}


