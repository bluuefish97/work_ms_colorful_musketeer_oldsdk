
import { _decorator, Component, Node, Texture2D, Vec2, Prefab, Color, Enum, color, SpriteFrame, math } from 'cc';
import { ThemeController } from './themeController';
import { SceneTheme } from './themeSkinChange';
const { ccclass, property } = _decorator;

const cheng = color(230, 110, 40);
const zi = color(230, 110, 200);
const lan = color(40, 150, 230);
const lv = color(50, 230, 40);

@ccclass("textTure2DAndOffset")
class PointSkin {
    @property({
        type: Texture2D,
        tooltip: "贴图"
    })
    point: Texture2D = null;
    @property({
        type: Vec2,
        tooltip: "贴图偏移"
    })
    offset: Vec2 = new Vec2();
    @property({
        type: Prefab,
        tooltip: "爆炸粒子"
    })
    effect_GunChip: Prefab = null;
    @property({
        type: Texture2D,
        tooltip: "贴图"
    })
    bigPoint: Texture2D = null;
}

@ccclass("ColorConfig")
class ColorConfig {

    @property({
        type: Enum(SceneTheme),
        tooltip: "场景主题"
    })
    GuardBarMatColor: number = 0;  // SceneTheme = SceneTheme.Scene_Mountain_001;

    @property({
        type: PointSkin,
        tooltip: "主题皮肤"
    })
    PointSkins: PointSkin[] = [];
}

@ccclass('PointSkinHandler')
export class PointSkinHandler extends Component {

    @property(ColorConfig)
    colorConfigs: ColorConfig[] = [];

    private _curPointSkinId: number = 0;
    // private _curthemeType: number = 0;
    
    init(themeType: number) {
        // this._curPointSkinId = Math.floor(math.random() * 3);
        this._curPointSkinId = ThemeController.getInstance().CurBgId;
        // 0 = themeType;
    }

    updatePointSkin() {
        let length = this.colorConfigs[0].PointSkins.length;
        this._curPointSkinId = (this._curPointSkinId + 1) % length;
        // ThemeController.getInstance().CurBgId = this._curPointSkinId;
    }

    public pointTexture2D() {
        return this.colorConfigs[0].PointSkins[this._curPointSkinId].point;
    }

    public pointTexture2DBig() {
        return this.colorConfigs[0].PointSkins[this._curPointSkinId].bigPoint;
    }

    public bombTexture2D(index: number) {
        let length = this.colorConfigs[0].PointSkins.length;
        return this.colorConfigs[0].PointSkins[(this._curPointSkinId + length + index) % length].point;
    }

    public pointOffset() {
        return this.colorConfigs[0].PointSkins[this._curPointSkinId].offset;
    }

    public bombOffset(index: number) {
        let length = this.colorConfigs[0].PointSkins.length;
        return this.colorConfigs[0].PointSkins[(this._curPointSkinId + length + index) % length].offset;
    }

    public pointChip() {
        return this.colorConfigs[0].PointSkins[this._curPointSkinId].effect_GunChip;
    }

    public bombChip(index: number) {
        let length = this.colorConfigs[0].PointSkins.length;
        return this.colorConfigs[0].PointSkins[(this._curPointSkinId + length + index) % length].effect_GunChip;
    }
}

