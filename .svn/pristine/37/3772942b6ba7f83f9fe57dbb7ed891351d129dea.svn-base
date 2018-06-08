import Vue from 'vue'
import VueRouter from 'vue-router'

//  组件部分
import adminComs from './components/admin/adminComs'
import CommonComs from './components/common/CommonComs'

//  主页部分
import Index from '@/pages/vue/index_page'


//  页面部分
//  用户密码登录
import LoginPwd from  '@/pages/vue/admin/loginPwd_page'
//  用户验证码注册
import register from '@/pages/vue/admin/register_page'
//  用户完善资料
import perfInfo from '@/pages/vue/admin/perfInfo_page'
//  用户找回密码第一部分
import retPwdP1 from '@/pages/vue/admin/retPwdP1_page'
//  用户找回密码第二部分
import retPwdP2 from '@/pages/vue/admin/retPwdP2_page'
//  用户信息管理月面
import AdminInfo from '@/pages/vue/admin/AdminInfo_page'
//  用户行程页面
import MyTripPage from '@/pages/vue/admin/MyTrip_Page'
//  用户消息页面
import msgList_page from '@/pages/vue/admin/msgList_page'
import msg_page from '@/pages/vue/admin/msg_page'
//  用户名修改
import ChangeName from '@/pages/vue/admin/ChangeName_page'
import ChangePwd from '@/pages/vue/admin/ChangePwd_page'

//  主页地图页面
import mainPage from '@/pages/vue/indexmap/mainPage'

//	钱包页面
import wallet_page from '@/pages/vue/wallet/wallet_page'
import recharge from '@/pages/vue/wallet/recharge'
import rechargeHistory from '@/pages/vue/wallet/rechargeHistory'

import Map_bike from "@/pages/vue/indexmap/bikeMap";
import Map_car from "@/pages/vue/indexmap/carMap";

Vue.component(Map_bike.name, Map_bike);
Vue.component(Map_car.name, Map_car);

import parseTimePeriod from '@/pages/js/parseTimeStamp.js'//时间插件

Vue.use(parseTimePeriod);

//  注册为全局组件
Vue.use(adminComs)
Vue.use(CommonComs)


Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    // {
    //   path:'/',
    //   name:'index',
    //   component:Index
    // },
    {
      path:'/',
      name:'LoginPwd',
      component:LoginPwd
    },
    {
      path:'/register',
      name:'registerAdmin',
      component:register
    },
    {
      path:'/perfInfo',
      name:'perfInfoAdmin',
      component:perfInfo
    },
    {
      path:'/retPwdP1',
      name:'retPwdP1Admin',
      component:retPwdP1
    },
    {
      path:'/retPwdP2',
      name:'retPwdP2Admin',
      component:retPwdP2
    },
    {
      path:'/mainPage',
      name:'mainPage',
      component:mainPage
    },

    {
      path:'/AdminInfo',
      name:'AdminInfo',
      component:AdminInfo
    },
    {
      path:'/myTripPage',
      name:"myTripPage",
      component:MyTripPage
    },
    {
      path:'/msgList_page',
      name:"msgList_page",
      component:msgList_page

    },
    {
      path:'/msg_page',
      name:"msg_page",
      component:msg_page

    },
  //  修改用户名
    {
      path:'/ChangeName_page',
      name:'ChangeName_page',
      component:ChangeName
    },
  //  修改密码
    {
      path:'/ChangePwd_page',
      name:'ChangePwd_page',
      component:ChangePwd
    },
    //  钱包页面
    {
      path: '/wallet_page',
      name: 'wallet_page',
      component: wallet_page
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: recharge
    },
    {
      path: '/rechargeHistory',
      name: 'rechargeHistory',
      component: rechargeHistory
    }
  ]
})
