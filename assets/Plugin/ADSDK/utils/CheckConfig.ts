/**
 * 检查参数
 */
export default class CheckConfig {

    /**
     * 判断字符串中是否有空格,适用于检查后台填写的广告ID
     */
    static stringHasSpace(str: string) {
        if (str == null) return true;
        let num = str.indexOf(" ");
        if (num == -1) {
            return false;
        } else {
            return true;
        }
    }

}