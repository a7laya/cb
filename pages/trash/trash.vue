<template>
	<view class="page page-block">
		
		<view class="search-block">
			<input 
				placeholder="搜索ID|位置" 
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
		
		<view class="trash-name">
			<uni-list>
				<view class="" v-for="(trash,index) in trashList" :key="index">
					<view class="" :data-trashid="trash.id" :data-trashindex="index" @longtap="operator" >
						<uni-list-item :title="`${trash.location}` + `  [${trash.meter_id}]`"  
								show-extra-icon="true" 
								:extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"
								show-arrow="false">
						</uni-list-item>
					</view>
				</view>
			    
			</uni-list>
		</view>
		
		<!-- 编辑弹出窗 start -->
		<uni-popup ref="popuprestore" type="center">
			确定要还原吗？
		    <view class="add-restore">		
				<view class="add-restore-row">
					<view class="row-title-left">
						<text class="row-title-text">水表ID:</text>
					</view>
					<view class="row-title-right">
						<!-- <text class="row-title-input" v-model="restoreId"/> -->
						<text class="row-title-input">{{restoreId}}</text>
					</view>
				</view>	
				
				<view class="add-restore-row">
					<view class="row-title-left">
						<text class="row-title-text">位置:</text>
					</view>
					<view class="row-title-right">
						<!-- <input class="row-title-input" v-model="restoreTableName"/> -->
						<text class="row-title-input">{{restoreLocation}}</text>
					</view>
				</view>		    	
		    </view>
			
			<view class="button-block">
				<button class="popup-button-add" type="warn" plain="true" :data-trashid="selectid" @click="confirmRestore">确定</button>
				<button class="popup-button-add" type="primary" plain="true" @click="cancelRestore">取消</button>		
			</view>
		</uni-popup>
		<!-- 编辑弹出窗 end -->
		
		<!-- 删除弹出窗 start -->
		<uni-popup ref="popupDelete" type="center">
		    确定要删除吗
			<view class="button-block">
				<button class="popup-button" type="warn" plain="true" :data-trashid="selectid" @click="confirmDelete">确定</button>
				<button class="popup-button" type="primary" plain="true" @click="cancelDelete">取消</button>		
			</view>

		</uni-popup>
		<!-- 删除弹出窗 end -->
		
		
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import uniIcon from "@/components/uni-icon/uni-icon.vue";
	
	export default {
		components: {uniList, uniListItem, uniPopup, uniIcon},
		data() {
			return {
				trashList: [],
				keywords: "",			// 搜索的关键字
				page: 1,				// 当前第几页
				limit: 15,				// 每页条数
				totalPages: 1,			// 总页数
				selectid: 0,			// 长按时选择数据表ID
				trashIndex: 0,			// 页面显示水表序号，用于编辑或删除页面节点
				addId: "",				// 增加水表弹出框的meterID
				addLocation: "",		// 增加水表弹出框的位置
				restoreId: "",			// 还原删除水表弹出框的meterID
				restoreTableName: "",	// 还原删除水表弹出框的数据表名称
				restoreLocation: ""
			};
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
				url: serverUrl + '/trashs/tableData?keywords=&page=1&limit=' + limit,
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
						var trashList = res.data.data.data;
						// debugger;
						me.trashList = trashList;
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
			
			me.pagedtrashList(keywords, page, 15);
			
		},
		
		methods: {			
			
			confirmRestore() {		
				var me = this;
				var userInfo = me.getGlobalUser("userInfo");
				var meter_id = me.restoreId;						//数据绑定的input meter_id值
				var tableName = me.restoreTableName;				//数据库表名称
				var trashIndex = me.trashIndex;
				var id = me.selectid;
								
				uni.showLoading({
					mask: true,
					title: "请稍后..."
				});
				uni.showNavigationBarLoading();
				
				var serverUrl = me.serverUrl;
				// 查询数据列表
				uni.request({
					url: serverUrl + '/trashs/restore?id=' + id + '&table_name=' + tableName,
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
							// 添加节点至首部
							// debugger;
							me.trashList.splice(me.trashIndex, 1);
							me.restoreId = "";
							me.restoreTableName = "";
						} 
					},
					complete: () => {
						uni.hideNavigationBarLoading();
						uni.hideLoading();
					}
				});					
				this.$refs.popuprestore.close()
			},
			
			cancelRestore() {
				this.$refs.popuprestore.close()
			},
			
			confirmDelete(e) {
				var me = this;
				var userInfo = me.getGlobalUser("userInfo");
				var trashId = e.currentTarget.dataset.trashid;
				var tableName = me.restoreTableName;				//数据绑定的数据库名称
				var id = me.selectid;
				// debugger;
				uni.showLoading({
					mask: true,
					title: "请稍后..."
				});
				uni.showNavigationBarLoading();
				
				var serverUrl = me.serverUrl;
				// 查询数据列表
				// debugger;
				uni.request({
					url: serverUrl + '/trashs/delete?id=' + id  + '&table_name=' + tableName,
					header:{
						'content-type': 'application/x-www-form-urlencoded',
						'id':userInfo.user_id,
						'token': userInfo.token
					},
					method: "POST",
					success: (res) => {
						// 获取真实数据之前，务必判断状态是否为0	
						if (0 == res.data.code) {
							me.trashList.splice(me.trashIndex, 1);
						} 
					},
					complete: () => {
						uni.hideNavigationBarLoading();
						uni.hideLoading();
					}
				});
				this.$refs.popupDelete.close()
			},
			
			cancelDelete() {
				this.$refs.popupDelete.close()
			},
			
						
			pagedtrashList(keywords, page, pageSize) {
				var me = this;
				var userInfo = me.getGlobalUser("userInfo");

				uni.showLoading({
					mask: true,
					title: "请稍后..."
				});
				uni.showNavigationBarLoading();
				
				var serverUrl = me.serverUrl;
				// 查询数据列表
				// debugger;
				uni.request({
					url: serverUrl + '/trashs/tableData?keywords='+ keywords +'&page=' + page + '&limit=' + pageSize,
					header:{
						'content-type': 'application/x-www-form-urlencoded',
						'id':userInfo.user_id,
						'token': userInfo.token
					},
					method: "POST",
					success: (res) => {
						// 获取真实数据之前，务必判断状态是否为0

						if (0 == res.data.code) {
							var trashList = res.data.data.data;
							me.trashList = me.trashList.concat(trashList);
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
				me.trashList = [];
				
				me.pagedtrashList(value, 1, 15);
			},
			
			operator(e) {
				var me = this;
				var globalUser = me.getGlobalUser("globalUser");
				var trashId = e.currentTarget.dataset.trashid;
				var trashIndex = e.currentTarget.dataset.trashindex;
				me.selectid = trashId;
				me.trashIndex = trashIndex;
				
				uni.showActionSheet({
					itemList: ["还原", "删除"],
					success(res) {
						var index = res.tapIndex;
						me.restoreId = me.trashList[trashIndex].meter_id;
						me.restoreTableName = me.trashList[trashIndex].table_name;
						me.restoreLocation = me.trashList[trashIndex].location;
						
						if (index == 0) {							
							me.$refs.popuprestore.open();
						} else if (index == 1) {
							me.$refs.popupDelete.open();							
						}
					}
				})
			},
			

		}
	}
</script>

<style>
	@import url("trash.css"); 
</style>
