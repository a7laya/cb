<template>
	<view class="page page-block">

		
		<view class="search-block">
			<view class="plus-ico-wapper">
				<text class="test" style="font-size: 50upx;" @click="add">&#xe654;</text>	
				<!-- <uni-icon type="plus" class="plus" size="20" @click="add"></uni-icon>	 -->
			</view>
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
		
		<view class="dc-name">
			<uni-list>
				<view class="" v-for="(dc,index) in dcList" :key="index">
					<view class="" :data-dcid="dc.id" :data-dcindex="index" @click="showdc" @longtap="operator" >
						<uni-list-item :title="`${dc.location}` + `  [${dc.meter_id}]`"								
								show-extra-icon="true" 
								:extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}">
						</uni-list-item>
					</view>
				</view>
			    
			</uni-list>
		</view>
		
		<!-- 编辑弹出窗 start -->
		<uni-popup ref="popupEdit" type="center">
		    <view class="add-edit">		
				<view class="add-edit-row">
					<view class="row-title-left">
						<text class="row-title-text">水表ID:</text>
					</view>
					<view class="row-title-right">
						<!-- <text class="row-title-input" v-model="editId"/> -->
						<text class="row-title-input">{{editId}}</text>
					</view>
				</view>	
				
				<view class="add-edit-row">
					<view class="row-title-left">
						<text class="row-title-text">位置:</text>
					</view>
					<view class="row-title-right">
						<input class="row-title-input" v-model="editLocation"/>
					</view>
				</view>		    	
		    </view>
			
			<view class="button-block">
				<button class="popup-button-add" type="warn" plain="true" :data-dcid="selectid" @click="confirmEdit">确定</button>
				<button class="popup-button-add" type="primary" plain="true" @click="cancelEdit">取消</button>		
			</view>
		</uni-popup>
		<!-- 编辑弹出窗 end -->
		
		<!-- 删除弹出窗 start -->
		<uni-popup ref="popupDelete" type="center">
		    确定要删除吗
			<view class="button-block">
				<button class="popup-button" type="warn" plain="true" :data-dcid="selectid" @click="confirmDelete">确定</button>
				<button class="popup-button" type="primary" plain="true" @click="cancelDelete">取消</button>		
			</view>

		</uni-popup>
		<!-- 删除弹出窗 end -->
		
		
		<!-- 增加弹出窗 start -->
		<uni-popup ref="popupAdd" type="center">
			
		    <view class="add-edit">		
				<view class="add-edit-row">
					<view class="row-title-left">
						<text class="row-title-text">水表ID:</text>
					</view>
					<view class="row-title-right">
						<input class="row-title-input" v-model="addId"/>
					</view>
				</view>	
				
				<view class="add-edit-row">
					<view class="row-title-left">
						<text class="row-title-text">位置:</text>
					</view>
					<view class="row-title-right">
						<input class="row-title-input" v-model="addLocation"/>
					</view>
				</view>		    	
		    </view>
			
			<view class="button-block">
				<button class="popup-button-add" type="warn" plain="true" :data-dcid="selectid" @click="confirmAdd">确定</button>
				<button class="popup-button-add" type="primary" plain="true" @click="cancelAdd">取消</button>		
			</view>
		
		</uni-popup>
		<!-- 增加弹出窗 end -->
		
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
				dcList: [],
				keywords: "",			// 搜索的关键字
				page: 1,				// 当前第几页
				limit: 15,				// 每页条数
				totalPages: 1,			// 总页数
				selectid: 0,			// 长按时选择数据表ID
				dcIndex: 0,				// 页面显示水表序号，用于编辑或删除页面节点
				addId: "",				// 增加水表弹出框的meterID
				addLocation: "",		// 增加水表弹出框的位置
				editId: "",				// 编辑水表弹出框的meterID
				editLocation: ""		// 编辑水表弹出框的位置
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
				url: serverUrl + '/dcs/tableData?keywords=&page=1&limit=' + limit,
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
						var dcList = res.data.data.data;
						// debugger;
						me.dcList = dcList;
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
			
			me.pageddcList(keywords, page, 15);
			
		},
		
		methods: {
			add() {
				this.$refs.popupAdd.open()
			},
			
			confirmAdd () {
				var me = this;
				var userInfo = me.getGlobalUser("userInfo");
				var meter_id = me.addId;						//数据绑定的input meter_id值
				var location = me.addLocation;					//数据绑定的input location值
				
				uni.showLoading({
					mask: true,
					title: "请稍后..."
				});
				uni.showNavigationBarLoading();
				
				var serverUrl = me.serverUrl;
				// 查询数据列表
				uni.request({
					url: serverUrl + '/dcs/add?meter_id=' + meter_id + '&location=' + location,
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
							me.dcList.unshift({
								"meter_id": meter_id,
								"location": location
							});
							me.addId = "";
							me.addLocation = "";
						} 
					},
					complete: () => {
						uni.hideNavigationBarLoading();
						uni.hideLoading();
					}
				});				
				this.$refs.popupAdd.close()
			},
			
			cancelAdd () {
				this.$refs.popupAdd.close()
			},			
			
			confirmEdit() {		
				var me = this;
				var userInfo = me.getGlobalUser("userInfo");
				var meter_id = me.editId;						//数据绑定的input meter_id值
				var location = me.editLocation;					//数据绑定的input meter_id值
				var dcIndex = me.dcIndex;
				var id = me.selectid;
								
				uni.showLoading({
					mask: true,
					title: "请稍后..."
				});
				uni.showNavigationBarLoading();
				
				var serverUrl = me.serverUrl;
				// 查询数据列表
				uni.request({
					url: serverUrl + '/dcs/edit?id=' + id +'&meter_id=' + meter_id + '&location=' + location,
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
							me.dcList[dcIndex].meter_id = meter_id;
							me.dcList[dcIndex].location = location;
							me.editId = "";
							me.editLocation = "";
						} 
					},
					complete: () => {
						uni.hideNavigationBarLoading();
						uni.hideLoading();
					}
				});					
				this.$refs.popupEdit.close()
			},
			
			cancelEdit() {
				this.$refs.popupEdit.close()
			},
			
			confirmDelete(e) {
				var me = this;
				var userInfo = me.getGlobalUser("userInfo");
				var dcId = e.currentTarget.dataset.dcid;
				
				uni.showLoading({
					mask: true,
					title: "请稍后..."
				});
				uni.showNavigationBarLoading();
				
				var serverUrl = me.serverUrl;
				// 查询数据列表
				// debugger;
				uni.request({
					url: serverUrl + '/dcs/delete?id=' + dcId,
					header:{
						'content-type': 'application/x-www-form-urlencoded',
						'id':userInfo.user_id,
						'token': userInfo.token
					},
					method: "POST",
					success: (res) => {
						// 获取真实数据之前，务必判断状态是否为0	
						if (0 == res.data.code) {
							me.dcList.splice(me.dcIndex, 1);
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
			
			
			showdc(e) {

				var dcId = e.currentTarget.dataset.dcid;
				// 页面跳转接口api
				// debugger;
				uni.navigateTo({
					url: "../dcSingle/dcSingle?dcId=" + dcId
				})
			},
			
			pageddcList(keywords, page, pageSize) {
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
					url: serverUrl + '/dcs/tableData?keywords='+ keywords +'&page=' + page + '&limit=' + pageSize,
					header:{
						'content-type': 'application/x-www-form-urlencoded',
						'id':userInfo.user_id,
						'token': userInfo.token
					},
					method: "POST",
					success: (res) => {
						// 获取真实数据之前，务必判断状态是否为0

						if (0 == res.data.code) {
							var dcList = res.data.data.data;
							me.dcList = me.dcList.concat(dcList);
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
				me.dcList = [];
				
				me.pageddcList(value, 1, 15);
			},
			
			operator(e) {
				var me = this;
				var globalUser = me.getGlobalUser("globalUser");
				var dcId = e.currentTarget.dataset.dcid;
				var dcIndex = e.currentTarget.dataset.dcindex;
				me.selectid = dcId;
				me.dcIndex = dcIndex;
				
				uni.showActionSheet({
					itemList: ["编辑", "删除"],
					success(res) {
						var index = res.tapIndex;
						if (index == 0) {
							me.editId = me.dcList[dcIndex].meter_id;
							me.editLocation = me.dcList[dcIndex].location;
							
							me.$refs.popupEdit.open();
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
	@import url("dc.css"); 
</style>
