export default{
	async homeajax({commit},axios){
		commit('isloadings',false)
		let recomme = await axios.get('/api/bookrecom')
		let freebooks = await axios.get('/api/free')
		recomme = JSON.parse(recomme.data.text)
		freebooks = JSON.parse(freebooks.data.text).ranking
		commit('recommentbook',{recom:recomme.books,freebooks})
		commit('isloadings',true)
	},
	bookitemdata({commit},{id,axios}){
		commit('isloadings',false)
		axios.all([
			axios.get('/api/books',{
				params:{
					id
				}
			}),
			axios.get('/api/recommend',{
				params:{
					id
				}
			}),
			axios.get('/api/comment',{
				params:{
					book:id
				}
			}),
			axios.get('/api/bookview',{
				params:{
					id
				}
			})
		])
		.then(axios.spread(function(books,recoment,comments,bookviews){
			let booksitem = JSON.parse(books.data.text)
			let bookrecoment = JSON.parse(recoment.data.text).books
			let bookcomment = JSON.parse(comments.data.text).posts
			let bookviewdata = JSON.parse(bookviews.data.text)[0]._id
			// console.log(bookviews.data.text,bookviewdata)
			// console.log(booksitem)
			// console.log(bookrecoment)
			// console.log(bookcomment)
			console.log(bookviewdata)
			commit('booksitem',{booksitem,bookrecoment,bookcomment,bookviewdata})
			commit('isloadings',true)
		}))
		
	},
	ajaxbooklist({commit},{id,axios}){
		commit('isloadings',false)
		axios.get('/api/chapter',{
			params:{
				bookid:id
			}
		})
		.then((res)=>{
			console.log(JSON.parse(res.data.text))
			let listdata = JSON.parse(res.data.text)
			commit('listbooks',listdata.chapters)
			commit('isloadings',true)
		})
	},
	ajaxchapter({commit},{url,axios}){
		commit('isloadings',false)
		axios.get('/api/chapcomment',{
			params:{
				url
			}
		})
		.then((res)=>{
			console.log(JSON.parse(res.data.text))
			let contbook = JSON.parse(res.data.text).chapter.cpContent
			commit('booktentsdata',contbook)
			commit('isloadings',true)
		})
	},
	//搜索请求
	ajaxserach({commit},{src,axios}){
		commit('issearch',false)
		console.log(src)
		axios.get('/api/search',{
			params:{
				keyword:src
			}
		})
		.then((res)=>{
			console.log(JSON.parse(res.data.text))
			let books = JSON.parse(res.data.text).books
			commit('searchbooks',books)
			commit('issearch',true)
		})
	},
	//获取父、子分类
	ajaxcallssify({commit},{axios}){
		commit('iscalssifydata',false)
		axios.all([
			axios.get('/api/classify'),
			axios.get('/api/classifys')
		])
		.then(axios.spread(function(classify,classifys){
			let classifydata = JSON.parse(classify.data.text)
			let classifysdata = JSON.parse(classifys.data.text)
			commit('calssifydata',{classifydata,classifysdata})
			commit('iscalssifydata',true)
			console.log(classifydata,classifysdata)
		}))
	},
	//获取分类详情
	ajaxcallssifyitem({commit},{major,minor,axios}){
		commit('isloadings',false)
		axios.get('/api/datail',{
			params:{
				gender:"male",
				type:"hot",
				major,
				minor,
				start:0,
				limit:200
			}
		})
		.then((res)=>{
			let calssi = JSON.parse(res.data.text).books
			console.log(calssi)
			commit('callsifyitemsdata',calssi)			
			commit('isloadings',true)
		})
	},
	//排行榜分类
	ajaxrankinglist({commit},{axios}){
		axios.get('/api/ranking')
		.then((res)=>{
			console.log(JSON.parse(res.data.text))
			let rankingcomment = JSON.parse(res.data.text)
			commit('rankingdates',rankingcomment)
			commit('rankingslist')
		})
	},
	ajaxrankinglists({commit},{id,axios}){
		commit('isloadings',false)
		console.log(id)
		const ids = []
		for(let i=0;i<=id.length-1;i++){
			ids[i] = axios.get('/api/rankingitem',{
				params:{
					id:id[i]
				}
			})
		}
		console.log(ids)
		axios.all(ids)
		.then(axios.spread(function(...datas){
			let datax = [...datas]
			console.log(...datas,datax)
			for(let i=0;i<=datax.length-1;i++){
				datax[i] = JSON.parse(datax[i].data.text).ranking
			}
			commit('rankingitemdatas',datax)
			commit('isloadings',true)
				console.log(datax)
		}))
	}
}