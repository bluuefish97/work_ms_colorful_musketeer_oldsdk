
import { _decorator, Component, Node, Line, Vec3, v3, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LineRebdererAni')
export class LineRebdererAni extends Component {

    targetPosX: number = 0;
    line: Line = null;

    start() {
        this.line = this.node.getComponent(Line);
        console.log(this.line.positions);
        console.log(this.line.offset);
    }

    update() {
        let pos = this.line.positions as Array<Vec3>;
        pos[0]=new Vec3(this.targetPosX, this.line.positions[0].y, this.line.positions[0].z)
        pos[1]=new Vec3(this.targetPosX, this.line.positions[1].y, this.line.positions[1].z)
        for (let i = 2; i < this.line.positions.length; i++) {
            let x =this.line.positions[i - 1].x;   
            let targetx = math.lerp(this.line.positions[i].x, x, 0.4);
            pos[i] = new Vec3(targetx, this.line.positions[i].y, this.line.positions[i].z);
        }
        this.line.positions = pos;
    }

    updateLine(x: number) {
        this.targetPosX = x;
    }

}

