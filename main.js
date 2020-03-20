import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false

Vue.prototype.serverUrl = "http://122.114.249.24/m";			// 生产环境
// Vue.prototype.serverUrl = "http://https://127.0.0.1/m";		// 开发环境

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
