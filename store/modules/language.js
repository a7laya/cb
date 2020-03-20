export default {
	state: {
		// type类型
		type: 'cn', // 默认 cn 中文   en 英文   other 其他
		language: {}
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
		setLanguage(state, data){
			state.language = data
		},
		setLanguageType(state, type){
			state.type = type
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