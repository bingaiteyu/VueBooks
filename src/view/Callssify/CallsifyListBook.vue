<template>
	<div>
		<div class="bookstop">
			<div class="back" @click="back">
				<div class="icon-cheveron-left"></div>
				<div class="title">
					{{callssifytitle}}
				</div>
			</div>
			<div class="searchbook">
				<div class="icon-search booktopsearch" @click="gosearch"></div>
				<div class="icon-menu"></div>
			</div>
		</div>
		<div class="containerbox">
			<div class="textboxs">
				<div class="books-searchbox" v-for="item in callsifyitems" :key="item._id" @click="bookgo({id:item._id,name:item.title})">
					<div class="imgsbook">
						<img :src="item.cover | imgsurl" alt="" width="66px" height="88px">
					</div>
					<div class="informationbox">
						<div class="booktitle">{{item.title}}</div>
						<div class="bookcat">作者: <span>{{item.author}}</span></div>
						<div class="bookauthor">类别: {{item.cat}}</div>
						<p class="present">{{item.shortIntro}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import {imgs} from '../../assets/js/image.js'
	import {mapState} from 'vuex'
	export default {
		name:'CallsifyListBook',
		computed:{
			...mapState(['callssifytitle','callsifyitems'])
		},
		filters:{
			imgsurl(url){
				return imgs(url)
			}
		},
		methods:{
			back(){
				this.$store.commit('isshowsearch',true)
				this.$router.back()
			},
			gosearch(){
				this.$store.commit('isshowsearch',false)
				this.$router.push('/search')
			},
			bookgo({id,name}){
				this.$store.commit('texttitledata',name)
				this.$store.dispatch('bookitemdata',{id,axios:this.axios}),
				this.$router.push('/books')
			}
		}
	}
</script>

<style lang="scss">
.textboxs{
	width:100%;
	padding:10px;
	box-sizing:border-box;
	overflow: hidden;
	.books-searchbox{
		display: flex;
		border-bottom:1px solid #ececec;
		padding:10px 0;
		
		.imgsbook{
			flex:0 0 66px;
			padding:0 8px;
		}
	}
	.informationbox{
		flex:1;
		overflow: hidden;
		box-sizing:border-box;
		.booktitle{
			font-size:18px;
			font-weight:bold;
			color:#ed424b;
			
		}
		.bookcat,.bookauthor,.present{
			font-size:14px;
			color:#999;
			margin:10px 0;
		}
		.bookcat>span{
			color:#000;
		}
		.present{
			width:100%;
			text-overflow:ellipsis;
			overflow: hidden;
			white-space:nowrap;
		}
	}
	
}
</style>
