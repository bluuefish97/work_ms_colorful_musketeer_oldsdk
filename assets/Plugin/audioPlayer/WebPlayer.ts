import BasePlayer from "./BasePlayer";
import { _decorator, Component, Node, AudioSource, AudioClip } from 'cc';
import { ApplicationManager } from "../../script/applicationManager";
const { ccclass, property } = _decorator;

export default class WebPlayer extends BasePlayer {

    private _curmusic: AudioSource | null = null;

    playMusic(music: AudioClip, loop: boolean, _volume = 1) {
        super.playMusic(music, loop, _volume);
        this._curmusic?.stop();
        ApplicationManager.getInstance().musicAudio.clip = music;
        this._curmusic = ApplicationManager.getInstance().musicAudio;
        this._curmusic.volume = _volume;
        this._curmusic.play()
    }

    stopMusic() {
        super.stopMusic();
        this._curmusic?.stop();
    }

    pauseMusic() {
        super.pauseMusic();
        this._curmusic?.pause();
        if (this._curmusic?.currentTime) {
            this.pauseMusicTime = this._curmusic?.currentTime;
        }

    }

    resumeMusic() {
        super.resumeMusic();
        this._curmusic?.play();
    }

    resumeMusicToTime(curtime: number) {
        super.resumeMusicToTime(curtime);
        this._curmusic?.play();
    }

    getCurrentTime() {
        super.getCurrentTime();
        return this._curmusic?.currentTime
    }

    //获得歌曲的总时长
    getDurationTime() {
        super.getDurationTime();
        return this._curmusic?.duration
    }

    /**
     * 设置歌曲的音量
     */
    setVolume(num: number) {
        if (this._curmusic) {
            this._curmusic!.volume = num;
        }

    }

    getIsPlaying() {
        return this._curmusic.playing;
    }
}
