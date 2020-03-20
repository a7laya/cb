export default {
	data(){
		return{
			ifUnReady: true
		}
	},
	onReady(){
		this.$nextTick(()=>{
			setTimeout(()=>{
				this.ifUnReady = false
			},500)
		})
	}
}