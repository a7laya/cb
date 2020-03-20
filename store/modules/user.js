// 存用户信息，如登录信息等等
export default {
	state: {
		userInfo: {}
	},
	// 相当于计算属性computed
	getters: {},
	// 同步方法 和methods差不多
	mutations: {
		setUserInfo(state, data){
			state.userInfo = data
		},
	},
	// 异步方法
	actions: {
		
	}
}