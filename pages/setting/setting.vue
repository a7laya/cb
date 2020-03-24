<template>
	<view>
		<search-bar :showSearchBar='false' :title="language['3'][type]"  @search="searchMe" :language="language" :languageType="type"></search-bar>
		<view>
			<view class="w-100" style="height: 80rpx; background-color: #068adc;"></view>
			<view class="w-100 d-flex a-center j-center flex-column main-bg-hover-color" 
			style="height: 300rpx;"
			v-if="userIsLogin">
				<image src="/static/icons/default-face.png" style="height: 140rpx;width: 140rpx;"
				class="face animated flipInX"></image>
				<view class="font-lg main-text-color">
					{{userInfo.username}}
				</view>
			</view>
			<view v-else>
				<navigator url="../login/login">
					<view class="nickname regist-login">
						登录
					</view>
				</navigator>
			</view>
			
		</view>
		
		<view class="page-block info-list">
			<!-- 更改密码 start -->
			<view class="item-wapper " @click="changePassword">
				<view class="info-words">{{language['change_password'][type]}}</view>
				
				<view class="right-wapper">
					<view class="arrow-block">
						<image src="../../static/icons/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			<!-- 更改密码 end -->
			
			<!-- 定时设置  start-->
			<view class="item-wapper" @click="timerSet">
				<view class="info-words">{{language['3_5'][type]}}</view>
				
				<view class="right-wapper">
					<view class="arrow-block">
						<image src="../../static/icons/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			<!-- 定时设置  end-->			

			
		</view>
		
		<view class="footer-wapper">
			<view class="footer-words bg-warning text-white" style="margin-top: 10upx;" @click="cleanStorage">
				{{{cn:'清除缓存',en:'Clear cache',other:'キャッシュをクリア'}[type]}}
			</view>
			<view class="footer-words bg-danger text-white" style="margin-top: 10upx;" @click="logout">
				{{language['page_logout'][type]}}
			</view>
		</view>
		
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
				userIsLogin: false,
				userInfo: {}
			}
		},
		
		onShow() {
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
					url: "../login/login"
				});
			}
		},
		
		onShow() {
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
					url: "../login/login"
				});
			}
		},
		
		onLoad() {

		},
		methods: {

			changePassword() {
				uni.navigateTo({
					url: "../changePassword/changePassword"
				})				
			},
			
			timerSet() {
				uni.navigateTo({
					url: "../timerSet/timerSet"
				})		
			},
			
			cleanStorage() {
				// uni.clearStorageSync();
				uni.removeStorageSync("language");
				uni.removeStorageSync("type");
				uni.showToast({
					title: "清理缓存成功",
					mask: false,
					duration: 1500
				})
			},
			
			logout() {
				var userInfo = this.getGlobalUser("userInfo");
				var serverUrl = this.serverUrl;
				uni.request({
					url: serverUrl + '/users/logout?id=' + userInfo.user_id,
					method: "POST",
					header:{
						'content-type': 'application/x-www-form-urlencoded',
						'id':userInfo.user_id,
						'token': userInfo.token
					},
					complete: (res) => {
						// 获取真实数据之前，务必判断状态是否为0
						// debugger;
						// if (res.data.code == 0) {
							// 如果服务器返回0，代表用户在服务端退出登录成功	
							uni.removeStorageSync("userInfo");							
							// uni.removeStorageSync("language");							
							uni.navigateTo({
								url: "../login/login"
							})
						// } else {
						// 	
						// }
					}
				});
			}

		}
	}
</script>

<style>
	@import url("setting.css");
	.info-words{
		width: 80%;
		color: #085F73;
	}
</style>
