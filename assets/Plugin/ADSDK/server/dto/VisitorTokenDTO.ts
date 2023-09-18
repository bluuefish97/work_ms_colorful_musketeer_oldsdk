import MD5 from "../../utils/Md5"

export default class VisitorTokenDTO {
    /**
     * 渠道号
     */
    channelId: string;
    /**
     * 用户ID
     */
    userId: string;
    /**
     * 签名参数
     */
    signParam: any;
    constructor(channelId: string, userId: string) {
        this.channelId = channelId;
        this.userId = userId;
        this.signParam = {
            "sign": MD5.init(channelId),
            "sdkVersionCode": "2"
        };
    }
}