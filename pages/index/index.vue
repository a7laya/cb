<template>
	<view class="page page-fill">

			<view class="category-title">
				实时显示
			</view>					
		
			<uni-grid :column="3" :show-border="false">
				<uni-grid-item>
					
					<text class="test" style="font-size: 100upx;" @click="dcRuntime">&#xe631;</text>	
					<!-- <uni-icon type="navigate" size="60"  @click="dcRuntime"></uni-icon> -->
					<text class="text" @click="dcRuntime">电池型流量计</text>
				</uni-grid-item>
				<uni-grid-item>
					<uni-icon type="reload" size="60" @click="dtuRuntime"></uni-icon>
					<text class="text" @click="dtuRuntime">电磁型流量计</text>
				</uni-grid-item>
				<uni-grid-item>
					<uni-icon type="flag" size="60" @click="csRuntime"></uni-icon>
					<text class="text" @click="csRuntime">超声波流量计</text>
				</uni-grid-item>
				<uni-grid-item>
					<uni-icon type="trash" size="60" color="#09BB07" @click="trash"></uni-icon>
					<text class="text" @click="trash">回收站</text>
				</uni-grid-item>
				<uni-grid-item>
					<uni-icon type="gear-filled" size="60" @click="setting"></uni-icon>
					<text class="text" @click="setting">设置</text>
				</uni-grid-item>
			</uni-grid>

			
			<view class="category-title">
				数据查询
			</view>
			

				
			<uni-grid :column="3"  :show-border="false">
			
				<uni-grid-item>						
					<text class="test" style="font-size: 95upx;margin-bottom: 8upx;" @click="dcMonth">&#xe665;</text>	
					<text class="text" @click="dcMonth">电池型按月份</text>
				</uni-grid-item>
				<uni-grid-item>
					<text class="test" style="font-size: 95upx;margin-bottom: 8upx;" @click="dcRange">&#xe655;</text>	
					<text class="text" @click="dcRange">电池型按区间</text>
				</uni-grid-item>
				<uni-grid-item>
					<text class="test" style="font-size: 95upx;margin-bottom: 8upx;" @click="dtuMonth">&#xe628;</text>					
					<text class="text" @click="dtuMonth">电磁型按月份</text>
				</uni-grid-item>
				<uni-grid-item>
					<text class="test" style="font-size: 95upx;margin-bottom: 8upx;" @click="dtuRange">&#xe63c;</text>					
					<text class="text" @click="dtuRange">电磁型按区间</text>
				</uni-grid-item>
				<uni-grid-item>					
					<text class="test" style="font-size: 95upx;margin-bottom: 8upx;" @click="csMonth">&#xe60e;</text>
					<text class="text" @click="csMonth">超声波按月份</text>
				</uni-grid-item>
				<uni-grid-item>					
					<text class="test" style="font-size: 95upx;margin-bottom: 8upx;" @click="csRange">&#xe663;</text>	
					<text class="text" @click="csRange">超声波按区间</text>
				</uni-grid-item>

			</uni-grid>		

	</view>
	
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue";
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue";
	import uniIcon from "@/components/uni-icon/uni-icon.vue";
	
	export default {
		components: {uniGrid, uniGridItem, uniIcon},
		data() {
			return {
				userIsLogin: false,
				userInfo: {},
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
			
		onReady() {
			uni.navigateTo({
				url: "index"
			})
		},		
		
		methods: {
			dcRuntime() {
				// debugger;
				uni.navigateTo({
					url: "../dc/dc"
				})
			},
			
			dtuRuntime() {
				uni.navigateTo({
					url: "../dtu/dtu"
				})				
			},	
					
			csRuntime() {
				uni.navigateTo({
					url: "../cs/cs"
				})					
			},	
					
			trash() {
				uni.navigateTo({
					url: "../trash/trash"
				})					
			},
			
			setting() {
				uni.navigateTo({
					url: "../setting/setting"
				})	 				
			},
			
			dcMonth() {
				uni.navigateTo({
					url: "../dcMonth/dcMonth"
				})		
			},
			
			dcRange() {
				uni.navigateTo({
					url: "../dcRange/dcRange"
				})					
			},
			
			dtuMonth() {
				uni.navigateTo({
					url: "../dtuMonth/dtuMonth"
				})					
			},
			
			dtuRange() {
				uni.navigateTo({
					url: "../dtuRange/dtuRange"
				})					
			},
			
			csMonth() {
				uni.navigateTo({
					url: "../csMonth/csMonth"
				})					
			},
			
			csRange() {
				uni.navigateTo({
					url: "../csRange/csRange"
				})					
			},				
			
			
			
		}
	}
</script>

<style>
	@import url("index.css");
</style>
