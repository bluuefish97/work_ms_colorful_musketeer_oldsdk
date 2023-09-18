
import { _decorator, Component, Node, Tween, tween, v3, SpriteFrame, Sprite } from 'cc';
import { Constant } from '../constant';
import { Player } from '../player';
const { ccclass, property } = _decorator;

@ccclass('GodEye')
export class GodEye extends Player {
    private angle1: Node = null;
    private ring1: Node = null;
    private ring2: Node = null;
    private box: Node = null;

    @property({type: SpriteFrame})
    private angle1SF: SpriteFrame[] = [];

    @property({type: SpriteFrame})
    private ring1SF: SpriteFrame[] = [];

    @property({type: SpriteFrame})
    private ring2SF: SpriteFrame[] = [];

    rote: number = 0;


    difen() {
        this.box = this.node.getChildByName("box");
        this.ring1 = this.box.getChildByName("ring1")
        this.ring2 = this.box.getChildByName("ring2")
        this.angle1 = this.box.getChildByName("angle1")
    }

    update(time: number) {
        if(this.rote > 0) {
            let angle = (time / 0.08) * 90;
            this.rote -= angle;
            this.angle1.angle -= angle;
        }
        if(this.rote < 0) {
            this.rote = 0;
            this.angle1.angle = Math.round(this.angle1.angle/90)*90;
        }
    }
    
    init() {
        Tween.stopAllByTarget(this.angle1)
        Tween.stopAllByTarget(this.ring1)
        Tween.stopAllByTarget(this.ring2)
        Tween.stopAllByTarget(this.box)
        this.box.position = v3(0, 0, 0);
        this.angle1.scale = v3(1, 1, 1);
        this.ring1.scale = v3(1, 1, 1);
        this.ring2.scale = v3(1, 1, 1);
        this.rote = -1;
    }

    updateColor(id: number) {
        this.angle1.getComponent(Sprite).spriteFrame = this.angle1SF[id];
        this.ring1.getComponent(Sprite).spriteFrame = this.ring1SF[id];
        this.ring2.getComponent(Sprite).spriteFrame = this.ring2SF[id];
    }

    hitBlocked(dur: number = 0.15, isRotate: boolean = false) {
        let bufferDur = Constant.weaponBufferTime;
        dur = 0.4;
        let backDur = Math.max(dur - bufferDur * 2, bufferDur);
        Tween.stopAllByTarget(this.angle1)
        Tween.stopAllByTarget(this.ring1)
        Tween.stopAllByTarget(this.ring2)
        if(isRotate == false) {

        }
        tween(this.box)
            .to(bufferDur, { position: v3(0, 10, 0) })
            .to(backDur, { position: v3(0, 0, 0) }, {easing: "quadOut"})
            .start();

        tween(this.angle1)
            .to(bufferDur, { scale: v3(1.8, 1.8, 1) })
            .to(backDur, { scale: v3(0.95, 0.95, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(0.7, 0.7, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1.1, 1.1, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .start();
        tween(this.ring1)
            .to(bufferDur, { scale: v3(2.3, 2.3, 1) })
            .to(backDur, { scale: v3(0.95, 0.95, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(0.6, 0.6, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1.1, 1.1, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .start();
        
        tween(this.ring2)
            .to(bufferDur, { scale: v3(1.3, 1.3, 1) })
            .to(backDur, { scale: v3(0.9, 0.9, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .call(() => {
                this.rote += 90;
                // this.dr = -1;
            })
            .to(0.1, { scale: v3(0.8, 0.8, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1.1, 1.1, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .start();

        // this.rote += 90;
        // this.dr = 1;

        // if(isRotate) {
        //     this.angle4.active = true;
        // }
    }
}
