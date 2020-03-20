// 作为参考的 在这项目里面没用
export default {
	state: {
		list: [
			{
				name: "laya",
				phone: "135****5678",
				path: "广州市 广州市 白云区",
				detailPath: "XXXX街道",
				isDefault: true
			},
			{
				name: "laya2",
				phone: "135****5678",
				path: "广州市 广州市 白云区",
				detailPath: "XXXX街道",
				isDefault: false
			},
			{
				name: "laya3",
				phone: "135****5678",
				path: "广州市 广州市 白云区",
				detailPath: "XXXX街道",
				isDefault: false
			}
		]
	},
	// 相当于计算属性computed
	getters: {
		// 获取默认地址
		defaultPath: (state) => state.list.filter(v=>v.isDefault),
	},
	// 同步方法 和methods差不多
	mutations: {
		// 创建地址
		createPath(state, item) {
			state.list.unshift(item)
		},
		// 删除地址
		delPath(state, index) {
			state.list.splice(index,1)
		},
		// 修改地址
		updatePath(state, {index, item}) {
			for (let key in item) {
				state.list[index][key] = item[key]
			}
			// 直接用state.list[index] = item 返回列表时会发现列表没有改动
		},
		removeDefault(state){
			state.list.forEach((v)=>{
				if(v.isDefault) {
					v.isDefault = false
				}
			})
		}
		
	},
	// 异步方法
	actions: {
		// 修改地址
		updatePathAction({commit}, {index, item}){
			if(item.isDefault){
				commit('removeDefault')
			}
			commit('updatePath', {index, item})
		},
		// 增加地址
		createPathAction({commit}, item){
			if(item.isDefault){
				commit('removeDefault')
			}
			commit('createPath', item)
		}
	}
}