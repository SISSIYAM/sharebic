<template>
  <div id="wapper">
    <title-com :title-mes="title" class="titleCom"></title-com>
    <text-desc :GenText="getText" :detaText1="detaText1" :detaText2="detaText2"></text-desc>
    <div class="input_text">
      <el-input :type="TextType" v-model="value" ref="userPwd" placeholder="请设置新的登录密码">
        <template slot="prepend"><span style="color: black">新密码</span>&nbsp;</template>
        <i slot="suffix" class="el-input__icon el-icon-view" @click="showPwd"></i>
      </el-input>
    </div>
    <from-suite-com></from-suite-com>
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
            TextType:'password',
            detaText1:'请重置您的密码',
            detaText2:'请设置您的新密码并牢记',
            statusDes:{
              status:'part5',
              DeedText:'确定'
            },
            value:""
          }
        },

        methods:{
          //  更改密码可见性
          showPwd:function () {
            if(this.TextType == "password"){
              this.TextType = "text";
            }else{
              this.TextType = "password"
            }
          },
          // 用于发送参数
          sendPost:function () {
            var _this = this;
            let userPhone = this.$route.query.userPhone;
            let userCheck= this.$route.query.userCheck;
            let newPass = this.encrypt(this.$refs.userPwd.value);
            console.log(userPhone+"  "+userCheck+"  "+newPass);
            if(newPass == null || newPass == ''){
              _this.$vux.alert.show({
                title: "提示信息",
                content: "新密码不能为空",
                onHide () {
                  console.log("隐藏")
                }
              })
            }else{
              this.$http.post('/userLogin/findPassword',{
                mobile:userPhone,
                verif:userCheck,
                password:newPass
              })
                .then(function (response) {
                  console.log(response.data);
                  if(response.data.code != 200){
                    _this.showTotal("提示信息",'重置密码失败请重试','/retPwdP1')
                  }else{
                    _this.showTotal("提示信息",'重置密码成功请重新登录','/loginPwd')
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
          },
          showTotal:function(title,content,strPath){
            let Vue = this;
            //  弹出框
            this.$vux.alert.show({
              title: title,
              content: content,
              onHide () {
                Vue.$router.push(strPath);
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

  .input_text{
    width: 90%;
    font-weight: bold;
    color: black;
    font-size: 1.1em;
    margin: 0.57em auto;
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
