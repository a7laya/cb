<template>
	<view class="page page-block">
		<!-- 头部 -->
		<nav-bar>{{'流量实时显示' | $lan('1')}}</nav-bar>
		<nav-bar-sub>
			<text class="test text-white" style="font-size: 60upx;">&#xe64b;</text>
			{{'电池型流量计' | $lan('1_1')}}  [ {{ dcs.meter_id }} ]
		</nav-bar-sub>
		<view class="w-100" style="height: 180rpx; background-color: #00c6dc;"></view>

		<!-- 数据表 -->
		<view class="table">
			<view class="dc-block">
				<view class="title"><text class="title-text">{{'名称' | $lan('name')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dcs.NAME }}</text>
				</view>
			</view>
			<view class="dc-block">
				<view class="title"><text class="title-text">{{'位置' | $lan('location')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dcs.location }}</text>
				</view>
			</view>
			<view class="dc-block">
				<view class="title"><text class="title-text">{{'地址' | $lan('address')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dcs.ADDRESS }}</text>
				</view>
			</view>

			<view class="dc-block">
				<view class="title"><text class="title-text">{{'瞬时流量' | $lan('ssll')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dcs.FLOW }}</text>
				</view>
			</view>

			<view class="dc-block">
				<view class="title"><text class="title-text">{{'瞬时流速' | $lan('ssls')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dcs.SPEED }}</text>
				</view>
			</view> 

			<view class="dc-block">
				<view class="title"><text class="title-text">{{'正向累积' | $lan('ftotal')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dcs.FTOTAL }}</text>
				</view>
			</view>

			<view class="dc-block">
				<view class="title"><text class="title-text">{{'反向累积' | $lan('rtotal')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dcs.RTOTAL }}</text>
				</view>
			</view>

			<view class="dc-block">
				<view class="title"><text class="title-text">{{'电导比' | $lan('ddb')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dcs.TUB }}</text>
				</view>
			</view>

			<view class="dc-block">
				<view class="title"><text class="title-text">{{'空管报警' | $lan('kgbj')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dcs.ALARM }}</text>
				</view>
			</view>

			<view class="dc-block">
				<view class="title"><text class="title-text">{{'信号强度' | $lan('xhqd')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dcs.CSQ }}</text>
				</view>
			</view>

			<view class="dc-block">
				<view class="title"><text class="title-text">{{'时间' | $lan('time')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dcs.TIME }}</text>
				</view>
			</view>

			<view class="dc-block">
				<view class="title"><text class="title-text">{{'压力' | $lan('press')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dcs.PRESS }}</text>
				</view>
			</view>
		</view>
		<loading-plus v-if="!dataReady"></loading-plus>
	</view>
</template>

<script>
import navBar from '@/components/a7laya/nav-bar.vue';
import navBarSub from '@/components/a7laya/nav-bar-sub.vue';

import loadingPlus from '@/components/a7laya/mixins/loading-plus.vue';
// 这个common.js是加载用户登录验证及语言包的mixin混入
import common from '@/components/a7laya/mixins/common.js';
export default {
	mixins: [common],
	components: { navBar, navBarSub, loadingPlus },
	data() {
		return {
			dcs: {},
			dataReady: false
		};
	},
	onShow() {},
	onLoad(params) {
		var me = this;
		var userInfo = me.getGlobalUser('userInfo');
		// 获取上一个页面传入的参数
		var meterId = params.meterId;

		// 获取详细信息
		var serverUrl = me.serverUrl;
		uni.request({
			url: serverUrl + '/dcs/single?id=' + meterId,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				id: userInfo.user_id,
				token: userInfo.token
			},
			method: 'POST',
			success: res => {
				console.log('res:', res);
				// 获取真实数据之前，务必判断状态是否为0
				// debugger;
				if (res.data.code == 0) {
					var dcs = res.data.data;
					me.dcs = dcs;
				}
			},
			complete: () => {
				me.dataReady = true
			}
		});
	},

	methods: {}
};
</script>

<style>
@import url('dcSingle.css');
</style>
