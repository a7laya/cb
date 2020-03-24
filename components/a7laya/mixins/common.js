// 用户的验证，及语言包的加载
let vm={}
export default {
	data(){
		vm = this
		return{
			userInfo: null, // 用户的信息，包括id token
			userIsLogin: false, // 是否已登录
			language: false, // 语言包
			type: 'cn' ,// 语言类型
		}
	},
	filters: {
		$lan(placeholder=false,key){
			// return 1234
			if(vm.language[key] === undefined) return placeholder || '语言包未设置'
			let lan = vm.language[key][vm.type]
			if(lan === undefined) return placeholder || '未设置'+vm.type+'类型语言'
			return lan
		}
	},
	onShow(){
		// 使用挂载方法获取用户数据
		var userInfo = this.getGlobalUser("userInfo");
		// debugger;
		if (userInfo != null) {
			this.userIsLogin = true;
			this.userInfo = userInfo;
		} else {
			this.userIsLogin = false;
			this.userInfo = {};
			// 切换页面跳转，使用tab切换的api
			uni.navigateTo({
				url: "/pages/login/login"
			});
		}
		// 
		this.language = uni.getStorageSync('language')
		this.type = uni.getStorageSync('type') || 'cn'
		
	}
}