<template>
  <div class="wrapper">
    <title-com :title-mid="title" :to-path-url="url" class="titleCom"></title-com>
    <div class="wrapper_back">
      <div class="infoWrapper">
        <!--<div class="rowDiv">-->
          <!--<p class="txt">头像</p>-->
          <!--<img class="userImage" :src="changeImg"/>-->
          <!--<img class="rightArrow" src="../../../../static/images/right_arrow.png"/>-->
        <!--</div>-->
        <!--<div class="line"></div>-->
        <div class="rowDiv2" @click="changeUserName">
          <p class="txt">昵称</p>
          <p class="nickName" @changName="changName">{{ user.userName }}</p>
          <img class="rightArrow" src="../../../../static/images/right_arrow.png"/>
        </div>
        <div class="line"></div>
        <div class="rowDiv2" @click="changeUserPwd">
          <p class="txt">重置密码</p>
          <p class="nickName">{{ user.userPwd }}</p>
          <img class="rightArrow" src="../../../../static/images/right_arrow.png"/>
        </div>
        <div class="line"></div>
        <!--<div class="rowDiv2">-->
          <!--<p class="txt">性别</p>-->
          <!--<div style="width: 80%;margin-right: -7px;">-->
            <!--<group class="sexChange">-->
              <!--<popup-radio :options="option" v-model="user.userSex">-->
              <!--</popup-radio>-->
            <!--</group>-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <div  class='logOutDiv' >
        <p class='logOutTxt' @click="logOut">退出登录</p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        title:"",
        url:'/mainPage',
        user:{
          userName:'',
          userPwd:'',
          userSex:""
        },
        option:['男','女']
      }
    },

    computed:{
      changeImg:function () {
        if(this.user.userSex == '男' || this.user.userSex == "未填写"){
          return 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/ceab61fdc2504e85bfb7f27c532f8bab.png';
        }else{
          return 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/b0ca2fd8c7a84397a4491aba36c17b6d.png';
        }
      }
    },

    mounted(){
      if(this.$route.params.newName){
        this.user.userName = this.$route.params.newName;
      }
    },

    methods: {
      backPrePage: function () {
        this.$router.push({
          path: '/mainPage',
          name: 'mainPage',
          query: {
            isFromLeftDrawer: true,
          }
        })
      },

      logOut:function () {
        this.showComfir('提示信息',"退出后您无法使用停车桩")
      },

      //  修改昵称的跳转
      changeUserName:function(){
        this.$router.push({
          path:'/ChangeName_page',
          name:'ChangeName_page',
          params:{
            oldName:this.user.userName
          }
        })
      },

      //  修改用户密码
      changeUserPwd:function(){
        this.$router.push({
          path:'/ChangePwd_page',
          name:'ChangePwd_page'
        })
      },

      showComfir:function(title,content){
        let _this = this;
        //  弹出框
        this.$vux.confirm.show({
          title:title,
          content:content,
          theme:"ios",
          confirmText:"继续退出",
          // 组件除show外的属性
          onCancel () {
            console.log("已经取消") // 当前 vm
          },
          onConfirm () {
            _this.$router.push('/');
          }
        })
      },

      // 反馈修改内容
      changName:function (val) {
        this.user.userName = val;
      }
    },
  }
</script>

<style lang="scss">
  .wrapper{
    width: 100%;
    height: 100%;
    font-family: "Ping SC Regular";
    font-weight: 600;
  }
  .titleCom{
    height: 8%;
  }
  .wrapper_back{
    background-color: #f9f9f9;
    width: 100%;
    height: 100%;
  }
  .line {
    background-color:#dfdfdf;
    height: 1px;
    width: 100%;
    opacity: 0.4;
    margin-left: 20px;
  }
  /*********用户  *********/
  .logOutDiv{
    width: 90%;
    background-color: #ff3b30;
    margin: 20px auto;
    border-radius: 10px;
  }
  .logOutTxt{
    padding: 15px;
    font-size: 14px;
    color: white;
  }
  .nickName{
    position: absolute;
    right: 50px;
    font-size: 14px;
    color: #666666;
  }
  .rightArrow {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 20px;
  }

  .rowDiv {
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  }


  .rowDiv2 {
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  }

  .sexChange{
    width: 80%;
    height: 60px;
    .weui-cells{
      margin: 0px 0px;
      padding: 0px 0px;
      height: 60px;
    }
    .weui-cell_access,.weui-cell__ft{
      padding: 0px 0px;
    }
    .weui-cell,.vux-tap-active,.weui-cell_access{
      height: 60px;
    }
    .vux-cell-value{
      margin-right: 11px;
    }
  }



  .userImage {
    width: 58px;
    height: 58px;
    position: absolute;
    right: 50px;
  }

  .infoWrapper {
    background-color: white;
  }

  .txt {
    position: absolute;
    left: 20px;
    font-size: 14px;
    color: #333333;
  }
</style>
