<template>
	<view class="body">
		<form @submit="formSubmit">
			<view class="face-wapper">
				<!-- <image src="../../static/icons/default-face.png" class="face"></image> -->
			</view>
			
			<view class="info-wapper">
				<label class="words-lbl">旧密码</label>
				<input name="old_password" type="text" value="" class="input" placeholder="请输入旧密码" placeholder-class="graywords"/>
			</view>
			
			<view class="info-wapper" style="margin-top: 40upx;">
				<label class="words-lbl">新密码</label>
				<input name="password" type="text" value="" password="true" class="input" placeholder="请输入新密码" placeholder-class="graywords"/>
			</view>
			
			<button type="primary" form-type="submit" style="margin-top: 60upx;width: 90%;">确认</button>
			<button type="default" formType="reset" style="margin-top: 60upx;width: 90%;">重置</button>
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
				// 使用挂载方法获取用户数据
				var userInfo = this.getGlobalUser("userInfo");
				var old_password = e.detail.value.old_password;
				var password = e.detail.value.password;
				// console.log(old_password);
				// console.log(password);

				// 发起登录的请求
				var serverUrl = me.serverUrl;
				uni.request({
					url: serverUrl + '/users/changePassword',
					data: {
						old_password: old_password,
						password: password
					},
					header:{
						'content-type': 'application/x-www-form-urlencoded',
						'id':userInfo.user_id,
						'token': userInfo.token
					},
					method: "POST",
					success: (res) => {
						// console.log(res);
						debugger;
						// 获取真实数据之前，务必判断状态是否为200
						if (res.data.code == 0) {
							// var userInfo = res.data.data;

							// 切换页面跳转，使用tab切换的api
							uni.navigateTo({
								url: "../login/login"
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
	@import url("changePassword.css");
</style>
