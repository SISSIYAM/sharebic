<template>
  <div class="wrapper">
    <title-com :title-mid="title" :to-path-url="url" class="titleCom"></title-com>
    <div class="wrapper_back">
      <div class="infoWrapper">
        <div class="rowDivMoney">
          <p class="txt3">余额(元)</p>
          <p class="txt2">{{ money }}</p>
        </div>
        <div class="line"></div>
        <div class="rowDiv2" @click="recharge">
          <img class="smallIcon" src="../../../../static/images/recharge.png">
          <p class="txtWallet">充值</p>
          <img class="rightArrow" src="../../../../static/images/right_arrow.png"/>
        </div>
        <div class="line"></div>
        <div class="rowDiv2" @click="reposit">
          <img class="smallIcon" src="../../../../static/images/reposit.png">
          <p class="txtWallet">提现</p>
          <img class="rightArrow" src="../../../../static/images/right_arrow.png"/>
        </div>
      </div>
      <p class="txt4" @click="rechargeHistory">充值记录</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "我的钱包",
        url: '/mainPage',
        money: '0.00'
      }
    },

    computed: {
      changeImg: function () {
        if (this.user.userSex == '男' || this.user.userSex == "未填写") {
          return 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/ceab61fdc2504e85bfb7f27c532f8bab.png';
        } else {
          return 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/b0ca2fd8c7a84397a4491aba36c17b6d.png';
        }
      }
    },

    mounted() {
      if (this.$route.params.newName) {
        this.user.userName = this.$route.params.newName;
      }
      this.getMoney()
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

      //  充值
      recharge: function () {
        this.$router.push({
          path: '/recharge',
          name: 'recharge',
        })
      },

      //  提现
      reposit: function () {
      },

      rechargeHistory: function () {
        this.$router.push({
          path: '/rechargeHistory',
          name: 'rechargeHistory',
        })
      },
      getMoney: function () {
        var _this = this;
        this.$http.post('/tradeAccount/showBalance', {})
          .then(function (response) {
            console.log(response.data);
            if (response.data.code != 200) {
              console.log("获取余额失败")
              _this.showTotal("提示信息", "获取余额失败", '');
            } else {
              console.log("获取余额成功")
              _this.money = response.data.data;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      showTotal: function (title, content, strPath) {
        let Vue = this;
        //  弹出框
        this.$vux.alert.show({
          title: title,
          content: content,
          onHide() {
            if (strPath == null || strPath == '') {
              console.log("隐藏")
            } else {
              Vue.$router.push(strPath);
            }
          }
        })
      }
    },
  }
</script>

<style lang="scss">
  .wrapper {
    width: 100%;
    height: 100%;
    font-family: "Ping SC Regular";
    font-weight: 600;
  }

  .titleCom {
    height: 8%;
  }

  .wrapper_back {
    background-color: #f9f9f9;
    width: 100%;
    height: 100%;
  }

  .line {
    background-color: #dfdfdf;
    height: 1px;
    width: 100%;
    opacity: 0.4;
    margin-left: 20px;
  }

  .nickName {
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

  .rowDivMoney {
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    background-image: url("./../../../../static/images/wallet_background.png");
  }

  .rowDiv2 {
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  }

  .smallIcon {
    margin-left: 10px;
    width: 22px;
    height: 22px;
  }

  .sexChange {
    width: 80%;
    height: 60px;
    .weui-cells {
      margin: 0px 0px;
      padding: 0px 0px;
      height: 60px;
    }
    .weui-cell_access, .weui-cell__ft {
      padding: 0px 0px;
    }
    .weui-cell, .vux-tap-active, .weui-cell_access {
      height: 60px;
    }
    .vux-cell-value {
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

  .txtWallet {
    margin-right: 70%;
    font-size: 14px;
    color: #333333;
  }

  .txt2 {
    margin-top: 10%;
    font-size: 50px;
    color: #ffffff;
  }

  .txt3 {
    margin-top: 10%;
    font-size: 20px;
    color: #ffffff;
  }

  .txt4 {
    margin-top: 60%;
    font-size: 13px;
    color: #B2B2B2;
  }
</style>
