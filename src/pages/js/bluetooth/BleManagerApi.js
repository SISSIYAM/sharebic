class BleManagerApi {

  constructor() {

  }

  /**
   * 打开系统蓝牙
   */
  enableBluetooth(callback) {
    console.log("enableBluetooth to callCordova");
    Cordova.exec(() => {
        console.log("蓝牙已打开");
        callback();
      },
      (data) => {
        console.log("失败：" + data);
        callback(data);
      }, "BluetoothPlugins",
      "enableBluetooth",
      []);
    console.log("enableBluetooth to callCordova end");
  }

  /**
   * 初始化BleManager
   */
  start(options, startCallback) {
    //console.log("调用初始化")
    Cordova.exec(() => {
        //console.log("蓝牙初始化成功");
        startCallback();
      },
      (data) => {
        //console.log("失败：" + data);
        startCallback(data);
      }, "BluetoothPlugins",
      "start",
      [options]);
  }

  /**
   * 扫描外围设备
   * @param {Array} serviceUUIDs 外围设备serviceUUIDs
   * @param {Number} seconds(s) 扫描持续时间
   * @param {Boolean} allowDuplicates 是否允许重复扫描设备
   * @param {Object} scanningOptions 是否允许重复扫描设备
   */
  scan(serviceUUIDs, scanSeconds, allowDuplicates, scanningOptions, callback) {
    Cordova.exec(() => {
        //console.log("蓝牙搜索成功");
        callback();
      },
      (data) => {
        //console.log("失败：" + data);
        callback(data);
      }, "BluetoothPlugins",
      "scan",
      [serviceUUIDs, scanSeconds, allowDuplicates, scanningOptions]);
  }

  /**
   * 停止扫描外围设备
   */
  stopScan(callback) {
    Cordova.exec(() => {
        //console.log("蓝牙停止搜索成功");
        callback();
      },
      (data) => {
        //console.log("失败：" + data);
        callback(data);
      }, "BluetoothPlugins",
      "stopScan",
      []);
  }

  /**
   * 与外围设备建立连接
   * @param {String} peripheralId 外围设备id
   */
  connect(peripheralId, callback) {
    Cordova.exec(() => {
        //console.log("蓝牙连接成功");
        callback();
      },
      (data) => {
        //console.log("失败：" + data);
        callback(data);
      }, "BluetoothPlugins",
      "connect",
      [peripheralId]);
  }

  /**
   * 与外围设备断开连接
   * @param {String} peripheralId 外围设备id
   */
  disconnect(peripheralId, callback) {
    Cordova.exec(() => {
        //console.log("蓝牙断开连接成功");
        callback();
      },
      (data) => {
        //console.log("失败：" + data);
        callback(data);
      }, "BluetoothPlugins",
      "disconnect",
      [peripheralId]);
  }

  /**
   * 读取指定特征值数据
   * @param {String} peripheralId 外围设备id
   * @param {String} serviceUUID 读特征值的serviceUUID
   * @param {String} characteristicUUID 读取指定特征值UUID
   */
  read(peripheralId, serviceUUID, characteristicUUID, readCallback) {
    Cordova.exec(() => {
        //console.log("读取指定特征值数据成功");
        readCallback();
      },
      (data) => {
        //console.log("失败：" + data);
        readCallback(data);
      }, "BluetoothPlugins",
      "read",
      [peripheralId, serviceUUID, characteristicUUID]);
  }

  /**
   * 读取外围设备的信号强度
   * @param {String} peripheralId 外围设备id
   */
  readRSSI(peripheralId, readRssiCallback) {
    Cordova.exec(() => {
        //console.log("读取外围设备的信号强度成功");
        readRssiCallback();
      },
      (data) => {
        //console.log("失败：" + data);
        readRssiCallback(data);
      }, "BluetoothPlugins",
      "readRSSI",
      [peripheralId]);
  }

  /**
   * 读取外围设备服务
   * @param {String} peripheralId 外围设备id
   */
  retrieveServices(peripheralId, retriveServicesCallback) {
    Cordova.exec((data) => {
        //console.log("读取外围设备服务成功");
        retriveServicesCallback(null, data);
      },
      (data) => {
        //console.log("失败：" + data);
        retriveServicesCallback(data);
      }, "BluetoothPlugins",
      "retrieveServices",
      [peripheralId]);
  }

  /**
   * 向外围设备发送数据
   * @param {String} peripheralId 外围设备id
   * @param {String} serviceUUID 写特征值serviceUUID
   * @param {String} characteristicUUID 写特征值UUID
   * @param {Array} data Number Array
   * @param {Number} maxByteSize 最大数据长度
   * @param {Number} queueSleepTime(ms) 队列发送时间间隔
   */
  writeWithoutResponse(peripheralId, serviceUUID, characteristicUUID, data, maxByteSize, queueSleepTime, callback) {
    //console.log("向外围设备发送数据");
    Cordova.exec(() => {
        //console.log("向外围设备发送数据成功");
        callback();
      },
      (data) => {
        //console.log("失败：" + data);
        callback(data);
      }, "BluetoothPlugins",
      "writeWithoutResponse",
      [peripheralId, serviceUUID, characteristicUUID, data, maxByteSize, queueSleepTime]);
  }

  /**
   * 向外围设备发送数据
   * @param {String} peripheralId 外围设备id
   * @param {String} serviceUUID 写特征值serviceUUID
   * @param {String} characteristicUUID 写特征值UUID
   * @param {Array} data Number Array
   * @param {Number} maxByteSize 最大数据长度
   */
  write(peripheralId, serviceUUID, characteristicUUID, data, maxByteSize, callback) {
    Cordova.exec(() => {
        //console.log("向外围设备发送数据成功");
        callback();
      },
      (data) => {
        //console.log("失败：" + data);
        callback(data);
      }, "BluetoothPlugins",
      "write",
      [peripheralId, serviceUUID, characteristicUUID, data, maxByteSize, queueSleepTime]);
  }


  /**
   * 注册特征值通知
   * @param {String} peripheralId 外围设备id
   * @param {String} serviceUUID 特征值serviceUUID
   * @param {String} characteristicUUID 特征值UUID
   */
  startNotification(peripheralId, serviceUUID, characteristicUUID, callback) {
    Cordova.exec(() => {
        //console.log("注册特征值通知成功");
        callback();
      },
      (data) => {
        //console.log("失败：" + data);
        callback(data);
      }, "BluetoothPlugins",
      "startNotification",
      [peripheralId, serviceUUID, characteristicUUID]);
  }

  /**
   * 注销特征值通知
   * @param {String} peripheralId 外围设备id
   * @param {String} serviceUUID 特征值serviceUUID
   * @param {String} characteristicUUID 特征值UUID
   */
  stopNotification(peripheralId, serviceUUID, characteristicUUID, callback) {
    Cordova.exec(() => {
        //console.log("注销特征值通知成功");
        callback();
      },
      (data) => {
        //console.log("失败：" + data);
        callback(data);
      }, "BluetoothPlugins",
      "stopNotification",
      [peripheralId, serviceUUID, characteristicUUID]);
  }

  /**
   * 检查蓝牙状态
   */
  checkState() {
    Cordova.exec(() => {
        //console.log("检查蓝牙状态成功");
      },
      (data) => {
        //console.log("失败：" + data);
      }, "BluetoothPlugins",
      "checkState",
      []);
  }

  /**
   * 获取已经连接的外围设备
   * @param {Array} serviceUUIDs 外围设备serviceUUIDs
   */
  getConnectedPeripherals(serviceUUIDs, callback) {
    Cordova.exec(() => {
        //console.log("获取已经连接的外围设备成功");
        callback();
      },
      (data) => {
        //console.log("失败：" + data);
        callback(data);
      }, "BluetoothPlugins",
      "getConnectedPeripherals",
      [serviceUUIDs]);
  }

  /**
   * 获取已经扫描发现的外围设备
   */
  getDiscoveredPeripherals(callback) {
    Cordova.exec(() => {
        //console.log("获取已经扫描发现的外围设备成功");
        callback();
      },
      (data) => {
        //console.log("失败：" + data);
        callback(data);
      }, "BluetoothPlugins",
      "getDiscoveredPeripherals",
      []);
  }

  /**
   * 移除已经发现的外围设备
   * @param {String} peripheralId 外围设备id
   */
  removePeripheral(peripheralId, callback) {
    Cordova.exec(() => {
        //console.log("移除已经发现的外围设备成功");
        callback();
      },
      (data) => {
        //console.log("失败：" + data);
        callback(data);
      }, "BluetoothPlugins",
      "removePeripheral",
      []);
  }

  //TODO 临时演示，是否自动开锁
  getIsAutoOpenLock(callback) {
    Cordova.exec(() => {
        //console.log("移除已经发现的外围设备成功");
        callback(true);
      },
      (data) => {
        //console.log("失败：" + data);
        callback(false);
      }, "BluetoothPlugins",
      "getIsAutoOpen",
      []);
  }

  //TODO 临时演示，设置是否自动开锁
  setAutoOpenLock(isAutoOpen, callback) {
    Cordova.exec(() => {
        callback();
      },
      (data) => {
        callback("error");
      }, "BluetoothPlugins",
      "changeAutoOpen",
      [isAutoOpen]);
  }
}

// module.exports = new BleManagerApi()
export default new BleManagerApi()
