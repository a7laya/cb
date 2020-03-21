<template>
	<view @click="showOperator = false">
		<!-- 搜索栏 -->
		<search-bar :title="title" @add="add" @search="searchMeter" :language="language" :languageType="type"></search-bar>
		
		<view>
			<!-- 搜索组件带title是180rpx的高度 不带是100rpx的高度 -->
			<view class="w-100 main-bg-color" style="height: 180rpx;"></view>
			<uni-list>
				<view v-for="(meter,index) in meterList" :key="index" 
				@click="showMeter" @longtap="operator($event,meter,index)">
					<uni-list-item>
						<view class="d-flex a-center">
							<text class="test mr-1" style="font-size: 50upx;" @click="openMeterList('dc')">&#xe611;</text>
							{{meter.location}} [{{meter.meter_id}}]
						</view>
					</uni-list-item>
				</view>
			</uni-list>
		</view>
		
		
		
		<!-- 删除弹出窗 start -->
		<uni-popup ref="popupDelete" type="center">
			<view class="w-100 text-danger font-md text-center">"{{language['meter'][type]}} : {{editId}}"</view>
		    {{language['delete_confirm'][type]}}
			<view class="button-block">
				<button class="popup-button" type="warn" plain="true" :data-meterid="selectid" @click="confirmDelete">{{language['confirm'][type]}}</button>
				<button class="popup-button" type="primary" plain="true" @click="cancelDelete">{{language['cancel'][type]}}</button>		
			</view>

		</uni-popup>
		<!-- 删除弹出窗 end -->
		
		
		<!-- 增加弹出窗 start -->
		<uni-popup ref="popupAdd" type="center">
			<view class="w-100 main-bg-hover-color position-absolute left-0 top-0 d-flex a-center text-white pl-2 font" 
			style="height: 80rpx;">
				{{language['add'][type]}}-{{language['meter'][type]}}
			</view>
		    <view class="d-flex flex-column a-end pt-5 mt-3 pr-2" style="height: 200rpx;">		
				<view class="d-flex a-center mb-3">
					<text class="font mr-2 text-muted">{{language['meter'][type]}}ID:</text>
					<input class="border rounded px-2 py-1 font text-left" v-model="addId"/>
				</view>	
				<view class="d-flex a-center">
					<text class="font mr-2 text-muted">{{language['location'][type]}}:</text>
					<input class="border rounded px-2 py-1 font text-left" v-model="addLocation"/>
				</view>		    	
		    </view>
			
			<view class="button-block">
				<button class="ml-5" type="primary" plain @click="confirmAdd">{{language['confirm'][type]}}</button>
				<button class="ml-5" type="warn"    plain @click="cancelAdd">{{language['cancel'][type]}}</button>		
			</view>
		
		</uni-popup>
		<!-- 增加弹出窗 end -->
		
		<!-- 编辑弹出窗 start -->
		<uni-popup ref="popupEdit" type="center">
			<view class="w-100 main-bg-hover-color position-absolute left-0 top-0 d-flex a-center text-white pl-2 font"
			style="height: 80rpx;">
				{{language['add'][type]}}-{{language['meter'][type]}}
			</view>
			<view class="d-flex flex-column a-end pt-5 mt-3 pr-2" style="height: 200rpx;">		
				<view class="d-flex a-center mb-3">
					<text class="font mr-2 text-muted">{{language['meter'][type]}}ID:</text>
					<input class="border rounded px-2 py-1 font text-left" v-model="editId"/>
				</view>	
				<view class="d-flex a-center">
					<text class="font mr-2 text-muted">{{language['location'][type]}}:</text>
					<input class="border rounded px-2 py-1 font text-left" v-model="editLocation"/>
				</view>		    	
			</view>
			
			<view class="button-block">
				<button class="ml-5" type="primary" plain @click="confirmEdit">{{language['confirm'][type]}}</button>
				<button class="ml-5" type="warn"    plain @click="cancelEdit">{{language['cancel'][type]}}</button>		
			</view>
		</uni-popup>
		<!-- 编辑弹出窗 end -->
		
		<!-- 操作弹窗 -->
		<view class="main-bg-color position-absolute animated pulse faster" 
		style="z-index: 2020;"
		:style="'width: 120rpx;left:' + operatorX + 'px;top:' + operatorY + 'px;'"
		v-if="showOperator">
			<view class="w-100 text-white bg-primary font-sm text-center py-1 border-bottom" @click="$refs.popupEdit.open()">{{language['edit'][type]}}</view>
			<view class="w-100 text-white bg-danger font-sm text-center py-1 border-bottom" @click="$refs.popupDelete.open()">{{language['delete'][type]}}</view>
			<view class="w-100 text-white bg-secondary font-sm text-center py-1 border-bottom">{{language['cancel'][type]}}</view>
		</view>
		
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import searchBar from "@/components/a7laya/search-bar.vue"
	export default {
		components: {searchBar, uniList, uniListItem, uniPopup},
		data() {
			return {
				title: '',              // 页面标题
				language: false,			// 
				meterType: 'dc',        // 要显示的水表类型 meter 电池型， dtu 电磁型， cs 超声波
				meterList: [],
				keywords: "",			// 搜索的关键字
				page: 1,				// 当前第几页
				limit: 15,				// 每页条数
				totalPages: 1,			// 总页数
				selectid: 0,			// 长按时选择数据表ID
				meterIndex: 0,			// 页面显示水表序号，用于编辑或删除页面节点
				selectedId: false,      // 选中的水表id           
				addId: "",				// 增加水表弹出框的meterID
				addLocation: "",		// 增加水表弹出框的位置
				editId: "",				// 编辑水表弹出框的meterID
				editLocation: "",		// 编辑水表弹出框的位置
				x: 0,
				y: 0,
				scrollTop: 0,
				showOperator: false,
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
			console.log('123');
			this.language = uni.getStorageSync('language')
			this.type = uni.getStorageSync('type')
			let title = {dc: '1_1', dtu: '1_2', cs: '1_3'}[this.meterType]
			this.title = this.language[title][this.type]
			this.showOperator = false
		},
		onPageScroll(e) {
			// 监听页面滚动
			this.scrollTop = e.scrollTop
			this.showOperator = false
		},
		onLoad(e) {
			this.meterType = e.meterType
			var me = this
			uni.showLoading({title: "请稍后..."})
			this.$H.post(`${me.meterType}s/tableData?keywords=&page=1&limit=${me.limit}`)
				.then(res => {
					if (res.code === 1) return uni.navigateTo({url: '/pages/login/login'})
					me.meterList = res.data
					me.totalPages = parseInt(res.count/me.limit) + 1
					uni.hideLoading();
				})
		},
		
		// 下拉加载
		onReachBottom() {
			var me = this;
			var page = me.page + 1;			// 查询下一页面，当前页数累加1
			var totalPages = me.totalPages;	// 获取总页数
			var keywords = "";
			var limit = me.limit;
			// 如果当前需要分页的分页数和总页数相等，就不分页
			if (page > totalPages) return
			me.pagedmeterList(keywords, page, me.limit);
		},
		
		methods: {
			add() {
				this.$refs.popupAdd.open()
			},
			
			confirmAdd () {
				var me = this;
				var meter_id = me.addId;						//数据绑定的input meter_id值
				var location = me.addLocation;					//数据绑定的input location值
				
				uni.showLoading({title: "请稍后..."})
				this.$H.post('/'+ this.meterType +'s/add?meter_id=' + meter_id + '&location=' + location)
					.then(res => {
						if (res.code === 1) return uni.navigateTo({url: '/pages/login/login'})
						// 添加节点至首部
						me.meterList.unshift({
							"meter_id": meter_id,
							"location": location
						});
						me.addId = "";
						me.addLocation = "";
						uni.hideLoading()
						this.$refs.popupAdd.close()
					})
				
			},
			
			cancelAdd () {
				this.$refs.popupAdd.close()
			},			
			
			confirmEdit() {		
				if(!this.selectedId) return
				var me = this;
				this.$H.post('/'+ me.meterType +'s/edit?id=' + me.selectedId +'&meter_id=' + me.editId + '&location=' + me.editLocation)
					.then(res => {
						if (res.code === 1) return uni.navigateTo({url: '/pages/login/login'})
						me.meterList[me.meterIndex].meter_id = me.editId;
						me.meterList[me.meterIndex].location = me.editLocation;
						me.selectedId = false;
						me.editId = "";
						me.editLocation = "";
						uni.hideLoading()
						this.$refs.popupEdit.close()
					})
				
			},
			
			cancelEdit() {
				this.$refs.popupEdit.close()
			},
			
			confirmDelete(e) {
				var me = this
				var meterId = e.currentTarget.dataset.meterid
				this.$H.post('/'+ this.meterType +'s/delete?id=' + meterId)
					.then(res => {
						if (res.code === 1) return uni.navigateTo({url: '/pages/login/login'})
						me.meterList.splice(me.meterIndex, 1)
						uni.hideLoading()
						this.$refs.popupDelete.close()
					})
			},
			
			cancelDelete() {
				this.$refs.popupDelete.close()
			},
			
			
			showMeter(e) {
				var meterId = e.currentTarget.dataset.meterid;
				// 页面跳转接口api
				// debugger;
				uni.navigateTo({
					url: "../"+this.meterType+"Single/"+this.meterType+"Single?meterId=" + meterId
				})
			},
			
			pagedmeterList(keywords, page, pageSize) {
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
					url: serverUrl + '/' + me.meterType + 's/tableData?keywords='+ keywords +'&page=' + page + '&limit=' + pageSize,
					header:{
						'content-type': 'application/x-www-form-urlencoded',
						'id':userInfo.user_id,
						'token': userInfo.token
					},
					method: "POST",
					success: (res) => {
						// 获取真实数据之前，务必判断状态是否为0

						if (0 == res.data.code) {
							var meterList = res.data.data.data;
							me.meterList = me.meterList.concat(meterList);
							me.page = page;
						} 
					},
					complete: () => {
						uni.hideNavigationBarLoading();
						uni.hideLoading();
					}
				});
			},
			
			searchMeter(keywords) {
				this.keywords =keywords
				this.meterList = []
				this.pagedmeterList(keywords, 1, this.limit)
			},
			
			operator($event,meter,index) {
				this.showOperator = false
				// 获取点击的坐标
				let position = $event.touches[0] 
				this.x = position.clientX
				this.y = position.clientY
				this.selectedId = meter.id;
				this.editId = meter.meter_id;
				this.editLocation = meter.location;
				this.meterIndex = index
				setTimeout(()=>{this.showOperator = true},100)
			},
			
		}
	}
</script>

<style>
	@import url("meter.css"); 
	button {
		height: 60rpx;
		min-width: 150rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
	}
</style>
