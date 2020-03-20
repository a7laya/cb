<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
	.page {
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
		/* position: absolute;		 */
	}
	
	.page-block {
		background-color: #ffffff;
	}
	
	.line-wapper {
		padding: 0upx 20upx;
	}
	.line {
		height: 1px;
		background-color: #DBDBDA;
	}
	/* 每个页面公共css  end*/
	
	@font-face {
	    font-family: 'iconfont';
	    src: url('~@/static/icons/iconfont.ttf') format('truetype');
	}
	.test {
	    font-family: iconfont;
	    margin-left: 20rpx;
	}
	
	
</style>
