<template>
    <div id="wapper">
      <title-com :title-mes="title" class="titleCom"></title-com>
      <text-desc :GenText="getText" :detaText1="detaText1" :detaText2="detaText2"></text-desc>
      <from-suite-com></from-suite-com>
      <from-phone slot="fromPhone" ref="userPhone"></from-phone>
      <from-check slot="fromCheck" ref="userCheck"></from-check>
      <from-other slot="fromOther" :statusD="statusDes"></from-other>
    </div>
</template>

<script>
    export default {
        name: "",
        data(){
          return{
            title:'密码登录',
            getText:'手机验证',
            detaText1:'请输入您的手机号码，',
            detaText2:'登录或注册您的YouTe停车桩账号',
            statusDes:{
              status:'part2',
              DeedText:'登录',
              ClauseText:'点击登录，即表示已阅读并同意《车桩服务规则》'
            }
          }
        },
      methods:{
          sendPost:function () {
            var _this = this;
            let userPhone = this.$refs.userPhone.value;
            let userCheck = this.$refs.userCheck.checkNum;
            console.log(userPhone+"  "+userCheck);
            if(userPhone == null || userPhone == ""){
              _this.showTotal("提示信息","手机号不能为空",'');
            }else if(userCheck == null || userCheck == ""){
              _this.showTotal("提示信息","验证码不能为空",'');
            }else{
              this.$http.post('/userLogin/loginVerif',{
                mobile:userPhone,
                verif:userCheck
              })
                .then(function (response) {
                  console.log(response);
                  if(response.data.code != 200){
                    _this.showTotal("提示信息","登录失败，请重试",'');
                  }else if(response.data.code == 200){
                    if(response.data.data == -1){
                      _this.showTotal('提示信息','新用户请注册','/perfInfo');
                    }else if(response.data.data == -2){
                      _this.showTotal('提示信息','请您完善您的信息','/perfInfo');
                    }else if(response.data.data == -3){
                      _this.showTotal("提示信息","登录失败，请重试",'');
                    }else if(response.data.data > 0){
                      _this.$router.push('/mainPage');
                    }else{
                      _this.showTotal("提示信息","未知异常",'');
                    }
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
          },

          sendCheck:function () {
            var _this = this;
            let userPhone = this.$refs.userPhone.value;
            let regUser = /^1[3|4|5|7|8][0-9]{9}$/;
            if(userPhone == null || userPhone == ''){
              _this.showTotal("提示信息",'手机号不能为空');
              return false;
            }else if(!regUser.test(userPhone)){
              _this.showTotal("提示信息",'请输入正确的手机号');
              return false;
            }else{
              this.$http.post('/userLogin/getVerif',{
                mobile:userPhone
              })
                .then(function (response) {
                  console.log(response.data);
                  if(response.data.code == 200){
                    _this.showTotal("提示信息",'发送验证码成功','');
                  }else{
                    _this.showTotal("提示信息",'请稍后重试','');
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
              return true;
            }
          },
        showTotal:function(title,content,strPath){
          let Vue = this;
          //  弹出框
          this.$vux.alert.show({
            title: title,
            content: content,
            onHide () {
              if(strPath == null || strPath == ''){
                console.log("隐藏")
              }else{
                Vue.$router.push(strPath);
              }
            }
          })
        },
      }
    }
</script>

<style scoped lang="scss">
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
