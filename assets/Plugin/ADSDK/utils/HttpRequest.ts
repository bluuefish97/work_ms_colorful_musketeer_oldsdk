import GetConfig from "./GetConfig";
import LocalStorage from "./LocalStorage";

export enum ContentType {
    APPLICATION_JSON = "application/json",
    APPLICATION_X_WWW_FORM_URLENCODED = "application/x-www-form-urlencoded",
}

export default class HttpRequest {
    private static instance: HttpRequest;
    private httpRequest: XMLHttpRequest;
    public static AUTHORIZATION: string = "Authorization";
    public static CONTENT_TYPE = "Content-Type";

    /**
     * 是否已经获取到token
     */
    hasGetToken = false;

    /**
     * 是否已经获取到广告参数
     */
    hasGetAdConfig = false;

    /**
     * 是否已经获取到互推游戏参数
     */
    hasGetPushGameConfig = false;

    public static getInstance(): HttpRequest {
        if (!HttpRequest.instance) {
            HttpRequest.instance = new HttpRequest();
        }
        return HttpRequest.instance;
    }


    /**
     * 强制登录调用
     */
    clearHasGetToken() {
        this.hasGetToken = false;
    }


    /**
     * 获取游客或者用户token
     * @param url
     * @param callback
     * @param data
     */
    requestPost(url, data, callback) {
        let self = this;
        this.httpRequest = new XMLHttpRequest();
        this.httpRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // 防止多次获取token
                if (self.hasGetToken) return;
                self.hasGetToken = true;
                console.log("XminigameSDK", "【POST】", url);
                console.log("XminigameSDK", "requestHeader1：", HttpRequest.CONTENT_TYPE, ContentType.APPLICATION_JSON);
                console.log("XminigameSDK", "this.responseText:", this.responseText);
                let res = JSON.parse(this.responseText);
                console.log("XminigameSDK", "返回结果：", JSON.stringify(res));
                if (res.status == 200) {
                    LocalStorage.setData("userId", res.data.userId);
                    LocalStorage.setData("openId", res.data.extension);
                    LocalStorage.setData("token", res.data.token);
                    LocalStorage.setData("userType", (res.data.isVisitor == false || res.data.isVisitor == "false") ? "1" : "0");
                    LocalStorage.setData("paySwitch", (res.data.paySwitch == false || res.data.paySwitch == "false") ? "0" : "1");
                    LocalStorage.setData("nickName", res.data.nickName);
                    LocalStorage.setData("avatarUrl", res.data.avatar);
                    // LocalStorage.setData("gender", res.data.gender);后期不维护性别
                    callback(true, res);
                } else {
                    callback(false, "");
                }
            }
        };
        this.httpRequest.timeout = 5000;
        this.httpRequest.ontimeout = () => {
            console.log("XminigameSDK", "下发参数超时", url);
            callback(false, "");
        };
        this.httpRequest.onerror = function (e) {
            console.log("XminigameSDK", url, "error", JSON.stringify(e));
            callback(false, "");
        };
        this.httpRequest.open("POST", url, true);
        this.httpRequest.setRequestHeader(HttpRequest.CONTENT_TYPE, ContentType.APPLICATION_JSON);
        this.httpRequest.send(JSON.stringify(data));
    }


    /**
     * 互推统计
     * @param url
     * @param token
     * @param callback
     */
    requestPostWithAuthor(url, pushGamePackage, token, callback) {
        url = url + `?channelId=${GetConfig.getChannelId()}` + `&pushGamePackage=${pushGamePackage}`;
        this.httpRequest = new XMLHttpRequest();
        this.httpRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("XminigameSDK", "【POST】", url);
                console.log("XminigameSDK", "requestHeader1：", HttpRequest.CONTENT_TYPE, ContentType.APPLICATION_JSON);
                console.log("XminigameSDK", "requestHeader2：", HttpRequest.AUTHORIZATION, token);
                let data = JSON.parse(this.responseText);
                console.log("XminigameSDK", "返回结果：", JSON.stringify(data));
                if (data.status == 200) {
                    callback(true, data);
                } else {
                    callback(false, "");
                }
            }
        };
        this.httpRequest.onerror = function (e) {
            console.log("XminigameSDK", url, "error", JSON.stringify(e));
            callback(false, "");
        };
        this.httpRequest.open("POST", url, true);
        this.httpRequest.setRequestHeader(HttpRequest.CONTENT_TYPE, ContentType.APPLICATION_JSON);
        this.httpRequest.setRequestHeader(HttpRequest.AUTHORIZATION, token);
        this.httpRequest.send();
    }


    /**
     * 下发广告参数(hasContent:true)、互推游戏(hasContent:false)
     * @param url
     * @param callback
     * @param data
     */
    requestGet(url, token, hasContent, callback) {
        let self = this;
        url = url + `?channelId=${GetConfig.getChannelId()}`;
        this.httpRequest = new XMLHttpRequest();
        this.httpRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // 防止多次下发参数
                if (hasContent) {
                    if (self.hasGetAdConfig) return;
                    self.hasGetAdConfig = true;
                } else {
                    if (self.hasGetPushGameConfig) return;
                    self.hasGetPushGameConfig = true;
                }
                let data = JSON.parse(this.responseText);
                console.log("XminigameSDK", "【GET】", url);
                console.log("XminigameSDK", "requestHeader1：", HttpRequest.AUTHORIZATION, token);
                if (hasContent) console.log("XminigameSDK", "requestHeader2：", HttpRequest.CONTENT_TYPE, ContentType.APPLICATION_X_WWW_FORM_URLENCODED);
                console.log("XminigameSDK", "返回结果：", JSON.stringify(data));
                if (data.status == 200) {
                    callback(true, data);
                } else {
                    callback(false, "");
                }
            }
        };
        this.httpRequest.timeout = 5000;
        this.httpRequest.ontimeout = () => {
            console.log("XminigameSDK", "下发参数超时", url);
            callback(false, "");
        };
        this.httpRequest.onerror = function (e) {
            console.log("XminigameSDK", "【GET】", url);
            console.log("XminigameSDK", "requestHeader1：", HttpRequest.AUTHORIZATION, token);
            if (hasContent) console.log("XminigameSDK", "requestHeader2：", HttpRequest.CONTENT_TYPE, ContentType.APPLICATION_X_WWW_FORM_URLENCODED);
            callback(false, "");
        };
        this.httpRequest.open("GET", url, true);
        if (hasContent) this.httpRequest.setRequestHeader(HttpRequest.CONTENT_TYPE, ContentType.APPLICATION_X_WWW_FORM_URLENCODED);
        this.httpRequest.setRequestHeader(HttpRequest.AUTHORIZATION, token);
        this.httpRequest.send();
    }
}
