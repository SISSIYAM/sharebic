<template style="height: 100%" xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div style="height: 100%;position: relative">
    <vue-drawer-layout :enable='false' ref="drawer" @mask-click="handleMaskClick">
      <div class="drawer-content" slot="drawer">
        <!-- drawer-content -->
        <div class="leftDrawDiv">
          <div class="userBgDiv">
            <div class="userBgDivBottom" v-on:click="toUserInfoPage">
              <img class="userIcon" src="../../../../static/images/icon_male.png"/>
              <!--<div class="userInfo">-->
              <!--&lt;!&ndash; 昵称 &ndash;&gt;-->
              <!--<p class="userName">{{userName}}</p>-->
              <!--<div class="userCompanyRoundDiv">-->
              <!--&lt;!&ndash; 公司名称 &ndash;&gt;-->
              <!--<p class="userCompany">{{userCompany}}</p>-->
              <!--</div>-->
              <!--</div>-->
            </div>
          </div>
          <!-- 列表 -->
          <div>
            <div class="rowDiv" @click="myWalletPage">
              <img class="smallIcon" src="../../../../static/images/userPaker.png">
              <p class="txt">我的钱包</p>
            </div>

            <div class="rowDiv">
              <img class="smallIcon" src="../../../../static/images/card_voucher.png">
              <p class="txt">我的卡券</p>
            </div>

            <div class="rowDiv" @click="myTripPage">
              <img class="smallIcon" src="../../../../static/images/user_march.png">
              <p class="txt">我的行程</p>
            </div>

            <div class="rowDiv" @click="scanToReport">
              <img class="smallIcon" src="../../../../static/images/icon_report.png">
              <p class="txt">扫码举报</p>
            </div>

          </div>
        </div>
      </div>
      <div slot="content" style="height: 100%">
        <!-- main-content -->
        <div class="mainDrawDiv">
          <page-title-com style="height: 7%;margin-bottom: 5px" @showPageTotal="showPageTotal"
                          :mid-status="MidMethods.midStatus"
                          :mid-text-left="MidMethods.left" :mid-text-right="MidMethods.right" @GoOutMethod="GoOutMethod"
                          @BikeKneeMethod="BikeKneeMethod" @clickMsg="clickMsg"></page-title-com>
          <!-- 地图 -->
          <!--<div id="map-container"></div>-->
          <map_bike v-if="isShowBikeMap" change-to-navi="changeToNav" @changeToNav="changeToNav" @unlockBikeDock="startOperateLock(...arguments)" class="map-container"
                    ref="bikemap"></map_bike>
          <map_car v-else change-to-navi="changeToNav" @changeToNav="changeToNav" class="map-container"
                   ref="carmap"></map_car>


          <!-- 底部功能选项框 -->
          <div id="whereGo" v-if="!isShowNavigate">
            <div class="whereGoitem" @click="whereGoOut">
              <div class="itemChild">
                <img src="../../../../static/images/goOut.png" style="width: 23px;height: 23px"><span>出行</span>
              </div>
            </div>

            <!-- TODO：原扫码方案 暂时从底部功能选项中移出 等待设计>
            <!--<div class="whereGoitem" @click="scanOrder">-->
            <!--<div class="itemChild">-->
            <!--<img src="../../../../static/images/scanOpen.png" style="width: 23px;height: 23px"><span>扫码开/关锁</span>-->
            <!--</div>-->
            <!--</div>-->

            <div class="whereGoitem" @click="startBleScan">
              <div class="itemChild">
                <img src="../../../../static/images/broadcasting.png" style="width: 23px;height: 23px">
                <span>咻咻开锁</span>
              </div>
            </div>
          </div>

          <div v-else id="navigateButton" v-on:click="startNavigate">
            <span>开始导航</span>
          </div>

          <div class="blue-device-list" v-show="bikeDockListBox">
            <div class="blue-device-list-row" v-for="(item,index) in bleDeviceList">
              <div class="blue-device-list-column">
                <img src="../../../../static/images/bike_dock.png">
              </div>
              <div class="blue-device-list-column list-content">
                <span>车位{{index+1}}</span>
              </div>
              <div class="blue-device-list-column list-content">
                <span>{{item.name}}</span>
              </div>
              <div class="blue-device-list-column" @click="connectBle(item)">
                <img src="../../../../static/images/off_on.png">
              </div>
            </div>
            <button class="close-blue-device-button" @click="closeBlueDeviceList">
              <span>取消</span>
            </button>
          </div>
        </div>

      </div>
    </vue-drawer-layout>
  </div>
