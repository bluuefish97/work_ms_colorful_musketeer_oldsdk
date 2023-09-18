export interface AdInterface {

    /**
     * 变量区域*******************************************
     */
    /**
     * 广告开关区域*********************************
     */
    /**
     * 系统banner广告开关
     */
    SW_SystemBanner;
    /**
     * 系统插屏广告开关
     */
    SW_SystemInters;
    /**
     * 视频广告开关
     */
    SW_Video;
    /**
     * 原生广告开关
     */
    SW_Native;
    /**
     * 原生banner广告开关
     */
    SW_NativeBanner;
    /**
     * 原生插屏广告开关
     */
    SW_NativeInters;
    /**
     * 原生大图广告开关
     */
    SW_NativeImage;
    /**
     * 盒子广告开关
     */
    SW_Box;
    /**
     * 原生模板插屏广告开关
     */
    SW_NativeTemplate;
    /**
     * 原生模板banner广告开关
     */
    SW_NativeTemplateBanner;


    /**
     * 广告ID区域*************************************
     */
    /**
     * 系统banner广告ID
     */
    ID_SystemBanner;
    /**
     * 系统插屏广告ID
     */
    ID_SystemInters;
    /**
     * 原生广告ID
     */
    ID_Native;
    /**
     * 原生banner广告ID
     */
    ID_NativeBanner;
    /**
     * 原生插屏广告ID
     */
    ID_NativeInters;
    /**
     * 原生大图广告ID
     */
    ID_NativeImage;
    /**
     * 视频广告ID
     */
    ID_Video;
    /**
     * 盒子广告ID
     */
    ID_Box;
    /**
     * 积木广告ID
     */
    ID_Block;
    /**
     * 原生模板插屏广告ID
     */
    ID_NativeTemplate;
    /**
     * 原生模板banner广告ID
     */
    ID_NativeTemplateBanner;


    /**
     * 插屏四合一区域**********************************
     */
    /**
     * 原生插屏出现概率
     */
    NUM_NativeIntersP;
    /**
     * 系统插屏出现概率
     */
    NUM_SystemIntersP;
    /**
     * 互推插屏出现概率
     */
    NUM_NavigateIntersP;
    /**
     * 原生模板插屏出现概率
     */
    NUM_NativeTemplateP;



    /**
     * 广告基础控制区域******************************
     */
    /**
     * banner控制区域***************************
     */
    /**
     * banner刷新时间
     */
    NUM_BannerUpdateTime;
    /**
     * 系统banner优先？
     */
    SW_SystemBannerFirst;
    /**
     * banner最多展示次数
     */
    NUM_BannerMostShow;
    /**
     * banner关闭展示间隔时间
     */
    NUM_BannerCloseShowIntervalTime;

    /**
     * 插屏控制区域*****************************
     */
    /**
     * 插屏基础控制
     */
    SW_IntersBaseControl;
    /**
     * 插屏第几次开始展示
     */
    NUM_IntersStart;
    /**
     * 插屏展示间隔次数
     */
    NUM_IntersIntervalNum;
    /**
     * 插屏间隔最小时间
     */
    NUM_IntersIntervalTime;
    /**
     * 插屏延迟时间(ms)
     */
    NUM_IntersDelayTime;
    /**
     * 插屏延迟概率
     */
    NUM_IntersDelayP;

    /**
     * 插屏视频控制区域**************************
     */
    /**
     * 插屏视频延迟时间(ms)
     */
    NUM_IntersVideoDelayTime;
    /**
     * 插屏视频延迟展示概率0-100(%)
     */
    NUM_IntersVideoDelayP;

    /**
     * 原生控制区域******************************
     */
    /**
     * 原生广告刷新时间
     */
    NUM_NativeUpdateTime;


    /**
     * 桌面开关区域************************************
     */
    /**
     * 添加桌面图标开关
     */
    SW_AddDesktop;
    /**
     * 插屏间隔弹桌面图标开关
     */
    SW_IntersIntervalToAddDesktop;
    /**
     * 自动弹添加桌面次数
     */
    NUM_AutoAddDeskMostTimes;
    /**
     * 第几次插屏变添加桌面
     */
    NUM_IntersToAddDesktopNumber;


    /**
     * 互推区域
     */
    /**
     * 互推统计开关(默认开启)
     */
    SW_Statistics;
    /**
     * 互推icon开关
     */
    SW_NavigateIcon;
    /**
     * 互推列表开关
     */
    SW_NavigateGroup;
    /**
     * 结算互推开关
     */
    SW_NavigateSettle;
    /**
     * 互推游戏
     */
    pushGameList;


    /**
     * 区域屏蔽
     */
    /**
     * IP地址
     */
    IP;
    /**
     * 区域屏蔽开关
     */
    SW_AreaShielding;




    /**
     * 方法区
     */
    // 创建广告
    createAd();

    // 互推
    startLoadPushGamaes();

    getChannelId();

    showBanner(type?);
    hideBanner();

    getIntersFlag(sceneName?);
    showInters(callback?, sceneName?);

    getVideoFlag();
    showVideo(callback, reason);

    getNativeIconFlag();
    showNativeIcon(width, height, x, y);
    hideNativeIcon();

    getNativeImageFlag();
    showNativeImage(width, height, x, y, type?, hideCallback?);
    hideNativeImage();

    getNativePasterFlag();
    showNativePaster();

    getNativeAdInfo(type);
    reportNativeAdShow(adId);
    reportNativeAdClick(adId);

    getNavigateIconFlag();
    showNavigateIcon(width, height, x, y);
    hideNavigateIcon();

    getNavigateGroupFlag();
    showNavigateGroup(type, side, size, y);
    hideNavigateGroup();

    getNavigateSettleFlag();
    showNavigateSettle(type, x, y);
    hideNavigateSettle();

    getNavigatePasterFlag();
    showNavigatePaster();
    hideNavigatePaster();
    reportNavigatePasterClick();

    getNavigateInters();
    showNavigateInters();

    shareApp();

    getNavigateBoxBannerFlag();
    showNavigateBoxBanner();
    hideNavigateBoxBanner();

    getNavigateBoxPortalFlag();
    showNavigateBoxPortal(imageUrl?, marginTop?);
    hideNavigateBoxPortal();

    setGroup(group);

    hasAddDesktopFunc();
    getAddDesktopFlag(callback);
    addDesktop(callback);

    phoneVibrate(type);

    startGameVideo(duration);
    pauseGameVideo();
    resumeGameVideo();
    stopGameVideo(callback);
    shareVideo(title, desc, topics, videoPath, callback);
    shareAppById(templateId);

    jumpToMoreGamesCenter();

    showMoreGamesBanner();
    hideMoreGamesBanner();

    showFavoriteGuide(type, content, position);

    getUserData(callback);
    getUserInfo(callback);

    getBoxFlag();
    showAppBox();

    getBlockFlag();
    showBlock(type, x, y, blockSize);
    hideBlock();

    exitTheGame();

    reportAnalytics(params, data);

    showAuthentication(callback);

    visitorExperience(callback);

    showNativeAd(width, height, viewX, viewY);

    getOPPOShowMoreGameFlag();
    showOPPOMoreGame();

    openProtocol();
    openServiceAgreement();

    hasNetwork(callback);

    showReviewAlert();

    showiOSADWithScene(key, type);
    showiOSADWithType(key, type);
    videoUIShow(key);

    showPrivacyAgreement(companyLogUrl, htmlUrl, callback);


    buyProps(money, propId, propName, callback);
    payComplete(orderId);

    queryUnfilledOrder(callback);

    getLanguage();

    showScore();

    getNetworkstatus();

    openSettings();

    showADWithType(key, type);

    showTAEventData(data);

    showTAWithType(type, data);

    addUser(data);

    setUser(data);

    checkItemList(type, callback);

    getSubsRemainTime(id, callback);

    purchaseItem(id, type, callback);

    queryPurchases(type, callback);

    waitVideoLoad(waitTime, callback);

    reportVideoBtn(scene);

    reportVideoClick(scene);

    reqRemoteConfig(callback);
    getRemoteConfig(key);
    getAllRemoteConfig();

    reqPaySubInfo(callback);
    getAllPaySubInfo();

    getNetworkType();

    login(callback);

    reqProductInfo(callback);
    getProductInfo();

    setBannerState(state);
    setIntersState(state);

    getDIYFlag();
    showDIY(diy);
    hideDIY();

    startAppStore(packageName);


    customEvent(num, name, params);

    setPayRemoveAd(removeAd);

    setOnResultListener(callback);

    getNewWorkCountryIso();

    getDeviceInfo();

    showForum();
}
