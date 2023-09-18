import { JsonAsset, resources, sys } from "cc";
import { Proxy } from "../../../Plugin/core/puremvc/patterns/proxy/Proxy";
import GloalDefine, { ConsumablesType, LocalKeys, PowerInfo } from "../../GloalDefine";
import { CommandDefine } from "../commandDefine";
import DateTool from "../../../Plugin/tools/DateTool";

export class GameAssetPxy extends Proxy {

    private diaNum: number = 0;         //玩家钻石数

    public constructor(proxyName: string = null, data: any = null) {
        super(proxyName, data);
        this.getDiaNum()
    }

    /**
     * 获得玩家的钻石数量
     */
    public getDiaNum() {
        if (sys.localStorage.getItem(LocalKeys.Key_diaNumber)) {
            this.diaNum = JSON.parse(sys.localStorage.getItem(LocalKeys.Key_diaNumber));
        } else {
            this.diaNum = 200;
        }
        return this.diaNum;
    }

    /**
     * 增加玩家的钻石数量
     */
    public addDiaNum(val: number) {
        this.sendNotification(CommandDefine.ConsumablesResponce, { type:ConsumablesType.dia, originValue: this.diaNum, value: val })
        this.diaNum += val;
        sys.localStorage.setItem(LocalKeys.Key_diaNumber, JSON.stringify(this.diaNum))
    }

    /**
     * 减少玩家的钻石数量
     */
    public decreaseDiaNum(val: number) {
        this.sendNotification(CommandDefine.ConsumablesResponce, { type: ConsumablesType.dia, originValue: this.diaNum, value: -val })
        this.diaNum -= val;
        sys.localStorage.setItem(LocalKeys.Key_diaNumber, JSON.stringify(this.diaNum))
    }

}
