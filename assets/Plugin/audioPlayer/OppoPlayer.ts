import BasePlayer from "./BasePlayer";

export default class OppoPlayer extends BasePlayer {

    initAudioEngine() {
        this.innerAudioContext = qg.createInnerAudioContext();
    }

    playMusic(music:any, loop:boolean, _volume = 0) {
        super.playMusic(music, loop, _volume)
        console.log('oppo播放音乐')
        this.innerAudioContext.src = music;
        this.innerAudioContext.loop = loop;
        this.innerAudioContext.volume = _volume;
        this.innerAudioContext.startTime=0;
        this.innerAudioContext.play()
        return 0;
    }

    stopMusic() {
        super.stopMusic();
        console.log('oppo停止音乐')
        if (!this.innerAudioContext.paused) {
            this.innerAudioContext.stop();
        }
    }

    pauseMusic() {
        super.pauseMusic();
        console.log('oppo暂停音乐')
        this.innerAudioContext.pause();

    }

    resumeMusic() {
        super.resumeMusic();
        console.log('oppo恢复音乐')
        this.innerAudioContext.play();
    }

    resumeMusicToTime(curtime:number)
    {
        super.resumeMusicToTime(curtime);
        this.innerAudioContext.seek(curtime);
        this.innerAudioContext.play();
    }

    getCurrentTime() {
        super.getCurrentTime();
        var time = this.innerAudioContext.currentTime;
        if (time > 0 && time <= 300) time = time
        else time = 0;
        return time
    }

    //获得歌曲的总时长
    getDurationTime() {
        super.getDurationTime();
        var time = this.innerAudioContext.duration;
        if (time > 0 && time <= 300) time = time
        else time = 0;
        return time
    }
    
     /**
     * 设置歌曲的音量
     */
    setVolume(num:number)
    {
        this.innerAudioContext.volume =num;
    }

}
