import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../view/HomePage.vue'
import BooksItem from '../view/Booksitem/BooksItem.vue'
import BookList from '../view/Booksitem/BookList.vue'
import BookContent from '../view/Booksitem/BookContent.vue'
import SearchBook from '../view/Search/SearchBook.vue'
import Callsification from '../view/Callssify/Callsification.vue'
import CallsifyListBook from '../view/Callssify/CallsifyListBook.vue'
import RankingBooks from '../view/Ranking/RankingBooks.vue'
import FemaleRanking from '../view/Ranking/FemaleRanking.vue'
import Mycollections from '../view/MyCollection/Mycollections.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    },
	{
		path:'/books',
		name:'BooksItem',
		component:BooksItem
	},
	{
		path:'/booklist',
		name:'BookList',
		component:BookList
	},
	{
		path:'/bookcontent',
		name:'BookContent',
		component:BookContent
	},
	{
		path:'/search',
		name:'SearchBook',
		component:SearchBook
	},
	{
		path:'/callsify',
		name:'Callsification',
		component:Callsification
	},
	{
		path:'/category',
		name:'CallsifyListBook',
		component:CallsifyListBook
	},
	{
		path:'/ranking',
		name:'RankingBooks',
		component:RankingBooks
	},
	{
		path:'/rankingitem',
		name:'FemaleRanking',
		component:FemaleRanking
	},
	{
		path:'/collection',
		name:'Mycollections',
		component:Mycollections
		
	}
  ]
})
