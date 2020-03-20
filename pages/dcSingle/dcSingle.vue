<template>
	<view class="page page-block">
				
		<view class="dc-block">
			<view class="title">
				<text class="title-text">名称</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dcs.NAME}}</text>				
			</view>
		</view>	
		<view class="dc-block">
			<view class="title">
				<text class="title-text">位置</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dcs.location}}</text>				
			</view>
		</view>	
		<view class="dc-block">
			<view class="title">
				<text class="title-text">地址</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dcs.ADDRESS}}</text>				
			</view>
		</view>
		
		<view class="dc-block">
			<view class="title">
				<text class="title-text">瞬时流量</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dcs.FLOW}}</text>				
			</view>
		</view>	

		<view class="dc-block">
			<view class="title">
				<text class="title-text">瞬时流速</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dcs.SPEED}}</text>				
			</view>
		</view>	

		<view class="dc-block">
			<view class="title">
				<text class="title-text">正向累积</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dcs.FTOTAL}}</text>				
			</view>
		</view>	

		<view class="dc-block">
			<view class="title">
				<text class="title-text">反向累积</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dcs.RTOTAL}}</text>				
			</view>
		</view>

		<view class="dc-block">
			<view class="title">
				<text class="title-text">电导比</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dcs.TUB}}</text>				
			</view>
		</view>

		<view class="dc-block">
			<view class="title">
				<text class="title-text">空管报警</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dcs.ALARM}}</text>				
			</view>
		</view>

		<view class="dc-block">
			<view class="title">
				<text class="title-text">信号强度</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dcs.CSQ}}</text>				
			</view>
		</view>


		<view class="dc-block">
			<view class="title">
				<text class="title-text">时间</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dcs.TIME}}</text>				
			</view>
		</view>

		<view class="dc-block">
			<view class="title">
				<text class="title-text">压力</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dcs.PRESS}}</text>				
			</view>
		</view>






			
		</view>

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dcs: {}
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
						
		onLoad(params) {
			var me = this;
			var userInfo = me.getGlobalUser("userInfo");
			// 获取上一个页面传入的参数
			var dcId= params.dcId;
			
			uni.showLoading({
				mask: true,
				title: "请稍后..."
			});
			uni.showNavigationBarLoading();

			// 获取详细信息
			var serverUrl = me.serverUrl;
			uni.request({
				url: serverUrl + '/dcs/single?id=' + dcId,
				header:{
					'content-type': 'application/x-www-form-urlencoded',
					'id':userInfo.user_id,
					'token': userInfo.token
				},
				method: "POST",
				success: (res) => {
					// 获取真实数据之前，务必判断状态是否为0
					// debugger;
					if (res.data.code == 0) {
						var dcs = res.data.data;
						me.dcs = dcs;
						
					}
				},
				complete: () => {
					uni.hideNavigationBarLoading();
					uni.hideLoading();
				}
			});
		},
		
		methods: {
			
		}
	}
</script>

<style>
	@import url("dcSingle.css"); 
</style>
