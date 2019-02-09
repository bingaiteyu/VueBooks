<template>
	<div class="textboxs">
		<div class="books-searchbox" v-for="item in searchdata" :key="item._id" @click="bookgo({id:item._id,name:item.name})">
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
</template>

<script>
	import {mapState} from 'vuex'
	import {imgs} from '../../assets/js/image.js'
	export default {
		name:'SearchList',
		computed:{
			...mapState(['searchdata'])
		},
		filters:{
			imgsurl(url){
				return imgs(url)
			}
		},
		methods:{
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
