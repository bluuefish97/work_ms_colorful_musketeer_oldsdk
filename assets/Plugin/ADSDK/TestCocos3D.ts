import { _decorator, Component, view, assetManager, director } from 'cc';
import ASCAd from './ASCAd';
const { ccclass, property } = _decorator;

@ccclass('TestCocos3D')
export class TestCocos3D extends Component {

    videoPath;

    start() {
        // 默认使用UI_2D分组
        ASCAd.getInstance().setGroup(25);
        ASCAd.getInstance().initAd();
        this.showPrivacyAgreement("");
    }

    openServiceAgreement() {
        ASCAd.getInstance().openServiceAgreement();
    }

    openProtocol() {
        ASCAd.getInstance().openProtocol();
    }

    showNavigatePaster() {
        ASCAd.getInstance().getNavigatePasterFlag() && ASCAd.getInstance().showNavigatePaster();
    }
    hideNavigatePaster() {
        ASCAd.getInstance().hideNavigatePaster();
    }
    reportNavigatePasterClick() {
        ASCAd.getInstance().reportNavigatePasterClick();
    }

    showBanner() {
        ASCAd.getInstance().showBanner(1);
    }
    hideBanner() {
        ASCAd.getInstance().hideBanner();
    }


    showInters() {
        ASCAd.getInstance().getIntersFlag() && ASCAd.getInstance().showInters(() => {
            // 安卓恢复游戏声音
        });
    }


    showVideo() {
        if (ASCAd.getInstance().getVideoFlag()) {
            ASCAd.getInstance().showVideo((suc) => {
                if (suc) {
                    console.log("激励视频播放完成");
                } else {
                    console.log("激励视频播放取消");
                }
            });
        } else {
            //提示暂无视频广告
        }
    }


    // 获取原生广告
    getNativeAdInfo1() {
        ASCAd.getInstance().getNativeAdInfo(1);
    }
    // 获取自定义原生广告
    getNativeAdInfo2() {
        ASCAd.getInstance().getNativeAdInfo(2);
    }


    showNativeIcon() {
        ASCAd.getInstance().getNativeIconFlag() && ASCAd.getInstance().showNativeIcon(200, 200, view.getVisibleSize().width / 4, view.getVisibleSize().height / 2);
    }
    hideNativeIcon() {
        ASCAd.getInstance().hideNativeIcon();
    }


    showNativeImage() {
        ASCAd.getInstance().getNativeImageFlag() && ASCAd.getInstance().showNativeImage(600, 300, view.getVisibleSize().width / 2, 200, 1);
    }
    hideNativeImage() {
        ASCAd.getInstance().hideNativeImage();
    }


    showNativePaster() {
        ASCAd.getInstance().getNativePasterFlag() && ASCAd.getInstance().showNativePaster();
    }


    showNavigateBoxBanner() {
        ASCAd.getInstance().getNavigateBoxBannerFlag() && ASCAd.getInstance().showNavigateBoxBanner();
    }
    hideNavigateBoxBanner() {
        ASCAd.getInstance().hideNavigateBoxBanner();
    }


    showNavigateBoxPortal() {
        if (ASCAd.getInstance().getNavigateBoxPortalFlag()) {
            ASCAd.getInstance().showNavigateBoxPortal();
        } else {
            // 提示暂无广告
            console.log("提示暂无广告");
        }
    }


    addDesktop() {
        ASCAd.getInstance().getAddDesktopFlag((succ) => {
            if (succ) {
                ASCAd.getInstance().addDesktop((suc) => {
                    if (suc) {
                        console.log("添加桌面成功");
                    }
                })
            }
        })
    }


    phoneVibrateLong() {
        ASCAd.getInstance().phoneVibrate("long");
    }
    phoneVibrateShort() {
        ASCAd.getInstance().phoneVibrate("short");
    }


    getUserData() {
        ASCAd.getInstance().getUserData((res) => {
            console.log("XminigameSDK", "getUserData", JSON.stringify(res));
        });
    }


    getUserInfo() {
        ASCAd.getInstance().getUserInfo((res) => {
            console.log("XminigameSDK", "getUserInfo", JSON.stringify(res));
        });
    }


    // 抖音收藏
    showFavoriteGuide() {
        ASCAd.getInstance().showFavoriteGuide("bar", "一键添加到我的小程序", "bottom");
    }


