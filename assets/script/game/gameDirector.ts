
import { _decorator, Component, Node, JsonAsset, SpriteFrame, Sprite, color, Color, UIOpacity, tween, director, misc, Label, ProgressBar, Prefab, Tween, v3, view, easing, math, assetManager, instantiate, getWorldTransformUntilRoot, Camera, AudioClip, game, UITransform, ParticleSystem2D, v4 } from 'cc';
import { PointBuilder } from './pointBuilder';
import { Player } from './player';
import { CameraController } from './cameraController';
import AudioManager from '../../Plugin/audioPlayer/AudioManager';
import { Constant } from './constant';
import { ThemeController } from './themeController';
import { Facade } from '../../Plugin/core/puremvc/patterns/facade/Facade';
import { CommandDefine } from '../puremvc/commandDefine';
import { PanelType } from '../../Plugin/UIFrameWork/PanelType';
import GloalDefine, { ConsumablesType } from '../GloalDefine';
import { PoolManager } from '../../Plugin/PoolManager';
import { ProxyDefine } from '../puremvc/proxyDefine';
import { GameUserPxy } from '../puremvc/Proxy/gameUserPxy';
import RecController, { RecState } from '../../Plugin/bytedance_screenRec/recController';
import { AudioEffectCtrl, ClipEffectType } from '../../Plugin/AudioEffectCtrl';
import { Point } from './point';
import { AppPlatformController, App_Platform } from '../../Plugin/AppPlatformController';
import { ApplicationManager } from '../applicationManager';
const { ccclass, property } = _decorator;
const deltaX_Max: number = 50000
const HMove_factor: number = 2;             //子弹左右闪避的速度
const HOffset_Max: number = 400;  //子弹偏移的最大值
export enum PlayHardLv {
    Normal = 0,
    Hard = 1,
    Hell = 2
}

/**
 * 游戏阶段
 */
export enum GamePhase {
    DEFAULT,     //默认阶段
    READY,       //准备阶段
    UNDERWAY,    //进行中
    REWARD,     //奖励阶段
    NEXTCHALLENGEREADY,   //挑战模式准备下首歌阶段
    PAUSE,       //暂停
    FINISHEVE,      //结束
    FINISH       //结束
}

const pointYSize = 100;
const pointXSize = 150;

@ccclass('GameDirector')
export class GameDirector extends Component {

    @property({ type: Node })
    canvas: Node = null;

    @property({ type: Node })
    guidance: Node = null;

    @property({ type: JsonAsset })
    localMusicTable: JsonAsset = null;

    @property({ type: PointBuilder })
    pointBuilder: PointBuilder = null;

    // @property({ type: Player })
    player: Player = null;

    @property({ type: CameraController })
    cameraController: CameraController = null;

    @property({ type: Node })
    missTip: Node = null;

    @property({ type: Sprite})
    hitTIp: Sprite = null;

    @property({ type: Node })
    starGroup: Node = null;

    @property({ type: Node })
    tunnel: Node = null;

    @property({ type: ProgressBar })
    progressBar: ProgressBar = null;

    @property({ type: Label })
    scoreLabel: Label = null;

    @property({ type: Prefab })
    comboPre: Prefab = null;

    @property({ type: Camera })
    mainCamera: Camera = null;

    @property({ type: Node })
    private hearts: Node[] = [];

    @property({ type: Color})
    private hitTipSF: Color[] = [];

    @property({ type: Node})
    playerContent: Node = null;
    

    public _jsonRes: Array<any> = new Array<any>();
    private _clipRes: AudioClip = null;
    private _curPhase: GamePhase = GamePhase.DEFAULT;
    private _proStarGrade: number = null; //星星的进度等级
    private _proceedTime: number = 0;               //游戏正常进行的时间
    private _scoreVal: number = 0;            //分数
    private _diaVal: number = 0;            //分数
    private _comboNum: number = 0;    //连击数
    private _reviveNum: number = 0;    //复活次数
    private _comboContent: Node = null;
    private _gameUserPxy: GameUserPxy = null;
    private _isWin: boolean = false;
    private _isShowTunal: boolean = false;
    // private _isNew: boolean = false;   //是否新玩家
    private _playHardLv: PlayHardLv           //游戏难度
    private _hp: number = 3;            //生命值
    private _power: number = 0;         //充能
    private _invincible: boolean = false;
    private curPlayerName: string = '';

