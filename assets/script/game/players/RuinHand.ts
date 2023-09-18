
import { _decorator, Component, Node, Tween, tween, v3, Sprite, SpriteFrame } from 'cc';
import { Constant } from '../constant';
import { Player } from '../player';
const { ccclass, property } = _decorator;

@ccclass('RuinHand')
export class RuinHand extends Player {
    private angle1: Node = null;
    private ring1: Node = null;
    private box: Node = null;

    @property({type: SpriteFrame})
    private angle1SF: SpriteFrame[] = [];

    @property({type: SpriteFrame})
    private ring1SF: SpriteFrame[] = [];

    rote: number = 0;


    difen() {
        this.box = this.node.getChildByName("box");
        this.angle1 = this.box.getChildByName("angle1")
        this.ring1 = this.box.getChildByName("ring1")
    }

    update(time: number) {
        this.ring1.angle += (time / 1) * 60
        if(this.rote > 0) {
            let angle = (time / 0.08) * 60;
            this.rote -= angle;
            this.ring1.angle += angle;
        }
        if(this.rote < 0) {
            this.rote = 0;
            this.ring1.angle = Math.round(this.ring1.angle/90)*90;
        }
    }

    init() {
        Tween.stopAllByTarget(this.angle1)
        Tween.stopAllByTarget(this.ring1)
        Tween.stopAllByTarget(this.box)
        this.box.position = v3(0, 0, 0);
        this.angle1.scale = v3(1, 1, 1);
        this.ring1.scale = v3(1, 1, 1);
        this.rote = -1;
    }

    updateColor(id: number) {
        this.angle1.getComponent(Sprite).spriteFrame = this.angle1SF[id];
        this.ring1.getComponent(Sprite).spriteFrame = this.ring1SF[id];
    }


    hitBlocked(dur: number = 0.15, isRotate: boolean = false) {
        let bufferDur = Constant.weaponBufferTime;
        dur = 0.35;
        let backDur = Math.max(dur - bufferDur * 2, bufferDur);
        Tween.stopAllByTarget(this.angle1)
        Tween.stopAllByTarget(this.ring1)
        Tween.stopAllByTarget(this.box)
        if(isRotate == false) {

        }
        tween(this.box).to(bufferDur, { position: v3(0, 10, 0) })
            .to(backDur, { position: v3(0, 0, 0) }, {easing: "quadOut"})
            .start();

        tween(this.angle1).to(bufferDur, { scale: v3(1.3, 1.3, 1) })
            .to(backDur, { scale: v3(0.95, 0.95, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .call(() => {

            })
            .start();
        
        tween(this.ring1).to(bufferDur, { scale: v3(1.7, 1.7, 1) })
            .to(backDur, { scale: v3(0.95, 0.95, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .start();

        this.rote += 90;

        // if(isRotate) {
        //     this.angle4.active = true;
        // }
    }
}
