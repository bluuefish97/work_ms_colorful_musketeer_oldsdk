
import BasePlayer from "./BasePlayer";
import VivoPlayer from "./VivoPlayer";
import OppoPlayer from "./OppoPlayer";
import { Singleton } from "../Singleton";
import TTPlayer from "./TTPlayer";
import WebPlayer from "./WebPlayer";
import { App_Platform, AppPlatformController } from "../AppPlatformController";

interface PlayerConstructor {
    new(): BasePlayer;
}


function createPlayer(ctor: PlayerConstructor): BasePlayer {
    return new ctor();
}

export default class AudioManager extends Singleton<AudioManager> {

    player: BasePlayer;
    constructor() {
        super();
        this.InitAudioPlayer();
    }

    private InitAudioPlayer() {
        switch (AppPlatformController.Platform) {
            case App_Platform.GP_Vivo:
                this.player = createPlayer(VivoPlayer);
                break;
            case App_Platform.GP_Oppo:
                this.player = createPlayer(OppoPlayer);
                break;
            case App_Platform.GP_Tiktok:
                this.player = createPlayer(TTPlayer);
                break;
            default:
                this.player = createPlayer(WebPlayer)
                break;
        }
        this.player.initAudioEngine();
    }
}
