export default interface ServerInterface {
    // 初始化
    initAd();
    // 登录成功
    loginSucc(any);
    // 登录失败
    loginFail();
    // 强制登录
    mustLogin(callback);
}
