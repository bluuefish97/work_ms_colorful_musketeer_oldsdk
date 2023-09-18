
import { _decorator, Component, Node, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MathTool')
export class MathTool {
    /**
        * 如果value在min与max之间，返回value。如果value小于min，返回min。如果value大于max，返回max
        * @param value 
        * @param min 
        * @param max 
        */
    public static clamp(value: number, min: number, max: number) {
        let temp = value
        if (value <= min) {
            temp = min;
        }
        else if (value > max) {
            temp = max;
        }
        return temp;
    }

    /**
     * 在一个值的正反区间随机值
     */
    static randomPositiveNegative(value: number) {
        if (isNaN(value)) {
            return;
        }
        else {
            return Math.random() * 2 * value - value;
        }
    }

    /**
     * 使当前值加上待增加的值后不会大于最大边界值
     * @param curValue 当前值
     * @param addValue 待增加的值
     * @param maxValue 最大边界值
     */
    static loopValue(curValue: number, addValue: number, maxValue: number) {
        if (maxValue == 0) {
            console.error("maxValue 不可为0");
            return;

        }
        let tempVal = curValue + addValue;
        if(tempVal < 0) {
            tempVal = -tempVal;
        }
        if(tempVal > maxValue) {
            let v = Math.floor(tempVal/maxValue)%2 == 0? 1 : -1;
            tempVal = maxValue/2 - (maxValue/2)*v +(tempVal % maxValue) * v;
        }
        return tempVal;
    }


    /**
     * 将当前值从正数转换到对应的正反值  如 curValue = 0.3/0.5/0.7 sumRange = 1 转换后 curValue=-0.2/ 0 /0.2 
     * @param curValue 当前值
     * @param sumRange 区间大小
     */
    static signedConversion(curValue: number, sumRange: number) {
        // if (sumRange < curValue) {
        //     console.error("sumRange<curValue");
        //     return;
        // }
        return curValue - sumRange / 2;
    }

    static randomRange(min: number, max: number) {
        let vel = Math.random() * (max - min) + min;
        return vel;
    }
    /**
     * 实现数字千分位
     * @param num
     * @param precision
     * @param separator
     * @returns {*}
     *=======================================================
     *     formatNumber(10000)="10,000"
     *     formatNumber(10000, 2)="10,000.00"
     *     formatNumber(10000.123456, 2)="10,000.12"
     *     formatNumber(10000.123456, 2, ' ')="10 000.12"
     *     formatNumber(.123456, 2, ' ')="0.12"
     *     formatNumber(56., 2, ' ')="56.00"
     *     formatNumber(56., 0, ' ')="56"
     *     formatNumber('56.')="56"
     *     formatNumber('56.a')=NaN
     *=======================================================
     */
    public static formatNumber(num: any, precision?: any, separator?: any) {
        var parts;
        // 判断是否为数字
        if (!isNaN(parseFloat(num)) && isFinite(num)) {
            // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
            // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
            // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
            // 的值变成了 12312312.123456713
            num = Number(num);
            // 处理小数点位数
            num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
            // 分离数字的小数部分和整数部分
            parts = num.split('.');
            // 整数部分加[separator]分隔, 借用一个著名的正则表达式
            parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ' '));

            return parts.join('.');
        }
        return NaN;
    }

    /**
     * 提取字符串中的数字
     * @param str 
     */
    static extractNumberOfArray(str: string) {
        var num = Number(str.replace(/[^\d]/g, ''));
        return num;
    }

}


