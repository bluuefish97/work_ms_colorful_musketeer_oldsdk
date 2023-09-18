import { Component, instantiate, math, Node, Prefab, Sprite, Tween, tween, _decorator } from "cc";
import { AudioEffectCtrl } from "../../Plugin/AudioEffectCtrl";
import { PoolManager } from "../../Plugin/PoolManager";
import { MathTool } from "../../Plugin/tools/mathTool";
import { ApplicationManager } from "../applicationManager";

const { ccclass, property } = _decorator;
const lineWidth = 32;
@ccclass
export default class HomeMusicLineTS extends Component {

    @property(Prefab)
    private lineFab: Prefab = null;

    /**节奏点计数 */
    private cunt: number = 0;
    private cuntArr: Array<boolean> = []
    private LineArr: Node[] = []

    public isPlaying: boolean = false;

    onLoad() {
        this.creatLine();
    }


    update() {
    };


    /**创建音乐条 */
    private creatLine() {
        let num = Math.floor(920 / (lineWidth + 6)) + 2
        for (let i = 0; i < num; i++) {
            let node = instantiate(this.lineFab)
            this.LineArr.push(node);
            this.LineArr[i].getComponent(Sprite).fillStart = 0;
            this.node.addChild(this.LineArr[i]);
        }
    }
    /**节奏点加强 */
    private pointLine() {
        for (let i = 0; i < this.LineArr.length; i++) {
            let percent = ((this.LineArr.length / 2) - Math.abs((i + 1) - (this.LineArr.length / 2))) / (this.LineArr.length / 2) + 0.2
            let randheight = math.randomRangeInt(3, 10) / 10 * percent + 0.2
            Tween.stopAllByTarget(this.LineArr[i])

            tween(this.LineArr[i].getComponent(Sprite))
                .to(0.1, { fillStart: randheight })
                .to(0.15, { fillStart: randheight * 0.5 })
                .start()
        }
    }
    /** 改变音乐条高度*/
    private changeLight() {
        for (let i = 0; i < this.LineArr.length; i++) {
            let percent = ((this.LineArr.length / 2) - Math.abs((i + 1) - (this.LineArr.length / 2))) / (this.LineArr.length / 2) + 0.2
            let randheight = math.randomRangeInt(1, 10) / 10 * percent;
            Tween.stopAllByTarget(this.LineArr[i])

            tween(this.LineArr[i].getComponent(Sprite))
                .to(0.15, { fillStart: randheight })
                .to(0.15, { fillStart: randheight * 0.5 })
                .start();
                
            Tween.stopAllByTarget(this.LineArr[i].children[0])
            tween(this.LineArr[i].children[0].getComponent(Sprite))
                .to(0.15, { fillStart: randheight })
                .to(0.15, { fillStart: randheight * 0.5 })
                .start()
        }
    };




    /**开始跳动 */
    public startLine() {
        this.isPlaying = true;
        this.cuntArr = []
        this.cunt = 0
        this.schedule(this.changeLight, 0.2)
    }

    /**停止音乐条 */
    public stopLine() {
        this.isPlaying = false;
        this.cunt = 0;
        this.unschedule(this.changeLight);
        for (let i = 0; i < this.LineArr.length; i++) {
            Tween.stopAllByTarget(this.LineArr[i])
            tween(this.LineArr[i].getComponent(Sprite))
                .to(0.5, { fillStart: 0 })
                .start()
            
            Tween.stopAllByTarget(this.LineArr[i].children[0])
            tween(this.LineArr[i].children[0].getComponent(Sprite))
                .to(0.5, { fillStart: 0 })
                .start()
        }
    }


}
