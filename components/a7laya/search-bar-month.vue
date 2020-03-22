<template>
	<view class="position-fixed w-100" style="z-index: 2020;">
		<view v-if="title" class="w-100 d-flex a-center j-center main-bg-color text-white font-weight animated fadeInDown faster" 
		style="height: 80rpx;">
			<text class="test text-white position-absolute" style="font-size: 40upx; top: 32rpx; left: 30rpx;" @click="goBack">&#xe687;</text>
			{{title}}
		</view>
		<view class="d-flex a-center j-sb w-100 main-bg-hover-color animated fadeInDown faster main-text-color" style="height: 100rpx;">
			<input type="number" style="width: 90rpx;"
			class="border border-light-secondary rounded ml-2 px py-1 font-md bg-white" 
			placeholder-class="font-md"
			:placeholder="language['year'][languageType]"
			v-model="form.year"
			@confirm="$emit('search', form)"
			/>{{language['year'][languageType]}}
			<input type="number" style="width: 90rpx;"
			class="border border-light-secondary rounded ml-2 px py-1 font-md bg-white" 
			placeholder-class="font-md"
			:placeholder="language['month'][languageType]"
			v-model="form.month"
			@confirm="$emit('search', form)"
			/>{{language['month'][languageType]}}
			<input type="text" 
			class="border border-light-secondary rounded flex-1 ml-2 px-1 py-1 font-md bg-white" 
			:placeholder="placeholderKeywords"
			placeholder-class="font-md"
			v-model="form.keywords"
			@confirm="$emit('search', form)"
			/>
			<text class="test text-white mx-2" style="font-size: 50upx;" @click="$emit('search',form)">&#xe669;</text>
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
			placeholderKeywords(){
				if(!this.language)
				return {cn: "ID | 位置", en: "ID | Location ", other:"ID | 位置"}[this.languageType]
				return 'ID | ' + this.language['location'][this.languageType] 
			}
		},
		data() {
			return {
				form: {
					year: '',
					month: '',
					keywords: ''
				}
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
