
import { _decorator, Component, Node, Prefab, v3, JsonAsset, Vec3, resources, Texture2D, Vec2, Color, v2, log, math, game, Vec4, v4 } from 'cc';
import { Constant } from './constant';
import { Point } from './point';
import { PoolManager } from '../../Plugin/PoolManager';
import { PointDifficultyHandler } from './pointDifficultyHandler';
import { ThemeController } from './themeController';
import { PointSkinHandler } from './pointSkinHandler';
import { MathTool } from '../../Plugin/tools/mathTool';
const { ccclass, property } = _decorator;
const EXIST_MAX: number = 15       //存在的最大的节奏点数量
const HalfWidthOfHand: number = 1.5    //路的一半宽度

@ccclass('PointBuilder')
export class PointBuilder extends Component {

    @property({ type: JsonAsset })
    difficulty_json: JsonAsset = null;

    @property({ type: Prefab })
    pointPref: Prefab = null;

    @property({ type: Node })
    pointContainer: Node = null;

    @property({ type: Node })
    bombContainer: Node = null;

    @property({ type: Prefab })
    bigPointPrefab: Prefab = null;

    @property({ type: Prefab})
    rewardPrefab: Prefab = null;

    private _originPos: Vec3 = new Vec3();
    private _pointDistances: Array<number> = new Array<number>();    //节奏点的距离值数组
    private _pointHorVals: Array<number> = new Array<number>();      //节奏点的水平值数组
    private _pointMoveIds: Array<number> = new Array<number>();      //移动节奏点数组
    private _curEndId: number = 0;
    private _pointSkinHandler: PointSkinHandler;
    private _pointHandler: PointDifficultyHandler;
    private _timeTempLength: number = 0;
    private rewardNum: number = 0;
    private protectPointNum: number = 0;
    private rotateIdx = 0;

    public get TimeTempLength(): number {
        return this._timeTempLength;
    }

