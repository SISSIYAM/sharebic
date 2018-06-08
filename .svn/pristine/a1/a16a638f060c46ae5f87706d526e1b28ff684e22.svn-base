<template>
    <div id="wapper">
      <title-com :title-mes="title" class="titleCom"></title-com>
      <text-desc :GenText="getText" :detaText1="detaText1" :detaText2="detaText2"></text-desc>
      <from-suite-com></from-suite-com>
      <from-phone slot="fromPhone" ref="userPhone"></from-phone>
      <from-check slot="fromCheck" ref="useCheckNum"></from-check>
      <from-other slot="fromOther" :statusD="statusDes"></from-other>
    </div>
</template>

<script>
    export default {
        name: "",
        data(){
          return{
            title:'',
            getText:'找回密码',
            detaText1:'请输入您的手机号码',
            detaText2:'验证并重新设置新的登录密码',
            statusDes:{
              status:'part4',
              DeedText:'验证'
            }
          }
        },
      methods: {
        sendCheck: function () {
          var _this = this;
          let regUser = /^1[3|4|5|7|8][0-9]{9}$/;
          console.log("发送验证码");
          let userPhone = this.$refs.userPhone.value;
          if (userPhone == null || userPhone == '') {
            _this.showTotal('提示信息', '手机号不能为空', '');
            return false;
          } else if (!regUser.test(userPhone)) {
            _this.showTotal('提示信息', '请输入正确的手机号', '');
            return false;
          } else {
            this.$http.post('/userLogin/getVerif', {
              mobile: userPhone
            })
              .then(function (response) {
                console.log(response.data);
                if (response.data.code == 200) {
                  _this.showTotal("提示信息", '发送验证码成功', '')
                } else {
                  _this.showTotal("提示信息", '发送验证码失败', '')
                }
              })
              .catch(function (error) {
                console.log(error);
              });
            return true;
          }
        },
        showTotal: function (title, content, strPath) {
          let Vue = this;
          //  弹出框
          this.$vux.alert.show({
            title: title,
            content: content,
            onHide() {
              Vue.$router.push(strPath);
            }
          })
        },
        sendPost: function () {
          var _this = this;
          let userPhone = _this.$refs.userPhone.value;
          let userCode = _this.$refs.useCheckNum.checkNum;
          let regUser = /^1[3|4|5|7|8][0-9]{9}$/;
          if (userPhone == null || userPhone == "") {
            _this.showTotal('提示信息', '手机号不能为空', '');
          } else if (!regUser.test(userPhone)) {
            _this.showTotal('提示信息', '请输入正确的手机号', '');
          } else {
            if (userCode == null || userCode == '') {
              _this.showTotal('提示信息', '验证码不能为空', '');
            } else {
              _this.showTotal("提示信息", '您已经通过验证', '/retPwdP2?userPhone=' + userPhone + '&userCheck=' + userCode);
            }
          }
        }
      }
    }
</script>

<style scoped lang="scss">

  *{
    overflow: hidden!important;
  }

  #wapper{
    width: 100%;
    height: 100%;
    .titleCom{
      height: 8%;
    }
  }
  /* 图标动态调整 */
  .fa-icon {
    width: auto;
    height: 1em; /* 或任意其它字体大小相对值 */

    /* 要在 Safari 中正常工作，需要再引入如下两行代码 */
    max-width: 100%;
    max-height: 100%;
  }
</style>
