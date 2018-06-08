import bleManagerEmitter from "../js/bluetooth/BlemanagerEmitter";

class ShareBikeCordovaApi {
  static ScanType_Ble = "0";//扫码开/关锁
  static ScanType_report = "1";//扫码举报

  constructor() {
    window.addEventListener('HandleBikePile', (data) => {//蓝牙mac地址上送
      console.log("HandleBikePile event");
      this.handleBleCode(data["0"]);
    }, "");
    window.addEventListener("HandlebleCancel", (data) => {
      this.handlebleCancel();
    }, "")
    window.addEventListener("HandleReportScanResult", (data) => {
      this.handleReportScanResult(data["0"]);
    })
  }

  close() {
    window.removeEventListener("HandleBikePile");
    window.removeEventListener("HandlebleCancel")
  }

  handleBleCode(code) {
  }

  handlebleCancel() {

  }

  handleReportScanResult() {

  }

  startBikeNavigate(successCallback, failCallback, userpoint, StartStation, EndStation, desPosition) {
    Cordova.exec(() => {
        successCallback();

      }, (data) => {
        failCallback(data);
      }, "ShareBikePlugins",
      "startBikeNavigate",
      [userpoint, StartStation, EndStation, desPosition]);
  }

  startCarNavigate(successCallback, failCallback, userpoint, EndStation, desPosition) {
    Cordova.exec(() => {
        successCallback();

      }, (data) => {
        failCallback(data);
      }, "ShareBikePlugins",
      "startCarNavigate",
      [userpoint, EndStation, desPosition]);
  }

  startScan(successCallback, failCallback) {
    Cordova.exec(() => {
        successCallback();
      }, (data) => {
        failCallback(data);
      }, "ShareBikePlugins",
      "startScan",
      [ShareBikeCordovaApi.ScanType_Ble]);
  }

  startReportScan(successCallback, failCallback) {
    Cordova.exec(() => {
        successCallback();
      }, (data) => {
        failCallback(data);
      }, "ShareBikePlugins",
      "startScan",
      [ShareBikeCordovaApi.ScanType_report]);
  }

  getLocation(successCallback, failCallback) {
    Cordova.exec((data) => {
        console.log("获取定位成功：" + JSON.stringify(data));
        data = eval("(" + data + ")");
        successCallback(data);
      }, (data) => {
        failCallback(data);
      }, "ShareBikePlugins",
      "getLocation",
      []);
  }

  showDialog(msg) {
    Cordova.exec((data) => {
      }, (data) => {
      }, "ShareBikePlugins",
      "showDialog",
      [msg]);
  }

  hideDialog() {
    Cordova.exec((data) => {
      }, (data) => {
      }, "ShareBikePlugins",
      "hideDialog",
      []);
  }

  showToast(msg) {
    Cordova.exec((data) => {
      }, (data) => {
      }, "ShareBikePlugins",
      "showToast",
      [msg]);
  }
}

export default new ShareBikeCordovaApi()
