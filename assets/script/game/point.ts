
import { color, math, ParticleSystem, Vec4 } from 'cc';
import { _decorator, Component, Node, BoxCollider, v3, tween, Collider, Texture2D, Vec2, Prefab, Color, Enum, MeshRenderer, Material, Animation, v4, director, find } from 'cc';
import { PoolManager } from '../../Plugin/PoolManager';
import { GameDirector, GamePhase } from './gameDirector';
const { ccclass, property } = _decorator;


@ccclass('Point')
export class Point extends Component {

    @property(Node)
    model: Node = null;
    effect_GunChip: Node = null;

    @property(Prefab)
    private RawerdLizi: Prefab = null;


    onCreateNextRow: Function = () => { };

    // private _idx: number = 0;
    // private _offset: number = null;
    private _intensiveTag: boolean = false;
    // private intensivMat: Material = null;
    private _updateSkinPoint: boolean = false; //该点是否是颜色变化点
    private isHit: boolean = false;
    private isCreateTip: boolean = false;
    private _isMiss: boolean = false;
    // private texNameStr: string = null;
    private speed: number = null;
    isMove: boolean = false;
    // public get Idx(): number {
    //     return this._idx;
    // }

    public get IntensiveTag(): boolean {
        return this._intensiveTag;
    }

    // public get Offset(): number {
    //     return this._offset;
    // }

    public get UpdateSkinPoint(): boolean {
        return this._updateSkinPoint;
    }

    public set UpdateSkinPoint(v: boolean) {
        this._updateSkinPoint = v;
    }

    public get isMiss() {
        return this._isMiss;
    }

    public get Hit() {
        return this.isHit;
    }

    onLoad() {
    }

    start() {
    }

    lateUpdate(dt: number) {
        let worldPos = this.node.getWorldPosition();
        if (worldPos.z < -3) {
            if (!this.isCreateTip) {
                this.isCreateTip = true;
                this.onCreateNextRow && this.onCreateNextRow();
            }
            if (!this.isHit) {
                PoolManager.instance.putNode(this.effect_GunChip);
                PoolManager.instance.putNode(this.node);
            }
        }
        this.isMove && this.move(worldPos.x, dt);
    }

    protected init() {
        this.model.active = true;
        this._isMiss = false;
        this.isHit = false;
        this.isCreateTip = false;
        // this.texNameStr = null;
        this.speed = 6/4;
        this.isMove = false;
    }

    public initInfo(intensiveTag: boolean) {
        // this._idx = idx;
        this._intensiveTag = intensiveTag;
        // this._offset = offset;
        this.init();
        // this.onCreateNextRow = onNext;
    }

    public updateSkin(texture2D: Texture2D, offset: Vec4, chip: Prefab) {
        if (!texture2D) return;
        // this.texNameStr = texture2D.name;
        const comp2 = this.model.getComponent(MeshRenderer);
        const mat2 = comp2.material;
        if (mat2.getProperty("mainTexture", 0) == texture2D) {
            mat2.setProperty('tilingOffset', v4(offset.x, offset.y, offset.z, offset.w));
        } else {
            mat2.setProperty('mainTexture', texture2D);
            mat2.setProperty("tilingOffset", v4(offset.x, offset.y, offset.z, offset.w));
        }
       this.effect_GunChip = PoolManager.instance.getNode(chip, this.node);
    }

    public updateRewardSkin(chip: Prefab) {
        this.effect_GunChip = PoolManager.instance.getNode(this.RawerdLizi, this.node);
    }

    public onHit() {
        this.isHit = true;
        this.model.active = false;
        this.createEft();
    }

    public onHitBig() {
        this.isHit = true;
        this.createEft();
    }

    public hitDia() {
        this.isHit = true;
        this.model.active = false;
        this.createEft();
    }

    private createEft() {
        this.effect_GunChip.active = true;
        this.effect_GunChip.children.forEach((plst) => {
            if (plst.getComponent(ParticleSystem)) {
                plst.getComponent(ParticleSystem).play();
            }
        })
        setTimeout(() => {
            this.effect_GunChip.active = false;
            PoolManager.instance.putNode(this.effect_GunChip);
            PoolManager.instance.putNode(this.node);
        }, 300);
    }

    public miss() {
        this._isMiss = true;
    }

    cicyeBack() {
        // const comp2 = this.model.getComponent(MeshRenderer);
        // const mat2 = comp2.material;
        // mat2.setProperty("mainColor", new Color().fromHEX("#FFFFFFDC"))
        if(this.effect_GunChip) {
            this.effect_GunChip.active = false;
        }
        PoolManager.instance.putNode(this.effect_GunChip);
    }

    move(x: number, time: number) {
        if(GameDirector.getInstance().CurPhase != GamePhase.UNDERWAY) {
            return;
        }
        if(x >= 1.5) {
            this.speed = -(6/4);
        } else if(x <= -1.5) {
            this.speed = (6/4);
        }
        let pos = this.node.position;
        this.node.setPosition(v3(pos.x + this.speed * time, pos.y, pos.z));
    }

}


