
import { _decorator, Component, Node, math } from 'cc';
import { PointHandler } from './pointHandler';
import { MathTool } from '../../Plugin/tools/mathTool';
const { ccclass, property } = _decorator;

@ccclass('PointDifficultyHandlers')
export class PointDifficultyHandler extends PointHandler {

    private _curDifficultyData: DifficultyData = null;
    private curContinuousTimes: number = 0;
    private _bombMap: Map<number, number> = new Map<number, number>();     //炸弹的map
    private _movePointMap: Map<number, number> = new Map<number, number>(); //移动点的Map
    private lastBombId: number = null;
    private bombInterval: number = 0;        //节奏炸弹产生后的隔了几个节奏点

    protected _bombHorVals: Array<number> = new Array<number>();         //炸弹水平值

    public get BombMap(): Map<number, number> {
        return this._bombMap;
    }

    public get movePointMap(): Map<number, number>{
        return this._movePointMap;
    }
    /**
     * 配置难度
     */
    configurateDifficultyData(diff: DifficultyData) {
        this._curDifficultyData = diff;
        this.lastBombId = Math.floor(Math.random() * this._curDifficultyData.bombAriseDurNumber) + 10;
    }

    /**
    * 根据难度配置 生成节奏炸弹数据点
    */
    public calculateUltimatelyBomb(idx: number, hor: number) {
        super.calculateUltimatelyBomb(idx, hor);
        let rat = math.random();
        if(rat > this._curDifficultyData.bombRat) {
            return;
        }
        let horAbs = Math.abs(hor);
        let num = horAbs <= 0.25 || horAbs >= 0.75? 2 : 1;
        this._bombMap.set(idx, num);
    }

    public setMovePointMap(idx: number) {
        let rat = math.random();
        if(rat > this._curDifficultyData.movePointRat) {
            return;
        }
        this._movePointMap.set(idx, 1);
    }

    checkIsBomb(idx: number) {
        return this._bombMap.get(idx) != undefined;
    }

}

export class DifficultyData {
    offsetTimeDur: number;  //贯穿一个路面宽度所需的时间 单位秒
    offsetFator: number;    //偏移系数
    minOffsetTimeDur: number;  //产生偏移的最小时间间隔
    maxContinuousTimes: number;  //最大的不产生偏移的连续个数
    bombAriseDurNumber: number; //炸弹出现的间隔数
    bombOffset: number;
    movePointRat: number; //移动点概率
    bombRat: number;    //炸弹概率
    movePointMax: number //连续移动点最大个数
}