
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Constant')
export class Constant {
    static readonly SPEED = 20;
    static readonly weaponBufferTime: number = 0.02;   //武器撞击到方块后的缓冲时间
    static readonly MINalterPointSkinVal: number= 40;    //节奏点变化的最小值
}


