<template>
	<view class="page page-block">
		<view class="search">
			<view class="date-block">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							起始:
						</view>
						<view class="uni-list-cell-db">
							<picker mode="date" :value="dateStart" :start="startDate" :end="endDate" @change="bindDateChangeYear">
								<view class="uni-input-start">{{dateStart}}</view>
							</picker>
						</view>
					</view>
				</view>

				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							截止:
						</view>
						<view class="uni-list-cell-db">
							<picker mode="date" :value="dateEnd" :start="startDate" :end="endDate" @change="bindDateChangeMonth">
								<view class="uni-input-end">{{dateEnd}}</view>
							</picker>
						</view>
					</view>
				</view>		
			</view>
			
			<view class="keywords-block">
							
				<input 
					placeholder="搜索ID" 
					maxlength="10" 
					class="search-text" 
					confirm-type="search"
					v-model="keywords"
					@confirm="searchMe"
				/>
				
				<view class="search-ico-wapper">
					<image src="../../static/icons/search.png" class="search-ico" @click="searchMe"></image>
				</view>
			</view>	
		</view>
		
		<view class="vdtu-name">
			<view class="" v-for="(vdtu,index) in vdtuList" :key="index">
				<view class="" v-if="vdtu.istheMonthFirstItem">
					{{vdtu.year}}.{{vdtu.month}}
				</view>
				<uni-collapse @change="change" >
					<uni-collapse-item ref="add" :title="`${vdtu.location}` + `  [${vdtu.meter_id}]`" :show-animation="true"  thumb="../../static/icons/guess-u-like.png" >
						<view class="data-block">
							<view class="title">
								<text class="title-text">水表ID</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdtu.meter_id}}</text>				
							</view>
						</view>	
						<view class="data-block">
							<view class="title">
								<text class="title-text">正向累积</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdtu.FTOTAL}}</text>				
							</view>
						</view>	
						<view class="data-block">
							<view class="title">
								<text class="title-text">反向累积</text>				
							</view>
							<view class="value">
								<text class="value-text">{{vdtu.RTOTAL}}</text>				
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
	
	
	export default {
		components: {
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
				vdtuList: [],
				keywords: "",			// 搜索的关键字
				page: 1,				// 当前第几页
				limit: 15,				// 每页条数
				totalPages: 1,			// 总页数
				yearMonth: "",
				
				title: 'picker',

				dateStart: currentDate,
				dateEnd: currentDate
				
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
				url: serverUrl + '/dtucx/tableData?keywords=&page=1&limit=' + limit,
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
						var vdtuList = res.data.data.data;
						// debugger;				
						me.vdtuList = vdtuList;
						
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
			
			me.pagedvdtuList(keywords, page, 15);
			
		},
		
		methods: {
						
			change() {
				
			},
			
			pagedvdtuList(keywords, page, pageSize) {
				var me = this;
				var userInfo = me.getGlobalUser("userInfo");
				var start = me.dateStart;
				var end = me.dateEnd;

				uni.showLoading({
					mask: true,
					title: "请稍后..."
				});
				uni.showNavigationBarLoading();
				
				var serverUrl = me.serverUrl;
				// 查询数据列表
				// debugger;
				uni.request({
					url: serverUrl + '/dtucx/tableData?keywords='+ keywords +'&date1=' + start  +'&date2=' + end   +'&page=' + page + '&limit=' + pageSize,
					header:{
						'content-type': 'application/x-www-form-urlencoded',
						'id':userInfo.user_id,
						'token': userInfo.token
					},
					method: "POST",
					success: (res) => {
						// 获取真实数据之前，务必判断状态是否为0
						// debugger;
						if (0 == res.data.code) {
							var vdtuList = res.data.data.data;
							
							me.vdtuList = me.vdtuList.concat(vdtuList);
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
				// var value = e.detail.value;
				var keywords = me.keywords;
				me.vdtuList = [];
				// debugger;
				me.pagedvdtuList(keywords, 1, 15);
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
	@import url("dtuRange.css"); 
</style>
