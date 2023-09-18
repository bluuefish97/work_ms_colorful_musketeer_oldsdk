import LocalStorage from "../../../utils/LocalStorage";

/**
 * 登录时候获取签名参数，根据不同渠道需要传给后台的不同数据
 */
export default class BilibiliLoginGetToken {

    js_code; //登录时获得的js_code
    nickName;
    avatar;
    // gender;

    constructor(js_code) {
        this.js_code = js_code;
        this.nickName = LocalStorage.getData('nickName');
        this.avatar = LocalStorage.getData('avatarUrl');
        // this.gender = LocalStorage.getData('gender');
    }

}


