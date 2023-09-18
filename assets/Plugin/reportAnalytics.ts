import { _decorator } from "cc";
import ASCAd from "./ADSDK/ASCAd";

const { ccclass, property } = _decorator;

export class ReportAnalytics {
    private static instance: ReportAnalytics
    public static getInstance(): ReportAnalytics {
        if (!ReportAnalytics.instance) {
            ReportAnalytics.instance = new ReportAnalytics()
            ReportAnalytics.instance.startTime = new Date().getTime();
            ReportAnalytics.instance.LocalADCount = 0;
        }
        return ReportAnalytics.instance
    }
    public startTime: number = 0
    public LocalADCount: number = 0;
    public LiftTime: number = 0


    public static YDViewShowState: string = "";

    //数据打点
    reportAnalytics(name: string, name2: string, data: any) {
        return;
        var DATA = {}
        switch (name) {
            case "net_eventAnalytics":
                DATA = {
                    app_request: 0,
                    app_response: 0,
                    song_request: 0,
                    song_response: 0,
                    json_request: 0,
                    json_response: 0,
                    game_request: 0,
                    game_response: 0,
                }
                break;
            case "viewShow_eventAnalytics":
                DATA = {
                    main: 0,
                    revive: 0,
                    fail: 0,
                    pass: 0,
                    diabank: 0,
                    songRecommed: 0,
                    diabank_nodia: 0,
                }
                break;
            case "btnClick_eventAnalytics":
                DATA = {
                    dia: 0,
                    main: 0,
                    startSong: '',
                    diaUnlock: '',
                    cancalRevive: 0,
                    back: 0,
                    again: 0,
                }

                break;
            case "adBtnClick_eventAnalytics":
                DATA = {
                    songUnlock: '',
                    diaGet: '',
                    revive: '',
                }
                break;
        }
        DATA[name2] = data
        // //@ts-ignore
        // if (config.platform == Platform.douYin && typeof tt != "undefined") {
        //     //@ts-ignore
        //     tt.reportAnalytics(name, DATA);
        // } else {
            let newData = {}
            newData[name2] = data;
            ASCAd.getInstance().reportAnalytics(name, newData);
        // }
        console.log("埋点     " + name + '  ' +  name2 + '  ' + data)
    }
    /**
     * 单次生命周期分析
     */
    SingleLifeCycleAnalytics() {
        this.LiftTime = Math.round((new Date().getTime() - this.startTime) / 1000);
        if (this.LiftTime < 200) {
            this.LiftTime = 200
        } else if (this.LiftTime < 250) { this.LiftTime = 250 }
        else if (this.LiftTime < 300) { this.LiftTime = 300 }
        else if (this.LiftTime < 350) { this.LiftTime = 350 }
        else if (this.LiftTime < 400) { this.LiftTime = 400 }
        else if (this.LiftTime < 450) { this.LiftTime = 450 }
        else { this.LiftTime = 500 }
        //   console.log("单次生命周期分析:     " + "广告次数: "+ this.LocalADCount+ "  生命周期:   "+  this.LiftTime)
        //@ts-ignore
        if (config.platform == Platform.douYin && typeof tt != "undefined") {
            //@ts-ignore
            tt.reportAnalytics('SingleLifeCycle', {
                ADCount: this.LocalADCount,
                LiftTime: this.LiftTime,
            });
        }
    }
}
