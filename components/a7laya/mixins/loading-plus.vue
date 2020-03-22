<template>
	<!-- loading 过场 -->
	<view class="position-fixed top-0 bottom-0 left-0 right-0 bg-white font-md d-flex a-center j-center main-text-color"
	style="z-index: 100; color: #00c6dc;">
		<text class="test" :class="{'animated rubberBand': flag}" style="font-size: 80upx;">&#xe628;</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag: true,
				timer: null,
			}
		},
		created() {
			this.timer = setInterval(()=>{this.flag = !this.flag},1000)
			setTimeout(()=>{
				clearInterval(this.timer);        
				this.timer = null;
			},5000)
		}
	}
</script>

<style>
</style>
