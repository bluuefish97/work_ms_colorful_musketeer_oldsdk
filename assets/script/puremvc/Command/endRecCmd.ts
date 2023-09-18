
import { _decorator, Component, Node } from 'cc';
import { SimpleCommand } from '../../../Plugin/core/puremvc/patterns/command/SimpleCommand';
import { INotification } from '../../../Plugin/core/puremvc/interfaces/INotification';
import RecController, { RecState } from '../../../Plugin/bytedance_screenRec/recController';
import { MsghintManager } from '../../tools/msghintManager';
import { CommandDefine } from '../commandDefine';
import { ApplicationManager } from '../../applicationManager';
import ASCAd from '../../../Plugin/ADSDK/ASCAd';

export class EndRecCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        console.log("execute:" + "EndRecCmd");
        if(RecController.getInstance().recTime<3)
        {
             MsghintManager .getInstance().mainMsgHint("录制时间小于3秒");
            RecController.getInstance().recPath=null;
            return;
        }
      
        if(ApplicationManager.getInstance().develop)
        {
            let videoPath=null
            console.log('开发模式   录制成功 ',videoPath);
            RecController.getInstance().recPath=videoPath;
            RecController.getInstance().recState=RecState.WaitRecing;
            RecController.getInstance().StopRec();
            this.sendNotification(CommandDefine.EndRecResponce);
        }
        else
        {
            ASCAd.getInstance().stopGameVideo((videoPath: string)=>{
                console.log('视频录制成功 ',videoPath);
                RecController.getInstance().recPath=videoPath;
               this.sendNotification(CommandDefine.EndRecResponce);
            });
            RecController.getInstance().recState=RecState.WaitRecing;
            RecController.getInstance().StopRec();
        }
    }
}