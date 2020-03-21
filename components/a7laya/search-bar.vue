<template>
	<view class="position-fixed" style="z-index: 2020;">
		<view v-if="title" class="w-100 d-flex a-center j-center main-bg-color text-white font-weight animated fadeInDown faster" 
		style="height: 80rpx;">
			<text class="test text-white position-absolute" style="font-size: 40upx; top: 32rpx; left: 30rpx;" @click="goBack">&#xe687;</text>
			{{title}}
		</view>
		<view class="d-flex a-center j-sb w-100 main-bg-hover-color animated fadeInDown faster" style="height: 100rpx;">
			<text class="test text-white mx-3" style="font-size: 50upx;" @click="$emit('add')">&#xe600;</text>
			<input type="text" 
			class="border border-light-secondary rounded flex-1 ml-2 px-2 py-1 font-md bg-white" 
			style="width: 500rpx;"
			:placeholder="placeholder"
			placeholder-class="font-md"
			v-model="keywords"
			@confirm="$emit('search', keywords)"
			/>
			<text class="test text-white mx-2" style="font-size: 50upx;" @click="$emit('search', keywords)">&#xe669;</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			languageType: {
				type:[String],
				default: 'cn'
			},
			language: {
				type:[Boolean, Object],
				default: false
			},
			title: {
				type:[Boolean, String],
				default: false
			}
		},
		computed:{
			placeholder(){
				if(!this.language)
				return {cn: "搜索 ID | 位置", en: "Search ID1 | Location ", other:"検索 ID | 位置"}[this.languageType]
				return this.language['search'][this.languageType] + ' ID | ' + this.language['location'][this.languageType] 
			}
		},
		data() {
			return {
				keywords: ''
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
