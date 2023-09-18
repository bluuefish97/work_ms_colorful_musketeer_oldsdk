
import { _decorator, Component, Node, UITransform, Label, UIOpacity, Vec4, Vec3, Tween, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MsghintManager')
export class MsghintManager extends Component {

    @property(Node)       //显示主要提示信息的组件
    private mainMsgTip: Node = null;

    private time: number = 0.1;

    private static _instance: MsghintManager;
    public static getInstance(): MsghintManager {
        return MsghintManager._instance
    }

    onLoad() {
        if (!MsghintManager._instance) {
            MsghintManager._instance = this;
        } else if (MsghintManager._instance != this) {
            this.destroy();
        }
    }

    start(){
        this.node.active=false;
    }

    private onShow(msg:string){
        this.mainMsgTip.setSiblingIndex(999);
        this.mainMsgTip.getComponentInChildren(Label).string = msg;
        this.showAct(this.time);
    }

    private showAct(_time:number) {
        let node = this.mainMsgTip;
        node.active=true;
        node.getComponent(UIOpacity).opacity = 255;
        node.active = true;
         Tween.stopAllByTarget(node.getComponent(UIOpacity));
        tween(node.getComponent(UIOpacity))//.to(0.2, { y: targetY } ,{easing:cc.easing.sineOut})//.to(0.2,{y:0},{easing:cc.easing.sineOut})
        .delay(_time).to(0.5, { opacity: 0 }).call(() => {
            node.active = false;
        })
        .start();
    }

    public mainMsgHint(msg:any){
       this.onShow(msg);
    }

}
