<template>
	<view @click="showOperator = false">
		<!-- 搜索栏 -->
		<search-bar :showLeftIcon='false' :title="language['1_4'][type]" @add="add" @search="searchMe" :language="language" :languageType="type"></search-bar>
		
		
		<view class="dc-name">
			<!-- 搜索组件带title是180rpx的高度 不带是100rpx的高度 -->
			<view class="w-100" style="height: 180rpx; background-color: #00c6dc;"></view>
			<uni-list>
				<view class="" v-for="(trash,index) in trashList" :key="index">
					<view class="" :data-trashid="trash.id" :data-trashindex="index"  @longtap="operator($event,trash,index)">
						<uni-list-item>
						<view class="d-flex a-center">
							<text class="test mr-2 text-muted" style="font-size: 50upx;">&#xe7e9;</text>
							{{trash.location}} [{{trash.meter_id}}]
						</view>
						</uni-list-item>
					</view>
				</view>
			    
			</uni-list>
		</view>
		
		<!-- 还原弹出窗 start -->
		<uni-popup ref="popuprestore" type="center">
			<view class="w-100 text-danger font-md text-center">"{{language['meter'][type]}} : {{trashId}}"</view>
		    {{{cn:'确定还原所选项目吗?',en:'Are you sure you want to restore the selected items?',other:'選択したアイテムを復元しますか？'}[type]}}
			<view class="button-block">
				<button class="popup-button" type="warn" plain="true" @click="confirmRestore">{{language['confirm'][type]}}</button>
				<button class="popup-button" type="primary" plain="true" @click="cancelRestore">{{language['cancel'][type]}}</button>		
			</view>
		
		</uni-popup>
		<!-- 还原弹出窗 end -->
		<!-- 删除弹出窗 start -->
		<uni-popup ref="popupDelete" type="center">
			<view class="w-100 text-danger font-md text-center">"{{language['meter'][type]}} : {{trashId}}"</view>
		    {{language['delete_confirm'][type]}}
			<view class="button-block">
				<button class="popup-button" type="warn" plain="true" @click="confirmDelete">{{language['confirm'][type]}}</button>
				<button class="popup-button" type="primary" plain="true" @click="cancelDelete">{{language['cancel'][type]}}</button>		
			</view>
		
		</uni-popup>
		<!-- 删除弹出窗 end -->
		
		
		<!-- 操作弹窗 -->
		<view class="main-bg-color position-absolute animated pulse faster" 
		style="z-index: 20202020;"
		:style="'width: 120rpx;left:' + operatorX + 'px;top:' + operatorY + 'px;'"
		v-if="showOperator">
			<view class="w-100 text-white bg-primary font-sm text-center py-1 border-bottom" @click="$refs.popuprestore.open()">{{language['restore'][type]}}</view>
			<view class="w-100 text-white bg-danger font-sm text-center py-1 border-bottom" @click="$refs.popupDelete.open()">{{language['delete'][type]}}</view>
			<view class="w-100 text-white bg-secondary font-sm text-center py-1 border-bottom">{{language['cancel'][type]}}</view>
		</view>
		<loading-plus v-if="!dataReady"></loading-plus>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import uniIcon from "@/components/uni-icon/uni-icon.vue";
	import searchBar from "@/components/a7laya/search-bar.vue"
	import loadingPlus from '@/components/a7laya/mixins/loading-plus.vue';
	// 这个common.js是加载用户登录验证及语言包的mixin混入
	import common from "@/components/a7laya/mixins/common.js";
	export default {
		mixins:[common],
		components: {searchBar, loadingPlus, uniList, uniListItem, uniPopup, uniIcon},
		data() {
			return {
				language: false,		// 
				trashList: [],
				keywords: "",			// 搜索的关键字
				page: 1,				// 当前第几页
				limit: 15,				// 每页条数
				totalPages: 1,			// 总页数
				selectid: 0,			// 长按时选择数据表ID
				trashId: "", // 选中的merter_id
				trashLocation: "", // 选中的水表地址
				trashIndex: 0,			// 页面显示水表序号，用于编辑或删除页面节点
				trashTableName: "",		// 
				addId: "",				// 增加水表弹出框的meterID
				addLocation: "",		// 增加水表弹出框的位置
				restoreId: "",			// 还原删除水表弹出框的meterID
				restoreTableName: "",	// 还原删除水表弹出框的数据表名称
				restoreLocation: "",
				x: 0,					// 长按的x
				y: 0,					// 长按的y
				scrollTop: 0,			// 页面滚动的距离
				showOperator: false,	// 是否显示操作弹窗
				dataReady: false,
			};
		},
		computed:{
			operatorX(){
				return this.x > 260 ? this.x - 50 : this.x + 10
			},
			operatorY(){
				return this.y + this.scrollTop - 10
			},
		},
		onShow() {
			console.log('进入回收站')
			this.showOperator = false
		},
		onPageScroll(e) {
			// 监听页面滚动
			this.scrollTop = e.scrollTop
			this.showOperator = false
		},
		onLoad() {
			var me = this;
			var userInfo = me.getGlobalUser("userInfo");
			
			
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
					this.dataReady = true
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
				uni.showLoading({
					mask: true,
					title: "请稍后..."
				});
				this.$H.post('/trashs/restore?id=' + me.selectid + '&table_name=' + me.trashTableName)
					.then(res=>{
						if(0===res.code){
							// 添加节点至首部
							// debugger;
							me.trashList.splice(me.trashIndex, 1);
							me.trashId = "";
							me.trashTableName = ""
						}
						me.$refs.popuprestore.close()
						uni.hideLoading();
					})
			},
			
			cancelRestore() {
				this.$refs.popuprestore.close()
			},
			
			confirmDelete(e) {		
				var me = this;
				uni.showLoading({
					mask: true,
					title: "请稍后..."
				});
				this.$H.post('/trashs/delete?id=' + me.selectid + '&table_name=' + me.trashTableName)
					.then(res=>{
						if(0===res.code){
							// 添加节点至首部
							// debugger;
							me.trashList.splice(me.trashIndex, 1);
							me.selectid = "";
							me.trashTableName = ""
						}
						me.$refs.popupDelete.close()
						uni.hideLoading();
					})
				
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
			
			searchMe(keywords) {
				this.trashList = [];
				this.pagedtrashList(keywords, 1, this.limit);
			},
			
			operator($event,trash,index) {
				console.log('trash:',trash)
				this.showOperator = false
				// 获取点击的坐标
				let position = $event.touches[0] 
				this.x = position.clientX
				this.y = position.clientY
				this.selectid = trash.id;
				this.trashId = trash.meter_id;
				this.trashLocation = trash.location;
				this.trashIndex = index
				this.trashTableName = this.trashList[index].table_name;
				setTimeout(()=>{this.showOperator = true},100)
			}
			

		}
	}
</script>

<style>
	@import url("trash.css");  
	button {
		height: 60rpx;
		min-width: 150rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
	}
</style>
