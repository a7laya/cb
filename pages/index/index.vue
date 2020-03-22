<template>
	<view class="page page-fill">
		<!-- 头部 -->
		<nav-bar>{{language['page_title'][type]}}</nav-bar>
		<view class="w-100" style="height: 90rpx; background-color: #00c6dc;"></view>
		<view class="category-title1 border-bottom d-flex a-center px-2 py-1 animated fadeInLeft faster">{{language['1'][type]}}</view>

		<uni-grid :column="3" :show-border="false">
			<uni-grid-item class="animated fadeInLeft faster">
				<text class="test" style="font-size: 80upx;" @click="openMeterList('dc')">&#xe64b;</text>
				<text class="text" @click="openMeterList('dc')">{{language['1_1'][type]}}</text>
			</uni-grid-item>
			<uni-grid-item class="animated fadeInUp faster">
				<text class="test" style="font-size: 80upx;" @click="openMeterList('dtu')">&#xe6ed;</text>
				<text class="text" @click="openMeterList('dtu')">{{language['1_2'][type]}}</text>
			</uni-grid-item>
			<uni-grid-item class="animated fadeInRight faster">
				<text class="test" style="font-size: 80upx;" @click="openMeterList('cs')">&#xe63a;</text>
				<text class="text" @click="openMeterList('cs')">{{language['1_3'][type]}}</text>
			</uni-grid-item>
		</uni-grid>

		<divider></divider>

		<view class="category-title1 border-bottom d-flex a-center px-2 py-1 animated fadeInLeft fast">{{language['2'][type]}}</view>

		<uni-grid :column="3" :show-border="false">
			<uni-grid-item class="animated fadeInUp faster">
				<text class="test" style="font-size: 80upx;" @click="dcMonth">&#xe68a;</text>
				<text class="text" @click="dcMonth">{{language['2_1'][type]}}</text>
			</uni-grid-item>
			<uni-grid-item class="animated fadeInUp faster">
				<text class="test" style="font-size: 80upx;" @click="dcRange">&#xe6b4;</text>
				<text class="text" @click="dcRange">{{language['2_2'][type]}}</text>
			</uni-grid-item>
			<uni-grid-item class="animated fadeInUp faster">
				<text class="test" style="font-size: 80upx;" @click="dtuMonth">&#xe68a;</text>
				<text class="text" @click="dtuMonth">{{language['2_3'][type]}}</text>
			</uni-grid-item>
			<uni-grid-item class="animated fadeInDown faster">
				<text class="test" style="font-size: 80upx;" @click="dtuRange">&#xe6b4;</text>
				<text class="text" @click="dtuRange">{{language['2_4'][type]}}</text>
			</uni-grid-item>
			<uni-grid-item class="animated fadeInDown faster">
				<text class="test" style="font-size: 80upx;" @click="csMonth">&#xe68a;</text>
				<text class="text" @click="csMonth">{{language['2_5'][type]}}</text>
			</uni-grid-item>
			<uni-grid-item class="animated fadeInDown faster">
				<text class="test" style="font-size: 80upx;" @click="csRange">&#xe6b4;</text>
				<text class="text" @click="csRange">{{language['2_6'][type]}}</text>
			</uni-grid-item>
		</uni-grid>

		<divider></divider>

		<view class="category-title1 border-bottom d-flex a-center px-2 py-1 animated fadeInLeft fast">{{language['3'][type]}}</view>

		<uni-grid :column="3" :show-border="false">
			<uni-grid-item class="animated fadeInDown faster">
				<text class="test" style="font-size: 80upx;" @click="trash">&#xe620;</text>
				<text class="text" @click="trash">{{language['1_4'][type]}}</text>
			</uni-grid-item>
			<uni-grid-item class="animated fadeInDown faster">
				<text class="test" style="font-size: 80upx;" @click="setting">&#xe61f;</text>
				<text class="text" @click="setting">{{language['3'][type]}}</text>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
import uniGrid from '@/components/uni-grid/uni-grid.vue';
import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue';
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import navBar from '@/components/a7laya/nav-bar.vue';
// 这个common.js是加载用户登录验证及语言包的mixin混入
import common from '@/components/a7laya/mixins/common.js';
export default {
	mixins: [common],
	components: { uniGrid, uniGridItem, uniIcon, navBar },
	data() {
		return {
			// 以下字段包含在mixin里面
			// userIsLogin: false,
			// userInfo: {},
			// language: {},
			// type: 'cn'
		};
	},
	onLoad() {
		console.log('onLoad进入首页');
	},
	onShow() {
		console.log('onShow进入首页', this.language['page_title'][this.type]);
	},
	methods: {
		// 打开水表实时流量
		openMeterList(meterType) {
			uni.navigateTo({
				url: '../meter/meter?meterType=' + meterType
			});
		},

		trash() {
			uni.navigateTo({
				url: '../trash/trash'
			});
		},

		setting() {
			uni.navigateTo({
				url: '../setting/setting'
			});
		},

		dcMonth() {
			uni.navigateTo({
				url: '../dcMonth/dcMonth'
			});
		},

		dcRange() {
			uni.navigateTo({
				url: '../dcRange/dcRange'
			});
		},

		dtuMonth() {
			uni.navigateTo({
				url: '../dtuMonth/dtuMonth'
			});
		},

		dtuRange() {
			uni.navigateTo({
				url: '../dtuRange/dtuRange'
			});
		},

		csMonth() {
			uni.navigateTo({
				url: '../csMonth/csMonth'
			});
		},

		csRange() {
			uni.navigateTo({
				url: '../csRange/csRange'
			});
		}
	}
};
</script>

<style>
@import url('index.css');
</style>
