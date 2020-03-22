<script>
	export default {
		onLaunch: function() {
			console.log('App onLaunch')
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
/*每个页面公共css */
	
	/* 官方库 */
	@import "/common/uni.css";
	/* 第三方动画库 */
	@import "/common/animate.css";
	/* 图标库 */
	@import "/common/icon.css";
	/* 公共样式 */
	@import "/common/common.css";
	/* 自定义框架库 */
	@import "/common/zcm-main.css";
	
	/* 图标 */
	@font-face {
		font-family: 'iconfont';
		src: url('~@/static/font/iconfont.ttf') format('truetype');
	}
	.test {
		font-family: iconfont;
		color: #00BCD4;
		margin: -30rpx 0;
		/* margin-left: 20rpx; */
	}
	.page {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		/* position: absolute;		 */
	}
	
	
	.line-wapper {
		padding: 0upx 20upx;
	}
	.line {
		height: 1px;
		background-color: #DBDBDA;
	}
	

	
	
</style>
