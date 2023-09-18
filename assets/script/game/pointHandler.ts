
import { _decorator, Component, Node, math } from 'cc';
import { MathTool } from '../../Plugin/tools/mathTool';
const { ccclass, property } = _decorator;
const REPEATDUR: number = 0.09   //连发的时间间隔 单位秒

@ccclass('PointHandler')
export class PointHandler {

    private _nativePoint: Array<any> = new Array<any>();  //未处理的节奏点数据
    private _timestamps: Array<number> = new Array<number>();
    private _rotatetamps: Array<number> = new Array<number>();
    protected _longtimeSigns: Array<number> = new Array<number>();
    protected _UltimatelyTimestamps: Array<number> = new Array<number>();     //最终的节奏数据点
    protected _types: Array<number> = new Array<number>();          //节奏数据点的类型  包括正常点 连击
    // protected _unSignHorVals: Array<number> = new Array<number>();         //水平值 区间为0 ~ 2;
    protected _horVals: Array<number> = new Array<number>();         //水平值 区间为-1 ~ 1;
    protected _lasthorVal: number = 0;

    public get Timestamps() : Array<number> {
        return this._timestamps;
    }

    public get RotateTamps() : Array<number> {
        return this._rotatetamps;
    }
    
    public get UltimatelyTimestamps(): Array<number> {
        return this._UltimatelyTimestamps
    }

    public get HorVals(): Array<number> {
        return this._horVals;
    }

    constructor(nativePoint: any) {
        this._nativePoint = nativePoint;
        this.fetchTimesTamps();
        // this.fetchLongTimesTamps();
        this.calculateUltimatelyTimesTamps();
    }

    /**
     * 提取时间戳
     */
    private fetchTimesTamps() {
        this._nativePoint.forEach((element,idx) => { //element.time
            if (element.pressKey == "tag01") {
                this._rotatetamps.push(element.time/ 1000)
            } else {
                this._timestamps.push(element.time/ 1000);
                if (element.pressKey === "startLong") {
                    this._longtimeSigns.push(1);
                } else {
                    this._longtimeSigns.push(0);
                }
            }
        });
    }

    /**
     * 提取特殊节奏 _长按
     */
    private fetchLongTimesTamps() {
        this._nativePoint.forEach((element, index) => {
            if (element.pressKey === "startLong") {
                this._longtimeSigns.push(1);
            } else {
                this._longtimeSigns.push(0);
            }
        });
    }

    /**
     * 加工时间戳
     */
    private calculateUltimatelyTimesTamps() {
        for (let i = 0; i < this._timestamps.length; i++) {
            let element = this._timestamps[i];
            let sign = this._longtimeSigns[i];
            this._UltimatelyTimestamps.push(element);
            this._types.push(0);
            if (sign == 1) {
                let endElement = this._timestamps[i + 1];
                let newTimeStamp = element;
               // console.log("endElement  ", endElement);
                let n = 0;
                do {
                    newTimeStamp += REPEATDUR
                    this._UltimatelyTimestamps.push(newTimeStamp);
                    this._types.push(1);
                    n++;
                    //  console.log("newTimeStamp  ", newTimeStamp);
                    //    console.log("n   ", n);
                } while (newTimeStamp <= endElement - 2 * REPEATDUR);
            }
        }
        this._UltimatelyTimestamps.sort((a, b) => {
            return a - b;
        })
    }

    /**
     * 计算水平轴  默认时间戳每过一秒就可以把道路横穿一遍
     */
    public calculateHorVal() {
        for (let i = 0; i < this._UltimatelyTimestamps.length; i++) {
            if (this._types[i] != 1 && this._types[i - 1] != 1){
                if(i > 0) {
                    this._lasthorVal += this._UltimatelyTimestamps[i] - this._UltimatelyTimestamps[i - 1];
                }
            }
            let signVal: number = 0;
            let val = Math.floor(this._lasthorVal/1.0) * 1.0;
            val = MathTool.loopValue(val, 0, 2)
            signVal = MathTool.signedConversion(val, 2);
            this._horVals.push(signVal);
            this.calculateUltimatelyBomb(i, signVal);
            this.setMovePointMap(i);
        }
    }

    /**
     * 根据节奏下标计算是否出现炸弹
     * @param idx 
     */
    public calculateUltimatelyBomb(idx: number, hor: number) {
    }

    public setMovePointMap(idx: number) {

    }

    /**
     * 检测是否是密集点
     * @param id 
     */
    checkIsIntensivePoint(id: number) {
        if (this._types[id]) {
            return this._types[id] == 1;
        } else {
            return false;
        }

    }
}

