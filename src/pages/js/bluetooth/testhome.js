import BleManager from './BleManager'
import tempStore from './tempStore'
import bleCmdHandler from './BleCmdHandler'

var lastPeripheral = null;

class Home {


  constructor() {
    BleManager.onHandleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this)
    BleManager.onHandleStopScan = this.handleStopScan.bind(this)
    BleManager.onHandleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this)
    BleManager.onHandleConnectStateChanged = this.handleConnectStateChanged.bind(this)
    BleManager.onHandleNotificationStateChanged = this.handleNotificationStateChanged.bind(this);
    BleManager.onHandleMessage = this.handleMessage.bind(this)
    BleManager.onHandleBluetoothAdapterUpdateState = this.handleBluetoothAdapterUpdateState.bind(this)
    BleManager.onHandleBluetoothConnect = this.handleBluetoothConnect.bind(this);

    this.BleScanCode = "50:8C:B1:8C:12:D6";
    this.hasDidMounted = false;
    this.canConnect = false;
    this.timer = -1;
  }

  setBleScanCodeAndStart(code) {//设置要搜索蓝牙的mac地址，当为“0”时不过滤，将搜索到的数据回传界面
    this.BleScanCode = code;
    tempStore.scanning = false;
    this.startScan();
  }

  setCanConnect(s) {//设置是否可被连接
    this.canConnect = s;
    if (this.timer != -1) {
      clearTimeout(this.timer);
    }
  }

  //开始搜索
  onStartScan() {

  }

  //搜索到设备
  onScanDevice() {

  }

  //连接到设备
  onDeviceConnected() {

  }

  //连接到设备
  onDeviceConnectedWidoutGetConfig() {

  }

  //发送开锁命令
  onSendedOpenLockCmd() {

  }

  //断开连接
  onDeviceDisConnected() {

  }

  componentDidMount() {
    if (this.hasDidMounted) return;
    this.hasDidMounted = true;
    BleManager.open();
  }

  componentWillUnmount() {
    this.hasDidMounted = false;
    BleManager.close()
  }

  handleMessage(message) {
    console.log(message)
    if (this.timer != -1) {
      return;
    }
    this.timer = setTimeout(() => {
      console.log("重新搜索")
      tempStore.scanning = false;
      this.startScan();
      this.timer = -1;
    }, 1000);
  }

  handleBluetoothAdapterUpdateState(data) {
    // console.log('', data)
    if (data.state == "off") {
      this.componentWillUnmount();
    }
  }

  handleNotificationStateChanged(peripheral) {
    this.lastPeripheral = peripheral;
    this.onDeviceConnected();
  }

  handleBluetoothConnect(data) {
    console.log('', data)
    this.onDeviceConnectedWidoutGetConfig();
  }


  handleConnectStateChanged(peripheral) {
    // let cachePeripheral = tempStore.peripherals.find(o => o.id === peripheral.id)
    // if (cachePeripheral) {
    //   cachePeripheral.connected = peripheral.connected
    if (peripheral.connected) {
      this.lastPeripheral = peripheral;
      this.onDeviceConnected();
      // this.openLock();

    } else {
      // this.handleMessage("");
      this.onDeviceDisConnected();
    }
    tempStore.updatePeripheral(peripheral)
    // }
    console.log('handleConnectStateChanged from:' + peripheral)
  }

  handleUpdateValueForCharacteristic(data) {
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic + " value=" + data.value)
    bleCmdHandler.handleReceiveData(data);
  }


  handleStopScan() {
    console.log('Scan is stopped')
    tempStore.scanning = false;
    if (this.BleScanCode !== "0") {
      this.handleMessage("");
    }
  }

  openLock() {
    console.log("test send data 0");
    if (this.lastPeripheral) {
      this.onSendedOpenLockCmd();
      console.log("test send data 1");
      let data = [0xa5, 0x5a, 0x00, 0x04, 0x04, 0x00, 0x07, 0x00]
      BleManager.sendData(data, this.lastPeripheral).then(() => {
        console.log('发送成功')
        // this.handleMessage("");
        setTimeout(() => {
          BleManager.disconnect(this.lastPeripheral);
        }, 500)

      }).catch((err) => {
        this.handleMessage("");
        console.log('发送失败' + err)
      });
    }
  }

  closeLock() {
    if (this.lastPeripheral) {
      let data = [0xa5, 0x5a, 0x00, 0x04, 0x04, 0x00, 0x07, 0x01]
      BleManager.sendData(data, this.lastPeripheral).then(() => {
        console.log('发送成功')
        setTimeout(() => {
          BleManager.disconnect(this.lastPeripheral);
        }, 500)
      }).catch((err) => {
        console.log('发送失败' + err)
      });
    }
  }

  getLockStatus() {
    if (this.lastPeripheral) {
      let data = [0xa5, 0x5a, 0x00, 0x02, 0x0E, 0x00]
      BleManager.sendData(data, this.lastPeripheral).then(() => {
        console.log('发送成功')
        tempStore.isStatusNoReturn = true;
        setTimeout(() => {
          if (tempStore.isStatusNoReturn) {
            bleCmdHandler.handleLockStatus(-1);//当读取设备状态超时时发出-1通知
          }
        }, 3000);
      }).catch((err) => {
        console.log('发送失败' + err)
      });
    }
  }

  startScan() {
    if (!tempStore.scanning) {
      tempStore.peripherals = []
      // "55540001-5554-0000-0055-4E4954454348"
      BleManager.scan(['0001'], 5, false).then((results) => {
        console.log('Scanning...')
        tempStore.scanning = true;
        this.onStartScan();
      }).catch((error) => {
        this.handleMessage("error");
      });
    }
  }

  handleDiscoverPeripheral(peripheral) {
    console.log("testHome:peripheral" + JSON.stringify(peripheral));
    peripheral.connected = false
    var advertByte = peripheral.advertising.bytes;
    var offect = 7;
    var endOff = 13;
    if (BleManager.osType === "ios") {
      advertByte = peripheral.advertising.kCBAdvDataManufacturerData.bytes;
      offect = 5;
      endOff = 11;
    }
    var bleMac = "";
    if (advertByte.length >= endOff) {
      var macAdrByte = advertByte.slice(offect, endOff);
      bleMac = this.byteToString(macAdrByte).toUpperCase();
    }
    var sqrMac = this.BleScanCode.replace(/:/g, "");
    console.log("条件是否满足:" + (this.BleScanCode === "0"));
    console.log("bleMac != \"\":" + (bleMac != ""))
    console.log("!tempStore.peripherals.find(o => o.id === peripheral.id):" + !tempStore.peripherals.find(o => o.id === peripheral.id))
    if (this.BleScanCode === "0" && bleMac != "" && !tempStore.peripherals.find(o => o.id === peripheral.id)) {
      tempStore.updatePeripheral(peripheral);
      peripheral.macString = this.transToMac(bleMac);
      this.handlePeripheralsCallback(peripheral);
    } else if (this.canConnect && tempStore.peripherals.length == 0 && sqrMac == bleMac) {
      tempStore.updatePeripheral(peripheral);
      this.connectAfterScan(peripheral)
    }
  }

  connectAfterScan(peripheral) {
    BleManager.stopScan();
    this.onScanDevice();
    this.connectDevice(peripheral);
  }

  handlePeripheralsCallback(peripheral) {//将搜索到的数据传输到

  }

  byteToString(arr) {
    var str = "";
    for (var i = 0; i < arr.length; i++) {
      var tmp = arr[i].toString(16);
      if (tmp.length == 1) {
        tmp = "0" + tmp;
      }
      str += tmp;
    }
    return str;
  }

  transToMac(tempString) {
    var result = "";
    for (var i = 0; i < tempString.length; i++) {
      var temp = tempString[i];
      result += temp;
      if (i % 2 != 0 && i != tempString.length - 1) {
        result += ":";
      }
    }
    return result;
  }

  cancel() {
    if (tempStore.scanning) {
      BleManager.stopScan();
    }
    this.BleScanCode = "";
    this.canConnect = false;
  }

  connectDevice(peripheral) {
    if (peripheral) {
      BleManager.connectAndRegisterNotify(peripheral)
    }
  }
}


export default new Home();
