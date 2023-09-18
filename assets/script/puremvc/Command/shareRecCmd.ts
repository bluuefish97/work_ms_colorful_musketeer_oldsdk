
import { SimpleCommand } from '../../../Plugin/core/puremvc/patterns/command/SimpleCommand';
import { INotification } from '../../../Plugin/core/puremvc/interfaces/INotification';
import { ProxyDefine } from '../proxyDefine';
import { GameMusicPxy } from '../Proxy/gameMusicPxy';
import { Facade } from '../../../Plugin/core/puremvc/patterns/facade/Facade';
import RecController from '../../../Plugin/bytedance_screenRec/recController';
import { ApplicationManager } from '../../applicationManager';
import { MsghintManager } from '../../tools/msghintManager';
import UIPanelController from '../../../Plugin/UIFrameWork/UIPanelControllor';
import { CommandDefine } from '../commandDefine';
import { ConsumablesAlterInfo, ConsumablesType } from '../../GloalDefine';
// import ASCAd from '../../../Plugin/ADSDK/ASCAd';
import { PanelType } from '../../../Plugin/UIFrameWork/PanelType';

export class ShareRecCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        console.log("execute:" + "StartRecCmd");
        let gameMusicPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_MusicPxy) as GameMusicPxy;
        let self = this;
        if (RecController.getInstance().recPath != null) {
            let name = ""
            if (gameMusicPxy.getCurGameSongInfo()) {
                //刚刚玩完一局游戏的分享
                name = gameMusicPxy.getCurGameSongInfo().musicName
            }
            else {
                name = gameMusicPxy.getCurPlaySongInfo().musicName
                //首页录屏的分享
            }

            // ASCAd.getInstance().shareVideo("", "", '#益欣小游戏#抖音小游戏#节奏#炫彩枪神#' + name, RecController.getInstance().recPath, function (success: boolean) {
            //     if (success) {
            //         console.log("分享视频成功");
            //         MsghintManager.getInstance().mainMsgHint("分享视频成功");
            //         if (UIPanelController.getInstance().checkIsTopView(PanelType.ShareRec)) {
            //             UIPanelController.getInstance().popView();
            //         }
            //         self.sendNotification(CommandDefine.Consumables,
            //             {
            //                 info: new ConsumablesAlterInfo(ConsumablesType.dia, 100),
            //                 callback: null
            //             });
            //     }
            //     else {
            //         console.log("分享视频失败")
            //     }

            // });
        }
        else {
            if (ApplicationManager.getInstance().develop) {
                if (true) {
                    console.log("分享视频成功");
                    if (UIPanelController.getInstance().checkIsTopView(PanelType.ShareRec)) {
                        UIPanelController.getInstance().popView();
                    }
                    self.sendNotification(CommandDefine.Consumables,
                        {
                            info: new ConsumablesAlterInfo(ConsumablesType.dia, 50),
                            callback: null
                        });
                }
                else {
                    console.log("分享视频失败")
                }
            }
            else {
                MsghintManager.getInstance().mainMsgHint("分享视频失败");
            }
        }
    }
}