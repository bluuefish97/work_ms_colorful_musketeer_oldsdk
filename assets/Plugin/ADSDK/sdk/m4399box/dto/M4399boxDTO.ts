import LocalStorage from "../../../utils/LocalStorage";

/**
 * 登录时候获取签名参数，根据不同渠道需要传给后台的不同数据
 */
export default class M4399boxLoginGetToken {

    code; //登录时获得的code
    uid;
    preview;
    nickName;
    avatar;
    // gender;

    constructor(code, uid) {
        this.code = code;
        this.uid = uid;
        // @ts-ignore
        this.preview = gamebox.getPreviewSync();
        this.nickName = LocalStorage.getData("nickName");
        this.avatar = LocalStorage.getData("avatarUrl");
        // this.gender = LocalStorage.getData("gender");
    }

}


