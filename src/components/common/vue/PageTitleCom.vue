<template>
  <div class="pageTitle" ref="titleImg">
    <div class="left" ref="imgLeft" @click="showPoper">
      <img class="titleImg" src="../../../../static/images/icon_male.png">
    </div>
    <div class="middle" ref="midText" v-if="midStatus">
      <div class="mid_title" v-bind:class="{selected: !isBike}" style="margin-right: 12px;"
           @click="midLeftMothed">
        单车
      </div>
      |
      <div class="mid_title" v-bind:class="{selected: isBike}" style="margin-left: 12px;" @click="midRightMothed">
        汽车
      </div>
    </div>
    <div v-else></div>
    <div class="right" ref="imgRigth">
      <img class="titleImg" src="../../../../static/images/msg.png" @click="clickMsg">
    </div>
  </div>
</template>

<script>
  export default {
    name: "pageTitleCom",
    props: {
      midStatus: Boolean,
      midTextLeft: String,
      midTextRight: String
    },
    data() {
      return {
        isBike: true,
      }
    },
    mounted() {
      //  计算图标的高度
      this.getMarginH();
    },
    methods: {
      clickMsg:function () {

        this.$emit("clickMsg");
      },

      getMarginH: function () {
        let Title = this.$refs.titleImg;
        let Left = this.$refs.imgLeft;
        let Right = this.$refs.imgRigth;
        let midText = this.$refs.midText;
        console.log(Title.offsetHeight);
        console.log(Left.offsetHeight);
        let valueH = Title.offsetHeight - 27;
        if (midText != null) {
          Left.style.marginTop = valueH * 0.5 + 5 + "px";
          Right.style.marginTop = valueH * 0.5 + 5 + "px";
          midText.style.marginTop = valueH * 0.5 + 10 + "px";
        } else {
          Left.style.marginTop = valueH * 0.5 + 5 + "px";
          Right.style.marginTop = valueH * 0.5 + 5 + "px";
        }
      },
      // 弹出侧滑栏
      showPoper: function () {
        this.$emit("showPageTotal");
      },

      // 出行的方法调用
      midLeftMothed: function () {
        if (this.$props.midStatus) {
          this.isBike = true;
          this.$emit(this.$props.midTextLeft);
        }
      },

      // 车桩的方法调用
      midRightMothed: function () {
        if (this.$props.midStatus) {
          this.isBike = false;
          this.$emit(this.$props.midTextRight);
        }
      },
    }
  }
</script>

<style lang="scss" scoped type="text/css">
  .pageTitle {
    width: 100%;
    background-color: #f1f1f161;
    display: inline-flex;
    overflow: hidden;
  }

  .titleImg {
    width: 27px;
    height: 27px;
  }

  .left {
    float: left;
    margin-left: 5%;
  }

  .middle {
    overflow: hidden;
    display: inline-flex;
    font-family: PingFangBold;
    font-weight: bold;
    font-size: 16px;
  }

  .right {
    float: right;
    margin-right: 5%;
  }

  .selected {
    color: dimgrey;
  }
</style>
