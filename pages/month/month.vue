<template>
	<view>
		<!-- 头部 -->
		<search-bar-month :title="title" :language="language" :languageType="type" @search="searchMe"></search-bar-month>
		<view class="w-100" style="height: 180rpx; background-color: #00c6dc;;"></view>
		<!-- dc -->
		<view class="vdc-name" v-if="meterType==='dc'">
			<view class="" v-for="(vdc, index) in vdcList" :key="index">
				<view class="the-first_item" v-if="vdc.istheMonthFirstItem">{{ vdc.year }}.{{ vdc.month }}</view>
				<uni-collapse @change="change">
					<uni-collapse-item ref="add" :title="`${vdc.location}` + `  [${vdc.NAME}]`" :show-animation="true" thumb="../../static/icons/meter.png">
						<view class="data-block">
							<view class="title"><text class="title-text">{{'月份' | $lan('month')}}</text></view>
							<view class="value">
								<text class="value-text">{{ vdc.year }}-{{ vdc.month }}</text>
							</view>
						</view>
						<view class="data-block">
							<view class="title"><text class="title-text">{{'水表' | $lan('meter')}}ID</text></view>
							<view class="value">
								<text class="value-text">{{ vdc.NAME }}</text>
							</view>
						</view>
						<view class="data-block">
							<view class="title"><text class="title-text">{{'正向累积' | $lan('ftotal')}}</text></view>
							<view class="value">
								<text class="value-text">{{ vdc.FTOTAL }}</text>
							</view>
						</view>
						<view class="data-block">
							<view class="title"><text class="title-text">{{'反向累积' | $lan('rtotal')}}</text></view>
							<view class="value">
								<text class="value-text">{{ vdc.RTOTAL }}</text>
							</view>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</view>
		<!-- dtu -->
		<view class="vdc-name" v-if="meterType==='dtu'">
			<view class="" v-for="(vdc,index) in vdcList" :key="index">
				<view class="the-first_item" v-if="vdc.istheMonthFirstItem">
					{{vdc.year}}.{{vdc.month}}
				</view>
				<uni-collapse @change="change" >
					<uni-collapse-item ref="add" :title="`${vdc.location}` + `  [${vdc.meter_id}]`" :show-animation="true"  thumb="../../static/icons/meter.png" >
						<view class="data-block">
							<view class="title">
								<text class="title-text">{{'月份' | $lan('month')}}</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdc.year}}-{{vdc.month}}</text>				
							</view>
						</view>	
						<view class="data-block">
							<view class="title">
								<text class="title-text">{{'水表' | $lan('meter')}}ID</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdc.meter_id}}</text>				
							</view>
						</view>	
						<view class="data-block">
							<view class="title">
								<text class="title-text">{{'正向累积' | $lan('ftotal')}}</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdc.zxljl}}</text>				
							</view>
						</view>	
						<view class="data-block">
							<view class="title">
								<text class="title-text">{{'反向累积' | $lan('rtotal')}}</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdc.fxljl}}</text>				
							</view>
						</view>	
					</uni-collapse-item>
				</uni-collapse>	
			</view>
		</view>
		<!-- cs -->
		<view class="vdc-name"  v-if="meterType==='cs'">
			<view class="" v-for="(vdc,index) in vdcList" :key="index">
				<view class="the-first_item" v-if="vdc.istheMonthFirstItem">
					{{vdc.year}}.{{vdc.month}}
				</view>
				<uni-collapse @change="change" >
					<uni-collapse-item ref="add" :title="`${vdc.location}` + `  [${vdc.meter_id}]`" :show-animation="true"  thumb="../../static/icons/meter.png" >
						<view class="data-block">
							<view class="title">
								<text class="title-text">{{'月份' | $lan('month')}}</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdc.year}}-{{vdc.month}}</text>				
							</view>
						</view>	
						<view class="data-block">
							<view class="title">
								<text class="title-text">{{'水表' | $lan('meter')}}ID</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdc.meter_id}}</text>				
							</view>
						</view>	
						
						<view class="data-block">
							<view class="title">
								<text class="title-text">{{'正向累积' | $lan('ftotal')}}</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdc.zljll}}</text>				
							</view>
						</view>	
						<view class="data-block">
							<view class="title">
								<text class="title-text">{{'反向累积' | $lan('rtotal')}}</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdc.fljll}}</text>				
							</view>
						</view>	
						
						<view class="data-block">
							<view class="title">
								<text class="title-text">{{'正累积热量' | $lan('zljrl')}}</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdc.zljrl}}</text>				
							</view>
						</view>	
						<view class="data-block">
							<view class="title">
								<text class="title-text">{{'反累积热量' | $lan('fljrl')}}</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdc.fljrl}}</text>				
							</view>
						</view>	
						
						<view class="data-block">
							<view class="title">
								<text class="title-text">{{'净累积流量' | $lan('jljll')}}</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdc.jljll}}</text>				
							</view>
						</view>	
						<view class="data-block">
							<view class="title">
								<text class="title-text">{{'净累积热量' | $lan('jljrl')}}</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdc.jljrl}}</text>				
							</view>
						</view>							
					</uni-collapse-item>
				</uni-collapse>	
			</view>
		</view>
	</view>
