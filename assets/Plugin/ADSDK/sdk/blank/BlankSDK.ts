import ServerInterface from "../../server/ServerInterface";

export default class BlankSDK implements ServerInterface {

    initAd() {
    }

    loginSucc(loginGetToken) {
    }

    loginFail() {
    }

    mustLogin(callback) {
        callback(true);
    }

}