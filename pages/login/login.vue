<template>
	<view class="body">
		<form @submit="formSubmit">
			<view class="face-wapper">
				<image src="../../static/icons/default-face.png" class="face"></image>
			</view>
			
			<view class="info-wapper">
				<label class="words-lbl">账号</label>
				<input name="username" type="text" value="" class="input" placeholder="请输入用户名" placeholder-class="graywords"/>
			</view>
			
			<view class="info-wapper" style="margin-top: 40upx;">
				<label class="words-lbl">密码</label>
				<input name="password" type="text" value="" password="true" class="input" placeholder="请输入密码" placeholder-class="graywords"/>
			</view>
			
			<button type="primary" form-type="submit" style="margin-top: 60upx;width: 90%;">登录</button>
		</form>
		

	</view>
</template>


<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {

			formSubmit (e) {
				var me = this;
				var username = e.detail.value.username;
				var password = e.detail.value.password;
				// console.log(username);
				// console.log(password);

				// 发起登录的请求
				var serverUrl = me.serverUrl;
				uni.request({
					url: serverUrl + '/passport/login',
					data: {
						username: username,
						password: password
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					method: "POST",
					success: (res) => {
						// console.log(res);
						// debugger;
						// 获取真实数据之前，务必判断状态是否为200
						if (res.data.code == 0) {
							var userInfo = res.data.data;
							// console.log(userInfo);
							// 保存用户信息到全局的缓存中
							uni.setStorageSync("userInfo", userInfo);

							// 切换页面跳转，使用tab切换的api
							uni.navigateTo({
								url: "../index/index"
							});
						} else if (res.data.code == 1) {
							// debugger;
							uni.showToast({
								title: res.data.msg,
								duration: 2000,
								image: "../../static/icons/error.png"
							})
						}
					},

				});
			}
		}
	}
</script>

<style>
	@import url("login.css");
</style>
