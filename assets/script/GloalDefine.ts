/****************************************************
文件：GloalDefine.ts
作者：zhangqiang
邮箱: 2574628254@qq.com
日期：2021-1-9 14:22:29
功能：定义游戏全局的数据
*****************************************************/

const gameName = "xcqs"

export default class GloalDefine {
    static readonly mainSceneName: string = "main";
    static readonly gameSceneName: string = "game";
    
    static readonly MAXCoinNum: number = 12;            //最大生成的钻石数
    static readonly MINCoinNum: number = 8;            //最小生成的钻石数
    static readonly UnitScore: number = 8;                  //单次得分
    static readonly UnitScore_star: number = 1;                  //单次星砂数

    static readonly LunckyPeriod:number=30;

    static readonly DownTime: number = 10;                  //倒计时时间

    static readonly  PowerRecoverTime:number=120;          //恢复体力的时间

    static readonly oneConsumePowerValue = 0;
    static readonly MaxPowerValue = 20;
    static readonly infoRegionZIndex = 30;      //用户信息区域所属的层级
    static readonly FuncMenuRegionZIndex = 10;      //用户信息区域所属的层级
    static readonly QuickStartRegionZIndex = 11;      //用户信息区域所属的层级

    static readonly PATH_GameConfig: string = "configs";
    
    static readonly MusicTableUrl = "https://musicgame.xplaymobile.com/MusicGames/Gamelist/TikTok/xuancaiqianshen.json"
}

export class LocalKeys {
    static readonly Key_new: string = gameName + "_Key_new";

    static readonly Key_diaNumber: string = gameName +"_diaNumber";
    
    static readonly Key_starNumSongId: string = gameName + "_starNumSongId";          //该id歌曲的星星数量 key
    static readonly Key_bestScoreSongId: string = gameName + "_bestScoreSongId";        //该id歌曲的最高分 key
    static readonly Key_unlockSongId: string = gameName + "_unlockSongId";             //解锁的歌的id key
    static readonly Key_lastPlaySongName: string = gameName + "_lastPlaySongName";        //最后一次播放的歌曲名 key

    static readonly Key_musicVolume: string = gameName +"_musicVolume";
    static readonly Key_effectVolume: string = gameName +"_effectVolume";
    static readonly Key_musicVibrate: string = gameName +"_musicVibrate"

    static readonly Key_failSongList: string = gameName +"_failSongList";
    static readonly Key_passSongList: string = gameName +"_passSongList";
    static readonly Key_collectList: string = gameName +"_collectList";

    static readonly Key_UseSkin: string = gameName + "Key_UseSkin";
    static readonly Key_UseThem: string = gameName + "Key_UseThem";
    static readonly Key_LockThem: string = gameName + "Key_LockThem";
    static readonly KeY_LockSkin: string = gameName + "KeY_LockSkin";
}


export enum SwitchType {
    CLOSE,
    OPEN
}

export enum UserInfoType {
    Header,
    Dia,
    Power,
    ConstellationPower,
    Point,
}

export enum FuncModule {
    HomeModule,
    SkinModule,
    SetMoudle
}

export enum SceneThemeType {
    Mountain_001,
    Mountain_002,
    Mountain_003,
}

/**
 * 歌的不同类型的列表
 */
export enum SongTableType {
    All,
    Hot,
    Recommend,
    more,
    type_All,
    type_My,
    type_My_Fail,
    type_My_Pass,
    type_My_Collect,
}

export enum SubSongTableType {
    NEW,
}

export class SceneThemeInfo {
    ID: number;
    name: string;
    resName: string;
    skinBundleName: string;
    skins: Array<any>;
}



export class SongInfo {
    coverFile: string;
    ex_lv: string;
    ex_bag: string;
    ex_new: string;
    json_normal: string;
    musicFile: string;
    musicId: string;
    musicName: string;
    orderNumbe: string;
    singerName: string;
    style: string;
    unlockCost: string;
    unlockType: string;
}

/**
 * 歌曲播放时机
 */
export enum SongPlayType {
    Immediately = "Immediately",
    Wait = "Wait"
}

/**
 * 播放歌曲字段
 */
export class PlaySongInfo {
    songName: string;
    playState: SongPlayType;
    constructor(name: string, state: SongPlayType) {
        this.songName = name;
        this.playState = state;
    }
}