    // 抖音更多游戏横幅
    showMoreGamesBanner() {
        ASCAd.getInstance().showMoreGamesBanner();
    }
    hideMoreGamesBanner() {
        ASCAd.getInstance().hideMoreGamesBanner();
    }


    // 抖音快手开始录屏
    startGameVideo() {
        ASCAd.getInstance().startGameVideo(60);
    }
    // 抖音快手暂停录屏
    pauseGameVideo() {
        ASCAd.getInstance().pauseGameVideo();
    }
    // 抖音快手继续录屏
    resumeGameVideo() {
        ASCAd.getInstance().resumeGameVideo();
    }
    // 抖音快手结束录屏
    stopGameVideo() {
        ASCAd.getInstance().stopGameVideo(videoPath => {
            console.log("视频录制成功");
            this.videoPath = videoPath;
        });
    }
    // 抖音快手分享录屏
    shareVideo() {
        ASCAd.getInstance().shareVideo("这是抖音分享视频的标题", "这是头条分享视频的描述", "这是抖音分享视频的话题", this.videoPath, res => {
            if (res) {
                console.log("分享成功");
            } else {
                console.log("分享失败");
            }
        });
    }
    // 抖音强制登录
    mustLogin() {
        ASCAd.getInstance().mustLogin((suc) => {
            if (suc) {
                console.log("强制登录成功");
            } else {
                console.log("强制登录失败");
            }
        });
    }
    // 抖音跳转到更多游戏中心
    jumpToMoreGamesCenter() {
        ASCAd.getInstance().jumpToMoreGamesCenter();
    }


    // 微信互推icon
    showNavigateIcon() {
        ASCAd.getInstance().getNavigateIconFlag() && ASCAd.getInstance().showNavigateIcon(200, 200, view.getVisibleSize().width * 0.8, view.getVisibleSize().height * 0.6);
    }
    hideNavigateIcon() {
        ASCAd.getInstance().hideNavigateIcon();
    }

    // 微信互推列表
    showNavigateGroup() {
        ASCAd.getInstance().getNavigateGroupFlag() && ASCAd.getInstance().showNavigateGroup("vertcal", "right", 200, 0);
    }
    hideNavigateGroup() {
        ASCAd.getInstance().hideNavigateGroup();
    }

    // 微信结算互推
    // 结算互推1
    showNavigateSettle1() {
        ASCAd.getInstance().getNavigateSettleFlag() && ASCAd.getInstance().showNavigateSettle(1, 0, 0);
    }
    // 结算互推2
    showNavigateSettle2() {
        ASCAd.getInstance().getNavigateSettleFlag() && ASCAd.getInstance().showNavigateSettle(2, 0, 0);
    }
    hideNavigateSettle() {
        ASCAd.getInstance().hideNavigateSettle();
    }

    showNavigateInters() {
        ASCAd.getInstance().getNavigateInters() && ASCAd.getInstance().showNavigateInters();
    }

    // 微信格子(积木)广告
    // 1*5
    showBlock5() {
        ASCAd.getInstance().getBlockFlag() && ASCAd.getInstance().showBlock("white", 0, view.getVisibleSize().height, 5);
    }
    // 2*4
    showBlock8() {
        ASCAd.getInstance().getBlockFlag() && ASCAd.getInstance().showBlock("white", 0, view.getVisibleSize().height, 8);
    }
    hideBlock() {
        ASCAd.getInstance().hideBlock();
    }


    // QQ盒子广告
    showAppBox() {
        ASCAd.getInstance().getBoxFlag() && ASCAd.getInstance().showAppBox();
    }

    // QQ积木广告
    showBlock() {
        ASCAd.getInstance().getBlockFlag() && ASCAd.getInstance().showBlock("landscape", 0.2, 0.8, 5);
    }


    // 华为隐私协议
    showPrivacyAgreement(type) {
        ASCAd.getInstance().showPrivacyAgreement(type, "", (suc) => {
            if (suc) {
                console.log("点击同意");
            } else {
                console.log("点击取消");
            }
        })
    }



    // 安卓内购
    buyProp() {
        let tempOrderId = "";
        let callback = () => {
            // 下发道具
            console.log("下发道具");
            // 道具下发成功后必须调用
            ASCAd.getInstance().payComplete(tempOrderId);
        }
        ASCAd.getInstance().buyProps("1.00", "8888", "肉蛋葱鸡", (paySucc, orderId) => {
            if (paySucc) {
                tempOrderId = orderId;
                // 支付成功,下发道具
                callback();
            } else {
                // 支付失败
            }
        })
    }

}