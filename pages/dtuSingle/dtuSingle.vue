<template>
	<view class="page page-block">
		<!-- 头部 -->
		<nav-bar>{{'流量实时显示' | $lan('1')}}</nav-bar>
		<nav-bar-sub>
			<text class="test text-white mr-2" style="font-size: 40upx;">&#xe6ed;</text>
			{{'电池型流量计' | $lan('1_2')}}  [ {{ dtus.meter_id }} ]
		</nav-bar-sub>
		<view class="w-100" style="height: 180rpx; background-color: #00c6dc;"></view>

		<!-- 数据表 -->
		<view class="table">
			<view class="dtu-block">
				<view class="title"><text class="title-text">{{'水表' | $lan('meter')}} ID</text></view>
				<view class="value">
					<text class="value-text">{{ dtus.meter_id }}</text>
				</view>
			</view>

			<view class="dtu-block">
				<view class="title"><text class="title-text">{{'位置' | $lan('location')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dtus.location }}</text>
				</view>
			</view>

			<view class="dtu-block">
				<view class="title"><text class="title-text">{{'流量通信地址' | $lan('lltxdz')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dtus.lltxdz }}</text>
				</view>
			</view>

			<view class="dtu-block">
				<view class="title"><text class="title-text">{{'流量计功能码' | $lan('sjgnm')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dtus.lljgnm }}</text>
				</view>
			</view>

			<view class="dtu-block">
				<view class="title"><text class="title-text">{{'响应数据长度' | $lan('xysjcd')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dtus.xysjcd }}</text>
				</view>
			</view>

			<view class="dtu-block">
				<view class="title"><text class="title-text">{{'瞬时流量' | $lan('ssll')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dtus.ssll }}</text>
				</view>
			</view>

			<view class="dtu-block">
				<view class="title"><text class="title-text">{{'瞬时流速' | $lan('ssls')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dtus.ssls }}</text>
				</view>
			</view>

			<view class="dtu-block">
				<view class="title"><text class="title-text">{{'流量百分比' | $lan('llbfb')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dtus.llbfb }}</text>
				</view>
			</view>

			<view class="dtu-block">
				<view class="title"><text class="title-text">{{'流体电导比' | $lan('ltdsb')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dtus.ltdsb }}</text>
				</view>
			</view>

			<view class="dtu-block">
				<view class="title"><text class="title-text">{{'正向累积' | $lan('ftotal')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dtus.zxljl }}</text>
				</view>
			</view>

			<view class="dtu-block">
				<view class="title"><text class="title-text">{{'反向累积' | $lan('rtotal')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dtus.fxljl }}</text>
				</view>
			</view>

			<view class="dtu-block">
				<view class="title"><text class="title-text">{{'瞬时流量单位' | $lan('sslldw')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dtus.sslldw }}</text>
				</view>
			</view>

			<view class="dtu-block">
				<view class="title"><text class="title-text">{{'累积流量单位' | $lan('ljlldw')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dtus.ljlldw }}</text>
				</view>
			</view>

			<view class="dtu-block">
				<view class="title"><text class="title-text">{{'上限报警' | $lan('sxbj')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dtus.sxbj }}</text>
				</view>
			</view>

			<view class="dtu-block">
				<view class="title"><text class="title-text">{{'下限报警' | $lan('xxbj')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dtus.xxbj }}</text>
				</view>
			</view>

			<view class="dtu-block">
				<view class="title"><text class="title-text">{{'系统报警' | $lan('xtbj')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dtus.xtbj }}</text>
				</view>
			</view>

			<view class="dtu-block">
				<view class="title"><text class="title-text">{{'校验位' | $lan('crc')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dtus.crc }}</text>
				</view>
			</view>

			<view class="dtu-block">
				<view class="title"><text class="title-text">{{'时间' | $lan('time')}}</text></view>
				<view class="value">
					<text class="value-text">{{ dtus.time }}</text>
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
			dtus: {},
			dataReady: false
		};
	},
	onLoad(params) {
		var me = this;
		var userInfo = me.getGlobalUser('userInfo');
		// 获取上一个页面传入的参数
		var dtuId = params.meterId;


		// 获取详细信息
		var serverUrl = me.serverUrl;
		uni.request({
			url: serverUrl + '/dtus/single?id=' + dtuId,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				id: userInfo.user_id,
				token: userInfo.token
			},
			method: 'POST',
			success: res => {
				// 获取真实数据之前，务必判断状态是否为0
				// debugger;
				if (res.data.code == 0) {
					var dtus = res.data.data;
					me.dtus = dtus;
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
@import url('dtuSingle.css');
</style>
