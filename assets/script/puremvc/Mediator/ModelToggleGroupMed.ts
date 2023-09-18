
import { _decorator, Component, Node, log, view } from 'cc';
import { Mediator } from '../../../Plugin/core/puremvc/patterns/mediator/Mediator';
import { FuncModule, PlayType, SwitchType } from '../../GloalDefine';
import { ModelToggleGroup } from '../../view/modelToggleGroup';
import { CommandDefine } from '../commandDefine';
import { PanelType } from '../../../Plugin/UIFrameWork/PanelType';
import { INotification } from '../../../Plugin/core/puremvc/interfaces/INotification';
import { AudioEffectCtrl, ClipEffectType } from '../../../Plugin/AudioEffectCtrl';
import ASCAd from '../../../Plugin/ADSDK/ASCAd';
import { ApplicationManager } from '../../applicationManager';
import { App_Platform } from '../../../Plugin/AppPlatformController';
const { ccclass, property } = _decorator;
@ccclass('ModelToggleGroupMed')
export class ModelToggleGroupMed extends Mediator {

    private modelToggleGroup: ModelToggleGroup = null;
    private curFuncModule: FuncModule = null;  //当前所处的功能模块

    constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);
        let component = viewComponent.getComponent(ModelToggleGroup);
        this.modelToggleGroup = component;
        this.bindListener();
    }

    private bindListener(): void {
        this.modelToggleGroup.setFuncModuleToggleEvent(FuncModule.SkinModule, () => {
            this.dealModuleActive(FuncModule.SkinModule);
        });
        this.modelToggleGroup.setFuncModuleToggleEvent(FuncModule.HomeModule, () => {
            this.dealModuleActive(FuncModule.HomeModule);

        });
        this.modelToggleGroup.setFuncModuleToggleEvent(FuncModule.SetMoudle, () => {
            this.dealModuleActive(FuncModule.SetMoudle);
        });
    }

    public listNotificationInterests(): string[] {
        return [
            CommandDefine.FMRSwitchRequest,
        ];
    }

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        switch (notification.getName()) {
            case CommandDefine.FMRSwitchRequest:
                {
                    this.dealFMRSwitch(info);
                    break;
                }
            default:
                break;
        }
    }

    /**
    * 处理页面的开关请求
    * @param info 
    */
    private dealFMRSwitch(info: any) {
        if (info.switch == SwitchType.CLOSE) {
            this.curFuncModule = null;
            this.modelToggleGroup.defaultCloseAct();
        }
        else if (info.switch == SwitchType.OPEN) {
            this.checkModule(info.module);
            this.modelToggleGroup.defaultOpenAct();
        }
    }

    /**
   * 把相应的模块激活
   * @param _funcModule 
   */
    public checkModule(_funcModule: FuncModule) {
        if (this.curFuncModule == _funcModule || _funcModule === null) return;
        let toggle = this.modelToggleGroup.getFuncModluleToggle(_funcModule);
        this.dealModuleActive(_funcModule);
        setTimeout(() => {
            toggle.setIsCheckedWithoutNotify(true)
        });
    }

    /**
     * 处理相应模块的激活
     * @param _funcModule 
     */
    private dealModuleActive(_funcModule: FuncModule) {
        if (this.curFuncModule == _funcModule) {
            return;
        }
        AudioEffectCtrl.getInstance().playEffect(ClipEffectType.toggleClip);
        this.curFuncModule = _funcModule;
        let panelType;
        //微信
        if(ASCAd.getInstance().getIntersFlag()) {
            ASCAd.getInstance().showInters();
        }
        // if(ApplicationManager.getInstance().Platform == App_Platform.GP_WX) {
        //     if(_funcModule == FuncModule.HomeModule) {
        //         ASCAd.getInstance().hideBanner();
        //         ASCAd.getInstance().getNavigateIconFlag() && ASCAd.getInstance().showNavigateIcon(200, 200, view.getVisibleSize().width -150, view.getVisibleSize().height -350);
        //         ASCAd.getInstance().getNativeIconFlag() && ASCAd.getInstance().showNativeIcon(200, 200, 50, view.getVisibleSize().height -200);
        //     } else {
        //         ASCAd.getInstance().hideNativeIcon();
        //         ASCAd.getInstance().hideNavigateIcon();
        //     }
        // }
        ASCAd.getInstance().hideBanner();
        ASCAd.getInstance().hideNativeImage();
        switch (_funcModule) {
            case FuncModule.SkinModule:
                panelType = PanelType.Skin;
                break;
            case FuncModule.HomeModule:
                panelType = PanelType.Home;
                break;
            case FuncModule.SetMoudle:
                panelType = PanelType.ShopPanel;
                break;
        }
        this.sendNotification(CommandDefine.PushPanelReqiest, panelType);
    }

}