import LocalStorage from "../../../utils/LocalStorage";

/**
 * 登录时候获取签名参数，根据不同渠道需要传给后台的不同数据
 */
export default class XiaomiLoginGetToken {

    session;//登录时获得的session
    uid; //登录时获得的uid
    nickName;
    avatarUrl;
    // gender;

    constructor(session, uid) {
        this.session = session;
        this.uid = uid;
        this.nickName = LocalStorage.getData('nickName');
        this.avatarUrl = LocalStorage.getData('avatarUrl');
        // this.gender = LocalStorage.getData('gender');
    }

}


