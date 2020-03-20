import Vue  from "vue"
import Vuex from "vuex"
import language from "@/store/modules/language.js"
import user from "@/store/modules/user.js"

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		language,
		user
	}
})

// 页面中的引用
// import { mapState } from "vuex"
// computed:{
// 	...mapState({
// 		list: state=>state.cart.list
// 	})
// }