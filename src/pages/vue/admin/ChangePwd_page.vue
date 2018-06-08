<template>
  <div id="wapper">
    <title-com :title-mid="reversedResu" id="titleCom"></title-com>
    <!-- 第一部分 -->
    <div v-if="passCheck" class="itemWap">
      <p>在修改密码之前需要对您的手机号进行验证</p>
      <div class="checkItem">
        <div class="checkInput">
          <el-input placeholder="6位短信验证码" v-model="checkNum" clearable maxlength="6">
            <template slot="prepend">
              <div style="width: 35px;font-size: small">
                <span style="color: black;">验证码</span>
              </div>
            </template>
          </el-input>
        </div>
        <el-button type="primary" ref="sendButton" @click="doSendCheck">发送验证码</el-button>
      </div>
      <div class="ButtomUse" @click.prevent="nextStepCheck">
        <el-button type="primary">下一步</el-button>
      </div>
    </div>
    <!-- 第二部分 -->
    <div v-else class="itemWap">
      <p>密码由8-16位英文字母、数字或字符组成</p>
      <div class="checkItem">
        <div class="input_text">
          <el-input v-model="value" :type="TextType" placeholder="请输入密码">
            <template slot="prepend">
              <div style="width: 35px;">
                <span style="color: black;">密码</span>
              </div>
            </template>
            <i slot="suffix" class="el-input__icon el-icon-view" @click="showPwd"></i>
          </el-input>
        </div>
      </div>
      <div class="ButtomUse" @click.prevent="savePassWord">
        <el-button type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data(){
      return{
        checkNum:'',
        value:"",
        TextType:"password",
        passCheck:true,
        sendStatus:false
      }
    },
    computed:{
      reversedResu:function () {
        if(this.passCheck){
          return "验证手机";
        }else{
          return "设置密码";
        }
      }
    },
    mounted(){
      if(this.$route.params.oldName){
        this.value = this.$route.params.oldName;
      }
    },
    methods:{

      nextStepCheck:function () {
        if(checkNum == null || checkNum.length <= 0){
          this.showTotal("提示信息","验证码不能为空");
        }else if(!this.sendStatus){
          this.showTotal("提示信息","您尚未通过验证码验证");
        }else {
          this.passCheck = false;
        }
      },

      // 发送验证码
      doSendCheck:function(){
        var _this = this;
      //  调用接口
        this.$http.post('/login/getVerif',{
          mobile:17535129408
        })
        .then(function (response) {
          console.log(response);
          if(response.data.code == 200){
            _this.showTotal("提示信息","发送成功");
            _this.sendStatus = true;
          }else{
            _this.showTotal("提示信息","发送失败，请稍后重试");
          }
        })
        .catch(function (error) {
          console.log(error);
        })
      },

      //  更改密码可见性
      showPwd:function () {
        if(this.TextType == "password"){
          this.TextType = "text";
        }else{
          this.TextType = "password"
        }
      },

      // 更改密码
      savePassWord:function(){
        if(this.value == null || this.value == ""){
          this.showTotal("提示信息","密码不能为空");
        }else if(this.value == "123123"){
          this.showTotal("提示信息","密码不符合规范");
        } else{
          this.showComfir("提示信息","确定将密码改为"+this.value+"吗");
        }
      },

      showComfir:function(title,content){
        let _this = this;
        //  弹出框
        this.$vux.confirm.show({
          title:title,
          content:content,
          theme:"ios",
          confirmText:"确认修改",
          // 组件除show外的属性
          onCancel () {
            console.log("已经取消") // 当前 vm
          },
          onConfirm () {
            _this.$router.push({
              path:'/AdminInfo',
              name:'AdminInfo',
              params:{
                newName:_this.value
              }
            })
          }
        })
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

  *{
    overflow: hidden;
  }

  #wapper{
    font-family: "Ping SC Regular";
    font-weight: 600;
    width: 100%;
    height: 100%;
    #titleCom{
      height: 8%;
    }
    .itemWap{
      margin-top: 5%;
    }

    .checkItem{
      margin-top: 1em;
      display: inline-block;
      margin-bottom: 3%;
      width: 92%;
      .checkInput{
      font-weight: bold;
      color: black;
      font-size: 1.2em;
      margin-right: 2%;
      width: 65%;
      float: left;
      }
      .el-button--primary{
      float: right;
      width: 33%;
      }
    }
    .ButtomUse{
      width: 92%;
      margin-top: 1.6ex;
      button{
        width: 100%;
        height: 3.5em;
      }
    }

    .checkInput{
      font-weight: bold;
      color: black;
      font-size: 1.2em;
      margin-right: 2%;
      width: 65%;
      float: left;
    }
  }
</style>
