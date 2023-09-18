
import { _decorator, Component, Node, Toggle, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ToggleEx')
export class ToggleEx extends Toggle {
    @property(Node)
    bg: Node | null = null;
    public playEffect() {
        if (this._checkMark) {
            this._checkMark.node.active = this._isChecked;
        }
        if (this.bg){
            this.bg.active = !this._isChecked;
        }
    }
}