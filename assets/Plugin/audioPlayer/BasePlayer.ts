
export default class BasePlayer {

  protected  innerAudioContext: any;
  protected  bgmusic:any;      //当前播放的歌曲
  protected pauseMusicTime: number = 0;
  protected isPausePlaying: boolean = true;
  
  public get IsPausePlaying() : boolean {
      return this.isPausePlaying
  }
  
    //音乐控制接口
    initAudioEngine() {
    }


    playMusic(music:any, loop:boolean, _volume = 1) {
        this.isPausePlaying = false;
    }
    stopMusic() {
        this.isPausePlaying = true;
    }

    pauseMusic() {
        this.isPausePlaying = true;
    }
    resumeMusic() {
        this.isPausePlaying = false;
    }

    resumeMusicToTime(curtime:number)
    {
        this.isPausePlaying = false;
    }
    getCurrentTime() {
   
    }

    //获得歌曲的总时长
    getDurationTime() {
   
    }

    //音效
    playEffect(music:any, loop:boolean, _volume = 1) {
       
    }

    stopEffect() {
    }

    pauseEffect() {
        
    }
    resumeEffect() {
    }
    
    /**
     * 设置歌曲的音量
     */
    setVolume(num:number)
    {
    }
}
