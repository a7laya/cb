<template>
	<view class="page page-block">
				
		<view class="dtu-block">
			<view class="title">
				<text class="title-text">水表ID</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dtus.meter_id}}</text>				
			</view>
		</view>	
		
		<view class="dtu-block">
			<view class="title">
				<text class="title-text">位置</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dtus.location}}</text>				
			</view>
		</view>	

		<view class="dtu-block">
			<view class="title">
				<text class="title-text">流量通信地址</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dtus.lltxdz}}</text>				
			</view>
		</view>	

		<view class="dtu-block">
			<view class="title">
				<text class="title-text">流量计功能码</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dtus.lljgnm}}</text>				
			</view>
		</view>	

		<view class="dtu-block">
			<view class="title">
				<text class="title-text">响应数据长度</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dtus.xysjcd}}</text>				
			</view>
		</view>	

		<view class="dtu-block">
			<view class="title">
				<text class="title-text">瞬时流量</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dtus.ssll}}</text>				
			</view>
		</view>	

		<view class="dtu-block">
			<view class="title">
				<text class="title-text">瞬时流速</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dtus.ssls}}</text>				
			</view>
		</view>	

		<view class="dtu-block">
			<view class="title">
				<text class="title-text">流量百分比</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dtus.llbfb}}</text>				
			</view>
		</view>	

		<view class="dtu-block">
			<view class="title">
				<text class="title-text">流体电导比</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dtus.ltdsb}}</text>				
			</view>
		</view>			

		<view class="dtu-block">
			<view class="title">
				<text class="title-text">正向累积</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dtus.zxljl}}</text>				
			</view>
		</view>				

		<view class="dtu-block">
			<view class="title">
				<text class="title-text">反向累积</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dtus.fxljl}}</text>				
			</view>
		</view>			

		<view class="dtu-block">
			<view class="title">
				<text class="title-text">瞬时流量单位</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dtus.sslldw}}</text>				
			</view>
		</view>			

		<view class="dtu-block">
			<view class="title">
				<text class="title-text">累积流量单位</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dtus.ljlldw}}</text>				
			</view>
		</view>	
					
		<view class="dtu-block">
			<view class="title">
				<text class="title-text">上限报警</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dtus.sxbj}}</text>				
			</view>
		</view>		
					
		<view class="dtu-block">
			<view class="title">
				<text class="title-text">下限报警</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dtus.xxbj}}</text>				
			</view>
		</view>	
					
		<view class="dtu-block">
			<view class="title">
				<text class="title-text">系统报警</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dtus.xtbj}}</text>				
			</view>
		</view>	
					
		<view class="dtu-block">
			<view class="title">
				<text class="title-text">校验位</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dtus.crc}}</text>				
			</view>
		</view>	
								
					
		<view class="dtu-block">
			<view class="title">
				<text class="title-text">时间</text>				
			</view>
			<view class="value">
				<text class="value-text">{{dtus.time}}</text>				
			</view>
		</view>	
						
				
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dtus: {}
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
			var dtuId= params.meterId
			
			uni.showLoading({
				mask: true,
				title: "请稍后..."
			});
			uni.showNavigationBarLoading();
			
			// 获取详细信息
			var serverUrl = me.serverUrl;
			uni.request({
				url: serverUrl + '/dtus/single?id=' + dtuId,
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
						var dtus = res.data.data;
						me.dtus = dtus;
						
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
	@import url("dtuSingle.css"); 
</style>
