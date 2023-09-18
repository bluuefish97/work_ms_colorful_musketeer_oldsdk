export default class MoblieTokenDTO {
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
    constructor(channelId: string, userId: string, signParam: any) {
        this.channelId = channelId;
        this.userId = userId;
        this.signParam = signParam;
    }
}