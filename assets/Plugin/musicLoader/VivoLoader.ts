import WebLoader from "./WebLoader";
import { sys } from "cc";


export default class VivoLoader extends WebLoader {
    LoadSongClip(URL: string, songName: string, callBack: Function) {
        //加载音乐单
            var MusicURL = 'internal://cache/path/' + this.GmeName;
            // @ts-ignore
            var res = qg.accessFile({
                uri: `${MusicURL}/${songName}.mp3`,
            })
            if (res == 'true') {
                console.log(`音乐存在，返回本地音乐`)
                callBack != null && callBack(`${MusicURL}/${songName}.mp3`);
            }
            if (res == 'false') {
                console.log(`音乐不存在，下载网络音乐`)
                // @ts-ignore
                this.downloadTask = qg.download({
                    url: URL,
                    success: function (data: any) {
                        console.log(`网络音乐下载成功, 文件位置 : ${data.tempFilePath}`)
                        // @ts-ignore
                        var res2 = qg.accessFile({
                            uri: MusicURL,
                        })
                        if (res2 == 'true') {
                            console.log('音乐文件夹存在,开始复制文件')
                            // @ts-ignore
                            qg.copyFile({
                                srcUri: `${data.tempFilePath}`,
                                dstUri: `${MusicURL}/${songName}.mp3`,
                                success: function (url: any) {
                                    console.log(`文件复制成功: ${url}`)
                                    callBack != null && callBack(`${url}`);
                                },
                                fail: function (data: any, code: any) {
                                    console.log(`文件复制失败, code = ${code}`)
                                    callBack != null && callBack(false)
                                }
                            })
                        }
                        if (res2 == 'false') {
                            console.log('音乐文件夹不存在，开始创建文件夹')
                            // @ts-ignore
                            qg.mkdir({
                                uri: MusicURL,
                                success: function (url: any) {
                                    console.log('文件目录创建成功,开始复制文件')
                                    //移动文件
                                    // @ts-ignore
                                    qg.copyFile({
                                        srcUri: `${data.tempFilePath}`,
                                        dstUri: `${MusicURL}/${songName}.mp3`,
                                        success: function (url: any) {
                                            console.log(`文件复制成功: ${url}`)
                                            callBack != null && callBack(`${url}`);
                                        },
                                        fail: function (data: any, code: any) {
                                            console.log(`文件复制失败, code = ${code}`)
                                            callBack != null && callBack(false)
                                        }
                                    })

                                },
                                fail: function (data: any, code: any) {
                                    console.log('文件目录创建失败')
                                    console.log(`handling fail, code = ${code}`)
                                    callBack != null && callBack(false)
                                }
                            })
                        }


                    },
                    fail: function (data: any, code: any) {
                        console.log(`网络音乐下载失败, code = ${code}`)
                        callBack != null && callBack(false)
                    }
                });
            }
    }
}