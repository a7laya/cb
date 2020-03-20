// 
export default {
	state: {
		// popup索引,-1表示未选中
		popupIndex:-1,
		// popup显示
		popupShow:"none",
		list: [
			{
				checked: false,
				id: "11",
				title: '商品标题module111',
				cover: '/static/images/demo/list/1.jpg',
				// 选中商品的属性
				attrs:[
					{
						title: "颜色",
						selected: 0,
						list: [
							{ name: '黄色' },
							{ name: '黑色' },
							{ name: '红色' }
						]
					},
					{
						title: "容量",
						selected: 0,
						list: [
							{ name: '64GB' },
							{ name: '128GB' }
						]
					},
					{
						title: "套餐",
						selected: 0,
						list: [
							{ name: '标配' },
							{ name: '套餐一' },
							{ name: '套餐二' }
						]
					}
				],
				pprice: 336,
				num: 2,
				minnum: 1,
				maxnum: 10,  // 跟库存有关
			},{
				checked: false,
				id: "12",
				title: '商品标题222',
				cover: '/static/images/demo/list/2.jpg',
				// 选中商品的属性
				attrs:[
					{
						title: "颜色",
						selected: 1,
						list: [
							{ name: '黄色' },
							{ name: '黑色' },
							{ name: '红色' }
						]
					},
					{
						title: "容量",
						selected: 1,
						list: [
							{ name: '64GB' },
							{ name: '128GB' }
						]
					},
					{
						title: "套餐",
						selected: 1,
						list: [
							{ name: '标配' },
							{ name: '套餐一' },
							{ name: '套餐二' }
						]
					}
				],
				pprice: 999,
				num: 1,
				minnum: 1,
				maxnum: 10,  // 跟库存有关
			},{
				checked: false,
				id: "13",
				title: '商品标题333',
				cover: '/static/images/demo/list/3.jpg',
				// 选中商品的属性
				attrs:[
					{
						title: "颜色",
						selected: 1,
						list: [
							{ name: '黄色' },
							{ name: '黑色' },
							{ name: '红色' }
						]
					},
					{
						title: "容量",
						selected: 1,
						list: [
							{ name: '64GB' },
							{ name: '128GB' }
						]
					},
					{
						title: "套餐",
						selected: 0,
						list: [
							{ name: '标配' },
							{ name: '套餐一' },
							{ name: '套餐二' }
						]
					}
				],
				pprice: 10,
				num: 4,
				minnum: 1,
				maxnum: 10,  // 跟库存有关
			}
		],
		// 选中列表,存放选中的id
		selectedList: []
	},
	// 相当于计算属性computed
	getters: {
		// 判断是否全选
		checkedAll: (state) => state.selectedList.length === state.list.length,
		// 合计
		totalPrice: (state) => {
			var total = 0
			state.list.forEach(v=>{
				if(state.selectedList.indexOf(v.id) > -1){
					total += +v.pprice * +v.num
				}
			})
			return total
		},
		// 禁用全选
		disableSelectAll:(state) => {
			return state.list.length === 0
		},
		// 拿到当前需要修改属性的商品
		popupData(state){
			return state.popupIndex > -1 ? state.list[state.popupIndex] : {}
		}
		
	},
	// 同步方法 和methods差不多
	mutations: {
		// 选中/取消单个商品
		selectItem(state,index){
			let id = state.list[index].id
			let i  = state.selectedList.indexOf(id)
			// 之前处于'选中'状态, 取消选中
			if (i > -1) {
				state.list[index].checked = false
				state.selectedList.splice(i,1)
				return
			}
			// 选中
			state.list[index].checked = true
			state.selectedList.push(id)
		},
		
		// 全选
		selectAll(state){
			state.selectedList = state.list.map(v => {
				// 设置选中状态
				v.checked = true
				return v.id
			})
		},
		// 取消全选
		unselectAll(state){
			state.list.forEach(v => v.checked = false)
			state.selectedList = []
		},
		
		// 删除选中
		delGoods(state){
			state.list = state.list.filter(v => {
				return state.selectedList.indexOf(v.id) === -1
			})
			state.selectedList = []
		},
		// popupIndex初始化
		initPopupIndex(state, index){
			state.popupIndex = index
		},
		// 加入购物车
		addGoodsToCart(state, goods){
			state.list.unshift(goods)
		}
		
	},
	// 异步方法
	actions: {
		// 显示popup
		doShowPopup({ state, commit }, index){
			// 初始化
			commit('initPopupIndex',index)
			state.popupShow = "show" 
		},
		// 隐藏popup
		doHidePopup({ state }){
			state.popupShow = "hide" 
			setTimeout(()=>{
				state.popupShow = "none" 
			}, 200);
		},
		
		// 全选
		doSelectAll({ commit,getters }){
			getters.checkedAll ? commit('unselectAll') : commit('selectAll')
		},
		
		// 删除购物车里商品
		doDelGoods({ commit,state }){
			if(state.selectedList.length == 0) {
				return uni.showToast({
					title: '请先选中商品',
					icon: 1
				});
			}
			uni.showModal({
				content: '是否删除选中',
				success: function (res) {
					if (res.confirm) {
						commit('delGoods');
						uni.showToast({
							title: '删除成功'
						});
					} else if (res.cancel) {
						
					}
				}
			});
		}
	}
}