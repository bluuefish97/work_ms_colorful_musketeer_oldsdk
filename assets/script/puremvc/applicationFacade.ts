import { Facade } from "../../Plugin/core/puremvc/patterns/facade/Facade";
import { CommandDefine } from "./commandDefine";
import { ProxyDefine } from "./proxyDefine";
import { MediatorDefine } from "./mediatorDefine";
import { AppStartCmd } from "./Command/appStartCmd";
import { GameMusicPxy } from "./Proxy/gameMusicPxy";
import { GameAssetPxy } from "./Proxy/gameAssetPxy";
import { GameUserPxy } from "./Proxy/gameUserPxy";
import { HomeMed } from "./Mediator/homeMed";
import { SkinMed } from "./Mediator/skinMed";
import { SetMed } from "./Mediator/setMed";
import { SettleMed } from "./Mediator/settleMed";
import { ReviveMed } from "./Mediator/reviveMed";
import { UnlockSongCmd } from "./Command/unlockSongCmd";
import { ConsumablesCmd } from "./Command/consumablesCmd";
import { PlaySongCmd } from "./Command/playSongCmd";
import { StartGameCmd } from "./Command/startGameCmd";
import { SettleNormalCmd } from "./Command/settleNormalCmd";
import { UserInfoRegionMed } from "./Mediator/userInfoRegionMed";
import { ApplicationManager } from "../applicationManager";
import { DiaSupplementMed } from "./Mediator/diaSupplementMed";
import { StartRecCmd } from "./Command/startRecCmd";
import { EndRecCmd } from "./Command/endRecCmd";
import { ShareRecCmd } from "./Command/shareRecCmd";
import { ShareRecMed } from "./Mediator/shareRecMed";
import { RecommendPanelMed } from "./Mediator/recommendPanelMed";
import { ReportAnalytics } from "../../Plugin/reportAnalytics";
import { ShopMed } from "./Mediator/shopMed";

export class ApplicationFacade extends Facade {
    public initializeController(): void {
        super.initializeController();

        this.registerCommand(CommandDefine.APPSTART, AppStartCmd);

        this.registerCommand(CommandDefine.PlaySongRequest, PlaySongCmd);

        this.registerCommand(CommandDefine.UnluckSongRequest, UnlockSongCmd);

        this.registerCommand(CommandDefine.Consumables, ConsumablesCmd);

        this.registerCommand(CommandDefine.StartGame, StartGameCmd);

        this.registerCommand(CommandDefine.Settle_Normal, SettleNormalCmd);

        this.registerCommand(CommandDefine.StartRec, StartRecCmd);    //开始录屏

        this.registerCommand(CommandDefine.EndRec, EndRecCmd);    //结束录屏
        
        this.registerCommand(CommandDefine.ShareRec, ShareRecCmd);    //分享录屏

    }

    public initializeModel(): void {
        super.initializeModel();

        this.registerProxy(new GameMusicPxy(ProxyDefine.Game_MusicPxy));
        this.registerProxy(new GameAssetPxy(ProxyDefine.Game_AssetPxy));
        this.registerProxy(new GameUserPxy(ProxyDefine.Game_UserPxy));
    }

    public initializeView(): void {
        super.initializeView();

        this.registerMediator(new HomeMed(MediatorDefine.HomeMed))
        this.registerMediator(new ShopMed(MediatorDefine.ShopMed))
        this.registerMediator(new SkinMed(MediatorDefine.SkinMed));
        this.registerMediator(new SetMed(MediatorDefine.SetMed));
        this.registerMediator(new SettleMed(MediatorDefine.SettleMed));
        this.registerMediator(new ReviveMed(MediatorDefine.ReviveMed));
        this.registerMediator(new DiaSupplementMed(MediatorDefine.DiaSupplementMed));
        this.registerMediator(new ShareRecMed(MediatorDefine.ShareRecMed));
        this.registerMediator(new RecommendPanelMed(MediatorDefine.RecommendPanelMed));
        this.registerMediator(new UserInfoRegionMed(MediatorDefine.UserInfoRegionMed, ApplicationManager.getInstance().userInfoRegion));
    }

    public startup(): void {
        console.log("run here");
        this.sendNotification(CommandDefine.APPSTART)
    }
}
