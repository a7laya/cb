export default {
	// 获取用户信息
	getUserInfo(){
		var userInfo = uni.getStorageSync("userInfo");
		if (userInfo != null && userInfo != "" && userInfo != undefined) {
			return userInfo;
		} else {
			return null;
		}
	},
	// 全局配置
	common: { 
		baseUrl: "/test",
		header: {
			// "Content-Type": "application/json;charset=UTF-8",
			"Content-Type": "application/x-www-form-urlencoded"
		},
		data: {},
		method: "GET",
		dataType: "json"
	},
	// 请求 返回promise
	request(options = {}) {
		// 组织参数
		options.url      = this.common.baseUrl + options.url
		options.header   = options.header   ||  {
			// "Content-Type": "application/json;charset=UTF-8",
			"Content-Type": "application/x-www-form-urlencoded",
			"id": this.getUserInfo() && this.getUserInfo().user_id,
			"token": this.getUserInfo() && this.getUserInfo().token,
		},
		options.data     = options.data     || this.common.data
		options.method   = options.method   || this.common.method
		options.dataType = options.dataType || this.common.dataType
		
		// 请求
		return new Promise((res,rej) => {
			// 请求之前 做一些相关验证  
			// todo...
			
			// 请求中...
			uni.request({
				...options,
				success: (result) => {
					// 服务端错误
					if(result.statusCode !== 200){
						uni.showToast({
							title: result.data.msg || "服务器内部错误",
							icon: 'none'
						});
						return rej()
					}
					// 请求成功
					let data = result.data
					res(data)
				},
				fail: (error) => {
					uni.showToast({
						title: error.errMsg || "请求失败",
						icon: 'none'
					});
					return rej()
				},
			});
		})
	},
	
	// get封装
	get(url,data = {}, options = {}) {
		options.url    = url
		options.data   = data
		options.method = 'GET'
		return this.request(options)
	},
	// post封装
	post(url,data = {}, options = {}) {
		options.url    = url
		options.data   = data
		options.method = 'POST'
		return this.request(options)
	},
	
}