
import { _decorator, Component, Node, Tween, tween, v3, Sprite, SpriteFrame } from 'cc';
import { Constant } from '../constant';
import { Player } from '../player';
const { ccclass, property } = _decorator;
@ccclass('FlowerDance')
export class FlowerDance extends Player {
    private angle1: Node = null;
    private angle2: Node = null;
    private box: Node = null;


    @property({type: SpriteFrame})
    private angle1SF: SpriteFrame[] = [];

    @property({type: SpriteFrame})
    private angle2SF: SpriteFrame[] = [];

    rote: number = 0;
    dr = 1;


    difen() {
        this.box = this.node.getChildByName("box");
        this.angle1 = this.box.getChildByName("angle1")
        this.angle2 = this.box.getChildByName("angle2")
    }

    update(time: number) {
        if(this.rote > 0) {
            let angle = (time / 0.08) * 90;
            this.rote -= angle;
            this.angle2.angle += angle * this.dr;
        }
        if(this.rote < 0) {
            this.rote = 0;
            this.angle2.angle = Math.round(this.angle2.angle/90)*90;
        }
    }

    init() {
        Tween.stopAllByTarget(this.angle1)
        Tween.stopAllByTarget(this.angle2)
        Tween.stopAllByTarget(this.box)
        this.box.position = v3(0, 0, 0);
        this.angle1.scale = v3(1, 1, 1);
        this.angle2.scale = v3(1, 1, 1);
        this.rote = -1;
    }

    updateColor(id: number) {
        this.angle1.getComponent(Sprite).spriteFrame = this.angle1SF[id];
        this.angle2.getComponent(Sprite).spriteFrame = this.angle2SF[id];
    }

    hitBlocked(dur: number = 0.15, isRotate: boolean = false) {
        let bufferDur = Constant.weaponBufferTime;
        dur = 0.35;
        let backDur = Math.max(dur - bufferDur * 2, bufferDur);
        Tween.stopAllByTarget(this.angle1)
        Tween.stopAllByTarget(this.angle2)
        Tween.stopAllByTarget(this.box)
        tween(this.box).to(bufferDur, { position: v3(0, 10, 0) })
            .to(backDur, { position: v3(0, 0, 0) }, {easing: "quadOut"})
            .start();

        tween(this.angle1).to(bufferDur, { scale: v3(1.6, 1.6, 1) })
            .to(backDur, { scale: v3(0.95, 0.95, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .call(() => {
                this.rote += 90;
                this.dr = -1;
            }) 
            .to(0.1, { scale: v3(0.8, 0.8, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1.1, 1.1, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .start();
        
        tween(this.angle2).to(bufferDur, { scale: v3(1.1, 1.1, 1) })
            .to(backDur, { scale: v3(0.95, 0.95, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .start();

        this.rote += 90;
        this.dr = 1;

        // if(isRotate) {
        //     this.angle4.active = true;
        // }
    }
}
