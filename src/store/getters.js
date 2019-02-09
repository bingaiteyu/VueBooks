export default{
	sixrecommend(state){
		let com =[]
		for(let i=0;i<6;i++){
			com[i] = state.recommentbooks[i]
		}
		return com
	},
	sixfreebooks(state){
		let com = []
		for(let i=0;i<6;i++){
			com[i] = state.hotbooks[i]
		}
		return com
	},
	sixbookrecoment(state){
		let com=[]
		for(let i=0;i<6;i++){
			com[i] = state.bookrecoment[i]
		}
		return com
	},
	commentall(state){
		let com = []
		console.log(state.commentdata.length-1)
		for(let i=1;i<state.commentdata.length;i++){
			com[i-1] = state.commentdata[i]
		}
		console.log(com)
		return com
	}
}