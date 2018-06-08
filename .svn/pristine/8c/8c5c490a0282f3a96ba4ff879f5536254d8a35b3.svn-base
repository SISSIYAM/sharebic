'use strict';
var VuxCom = {
  totalShow:function(textWord,postion,Vue) {
    if(Vue == null || Vue == ""){
      var _this = this;
    }else{
      var _this = Vue;
    }
    if(postion == null || postion == ""){
      _this.$vux.toast.text(textWord,'middle');
    }else{
      _this.$vux.toast.text(textWord,postion);
    }
  },

  showTotal:function(title,content,strPath,VUE){
    if(VUE == null || VUE == ""){
      var _this = this;
    }else{
      var _this = VUE;
    }
    //  弹出框
    _this.$vux.alert.show({
      title: title,
      content: content,
      onHide () {
        if(strPath == null || strPath == ''){
          console.log("隐藏");
        }else{
          _this.$router.push(strPath);
        }
      }
    })
  },
}

export default VuxCom;
