import ServerInterface from "../../server/ServerInterface";

export default class IosSDK implements ServerInterface {

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