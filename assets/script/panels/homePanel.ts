
import { _decorator, Component, Node, PageView, ToggleContainer, Toggle, ScrollView, UIOpacity, Prefab, resources, UITransform, SpriteFrame, Sprite, sp, Material, math, misc, v3, tween, easing, Vec3 } from 'cc';
import BasePanel from '../../Plugin/UIFrameWork/BasePanel';
import { SongPlayType, SongTableType } from '../GloalDefine';
import { PoolManager } from '../../Plugin/PoolManager';
import { AudioEffectCtrl, ClipEffectType } from '../../Plugin/AudioEffectCtrl';
// import ASCAd from '../../Plugin/ADSDK/ASCAd';
import ASCAd_New from '../../Plugin/ASCAd_New';
const { ccclass, property } = _decorator;

@ccclass('HomePanel')
export class HomePanel extends BasePanel {

    @property(Node)
    bgSpNode: Node = null;

    @property(Node)
    private zhunxing: Node = null;
    
    private songUnitPre: Prefab = null;

    @property(Node)
    private moreGameNode: Node = null;

    @property(Node)
    private allSongContent: Node = null;

    @property(Node)
    setBtnNode: Node = null;

    @property(Node)
    nativeIconPos1: Node = null;
    @property(Node)
    nativeIconPos2: Node = null;

    private direction: number = 1;

    private listCallback: Function = null;

    onLoad() {
        super.onLoad();
        this.node.active = false;
    }

    update(dt: number) {
        this.move(dt);
    }

    public onEnter(): void {
        super.onEnter();
        // let pos1=this.nativeIconPos1.getWorldPosition();
        // let pos2=this.nativeIconPos2.getWorldPosition();
       
        // if ( ASCAd_New.getInstance().getBlockFlag(1,pos1.x,pos1.y)) {
        //     ASCAd_New.getInstance().showBlock(1,pos1.x,pos1.y);
        // }

        // if ( ASCAd_New.getInstance().getBlockFlag(2,pos2.x,pos2.y)) {
        //     ASCAd_New.getInstance().showBlock(2,pos2.x,pos2.y);
        // }
    }

    onPause() {
        super.onPause();
    }

    onResume() {
        super.onResume();
    }

    public onExit(): void {
        super.onExit();
        // ASCAd_New.getInstance().hideBlock(1);
        // ASCAd_New.getInstance().hideBlock(2);
    }

    setMoreBtn() {
        // if(ASCAd.getInstance().getChannelId() == '1007') {
        //     this.moreGameNode.active = true;
        // } else {
        //     this.moreGameNode.active = false;
        // }
        this.moreGameNode.active = false;
    }

    public setListCallback(callback: Function) {
        this.listCallback = callback;
    }

    /**
    * 创建歌曲单元
    * @param idx 
    */
    public createAllSongUnit(callback: Function) {
        this.createSongUnit(this.allSongContent, callback);
    }

    private createSongUnit(contentNode: Node, callback: Function) {
        if (this.songUnitPre) {
            let songUnit = PoolManager.instance.getNode(this.songUnitPre, contentNode);
            callback(songUnit);
        }
        else {
            let self = this;
            resources.load("prefabs/SongElement", function (err, prefab: Prefab) {
                self.songUnitPre = prefab;
                let songUnit = PoolManager.instance.getNode(self.songUnitPre, contentNode);
                callback(songUnit);
            });
        }
    }

    /**
    * 设置歌曲列表content的高度
    * @param callback 
    */
    setCursongTableContentSizeY(value: number) {
        this.allSongContent.getComponent(UITransform).setContentSize(0, value);
    }

    move(time: number) {
        let pos = this.zhunxing.position;
        let speed = (220 - Math.abs(pos.x)) / 2 + 50;
        if(pos.x >= 220) {
            this.direction = -1;
        } else if(pos.x <= -220) {
            this.direction = 1;
        }
        let addx = math.clamp(speed*time*this.direction, -220, 220)
        this.zhunxing.setPosition(v3(pos.x + addx, pos.y, pos.z));
    }

    clickMoreGame() {
       // ASCAd.getInstance().getOPPOShowMoreGameFlag()&&ASCAd.getInstance().showOPPOMoreGame();
    }

    private scrollViewCallBack(scrollView: ScrollView) {
        this.listCallback && this.listCallback(scrollView, SongTableType.All)
    }

    setClickSet(call: Function) {
        this.setBtnNode.on('click', () => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
            call();
        })
    }
}

