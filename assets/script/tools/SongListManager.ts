/****************************************************
文件：SongListManager.ts
作者：zhangqiang
邮箱: 2574628254@qq.com
日期：2021-1-9 17:43:18
功能：
*****************************************************/

import { SongInfo, SongTableType, SubSongTableType } from "../GloalDefine";
import { SongElementMed } from "../puremvc/Mediator/SongElementMed";
import { MediatorDefine } from "../puremvc/mediatorDefine";
import { v2, Node, UITransform, v3 } from "cc";
import { Facade } from "../../Plugin/core/puremvc/patterns/facade/Facade";
import { Mediator } from "../../Plugin/core/puremvc/patterns/mediator/Mediator";

/**
 * 游戏内歌曲列表的管理
 */
export default class SongListManager {

    private songTableList: Array<Array<SongInfo>> = new Array<Array<SongInfo>>();  //游戏内存在的歌单    
    private songNodeTablelist: Array<Array<Node>> = new Array<Array<Node>>();    //游戏内存在的歌单中所显示的歌曲单元的节点
    private songMedTablelist: Array<Array<SongElementMed>> = new Array<Array<SongElementMed>>();   //游戏内存在的歌单中所显示的歌曲的中介
    private endSongIdxTableList: Array<number> = new Array<number>();    //游戏内存在的歌单中最后显示的歌曲单元的下标
    private curSongTableType: SongTableType = SongTableType.All;    //当前歌曲列表内最后变化的下标
    private unitHight: number = 220;
    private maxSongUnitSize: number = 10;
    private static instance: SongListManager;

    /**
    * SongListManager 单例
    */
    public static getInstance(): SongListManager {
        if (!SongListManager.instance) {
            SongListManager.instance = new SongListManager()
        }
        return SongListManager.instance
    }

    public getTopSongNode(type: SongTableType): Node {
        return this.songNodeTablelist[type][0];
    }

    public getButtomSongNode(type: SongTableType): Node {
        return this.songNodeTablelist[type][this.songNodeTablelist[type].length - 1];
    }

    public get UnitHight(): number {
        return this.unitHight;
    }

    public clearSongListByType(type: SongTableType) {
        this.songTableList[type] = null;
    }
    
    /**
     * 创造所需歌单的歌曲信息元素
     * @param size 
     */
    public pushSongTable(_type: SongTableType, songTable: Array<SongInfo>, contentYset: Function, _nodecreater: Function) {
        this.switchSongTable(_type);
        if (!this.songTableList[_type]) {                           //对该类型的歌单进行实例化
            this.endSongIdxTableList[this.curSongTableType] = -1;
            this.songTableList[this.curSongTableType] = songTable;
            this.songNodeTablelist[this.curSongTableType] = new Array<Node>();
            this.songMedTablelist[this.curSongTableType] = new Array<SongElementMed>();
            contentYset(this.UnitHight * songTable.length, _type);
            for (let i = 0; i < this.maxSongUnitSize; i++) {
                if( i >= this.songTableList[this.curSongTableType].length) {
                    break;
                }
                this.endSongIdxTableList[this.curSongTableType]++;
                if (!this.songTableList[this.curSongTableType][this.endSongIdxTableList[this.curSongTableType]]) return;
                let existMed = Facade.getInstance().retrieveMediator(MediatorDefine.SongElementMed + i + "type" + _type) as SongElementMed;
                if (existMed != null) {
                    existMed.initSongInfo(this.songTableList[this.curSongTableType][i], i);
                }
                else {
                    let curType = this.curSongTableType;
                    _nodecreater((unit: Node) => {
                        unit.active = false;
                        unit.setPosition(v3(unit.position.x, -i * this.unitHight - this.unitHight / 2));
                        unit.active = true;
                        this.songNodeTablelist[_type].push(unit);
                        let med = new SongElementMed(MediatorDefine.SongElementMed + i + "type" + _type, unit, `song${_type}`);
                        Facade.getInstance().registerMediator(med);
                        med.initSongInfo(this.songTableList[curType][i], i);
                        this.songMedTablelist[_type].push(med);
                    });
                }
            }
        }
    }