    onLoad() {
        this._originPos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z);
    }

    start() {
        this._pointSkinHandler = this.node.getComponent(PointSkinHandler);
    }

    private dealPointData(res: any, playHardLv: any) {
        this._pointHandler = new PointDifficultyHandler(res);
        this._pointHandler.configurateDifficultyData(this.difficulty_json.json[playHardLv]);
        this._pointHandler.calculateHorVal();
        this._timeTempLength = this._pointHandler.UltimatelyTimestamps.length;
        this._pointDistances = this._pointHandler.UltimatelyTimestamps.map((item) => {
            return item * Constant.SPEED;
        });
        this._pointHorVals = this._pointHandler.HorVals.map((item) => { return HalfWidthOfHand * item });
    }

    public init(res: any, lv: any) {
        this.builderReset();
        this.dealPointData(res, lv);
        this._pointSkinHandler.init(ThemeController.getInstance().CurThemeId);
    }

    /**
     * 初始化生成的节奏点
     */
    initCreatePoints() {
        for (let i = 0; i < EXIST_MAX; i++) {
            this.createPoint(i);
            this._curEndId++;
        }
    }

    /**
     * 唤醒生成的节奏点
     */
    awakeInitPoints() {
        for (const node of this.pointContainer.children) {
            setTimeout(() => {
                node.active = true;
            }, 500);
        }
    }

    /**
     * 生成节奏点
     * @param id 
     * @param cal 
     */
    public createPoint(id: number) {
        let dis = this.setPointZ(this._originPos.z + 1, id);
        let horx = this._pointHorVals[id];
        let pos = v3(horx, 0, dis)
        let intensiveTag = this._pointHandler.checkIsIntensivePoint(id);
        let text2D: any = null;
        let offset: Vec4 = v4(1, 1, 0, 0);
        let chip: Prefab = this._pointSkinHandler.pointChip();
        let tag = ThemeController.getInstance().checkUpdatePointSkin(id);
        let isUpdatePoint = tag && !intensiveTag
        if (isUpdatePoint) {
            this._pointSkinHandler.updatePointSkin();
            text2D = this._pointSkinHandler.pointTexture2DBig();
            this.protectPointNum = 5;
            pos.x = 0;
        } else {
            text2D = this._pointSkinHandler.pointTexture2D();
            let v2 = this._pointSkinHandler.pointOffset()
            offset = v4(0.5, 0.5, v2.x, v2.y)
        }
        let offsetTime = this._pointHandler.UltimatelyTimestamps[id + 1] ? (this._pointHandler.UltimatelyTimestamps[id + 1] - this._pointHandler.UltimatelyTimestamps[id]) : 0;
        let nodeCal = (node: Node) => {
            let point = node.getComponent(Point);
            point.UpdateSkinPoint = isUpdatePoint;
            point.initInfo(intensiveTag);
            point.updateSkin(text2D, offset, chip);
            node.setPosition(pos);
            let isMove = true;
            if(this._pointHandler.movePointMap.get(id) == null) {
                isMove = false;
            } else if(this._pointHandler.checkIsBomb(this._curEndId) || isUpdatePoint || intensiveTag) {
                isMove = false;
            }
            point.isMove = isMove;
        }
        this.createNode(isUpdatePoint? this.bigPointPrefab : this.pointPref, this.pointContainer, nodeCal);
        //生成炸弹
        if(this.protectPointNum > 0) {
            this.protectPointNum--;
        }
        else if (this._pointHandler.checkIsBomb(this._curEndId) && !intensiveTag) {
            let bombNum = this._pointHandler.BombMap.get(id);
            let xPoss = this.getBombXPos(bombNum, pos.x);
            for(let x of xPoss) {
                let bombCal = (node: Node) => {
                    let bombpos = v3(x, 0, dis)
                    let point = node.getComponent(Point);
                    point.initInfo(false);
                    let index = Math.floor((pos.x - x) / 1.5)
                    let bombTex = this._pointSkinHandler.bombTexture2D(index);
                    let bombOffset = this._pointSkinHandler.bombOffset(index);
                    let bombChip = this._pointSkinHandler.bombChip(index);
                    point.updateSkin(bombTex, v4(0.5, 0.5, bombOffset.x, bombOffset.y), bombChip);
                    node.setPosition(bombpos);
                }
                this.createNode(this.pointPref, this.bombContainer, bombCal);
            }
        }
    }

    public createRewardPoint(time: number) {
        if(this.rewardNum >= 30 || time + 6 < this._pointHandler.UltimatelyTimestamps[this._curEndId - 1] + this.rewardNum/4) {
            return;
        }
        this.rewardNum ++;
        let z = this.setPointZ(this._originPos.z + 1, this._curEndId - 1) + 20;
        let call = (node: Node) => {
            let Xdistance = MathTool.loopValue(this.rewardNum/2, 0, 3);
            let x = MathTool.signedConversion(Xdistance, 3); //将范围在0 ~ 2 区间的值 转换成 -1 ~ 1;
            let pos = v3(x, 0, z + this.rewardNum * 1.8);
            let point = node.getComponent(Point);
            point.initInfo(false);
            point.updateRewardSkin(this._pointSkinHandler.pointChip());
            node.setPosition(pos);
        }
        this.createNode(this.rewardPrefab, this.pointContainer, call);
    }

    createNode(_prefab: Prefab, partent: Node, cal: Function) {
        // 加载 Prefab
        let node = PoolManager.instance.getNode(_prefab, partent);
        cal(node);
    }

    public createNextPoint(time: number) {
        if(time + 4 >= this._pointHandler.UltimatelyTimestamps[this._curEndId]) {
            this.createPoint(this._curEndId);
            this._curEndId++;
        } else if(this._curEndId >= this._pointDistances.length) {
            this.createRewardPoint(time);
        }
    }

    checkRotate(time: number) {
        if(this._pointHandler.RotateTamps[this.rotateIdx] <= time) {
            this.rotateIdx ++;
            return true;
        }
        return false;
    }

    setPointZ(playerPosZ: number, id: number) {
        let localDis = this._pointDistances[id];
        let dis = playerPosZ + localDis;
        return dis;
    }

    public relativeMove(speed: number) {
        let pos = this.node.getPosition();
        pos.z -= speed;
        this.node.setPosition(pos);
    }

    /**
     * 清理节奏点
     */
    private clearPoints() {
        //  this.pointContainer.removeAllChildren();
        while (this.pointContainer.children.length > 0) {
            this.pointContainer.children[0].getComponent(Point).cicyeBack();
            PoolManager.instance.putNode(this.pointContainer.children[0]);
        }
    }

    /**
     * 清理炸弹
     */
    clearBombs() {
        while (this.bombContainer.children.length > 0) {
            this.bombContainer.children[0].getComponent(Point).cicyeBack();
            PoolManager.instance.putNode(this.bombContainer.children[0]);
        }
    }

    private getBombXPos(num: number, pointXPos: number): number[] {
        let xs: number[] = [];
        if(num == 1) {
            if(pointXPos > 0) {
                xs.push(pointXPos - 2)
            } else {
                xs.push(pointXPos + 2)
            }
        } else if(pointXPos >= 0.75){
            xs.push(pointXPos - 3)
            xs.push(pointXPos - 1.5)
        } else if(pointXPos <= -0.75) {
            xs.push(pointXPos + 1.5)
            xs.push(pointXPos + 3)
        } else {
            xs.push(pointXPos - 1.5)
            xs.push(pointXPos + 1.5)
        }
        return xs;
    }

    /**
     * 生成管理器重置
     */
    public builderReset() {
        log("生成管理器重置")
        this._curEndId = 0;
        this.rewardNum = 0;
        this.protectPointNum = 0;
        this.rotateIdx = 0;
        this.node.setPosition(this._originPos);
        this.clearPoints();
        this.clearBombs();
    }
}


