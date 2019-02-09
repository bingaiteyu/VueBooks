export default{
	recommentbook(state,val){
		console.log(val)
		state.recommentbooks = val.recom
		state.hotbooks = val. freebooks.books
	},
	isloadings(state,val){
		state.isloading = val
	},
	isshow(state,val){
		state.remuse = val
	},
	booksitem(state,val){
		state.bookinformation = val.booksitem
		state.bookrecoment = val.bookrecoment
		state.commentdata = val.bookcomment
		state.bookviewId = val.bookviewdata
	},
	listbooks(state,val){
		state.listbook = val
	},
	booktentsdata(state,val){
		state.Contents = val
	},
	searchbooks(state,val){
		state.searchdata = val
	},
	issearch(state,val){
		state.issearchdata = val
	},
	isshowsearch(state,val){
		state.showsearch = val
	},
	emptybookinformation(state,data){
		state.bookinformation.title = data
	},
	texttitledata(state,data){
		state.texttitle = data
	},
	iscalssifydata(state,data){
		state.iscalssify = data
	},
	calssifydata(state,data){
		state.callssification = data.classifydata
		state.callssifications = data.classifysdata
	},
	callssifytitledata(state,data){
		state.callssifytitle = data
	},
	callsifyitemsdata(state,data){
		state.callsifyitems = data
	},
	rankingdates(state,data){
		state.rankingdate = data
	},
	rankingslist(state){
		let num = state.rankingdate.male.length
		for(let i=0;i<=num-1;i++){
			state.rankings[i] = state.rankingdate.male[i]._id
		}
	},
	rankingitemdatas(state,data){
		state.rankingitemdata = data
	},
	rankingsbooksdata(state,data){
		state.isloading = true
		state.rankingsbooks = state.rankingitemdata[data]
	},
	skenpleeters(state,data){
		state.bookbackground.backgrounds = data.backgrounds
	},
	showindexitem(state,data){
		state.index = data
	},
	datacollection(state,data){
		state.collection.push(data)
		console.log(state.collection)
		let res = state.collection
		   let  obj = {};
			res = res.reduce(function(item, next) {
			  obj[next._id] ? '' : obj[next._id] = true && item.push(next);
			   return item;
			}, [])
		   console.log(obj,res)
			state.collection = res
	},
	devclosess(state,data){
		state.collection.splice(data,1)
	}
	
	
}