    /**
     *更新所需歌单的歌曲信息元素
     * @param _type 
     */
    public updateSongTable(_type: SongTableType, songTable: Array<SongInfo>, contentYset: Function, _nodecreater: Function) {
        this.switchSongTable(_type);
        if (!this.songTableList[_type])//对该类型的歌单进行实例化
        {
            this.pushSongTable(_type, songTable, contentYset, _nodecreater);
        }
        else {
            let fastId = this.songMedTablelist[this.curSongTableType][0] != null? this.songMedTablelist[this.curSongTableType][0].id : 0;
            this.endSongIdxTableList[this.curSongTableType] = fastId - 1;
            let tempTableList = this.songTableList[this.curSongTableType];
            this.songTableList[this.curSongTableType] = songTable;
            contentYset(this.UnitHight * songTable.length, _type);
            if (songTable.length < tempTableList.length) {
                let startId = songTable.length;
                for (let index = startId; index < tempTableList.length; index++) {
                    let existMed = Facade.getInstance().retrieveMediator(MediatorDefine.SongElementMed + index + "type" + _type) as SongElementMed;
                    if (existMed != null) {
                        existMed.clearSongElement();
                        Facade.getInstance().removeMediator(MediatorDefine.SongElementMed + index + "type" + _type);
                    }
                }
            }
            for (let i = 0; i < this.maxSongUnitSize; i++) {
                if( i >= this.songTableList[this.curSongTableType].length) {
                    break;
                }
                this.endSongIdxTableList[this.curSongTableType]++;
                let existMed = this.songMedTablelist[this.curSongTableType][i];
                if (existMed != null) {
                    this.songNodeTablelist[this.curSongTableType][i].active = false;
                    this.songNodeTablelist[this.curSongTableType][i].setPosition(v3(0, -(i + fastId) * this.unitHight - this.unitHight / 2));
                    this.songNodeTablelist[this.curSongTableType][i].active = true;
                    existMed.initSongInfo(this.songTableList[this.curSongTableType][i + fastId], i + fastId);
                }
                else {
                    if (!this.songTableList[this.curSongTableType][this.endSongIdxTableList[this.curSongTableType]]) return;
                    _nodecreater((unit: Node) => {
                        unit.active = false;
                        unit.setPosition(v3(unit.position.x, -i * this.unitHight - this.unitHight / 2));
                        unit.active = true;
                        this.songNodeTablelist[_type].push(unit);
                        let med = new SongElementMed(MediatorDefine.SongElementMed + i + "type" + _type, unit, `song${_type}`);
                        Facade.getInstance().registerMediator(med);
                        med.initSongInfo(this.songTableList[this.curSongTableType][i], i);
                        this.songMedTablelist[_type].push(med);
                    });
                }
            }

        }
    }

    /**
     * 切换到对应的歌单
     */
    private switchSongTable(_type: SongTableType) {
        this.curSongTableType = _type;
    }

    public topToButtom(songType: SongTableType) {
        this.endSongIdxTableList[songType]++;
        if (!this.songTableList[songType][this.endSongIdxTableList[songType]]) {
            this.endSongIdxTableList[songType]--;
            return;
        }
        let temp = this.songNodeTablelist[songType].shift();
        this.songNodeTablelist[songType].push(temp);
        let pos = temp.getPosition();
        pos.y -= this.unitHight * this.maxSongUnitSize;
        temp.setPosition(pos);
        temp.setSiblingIndex(Math.abs(temp.position.y));
        let tempMed = this.songMedTablelist[songType].shift();
        this.songMedTablelist[songType].push(tempMed);
        tempMed.initSongInfo(this.songTableList[songType][this.endSongIdxTableList[songType]], this.endSongIdxTableList[songType]);
    }

    public buttomToTop(songType: SongTableType) {
        // console.log("buttomToTop  ");
        let tempEnd = this.endSongIdxTableList[songType];       //未改变前的最大下标
        this.endSongIdxTableList[songType]--;
        let showId = tempEnd - this.maxSongUnitSize;
        if (showId < 0) {
            this.endSongIdxTableList[songType]++
            return;
        }
        let temp = this.songNodeTablelist[songType].pop();
        this.songNodeTablelist[songType].unshift(temp);
        let pos = temp.getPosition();
        pos.y += this.unitHight * this.maxSongUnitSize;
        temp.setPosition(pos);
        temp.setSiblingIndex(Math.abs(temp.position.y));
        let tempMed = this.songMedTablelist[songType].pop();
        this.songMedTablelist[songType].unshift(tempMed);
        tempMed.initSongInfo(this.songTableList[songType][showId], showId);
    }

    public clearAll() {
        this.songTableList = new Array<Array<SongInfo>>();  //游戏内存在的歌单
        this.songNodeTablelist = new Array<Array<Node>>();    //游戏内存在的歌单中所显示的歌曲单元的节点
        for (let index = 0; index < this.songMedTablelist.length; index++) {
            const element = this.songMedTablelist[index];
            if(element&&element.length>0){
                element.forEach((med: SongElementMed) => {
                    let nameStr = med.mediatorName;
                    med.clearSongElement();
                    Facade.getInstance().removeMediator(nameStr);
                })
            }
        }
        this.songMedTablelist = new Array<Array<SongElementMed>>();   //游戏内存在的歌单中所显示的歌曲的中介
        this.endSongIdxTableList = new Array<number>();    //游戏内存在的歌单中最后显示的歌曲单元的下标
        this.curSongTableType = SongTableType.All;    //当前歌曲列表内最后变化的下标
    }
}
