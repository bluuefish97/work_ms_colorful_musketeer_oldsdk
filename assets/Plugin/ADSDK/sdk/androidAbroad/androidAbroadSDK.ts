import AdCenter from "../../ad/AdCenter";
import ServerInterface from "../../server/ServerInterface";

export default class androidAbroadSDK implements ServerInterface {

    initAd() {
    }

    loginSucc(loginGetToken) {
    }

    loginFail() {
    }

    mustLogin(callback) {
        callback(false);
    }

}