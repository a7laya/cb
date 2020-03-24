<template>
	<view>
		<!-- 搜索栏 -->
		<search-bar :showSearchBar='false' :title="language['3_1'][type]" @add="add" @search="searchMe" :language="language" :languageType="type"></search-bar>
		
		<form @submit="formSubmit">
			<view class="face-wapper">
				<!-- <image src="../../static/icons/default-face.png" class="face"></image> -->
			</view>
			
			<view class="info-wapper">
				<label class="words-lbl ml-2">{{language['1_2'][type]}}</label>
				<input style="width: 400rpx;" name="dtuTimer" type="text" v-model="dtu" class="input"  placeholder-class="graywords"/>
			</view>
			
			<view class="info-wapper" style="margin-top: 40upx;">
				<label class="words-lbl ml-2">{{language['1_3'][type]}}</label>
				<input style="width: 400rpx;" name="csTimer" type="text" v-model="cs" class="input"  placeholder-class="graywords"/>
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
				timerList: [],  //定时器列表
				dtu: "...",		//用于表单重置
				cs: "..."
				
			};
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
			var me = this;
			var userInfo = me.getGlobalUser("userInfo");
					
			var serverUrl = me.serverUrl;
			// console.log(usrInfo.user_id);
			// console.log(usrInfo.session_id);
			// 数据列表
			var limit = me.limit;
			uni.request({
				url: serverUrl + '/timers/tableData',
				header:{
					'content-type': 'application/x-www-form-urlencoded',
					'id':userInfo.user_id,
					'token': userInfo.token
				},
				method: "POST",
				success: (res) => {
					// 获取真实数据之前，务必判断状态是否为0
					// console.log(res);
					// debugger;
					if (0 == res.data.code) {
						var timerList = res.data.data;
						// debugger;
						me.timerList = timerList;
						me.dtu = timerList.dtu;
						me.cs = timerList.cs;
						
					}
				},

			});
		},	
		
		
		
		methods: {

			formSubmit (e) {
				var me = this;
				// 使用挂载方法获取用户数据
				var userInfo = this.getGlobalUser("userInfo");
				var dtuTimer = me.dtu;
				var csTimer = me.cs;
				// console.log(dtuTimer);
				// console.log(csTimer);

				// 发起登录的请求
				var serverUrl = me.serverUrl;
				uni.request({
					url: serverUrl + '/Timers/update',
					data: {
						dtu: dtuTimer,
						cs: csTimer
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
							uni.showToast({
								title: res.data.msg,
								duration: 2000,
							})
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
			},
			
			formReset (e) {
				// debugger;
				this.dtu = this.timerList.dtu;
				this.cs = this.timerList.cs;
			}
		}
	}
</script>

<style>
	@import url("timerSet.css");
</style>
