
import { _decorator, Component, Node, Color, color } from 'cc';
import { LineRebdererAni } from './lineRebdererAni';
const { ccclass, property } = _decorator;

@ccclass('WeaponDirector')
export class WeaponDirector extends Component {

    @property(Color)
    WaveColor:Color = color(1, 1, 1, 1);
    
    @property(Node)
    Wave: Node = null;

    onLoad() {
    }

    onShowWave() {
        if (this.Wave.active) return;
        this.Wave.active = true;
    }

    onHideWave() {
        this.Wave.active = false;
    }

    update(){
        this.node.getComponentInChildren(LineRebdererAni).updateLine(this.node.worldPosition.x);
    }
}