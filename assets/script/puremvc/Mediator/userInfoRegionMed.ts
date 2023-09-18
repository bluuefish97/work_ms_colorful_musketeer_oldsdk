
import { _decorator, Component, Node } from 'cc';
import { INotification } from '../../../Plugin/core/puremvc/interfaces/INotification';
import { Mediator } from '../../../Plugin/core/puremvc/patterns/mediator/Mediator';
import { PanelType } from '../../../Plugin/UIFrameWork/PanelType';
import GloalDefine, { ConsumablesType, SwitchType } from '../../GloalDefine';
import { UserInfoRegionView } from '../../view/userInfoRegionView';
import { CommandDefine } from '../commandDefine';
import { GameAssetPxy } from '../Proxy/gameAssetPxy';
import { AudioEffectCtrl, ClipEffectType } from '../../../Plugin/AudioEffectCtrl';
import { Facade } from '../../../Plugin/core/puremvc/patterns/facade/Facade';
import { ProxyDefine } from '../proxyDefine';
import { GlobalTool } from '../../../Plugin/tools/GlobalTool';
import DateTool from '../../../Plugin/tools/DateTool';
import { ReportAnalytics } from '../../../Plugin/reportAnalytics';



export class UserInfoRegionMed extends Mediator {

    private userInfoRegionView: UserInfoRegionView = null;
    private gameAssetPxy: GameAssetPxy = null;

    public constructor(mediatorName: string = null, viewComponent: Node = null) {
        super(mediatorName, viewComponent);
        this.userInfoRegionView = viewComponent.getComponent(UserInfoRegionView);
        this.userInfoRegionView.define();
        this.gameAssetPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_AssetPxy) as GameAssetPxy;
        this.userInfoRegionView.setDiaLabel(this.gameAssetPxy.getDiaNum());
        this.userInfoRegionView.setDiaLabel(this.gameAssetPxy.getDiaNum());
        this.bindListener();
    }

    private bindListener(): void {
        this.userInfoRegionView.RegisterCoinButtonClick(() => {
            AudioEffectCtrl.getInstance().playEffect(ClipEffectType.normalBtnClip);
            this.sendNotification(CommandDefine.PushPanelReqiest, PanelType.DiaSupplement);
            ReportAnalytics.getInstance().reportAnalytics("btnClick_eventAnalytics", "dia", 1)
        });
    }

    public listNotificationInterests(): string[] {
        return [
            CommandDefine.UIRSwitchRequest,
            CommandDefine.ConsumablesResponce,
            CommandDefine.SwitchCurrencyType,
        ];
    }

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        switch (notification.getName()) {
            case CommandDefine.SwitchCurrencyType:
                this.switchCurrencyType_node(info.type, info.openCal);
                break;

            case CommandDefine.UIRSwitchRequest:
                {
                    this.dealUIRSwitch(info);
                    break;
                }

            case CommandDefine.ConsumablesResponce:
                if (info.type == ConsumablesType.dia) {
                    this.alterShow(info.originValue, info.value, this.userInfoRegionView.setDiaLabel.bind(this.userInfoRegionView))
                }
                break;
        }
    }

    /**
    * 处理页面的开关请求
    * @param info 
    */
    private dealUIRSwitch(info: any) {
        if (info == SwitchType.CLOSE) {
            this.userInfoRegionView.defaultCloseAct();
        }
        else if (info == SwitchType.OPEN) {
            this.userInfoRegionView.defaultOpenAct();
        }
    }

    private alterShow(orignVal: number, offset: number, cal: Function) {
        if (offset > 0) {
            GlobalTool.addScoreAnim(orignVal, offset, 0.05, cal);
        }
        else {
            cal(orignVal + offset);
        }
    }

    public switchCurrencyType_node(type: ConsumablesType, openCal: Function = null) {
        let node: Node = null;
        switch (type) {
            case ConsumablesType.dia:
                node = this.userInfoRegionView.currencyType_coin;
                break;
            default:
                break;
        }
        if (openCal) {
            openCal(node);
        }
    }

    getDiaTargetPos() {
        return this.userInfoRegionView.getDiaTargetPos();
    }
}