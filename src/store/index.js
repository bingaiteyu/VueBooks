import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'

Vue.use(Vuex)



export default new Vuex.Store({
	state:{
		remuse:null,
		isloading:false,
		recommentbooks:{},//书籍推荐
		hotbooks:{},//热门书籍
		bookinformation:{},//书籍信息
		bookrecoment:{},//获取书籍的相关推荐
		commentdata:{},//书籍评论信息
		bookviewId:'',//书籍源ID
		listbook:{},//章节列表
		Contents:'',//书籍内容
		searchdata:{},//搜索的书籍
		issearchdata:false,
		showsearch:false,
		iscalssify:false,//分类显示
		texttitle:'',//书籍标题
		callssification:{},//父分类数据
		callssifications:{},//子分类数据
		callssifytitle:'',//分类标题
		callsifyitems:{},//分类详细数据
		rankingdate:{},//排行榜数据
		rankings:[],//排行榜#id
		rankingitemdata:{},//排行榜详细数据
		rankingsbooks:{},//
		bookbackground:{
			color:'#8d8d8d',
			backgrounds:'#c4b395',
			constrast:'#1a1a1a'
		},//背景颜色
		index:null,//下一章上一章的下标
		collection:[]//收藏数据
	},
	actions,
	getters,
	mutations
})