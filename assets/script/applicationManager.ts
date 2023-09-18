import { _decorator, Component, Node, UITransform, UIOpacity, game, AudioSource, ProgressBar, Enum, systemEvent, SystemEvent, Game } from 'cc';
import { ApplicationFacade } from './puremvc/applicationFacade';
import { App_Platform, AppPlatformController } from '../Plugin/AppPlatformController';
import LocalStorage from '../Plugin/ADSDK/utils/LocalStorage';
const { ccclass, property } = _decorator;

@ccclass('ApplicationManager')
export class ApplicationManager extends Component {

    @property
    develop: boolean = false;

    @property({
        type: Enum(App_Platform),
        displayName: '发布平台',
        visible: true
    })
    platform: App_Platform = App_Platform.GP_Tiktok;

    @property(AudioSource)
    musicAudio: AudioSource = null;

    @property(Node)
    private persistRoot: Node = null;

    @property(Node)
    loaderBg: Node = null;

    @property(Node)
    startPanel: Node = null;

    @property(Node)
    startGamePanel: Node = null;

    @property(Node)
    mainBG: Node = null;

    @property(Node)
    userInfoRegion: Node = null;

    @property(Node)
    mask: Node = null;

    loadingTimes: number = 0;

    private applicationFacade: ApplicationFacade = null;

    public get Platform(): App_Platform {
        return this.platform;
    }

    private static _instance: ApplicationManager;
    public static getInstance(): ApplicationManager {
        return ApplicationManager._instance
    }

    onLoad() {
        AppPlatformController.setPlatform(this.platform);
        if (!ApplicationManager._instance) {
            ApplicationManager._instance = this;
        } else if (ApplicationManager._instance != this) {
            this.destroy();
        }
        game.addPersistRootNode(this.persistRoot);
        this.startGamePanel.active = false;
        this.applicationInit();
    }

    start() {
        this.applicationFacade.startup();
    }

    private applicationInit() {
        this.applicationFacade = new ApplicationFacade();

    }

    public showUserInfoRegion() {
        this.userInfoRegion.active = true;
    }

    public hideUserInfoRegion() {
        this.userInfoRegion.active = false;
    }

    public clearStartPanel() {
        this.loaderBg.active = false;
        this.startPanel.destroy();
    }

    public showStartGamePanel() {
        this.loaderBg.active = true;
        this.startGamePanel.getComponentInChildren(ProgressBar).progress = 0;
        this.startGamePanel.active = true;
    }

    public hideStartGamePanel() {
        this.loaderBg.active = false;
        this.startGamePanel.active = false;
    }

    public startLoading() {
        this.mask.active = true;
        this.loadingTimes ++;
    }

    public stopLoading() {
        this.loadingTimes--;
        if(this.loadingTimes <= 0){
            this.mask.active = false;
        }
    }
    getAreaShieldingSwitch(){
        if(!LocalStorage.getJsonData('adConfig')){

            console.log("=======未保存adConfig")
            return  false;
        }else{
            console.log("=======areaShieldingSwitch",LocalStorage.getJsonData('adConfig').areaShieldingSwitch);
            return  LocalStorage.getJsonData('adConfig').areaShieldingSwitch;
        }
     
    }
}

