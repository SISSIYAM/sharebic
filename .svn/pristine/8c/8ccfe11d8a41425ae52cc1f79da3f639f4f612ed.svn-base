var m = new Map();

class BlemanagerEmitter {

  constructor() {
    this.isFirst = true;
  }

  addListener(key, func) {
    // if (!m.has(key)) {
    //   m.set(key, func);
    // }
    // console.log("window.addEventListener key:"+key+"  func"+func.name);
    window.addEventListener(key, func, key);
    // if(this.isFirst){
    //   this.isFirst = false;
    //   this.func = func;
    // }

  }

  removeAllListeners(key) {
    // if (m.has(key)) {
    //   m.delete(key);
    // }
    window.removeEventListener(key);
  }

  // addEventListener(key, func) {
  //
  // }
  test(){
    // this.func("just test");
    // var k = 0;
    // for (var [key, value] of m) {
    //   console.log(key + ' = ' + value);
    //   // value("test");
    // }
  }

}

// module.exports = new BlemanagerEmitter()
export default new BlemanagerEmitter()
