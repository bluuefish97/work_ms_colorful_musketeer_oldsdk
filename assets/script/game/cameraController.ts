
import { _decorator, Component, Node, Tween, tween, easing, Vec3, v3, math, misc, Camera } from 'cc';
import { Constant } from './constant';
const { ccclass, property } = _decorator;
const CameraHorizontalDodge_Max: number = 0.6      //摄像头偏移的最大值

const shakeSmallContineMax: number = 3;           //跟随子弹的小幅度抖动的最大连续次数
const shakeLargeContineMax: number = 2;           //跟随子弹的大幅度抖动的最大连续次数
const shakeBoundaryVal = 0.3//    0.4;                       //幅度的边界值
const shakeDivideVal = shakeBoundaryVal / 2;                       //幅度的分界线值

@ccclass('CameraController')
export class CameraController extends Component {
    @property({ type: Node })
    mainCameraRoot: Node = null;

    @property(Node)
    roadCameraRoot: Node = null;

    @property(Node)
    envCameraRoot: Node = null;

    private curShakeSmallContineTime: number = 0;       //目前跟随子弹的小幅度抖动的连续次数
    private curShakeLargeContineTime: number = 0;       //目前跟随子弹的大幅度抖动的连续次数
    private _shakeVetor = v3();
    private _reverseVetor = v3();
    private isPressState: boolean = null;
    private targetSlowDownTween: any = null;
    private targetAddSpeedTween: any = null;
    private env_targetSlowDownTween: Tween<any> = null;
    private env_targetAddSpeedTween: Tween<any> = null;
    private env_roadAddSpeedTween: Tween<any> = null;
    private env_roadSlowDownTween: Tween<any> = null;

    private offsetDis: number = 0;
    private shakeTweenID: number = null;

    private originMainCameraRootPos: Vec3 = new Vec3(0, 0, 0)
    private originRoadCameraRootPos: Vec3 = new Vec3(0, 0, 0)
    private originEnvCameraRootPos: Vec3 = new Vec3(0, 0, 0)

    private originMainCameraRot: Vec3 = new Vec3(0, 0, 0)
    private originRoadCameraRot: Vec3 = new Vec3(0, 0, 0)
    private originEnvCameraRot: Vec3 = new Vec3(0, 0, 0)

    private angle = 0.16;
    onLoad() {
        this.originMainCameraRootPos = new Vec3(this.mainCameraRoot.position.x, this.mainCameraRoot.position.y, this.mainCameraRoot.position.z);
        this.originRoadCameraRootPos = new Vec3(this.roadCameraRoot.position.x, this.roadCameraRoot.position.y, this.roadCameraRoot.position.z);
        this.originEnvCameraRootPos = new Vec3(this.envCameraRoot.position.x, this.envCameraRoot.position.y, this.envCameraRoot.position.z);

        let target0 = this.mainCameraRoot.getComponentInChildren(Camera).node;
        this.originMainCameraRot = new Vec3(target0.eulerAngles.x, target0.eulerAngles.y, target0.eulerAngles.z);
        let target1 = this.roadCameraRoot.getComponentInChildren(Camera).node;
        this.originRoadCameraRot = new Vec3(target1.eulerAngles.x, target1.eulerAngles.y, target1.eulerAngles.z);
        let target2 = this.envCameraRoot.getComponentInChildren(Camera).node;
        this.originEnvCameraRot = new Vec3(target2.eulerAngles.x, target2.eulerAngles.y, target2.eulerAngles.z);
    }

    init(playerPos: Vec3) {
        this.offsetDis = playerPos.z - this.node.position.z;
    }

    /**
   *摄像头震动 
   */
    shakeCamera() {
        let x = this.angle * this.getRandomNum();
        let y = this.angle * this.getRandomNum();
        // let z = this.angle * this.getRandomNum();
        let z = 0;
        tween(this.mainCameraRoot.getComponentInChildren(Camera).node).by(0.03, { eulerAngles: v3(x, y, z / 2) })
            .to(0.03, { eulerAngles: this.originMainCameraRot }).start();
        tween(this.envCameraRoot.getComponentInChildren(Camera).node).by(0.03, { eulerAngles: v3(x, y, z / 2) })
            .to(0.03, { eulerAngles: this.originEnvCameraRot }).start();
        tween(this.roadCameraRoot.getComponentInChildren(Camera).node).by(0.03, { eulerAngles: v3(x, y, z / 2) })
            .to(0.03, { eulerAngles: this.originRoadCameraRot }).start();
    }

    private getRandomNum() {
        return math.random() > 0.5? 1 : -1;
    }

    public reset() {
        this.isPressState = false;
        Tween.stopAllByTarget(this.mainCameraRoot);
        Tween.stopAllByTarget(this.roadCameraRoot)
        Tween.stopAllByTarget(this.envCameraRoot)

        Tween.stopAllByTarget(this.mainCameraRoot.getComponentInChildren(Camera).node);
        Tween.stopAllByTarget(this.roadCameraRoot.getComponentInChildren(Camera).node)
        Tween.stopAllByTarget(this.envCameraRoot.getComponentInChildren(Camera).node)

        this.mainCameraRoot.setPosition(this.originMainCameraRootPos);
        this.roadCameraRoot.setPosition(this.originRoadCameraRootPos);
        this.envCameraRoot.setPosition(this.originEnvCameraRootPos);

        this.mainCameraRoot.getComponentInChildren(Camera).node.eulerAngles = this.originMainCameraRot;
        this.roadCameraRoot.getComponentInChildren(Camera).node.eulerAngles = this.originRoadCameraRot;
        this.envCameraRoot.getComponentInChildren(Camera).node.eulerAngles = this.originEnvCameraRot;


    }

}
