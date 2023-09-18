
import { SimpleCommand } from '../../../Plugin/core/puremvc/patterns/command/SimpleCommand';
import { INotification } from '../../../Plugin/core/puremvc/interfaces/INotification';
import RecController, { RecState } from '../../../Plugin/bytedance_screenRec/recController';
// import ASCAd from '../../../Plugin/ADSDK/ASCAd';
import { CommandDefine } from '../commandDefine';


export class StartRecCmd extends SimpleCommand {
    
    public execute(notification: INotification): void {
        console.log("execute:" + "StartRecCmd");
        RecController.getInstance().recState = RecState.InRecing;
        // ASCAd.getInstance().startGameVideo(300);
        this.sendNotification(CommandDefine.StartRecResponce);
        RecController.getInstance().startRec(() => { });

    }
}