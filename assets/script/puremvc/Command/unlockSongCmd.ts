import { SimpleCommand } from "../../../Plugin/core/puremvc/patterns/command/SimpleCommand";
import { INotification } from "../../../Plugin/core/puremvc/interfaces/INotification";
import { ConsumablesAlterInfo, ConsumablesType, SongInfo } from "../../GloalDefine";
import { Facade } from "../../../Plugin/core/puremvc/patterns/facade/Facade";
import { ProxyDefine } from "../proxyDefine";
import ASCAd from "../../../Plugin/ADSDK/ASCAd";
import { CommandDefine } from "../commandDefine";
import { GameMusicPxy } from "../Proxy/gameMusicPxy";
import { MsghintManager } from "../../tools/msghintManager";
import AudioManager from "../../../Plugin/audioPlayer/AudioManager";

export class UnlockSongCmd extends SimpleCommand {
    public execute(notification: INotification): void {
        console.log("execute:" + "UnlockSongCmd");
        let info = notification.getBody();
        let songInfo = info.song as SongInfo
        let callback = info.cal;
        let game_MusicPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_MusicPxy) as GameMusicPxy;
      
        if (songInfo.unlockType == "video") {
            if (ASCAd.getInstance().getVideoFlag()) {
                AudioManager.GetInstance(AudioManager).player.pauseMusic();
                ASCAd.getInstance().showVideo((isSucces: any) => {
                    AudioManager.GetInstance(AudioManager).player.resumeMusic();
                    if (isSucces) {
                        game_MusicPxy.UnlockSong(songInfo.musicId);

                    }
                    callback && callback(isSucces);
                })
            } else {
                MsghintManager.getInstance().mainMsgHint("暂无广告!")
            }
        }
        else if (songInfo.unlockType == "coin") {
            //  console.log("钻石解锁一首歌")
            let succeCallback = () => {
                game_MusicPxy.UnlockSong(songInfo.musicId);
                callback && callback(true);
            };
            this.sendNotification(CommandDefine.Consumables,
                {
                    info: new ConsumablesAlterInfo(ConsumablesType.dia, -songInfo.unlockCost),
                    callback: succeCallback
                }
            );
        }

    }
}