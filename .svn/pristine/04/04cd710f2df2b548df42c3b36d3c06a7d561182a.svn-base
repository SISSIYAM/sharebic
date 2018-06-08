<template>
  <div id="wapper">
    <title-com :title-mes="title" class="titleCom"></title-com>
    <text-desc :GenText="getText" :detaText1="detaText1" :detaText2="detaText2"></text-desc>
    <from-suite-com></from-suite-com>
    <from-phone slot="fromphone" ref="userPhone"></from-phone>
    <from-pwd slot="frompwd" ref="userPwd"></from-pwd>
    <from-other slot="fromOther" :statusD="statusDes"></from-other>
  </div>
</template>

<script>
    export default {
        name: "",
        data(){
          return{
            title:'短信登录',
            getText:'密码登录',
            detaText1:'请输入您的手机和密码',
            detaText2:'登录您的YouTe停车桩账号',
            statusDes:{
              status:'part1',
              DeedText:'登录',
              ClauseText:'登录即表示已阅读并同意《车桩服务规则》'
            }
          }
        },
      methods:{
          sendPost:function () {
            var _this =this;
            let username = this.$refs.userPhone.value;
            let password = this.encrypt(this.$refs.userPwd.value);
            let regUser = /^1[3|4|5|7|8][0-9]{9}$/;
            console.log(username+" "+password);
            if(username == null || username == ''){
              _this.showTotal("提示信息",'手机号不能为空','');
            }else if(!regUser.test(username)){
              _this.showTotal("提示信息","请输入正确的手机号");
            }else{
              if(password == null || password == ''){
                _this.showTotal("提示信息","密码不能为空");
              }else{
                this.$http.post('/userLogin/login',{
                  mobile:username,
                  password:password
                })
                .then(function (response) {
                  console.log(response.data);
                  if(response.data.code != 200){
                    _this.showTotal("提示信息","用户名或密码错误",'');
                  }else{
                    _this.$router.push('/mainPage');
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
              }
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
