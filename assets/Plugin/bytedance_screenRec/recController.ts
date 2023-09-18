
import { _decorator, Component, Node } from 'cc';
import DateTool from '../tools/DateTool';
const { ccclass, property } = _decorator;

@ccclass('RecController')
export default class RecController {
    private static instance: RecController;
    public recState: RecState= RecState.WaitRecing;
    public recTime: number = 0;
    private interval:any;
    public recPath:string;     //录屏地址
    static getInstance(): RecController {
        if (!RecController.instance)
            RecController.instance = new RecController();
        return RecController.instance;
    }

    /**
     * 开始录屏计时
     * @param cal 
     */
    public startRec(cal:Function) {
        this.recPath=null;
        let timeStr = DateTool.timeChangeToStr(this.recTime, 2);
        cal(timeStr);
       this.interval= setInterval(() => {
            this.recTime++;
            let timeStr = DateTool.timeChangeToStr(this.recTime, 2);
            cal(timeStr);
            if(this.recTime>=290)
            {
                clearInterval( this.interval );//停止
               // Facade.getInstance().sendNotification(CommandDefine.EndRec);
            }
        }, 1000)
    }

    /**
     * 停止录屏计时
     * @param cal 
     */
    public StopRec() {
        clearInterval( this.interval );//停止
        this.recTime=0
    }
}

export enum RecState {
    WaitRecing = 0,      //等待录制状态
    InRecing = 1,        //正在录制中
    EndRecing = 2        //录制完成
}
