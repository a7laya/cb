<template>
	<view class="position-fixed w-100" style="z-index: 2020;">
		<view v-if="title" class="w-100 d-flex a-center j-center main-bg-color text-white font-weight animated fadeInDown faster" 
		style="height: 80rpx;">
			<text class="test text-white position-absolute" style="font-size: 40upx; top: 32rpx; left: 30rpx;" @click="goBack">&#xe687;</text>
			{{title}}
		</view>
		<view class="d-flex flex-column a-center j-center w-100 main-bg-hover-color animated fadeInDown faster main-text-color" 
		style="height: 180rpx;">
		<view class="d-flex a-center j-sb w-100">
			<text class="test text-white ml-3 mr-1" style="font-size: 80upx;" @click="showRange=!showRange">&#xe65f;</text>
			<w-picker 
				:languageType='languageType'
				:language='language'
				v-show='showRange'
			    mode="range" 
			    startDate="2017" 
			    endYear="2030"
			    :defaultVal="['2017-10-30','2019-12-31']"
			    :current="false"
			    @confirm="onConfirm" 
				@cancel="onCancel"
			    ref="range" 
			    themeColor="#f00"
			></w-picker>
			<input type="text" 
			class="border border-light-secondary rounded flex-1 ml-2 px-1 py-1 font-md bg-white" 
			:placeholder="placeholderKeywords"
			placeholder-class="font-md"
			v-model="form.keywords"
			@confirm="$emit('search', form)"
			/>
			<text class="test text-white mx-2" style="font-size: 50upx;" @click="$emit('search',form)">&#xe669;</text>
		</view>
		<view class="d-flex a-center j-center w-100 main-bg-hover-color text-white animated fadeInDown faster main-text-color">
			开始日期: {{form.dateStart}}  截止日期: {{form.dateEnd}}
		</view>
		</view>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components:{
			wPicker
		},
		mounted() {
			this.showRange = false
		},
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
					keywords: '',
					// showDate: false
				},
				showRange: true
			}
		},
		methods:{
			goBack(){
				uni.navigateBack(-1)
			},
			onCancel(){
				this.showRange = false
			},
			onConfirm(e){
				// console.log("dateRange:",e)
				this.form.dateStart = e.from
				this.form.dateEnd = e.to
				// this.form.showDate = true
				// 通知父组件，多显示一栏日期栏
				// this.$emit('showDate')
				this.showRange = false
			}
		}
	}
</script>

<style>
</style>
