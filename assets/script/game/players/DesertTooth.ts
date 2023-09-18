
import { _decorator, Component, Node, Tween, tween, v3, Vec3, SpriteFrame, assetManager, Sprite } from 'cc';
import { Constant } from '../constant';
import { Player } from '../player';
const { ccclass, property } = _decorator;
 
@ccclass('DesertTooth')
export class DesertTooth extends Player {
    private angle1: Node = null;
    private angle2: Node = null;
    private angle3: Node = null;
    private ring1: Node = null;
    private ring2: Node = null;
    private box: Node = null;

    @property({type: SpriteFrame})
    private angle1SF: SpriteFrame[] = [];

    @property({type: SpriteFrame})
    private angle2SF: SpriteFrame[] = [];

    @property({type: SpriteFrame})
    private angle3SF: SpriteFrame[] = [];

    @property({type: SpriteFrame})
    private ring1SF: SpriteFrame[] = [];

    @property({type: SpriteFrame})
    private ring2SF: SpriteFrame[] = [];

    rote: number = 0;


    difen() {
        this.box = this.node.getChildByName("box");
        this.angle1 = this.box.getChildByName("angle1")
        this.angle2 = this.box.getChildByName("angle2")
        this.angle3 = this.box.getChildByName("angle3")
        this.ring1 = this.box.getChildByName("ring1")
        this.ring2 = this.box.getChildByName("ring2")
    }

    update(time: number) {
        if(this.rote > 0) {
            let angle = (time / 0.08) * 120;
            this.rote -= angle;
            this.angle3.angle += angle;
        }
        if(this.rote < 0) {
            this.angle3.angle = 0;
            this.rote = 0;
        }
    }

    init() {
        Tween.stopAllByTarget(this.angle1)
        Tween.stopAllByTarget(this.ring1)
        Tween.stopAllByTarget(this.angle2)
        Tween.stopAllByTarget(this.ring2)
        Tween.stopAllByTarget(this.angle3)
        Tween.stopAllByTarget(this.box)
        this.box.position = v3(0,0,0);
        this.angle1.scale = v3(1,1,1);
        this.angle2.scale = v3(1,1,1);
        this.angle3.scale = v3(1,1,1);
        this.ring1.scale = v3(1,1,1);
        this.ring2.scale = v3(1,1,1);
        this.rote = -1;
    }

    updateColor(id: number) {
        this.angle1.children.forEach(node => {
            node.getComponent(Sprite).spriteFrame = this.angle1SF[id];
        })
        this.angle2.children.forEach(node => {
            node.getComponent(Sprite).spriteFrame = this.angle2SF[id];
        })
        this.angle3.children.forEach(node => {
            node.getComponent(Sprite).spriteFrame = this.angle3SF[id];
        })
        this.ring1.children.forEach(node => {
            node.getComponent(Sprite).spriteFrame = this.ring1SF[id];
        })
        this.ring2.children.forEach(node => {
            node.getComponent(Sprite).spriteFrame = this.ring2SF[id];
        })
    }

    hitBlocked(dur: number = 0.15, isRotate: boolean = false) {
        let bufferDur = Constant.weaponBufferTime;
        dur = 0.35;
        let backDur = Math.max(dur - bufferDur * 2, bufferDur);
        Tween.stopAllByTarget(this.angle1)
        Tween.stopAllByTarget(this.ring1)
        Tween.stopAllByTarget(this.angle2)
        Tween.stopAllByTarget(this.ring2)
        Tween.stopAllByTarget(this.angle3)
        Tween.stopAllByTarget(this.box)
        tween(this.box).to(bufferDur, { position: v3(0, 10, 0) })
            .to(backDur, { position: v3(0, 0, 0) }, {easing: "quadOut"})
            .start();

        tween(this.angle1).to(bufferDur, { scale: v3(1.6, 1.6, 1) })
            .to(backDur, { scale: v3(0.95, 0.95, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .start();
        
        tween(this.ring1).to(bufferDur, { scale: v3(1.5, 1.5, 1) })
            .to(backDur, { scale: v3(0.95, 0.95, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .start();
        
        tween(this.angle2).to(bufferDur, { scale: v3(1.4, 1.4, 1) })
            .to(backDur, { scale: v3(0.95, 0.95, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .start();
        
        tween(this.ring2).to(bufferDur, { scale: v3(1.3, 1.3, 1) })
            .to(backDur, { scale: v3(0.95, 0.95, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .start();

        tween(this.angle3).to(bufferDur, { scale: v3(1.3, 1.3, 1) })
            .to(backDur, { scale: v3(0.95, 0.95, 1) }, {easing: "quadOut"})
            .to(0.1, { scale: v3(1, 1, 1) }, {easing: "quadOut"})
            .start();

        this.rote += 120;
    }
}

