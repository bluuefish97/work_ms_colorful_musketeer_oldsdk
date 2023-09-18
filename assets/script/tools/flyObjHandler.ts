
import { _decorator, Component, Node, Vec2, v2, Prefab, game, view, v3, tween, UIOpacity, Vec3, easing, UITransform } from 'cc';
import { ConsumablesType } from '../GloalDefine';
import { PoolManager } from '../../Plugin/PoolManager';
import { NodeUtil } from '../../Plugin/tools/NodeUtil';
const { ccclass, property } = _decorator;

@ccclass('FlyObjHandler')
export class FlyObjHandler extends Component {
    @property(Prefab)
    diaPrefab: Prefab = null;

    // @property(Prefab)
    // powerPrefab: Prefab = null;

    private startPos: Vec3 = v3();
    protected flyDur = 0.8   //0.8;
    protected radius = 250;

    private static _instance: FlyObjHandler;
    public static getInstance(): FlyObjHandler {
        return FlyObjHandler._instance
    }

    onLoad() {
        this.globalInit();
    }

    /**
    * 全局初始化
    */
    private globalInit() {
        if (!FlyObjHandler._instance) {
            FlyObjHandler._instance = this;
        } else if (FlyObjHandler._instance != this) {
            this.destroy();
        }
        game.addPersistRootNode(this.node);
        this.startPos = v3();
    }

    playOnerAnim(stPos: Vec3, edPos: Vec3, type: ConsumablesType) {
        let localstPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(stPos);
        let localedPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(edPos);
        let prefab = this.diaPrefab;
        let coin = PoolManager.instance.getNode(prefab, this.node);
        coin.setPosition(localstPos);
        coin.scale = v3(1,1,1);
        coin.getComponent(UIOpacity).opacity = 255;
        let onEndFlyAct = (coin: Node) => {
            tween(coin.getComponent(UIOpacity)).to(0.5, { opacity: 0 }).start();
            tween(coin).to(0.5, { scale: v3(5,5,5) }).call(() => {
                PoolManager.instance.putNode(coin);
            }).start();
        }

        tween(coin).to(0.5,{position:v3()}).start();
       // this.playAni(coin.getComponentInChildren(cc.Animation), null, null, 3, cc.WrapMode.Loop);
        tween(coin).parallel(
            tween(coin).to(this.flyDur, { scale:v3(1,1,1) }),
            tween(coin).call(
                () => {
                    let point1offSetX = 200 // 400;
                    let point1offSetY = 200 //400;
                    let point2offSetX = 200   //200
                    let point2offSetY =  200  //-200
                    this.FlyAnimation(localstPos, localedPos, this.flyDur, coin, point1offSetX, point1offSetY, point2offSetX, point2offSetY, () => {
                        onEndFlyAct(coin);
                    });
                })
        )
            .start();


    }

    playAnim(endPos: Vec3, type: ConsumablesType, count: number = null) {
        count = count == null ? Math.random() * 5 + 10 : count;
        // count = 1;
        let localEndPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(endPos);
        //localEndPos=v3(300,300,0);
        this.playCoinFlyAnim(type, count, this.startPos, localEndPos, this.radius);
    }

