
import { _decorator, Component, Node, Vec2, Material, MeshRenderer, v2, Vec4 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CirculeMoveWave')
export class CirculeMoveWave extends Component {
    @property(Vec2)
    speed: Vec2 = v2();

    material: Material = null;
    private mainOffsetY = 0
    private mainOffsetX = 0

    onLoad() {
        this.material = this.node.getComponent(MeshRenderer).getMaterial(0);
    }

    lateUpdate() {
        this.mainOffsetY += this.speed.y;
        this.mainOffsetX += this.speed.x;
        if (this.mainOffsetY <= -1) {
            this.mainOffsetY = 0;
        }
        if (this.mainOffsetX <= -1) {
            this.mainOffsetX = 0;
        }
        this.material.setProperty('tilingOffset', new Vec4(1, 1, this.mainOffsetX, this.mainOffsetY));
    }
}