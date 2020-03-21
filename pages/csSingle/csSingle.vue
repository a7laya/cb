<template>
	<view class="page page-block">
				
		<view class="cs-block">
			<view class="title">
				<text class="title-text">名称</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.meter_id}}</text>				
			</view>
		</view>	
		
		<view class="cs-block">
			<view class="title">
				<text class="title-text">位置</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.location}}</text>				
			</view>
		</view>	
		
		<view class="cs-block">
			<view class="title">
				<text class="title-text">设备地址</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.sbdz}}</text>				
			</view>
		</view>	
		
		<view class="cs-block">
			<view class="title">
				<text class="title-text">数据功能码</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.sjgnm}}</text>				
			</view>
		</view>	
		
		<view class="cs-block">
			<view class="title">
				<text class="title-text">返回寄存器数据字节</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.fhzj}}</text>				
			</view>
		</view>				

		<view class="cs-block">
			<view class="title">
				<text class="title-text">瞬时流量</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.ssll}}</text>				
			</view>
		</view>		
				
		<view class="cs-block">
			<view class="title">
				<text class="title-text">瞬时热流量</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.ssrll}}</text>				
			</view>
		</view>		
		
		<view class="cs-block">
			<view class="title">
				<text class="title-text">流体速度</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.ltsd}}</text>				
			</view>
		</view>			
		
		<view class="cs-block">
			<view class="title">
				<text class="title-text">测量流体速度</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.clltss}}</text>				
			</view>
		</view>					
		
		<view class="cs-block">
			<view class="title">
				<text class="title-text">正累积流量</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.zljll}}</text>				
			</view>
		</view>					
		
		<view class="cs-block">
			<view class="title">
				<text class="title-text">负累积流量</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.fljll}}</text>				
			</view>
		</view>	
								
		<view class="cs-block">
			<view class="title">
				<text class="title-text">正累积热量</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.zljrl}}</text>				
			</view>
		</view>								
								
		<view class="cs-block">
			<view class="title">
				<text class="title-text">负累积热量</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.fljrl}}</text>				
			</view>
		</view>	
																
		<view class="cs-block">
			<view class="title">
				<text class="title-text">净累积流量</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.jljll}}</text>				
			</view>
		</view>	
																
		<view class="cs-block">
			<view class="title">
				<text class="title-text">净累积热量</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.jljrl}}</text>				
			</view>
		</view>			
																
		<view class="cs-block">
			<view class="title">
				<text class="title-text">供水温度</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.wd1}}</text>				
			</view>
		</view>			
																
		<view class="cs-block">
			<view class="title">
				<text class="title-text">回水温度</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.wd2}}</text>				
			</view>
		</view>	
																
		<view class="cs-block">
			<view class="title">
				<text class="title-text">校验码</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.crc}}</text>				
			</view>
		</view>	
																
		<view class="cs-block">
			<view class="title">
				<text class="title-text">时间</text>				
			</view>
			<view class="value">
				<text class="value-text">{{css.time}}</text>				
			</view>
		</view>					
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				css: {}
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
			var csId= params.meterId;

			uni.showLoading({
				mask: true,
				title: "请稍后..."
			});
			uni.showNavigationBarLoading();

			// 获取详细信息
			var serverUrl = me.serverUrl;
			uni.request({
				url: serverUrl + '/css/single?id=' + csId,
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
						var css = res.data.data;
						me.css = css;
						
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
	@import url("csSingle.css"); 
</style>
