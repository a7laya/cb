<template>
	<view class="">
		<!-- 头部 -->
		<search-bar-range :title="title" :language="language" :languageType="type" @search="searchMe"></search-bar-range>
		<view class="w-100" style="height: 180rpx; background-color: #00c6dc;;"></view>
		
		<view class="vdc-name">
			<view class="" v-for="(vdc,index) in vdcList" :key="index">
				<view class="" v-if="vdc.istheMonthFirstItem">
					{{vdc.year}}.{{vdc.month}}
				</view>
				<uni-collapse @change="change" >
					<uni-collapse-item ref="add" :title="`${vdc.location}` + `  [${vdc.NAME}]`" :show-animation="true"  thumb="../../static/icons/guess-u-like.png" >
						<view class="data-block">
							<view class="title">
								<text class="title-text">水表ID</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdc.NAME}}</text>				
							</view>
						</view>	
						<view class="data-block">
							<view class="title">
								<text class="title-text">正向累积</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdc.FTOTAL}}</text>				
							</view>
						</view>	
						<view class="data-block">
							<view class="title">
								<text class="title-text">反向累积</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdc.RTOTAL}}</text>				
							</view>
						</view>	
					</uni-collapse-item>
				</uni-collapse>	
			</view>
		</view>
		

		
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import uniIcon from "@/components/uni-icon/uni-icon.vue";
	
	import uniCollapse from "@/components/uni-collapse/uni-collapse.vue"
	import uniCollapseItem from "@/components/uni-collapse-item/uni-collapse-item.vue"
	
	import searchBarRange from '@/components/a7laya/search-bar-range.vue';
	import loadingPlus from '@/components/a7laya/mixins/loading-plus.vue';
	// 这个common.js是加载用户登录验证及语言包的mixin混入
	import common from '@/components/a7laya/mixins/common.js';
	export default {
		mixins: [common],
		components: {
			searchBarRange,
			uniList, 
			uniListItem, 
			uniPopup, 
			uniIcon,
			uniCollapse,
			uniCollapseItem
		},

		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				vdcList: [],
				form: {
					keywords: '', // 搜索的关键字
					dateStart: '',
					dateEnd: ''
				},			
				page: 1,				// 当前第几页
				limit: 15,				// 每页条数
				totalPages: 1,			// 总页数
				yearMonth: "",
				title: '',
				meterType: '', // 要查询得水表类型 dc dtu cs
				waitInfo: '',
			};
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},	
			
		onShow() {
			console.log('进入按区间查询');
			
			let title = { dc: '2_2', dtu: '2_4', cs: '2_6' }[this.meterType];
			this.title = this.language[title][this.type];
			this.waitInfo = this.language['wait'][this.type];
		},
		
		onLoad(e) {
			this.meterType = e.meterType;
			this.vdcList = [];
			this.pagedvdcList(this.form, 1, this.limit)
			console.log("this.vdcList:",this.vdcList)
			var me = this;
			var userInfo = me.getGlobalUser("userInfo");
			
			uni.showLoading({
				mask: true,
				title: "请稍后..."
			});
			uni.showNavigationBarLoading();
			
			var serverUrl = me.serverUrl;
			// console.log(usrInfo.user_id);
			// console.log(usrInfo.session_id);
			// 数据列表
			var limit = me.limit;
			uni.request({
				url: serverUrl + '/dccx/tableDataDC?keywords=&page=1&limit=' + limit,
				header:{
					'content-type': 'application/x-www-form-urlencoded',
					'id':userInfo.user_id,
					'token': userInfo.token
				},
				method: "POST",
				success: (res) => {
					// 获取真实数据之前，务必判断状态是否为0
					// console.log(res);
					// debugger;
					if (0 == res.data.code) {
						var vdcList = res.data.data.data;
						// debugger;				
						me.vdcList = vdcList;
						
						me.totalPages = parseInt(res.data.data.count/limit) + 1;
						
					} else if(1 == res.data.code) {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				},
				complete: () => {
					uni.hideNavigationBarLoading();
					uni.hideLoading();
				}
			});
		},
		

		onReachBottom() {
			var me = this;

			var page = me.page + 1;			// 查询下一页面，当前页数累加1
			var totalPages = me.totalPages;	// 获取总页数
			var keywords = "";
			var limit = me.limit;

			// 如果当前需要分页的分页数和总页数相等，就不分页
			if (page > totalPages) {
				return;
			}
			
			me.pagedvdcList(keywords, page, 15);
			
		},
		
		methods: {
						
			change() {
				
			},
			pagedvdcList(form, page, pageSize) {
				var me = this;
				var start = form.dateStart || '';
				var end = form.dateEnd || '';
				var keywords = form.keywords || '';
				uni.showLoading({
					mask: true,
					title: me.waitInfo
				});
				this.$H.post('/'+ meterType +'cx/tableDataDC?keywords='+ keywords +'&date1=' + start  +'&date2=' + end   +'&page=' + page + '&limit=' + pageSize).then(res => {
					if (0 == res.data.code) {
						console.log("res:",res)
						var vdcList = res.data.data;
						me.totalPages = res.data.count%me.limit === 0 ? res.data.count / me.limit : parseInt(res.data.count / me.limit) + 1
						me.vdcList = me.vdcList.concat(vdcList);
						me.page = page;
					}
					uni.hideLoading();
				});
			},
			
			searchMe(e) {
				var me = this;
				// 获取搜索的内容
				// var value = e.detail.value;
				var keywords = me.keywords;
				me.vdcList = [];
				// debugger;
				me.pagedvdcList(keywords, 1, 15);
			},
			
			bindDateChangeYear: function(e) {
				this.dateStart = e.target.value
			},
			
			bindDateChangeMonth: function(e) {
				this.dateEnd = e.target.value
			},
			
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 6;
				} else if (type === 'end') {
					year = year + 1;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
			
			

		}
	}
</script>

<style>
	@import url("dcRange.css"); 
</style>