</template>

<script>
  import ShareBikeApi from './../sharebikeCordovaApi'
  import Blehome from '../../js/bluetooth/testhome'
  import BleManagerUtil from '../../js/bluetooth/BleManager'
  import BleCmdHandler from '../../js/bluetooth/BleCmdHandler'
  // import Map_bike from "./bikeMap";
  // import Map_car from "./carMap";

  var map = null;
  var geolocation = null;
  //  用于地址转换
  var geocoder = null;

  export default {
    // components: {
    //   Map_car,
    //   Map_bike
    // },
    name: 'mainPage',
    data() {
      return {
        isShowBikeMap: true,//true时显示单车地图，false时显示汽车地图
        userName: "Eddie",
        userCompany: "北京摩拜科技有限公司",
        isShowDrawer: this.$route.query.isFromLeftDrawer,

        MidMethods: {
          midStatus: true,
          left: "GoOutMethod",
          right: "BikeKneeMethod"
        },

        whitherPosition: {
          lng: '',
          lat: '',
          PositionText: ''
        },

        //  路径规划能否成功的标识
        PlanningStauts: true,
        //  历史输入的内容定义
        restaurants: null,
        //  测试数据
        ResultData: null,
        //显示开始导航按钮
        isShowNavigate: false,
        isShowDialog: false,
        dialogMessage: "请稍候",
        lockCode: "",
        lockStatus: 0,//车桩锁状态,0:开着的状态，1关闭的状态，2被预约
        bleDeviceList: [],
        bikeDockListBox:false
      }
    },
    computed: {},
    created() {
    },

    mounted() {
      if (this.isShowDrawer) {
        this.$refs.drawer.toggle(true)
      } else {
        this.$refs.drawer.toggle(false);
      }
      ;
      //  加载建议内容
      // this.restaurants = this.loadAll();

      Blehome.onDeviceConnected = this.onDeviceConnected.bind(this);
      ShareBikeApi.handleBleCode = this.handleBleCode.bind(this);
      ShareBikeApi.handlebleCancel = this.handlebleCancel.bind(this);
      BleCmdHandler.handleLockStatus = this.handleLocStatus.bind(this);
      ShareBikeApi.handleReportScanResult = this.handleReportScanResult.bind(this);
      Blehome.handlePeripheralsCallback = this.handlePeripheralsCallback.bind(this);

      /******************禁止返回到登录页面*******************************/
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
      });
    },

    methods: {
      clickMsg: function () {
        this.$router.push({
          path: '/msgList_page',
          name: 'msgList_page',
        })
      },
      scanToReport() {
        ShareBikeApi.startReportScan((data) => {

        }, () => {
        });
      },
      handleReportScanResult(data) {
        let _this = this;
        this.$http.post("userFinesRecord/addRecord", {
          type: 0,
          bikeCode: data.qrcode,
          longitude: data.longitude,
          latitude: data.latitude,
          description: "违停",
        })
          .then(function (response) {
            console.log("上传举报记录成功:" + JSON.stringify(response));
            if (response.data.code == 200) {
              _this.VUETOOLS.totalShow("举报记录已上传", "", _this);
            } else {
              _this.VUETOOLS.totalShow("举报记录上传失败", "", _this);
            }

          }).catch(function (error) {
          _this.VUETOOLS.totalShow("举报记录上传失败", "", _this);
        });
      },
      handleLocStatus(status) {
        this.lockStatus = status;
        ShareBikeApi.hideDialog();
        if (this.lockStatus == 1) {
          // ShareBikeApi.showDialog("正在开锁");
          Blehome.openLock();
          this.sendBleLockStatus(this.lockCode, true);
        } else {
          // ShareBik eApi.showDialog("正在关锁");
          Blehome.closeLock();
          this.sendBleLockStatus(this.lockCode, false);
        }
      },
      sendBleLockStatus(code, isOpen) {
        var url = '/park/open';
        if (!isOpen) {
          url = '/park/close';
        }
        this.$http.post(url, {
          code: code
        })
          .then(function (response) {
            if (isOpen) {
              ShareBikeApi.showToast("开锁成功");
            } else {
              ShareBikeApi.showToast("关锁成功");
            }
          }).catch(function (error) {
        });
      },
      handlebleCancel() {//用户取消开锁
        Blehome.cancel();
      },
      //连接到设备
      onDeviceConnected() {
        // ShareBikeApi.hideDialog();
        Blehome.getLockStatus();
        Blehome.setCanConnect(false);
      },
      //原生代码返回蓝牙mac地址
      handleBleCode(val) {
        console.log("handleBleCode" + JSON.stringify(val));
        let _this = this;
        if (val.code===200) {
          BleManagerUtil.enableBluetooth().then(() => {
            // this.$refs.processDialog.changeVisible(true);
            this.dialogMessage = "正在开锁"
            Blehome.setCanConnect(true);
            Blehome.componentDidMount();
            Blehome.setBleScanCodeAndStart(val.dockMacCode);
            ShareBikeApi.showDialog("请稍候");
            _this.lockStatus = val.status;
            _this.lockCode = val.qrCode;
          }).catch((msg) => {
            _this.VUETOOLS.totalShow("请先打开蓝牙", "", _this);
          });
        } else {
          _this.VUETOOLS.totalShow(val.dockMacCode, "", _this);
        }

      },

      changeToNav() {
        this.isShowNavigate = true;
      },
      //开始调用原生导航
      startNavigate() {
        this.isShowNavigate = false;
        if (this.isShowBikeMap) {
          this.$refs.bikemap.startNavigate();
        } else {
          this.$refs.carmap.startNavigate();
        }

      },

      //直接开锁（50:8C:B1:8C:12:B8）
      startOperateLock(val) {
        //var temp = {"isSuccess": true, "status": 1, "qrcode": "ut123456", "result": "50:8C:B1:8C:12:B8"};
        var temp = val;
        this.handleBleCode(temp)

      },

      //我的行程
      myTripPage: function () {
        this.$router.push({
          path: '/myTripPage',
          name: 'myTripPage',
        })
      },
      //我的钱包
      myWalletPage: function () {
        this.$router.push({
          path: '/wallet_page',
          name: 'wallet_page',
        })
      },
      //点击用户头像显示左侧抽屉
      showPageTotal: function () {
        this.$refs.drawer.toggle(true);
      },
      //点击黑色阴影关闭左侧抽屉
      handleMaskClick: function () {
        this.$refs.drawer.toggle(false);
      },
      toUserInfoPage: function () {
        this.$router.push('/AdminInfo');
      },


      //  打开出行模块界面
      GoOutMethod: function () {
        this.isShowBikeMap = true;
        console.log("切换到单车")
      },

      BikeKneeMethod: function () {
        this.isShowBikeMap = false;
        console.log("切换到汽车");
      },

      whereGoOut: function () {
        if (this.isShowBikeMap) {
          this.$refs.bikemap.showWhereGoOut();
        } else {
          this.$refs.carmap.showWhereGoOut();
        }
      },

      scanOrder: function () {
        console.log("调用扫码");
        ShareBikeApi.startScan(() => {
        }, (data) => {
          this.VUETOOLS.totalShow(data, "", this);
        })
      },

      //获取蓝牙搜索到的车桩数据信息
      startBleScan: function () {
        // if(false){
        //   this.bleDeviceList = [{"name":"#12345"},
        //                         {"name":"#34467"},
        //                         {"name":"#34567"},
        //                         {"name":"#34667"},
        //                         {"name":"#35567"}
        //   ];
        //   this.bikeDockListBox = true;
        // }else{
          this.bleDeviceList = [];
          this.bikeDockListBox = true;
          ShareBikeApi.showDialog("正在扫描");
          BleManagerUtil.enableBluetooth().then(() => {
            // this.$refs.processDialog.changeVisible(true);
            Blehome.setCanConnect(true);
            Blehome.componentDidMount();
            Blehome.setBleScanCodeAndStart("0");
          }).catch((msg) => {
          });
        //}
      },

      handlePeripheralsCallback(peripheral) {
        ShareBikeApi.hideDialog();
        console.log("收到蓝牙：" + JSON.stringify(peripheral));
        var _this = this;
        this.$http.post("station/getNoByMac", {
          mac: peripheral.macString
        })
          .then(function (response) {
            if (response.data.code === 200) {
              peripheral.name = response.data.data;
            } else {
              peripheral.name = peripheral.macString;
            }
            _this.bleDeviceList.push(peripheral);
          }).catch(function (error) {
          peripheral.name = peripheral.macString;
          _this.bleDeviceList.push(peripheral);
        });

      },
      connectBle(peripheral) {
        ShareBikeApi.showDialog("请稍候");
        Blehome.connectAfterScan(peripheral);
        this.bikeDockListBox = false;
      },

      closeBlueDeviceList: function(){
        console.log("test");
        this.bikeDockListBox = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  /*********账号背景*********/
  .userBgDiv {
    height: 134px;
    background-color: #f5f7fa;
    position: relative;
  }

  .userBgDivBottom {
    position: absolute;
    bottom: 10%;
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .userIcon {
    width: 70px;
    height: 70px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .userInfo {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .userName {
    color: #333333;
    font-size: 17px;
    font-family: PingFangBold;
    margin-top: 5px;
  }

  .userCompanyRoundDiv {
    background-color: #dfdfdf;
    border-radius: 20px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-top: 16px;
  }

  .userCompany {
    color: #666666;
    font-size: 14px;
    font-family: PingFangMedium;
  }

  /*********账号背景the end *********/

  /*********列表 *********/
  .rowDiv {
    margin-top: 8%;
    margin-left: 10%;
    width: calc(100% - 60px);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    height: 35px;
  }

  .smallIcon {
    width: 22px;
    height: 22px;
  }

  .txt {
    margin-left: 30px;
    color: #333333;
    font-family: PingFangMedium;
  }

  /*********列表 the end *********/

  .leftDrawDiv {
    width: 100%;
    height: 100%;
    background-color: white;
  }

  .drawer-content {
    width: 100%;
    height: 100%;
  }

  .mainDrawDiv {
    height: 100%;
    width: 100%;
  }

  * {
    margin: 0;
    padding: 0;
  }

  .map-container {
    height: 93%;
    width: 100%;
    margin-top: 1px;
  }

  /*  出行模块  */
  #whereGo {
    position: absolute;
    bottom: 17px;
    right: 15px;
    background-color: white;
    width: 80%;
    display: inline-flex;
    height: 35px;
    .whereGoitem {
      font-family: "Ping SC Regular";
      font-weight: bold;
      width: 48%;
      display: inline-flex;
      height: 100%;
      .itemChild {
        height: 100%;
        margin: 0 auto;
        display: inline-flex;
        span {
          align-self: center;
          margin-left: 5px;
        }
        img {
          align-self: center;
        }
      }
    }
  }

  #navigateButton {
    position: absolute;
    bottom: 17px;
    right: 15px;
    background-color: white;
    width: 80%;
    display: inline-flex;
    height: 35px;
    align-items: center;
    justify-content: center;
    font-family: "Ping SC Regular";
    font-weight: bold;
  }

  /*  出行模块  */
  .operateLock {
    position: absolute;
    bottom: 60px;
    right: 15px;
    background-color: white;
    width: 80%;
    display: inline-flex;
    height: 35px;
    align-items: center;
    justify-content: center;
    font-family: "Ping SC Regular";
    font-weight: bold;
  }

  //蓝牙开关车桩，列表
  .blue-device-list {
    position: absolute;
    top: 40%;
    background-color: #ffffff;
    width: 100%;
    height:auto;
    display: flex;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    flex-direction: column;
    justify-content: center;
    -webkit-border-radius: 9px;
    -moz-border-radius: 9px;
    border-radius: 9px;
  }

  .blue-device-list-row {
    display: table;
    width: 100%;
    table-layout: fixed;
    border-spacing: 10px;
  }

  .blue-device-list-column {
    display:table-cell;
    text-align: left;
    img {
      width: 60px;
      height: 30px;
      display: block;
    }
    /*<!--span {-->*/
      /*<!--position: relative;-->*/
      /*<!--transform: translateY(-30%);-->*/
    /*<!--}-->*/
  }

  .list-content {
    position: relative;
    transform: translateY(-30%);
  }

  .close-blue-device-button {
    font-family: "Ping SC Regular";
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    color: #ffffff;
    background: #5bc8ff;
    border: 1px solid #dcdfe6;
    border-color: #dcdfe6;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 20px;
    border-radius: 4px;
  }
</style>
