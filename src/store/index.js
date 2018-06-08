import Vue from 'vue'
import Vuex from 'vuex'

//  用户状态管理
import adminStore from './modules/adminStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    adminStore
  }
});
