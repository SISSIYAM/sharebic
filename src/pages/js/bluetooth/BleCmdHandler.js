import tempStore from './tempStore'

class BleCmdHandler {

  handleReceiveData(data) {
    if (data.value[0] == 0xA5 && data.value[1] == 0x5A) {
      console.log("收到命令：" + tempStore.cmdTypeMap.get(data.value[4]))
      switch (data.value[4]) {
        case 0x0E:
          tempStore.isStatusNoReturn = false;
          this.handleLockStatus(data.value[7]);
          break;
      }
    }
  }

  handleLockStatus(status) {
  }
}

const bleCmdHandler = new BleCmdHandler();
export default bleCmdHandler;
