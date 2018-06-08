// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'

import Validator from 'vue-validator'
import DrawerLayout from 'vue-drawer-layout'
//  引入axios 配置文件
import configAxios from './util/Http'
//  加密工具类
import encryptCode from './util/encrypt'
//  uuid生成类
import uuid from './util/uuid'
//  导入vux的一些提示工具
import vuxTools from './util/VuxComs'

//  导入Cordova定位
// import Cordova from '../static/cordova'
// import Cordova_config from '../static/cordova_plugins'

//  引入ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
//  引入全部图标库
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
//  引入动画效果
import 'vue2-animate/dist/vue2-animate.min.css';

//  引入全局vux组件
import { AlertPlugin,ConfirmPlugin,PopupRadio,Group,ToastPlugin } from 'vux'

Vue.use(ElementUI)
//  全局注册通知组件
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(encryptCode)
Vue.use(ToastPlugin)

Vue.component('popup-radio', PopupRadio)
Vue.component('group',Group)

//  状态集
Vue.use(Vuex)
//  全局注册图标组件
Vue.component('icon', Icon)
// 全局注册验证器
Vue.use(Validator)
Vue.use(DrawerLayout)

Vue.config.productionTip = false;
Vue.config.debug=true;
Vue.prototype.$http = configAxios;
// 挂载全局uuid
Vue.prototype.GOBALUUID = uuid();
// 把工具挂载到全局
Vue.prototype.VUETOOLS = vuxTools;
// 全局挂载高德工具类

new Vue({
  el: '#app',
  router,
  store,
  render:(h) => h(App)
})
