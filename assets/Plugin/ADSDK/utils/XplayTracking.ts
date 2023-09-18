import LocalStorage from "./LocalStorage";

export enum TrackingEvent {
    TYPE_ACTIVATE = 0,
    TYPE_REGISTER = 1,
    TYPE_SEC_ACT = 2,
    TYPE_ORDER = 3,
    TYPE_PAY = 4,
    TYPE_CUSTOM_EVENT = 5
}


export enum CustomType {
    CUSTOM_TYPE_FIX_NAME = 0,
    CUSTOM_TYPE_AD_SHOW_TIMES = 1,
    CUSTOM_TYPE_ONLINE_TIME = 2,
    CUSTOM_TYPE_AD_CLICK_TIMES = 3,
}

const TAG = "XminigameSDK-XplayTracking";
// 正式
const SERVER_URL = "https://tracking.xminigame.com";
// 测试
// const SERVER_URL = "http://192.168.31.146";
// /app/activate.tracking

export default class XplayTracking {

    static httpRequest: XMLHttpRequest;

    static startTimestamp: number = 0;
    static onlineTime: number = 0;
    static onlineTimeAdded: number = 0;
    static deviceId: string;
    static deviceIdType: string;
    static appid: string;

    static login_switch: number = 0;
    static device_id: number = 0;
    static active_state: number = 0;
    static custom_event_type: number = 0;
    static convert_type: number = 0;
    static convert_state: number = 0;

    static showAdTimes: number = 0;
    static clickAdTimes: number = 0;

    static key_clickAdTimes: string = "tracking.record.click_ad_times";
    static key_showAdTimes: string = "tracking.record.show_ad_times";
    static key_onlineTime: string = "tracking.record.online_time";

    static recordStartTime() {
        this.startTimestamp = new Date().getTime();
    }

    static init(appid: string): void {
        this.appid = appid;

        this.clickAdTimes = Number(LocalStorage.getData(this.key_clickAdTimes));
        this.showAdTimes = Number(LocalStorage.getData(this.key_showAdTimes));
        this.device_id = Number(LocalStorage.getData("device_id"));
    }

    static setDeviceId(deviceId: string) {
        this.deviceId = deviceId;

        let len = deviceId.length;
        if (len <= 17 && len >= 15 && this.allStrIsNum(deviceId)) {
            this.deviceIdType = "imei";
        } else {
            this.deviceIdType = "oaid";
        }
    }

    static active() {
        this.postReq("/app/activate.tracking", {}, (suc, res) => {
            console.log(TAG, "res:", JSON.stringify(res));
            this.login_switch = res.data.login_switch;
            this.device_id = res.data.device_id;
            LocalStorage.setData("device_id", this.device_id);
            this.active_state = res.data.active_state;
            if (this.active_state == 1) {
                this.custom_event_type = res.data.custom_event_type;
                this.convert_type = res.data.convert_type;
                this.convert_state = res.data.convert_state;
            }
        });
    }

    static reportAdShow() {
        this.showAdTimes++;
        LocalStorage.setData(this.key_showAdTimes, this.showAdTimes);
        this.customTypeEvent(CustomType.CUSTOM_TYPE_AD_SHOW_TIMES, "" + this.showAdTimes, null, (suc, res) => {
            console.log(TAG, "reportAdShow", suc, res ? JSON.stringify(res) : null);
        });
    }

    static reportAdClick() {
        this.clickAdTimes++;
        LocalStorage.setData(this.key_clickAdTimes, this.clickAdTimes);
        this.customTypeEvent(CustomType.CUSTOM_TYPE_AD_CLICK_TIMES, "" + this.clickAdTimes, null, (suc, res) => {
            console.log(TAG, "reportAdClick", suc, res ? JSON.stringify(res) : null);
        });
    }

    static reportOnlineTime() {
        let now = new Date().getTime();
        let diff = now - this.startTimestamp;
        if (diff < 100) {
            return;
        }
        this.onlineTimeAdded += diff;
        if (this.onlineTimeAdded < 5000) {
            return;
        }
        this.onlineTime += (this.onlineTimeAdded / 1000);
        this.onlineTimeAdded = 0;
        this.startTimestamp = now;
        LocalStorage.setData(this.key_onlineTime, this.onlineTime);
        this.customTypeEvent(CustomType.CUSTOM_TYPE_ONLINE_TIME, "" + this.onlineTime, null, (suc, res) => {
            console.log(TAG, "reportOnlineTime", suc, res ? JSON.stringify(res) : null);
        });
    }

    static customTypeEvent(customType: CustomType, name: string, params: any, callback) {
        console.log(TAG, "customTypeEvent:" + customType + " " + name + "- " + this.active_state + "-" + this.convert_type + "-" + this.convert_state);
        if (this.active_state != 1 || this.convert_type != TrackingEvent.TYPE_CUSTOM_EVENT
            || this.convert_state != 0 || this.custom_event_type != customType) {
            return;
        }
        let data = {
            "app_id": this.appid,
            "device_id": this.device_id,
            "event_type": TrackingEvent.TYPE_CUSTOM_EVENT,
            "event_name": name,
            "custom_type": customType
        }
        if (params != null) {
            data["params"] = params;
        }
        this.postReq("/app/custom_event.tracking", data, callback);
    }

    static postReq(url, data, callback) {
        if (!this.deviceId || !this.appid || !this.deviceIdType) {
            console.error(TAG, "no deviceId or no appid.");
            callback(false, null);
            return;
        }

        data[this.deviceIdType] = this.deviceId;
        data["app_id"] = this.appid;
        data["device_os"] = "android";

        let jsonStrData = JSON.stringify(data);
        console.log(TAG, "jsonStrData", jsonStrData);

        this.httpRequest = new XMLHttpRequest();
        this.httpRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(TAG, url, "返回结果：", this.responseText);
                let res = JSON.parse(this.responseText);
                if (res.ret != undefined && res.ret == 0) {
                    callback(true, res);
                } else {
                    callback(false, "");
                }
            }
        };
        this.httpRequest.timeout = 5000;
        this.httpRequest.ontimeout = () => {
            console.log(TAG, "下发参数超时", SERVER_URL + url);
            callback(false, "");
        };
        this.httpRequest.onerror = function (e) {
            console.log(TAG, url, "error", JSON.stringify(e));
            callback(false, "");
        };
        this.httpRequest.open("POST", SERVER_URL + url, true);
        // this.httpRequest.setRequestHeader("Content-Type", "text/json");
        // this.httpRequest.setRequestHeader("Accept", "application/json");
        this.httpRequest.send(JSON.stringify(data));
    }

    static allStrIsNum(str: string): boolean {
        let strArr: string[] = str.split("");
        for (let i = 0; i < strArr.length; i++) {
            if (isNaN(Number(strArr[i]))) return false;
        }
        return true;
    }

}