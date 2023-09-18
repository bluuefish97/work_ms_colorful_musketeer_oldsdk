
import { _decorator, Component, Node, Collider, misc, math, Vec3, RigidBody, game, v3, tween, easing, SphereCollider, random, Prefab, instantiate, assetManager, view, Tween, Color, Sprite, SpriteFrame } from 'cc';
import { ThemeController } from './themeController';
import { Point } from './point';
const { ccclass, property } = _decorator;
@ccclass('Player')
export class Player extends Component {

    init() {
    }

    difen() {
    }

    hitBlocked(dur: number = 0.15, isRotate: boolean = false) {
    }

    hit(point: Point) {
        point.onHit();
        this.hitBlocked(1, point.IntensiveTag);
    }

    hitBigPoint(point: Point) {
        ThemeController.getInstance().updateThemeSkin();
        point.onHitBig();
        this.hitBlocked();
    }

    rotate() {
        this.hitBlocked()
    }

    miss(point: Point) {
        point.miss();
    }

    missBomb(point: Point) {
        point.miss();
    }

    hitBomb(point: Point) {
        point.onHit();
    }

    updateColor(bgId: number) {
    }
}

