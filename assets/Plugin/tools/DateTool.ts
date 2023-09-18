/****************************************************
文件：DateTool.ts
作者：zhangqiang
邮箱: 2574628254@qq.com
日期：2021-1-12 14:43:47
功能：
*****************************************************/

export default class DateTool {
  //自定义日期的结构体格式
  static DateFormat_Custom = function (_d: Date): CustomDate {
    let _date = new CustomDate();
    _date.year = _d.getFullYear();
    _date.month = _d.getMonth() + 1;
    _date.date = _d.getDate();  //日期
    _date.day = _d.getDay();      //星期几
    _date.hour = _d.getHours() > 9 ? _d.getHours() : '0' + _d.getHours();
    _date.minute = _d.getMinutes() > 9 ? _d.getMinutes() : '0' + _d.getMinutes();
    _date.second = _d.getSeconds() > 9 ? _d.getSeconds() : '0' + _d.getSeconds();
    _date.time = _d.getTime();
    _date.timeString = _date.year + ':' + _date.month + ':' + _date.date + ':' + _date.hour + ':' + _date.minute + ':' + _date.second;
    return _date
  }

  static timeChangeToStr(time: number, digit: number) {
    let h: number; //小时
    let m: number; //分钟
    let s: number; //秒
    h = Math.floor(time / (60 * 60))
    m = Math.floor((time % (60 * 60)) / 60)
    s = time % 60;
    // console.log("h " + h + "  m  " + m + "  s  " + s);
    let hstr: string = h < 10 ? "0" + h : h.toString()
    let mstr: string = m < 10 ? "0" + m : m.toString()
    let sstr: string = s < 10 ? "0" + s : s.toString()
    let str;
    if (digit == 2) {
      str = mstr + ":" + sstr;  //+ " : " 
    }
    else if (digit == 3) {
      str = " " + hstr + " : " + mstr + " : " + sstr;
    }
    // console.log(str);
    return str;
  }

  //检测是否是新的一天
  static checkIsNewDay(nowDate: CustomDate, lastSignDate: CustomDate) {
    if (nowDate.year == lastSignDate.year) {
      if (nowDate.month == lastSignDate.month) {
        if (nowDate.date > lastSignDate.date) {
          return true;
        }
      } else if (nowDate.month > lastSignDate.month) {
        return true;
      }
    } else if (nowDate.year > lastSignDate.year) {
      return true;
    }
    return false;
  }
}
export class CustomDate {
  year: number;
  month: number;
  date: number;
  day: number;
  hour: number | string;
  minute: number | string;
  second: number | string;
  time: number;
  timeString: string;
}