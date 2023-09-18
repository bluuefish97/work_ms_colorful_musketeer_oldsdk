
import { _decorator, Component, Node, Sprite, Prefab, assetManager, instantiate, v3, tween, SpriteFrame, Tween, PageViewComponent, PageView } from 'cc';
import { AudioEffectCtrl, ClipEffectType } from '../../Plugin/AudioEffectCtrl';
import { Facade } from '../../Plugin/core/puremvc/patterns/facade/Facade';
import BasePanel from '../../Plugin/UIFrameWork/BasePanel';
import { Player } from '../game/player';
import { GameUserPxy } from '../puremvc/Proxy/gameUserPxy';
import { ProxyDefine } from '../puremvc/proxyDefine';
import { ShopItem } from './shopItem';
const { ccclass, property } = _decorator;

 
@ccclass('ShopPanel')
export class ShopPanel extends BasePanel {

    @property(Prefab)
    private itemPre: Prefab = null;

    @property(Prefab)
    private item2Pre: Prefab = null;

    @property(Node)
    private playerContent: Node = null;

    @property(Node)
    private itemContent: Node = null;

    @property(Node)
    private playKindBtnNode: Node = null;

    @property(Node)
    private bgKindBtnNode: Node = null;

    @property(Node)
    private rightBtnNode: Node = null;

    @property(Node)
    private leftBtnNode: Node = null;

    @property(Node)
    private DiaBtnNode: Node = null;

    @property(Node)
    private useBtnNode: Node = null;

    @property(Node)
    private usedTipNode: Node = null;

    private playerPre: Prefab[] = [];
    private bg: Sprite = null;
    private player: Player = null;
    private items: ShopItem[] = [];
    private bgItemIcons: SpriteFrame[] = [];
    private bgSfs: SpriteFrame[] = [];
    private gunBtnNode: Node = null;
    private kingNode: Node = null;
    private itemScrollViewNode: Node = null;
    private itemPageView: PageView = null;

    adCallback: Function = null;
    diaCallBack: Function = null;
    useCallBack: Function = null;

    useBgCallBack: Function = null;
    lockBgCallBack: Function = null;

    shopMap = {
        nor: 0,
        echnologyEye: 200,
        flowerDance: 200,
        timeSand: 200,
        desertTooth: -1,
        godEye: -1,
        ruinHand: -1
    }

    playerNames: string[] = [
        "echnologyEye",
        "flowerDance",
        "timeSand",
        "desertTooth",
        "godEye",
        "ruinHand",
        "nor"
    ]
 
    kindId: number = 0;//1 准星， 2 背景
    private curSelectPlayer: string = '';
    private curUsePlayer: string = '';
    unlockBgIds: number[] = [];
    curUseBgId: number = 0;
    kindPos = 0;

    dis: number = 0;
    dr = 1;
    
