/**
 * 登录时候获取签名参数，根据不同渠道需要传给后台的不同数据
 */
export default class OppoLoginGetToken {

    sdkVersion;
    token; //登录时获得的token

    constructor(token) {
        this.sdkVersion = '1.0.0';
        this.token = token;
    }

}


