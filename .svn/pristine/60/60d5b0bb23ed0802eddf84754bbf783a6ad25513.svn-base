<template>
  <div id="wapper">
    <title-com class="titleCom" :title-mid="title"></title-com>
    <div class="wapper_item">
      <div class="item_cell" v-for=" recharge in rechargeList ">
        <div class="item_cell_img">
          <img src="../../../../static/images/histroyTrip.png">
        </div>
        <div class="item_cell_text">
          <div  class="textLeft">{{recharge.tradeType}}</div>
          <div style="margin-left: 10px;margin-right: 10px"></div>
          <div class="textRight">{{recharge.tradeAmount}}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "",
        data(){
          return{
            title:'充值记录',
             rechargeList:[]
          }
        },
        mounted(){
          if(false){
            this.tripList=[
              {
                "id": 1,
                "userId": 24,
                "startingPoint": "停车收费",
                "endingPoint": "-1元",
                "startTime": 1524615132000,
                "endTime": 1524615132000,
                "mileage": 0,
                "time": 0,
                "status": 0,
                "type": 0,
                "createTime": 1526368058000
              },
              {
                "id": 1,
                "userId": 24,
                "startingPoint": "停车收费",
                "endingPoint": "-1元",
                "startTime": 1524615132000,
                "endTime": 1524615132000,
                "mileage": 0,
                "time": 0,
                "status": 0,
                "type": 0,
                "createTime": 1526368058000
              },{
                "id": 1,
                "userId": 24,
                "startingPoint": "充值",
                "endingPoint": "+100元",
                "startTime": 1524615132000,
                "endTime": 1524615132000,
                "mileage": 0,
                "time": 0,
                "status": 0,
                "type": 0,
                "createTime": 1526368058000
              }
            ]
          }
          this.getRechargeList()

        },
       methods:{
        getRechargeList:function () {
          var _this =this;
          this.$http.post('/tradePartyDetail/list',{
          	pageStart:1
          })
            .then(function (response) {
              console.log(response.data);
              if(response.data.code != 200){
                console.log("获取充值记录失败")
                _this.showTotal("提示信息","获取充值记录失败",'');
              }else{
                console.log("获取充值记录成功")
                _this.rechargeList=response.data;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
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
    .wapper_item{
      width: 92%;
      height: 100%;
      font-family: "Ping SC Regular";
      font-weight: bold;
    }
    .item_cell{
      width: 100%;
      /*height: 6%;*/
      display: inline-flex;
      /*margin-top: 10px;*/
      padding-top: 10px;
      padding-bottom: 10px;
      align-items: center;
      img{
        width: 19px;
        height: 19px;
      }
      .item_cell_text{
        border-bottom: solid 1px #dfdfdf;
        height:80%;
        padding-bottom: 15px;
        display: inline-flex;
        width: 85%;


        .textLeft{
          /*width: 20%;*/
          margin: 0 0;
          color: #999999;
          font-size: 14px;
          text-align: left;
        }
        .textRight{
          /*width: 40%;*/
          margin: 0 0;
          color: #333333;
          font-size: 14px;
          text-align: left;
        }
      }
    }
  }
</style>
