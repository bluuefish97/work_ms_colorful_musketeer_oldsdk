
import { _decorator, Component, Node } from 'cc';
import { INotification } from '../../../Plugin/core/puremvc/interfaces/INotification';
import { SimpleCommand } from '../../../Plugin/core/puremvc/patterns/command/SimpleCommand';
import { Facade } from '../../../Plugin/core/puremvc/patterns/facade/Facade';
import GloalDefine, { ConsumablesAlterInfo, ConsumablesType, PlayType } from '../../GloalDefine';
import { CommandDefine } from '../commandDefine';
import { UserInfoRegionMed } from '../Mediator/userInfoRegionMed';
import { MediatorDefine } from '../mediatorDefine';
import { GameAssetPxy } from '../Proxy/gameAssetPxy';
import { ProxyDefine } from '../proxyDefine';
import { FlyObjHandler } from '../../tools/flyObjHandler';
import { AudioEffectCtrl, ClipEffectType } from '../../../Plugin/AudioEffectCtrl';
import { MsghintManager } from '../../tools/msghintManager';
import { PanelType } from '../../../Plugin/UIFrameWork/PanelType';
import { ReportAnalytics } from '../../../Plugin/reportAnalytics';

export class ConsumablesCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        let body = notification.getBody();
        let info = body.info as ConsumablesAlterInfo;
        let succeCallback = body.callback;
        let gameAssetPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_AssetPxy) as GameAssetPxy;
        let UserInfoMed = Facade.getInstance().retrieveMediator(MediatorDefine.UserInfoRegionMed) as UserInfoRegionMed;
        if (info.consumablesType == ConsumablesType.dia)   //消耗品为钻石
        {
            if (info.alterVal < 0 || Math.abs(info.alterVal) == 0)    //钻石减少
            {
                if (Math.abs(info.alterVal) > gameAssetPxy.getDiaNum())   //钻石的数量不足
                {
                    console.log("钻石数量不足!!!")
                    MsghintManager.getInstance().mainMsgHint("钻石数量不足!!!");
                    ReportAnalytics.getInstance().reportAnalytics("viewShow_eventAnalytics", "diabank_nodia", 1)
                    this.sendNotification(CommandDefine.PushPanelReqiest, PanelType.DiaSupplement);
                }
                else {
                    gameAssetPxy.decreaseDiaNum(Math.abs(info.alterVal));
                    if (succeCallback) {
                        succeCallback();
                    }
                }
            }
            else        //钻石增加
            {
                console.log("钻石数量增加  " + info.alterVal)
                AudioEffectCtrl.getInstance().playEffect(ClipEffectType.getCoinClip);
                FlyObjHandler.getInstance().playAnim(UserInfoMed.getDiaTargetPos(), ConsumablesType.dia)
                setTimeout(() => {
                    gameAssetPxy.addDiaNum(info.alterVal)
                }, 1000)
            }
        }
        // else if (info.consumablesType == ConsumablesType.power)     //消耗品为体力
        // {
        //     if (info.alterVal < 0)    //体力减少
        //     {
        //         if (Math.abs(info.alterVal) > gameAssetPxy.getPowerNum())   //体力的数量不足
        //         {
        //             console.log("体力数量不足!!!")
        //             MsghintManager.getInstance().mainMsgHint("体力数量不足!!!");
        //             //  GameManager.getInstance().closeBlockInput();
        //             ReportAnalytics.PowerAssetEnv=assetEnv.passive_powerUnenough;
        //             this.sendNotification(CommandDefine.PushPanelReqiest, PanelType.PowerSupplement);
        //             succeCallback(false);
        //         }
        //         else {
        //             console.log("体力数量减少  " + info.alterVal)
        //             gameAssetPxy.decreasePowerNum(Math.abs(info.alterVal))
        //             if (body.targetPos) {
        //                 FlyObjHandler.getInstance().playOnerAnim(UserInfoMed.getPowerTargetPos(), body.targetPos, ConsumablesType.power);
        //             }
        //             if (succeCallback) {
        //                 setTimeout(() => {
        //                     succeCallback(true);
        //                 }, 1500)
        //             }
        //         }
        //     }
        //     else        //体力增加
        //     {
        //         console.log("体力数量增加  " + info.alterVal)
        //         FlyObjHandler.getInstance().playAnim(UserInfoMed.getPowerTargetPos(), ConsumablesType.power)
        //         setTimeout(() => {
        //             gameAssetPxy.addPowerNum(info.alterVal)
        //         }, 1000)

        //     }
        // }
    }

}