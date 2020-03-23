<template>
	<view>
		<!-- 搜索栏 -->
		<search-bar :showSearchBar='false' :title="language['3_1'][type]" @add="add" @search="searchMe" :language="language" :languageType="type"></search-bar>
		
		<form @submit="formSubmit">
			<view class="face-wapper">
				<!-- <image src="../../static/icons/default-face.png" class="face"></image> -->
			</view>
			
			<view class="info-wapper">
				<label class="words-lbl">{{language['old_password'][type]}}</label>
				<input style="width: 400rpx;height:100%" name="old_password" type="password" value="" class="input"  placeholder-class="graywords"/>
			</view>
			
			<view class="info-wapper" style="margin-top: 40upx;">
				<label class="words-lbl">{{language['new_password'][type]}}</label>
				<input style="width: 400rpx;height:100%" name="password" type="password" value="" password="true" class="input"  placeholder-class="graywords"/>
			</view>
			
			<button type="primary" form-type="submit" class="main-bg-hover-color" style="margin-top: 60upx;width: 90%;">{{language['confirm'][type]}}</button>
			<button type="default" formType="reset" style="margin-top: 60upx;width: 90%;">{{language['reset'][type]}}</button>
		</form>
		

	</view>
</template>


<script>
	import searchBar from "@/components/a7laya/search-bar.vue"
	// 这个common.js是加载用户登录验证及语言包的mixin混入
	import common from "@/components/a7laya/mixins/common.js";
	export default {
		mixins:[common],
		components:{searchBar},
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
						// debugger;
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
