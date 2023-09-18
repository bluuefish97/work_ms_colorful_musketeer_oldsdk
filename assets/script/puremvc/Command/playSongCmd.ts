
import AudioManager from '../../../Plugin/audioPlayer/AudioManager';
import { INotification } from '../../../Plugin/core/puremvc/interfaces/INotification';
import { SimpleCommand } from '../../../Plugin/core/puremvc/patterns/command/SimpleCommand';
import { Facade } from '../../../Plugin/core/puremvc/patterns/facade/Facade';
import MusicManager from '../../../Plugin/musicLoader/MusicManager';
import { PlaySongInfo, SongInfo, SongPlayType, SwitchType } from '../../GloalDefine';
import { CommandDefine } from '../commandDefine';
import { GameMusicPxy } from '../Proxy/gameMusicPxy';
import { ProxyDefine } from '../proxyDefine';
import { GameUserPxy } from '../Proxy/gameUserPxy';
import { GameDirector, GamePhase } from '../../game/gameDirector';

export class PlaySongCmd extends SimpleCommand {

    public execute(notification: INotification) {
        let playSongInfo = notification.getBody() as PlaySongInfo
        let game_MusicPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_MusicPxy) as GameMusicPxy;
        let songInfo = game_MusicPxy.getSongInfo(playSongInfo.songName) as SongInfo;
        let _gameUserPxy = Facade.getInstance().retrieveProxy(ProxyDefine.Game_UserPxy) as GameUserPxy;
        if (!songInfo) {
            let array = game_MusicPxy.getData();
            songInfo = array[0];
            playSongInfo.songName = songInfo.musicName
        }
        var forwdMusicFile = songInfo.musicFile.slice(0, -4);
        let tryPlayMusicFile = forwdMusicFile.concat("_try.mp3");
        game_MusicPxy.saveCurPlaySongInfo(songInfo);
        MusicManager.GetInstance(MusicManager).Loader.LoadSongClip(tryPlayMusicFile, songInfo.musicId + "_try", (clip: any) => {
            if (clip != null) {
                if (playSongInfo.playState == SongPlayType.Immediately && GameDirector.getInstance().IsGame == false) {
                    AudioManager.GetInstance(AudioManager).player.playMusic(clip, true, _gameUserPxy.getMusicVolume());
                }
                game_MusicPxy.TempSongInfo = songInfo;
                game_MusicPxy.setPlayState(songInfo.musicName)
            }
            else {
                game_MusicPxy.setPlayState(game_MusicPxy.TempSongInfo.musicName)
                playSongInfo = new PlaySongInfo(game_MusicPxy.TempSongInfo.musicName, SongPlayType.Immediately);
            }
            this.sendNotification(CommandDefine.PlaySongResponce, playSongInfo);
        });


    }
}