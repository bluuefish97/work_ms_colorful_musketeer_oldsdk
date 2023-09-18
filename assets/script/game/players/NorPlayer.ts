
import { _decorator, Component, Node, SpriteFrame, Tween, v3, Sprite, tween } from 'cc';
import { Constant } from '../constant';
import { Player } from '../player';
const { ccclass, property } = _decorator;

 
@ccclass('NorPlayer')
export class NorPlayer extends Player {
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
        if(this.rote > 0) {
            let angle = (time / 0.08) * 90;
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
    }

    updateColor(id: number) {
        this.angle1.getComponent(Sprite).spriteFrame = this.angle1SF[id];
        this.ring1.getComponent(Sprite).spriteFrame = this.ring1SF[id];
    }


    hitBlocked(dur: number = 0.15, isRotate: boolean = false) {
        let bufferDur = Constant.weaponBufferTime;
        dur = 0.3;
        let backDur = Math.max(dur - bufferDur * 2, bufferDur);
        Tween.stopAllByTarget(this.angle1)
        Tween.stopAllByTarget(this.ring1)
        Tween.stopAllByTarget(this.box)
        if(isRotate == false) {

        }
        tween(this.box).to(bufferDur, { position: v3(0, 20, 0) })
            .to(backDur, { position: v3(0, 0, 0) }, {easing: "quadOut"})
            .start();

        tween(this.angle1).to(bufferDur, { scale: v3(1.2, 1.2, 1) })
            .to(backDur, { scale: v3(0.9, 0.9, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(0.7, 0.7, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1.1, 1.1, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .start();
        
        tween(this.ring1).to(bufferDur, { scale: v3(1.5, 1.5, 1) })
            .to(backDur, { scale: v3(0.95, 0.95, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(0.8, 0.8, 1) }, {easing: "quadOut"})
            .call(() => {
                this.rote += 90;
            })
            .to(0.1, { scale: v3(1.1, 1.1, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .start();

        // this.rote += 90;

        // if(isRotate) {
        //     this.angle4.active = true;
        // }
    }
}
