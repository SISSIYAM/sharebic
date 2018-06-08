export default {
  install(Vue, options) {
    // 给日期对象原型添加一个方法
    Date.prototype.format = function (format) {
      var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
      };
      if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
            date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
      }
      return format;
    }


    Vue.prototype.getCurrentDate = function (offerset) {
      var date = new Date();
      if (typeof(offerset) == 'number') {
        console.log("currentDate1:");
        date = new Date(date.getTime() + offerset * 1000 * 60 * 60 * 24);
      }
      let currentDate = date.format("yyyy-MM-dd hh:mm:ss").trim();
      console.log("currentDate:" + currentDate);
      return currentDate;
    };
  }
}
