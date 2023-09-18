
import { _decorator, Component, Node, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoadingLayer')
export class LoadingLayer extends Component {

    @property(Node)
    private CDNode: Node = null;

    update(dt: number) {
        // this.CDNode.eulerAngles = v3(0, 0, this.CDNode.eulerAngles.z - dt * 60);
    }
}
