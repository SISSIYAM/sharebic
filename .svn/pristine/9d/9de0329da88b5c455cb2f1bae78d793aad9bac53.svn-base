<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="wrapper">
    <div class="title">
      <img class="leftIcon" src="../../../../static/images/icon_back.png" v-on:click="backPrePage"/>
      <p class="titleName">{{titleName}}</p>
    </div>

    <div class="msgWrapper">
      <p class="msgtitle"> {{this.msgObj.title}}</p>
      <p class="msgContent"> {{this.msgObj.content}}</p>
    </div>
  </div>
</template>


<script>

  export default {
    data() {
      return {
        titleName: "消息",
        msgObj:this.$route.params.msgObj,
      }
    },
    computed: {},
    created() {
    },

    methods: {
      backPrePage: function () {
        console.log("点击")
        this.$router.go("-1")
      },
    },
  }
</script>


<style scoped>
  .msgtitle {
    font-family: PingFangBold;
    font-size: 24px;
    color: #333333;
    margin: 20px;
    text-align: center;
  }

  .msgContent {
    font-family: PingFangMedium;
    font-size: 14px;
    color: #666666;
    text-align: center;
    margin: 20px 20px;
  }

  @font-face {
    font-family: 'PingFangBold';
    src: url('../../../assets/font/PingFangBold.ttf');
  }

  @font-face {
    font-family: 'PingFangMedium';
    src: url('../../../assets/font/PingFangMedium.ttf');
  }


  .msgWrapper {
    height: calc(100% - 44px);
    overflow: scroll;
    width: 100%;
  }


  .wrapper {
    background-color: #f9f9f9;
    height: 100%;
  }

  /*********标题栏  *********/
  .title {
    padding-top: 20px;
    height: 44px;
    line-height: 44px;
    width: 100%;
    background-color: #f1f1f161;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  }

  .titleName {
    line-height: 64px;
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    margin: 0px;
    font-size: 18px;
    color: black;
    vertical-align: middle;
    font-family: PingFangBold;
  }

  .leftIcon {
    line-height: 44px;
    position: absolute;
    left: 20px;
    width: 24px;
    height: 24px;
    z-index: 9;
  }

  /*********标题栏 the end *********/
</style>
