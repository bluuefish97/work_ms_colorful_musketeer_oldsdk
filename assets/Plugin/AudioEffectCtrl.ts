
import { _decorator, Component, Node, assetManager, AudioClip, game, AudioSource } from 'cc';
// import ASCAd from './ADSDK/ASCAd';
const { ccclass, property } = _decorator;

@ccclass('AudioEffectCtrl')
export class AudioEffectCtrl extends Component {
    @property(AudioSource)
    audioSource: AudioSource = null;
    
    private clipsAsset: any = null;
    private isPhoneVibrate: boolean = true;
    private static _instance: AudioEffectCtrl;
    public static getInstance(): AudioEffectCtrl {
        return AudioEffectCtrl._instance
    }

    onLoad() {
        if (!AudioEffectCtrl._instance) {
            AudioEffectCtrl._instance = this;
        } else if (AudioEffectCtrl._instance != this) {
            this.destroy();
        }
        assetManager.loadBundle('audioClip', (err, bundle) => {
            // 加载 textures 目录下的所有 AudioClip 资源
            bundle.loadDir("Clips", AudioClip, (err, assets) => {
                this.clipsAsset = assets;
            });
        });
        game.addPersistRootNode(this.node);
    }

    updateVolume(val:number){
        this.audioSource.volume=val;
    }

    playEffect(type: ClipEffectType) {
        if (this.clipsAsset) {
            let _clip = this.clipsAsset.find((data: any) => { return data.name == type });
            // this.audioSource.stop();
            this.audioSource.clip = _clip;
            this.audioSource.play();
        } else {
            assetManager.loadBundle('audioClip', (err, bundle) => {
                // 加载 textures 目录下的所有 Texture 资源
                bundle.loadDir("Clips", AudioClip, (err, assets) => {
                    this.clipsAsset = assets;
                    let _clip = this.clipsAsset.find((data: any) => { return data.name == type });
                    // this.audioSource.stop();
                    this.audioSource.clip = _clip;
                    this.audioSource.play();
                });
            });
        }
    }
    
    setPhoneVibrate(val: boolean) {
        this.isPhoneVibrate = val;
    }

    phoneVibrate() {
        // if(this.isPhoneVibrate) {
        //     ASCAd.getInstance().phoneVibrate("short");
        // }
    }

}

export enum ClipEffectType {
    challengeAniClip = "challengeAniClip",
    downTimeClip = "downTimeClip",
    equipClip = "equipClip",
    finishStarClip = "finishStarClip",
    normalBtnClip = "normalBtnClip",
    panerlEnterClip = "panerlEnterClip",
    songListScrollClip = "songListScrollClip",
    startplayBtnClip = "startplayBtnClip",
    toggleClip = "toggleClip",
    unlockShowClip = "unlockShowClip",
    warnClip = "warnClip",
    getCoinClip = "getCoinClip",
    challengePanelEnterClip = "challengePanelEnterClip",
    newRecordhintClip = "newRecordhintClip",
    gun = "gun",
    longGun = "longGun",
    SE_Bomb = "SE_Bomb",
    gameGetDia = "gameGetDia"
}