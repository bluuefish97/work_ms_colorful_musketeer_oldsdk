
import { _decorator, Component, Node, BoxCollider, ParticleSystem } from 'cc';
import { Point } from './point';
import { GameDirector } from './gameDirector';
import { PoolManager } from '../../Plugin/PoolManager';
const { ccclass, property } = _decorator;

@ccclass('Bomb')
export class Bomb extends Point {

    onLoad() {

    }

    start() {

    }

    protected init() {
        this.model.active = true;
    }

    lateUpdate() {
        // if (GameDirector.getInstance().player.Position.z > this.node.position.z + 10) {
        //     PoolManager.instance.putNode(this.node);
        // }
    }
    public onHit() {
        // this.node.getComponent(BoxCollider).enabled = false;
        // this.model.active = false;
    }
}

