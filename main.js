import Vue from 'vue'
import App from './App'

Vue.prototype.serverUrl = "http://122.114.249.24/m";			// 生产环境
// Vue.prototype.serverUrl = "http://https://127.0.0.1/m";		// 开发环境

// 引入Vuex
import store from './store'

// 引入封装好的request请求
import request from "./common/lib/request.js"

// 设定Vuex
Vue.prototype.$store = store

// 设定request
Vue.prototype.$H = request

// 引入全局组件
// 引入分割线组件
import divider from "@/components/common/divider.vue"
Vue.component('divider', divider)
// 引入全局加动画组件
import loading from "@/components/common/loading.vue"
Vue.component('loading', loading)

import loadingPlus   from '@/components/common/mixin/loading-plus.vue'
Vue.component('loading-plus', loadingPlus)


Vue.config.productionTip = false


Vue.prototype.getGlobalUser = function(key) {
	var userInfo = uni.getStorageSync("userInfo");
	if (userInfo != null && userInfo != "" && userInfo != undefined) {
		return userInfo;
	} else {
		return null;
	}
}


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
