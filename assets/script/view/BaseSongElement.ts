
import { _decorator, Component, Node, Label, Button, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BaseSongElement')
export class BaseSongElement extends Component {

    protected songNameLabel: Label = null;
    protected adUnlockBtn: Button = null;
    protected startBtn: Button = null;
    public isPause: boolean = true;
    public isPlayState: boolean = false;

    public get IsPlayState(): boolean {
        return this.isPlayState
    }

    public set IsPlayState(v: boolean) {
        this.isPlayState = v;
    }

    public get StartBtnNode(): Node {
        return this.startBtn.node;
    }

    onLoad() {

    }

    define() {
        this.adUnlockBtn = this.node.getChildByName("unlock_adButton").getComponent(Button);
        this.startBtn = this.node.getChildByName("startButton").getComponent(Button);
    }

    /**
   * 设置歌曲名
   */
    setSongNameLabel(text: string) {
        this.songNameLabel.string = text;
    }

    setSingerNameLabel(text: string) {
    }

    /**
    * 设置获得的星星数
    */
    setStarsNum(num: number) {

    }

    /**
     * 设置最高分
     */
    setBestScore(num: number) {

    }

    /**
     * 设置歌曲的图片
     */
    setSongIronSpr(fs: SpriteFrame) {
    }

    /**
    * 设置广告按钮点击事件监听
    */
    setAdBtnClickEvent(callback: Function) {
    }

    /**
    * 设置钻石按钮点击事件监听
    */
    setDiasBtnClickEvent(callback: Function) {

    }

    /**
    * 设置开始按钮点击事件监听
    */
    setStartBtnClickEvent(callback: Function) {
    }

    /**
     * 设置播放按钮点击事件监听
     */
    songPlaySwitchBtnClickEvent(callback: Function) {
    }

    /**
     * 设置AD点击事件监听
     */
    ADClickEvent(callback: Function) {
    }

    /**
     * 设置收藏Toggle
     * @param callback 
     */
    setlikeToggleEvent(callback: Function) { }

    /**
     * 设置歌曲的解锁类型
     */
    setUnlockType(type: string, val: number = null) {
    }

    /**
     * 设置歌曲的解锁状态
     */
    setUnlockState() {
    }

    /**
     * 设置歌曲的AD状态
     */
    setADState() {
    }

    /**
     * 设置歌曲为播放时状态
     */
    setPlayStateShow() {
    }

    /**
     * 设置歌曲为选中时状态
     */
    setSelectTipShowState(IsShow: boolean) {
    }

    /**
    * 设置结束歌曲为解锁状态
    */
    setEndUnlokTipShow(IsShow: boolean) {
    }

    /**
     * 设置结束歌曲的解锁状态
     */
    setEndUnlockState() {
    }

    /**
     * 设置歌曲为停止时状态
     */
    setStopStateShow() {
    }

    /**
     * 设置歌曲的播放图标状态
     */
    setSongPlayState(_playState: any, _isPause: any) {
    }

    /**
     * 设置歌曲的难度显示
     */
    showHardTip(hardLv: string) {
    }

    /**
     * 设置歌曲的全新标识显示
     */
    showNewStateTip(isShow: boolean) {
    }

    /**
     * 设置歌曲的收藏标识显示
     */
    showCollectStateTip(isCheck: boolean) {
    }

    /**
     * 设置歌曲条的入场动画
     */
    setEntranceAct(delayTime: number) {
    }

    /**
     * 设置歌曲条的离场动画
     */
    setExitAct(delayTime: number) {
    }

    /**
     * 歌曲播放加载中
     */
    waitingAct() {
    }

    /**
     * 歌曲播放加载完成
     */
    waitingEndAct() {
    }

    /**
     * 歌曲播放中
     */
    playingWaveAct() {
    }

    /**
     * 提供开始按钮的世界坐标
     */
    getStartBtnWorldPos() {
    }
}

