<template>
  <div id="wapper">
    <title-com class="titleCom" :title-mid="title"></title-com>
    <div class="wapper_item">
      <div class="item_cell" v-for=" trip in tripList ">
        <div class="item_cell_img">
          <img src="../../../../static/images/histroyTrip.png">
        </div>
        <div class="item_cell_text">
          <div  class="textLeft">{{trip.startingPoint}}</div>
          <div style="margin-left: 10px;margin-right: 10px">-</div>
          <div class="textRight">{{trip.endingPoint}}</div>
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
            title:'我的行程',
             tripList:[]
          }
        },
        mounted(){
          if(false){
            this.tripList=[
              {
                "id": 1,
                "userId": 24,
                "startingPoint": "起点1",
                "endingPoint": "终点1",
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
                "startingPoint": "起点2",
                "endingPoint": "终点2",
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
                "startingPoint": "起点3",
                "endingPoint": "终点3",
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
          this.getTripList()

        },
       methods:{
        getTripList:function () {
          var _this =this;
          this.$http.post('/trip/get',{
          })
            .then(function (response) {
              console.log(response.data);
              if(response.data.code != 200){
                console.log("获取行程失败")
                _this.showTotal("提示信息","获取行程失败",'');
              }else{
                _this.tripList=response.data.data;
                console.log("获取行程成功"+ JSON.stringify(_this.tripList))
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
