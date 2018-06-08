import Vue from 'vue'
import FromPwd from '@/components/admin/js/FromPwd'
import FromSuite from '@/components/admin/js/FromSuite'
import TextDesc from '@/components/admin/js/TextDesc'
import FromPhone from '@/components/admin/js/FromPhone'
import FromOther from '@/components/admin/js/FromOther'
import FromCheck from '@/components/admin/js/FromCheck'

//  用户密码组件
Vue.use(FromPwd)
//  用户表单组件
Vue.use(FromSuite)
//  用户表单说明文字组件
Vue.use(TextDesc)
//  用户表单手机号
Vue.use(FromPhone)
//  用户表单验证码
Vue.use(FromCheck)
//  用户表单其他部分
Vue.use(FromOther)

export default new Vue;

