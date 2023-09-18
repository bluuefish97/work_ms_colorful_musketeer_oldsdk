
import { _decorator, Component, Node, Enum, MeshRenderer, Texture2D, assetManager, Vec3, Tween, tween, Prefab, v2 } from 'cc';
import AssetTool from '../../Plugin/tools/assetTool';
import { MathTool } from '../../Plugin/tools/mathTool';
import { EnvMove } from './envMove';
import { ThemeController } from './themeController';
const { ccclass, property } = _decorator;

export enum SceneTheme {
    Scene_Mountain_001,
    Scene_Mountain_002,
    Scene_Mountain_003
}

@ccclass('ThemeSkinChange')
export class ThemeSkinChange extends Component {

    @property
    skinBundleName: string = "";

    @property
    maxSkinNum: number = 3;

    @property({
        type: Enum(SceneTheme),
        displayName: '主题场景',
        visible: true
    })
    _theme: SceneTheme = SceneTheme.Scene_Mountain_001;

    @property({
        type: MeshRenderer,
        visible: true
    })
    _BGMesh: MeshRenderer = null;

    @property({
        type: MeshRenderer,
        visible: true
    })
    _BS_SN_MapMesh: MeshRenderer = null;

    @property({
        type: Node,
        visible: true
    })
    trees: Node = null;

    @property(EnvMove)
    private treeMoveNode: EnvMove = null

    @property(MeshRenderer)
    private gridNode: MeshRenderer[] = [];

    // @property(MeshRenderer)
    // private star: MeshRenderer = null;

    private _skinBundle: any = null;
    private _bgTextures: Array<Texture2D> = new Array<Texture2D>();
    private _BS_SN_MapTextures: Array<Texture2D> = new Array<Texture2D>();
    private _BS_SN_TreeTextures: Array<Texture2D> = new Array<Texture2D>();
    // private curSkinId: number = 0;
    // private originBgPos:Vec3=new Vec3();

    onLoad(){
        // this.originBgPos=new Vec3(this._BGMesh.node.position.x,this._BGMesh.node.position.y,this._BGMesh.node.position.z);
    }

    start() {
        this.loadSkinAssetBundle();
    }

    onEnable(){
        this.appearAni();
    }

    appearAni(){
        // Tween.stopAllByTarget(this._BGMesh.node)
        // let startPos=new Vec3(this.originBgPos.x,this.originBgPos.y,this.originBgPos.z+10)
        // this._BGMesh.node.setPosition(startPos);
        // tween( this._BGMesh.node).to(2,{position:this.originBgPos}).start();
    }

    private loadSkinAssetBundle() {
        assetManager.loadBundle(this.skinBundleName, (err, bundle) => {
            this._skinBundle = bundle;
            let themeId = ThemeController.getInstance().CurThemeId;
            this.loadDirSort(this._skinBundle, "BGs").then((assets) => {
                this._bgTextures = assets;
                this.updateBg(themeId * 3)
            })
            this.loadDirSort(this._skinBundle, "BS_SN_Maps").then((assets) => {
                this._BS_SN_MapTextures = assets;
                this.updateSN_Map(themeId * 3)
            })
            this.loadDirSort(this._skinBundle, "BS_Trees").then((assets) => {
                this._BS_SN_TreeTextures = assets;
                this.updateSN_Tree(themeId * 3)
            })
            
        });
    }

    private loadDirSort(bundle: any, path: string) {
        return new Promise<Array<Texture2D>>((resolve, reject) => {
            bundle.loadDir(path, Texture2D, (err: any, assets: any) => {
                let sortFunc = (a: any, b: any) => {
                    let nameA = AssetTool.getTexture2DName(a, bundle);
                    let nameB = AssetTool.getTexture2DName(b, bundle);
                    let indexA = MathTool.extractNumberOfArray(nameA);
                    let indexB = MathTool.extractNumberOfArray(nameB);
                    return indexA - indexB;
                }
                assets.sort(sortFunc);
                resolve(assets);
            })
        })
    }

    /**
     * 更新背景图
     */
    private updateBg(id: number) {
        if (this._bgTextures && this._bgTextures[id]) {
            let mat = this._BGMesh.getMaterial(0);
            mat.setProperty("mainTexture", this._bgTextures[id]);
        }
    }

    /**
    * 更新前景图
    */
    private updateSN_Map(id: number) {
        if (this._BS_SN_MapTextures) {
            let mat = this._BS_SN_MapMesh.getMaterial(0);
            mat.setProperty("mainTexture", this._BS_SN_MapTextures[id]);
        }
    }

    /**
    * 更新场景移动的树图
    */
   private updateSN_Tree(id: number) {
        if (this._BS_SN_TreeTextures) {
            for (const mesh of this.trees.getComponentsInChildren(MeshRenderer)) {
                let mat =mesh.getMaterial(0);
                mat.setProperty("mainTexture", this._BS_SN_TreeTextures[id]);
            }
        }
    }

    public updateSkin(id: number, themeId: number) {
        this.updateBg(id + 3 * themeId);
        this.updateSN_Map(id);
        this.updateSN_Tree(id);
    }

    startMove() {
        this.treeMoveNode.speed = 50;
        // this.star.material.setProperty("speed", v2(0, -2.5))
        this.gridNode.forEach(mesh => {
            mesh.material.setProperty("speed", v2(0, 0.5));
        })
    }

    stopMove() {
        this.treeMoveNode.speed = 0;
        // this.star.material.setProperty("speed", v2(0, 0))
        this.gridNode.forEach(mesh => {
            mesh.material.setProperty("speed", v2(0, 0));
        })
    }
}


