
import { _decorator, Component, Node, Slider, Sprite, Touch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SliderEx')
export class SliderEx extends Slider {
    @property(Sprite)
    full: Sprite = null;

    protected _updateProgress(touch: Touch | null) {
        super._updateProgress(touch);
        this.full.fillRange = this.progress;
    }
    protected _updateHandlePosition() {
        super._updateHandlePosition();
        this.full.fillRange = this.progress;
    }
}