export class PlayState {
    songName: string;
    _isPause: boolean;
    constructor(name: string, isPause: boolean) {
        this.songName = name;
        this._isPause = isPause;
    }
}


export class CollectState {
    _songId: string;
    _isCollect: boolean;
    constructor(name: string, isCollect: boolean) {
        this._songId = name;
        this._isCollect = isCollect;
    }
}

/**
 * 消耗品类型
 */
export enum ConsumablesType {
    dia = "dia",
    power = "power",
    constell_power="constell_power",
    point="point"
}

/**
 * 消耗品改变传递的字段
 */
export class ConsumablesAlterInfo {
    consumablesType: ConsumablesType;
    alterVal: number;
    constructor(type: ConsumablesType, val: number) {
        this.consumablesType = type;
        this.alterVal = val;
    }
}

export class PowerInfo {
    id: number;
    obtainType: string;
    consumeVal: number;
    awardVal: number;
}

/**
 * 正常结算的信息
 */
export class NormalSettleInfo {
    starsValue: number;    //星星数
    scoreValue: number;    //分数
    diaValue: number;    //钻石数
    _topRecord: number;   //最高分
    isHaveNewSong: boolean;  //是否还存在未解锁的歌曲 
    newSongInfo: SongInfo;
    curSongInfo: SongInfo;
    freeNextSongInfo: SongInfo;
    isWin:boolean;
}

/**
 * 挑战结算的信息
 */
export class ChallengeSettleInfo {
    starsValue: number;    //星星数
    scoreValue: number;    //分数
}



export class FMRSwitchRequestInfo {
    switch: SwitchType = null;
    module: FuncModule = null;
    constructor(_switch: SwitchType, _module: FuncModule) {
        this.switch = _switch;
        this.module = _module;
    }
}

/**
 * 单个任务的配置信息
 */
export class TaskElementInfo{
    id:string;
    title:string;
    des:string;
    ironPath:string;
    target:number;
    vitalityAward:number;
    diaAward:number;
}

/**
 * 单个皮肤的配置信息
 */
export class SkinElementInfo{
    id:string;
    skinName:string;
    des:string;
    ironPath:string;
    modelPath:string;
    unlockType:string;
    unlockVal:number;
}

/**
 * 单个抽奖奖品的配置信息
 */
export class Luncky_cardInfo{
    id:string;
    cardName:string;
    cardDes:string;
    ironPath:string;
    awardType:string;
    cardawardUnit:number;
    Prob:number
}

/**
 * 单个任务的完成情况
 */
export class TaskProgressInfo{
    TaskID:any;
    ProValue:number;
}

/**
 * 额外奖励的奖励值传递字段
 */
export class PhaseExtraRewardInfo{
    Phase:number;
    ExtraReward:number;
    constructor(_phase: number, _extraReward: number) {
        this.Phase = _phase;
        this.ExtraReward = _extraReward;
    }
}

/**
 *奖励状态传递字段
 */
export class RewardStateInfo{
    id:number;
    State:RewardState;
    constructor(_id: number, _state: RewardState) {
        this.id = _id;
        this.State = _state;
    }
}

/**
 *皮肤状态传递字段
 */
export class SkinStateInfo{
    id:number;
    State:SkinState;
    constructor(_id: number, _state: SkinState) {
        this.id = _id;
        this.State = _state;
    }
}

export enum RewardState {
    Undone,    //未完成
    Unclaimed,   //待领取
    Received,   //已领取
}

export enum SkinState {
    LOCK,    //锁住
    UNLOCK,   //未解锁
    EQUIP,   //装备
}

export enum PlayType {
    Normal = "Normal",
    ELP = "ELP",
}

/**
 * 每日任务枚举
 */
export enum TaskName {
    挑战一次无限模式,
    复活一次,
    过关任意歌曲一次,
    累计在线时长3分钟,
    单局一千分以上,
}

/**
 * 商店的不同类型的页面
 */
export enum ShopRegionType {
    PointsShop,
    //LunckyShop,
    SkinShop
}

/**
 * 星座面板的不同类型的页面
 */
export enum ConstellationRegionType {
    ConstellaionModule,
    RankModule
}

/**
 * 挑战模式的不同表单
 */
export enum ChallengeRankType {
    Last,
    Now
}

