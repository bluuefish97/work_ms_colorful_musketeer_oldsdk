import LocalStorage from "../../../utils/LocalStorage";

/**
 * 登录时候获取签名参数，根据不同渠道需要传给后台的不同数据
 */
export default class KwaiLoginGetToken {

    gameUserId; //登录时获得的gameUserId
    gameToken; //登录时获得的gameToken
    nickName;
    avatar;
    // gender;

    constructor(gameUserId, gameToken) {
        this.gameUserId = gameUserId;
        this.gameToken = gameToken;
        this.nickName = LocalStorage.getData('nickName');
        this.avatar = LocalStorage.getData('avatarUrl');
    }

}