    onLoad() {
        this.gunBtnNode = this.node.getChildByName("gunBtnNode");
        this.bg = this.node.getChildByName("bg").getComponent(Sprite);
        this.kingNode = this.node.getChildByName("view").getChildByName("kindNod");
        this.itemScrollViewNode = this.node.getChildByName("view").getChildByName("ScrollView");
        this.itemPageView = this.node.getChildByName("view").getChildByName("PageView").getComponent(PageView);
        let gameUserPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_UserPxy) as GameUserPxy;
        this.curUseBgId = gameUserPxy.getUseThemId();
        this.unlockBgIds = [];
        this.kindPos = this.kingNode.position.y;
        gameUserPxy.getLockThems().forEach(id => {
            this.unlockBgIds.push(id);
        });
        assetManager.loadBundle("players", Prefab, (error, bundle) => {
            let call = () => {
                bundle.loadDir("icons", SpriteFrame, (error, res) => {
                    let unlock = gameUserPxy.getLockSkins();
                    this.playerNames.forEach(str => {
                        let node = instantiate(this.itemPre);
                        this.itemContent.addChild(node)
                        let info = node.getComponent(ShopItem);
                        info.init(res.find(sf => {return sf.name == str}), str);
                        if(unlock.find(dt => {return dt == str}) != null) {
                            info.refresh("Unlock");
                        } else{
                            if(this.shopMap[str] > 0) {
                                info.refresh("Dia");
                            } else {
                                info.refresh("AD");
                            }
                        }
                        this.items.push(info);
                        node.on("select", (str: string) => {
                            this.selectPlayer(str);
                        })
                        node.on("AD", (str: string) => {
                            this.adCallback(str, () => {
                                this.unlockItem(str)
                            });
                        })
                        node.on("Dia", (str: string) => {
                            this.diaCallBack(str, () => {
                                this.unlockItem(str)
                            });
                        })
                        node.on("Use", (str: string) => {
                            this.useCallBack(str)
                            this.useItem(str);
                        })
                    });
                    this.useItem(gameUserPxy.getUseSkinName());
                    this.selectPlayerKind();
                });
            }
            bundle.loadDir("prefabs", Prefab, (error, res) => {
                this.playerPre = res;
                call();
            })
            bundle.loadDir("bgs", SpriteFrame, (error, res) => {
                this.bgItemIcons = res;
                let pageView = this.itemPageView;
                pageView.removeAllPages();
                for(let i = 1; i <= 7; i ++) {
                    let node = instantiate(this.item2Pre);
                    node.getChildByName("icon").getComponent(Sprite).spriteFrame = res.find(re => {return re.name == `${i}`});
                    pageView.addPage(node);
                }
            });
        });
        assetManager.loadBundle("bs_scene_mountain_001", Prefab, (error, bundle) => {
            bundle.loadDir("BGs", SpriteFrame, (error, res) => {
                this.bgSfs = res;
                this.refreshBtn();
                this.refreshBg();
            })
        })
        this.action();
        this.schedule(this.action, 8);
    }

    define() {
    }

    unlockItem(name: string) {
        let info = this.items.find(item => {return item.itemName == name});
        info.refresh("Unlock");
    }

    useItem(name: string) {
        let curPlayer = this.curUsePlayer;
        for(let item of this.items) {
            if(item.itemName == name) {
                item.refresh("Used");
            } else if(item.itemName == curPlayer) {
                item.refresh("Unlock")
            }
        }
        this.curUsePlayer = name
        this.selectPlayer(name);
    }

    selectPlayer(name: string) {
        if(name == this.curSelectPlayer) {
            return;
        }
        let curPlayer = this.curSelectPlayer;
        for(let item of this.items) {
            if(item.itemName == name) {
                item.select();
            } else if(item.itemName == curPlayer) {
                item.unSelect()
            }
        }
        this.curSelectPlayer = name;
        let node = this.playerContent.getChildByName(name);
        if(!node) {
            node = instantiate(this.playerPre.find(pre => {return pre.data.name == name}));
            let info = node.getComponent(Player);
            info.difen();
            info.init();
            info.updateColor(2);
            this.playerContent.addChild(node);
        };
        if(this.player) {
            this.player.node.active = false;
        }
        node.active = true;
        this.player = node.getComponent(Player);
    }

    action() {
        let pos = this.playerContent.position;
        Tween.stopAllByTarget(this.playerContent);
        this.playerContent.setPosition(v3(0, pos.y, pos.z));
        tween(this.playerContent)
            .by(2, {position: v3(240, 0, 0)}, {easing: "quadOut"})
            .by(4, {position: v3(-480, 0, 0)}, {easing: "quadInOut"})
            .by(2, {position: v3(240, 0, 0)}, {easing: "quadIn"})
            .start();
    }

    clickGun() {
        this.stop()
        this.player.hitBlocked();
        AudioEffectCtrl.getInstance().playEffect(ClipEffectType.gun);
    }

    private gun() {
        this.player.hitBlocked();
    }

    clickLongGun() {
        this.stop()
        this.unschedule(this.stop);
        this.gun()
        this.schedule(this.gun, 0.09);
        this.scheduleOnce(this.stop, 1);
        AudioEffectCtrl.getInstance().playEffect(ClipEffectType.longGun);
    }

    private stop() {
        this.unschedule(this.gun)
    }

    selectPlayerKind() {
        AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
        if(this.kindId == 1) {
            return;
        }
        this.kindId = 1;
        this.playKindBtnNode.getChildByName("on").active = true;
        this.bgKindBtnNode.getChildByName("on").active = false;
        this.itemScrollViewNode.active = true;
        this.itemPageView.node.active = false;
        this.gunBtnNode.active = true;
        this.playerContent.active = true;
        this.rightBtnNode.parent.active = false;
        Tween.stopAllByTarget(this.bg.node);
        tween(this.bg.node)
            .to(0.4, {position: v3(0, 150, 0)}, {easing: "backOut"})
            .start();
        Tween.stopAllByTarget(this.kingNode);
        tween(this.kingNode)
            .to(0.4, {position: v3(0, this.kindPos, 0)}, {easing: "backOut"})
            .start();
    }

    selectBgKind() {
        AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
        if(this.kindId == 2) {
            return;
        }
        this.kindId = 2;
        this.playKindBtnNode.getChildByName("on").active = false;
        this.bgKindBtnNode.getChildByName("on").active = true;
        this.itemScrollViewNode.active = false;
        this.itemPageView.node.active = true;
        this.gunBtnNode.active = false;
        this.playerContent.active = false;
        this.rightBtnNode.parent.active = true;
        Tween.stopAllByTarget(this.bg.node);
        tween(this.bg.node)
            .to(0.4, {position: v3(0, -150, 0)}, {easing: "backOut"})
            .start();
        Tween.stopAllByTarget(this.kingNode);
        tween(this.kingNode)
            .to(0.4, {position: v3(0, this.kindPos - 140, 0)}, {easing: "backOut"})
            .start();
    }

    pageViewCall(event: PageViewComponent) {
        let cur = event.curPageIdx
        this.rightBtnNode.active = cur < 6;
        this.leftBtnNode.active = cur > 0;
        this.refreshBtn();
        this.refreshBg();
    }

    clickleft() {
        AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
        this.itemPageView.scrollToPage(this.itemPageView.curPageIdx - 1);
    }

    clickRight() {
        AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
        this.itemPageView.scrollToPage(this.itemPageView.curPageIdx + 1);
    }

    refreshBtn() {
        let id = this.itemPageView.curPageIdx;
        if(this.curUseBgId == id) {
            this.useBtnNode.active = false;
            this.DiaBtnNode.active = false;
            this.usedTipNode.active = true;
            return;
        }
        let unlock = false;
        for(let i of this.unlockBgIds) {
            if(id == i) {
                unlock = true;
                break;
            }
        }
        this.usedTipNode.active = false;
        this.useBtnNode.active = unlock;
        this.DiaBtnNode.active = !unlock;
    }

    refreshBg() {
        let id = this.itemPageView.curPageIdx;
        for(let bgsf of this.bgSfs) {
            if(bgsf.name == `BG_T${id * 3 + 1}`) {
                this.bg.spriteFrame = bgsf;
                return;
            }
        }
    }

    diaLockBg() {
        AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
        let id = this.itemPageView.curPageIdx
        this.lockBgCallBack(id, () => {
            this.unlockBgIds.push(id)
            this.refreshBtn();
        });
    }

    useBg() {
        AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
        let id = this.itemPageView.curPageIdx;
        this.useBgCallBack(id, () => {
            this.curUseBgId = id;
            this.refreshBtn();
        });
    }
}