<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="wrapper">
    <div class="title">
      <img class="leftIcon" src="../../../../static/images/icon_back.png" v-on:click="backPrePage"/>
      <p class="titleName">{{titleName}}</p>
    </div>

    <div class="msgListWrapper">
      <div class="row" v-bind:class="{isToRead:item.status==0}" v-for="(item, index) in msgList"
           v-on:click="toMsgPage(index)">
        <div class="msgInfo">
          <p class="msgtitle">{{item.title}}</p>
          <p class="msgContent">{{item.content}}</p>
        </div>
        <p class="timeTxt">{{item.createTime}}</p>
      </div>
    </div>

  </div>


</template>


<script>

  export default {
    data() {
      return {
        titleName: "消息",
        msgList: [],
      }
    },
    computed: {},
    created() {
      if (false) {
        //测试数据
        this.msgList = [
          {
            id: 10086,
            title: "优特车位红包卷土重来！免费车位等你来，充值更有红包大礼",
            content: "这是文章正文正文正文正文正文正文正文正文正文消息正文正文正文正文正文正文正文正文",
            type: 1,
            status: 0,
            createTime: "2018/04/06"
          },
          {id: 10086, title: "标题2", content: "消息正文正文正文正文正文正文正文正文", type: 1, status: 1, createTime: "2018/04/06"},
          {id: 10086, title: "标题3", content: "消息正文正文正文正文正文正文正文正文", type: 1, status: 0, createTime: "2018/04/06"},
          {id: 10086, title: "标题4", content: "消息正文正文正文正文正文正文正文正文", type: 1, status: 0, createTime: "2018/04/06"},
        ]

      } else {
        this.list();
      }

    },

    methods: {
      backPrePage: function () {
        this.$router.push({
          path: '/mainPage',
          name: 'mainPage',
        })
      },
      toMsgPage: function (index) {

        //未读消息标记为已读
        if (this.msgList[index].status == 0) {
          var _this = this;
          this.$http.post('/notify/setNotifyRead',
            {
              notifyId: _this.msgList[index].id,
            }).then(function (response) {
            console.log(response.data);
            if (response.data.code != 200) {
              console.log("标记已读失败")
            } else {
              console.log("标记已读成功")
            }
          }).catch((err) => {
            console.log("标记已读失败:" + err);
          })

        }

        this.$router.push({
          path: '/msg_page',
          name: 'msg_page',
          params: {
            msgObj: this.msgList[index]
          }
        })

      },
      list: function () {
        var _this = this;
        this.$http.post('/notify/pullAllNotify', {

        }).then(function (response) {
          console.log(response.data);
          if (response.data.code != 200) {
            console.log("获取消息失败")
            _this.showTotal("提示信息", "获取消息失败", '');
          } else {
            _this.msgList = response.data.data;
            console.log("获取消息成功" + JSON.stringify(_this.msgList))
          }
        }).catch((err) => {
          console.log("获取消息失败:" + err);
        })
      }
    },
  }
</script>


<style scoped>

  @font-face {
    font-family: 'PingFangBold';
    src: url('../../../assets/font/PingFangBold.ttf');
  }

  @font-face {
    font-family: 'PingFangMedium';
    src: url('../../../assets/font/PingFangMedium.ttf');
  }

  .msgContent {
    margin: 0px;
    padding-top: 10px;
    font-family: PingFangMedium;
    font-size: 14px;
    color: #999999;
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .isToRead {
    background-color: white;
  }

  .timeTxt {
    color: #999999;
    font-family: PingFangMedium;
    font-size: 12px;
  }

  .msgtitle {
    font-family: PingFangBold;
    font-size: 16px;
    color: #333333;
    margin: 0px;
  }

  .msgInfo {
    text-align: left;
    margin: 0px;
    flex: 1;
  }

  .row {
    display: flex;
    flex-direction: row;
    /*align-items: center;*/
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom: solid 1px #dfdfdf;
  }

  /*.line {*/
  /*background-color: #dfdfdf;*/
  /*height: 0.5px;*/
  /*opacity: 0.3;*/
  /*margin-left: 20px;*/
  /*}*/

  .msgListWrapper {
    height: calc(100% - 44px);
    overflow: scroll;
    width: 100%;
  }

  .msgList {
    background-color: white;
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
