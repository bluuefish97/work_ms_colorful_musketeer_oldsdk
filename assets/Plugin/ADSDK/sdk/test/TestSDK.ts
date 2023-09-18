import ServerInterface from "../../server/ServerInterface";

export default class TestSDK implements ServerInterface {

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