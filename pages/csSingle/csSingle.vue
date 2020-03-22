<template>
	<view class="page page-block">
		<!-- 头部 -->
		<nav-bar>{{'流量实时显示' | $lan('1')}}</nav-bar>
		<nav-bar-sub>
			<text class="test text-white" style="font-size: 50upx;">&#xe63a;</text>
			{{'超声波流量计' | $lan('1_3')}}  [ {{ css.meter_id }} ]
		</nav-bar-sub>
		<view class="w-100" style="height: 180rpx; background-color: #00c6dc;"></view>

		<!-- 数据表 -->
		<view class="table">
			<view class="cs-block">
				<view class="title"><text class="title-text">{{'名称' | $lan('name')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.meter_id }}</text>
				</view>
			</view>

			<view class="cs-block">
				<view class="title"><text class="title-text">{{'位置' | $lan('location')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.location }}</text>
				</view>
			</view>

			<view class="cs-block">
				<view class="title"><text class="title-text">{{'地址' | $lan('address')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.sbdz }}</text>
				</view>
			</view>

			<view class="cs-block">
				<view class="title"><text class="title-text">{{'数据功能码' | $lan('sjgnm')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.sjgnm }}</text>
				</view>
			</view>

			<view class="cs-block">
				<view class="title"><text class="title-text">{{'返回寄存器数据字节' | $lan('fhzj')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.fhzj }}</text>
				</view>
			</view>

			<view class="cs-block">
				<view class="title"><text class="title-text">{{'瞬时流量' | $lan('ssll')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.ssll }}</text>
				</view>
			</view>

			<view class="cs-block">
				<view class="title"><text class="title-text">{{'瞬时热流量' | $lan('ssrll')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.ssrll }}</text>
				</view>
			</view>

			<view class="cs-block">
				<view class="title"><text class="title-text">{{'流体速度' | $lan('ltsd')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.ltsd }}</text>
				</view>
			</view>

			<view class="cs-block">
				<view class="title"><text class="title-text">{{'测量流体速度' | $lan('clltss')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.clltss }}</text>
				</view>
			</view>

			<view class="cs-block">
				<view class="title"><text class="title-text">{{'正累积流量' | $lan('ftotal')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.zljll }}</text>
				</view>
			</view>

			<view class="cs-block">
				<view class="title"><text class="title-text">{{'负累积流量' | $lan('rtotal')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.fljll }}</text>
				</view>
			</view>

			<view class="cs-block">
				<view class="title"><text class="title-text">{{'正累积热量' | $lan('zljrl')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.zljrl }}</text>
				</view>
			</view>

			<view class="cs-block">
				<view class="title"><text class="title-text">{{'负累积热量' | $lan('fljrl')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.fljrl }}</text>
				</view>
			</view>

			<view class="cs-block">
				<view class="title"><text class="title-text">{{'净累积流量' | $lan('jljll')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.jljll }}</text>
				</view>
			</view>

			<view class="cs-block">
				<view class="title"><text class="title-text">{{'净累积热量' | $lan('jljrl')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.jljrl }}</text>
				</view>
			</view>

			<view class="cs-block">
				<view class="title"><text class="title-text">{{'供水温度' | $lan('wd1')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.wd1 }}</text>
				</view>
			</view>

			<view class="cs-block">
				<view class="title"><text class="title-text">{{'回水温度' | $lan('wd2')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.wd2 }}</text>
				</view>
			</view>

			<view class="cs-block">
				<view class="title"><text class="title-text">{{'校验码' | $lan('crc')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.crc }}</text>
				</view>
			</view>

			<view class="cs-block">
				<view class="title"><text class="title-text">{{'时间' | $lan('time')}}</text></view>
				<view class="value">
					<text class="value-text">{{ css.time }}</text>
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
			css: {},
			dataReady: false
		};
	},

	onShow() {
	},

	onLoad(params) {
		var me = this;
		var userInfo = me.getGlobalUser('userInfo');
		// 获取上一个页面传入的参数
		var csId = params.meterId;

		// 获取详细信息
		var serverUrl = me.serverUrl;
		uni.request({
			url: serverUrl + '/css/single?id=' + csId,
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
					var css = res.data.data;
					me.css = css;
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
@import url('csSingle.css');
</style>