    playCoinFlyAnim(type: ConsumablesType, count: number, stPos: Vec3, edPos: Vec3, r: number = 900) {
        // 确保当前节点池有足够的金币
        let prefab: Prefab;
        let effect;
        switch (type) {
            case ConsumablesType.dia:
                prefab = this.diaPrefab
                // effect = ClipEffectType.normalBtnClip;
                break;
            // case ConsumablesType.power:
            //     prefab = this.powerPrefab
            //     break;
        }

        // 生成圆，并且对圆上的点进行排序
        let points = this.getCirclePoints(r, stPos, count);
        let coinNodeList = points.map(pos => {
            let coin = PoolManager.instance.getNode(prefab, this.node);
            coin.setPosition(stPos);
            return {
                node: coin,
                stPos: stPos,
                mdPos: pos,
                edPos: edPos,
                dis: (pos.clone() as Vec3).subtract(edPos).length()
            };
        });
        coinNodeList = coinNodeList.sort((a, b) => {
            if (a.dis - b.dis > 0) return 1;
            if (a.dis - b.dis < 0) return -1;
            return 0;
        });
        // 执行金币落袋的动画
        coinNodeList.forEach((item, idx) => {
            item.node.getComponent(UIOpacity).opacity = 255;
            tween(item.node)
                .to(0.3, { position: v3(item.mdPos.x, item.mdPos.y, 0), scale: v3(1.5, 1.5, 1.5) }, { easing: easing.quintOut })
                .delay(idx * 0.05)  //0.05
                .parallel(
                    tween(item.node).to(this.flyDur, { scale: v3(1, 1, 1) }),
                    tween(item.node).call(
                        () => {
                            let point1offSetX = (item.mdPos.x - item.stPos.x) * 300 * (1 / Math.abs((item.mdPos.x - item.stPos.x))) - 10 * (1 / Math.abs((item.mdPos.x - item.stPos.x))) // (item.mdPos.x - item.stPos.x) *
                            let point1offSetY = (item.mdPos.y - item.stPos.y) * 300 * (1 / Math.abs(item.mdPos.y - item.stPos.y)) - 5 * Math.abs(item.mdPos.y - item.stPos.y) // (item.mdPos.y - item.stPos.y) *
                            let point2offSetX = 200
                            let point2offSetY = -200
                            this.FlyAnimation(item.mdPos, edPos, this.flyDur, item.node, point1offSetX, point1offSetY, point2offSetX, point2offSetY, () => {
                                this.onEndFlyAct(item.node);
                            });
                        })
                )
                .start();
        });
    }

    onEndFlyAct(node: Node) {
        PoolManager.instance.putNode(node);
    }

    // playAni(aniMation: Animation, dur:number, speed:number, _repeatCount:number, wrapMode: WrapMode) {
    //     var state = aniMation.play();
    //     let curClip = aniMation.defaultClip;
    //     state.duration = dur ? dur : curClip.duration;
    //     state.speed = speed ? speed : state.speed;
    //     state.wrapMode = wrapMode;
    //     state.repeatCount = _repeatCount;
    //     console.log("curClip.wrapMode ", curClip.wrapMode);


    // }

    /**
     * 以某点为圆心，生成圆周上等分点的坐标
     *
     * @param {number} r 半径
     * @param {cc.Vec2} pos 圆心坐标
     * @param {number} count 等分点数量
     * @param {number} [randomScope=80] 等分点的随机波动范围
     * @returns {cc.Vec2[]} 返回等分点坐标
     */
    getCirclePoints(r: number, pos: Vec3, count: number, randomScope: number = 250): Vec3[] {
        let points = [];
        let radians = (Math.PI / 180) * Math.round(360 / count);
        for (let i = 0; i < count; i++) {
            let x = pos.x + r * Math.sin(radians * i);
            let y = pos.y + r * Math.cos(radians * i);
            let xRandom = Math.random() * randomScope * view.getVisibleSize().width / view.getVisibleSize().height;
            points.unshift(v3(x + xRandom, y + Math.random() * randomScope, 0));
        }

        return points;
    }

    //bezier动画
    protected FlyAnimation(firstPos: Vec3, endPos: Vec3, dur: number, obj: Node, point1offSetX: number, point1offSetY: number, point2offSetX: number, point2offSetY: number, _cal: Function = null) {
        let cPoint1 = v3(firstPos.x + point1offSetX, firstPos.y + point1offSetY);
        let cPoint2 = v3(firstPos.x + point2offSetX, firstPos.y + point2offSetY);
        let bezierPonts = [cPoint1, cPoint2, endPos];
        let bezierProgress = NodeUtil.getBezierProgress(bezierPonts);
        tween(obj).to(dur, { position: endPos }, {
            progress: bezierProgress
        }).call(() => { _cal && _cal() }).start();
    }

}