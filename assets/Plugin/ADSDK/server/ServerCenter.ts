import HttpRequest from "../utils/HttpRequest";
import ServerFactory from "./ServerFactory";
import MoblieTokenDTO from "./dto/MoblieTokenDTO";
import { ServerUrlConfig } from "../config/ServerUrlConfig";
import GetConfig from "../utils/GetConfig";
import VisitorTokenDTO from "./dto/VisitorTokenDTO";
import LocalStorage from "../utils/LocalStorage";
import AdCenter from "../ad/AdCenter";


export default class ServerCenter {
    private static instance: ServerCenter;
    /**
     * ServerCenter 单例
     */
    public static getInstance(): ServerCenter {
        if (!ServerCenter.instance) {
            ServerCenter.instance = new ServerCenter();
        }
        return ServerCenter.instance;
    }

    /**
     * 服务器工厂对象
     */
    serverFactory;

    constructor() {
        this.serverFactory = ServerFactory.produceServer();
    }

    /**
     * 游戏初始化调用
     */
    initAd() {
        console.log("XminigameSDK", "当前版本：", GetConfig.getSdkVersion());
        console.log("XminigameSDK", "当前渠道：", GetConfig.getChannelName());
        console.log("XminigameSDK", "当前渠道ID：", GetConfig.getChannelId());
        this.serverFactory.initAd();
    }


    /**
     * 1.去xminigame登录，正式登录
     */
    getMoblieToken(moblieTokenDTO: MoblieTokenDTO, callback: any) {
        console.log("XminigameSDK", "moblieTokenDTO", JSON.stringify(moblieTokenDTO));
        HttpRequest.getInstance().requestPost(ServerUrlConfig.getMobileTokenUrl, moblieTokenDTO, callback);
    }
    /**
     * 1.去xminigame登录,游客登录
     */
    getVisitorToken(visitorTokenDTO: VisitorTokenDTO, callback: any) {
        console.log("XminigameSDK", "visitorTokenDTO", JSON.stringify(visitorTokenDTO));
        HttpRequest.getInstance().requestPost(ServerUrlConfig.getVisitorTokenUrl, visitorTokenDTO, callback);
    }

    /**
     * 2.下发广告参数
     */
    downAdConfigure(callback) {
        HttpRequest.getInstance().requestGet(ServerUrlConfig.downAdConfigureUrl, LocalStorage.getData('token'), true, callback);
    }

    /**
     * 3.下发互推游戏参数
     */
    downPushGames(callback) {
        HttpRequest.getInstance().requestGet(ServerUrlConfig.downPushGamesUrl, LocalStorage.getData('token'), false, callback);
    }

    /**
     * 互推统计
     */
    collectAdPush(pushGamePackage, callback) {
        HttpRequest.getInstance().requestPostWithAuthor(ServerUrlConfig.collectAdPushUrl, pushGamePackage, LocalStorage.getData('token'), callback);
    }


    /**
     * 强制登录
     */
    mustLogin(callback) {
        this.serverFactory.mustLogin(callback);
    }

    /**
     * 强制登录调用
     */
    clearHasGetToken() {
        HttpRequest.getInstance().clearHasGetToken();
    }


    /**
     * 获取内存中的广告参数并传给AdCenter的adConfig
     */
    getLocalStorageAdConfig() {
        let adConfig = LocalStorage.getJsonData('adConfig');
        AdCenter.getInstance().adConfig = adConfig;
        AdCenter.getInstance().startLoadAd();
    }

    /**
     * 获取内存中的互推游戏参数并传给AdCenter的pushGamesConfig
     */
    getLocalStoragePushGamesConfig() {
        let pushGamesConfig = LocalStorage.getJsonData('pushGamesConfig');
        AdCenter.getInstance().pushGamesConfig = pushGamesConfig;
        AdCenter.getInstance().startLoadPushGamaes();
    }

}