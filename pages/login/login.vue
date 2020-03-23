<template>
	<view class="body">
		<form @submit="formSubmit">
			<view class="d-flex position-absolute text-muted" style="top: 10rpx;right: 15rpx;">
				<view class="mr-1" :class="{'active animated flipInX':type == 'cn'}" @click="setLanguageType('cn')">中文</view>|
				<view class="mx-1" :class="{'active animated flipInX':type == 'en'}" @click="setLanguageType('en')">English</view>|
				<view class="ml-1" :class="{'active animated flipInX':type == 'other'}" @click="setLanguageType('other')">日本語</view>
			</view>
			<view class="face-wapper">
				<image src="../../static/icons/default-face.png" class="face animated flipInX"></image>
			</view>
			
			<view class="info-wapper d-flex a-center j-end animated fadeInLeft fast">
				<view class="text-muted text-center" style="width: 160rpx;">{{username}}</view>
				<input name="username" type="text" value="" class="input p-1 border rounded" placeholder-class="graywords"/>
			</view>
			
			<view class="info-wapper d-flex a-center j-end animated fadeInRight fast" style="margin-top: 40upx;">
				<view class="text-muted text-center" style="width: 160rpx;">{{password}}</view>
				<input name="password" type="text" value="" password="true" class="input p-1 border rounded" placeholder-class="graywords"/>
			</view>
			
			
			
			<button  form-type="submit" style="margin-top: 60upx;width: 90%;" 
			class="main-bg-hover-color text-white animated fadeInUp fast" 
			hover-class="bg-primary">{{title}}</button>
		</form>
		

	</view>
</template>


<script>
	export default {
		data() {
			return {
				titleObj: {
					cn: "登录",
					en: "Login",
					other: "ログイン"
				},
				usernameObj: {
					cn: "账 号",
					en: "ID",
					other: "アカウント"
				},
				passwordObj: {
					cn: "密 码",
					en: "password",
					other: "パスワード"
				},
				type: 'cn'
			};
		},
		onShow() {
			this.type = uni.getStorageSync('type') || this.type
		},
		watch:{
			type(newVal, oldVal){
				uni.setNavigationBarTitle({
					title:this.titleObj[newVal]
				})
				
			}
		},
		computed:{
			username(){
				return this.usernameObj[this.type]
			},
			password(){
				return this.passwordObj[this.type]
			},
			title(){
				return this.titleObj[this.type]
			}
		},
		methods: {
			setLanguageType(type) {
				this.type = type
				uni.setStorageSync('type',type)
			},
			formSubmit (e) {
				var me = this;
				var username = e.detail.value.username;
				var password = e.detail.value.password;
				// 发起登录的请求
				var serverUrl = me.serverUrl;
				uni.request({
					url: serverUrl + '/passport/login',
					data: {
						username: username,
						password: password
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' ,//自定义请求头信息
					},
					method: "POST",
					success: (res) => {
						// console.log(res);
						// debugger;
						// 获取真实数据之前，务必判断状态是否为200
						if (res.data.code == 0) {
							var userInfo = res.data.data;
							
							// 用vux保存用户信息
							// this.setUserInfo(userInfo)
							
							// 保存用户信息到全局的缓存中
							uni.setStorageSync("userInfo", userInfo);
							
							// 获取语言列表
							this.$H.get('/Lan/tableData').then(v=>{
								uni.setStorageSync("language", v.data);
							})
							uni.setStorageSync('type',this.type)
							
							// 切换页面跳转，使用tab切换的api
							uni.navigateTo({
								url: "../index/index"
							});
						} else if (res.data.code == 1) {
							// debugger;
							uni.showToast({
								title: res.data.msg,
								duration: 2000,
								image: "../../static/icons/error.png"
							})
						}
					},

				});
			}
		}
	}
</script>

<style>
	@import url("login.css");
	.active {
		color: #DC3545;
	}
	.input {
		margin-left: 5px;
	}
</style>
