<template>
  <div id="wapper">
    <title-com :title-mid="titleMid" id="titleCom"></title-com>
    <div class='row'>
      <div class="number" @click.prevent="value = 100">
        <el-button type="normal">100元</el-button>
      </div>
      <div class="number" @click.prevent="value = 50">
        <el-button type="normal">50元</el-button>
      </div>
    </div>
    <div class='row'>
      <div class="number" @click.prevent="value = 20">
        <el-button type="normal">20元</el-button>
      </div>
      <div class="number" @click.prevent="value = 5">
        <el-button type="normal">5元</el-button>
      </div>
    </div>
    <p class="txt2">支付方式</p>
    <div class="line"></div>
    <div class="payDiv">
      <img class="smallIcon" src="../../../../static/images/alipay.png">
      <p class="txt5">支付宝付</p>
      <input class="rightArrow_aliPay" type="radio" id="alipay" name="payStyle" checked="aliSelect"><br>
    </div>
    <div class="line"></div>
    <div class="payDiv">
      <img class="smallIcon" src="../../../../static/images/wechat.png">
      <p class="txt5">微信付款</p>
      <input class="rightArrow_weChat" type="radio" id="wechat" name="payStyle" checked="false"><br>
    </div>

    <div class="submit" @click.prevent="crofirmNumber">
      <p class="txt6" style="margin-bottom: 20px;">点击充值即表示同意《充值协议》</p>
      <el-button type="primary">充值</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        value: "",
        titleMid: "充值",
        aliSelect: 'false',
        wxSelect: 'true',
        payStyle: ""
      }
    },
    mounted() {
      if (this.$route.params.oldName) {
        this.value = this.$route.params.oldName;
      }
    },
    methods: {
      crofirmNumber: function () {
        if (document.getElementById("alipay").checked) {
          this.payStyle = "支付宝"
        }
        if (document.getElementById("wechat").checked) {
          this.payStyle = "微信"
        }
        this.showComfir("提示信息", "确定使用" + this.payStyle + "充值" + this.value + "吗")
      },
      showComfir: function (title, content) {
        let _this = this;
        //  弹出框
        this.$vux.confirm.show({
          title: title,
          content: content,
          theme: "ios",
          confirmText: "确认充值",
          // 组件除show外的属性
          onCancel() {
            console.log("已经取消") // 当前 vm
          },
          onConfirm() {
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">

  * {
    overflow: hidden;
  }

  #wapper {
    font-family: "Ping SC Regular";
    font-weight: 600;
    width: 100%;
    height: 100%;
    #titleCom {
      height: 8%;
    }
    .input_text {
      width: 90%;
      font-weight: bold;
      color: black;
      font-size: 1.1em;
      margin: 0.8em auto;
    }
    .number {
      width: 90%;
      margin: 1ex;
      button {
        width: 100%;
        height: 3.5em;
      }
    }
    .submit {
      width: 90%;
      margin: 2ex;
      position: absolute;
      bottom: 10px;
      button {
        width: 100%;
        height: 3.5em;
      }
    }
  }

  .row {
    display: flex;
  }

  .line {
    background-color: #dfdfdf;
    height: 1px;
    width: 100%;
    opacity: 0.4;
    margin-left: 20px;
  }

  .rightArrow_aliPay {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 20px;
  }

  .rightArrow_weChat {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 20px;
  }

  .payDiv {
    margin: 10px;
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

  .txt5 {
    margin-right: 70%;
    font-size: 16px;
    color: #333333;
  }

  .txt2 {
    margin-right: 80%;
    font-size: 13px;
    color: #333333;
  }

  .txt6 {
    margin-top: 30%;
    font-size: 13px;
    color: #333333;
  }
</style>
