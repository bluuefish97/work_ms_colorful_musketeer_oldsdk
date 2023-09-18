
import { _decorator, Component, Node, JsonAsset, assetManager, Prefab, instantiate, director, Animation, Enum, math } from 'cc';
import { SceneThemeInfo } from '../GloalDefine';
import { ThemeSkinChange, SceneTheme } from './themeSkinChange';
import { Constant } from './constant';
const { ccclass, property } = _decorator;

@ccclass('ThemeController')
export class ThemeController extends Component {

    @property(Node)
    envParnet: Node = null;

    @property(Node)
    envSkinChange: Node = null;

    private _curThemeId: number = 0;
    private bgId: number = 0;
    private _themeSkinChange: ThemeSkinChange = null;


    private static _instance: ThemeController;
    public static getInstance(): ThemeController {
        return ThemeController._instance
    }

    onLoad() {
        if (!ThemeController._instance) {
            ThemeController._instance = this;
        } else if (ThemeController._instance != this) {
            this.destroy();
        }
        this.envSkinChange.active = false;
        this._themeSkinChange = this.envParnet.getComponentInChildren(ThemeSkinChange);
    }

    public get CurThemeId(): number {
        return this._curThemeId;
    }

    public get CurBgId(): number {
        return this.bgId;
    }

    public set CurBgId(num: number) {
        if(num > 2) {
            num = 2;
        }
        this.bgId = num;
        this._themeSkinChange && this._themeSkinChange.updateSkin(num, this.CurThemeId);
    }

    public set CurThemeId(v: number) {
        this._curThemeId = v;
    }

    /**
     *主题皮肤变换
     */
    public updateThemeSkin() {
        this.envSkinChange.active = true;
        this.envSkinChange.getComponent(Animation).play();
        this.CurBgId = (this.CurBgId + 1) % 3;
    }

    /**
     * 检测当前节奏点是否需要更新颜色
     */
    checkUpdatePointSkin(idx: any) {
        if (idx % Constant.MINalterPointSkinVal == 0 && idx != 0) {
            return true
        } else {
            return false;
        }
    }

    startMove() {
        if (this._themeSkinChange) {
            this._themeSkinChange.startMove();
        }
    }

    stopMove() {
        if (this._themeSkinChange) {
            this._themeSkinChange.stopMove();
        }
    }
}

