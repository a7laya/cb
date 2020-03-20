<template>
	<view class="page page-block">
		
		<view class="search-block">
			<view class="search-ico-wapper">
				<image src="../../static/icons/search.png" class="search-ico" @click="searchMe"></image>
			</view>
			<input 
				placeholder="搜索ID|位置" 
				maxlength="10" 
				class="search-text" 
				confirm-type="search"
				v-model="keywords"
				@confirm="searchMe"
			/>
			
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChangeYear" :value="indexYear" :range="arrayYear">
							<view class="uni-input-year">{{arrayYear[indexYear]}}</view>
						</picker>
					</view>
					<view class="uni-list-cell-left">
						年
					</view>
				</view>
			</view>
		
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChangeMonth" :value="indexMonth" :range="arrayMonth" class="uni-input-block">
							<view class="uni-input-month">{{arrayMonth[indexMonth]}}</view>
						</picker>
					</view>
					<view class="uni-list-cell-left">
						月
					</view>
				</view>
			</view>	
						
		</view>
		

		
		<view class="vdc-name">
			<view class="" v-for="(vdc,index) in vdcList" :key="index">
				<view class="the-first_item" v-if="vdc.istheMonthFirstItem">
					{{vdc.year}}.{{vdc.month}}
				</view>
				<uni-collapse @change="change" >
					<uni-collapse-item ref="add" :title="`${vdc.location}` + `  [${vdc.NAME}]`" :show-animation="true"  thumb="../../static/icons/guess-u-like.png">
						<view class="data-block">
							<view class="title">
								<text class="title-text">月份</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdc.year}}-{{vdc.month}}</text>				
							</view>
						</view>	
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
	
	import uniCollapse from "@/components/uni-collapse/uni-collapse.vue";
	import uniCollapseItem from "@/components/uni-collapse-item/uni-collapse-item.vue";
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue";
	
	
	export default {
		components: {
			uniList, 
			uniListItem, 
			uniPopup, 
			uniIcon,
			uniCollapse,
			uniCollapseItem,
			uniDrawer
		},

		data() {

			return {
				vdcList: [],
				keywords: "",			// 搜索的关键字
				page: 1,				// 当前第几页
				limit: 15,				// 每页条数
				totalPages: 1,			// 总页数
				yearMonth: "",
				
				title: 'picker',
				arrayYear: ['_____', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
				indexYear: 0,
				arrayMonth: ['_', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '12'],
				indexMonth: 0,
				showRigth: false,
				showLeft: false
				
			};
		},
		computed: {
			// startDate() {
			// 	return this.getDate('start');
			// },
			// endDate() {
			// 	return this.getDate('end');
			// }
		},	
			
		onShow() {
			// 使用挂载方法获取用户数据
			var userInfo = this.getGlobalUser("userInfo");
			// debugger;
			if (userInfo != null) {
				this.userIsLogin = true;
				this.userInfo = userInfo;
			} else {
				this.userIsLogin = false;
				this.userInfo = {};
				// 切换页面跳转，使用tab切换的api
				uni.navigateTo({
					url: "../login/login"
				});
			}
		},
		
		onLoad() {
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
				url: serverUrl + '/vdcs/tableData?keywords=&page=1&limit=' + limit,
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
						// 增加istheMonthFirstItem，判断是否是本月的第一个元素，用于显示月份
						if( vdcList.length > 0) {
							vdcList[0].istheMonthFirstItem = true;
							var yearMonth = vdcList[0].year + '-' + vdcList[0].month;
						}
						for(var i = 0; i < vdcList.length; i++) {
							if(yearMonth != vdcList[i].year + '-' + vdcList[i].month) {
								vdcList[i].istheMonthFirstItem = true;
								yearMonth = vdcList[i].year + '-' + vdcList[i].month
							}					
						}
						
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
			
			bindPickerChangeYear: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexYear = e.target.value
			},
			
			bindPickerChangeMonth: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexMonth = e.target.value
			},
			
			change() {
				
			},
			
			pagedvdcList(keywords, page, pageSize) {
				var me = this;
				var userInfo = me.getGlobalUser("userInfo");
				var year = me.indexYear == 0 ? '' : me.arrayYear[me.indexYear];
				var month = me.indexMonth == 0 ? '' : me.arrayMonth[me.indexMonth];

				uni.showLoading({
					mask: true,
					title: "请稍后..."
				});
				uni.showNavigationBarLoading();
				
				var serverUrl = me.serverUrl;
				// 查询数据列表
				// debugger;
				uni.request({
					url: serverUrl + '/vdcs/tableData?keywords='+ keywords +'&year=' + year  +'&month=' + month   +'&page=' + page + '&limit=' + pageSize,
					header:{
						'content-type': 'application/x-www-form-urlencoded',
						'id':userInfo.user_id,
						'token': userInfo.token
					},
					method: "POST",
					success: (res) => {
						// 获取真实数据之前，务必判断状态是否为0

						if (0 == res.data.code) {
							var vdcList = res.data.data.data;
							
							// 增加istheMonthFirstItem，判断是否是本月的第一个元素，用于显示月份
							if( vdcList.length > 0) {
								vdcList[0].istheMonthFirstItem = true;
								var yearMonth = vdcList[0].year + '-' + vdcList[0].month;
							}
							for(var i = 0; i < vdcList.length; i++) {
								if(yearMonth != vdcList[i].year + '-' + vdcList[i].month) {
									vdcList[i].istheMonthFirstItem = true;
									yearMonth = vdcList[i].year + '-' + vdcList[i].month
								}					
							}
							me.vdcList = me.vdcList.concat(vdcList);
							me.page = page;
						} 
					},
					complete: () => {
						uni.hideNavigationBarLoading();
						uni.hideLoading();
					}
				});
			},
			
			searchMe(e) {
				var me = this;
				// 获取搜索的内容
				// debugger;
				// var value = e.detail.value;
				var value = me.keywords;
				me.vdcList = [];
				
				me.pagedvdcList(value, 1, 15);
			}
		}

	}
</script>

<style>
	@import url("dcMonth.css"); 
</style>
