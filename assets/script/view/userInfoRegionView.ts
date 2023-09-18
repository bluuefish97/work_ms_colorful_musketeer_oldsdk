
import { _decorator, Component, Node, Vec2, Button, Label, Vec3, Widget, Tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UserInfoRegionView')
export class UserInfoRegionView extends Component {

    private coinTargetPos: Vec3;
    private coinButton: Button = null;
    private coinLabel: Label = null;

    public currencyType_coin: Node = null;

    public RegisterCoinButtonClick(callback: Function) {
        this.coinButton.node.on("click", callback, this);
    }

    onLoad(){
    }

    define(){
        this.currencyType_coin = this.node.getChildByName("Dia");
        this.coinButton = this.currencyType_coin.getChildByName("addBtn").getComponent(Button);
        this.coinLabel = this.currencyType_coin.getChildByName("Label").getComponent(Label);
    }

    onEnable() {
    
    }

    public defaultCloseAct() {
        this.node.active = false;
    }

    public defaultOpenAct() {
        this.node.active = true;
    }

    /**
   * 获得钻石的目标点
   */
    getDiaTargetPos() {
        this.coinTargetPos = this.currencyType_coin.worldPosition; 
        return this.coinTargetPos;
    }

    /**
     * 设置钻石的数量显示
     */
    setDiaLabel(val: number) {
        this.coinLabel.string = val.toString();
    }

    public closeAllCurrencyType() {
        this.node.children.forEach((node) => {
            node.active = false;
        })
    }

    update(){
      //  console.log(this.node.position);
        
    }

}