</template>

<script>
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';

import searchBarMonth from '@/components/a7laya/search-bar-month.vue';
import loadingPlus from '@/components/a7laya/mixins/loading-plus.vue';
// 这个common.js是加载用户登录验证及语言包的mixin混入
import common from '@/components/a7laya/mixins/common.js';
export default {
	mixins: [common],
	components: {
		uniCollapse,
		uniCollapseItem,
		searchBarMonth,
		loadingPlus
	},

	data() {
		return {
			title: '',
			vdcList: [],
			form: {
				keywords: '', // 搜索的关键字
				year: '',
				month: ''
			},
			page: 1, // 当前第几页
			limit: 15, // 每页条数
			totalPages: 1, // 总页数
			meterType: '', // 要查询得水表类型 dc dtu cs
			yearMonth: '',
			waitInfo: '',
		};
	},
	onShow() {
		console.log('进入按月查询');
		let title = { dc: '2_1', dtu: '2_3', cs: '2_5' }[this.meterType];
		this.title = this.language[title][this.type];
		this.waitInfo = this.language['wait'][this.type];
	},

	onLoad(e) {
		this.meterType = e.meterType;
		this.vdcList = [];
		this.pagedvdcList(this.form, 1, this.limit)
		console.log("this.vdcList:",this.vdcList)
	},

	onReachBottom() {
		console.log("form:",this.form)
		console.log("this.page:",this.page)
		console.log("this.totalPages:",this.totalPages)
		// 如果当前需要分页的分页数和总页数相等，就不加载
		if (this.page >= this.totalPages) return
		this.pagedvdcList(this.form, this.page+1, this.limit);
	},

	methods: {
		pagedvdcList(form, page, pageSize) {
			var me = this;
			var year = form.year || '';
			var month = form.month || '';
			var keywords = form.keywords || '';
			uni.showLoading({
				mask: true,
				title: me.waitInfo
			});
			this.$H.post('/v' + this.meterType + 's/tableData?keywords=' + keywords + '&year=' + year + '&month=' + month + '&page=' + page + '&limit=' + pageSize).then(res => {
				if (0 == res.data.code) {
					console.log("res:",res)
					var vdcList = res.data.data;
					me.totalPages = res.data.count%me.limit === 0 ? res.data.count / me.limit : parseInt(res.data.count / me.limit) + 1
					// 增加istheMonthFirstItem，判断是否是本月的第一个元素，用于显示月份
					
					for (var i = 0; i < vdcList.length; i++) {
						if (me.yearMonth != vdcList[i].year + '-' + vdcList[i].month) {
							vdcList[i].istheMonthFirstItem = true;
							me.yearMonth = vdcList[i].year + '-' + vdcList[i].month;
						}
					}
					me.vdcList = me.vdcList.concat(vdcList);
					me.page = page;
				}
				uni.hideLoading();
			});
		},

		searchMe(form) {
			var me = this;
			me.vdcList = [];
			me.pagedvdcList(form, 1, 15);
		},
		change(e){
			console.log("打开折叠",e)
		}
	}
};
</script>

<style>
.the-first_item{
	background-color: #C1F5F5;
	height: 75rpx;
	color: #085F73;
	display: flex;
	align-items: center;
	padding-left: 20rpx;
	font-size: 30rpx;
	font-weight: 600;
}
.data-block {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
}

.title {
	display: flex;
	flex-direction: column;
	justify-content: start;
	width: 40%;
	margin: 5rpx 10rpx;
}

.title-text {
	font-size: 24rpx;
	padding: 10rpx;
	padding-right: 20rpx;
	background-color: #def5f5;
	color: #085f73;
	text-align: right;
}

.value-text {
	font-size: 24rpx;
	padding: 10rpx;
	padding-left: 20rpx;
	height: 100%;
	background-color: #def5f5;
	color: #085f73;
	text-align: left;
	display: flex;
	align-items: center;
}

.value {
	display: flex;
	flex-direction: column;
	justify-content: start;
	width: 55%;
	margin: 5rpx 0;
}

.data-name {
	margin-top: 110upx;
}
</style>
