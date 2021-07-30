export function offset(ele){
  // 可以获取到 ele 这个元素到body的偏移量
  let l = ele.offsetLeft,
      t = ele.offsetTop;// 获取当前元素到父级参照物的偏移量
  let parent = ele.offsetParent;// 获取父级参照物 
  while(parent){
    // 若父级参照物存在；
    l += (parent.clientLeft||0) + parent.offsetLeft;
    t += (parent.clientTop||0) + parent.offsetTop;
    parent = parent.offsetParent;
  }  
  return {
    l,t
  }
}

export function parseTime(time) {
  if (time) {
    var date = new Date(time)
    var year = date.getFullYear()
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    // 拼接
    return year + '年' + month + '月' + day + '日 ' + hours + ':' + minutes + ':' + seconds
  } else {
    return ''
  }
}

export function formatTime(time) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    )
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 替换邮箱字符
export function regEmail(email) {
  if (String(email).indexOf('@') > 0) {
    const str = email.split('@')
    let _s = ''
    if (str[0].length > 3) {
      for (var i = 0; i < str[0].length - 3; i++) {
        _s += '*'
      }
    }
    var new_email = str[0].substr(0, 3) + _s + '@' + str[1]
  }
  return new_email
}

// 替换手机字符
export function regMobile(mobile) {
  if (mobile.length > 7) {
    var new_mobile = mobile.substr(0, 3) + '****' + mobile.substr(7)
  }
  return new_mobile
}
  //日期转时间戳   2021/5/21
export function transdate(time){
  var date = new Date();
  date.setFullYear(time.substring(0, 4));
  date.setMonth(time.substring(5, 7) - 1);
  date.setDate(time.substring(8, 10));
  date.setHours(time.substring(11, 13));
  date.setMinutes(time.substring(14, 16));
  date.setSeconds(time.substring(17, 19));
  return Date.parse(date) / 1000;
}
// 转换时间戳，获取年月日-时分秒  2021/5/21
export function timestampToTime(timestamp) {
  var date = new Date(Number(timestamp)*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
  
  var strDate = Y+M+D;
  return strDate;//2020-07-30 01:05:54  
}
//标准时间转为时间戳
export function dateToMs (date) {
  let result = new Date(date).getTime();
  return result;
}
//实现方法 @return 返回2个值，一个是带时分秒，另一个不带。
export function msToDate (msec) {
  let datetime = new Date(msec);
  let year = datetime.getFullYear();
  let month = datetime.getMonth();
  let date = datetime.getDate();
  let hour = datetime.getHours();
  let minute = datetime.getMinutes();
  let second = datetime.getSeconds();
  let result1 = year +
               '-' +
               ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
               '-' +
               ((date + 1) < 10 ? '0' + date : date) +
               ' ' +
               ((hour + 1) < 10 ? '0' + hour : hour) +
               ':' +
               ((minute + 1) < 10 ? '0' + minute : minute) +
               ':' +
               ((second + 1) < 10 ? '0' + second : second);
  let result2 = year +
               '-' +
               ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
               '-' +
               ((date + 1) < 10 ? '0' + date : date);
  let result = {
      hasTime: result1,
      withoutTime: result2
  };
  return result;
}

export function toDecimal2(x) {    
  var f = parseFloat(x);   //将字符串转换为浮点型    
  if (isNaN(f)) {       //isNaN() 函数用于检查其参数是否是非数字值。
      return false;    
  }    
  var f = Math.round(x*100)/100;    
  var s = f.toString();    
  var rs = s.indexOf('.');    
  if (rs < 0) {    
      rs = s.length;    
      s += '.';    
  }    
  while (s.length <= rs + 2) {    
      s += '0';    
  }    
  return s;    
} 

export function time(str){
 let time = new Date(str).getTime()
}
export function formatting(time){
  var time = new Date(time);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y+'-'+repair0(m)+'-'+repair0(d)+' '+repair0(h);
}

export function repair0(m){
	return m<10?'0'+m:m 
}
//中英文脱敏展示
export function formatName(name) {
  var newStr;
  if (name.length === 2) {
      newStr = name.substr(0, 1) + '*';
  } else if (name.length > 2) {
      var char = '';
      for (var i = 0, len = name.length - 2; i < len; i++) {
          char += '*';
          char='***'
      }
      newStr = name.substr(0, 1) + char + name.substr(-1, 1);
  } else {
      newStr = name;
  }
  return newStr;
}