
import { _decorator, Component, Node, ScrollView, Prefab, instantiate, resources, Sprite, assetManager, SpriteFrame, ParticleSystem2D, ToggleContainer, Toggle, UITransform, Label } from 'cc';
// import ASCAd from '../../Plugin/ADSDK/ASCAd';
import { AudioEffectCtrl, ClipEffectType } from '../../Plugin/AudioEffectCtrl';
import { PoolManager } from '../../Plugin/PoolManager';
import BasePanel from '../../Plugin/UIFrameWork/BasePanel';
import { SongTableType } from '../GloalDefine';
import ASCAd_New from '../../Plugin/ASCAd_New';
const { ccclass, property } = _decorator;

@ccclass('SkinPanel')
export class SkinPanel extends BasePanel {

    @property(ScrollView)
    private allListScrollView: ScrollView = null;

    @property(ScrollView)
    private failListScorllView: ScrollView = null;

    @property(ScrollView)
    private passListScorllView: ScrollView = null;

    @property(ScrollView)
    private collectLisrScorllView: ScrollView = null;

    @property(Label)
    private nullTipLabel: Label = null;

    private tipTags: boolean[] = [];
    private tipTimes: number = 0;

    private songUnitPre: Prefab = null;
    private toggleContainer: ToggleContainer = null;

    private scrollViewCallback: Function = null;
    private curType: SongTableType = SongTableType.type_All;


    onLoad() {
        super.onLoad();
        this.define();
    }

    define() {
        this.toggleContainer = this.node.getChildByName("toggleContainer").getComponent(ToggleContainer);
    }

    public creatAllList(callback: Function) {
        this.createSongElement(this.allListScrollView.content, callback);
    }

    public creatFailList(callback: Function) {
        this.createSongElement(this.failListScorllView.content, callback);
    }

    public creatPassList(callback: Function) {
        this.createSongElement(this.passListScorllView.content, callback);
    }
    public creatCollectList(callback: Function) {
        this.createSongElement(this.collectLisrScorllView.content, callback);
    }

    public clearCollectList() {
        while(this.collectLisrScorllView.content.children.length > 0) {
            PoolManager.instance.putNode(this.collectLisrScorllView.content.children[0])
        }
    }

    private createSongElement(content: Node, callback: Function) {
        if (this.songUnitPre) {
            let songUnit = PoolManager.instance.getNode(this.songUnitPre, content);
            callback(songUnit);
        }
        else {
            let self = this;
            resources.load("prefabs/SongElement", function (err, prefab: Prefab) {
                self.songUnitPre = prefab;
                let songUnit = PoolManager.instance.getNode(self.songUnitPre, content);
                callback(songUnit);
            });
        }
    }

    setFuncModuleToggleEvent(_module: SongTableType, callback: Function, target: any = null) {
        let toggle = this.getFuncModluleToggle(_module);
        toggle.node.on("toggle", callback, target)
    }

    setScrollViewCallback(callback: Function) {
        this.scrollViewCallback = (scrollView: ScrollView, type: SongTableType) => {
            callback(scrollView, type);
        }
    }

    public getFuncModluleToggle(_module: SongTableType): Toggle {
        let name: string;
        switch (_module) {
            case SongTableType.type_My_Fail:
                name = "Toggle_My_Fail";
                break;
            case SongTableType.type_My_Pass:
                name = "Toggle_My_Pass";
                break;
            case SongTableType.type_My_Collect:
                name = "Toggle_My_Collect";
                break;
            case SongTableType.type_All:
                name = "Toggle_All";
                break;
            default:
                break;
        }
        let toggle = this.toggleContainer.toggleItems.find((item) => {
            return item.node.name == name
        });
        return toggle;
    }

    public setCursongTableContentSizeY(value: number, type: SongTableType) {
        this.tipTags[type] = value == 0;
        this.getScrollViewByTYpe(type).content.getComponent(UITransform).setContentSize(0, value + 220);
    }
    
    public changeList(type: SongTableType) {
        if(type == this.curType) {
            return;
        }
        this.getScrollViewByTYpe(this.curType).node.active = false;
        this.getScrollViewByTYpe(type).node.active = true;
        this.curType = type;
        this.showTip(this.tipTags[type])
    }

    showTip(isNull: boolean) {
        let str = "";
        if(isNull) {
            switch(this.tipTimes) {
                case 1:
                    this.tipTimes = 2;
                    break;
                case 2:
                    this.tipTimes = 3;
                    break;
                case 3:
                    this.tipTimes = 4;
                    break;
                case 4:
                    if(ASCAd_New.getInstance().getIntersFlag()) {
                        ASCAd_New.getInstance().showInters(()=>{});
                    } else {
                    }
                    this.tipTimes = 0;
                    break;
                default:
                    this.tipTimes = 1;
                    break;
            }
        }
        this.nullTipLabel.string = str;
    }

    public getScrollViewByTYpe(type: SongTableType) {
        switch(type) {
            case SongTableType.type_My_Fail:
                return this.failListScorllView;
            case SongTableType.type_My_Pass:
                return this.passListScorllView;
            case SongTableType.type_My_Collect:
                return this.collectLisrScorllView;
            case SongTableType.type_All:
                return this.allListScrollView;
        }
    }

    
    private failListEven(scrollView: ScrollView) {
        this.scrollViewCallback(scrollView, SongTableType.type_My_Fail);
    }

    private passListEven(scrollView: ScrollView) {
        this.scrollViewCallback(scrollView, SongTableType.type_My_Pass);
    }

    private collectEven(scrollView: ScrollView) {
        this.scrollViewCallback(scrollView, SongTableType.type_My_Collect);
    }

    private allListEven(scrollView: ScrollView) {
        this.scrollViewCallback(scrollView, SongTableType.type_All);
    }
}

