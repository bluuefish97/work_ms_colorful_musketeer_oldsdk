
import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { AudioEffectCtrl, ClipEffectType } from '../../Plugin/AudioEffectCtrl';
const { ccclass, property } = _decorator;

@ccclass('ShopItem')
export class ShopItem extends Component {
    adBtnNode: Node = null;
    diaBtnNode: Node = null;
    useBtnNode: Node = null;
    useTipNode: Node = null;
    selectNode: Node = null;
    icon: Sprite = null;
    itemName: string = null;

    isSelect: boolean = false;

    init(sf: SpriteFrame, name: string) {
        let box = this.node.getChildByName("box")
        this.diaBtnNode = box.getChildByName("btn_dia")
        this.adBtnNode = box.getChildByName("btn_ad")
        this.useBtnNode = box.getChildByName("btn_use")
        this.useTipNode = box.getChildByName("used")
        this.selectNode = box.getChildByName("select")
        this.icon = box.getChildByName("icon").getComponent(Sprite);
        this.icon.spriteFrame = sf;
        this.itemName = name;
    }

    refresh(state: string) {
        this.adBtnNode.active = state == "AD";
        this.diaBtnNode.active = state == "Dia";
        this.useBtnNode.active = state == "Unlock";
        this.useTipNode.active = state == "Used";
    }

    select() {
        if(this.isSelect) {
            return;
        }
        this.isSelect = true;
        this.selectNode.active = true;
    }

    unSelect() {
        this.isSelect = false;
        this.selectNode.active = false;
    }

    clickAd() {
        this.node.emit("AD", this.itemName);
        AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
    }
    
    clickDia() {
        this.node.emit("Dia", this.itemName);
        AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
    }
    
    clickUse() {
        this.node.emit("Use", this.itemName);
        AudioEffectCtrl.getInstance().playEffect(ClipEffectType.equipClip);
    }

    clickSelect() {
        this.node.emit("select", this.itemName);
        AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
    }
}
