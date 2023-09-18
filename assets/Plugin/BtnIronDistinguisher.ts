import { _decorator, Component, Node, Vec2, sys, UITransform, v3, Vec3 } from 'cc';
import { AppPlatformController, App_Platform } from './AppPlatformController';
const { ccclass, property } = _decorator;

@ccclass("ADIronConfig")
class ADIronConfig {
    @property({
        type: Node,
        tooltip: "样式节点"
    })
    iron_box: Node = null;
    @property({
        type: Vec2,
        tooltip: "按钮大小"
    })
    btn_size: Vec2 = new Vec2();

    @property({
        type: Vec2,
        tooltip: "自定义按钮位置"
    })
    btn_pos: Vec2 = new Vec2();
}

@ccclass('BtnIronDistinguisher')
export class BtnIronDistinguisher extends Component {

    @property({
        tooltip: "调整按钮点击范围"
    })
    alterScale: boolean = true;

    @property({
        tooltip: "调整按钮位置"
    })
    alterPos: boolean = true;


    @property(ADIronConfig)
    defulat_Config: ADIronConfig = null;
    @property(ADIronConfig)
    byteDance_Config: ADIronConfig = null;

    start() {
        if (AppPlatformController.Platform == App_Platform.GP_Tiktok) {
            this.byteDanceShow();
        } else {
            this.defaultShow();
            // this.byteDanceShow();
        }
    }


    defaultShow() {
        this.defulat_Config.iron_box.active = true;
        this.byteDance_Config.iron_box.active = false;
        if (this.alterScale){
            if (this.defulat_Config.btn_size.x != 0 || this.defulat_Config.btn_size.y != 0) {
                this.node.getComponent(UITransform).width = this.defulat_Config.btn_size.x;
                this.node.getComponent(UITransform).height = this.defulat_Config.btn_size.y;
            }
        }
        if (this.alterPos) {
            //let boxWolrdPos = this.byteDance_Config.iron_box.worldPosition;
            let localPos = this.node.getPosition(); //= this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(boxWolrdPos);
            localPos.x = this.defulat_Config.btn_pos.x != 0 ? this.defulat_Config.btn_pos.x : localPos.x;
            localPos.y = this.defulat_Config.btn_pos.y != 0 ? this.defulat_Config.btn_pos.y : localPos.y;
            this.node.setPosition(localPos);
            // this.defulat_Config.iron_box.setPosition(0, 0, 0)
        }
    }

    byteDanceShow() {
        console.log("字节跳动广告规范");
        this.byteDance_Config.iron_box.active = true;
        this.defulat_Config.iron_box.active = false;
        if (this.alterScale) {
            this.node.getComponent(UITransform).width = this.byteDance_Config.btn_size.x ? this.byteDance_Config.btn_size.x
                : this.byteDance_Config.iron_box.getComponent(UITransform).width;
            this.node.getComponent(UITransform).height = this.byteDance_Config.btn_size.y ? this.byteDance_Config.btn_size.y
                : this.byteDance_Config.iron_box.getComponent(UITransform).height;
        }
        if (this.alterPos) {
            //let boxWolrdPos = this.byteDance_Config.iron_box.worldPosition;
            let localPos = this.node.getPosition(); //= this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(boxWolrdPos);
            localPos.x = this.byteDance_Config.btn_pos.x != 0 ? this.byteDance_Config.btn_pos.x : localPos.x;
            localPos.y = this.byteDance_Config.btn_pos.y != 0 ? this.byteDance_Config.btn_pos.y : localPos.y;
            this.node.setPosition(localPos);
            // this.byteDance_Config.iron_box.setPosition(0, 0, 0)
        }
    }
}
