<template style="height: 100%" xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div style="height: 100%;position: relative">
    <!-- 地图 -->
    <div id="bike_map-container" style="width: 100%;height: 93%;"></div>

    <!-- 出行详情 -->
    <div v-show="showGoOutInfo" id="GoOutInfo" style="right: 0px;left: 0px;">
      <div style="width: 38px" class="GoOutimgLeft" @click="closeGoOut">
        <img src="../../../../static/images/close_status.png" style="width: 38px;height: 38px;">
      </div>
      <div class="GoOutText" style="overflow: hidden">
        <div class="myPostionText">
          <h3>我的位置</h3>
        </div>
        <div class="winPostionText">
          <el-autocomplete clearable class="inline-input" v-model="whitherPosition.PositionText"
                           :fetch-suggestions="querySearch"
                           placeholder="请输入您的目的地"></el-autocomplete>
          <img src=""/>
        </div>
      </div>
      <div style="width: 38px" class="GoOutimgRight" @click="searchWay">
        <img src="../../../../static/images/position_search.png" style="width: 38px;height: 38px;">
      </div>
    </div>

    <!-- 演示添加底部 临时-->
    <!--<div class="bottom-box-container">-->

    <!-- 详情提示框 -->
    <div v-show="showDetaInfo" class="dataInfo" style="right: 0px;left: 0px;bottom: 110px;">
      <div class="detaItemLeft">
        <!--<img src="../../../../static/images/bike_stationIcon.png" style="width: 35px;height: 35px;">-->
        <div class="detaItemText">
          <!--<div class="detaItemText1">{{ DetaInfo.FullAddress }} {{ DetaInfo.kneeId }}站点</div>-->
          <div class="detaItemText1">{{ DetaInfo.FullAddress }}站点</div>
          <div class="detaItemText2">距此{{ DetaInfo.rangeL }}米，大约用时{{ Math.round(DetaInfo.userTime/60) }}分钟</div>
        </div>
        <!-- 加入预约车桩显示状态 -->
        <div class="carport-state">
          <span class="usage">{{DetaInfo.usage}}</span>
          <span class="slash">/</span>
          <span class="total">{{DetaInfo.total}}</span>
          <img src="../../../../static/images/carport_state.png">
        </div>
        <div class="detaItemRight" @click="closeDeta">
          <img src="../../../../static/images/close_status.png" style="width: 26px;height: 26px">
        </div>
      </div>
      <!-- 加入预约-->
      <div class="booking-options">
        <span class="detaItemText3" @click="bookBikeDock">停车预约</span>
        <span class="detaItemText" @click="pickUpBikeDock">取车预约</span>
      </div>
    </div>

    <!-- 预约提示-->
    <div v-show="showBookingDockInfo" class="dataInfo1" style="right: 0px;left: 0px;">
      <div class="detaItemText">
        <div class="detaItemText1">预约中 {{bookBikeDockInfo.countDownTimer}}</div>
        <div class="detaItemText2">车位编号<span class="dock-number">#{{bookBikeDockInfo.dockNumber}}</span>,请在约定时间内前往。</div>
      </div>
      <div class="booking-options">
        <span class="detaItemText3" @click="">取消预约</span>
        <span class="detaItemText" @click="unlockBikeDock">到达开锁</span>
      </div>
    </div>

    <!--</div>-->

  </div>
</template>

