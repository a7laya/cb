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
				<text class="test" style="font-size: 80upx;" @click="openMonth('dc')">&#xe68a;</text>
				<text class="text" @click="openMonth('dc')">{{language['2_1'][type]}}</text>
			</uni-grid-item>
			<uni-grid-item class="animated fadeInUp faster">
				<text class="test" style="font-size: 80upx;" @click="openRange('dc')">&#xe6b4;</text>
				<text class="text" @click="openRange('dc')">{{language['2_2'][type]}}</text>
			</uni-grid-item>
			<uni-grid-item class="animated fadeInUp faster">
				<text class="test" style="font-size: 80upx;" @click="openMonth('dtu')">&#xe68a;</text>
				<text class="text" @click="openMonth('dtu')">{{language['2_3'][type]}}</text>
			</uni-grid-item>
			<uni-grid-item class="animated fadeInDown faster">
				<text class="test" style="font-size: 80upx;" @click="openRange('dtu')">&#xe6b4;</text>
				<text class="text" @click="openRange('dtu')">{{language['2_4'][type]}}</text>
			</uni-grid-item>
			<uni-grid-item class="animated fadeInDown faster">
				<text class="test" style="font-size: 80upx;" @click="openMonth('cs')">&#xe68a;</text>
				<text class="text" @click="openMonth('cs')">{{language['2_5'][type]}}</text>
			</uni-grid-item>
			<uni-grid-item class="animated fadeInDown faster">
				<text class="test" style="font-size: 80upx;" @click="openRange('cs')">&#xe6b4;</text>
				<text class="text" @click="openRange('cs')">{{language['2_6'][type]}}</text>
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
				<text class="test" style="font-size: 80upx;" @click="setting">&#xe7d6;</text>
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
		let me = this
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
		openMonth(meterType) {
			uni.navigateTo({
				url: '../month/month?meterType=' + meterType
			});
		},
		openRange(meterType) {
			uni.navigateTo({
				url: '../range/range?meterType=' + meterType
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

		

		dcRange() {
			uni.navigateTo({
				url: '../dcRange/dcRange'
			});
		},

		

		dtuRange() {
			uni.navigateTo({
				url: '../dtuRange/dtuRange'
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
