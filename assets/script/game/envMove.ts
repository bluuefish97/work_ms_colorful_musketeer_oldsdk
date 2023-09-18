
import { _decorator, Component, Node, Vec3, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnvMove')
export class EnvMove extends Component {
    @property
    periodDis: number = 200;

    @property
    speed: number = 0;

    start() {
        // [3]
    }
    onEnable() {
    }

    update(deltaTime: number) {
        this.node.children.forEach((tree => {
            if (tree.position.z >= 0) {
                let pos = tree.getPosition();
                let z = pos.z - this.speed * deltaTime;
                tree.setPosition(v3(pos.x, pos.y, z));
            }
            else {
                let pos = tree.getPosition();
                tree.setPosition(v3(pos.x, pos.y, 800));
            }
        }))

    }
}

