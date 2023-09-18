
import { _decorator, Component, Node } from 'cc';
import WebLoader from "./WebLoader";
import OppoLoader from "./OppoLoader";
import VivoLoader from "./VivoLoader";
import TTLoader from "./TTLoader";
import { Singleton } from "../Singleton";
import { AppPlatformController, App_Platform } from '../AppPlatformController';


const { ccclass, property } = _decorator;

interface LoaderConstructor {
    new(): LoaderInterface;
}

function createLoader(ctor: LoaderConstructor): LoaderInterface {
    return new ctor();
}
@ccclass
export default class MusicManager extends Singleton<MusicManager> {

    Loader: LoaderInterface;
    constructor() {
        super();
        this.InitMusicLoader();
    }

    private InitMusicLoader() {
        switch (AppPlatformController.Platform) {
            case App_Platform.GP_Vivo:
                this.Loader = createLoader(VivoLoader);
                break;
            case App_Platform.GP_Oppo:
                this.Loader = createLoader(OppoLoader);
                break;
            case App_Platform.GP_Tiktok:
                this.Loader = createLoader(TTLoader);
                break;
            default:
                this.Loader = createLoader(WebLoader)
                break;
        }
    }
}
