<template>
	<view class="body">
		<form @submit="formSubmit">
			<view class="face-wapper">
				<!-- <image src="../../static/icons/default-face.png" class="face"></image> -->
			</view>
			
			<view class="info-wapper">
				<label class="words-lbl">电磁型流量计</label>
				<input name="dtuTimer" type="text" v-model="dtu" class="input" placeholder="请输入定时器间隔(s)" placeholder-class="graywords"/>
			</view>
			
			<view class="info-wapper" style="margin-top: 40upx;">
				<label class="words-lbl">超声波流量计</label>
				<input name="csTimer" type="text" v-model="cs"  class="input" placeholder="请输入定时器间隔(s)" placeholder-class="graywords"/>
			</view>
			
			<button type="primary" form-type="submit" style="margin-top: 60upx;width: 90%;">确认</button>
			<button type="default"  style="margin-top: 60upx;width: 90%;" @click="formReset">重置</button>
		</form>
		

	</view>
</template>


<script>
	export default {
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
