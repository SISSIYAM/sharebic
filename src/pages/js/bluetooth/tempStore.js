class TempStore {

  constructor() {
    this.overlayVisible = false


    this.deviceTypeMap = new Map()

    this.cmdTypeMap = new Map();


    this.scanning = false

    this.isStatusNoReturn = true;

    this.peripherals = []
  }

  showOverLay() {
    this.overlayVisible = true
  }

  hideOverLay() {
    this.overlayVisible = false
  }

  setToast(toast) {
    this.toast = toast
  }

  updatePeripheral(peripheral) {
    let list = this.peripherals;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === peripheral.id) {
        list[i] = peripheral
      }
    }
    if (!this.peripherals.find(o => o.id === peripheral.id)) {
      list.push(peripheral)
    }
    this.peripherals = list
  }

  initDeviceTypeMap() {
    this.deviceTypeMap.set(0x0110, '解锁器1A')
    this.deviceTypeMap.set(0x0111, '解锁器2A')
    this.deviceTypeMap.set(0x0120, '铁塔智能锁具')
    this.deviceTypeMap.set(0x0121, '小型机柜锁')
    this.deviceTypeMap.set(0x0122, '智能机柜锁')
    this.deviceTypeMap.set(0x0123, '智能灵性锁')
    this.deviceTypeMap.set(0x0124, '智能电控锁')
    this.deviceTypeMap.set(0x0130, '智能挂锁')
    this.deviceTypeMap.set(0x0140, '地线管理器')
    this.deviceTypeMap.set(0x0150, '钥匙管理机')
    this.deviceTypeMap.set(0x0160, '电脑钥匙')
    this.deviceTypeMap.set(0x0170, '传输适配器')
    this.deviceTypeMap.set(0x0180, '采码器工具')
    this.deviceTypeMap.set(0x0190, '交流验电器')
    this.deviceTypeMap.set(0x01A0, '无线地线检测装置')
    this.deviceTypeMap.set(0x01B0, '博佳空调控制器')
    this.deviceTypeMap.set(0x01C0, '保护自动化')
    this.deviceTypeMap.set(0x01D0, '保护测控')
    this.deviceTypeMap.set(0x01E0, '保护通信')
    this.deviceTypeMap.set(0xA010, '智能门锁')
    this.deviceTypeMap.set(0xA020, '智能网关')
    this.deviceTypeMap.set(0xA030, '智能锅')
    this.deviceTypeMap.set(0xA040, '电磁灶')
    this.deviceTypeMap.set(0xA050, '配料机')
    this.deviceTypeMap.set(0xA060, '餐饮主机')
    this.deviceTypeMap.set(0xA070, '蓝牙餐台呼叫器')
  }

  initCmdTypeMap() {
    this.cmdTypeMap.set(0x01, "主设备获取动态密钥");
    this.cmdTypeMap.set(0x02, "获取蓝牙设备基本信息");
    this.cmdTypeMap.set(0x03, "读多个设备状态");
    this.cmdTypeMap.set(0x04, "写指定设备状态");
    this.cmdTypeMap.set(0x05, "重置密码");
    this.cmdTypeMap.set(0x06, "读取对时信息");
    this.cmdTypeMap.set(0x07, "下发对时信息");
    this.cmdTypeMap.set(0x08, "设备状态信息上报");
    this.cmdTypeMap.set(0x09, "蓝牙设备关闭蓝牙连接");
    this.cmdTypeMap.set(0x0A, "蓝牙设备申请开锁");
    this.cmdTypeMap.set(0x0B, "读取钥匙管理配置表");
    this.cmdTypeMap.set(0x0C, "写入钥匙管理配置表");
    this.cmdTypeMap.set(0x0D, "读取开锁记录");
    this.cmdTypeMap.set(0x0E, "读指定设备状态");
  }

  getDeviceType(deviceType) {
    let name = this.deviceTypeMap.get(deviceType)
    return name
  }

  // getDeviceImage(deviceType) {
  //     let imageFile = cyzjimage
  //     if(deviceType === 0x0110){
  //         imageFile = jsqimage
  //     }
  //     else if(deviceType === 0x0140){
  //       imageFile = dxglqimage
  //     }
  //     else if(deviceType === 0x0150){
  //       imageFile = ysgljimage
  //     }
  //     else if(deviceType === 0xA010){
  //       imageFile = znmsimage
  //     }
  //     else if(deviceType === 0xA030){
  //       imageFile = zngimage
  //     }
  //     else if(deviceType === 0xA060){
  //       imageFile = cyzjimage
  //     }
  //     return imageFile
  // }
}

const tempStore = new TempStore()
tempStore.initDeviceTypeMap();
tempStore.initCmdTypeMap();
export default tempStore
