<template>
	<view class="position-fixed w-100" style="z-index: 2020;">
		<view class="w-100 d-flex a-center j-center main-bg-color text-white font-weight animated fadeInDown faster" 
		style="height: 90rpx;">
			<text v-show="showArrow" class="test text-white position-absolute" style="font-size: 40upx; top: 38rpx; left: 30rpx;" @click="goBack">&#xe687;</text>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			showArrow: {
				type:[Boolean],
				default: true
			}
		},
		computed:{
			
		},
		data() {
			return {
				
			}
		},
		methods:{
			goBack(){
				uni.navigateBack(-1)
			}
		}
	}
</script>

<style>
</style>