<script>

  import AMap from 'AMap'
  import ShareBikeApi from './../sharebikeCordovaApi'
  import ElInput from "element-ui/packages/input/src/input";

  var map = null;
  var geolocation = null;
  //  用于地址转换
  var geocoder = null;

  export default {
    components: {
      ElInput
    },
    name: 'map_bike',
    //props: ['changeToNavi','passMacCode'],
    props:{
      changeToNavi:String,
      passMacCode:''
    },
    data() {
      return {
        //所有定位点的停车桩信息
        AllStationInfo: null,
        //  一组路径停车桩的信息
        StationInfo: {
          StartStation: '',
          EndStation: ''
        },
        //  停车桩详细信息开关标识
        DetaStatus: false,
        //  出行开关标识
        GoOutStatus: false,
        //  路径规划能否成功的标识
        PlanningStauts: true,
        //  路径规划map集合对象：
        PlanMaps: {
          map1: null,
          map2: null,
          map3: null
        },
        //  路径规划标记集合对象
        MarkerMaps: {
          marker1: null,
          marker2: null,
          marker3: null,
          marker4: null,
          marker5: null
        },
        userPosition: {
          lng: '',
          lat: '',
          description: ''
        },
        whitherPosition: {
          lng: '',
          lat: '',
          PositionText: ''
        },
        DetaInfo: {
          FullAddress: '',
          rangeL: '',
          userTime: '',
          kneeId: '',
          total:'',
          usage:''
        },
        //停车，取车 预约
        bookOrPickBikeDock : {
          stationId:''
        },

        bookBikeDockInfo : {
          countDownTimer:'',
          dockNumber:'',
          dockMacCode:''
        },

        bookingDockInfo:false,

        //  历史输入的内容定义
        restaurants: [],
      }
    },
    computed: {
      //  点击查看出行对话框
      showGoOutInfo: function () {
        if (this.GoOutStatus) {
          return true;
        } else {
          return false;
        }
      },

      //  点击查看停车桩详情的界面
      showDetaInfo: function () {
        if (this.DetaStatus) {
          return true;
        } else {
          return false;
        }
      },
      //  定位点的描绘
      markers: function () {
        this.AllStationInfo.forEach(function (stationInfo) {
          //点图标经纬度
          var position = new Array();
          position[0] = stationInfo.longitude;
          position[1] = stationInfo.latitude;
          stationInfo.position = position;
          //颜色显示逻辑
          if (stationInfo.usage >= 0.0 && stationInfo.usage <= 0.4) {
            stationInfo.icon = 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/60db77dc402f458cbaf7f5dd967a1c03.png'
          } else if (stationInfo.usage > 0.4 && stationInfo.usage <= 0.8) {
            stationInfo.icon = 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/711ad3aaaf164d148e2d386d5941db3a.png'
          } else {
            stationInfo.icon = 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/8df3eefaf0104def9aeedc107f017dc5.png'
          }
        });
        return this.AllStationInfo;
      },

      //预约后显示预约提示信息
      showBookingDockInfo:function() {
        if(this.bookingDockInfo){
          return true;
        }
        else{
          return false;
        }
      }

    },
    created() {
    },

    mounted() {
      //创建地图
      this.initMap();
      //加载定位
      this.initGeolocation();
      //  给输入框添加id 实现 自动匹配
      // document.getElementsByTagName('input')[0].setAttribute("id", 'keyWord');
      this.loadAll();
      // this.getAutoAdText();
      //  给输入框添加id 实现 自动匹配
      document.getElementsByTagName('input')[0].setAttribute("id", 'keyWord_bike');
      document.getElementsByTagName('input')[0].addEventListener("input", this.getAutoAdText());

      //倒计时
      this.countDown();
    },

    methods: {
      //  获取定位点所有停车桩
      getPositionStations: function () {
        console.log("加载数据中");
        var _this = this;
        console.log()
        _this.$http.post('/station/getAllStationInfo', {
          areaId: 3
        })
          .then(function (response) {
            console.log(response.data);
            _this.AllStationInfo = response.data.data;
            if (_this.AllStationInfo != null) {
              // //创建标记与信息窗体
              _this.initMarkerAndMsg();
            }
          }).catch(function (error) {
          console.log(error);
        });
      },

      //  获取距离标定点最近1个停车桩
      getOneStation: function (lng, lat, Status) {
        console.log("获取周围停车桩信息 lng=" + lng + " lat=" + lat);
        var _this = this;
        this.$http.post('/station/next3station', {
          city: "珠海",
          longtitude: lng,
          latitude: lat
        }).then(function (response) {
          console.log(response.data);
          if (Status == 1) {
            console.log("起点停车桩的信息");
            if (response.data.data[0] != null) {
              _this.StationInfo.StartStation = response.data.data[0];
              _this.PlanningStauts = true;
              console.log(_this.StationInfo.StartStation);
            } else {
              console.log("您附近没有停车桩可以使用");
              _this.VUETOOLS.totalShow("您附近没有停车桩可以使用", "", _this);
              _this.PlanningStauts = false;
            }
          } else {
            console.log("终点停车桩的信息");
            if (response.data.data[0] != null) {
              _this.StationInfo.EndStation = response.data.data[0];
              _this.PlanningStauts = true;
              console.log(_this.StationInfo.EndStation);
            } else {
              _this.VUETOOLS.totalShow("目的地周围没有停车桩可以使用", "", _this);
              _this.PlanningStauts = false;
            }
          }
        }).catch(function (error) {
          console.log("获取周围停车桩失败");
          _this.VUETOOLS.totalShow("获取周围停车桩失败", "", _this);
          _this.PlanningStauts = false;
        })
      },

      //  js 获取定位
      initGeolocation: function () {
        let _this = this;
        //调用浏览器定位服务
        map.plugin('AMap.Geolocation', function () {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：无穷大
            noIpLocate: 0,   // 可以使用ip定位
            noGeoLocation: 0,//  可以使用浏览器定位
            maximumAge: 0, //定位结果缓存0毫秒，默认：0
            convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, //显示定位按钮，默认：true
            buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition(function (status, result) {
            console.log(result);
            // console.log(result.position.lng + "_" + result.position.lat)
            console.log("浏览器调用返回");
          });
          //返回定位信息
          AMap.event.addListener(geolocation, 'complete', function (data) {
            console.log("定位结果")
            if (data.info == "SUCCESS") {
              console.log("定位成功");
              // 获取到了经纬度
              _this.userPosition.lng = data.position.lng;
              _this.userPosition.lat = data.position.lat;
              _this.userPosition.description = data.formattedAddress;
              console.log(data.position.lng + "  " + data.position.lat)
              console.log("开始描点,并首先计算定位点周围车桩");
              _this.getOneStation(_this.userPosition.lng, _this.userPosition.lat, 1);
              _this.getPositionStations();
            } else {
              console.log("调用失败");
              _this.getPhoneGps(navigator, _this);
            }
          });
          //返回定位出错信息
          AMap.event.addListener(geolocation, 'error', function (data) {
            console.log("定位失败" + JSON.stringify(data));
            _this.getPhoneGps(navigator, _this);
            console.log("开始描点,并首先计算定位点周围车桩");
          });
        });
      },

      //  调用插件的方法
      getPhoneGps: function (navigator, vue) {
        ShareBikeApi.getLocation((data) => {
          console.log("第二种获取方法成功：" + JSON.stringify(data));
          this.userPosition.lng = data.lng;
          this.userPosition.lat = data.lat;
          this.userPosition.description = data.description;
          this.getOneStation(this.userPosition.lng, this.userPosition.lat, 1);
          // _this.MarkerMaps.marker1 = _this.CreateMarker(_this.userPosition.lng,_this.userPosition.lat," http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/6eee0842906c4c97b2e94988b318f0af.png",map,"当前定位标识");
          // console.log("定位点的marker绘制完成");
          this.getPositionStations();
        }, (data) => {
          console.log("第二种获取方法失败：" + data);
          this.getOneStation(this.userPosition.lng, this.userPosition.lat, 1);
          this.getPositionStations();
        })
      },

      //  定位点周围信息的描绘
      initMarkerAndMsg: function () {
        var _this = this;
        var infoWindow = new AMap.InfoWindow();
        this.markers.forEach(function (marker) {
          //定义Marker
          var markers = new AMap.Marker({
            map: map,
            icon: new AMap.Icon({
              image: marker.icon,//原图尺寸109px*129px
              imageSize: new AMap.Size(36, 43),
              size: new AMap.Size(36, 43)
            }),
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-12, -36)
          });
          //信息窗显示内容
          //给Marker绑定单击事件
          markers.on('click', function (e) {
            _this.getWalkDetaInfo(marker.longitude, marker.latitude);
            //_this.DetaInfo.FullAddress = marker.area;
            _this.DetaInfo.FullAddress = marker.description;
            _this.DetaInfo.kneeId = marker.id;
            _this.DetaInfo.total = marker.total;
            _this.DetaInfo.usage = marker.usage;
            _this.DetaStatus = true;
          });
        });
        map.setFitView();
      },

      CreateMarker: function (lng, lat, url, map, titleText) {
        return new AMap.Marker({
          position: [lng, lat], //  标注点的位置
          map: map,
          title: titleText,
          icon: url,
          animation: "AMAP_ANIMATION_DROP"
        });
      },

      //  首次需要加载地图
      initMap: function () {
        //加载地图，
        console.log("加载地图")
        map = new AMap.Map('bike_map-container', {
          resizeEnable: true,
          zoom: 11,
          center: [113.544888, 22.265654]
        });
        console.log("首次加载")
      },

      //  计算步行需要的内容(无参数版本)
      getWalkDetaInfo: function (lng, lat) {
        var _this = this;
        AMap.service(['AMap.Walking'], function () {
          var MWalk = new AMap.Walking({});
          MWalk.search([_this.userPosition.lng, _this.userPosition.lat], [lng, lat], function (status, result) {
            if (status == "complete") {
              _this.DetaInfo.rangeL = result.routes[0].distance;
              _this.DetaInfo.userTime = result.routes[0].time;
            } else if (status == "no_data") {
              console.log(result);
              console.log("无数据");
            } else {
              console.log("错误信息");
              console.log(result);
            }
          });
        });
      },

      //  计算步行需要的内容（有参数版本）
      async getWalkPlan(StartLng, Startlat, EndLng, EndLat, status) {
        //  status 标识第几次步行
        var _this = this;
        console.log("步行参数信息 开始" + StartLng + "  " + Startlat + "  ,   " + "结束  " + EndLng + "  " + EndLat);
        AMap.service(["AMap.Walking"], function () {
          if (status == 1) {
            console.log("第一段步行");
            _this.PlanMaps.map1 = new AMap.Walking({
              map: map,
              hideMarkers: true, //  隐藏默认图标
            });
            _this.PlanMaps.map1.search([StartLng, Startlat], [EndLng, EndLat], function (status, result) {
              console.log(result);
              if (status == 'complete') {
                _this.MarkerMaps.marker2 = _this.CreateMarker(_this.userPosition.lng, _this.userPosition.lat, "http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/3b13c3184ce042d8b0cb7c29aec3f9be.png", map, "用户起点标识");
                console.log("用户起点绘制完成");
              }
            });
          } else {
            console.log("第二段步行");
            _this.PlanMaps.map3 = new AMap.Walking({
              map: map,
              hideMarkers: true, //  隐藏默认图标
            });
            _this.PlanMaps.map3.search([StartLng, Startlat], [EndLng, EndLat], function (status, result) {
              console.log(result);
              if (status == 'complete') {
                _this.MarkerMaps.marker5 = _this.CreateMarker(_this.whitherPosition.lng, _this.whitherPosition.lat, "http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/c093ee70ffe749339120c78670dd20c0.png", map, "终点图标标识");
                console.log("终点绘制完成");
              }
            })
          }
          ;
        });
      },

      //  计算骑行需要的内容(有参数版本)
      async getCarWay(StartLng, Startlat, EndLng, EndLat) {
        console.log("开始骑行规划");
        console.log("骑行参数信息 开始" + StartLng + "  " + Startlat + "  ,   " + "结束  " + EndLng + "  " + EndLat);
        var _this = this;
        map.plugin("AMap.Riding", function () {
          _this.PlanMaps.map2 = new AMap.Riding({
            map: map,
            hideMarkers: true, //  隐藏默认图标
          });
          _this.PlanMaps.map2.search([StartLng, Startlat], [EndLng, EndLat], function (status, result) {
            console.log(result);
            if (status == 'complete') {
              // _this.MarkerMaps.marker4 = _this.CreateMarker(_this.StationInfo.EndStation.longitude,_this.StationInfo.EndStation.latitude,"http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/9d6e9775afb241a980e7c7474925a605.png",map,"终点最近的停车桩");
              // console.log("定位点周围车桩标识成功");
            } else {
              console.log("骑行规划失败");
            }
          });
        });
      },

      //  获取自动匹配的地点信息
      getAutoAdText: function () {
        console.log("this.whitherPosition.PositionText:" + this.whitherPosition.PositionText);
        let _this = this;
        AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
          var autoOptions = {
            city: "珠海",
            input: "keyWord_bike"//使用联想输入的input的id
          };
          let autocomplete = new AMap.Autocomplete(autoOptions);
          let placeSearchnew = new AMap.PlaceSearch({
            city: '珠海',
            map: map
          });
          AMap.event.addListener(autocomplete, "select", function (e) {
            _this.whitherPosition.PositionText = e.poi.district + " " + e.poi.address + " " + e.poi.name;
            _this.whitherPosition.lng = e.poi.location.lng;
            _this.whitherPosition.lat = e.poi.location.lat;
            console.log("获取成功");
            //写入用户搜索记录
            _this.insertSearchLog(e.poi.name)
            //  获取定位点停车桩最近
            _this.getOneStation(_this.whitherPosition.lng, _this.whitherPosition.lat, 2);
          });
        })
      },

      //  组件建议输入的内容
      querySearch(queryString, cb) {
        if (this.whitherPosition.PositionText != '') {
          cb([]);
          return;
        }
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },

      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      //  加载历史输入信息
      loadAll() {
        console.log("开始加载搜索历史记录");
        if (false) {
          //测试数据
          this.restaurants = [
            {"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"},
            {"value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号"},
            {"value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"},
            {"value": "泷千家(天山西路店)", "address": "天山西路438号"},
            {"value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13"}
          ];
          return
        }
        var _this = this;
        this.$http.post('/searchLog/getUserSearchLog', {
          type: 1,
        })
          .then(function (response) {
            console.log(response.data);
            if (response.data.code != 200) {
              console.log("获取用户历史搜索记录失败")
            } else {
              _this.restaurants = response.data.data;
              console.log("获取用户历史搜索记录成功" + JSON.stringify(_this.restaurants))
            }
          })
          .catch(function (error) {
            console.log(error);
          });

      },
      insertSearchLog: function (item) {
        //上传数据
        var value = item;
        var address = item;

        this.$http.post('/searchLog/insertSearchLog', {
          address: value,
          value: address
        })
          .then(function (response) {
            console.log(response.data);
            if (response.data.code != 200) {
              console.log("写入用户搜索记录失败")
            } else {
              console.log("写入用户搜索记录成功")
              loadAll();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //  打开出行模块界面
      GoOutMethod: function () {
        console.log("切换到出行")
      },

      BikeKneeMethod: function () {
        console.log("切换到车桩");
      },

      showWhereGoOut: function () {
        this.GoOutStatus = true;
      },

      scanOrder: function () {
        console.log("调用扫码");
        ShareBikeApi.startScan(() => {
        }, (data) => {
          this.VUETOOLS.totalShow(data, "", this);
        })
      },

      //  关闭详情页面
      closeDeta: function () {
        this.DetaStatus = false;
      },

      //  关闭出行模块
      closeGoOut: function () {
        this.GoOutStatus = false;
      },

      //  清除所有规划的路径内容
      clearAll: function () {
        if (this.PlanMaps.map1 != null) {
          this.PlanMaps.map1.clear();
          console.log("第一段清除")
        }
        if (this.PlanMaps.map2 != null) {
          this.PlanMaps.map2.clear();
          console.log("第二段清除")
        }
        if (this.PlanMaps.map3 != null) {
          this.PlanMaps.map3.clear();
          console.log("第三段清除")
        }
        if (this.MarkerMaps.marker2 != null) {
          this.MarkerMaps.marker2.hide();
          console.log("起点图标清除")
        }
        if (this.MarkerMaps.marker3 != null) {
          this.MarkerMaps.marker3.hide();
          console.log("起点车桩图标清除")
        }
        if (this.MarkerMaps.marker4 != null) {
          this.MarkerMaps.marker4.hide();
          console.log("终点车桩图标清除")
        }
        if (this.MarkerMaps.marker5 != null) {
          this.MarkerMaps.marker5.hide();
          console.log("终点图标图标清除")
        }
      },

      //  进行计算路径开始
      searchWay: function () {
        var _this = this;
        if (this.whitherPosition.PositionText.trim() == null || this.whitherPosition.PositionText.trim() == "") {
          this.VUETOOLS.totalShow("请输入您的目的地");
        } else {
          if (this.PlanningStauts) {
            _this.clearAll();

            async function asyncToDo() {
              //  进行步行路径规划
              await _this.getWalkPlan(_this.userPosition.lng, _this.userPosition.lat, _this.StationInfo.StartStation.longitude, _this.StationInfo.StartStation.latitude, 1);
              //  进行骑行路径规划
              await _this.getCarWay(_this.StationInfo.StartStation.longitude, _this.StationInfo.StartStation.latitude, _this.StationInfo.EndStation.longitude, _this.StationInfo.EndStation.latitude);
              //  进行步行路径规划
              await _this.getWalkPlan(_this.StationInfo.EndStation.longitude, _this.StationInfo.EndStation.latitude, _this.whitherPosition.lng, _this.whitherPosition.lat, 2);

              await (() => {
                _this.$emit(_this.changeToNavi)
              })();
            }

            asyncToDo();
          } else {
            _this.VUETOOLS.showTotal("提示信息", "由于附近没有停车桩，无法完成规划", "", _this);
          }
        }
      },

      //车桩预约
      bookBikeDock: function (){
        var _this = this;
        if(this.DetaInfo.FullAddress){
          this.bookOrPickBikeDock.stationId = this.DetaInfo.kneeId;
          this.$http.post('/station/bookStation',{
            type:0,
            stationId:this.bookOrPickBikeDock.stationId
          })
            .then(function(response){
              console.log(response.data);
              var bookDockData = response.data.no;
              if(response.data.code===200){
                //this.bookBikeDockInfo.dockNumber = bookDockData;
                //暂时写死
                _this.bookBikeDockInfo.dockNumber = "1234";
                _this.bookBikeDockInfo.dockMacCode = response.data.code;
                
                _this.DetaStatus = false;
                _this.bookingDockInfo = true;
              }
              else{
                _this.VUETOOLS.totalShow("您附近没有停车桩可以预约", "", _this);
              }
            }).catch(function(error){
              console.log(error);
          })
        }
        else{

        }
      },

      pickUpBikeDock: function (){

      },

      //半小时倒数
      countDown:function(){
        var _this = this;
        setInterval(function(){
          setInterval(function () {
            var mm = 30 - new Date().getMinutes() % 30;
            var ss = 60 - new Date().getSeconds();
            _this.bookBikeDockInfo.countDownTimer = mm+":"+ss;
          }, 1000);
        })

      },

      //到达开锁

      unlockBikeDock: function(){
        var _this = this;
        var passMacCode = _this.bookingDockInfo.dockMacCode;
        this.$emit('unlockBikeDock',passMacCode);
      },

      //开始调用原生导航
      startNavigate() {
        this.sendTripToServer();
        ShareBikeApi.startBikeNavigate(() => {
          this.isShowNavigate = false;
        }, (data) => {
          this.VUETOOLS.totalShow("开启导航失败");
        }, this.userPosition, this.StationInfo.StartStation, this.StationInfo.EndStation, this.whitherPosition)
      },
      sendTripToServer() {
        var _this = this;
        console.log("startingPoint:" + _this.userPosition.description + " endingPoint:" + _this.whitherPosition.PositionText +
          "startTime:" + _this.getCurrentDate(0) + " endTime:" + _this.getCurrentDate(0))
        this.$http.post('trip/add', {
          startingPoint: this.userPosition.description,
          endingPoint: this.whitherPosition.PositionText,
          startTime: this.getCurrentDate(0),
          endTime: this.getCurrentDate(0)
        }).then(function (response) {
          console.log("发送用户行程成功" + JSON.stringify(response));
        }).catch(function (error) {
          console.log("发送用户行程失败");
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  /* 详情模块开始 */
  .dataInfo {
    width: 90%;
    height: auto;
    position: absolute;
    background-color: white;
    margin: 0 auto;
    padding-bottom: 6px;
    .detaItemLeft {
      float: left;
      display: inline-flex;
      width: 100%;
      border-bottom: 1px solid #ccc!important;
      /*img {*/
      /*margin-top: 10px;*/
      /*margin-left: 12px;*/
      /*margin-right: 12px;*/
      /*}*/
    }
    .detaItemText {
      font-family: "Ping SC Regular";
      margin-top: 8px;
      flex: 1;
    }
    .detaItemText1 {
      font-weight: bolder;
    }
    .detaItemText2 {
      font-size: smaller;
    }
    .detaItemText3 {
      margin-top: 8px;
      flex: 1;
      border-right: 1px solid #ccc!important;
    }
    .detaItemRight {
      margin-top: 2px;
      /*margin-right: 13px;*/
      float: right;
    }
  }

  /* 详情模块结束 */

  /* 出行模块开始内容 */
  #GoOutInfo {
    width: 92%;
    position: absolute;
    height: 100px;
    background-color: white;
    top: 2%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    .GoOutimgLeft {
      flex-shrink: 0;
      margin-left: 10px;
    }
    .GoOutText {
      flex-shrink: 1;
      flex-grow: 1;
      .inline-input {
        width: 90%;
      }
    }
    .GoOutimgRight {
      flex-shrink: 0;
      margin-right: 10px;
    }

  }

  /* 预约车桩*/
  .carport-state {
    span {
      position: absolute;
    }
    img {
      width: 40px;
      height: 23px;
      margin-top: 20px;
      margin-right: 50px;
    }
  }

  .booking-options {
    float: left;
    display: inline-flex;
    width: 100%;
  }

  .usage {
    margin-left: 3px;
    color:#5bc8ff;
  }
  .slash {
    margin-left: 20px;
  }
  .total {
    margin-left: 30px;
    color:#333333;
  }

  .dataInfo1 {
    width: 90%;
    height: auto;
    position: absolute;
    bottom: 105px;
    background-color: white;
    margin: 0 auto;
    padding-bottom: 6px;
    .detaItemLeft {
      float: left;
      display: inline-flex;
      width: 100%;
      border-bottom: 1px solid #ccc!important;
      /*img {*/
      /*margin-top: 10px;*/
      /*margin-left: 12px;*/
      /*margin-right: 12px;*/
      /*}*/
    }
    .detaItemText {
      font-family: "Ping SC Regular";
      margin-top: 8px;
      flex: 1;
    }
    .detaItemText1 {
      font-weight: bolder;
      margin-right: 215px;
      margin-bottom: 10px;
    }
    .detaItemText2 {
      font-size: smaller;
      margin-right: 90px;
      color: #666666;
    }
    .detaItemText3 {
      margin-top: 8px;
      flex: 1;
      border-right: 1px solid #ccc!important;
    }
    .detaItemRight {
      margin-top: 2px;
      /*margin-right: 13px;*/
      float: right;
    }
    .dock-number {
      color:#5bc8ff;
    }
  }




</style>
