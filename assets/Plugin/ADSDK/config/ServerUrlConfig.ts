
const XGAMEURL = "https://cloud.xminigame.com/api";
// test
// const XGAMEURL = "http://test.martianyun.com/api";

export const ServerUrlConfig = {
    getMobileTokenUrl: XGAMEURL + '/xmini-game-user/mobile/login/getMobileToken',//登录成功用户获取服务端token
    getVisitorTokenUrl: XGAMEURL + '/xmini-game-user/mobile/login/getVisitorToken',//游客用户获取服务端token
    downAdConfigureUrl: XGAMEURL + '/xmini-game-advert/mobile/advert/downAdConfigure',//下发广告参数
    downPushGamesUrl: XGAMEURL + '/xmini-game-advert/mobile/pushgame/downPushGames',//下发互推游戏参数
    collectAdPushUrl: XGAMEURL + '/xmini-game-user/mobile/pushdata/collectAdPush',//互推统计
}