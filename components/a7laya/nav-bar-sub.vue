<template>
	<view class="position-fixed w-100" style="z-index: 2020; top: 90rpx;">
		<view class="w-100 d-flex a-center j-center main-bg-hover-color text-white font-weight animated fadeInDown fast" 
		style="height: 90rpx;">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// showArrow: {
			// 	type:[Boolean],
			// 	default: true
			// }
		}
	}
</script>

<style>
</style>