    private playerPrefabs: Prefab[] = [];
    private rePlayer: boolean = false;


    private _isGame: boolean = false;
     
    public get IsWin(): boolean {
        return this._isWin;
    }

    public get CurPhase(): GamePhase {
        return this._curPhase
    }

    public get ProStarGrade(): number {
        return this._proStarGrade
    }

    public get ScoreVal(): number {
        return this._scoreVal;
    }

    public get DiaVal(): number {
        return this._diaVal;
    }

    public get ProceedTime(): number {
        return this._proceedTime;
    }

    public get ReviveNum(): number {
        return this._reviveNum;
    }

    public get power(): number {
        return this._power;
    }

    public get hp(): number {
        return this._hp;
    }

    public set hp(num: number) {
        this._hp = num;
        this.refreshHeart()
        if (this._hp <= 0) {
            this.gameFailTemp();
        }
    }

    public get IsGame(): boolean {
        return this._isGame;
    }

    public set IsGame(is: boolean) {
        this._isGame = is;
    }

    private static _instance: GameDirector;
    public static getInstance(): GameDirector {
        return GameDirector._instance
    }

    onLoad() {
        this.init();
        assetManager.loadBundle("players", Prefab, (error, bundle) => {
            bundle.loadDir("prefabs", Prefab, (error, res) => {
                this.playerPrefabs = res;
                if(this.rePlayer) {
                    this.initPlayer();
                }
            })
        })
        this._gameUserPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_UserPxy) as GameUserPxy;
        this._comboContent = this.canvas.getChildByName("ComboContent");
        this.canvas.active = false;
    }

    start() {
        this.missTip.getComponent(UIOpacity).opacity = 0;
    }

    update(dt: number) {
        let localSpeed = dt * Constant.SPEED;
        if (this.CurPhase == GamePhase.UNDERWAY) {
            if((AppPlatformController.Platform != App_Platform.GP_Oppo && AppPlatformController.Platform != App_Platform.GP_Vivo 
                && AppPlatformController.Platform != App_Platform.GP_Tiktok)
             && !ApplicationManager.getInstance().musicAudio.playing) {
                return;
            }
            this.updateProBar(this.getProTime())
            this.pointBuilder.relativeMove(localSpeed);
            this._proceedTime += dt;
            this.pointBuilder.createNextPoint(this._proceedTime);
            if (this.getProTime() > 0.4 && !this._isShowTunal) {
                this._isShowTunal = true;
                this.showTunnel();
            }
            this.updatePoint();
            if (this.getProTime() >= 1) {
                this.reward();
            }
        } else if (this.CurPhase == GamePhase.REWARD) {
            this.pointBuilder.createNextPoint(this._proceedTime);
            this.pointBuilder.relativeMove(localSpeed);
            this._proceedTime += dt;
            this.updateRewardPoint();
        }
    }

    updatePoint() {
        let playerPos = this.playerContent.position;
        for (let i = 0; i < this.pointBuilder.pointContainer.children.length; i ++) {
            let pointInfo = this.pointBuilder.pointContainer.children[i].getComponent(Point);
            if (!pointInfo.Hit && !pointInfo.isMiss) {
                let pointWorldPos = pointInfo.node.getWorldPosition();
                let pointPos = this.mainCamera.convertToUINode(pointWorldPos, this.canvas)
                if (Math.abs(pointPos.y - playerPos.y) <= pointYSize) {
                    if (pointInfo.UpdateSkinPoint) {
                        this.player.hitBigPoint(pointInfo);
                        this.player.updateColor(ThemeController.getInstance().CurBgId);
                        this.hitTIp.color = this.hitTipSF[ThemeController.getInstance().CurBgId];
                        this.onHit();
                    } else if (Math.abs(pointPos.x - playerPos.x) < pointXSize) {
                        this.player.hit(pointInfo);
                        this.onHit();
                    }
                    
                } else if (playerPos.y - pointPos.y > pointYSize) {
                    this.player.miss(pointInfo);
                    this.onMiss();
                } else {
                    break;
                }
            }
        }
        for (let i = 0; i < this.pointBuilder.bombContainer.children.length; i ++) {
            let bombInfo = this.pointBuilder.bombContainer.children[i].getComponent(Point);
            if (bombInfo.model.active == true && !bombInfo.isMiss) {
                let pointWorldPos = bombInfo.node.getWorldPosition();
                let pointPos = this.mainCamera.convertToUINode(pointWorldPos, this.canvas)
                if (Math.abs(pointPos.y - playerPos.y) <= pointYSize * (1 / 2)) {
                    if (Math.abs(pointPos.x - playerPos.x) < pointXSize * (3 / 4)) {
                        this.player.hitBomb(bombInfo);
                        this.onHitBomb()
                    }
                } else if (playerPos.y - pointPos.y > pointYSize) {
                    this.player.missBomb(bombInfo);
                } else {
                    break;
                }
            }
        }
    }

    updateRewardPoint() {
        if (this.pointBuilder.pointContainer.children.length < 1) {
            this.gameWin();
            return;
        }
        let playerPos = this.playerContent.position;
        for (let i = 0; i < this.pointBuilder.pointContainer.children.length; i ++) {
            let pointInfo = this.pointBuilder.pointContainer.children[i].getComponent(Point);
            if (pointInfo.model.active == true && !pointInfo.isMiss) {
                let pointWorldPos = pointInfo.node.getWorldPosition();
                let pointPos = this.mainCamera.convertToUINode(pointWorldPos, this.canvas)
                if (Math.abs(pointPos.y - playerPos.y) <= pointYSize) {
                    if (Math.abs(pointPos.x - playerPos.x) < pointXSize){
                        this._diaVal++; 
                        pointInfo.hitDia();
                        this.player.rotate()
                        AudioEffectCtrl.getInstance().playEffect(ClipEffectType.gameGetDia);
                    }
                } else if (playerPos.y - pointPos.y > pointYSize) {
                    pointInfo.miss()
                } else {
                    break;
                }
            }
        }
    }

    _registerTouchEvent() {
        this.canvas.on(Node.EventType.TOUCH_START, this._onTouchBegan, this, true);
        this.canvas.on(Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, true);
    };

    _unRegisterTouchEvent() {
        this.canvas.off(Node.EventType.TOUCH_START, this._onTouchBegan, this, true);
        this.canvas.off(Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, true);

    };

    // touch event handler
    _onTouchBegan(event: any, captureListeners: any) {
        if (this.CurPhase == GamePhase.READY) {
            this.go();
        } else if(this.CurPhase == GamePhase.PAUSE){
            this.reviveMove();
        }
    };

    _onTouchMoved(event: any, captureListeners: any) {
        let deltaX = event.getDeltaX();
        deltaX = misc.clampf(deltaX, -deltaX_Max, deltaX_Max);
        let targetX = this.playerContent.position.x + HMove_factor * deltaX;
        targetX = misc.clampf(targetX, -HOffset_Max, HOffset_Max);
        let pos = this.playerContent.getPosition();
        pos.x = targetX;
        this.playerContent.setPosition(pos);
    };

    /**
    * 获得一局游戏的时间
    */
    getSumDurTime() {
        let count = this._jsonRes.length;
        return this._jsonRes[count - 1].time / 1000;
    }

    /**
    * 获得当前游戏的时间进度
    */
    getProTime() {
        return this._proceedTime / this.getSumDurTime()
    }

    /**
    * 更新游戏进度显示
    */
    public updateProBar(val: number) {
        this.progressBar.progress = val;
        this.updateProStar(val)
    }

    /**
    * 更新分数显示
    */
    updateScoreLabel(val: number) {
        this.scoreLabel.string = val.toString();
        this.updateScoreAct();
    }

    /**
    * 更新分数显示动画
    */
    private updateScoreAct() {
        let bg = this.scoreLabel.node;
        tween(bg).stop();
        tween(bg).to(0.15, { scale: v3(1.2, 1.2, 1.2) }).to(0.15, { scale: v3(1, 1, 1) }).start();
    }

    private showHardLvTip(lv: PlayHardLv, cal: Function) {
        let tipPath = '';
        switch (lv) {
            case PlayHardLv.Normal:
                cal && cal();
                return;
            case PlayHardLv.Hard:
                tipPath = 'hardTip'
                break;
            case PlayHardLv.Hell:
                tipPath = 'hellTip'
                break;
            default:
                break;
        }
        let bundle = assetManager.getBundle('gameRomate');
        if (bundle) {
            bundle.load(tipPath, Prefab, (err, prefab: Prefab) => {
                let tip = instantiate(prefab);
                this.canvas.addChild(tip);
                AudioEffectCtrl.getInstance().playEffect(ClipEffectType.warnClip);
                setTimeout(() => {
                    tip.destroy();
                }, 5000);
                setTimeout(() => {
                    cal && cal();
                }, 1000);
            })
        } else {
            assetManager.loadBundle('gameRomate', (err, bundle) => {
                bundle.load(tipPath, Prefab, (err, prefab: Prefab) => {
                    let tip = instantiate(prefab);
                    this.canvas.addChild(tip);
                    AudioEffectCtrl.getInstance().playEffect(ClipEffectType.warnClip);
                    setTimeout(() => {
                        tip.destroy();
                    }, 5000);
                    setTimeout(() => {
                        cal && cal();
                    }, 1000);
                })
            });
        }

    }

    /**
    * 初始化
    */
    private init() {
        if (!GameDirector._instance) {
            GameDirector._instance = this;
        } else if (GameDirector._instance != this) {
            this.destroy();
        }
        this.cameraController.init(this.playerContent.position);
    }

    public initGame() {
        this._proStarGrade = null;
        this._proceedTime = 0;
        this._scoreVal = 0;
        this._diaVal = 0;
        this._reviveNum = 0;
        this._isWin = false;
        this.tunnel.active = false;
        this._isShowTunal = false;
        this._comboNum = 0;
        this.hp = 3;
        for (let i = 0; i < this.starGroup.children.length; i++) {
            this.starGroup.children[i].children[0].active = false;
        }
        this.updateScoreLabel(this._scoreVal);
        this.updateProBar(0);
        this.cameraController.reset();
        this.guidance.active = true;
    }

    public gameConfigure(clipRes: any, jsonRes: any) {
        this._clipRes = clipRes;
        this._jsonRes = (jsonRes) as Array<any>;
        ThemeController.getInstance().CurBgId = Math.floor(Math.random() * 3);
        ThemeController.getInstance().stopMove();
        this.pointBuilder.init(this._jsonRes, this._playHardLv);
        this.pointBuilder.initCreatePoints();
        this.initPlayer();
        this.hitTIp.color = this.hitTipSF[ThemeController.getInstance().CurBgId];
        let playerPos = this.mainCamera.convertToUINode(v3(0, 0, 0), this.canvas);
        this.playerContent.setPosition(playerPos);
        this.canvas.active = true;
        this.showHardLvTip(this._playHardLv, this.action.bind(this))
    }

    /**
    * 游戏难度
    */
    public switchPlayHardLv(str: string) {
        switch (str) {
            case "hard":
                this._playHardLv = PlayHardLv.Hard
                break;
            case "superhard":
                this._playHardLv = PlayHardLv.Hell
                break;
            default:
                this._playHardLv = PlayHardLv.Normal
                break;
        }
    }

    /**
    * 启动游戏
    */
    public action() {
        this._curPhase = GamePhase.READY;
        this._registerTouchEvent();
    }

    private go() {
        this.pointBuilder.awakeInitPoints();
        ThemeController.getInstance().startMove();
        this._curPhase = GamePhase.UNDERWAY;
        this.guidance.active = false;
        AudioManager.GetInstance(AudioManager).player.playMusic(this._clipRes, false, this._gameUserPxy.getMusicVolume());
        if (RecController.getInstance().recState == RecState.WaitRecing) {
            Facade.getInstance().sendNotification(CommandDefine.StartRec);
        }
        else if (RecController.getInstance().recState == RecState.InRecing) {
            Facade.getInstance().sendNotification(CommandDefine.EndRec);
        }
    }

    /**
     * 奖励阶段
     */
    private reward() {
        this._curPhase = GamePhase.REWARD;
    }

    /**
    * 得分
    */
    public goal(baseScore = GloalDefine.UnitScore, mult = 0) {
        this._scoreVal += baseScore * (1 + mult) * (this.power >= 100 ? 2 : 1);
        this.updateScoreLabel(this._scoreVal);
    }

    /**
     * 撞击得分
     */
    onHit() {
        this.goal();
        AudioEffectCtrl.getInstance().phoneVibrate();
        // this.gun.resetSystem();
        this.cameraController.shakeCamera();
        this.updateCombo(++this._comboNum);
        this.hitTIp.getComponent(UIOpacity).opacity = 255;
        tween(this.hitTIp.getComponent(UIOpacity)).to(0.5, { opacity: 0 }).start();
    }

    /**
     * 撞击bome
     */
    onHitBomb() {
        this._comboNum = 0;
        AudioEffectCtrl.getInstance().phoneVibrate();
    }

    /**
     * 没撞到
     */
    onMiss() {
        this._comboNum = 0;
        this.missTip.getComponent(UIOpacity).opacity = 255;
        tween(this.missTip.getComponent(UIOpacity)).to(0.5, { opacity: 0 }).start();
        !this._invincible && this.scheduleOnce(() => {
            this.hp--;
            this.toInvincible()
        }, 0.2);
    }

    /**
     * 刷新生命显示
     */
    refreshHeart() {
        for (let i = 0; i < 3; i++) {
            if (this.hearts[i].active && i + 1 > this.hp) {
                this.hearts[i].active = false;
            }
            if (!this.hearts[i].active && i + 1 <= this.hp) {
                this.hearts[i].active = true;
            }
        }
    }

    /**
     * 计算奖励
     */
    calculationReward() {
        this._diaVal += Math.min(50, Math.floor(this._scoreVal / 15));
    }

    /**
     * 游戏失败暂存
     */
    public gameFailTemp() {
        ThemeController.getInstance().stopMove();
        this._unRegisterTouchEvent();
        this._curPhase = GamePhase.PAUSE;
        AudioManager.GetInstance(AudioManager).player.pauseMusic();
        Facade.getInstance().sendNotification(CommandDefine.PushPanelReqiest, PanelType.Revive);
    }

    /**
     * 游戏失败
     */
    public gameFail() {
        this.IsGame = false;
        this.calculationReward();
        this.pointBuilder.builderReset();
        this.canvas.active = false;
    }

    /**
     * 游戏胜利
     */
    public gameWin() {
        this.IsGame = false;
        this._isWin = true;
        this.calculationReward();
        this.canvas.active = false;
        this._curPhase = GamePhase.FINISH;
        this._unRegisterTouchEvent();
        this.pointBuilder.builderReset();
        this.scheduleOnce(() => {
            Facade.getInstance().sendNotification(CommandDefine.PushPanelReqiest, PanelType.Settle_Normal);
        }, 2);

    }

    /**
     * 游戏复活
     */
    public gameRevive() {
        this._registerTouchEvent();
        for (let i = 0; i < this.pointBuilder.pointContainer.children.length; i ++) {
            let pointInfo = this.pointBuilder.pointContainer.children[i].getComponent(Point);
            if (!pointInfo.Hit && !pointInfo.isMiss) {
                let pointWorldPos = pointInfo.node.getWorldPosition();
                let playerPos = this.mainCamera.convertToUINode(v3(pointWorldPos.x, 0, 0), this.canvas);
                this.playerContent.setPosition(playerPos);
                break;
            }
        }
    }

    private reviveMove() {
        this._curPhase = GamePhase.UNDERWAY;
        ThemeController.getInstance().startMove();
        this._reviveNum++;
        this.hp = 3;
        this.pointBuilder.clearBombs();
        AudioManager.GetInstance(AudioManager).player.resumeMusic();
        this.toInvincible();
    }

    /**
    * 更新进度星星
    */
    private updateProStar(val: number) {
        if (val > 0.3 && this._proStarGrade == null) {
            this._proStarGrade = 0;
            this.starGroup.children[this._proStarGrade].children[0].active = true;
        }
        else if (val > 0.6 && this._proStarGrade == 0) {
            this.starGroup.children[++this._proStarGrade].children[0].active = true;

        }
        else if (val > 0.95 && this._proStarGrade == 1) {
            this.starGroup.children[++this._proStarGrade].children[0].active = true;
        }
    }

    /**
   * 更新Combo
   */
    updateCombo(val: number) {
        let combo = this.showCombo(val);
        let label = combo.getComponentInChildren(Label);
        label.string = "x" + val;
    }

    /**
    * 显示Combo
    */
    private showCombo(val: number) {
        let combo = PoolManager.instance.getNode(this.comboPre, this._comboContent);
        Tween.stopAllByTarget(combo);
        let pos = combo.getPosition();
        pos.x = 0;
        combo.scale = v3(0, 0, 0);
        pos.y = view.getVisibleSize().height / 2 - 400;
        combo.setPosition(pos);
        tween<UIOpacity>(combo.getComponent(UIOpacity)).to(0.2, { opacity: 255 }).delay(0.3).by(0.5, { opacity: -255 }).call(() => {
            PoolManager.instance.putNode(combo)
        }).start();
        tween(combo)
            .to(0.2, { scale: v3(1, 1, 1) })
            .to(0.3, { scale: v3(0.8, 0.8, 0.8) })
            .start();
        return combo;
    }

    /**
     * 清理Combo
     */
    cleanAllCombo() {
        while (this._comboContent.children.length > 0) {
            PoolManager.instance.putNode(this._comboContent.children[0])
        }
    }

    /**显示隧道 */
    showTunnel() {
        this.tunnel.active = true;
        this.tunnel.setPosition(v3(this.tunnel.position.x, this.tunnel.position.y, 200));
        tween(this.tunnel).by(15, { position: v3(0, 0, -500) }, { easing: easing.quadOut })
            .start();
    }

    /**
     * 无敌
     */
    private toInvincible() {
        this._invincible = true;
        this.scheduleOnce(() => {
            this._invincible = false;
        }, 3);
    }

    initPlayer() {
        let gameUserPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_UserPxy) as GameUserPxy;
        let name = gameUserPxy.getUseSkinName();
        // let name = 'echnologyEye';
        let prefab: Prefab = null;
        if(this.curPlayerName != name) {
            prefab = this.playerPrefabs.find((pre) => {
                return pre.data.name == name;
            });
            if(prefab == null) {
                this.rePlayer = true;
                return;
            }
            this.playerContent.destroyAllChildren();
            let node = instantiate(prefab);
            this.playerContent.addChild(node);
            this.player = node.getComponent(Player);
            this.player.difen();
            this.curPlayerName = name;
        }
        this.player.updateColor(ThemeController.getInstance().CurBgId);
    }
}


