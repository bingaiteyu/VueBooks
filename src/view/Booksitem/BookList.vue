<template>
	<div>
		<book-tops></book-tops>
		<div class="booklist">
			<div class="listtitle">目录</div>
			<div class="listnum">共几章</div>
			<div class="listbooktitle">正文卷</div>
			<div class="listbox">
				<p class="listitem" v-for="(item,i) in listbook" :key="item.order" @click="gobook({url:item.link,index:i})">
					{{item.title}}
				</p>
			</div>
			
		</div>
		
	</div>
</template>

<script>
	import BookTops from '../../components/BookTops.vue'
	import {mapState} from 'vuex'
	export default {
		name:'BookList',
		components:{
			BookTops
		},
		computed:{
			...mapState(['listbook'])
		},
		methods:{
			gobook({url,index}){
				console.log(url,index)
				let urls = encodeURIComponent(url)			
				console.log(urls)
				this.$store.commit('showindexitem',index)
				this.$store.dispatch('ajaxchapter',{url:urls,axios:this.axios})
				this.$router.push('/bookcontent')
			}
		}
		
	}
</script>

<style lang="scss">
	.booklist{
		width:100%;
		height:100%;
		box-sizing:border-box;
		overflow: hidden;
		
		.listtitle{
			width:100%;
			height:50px;
			line-height: 50px;
			text-align:center;
			color:#ed424b;
			font-size:15px;
			border-bottom:1px solid #ed424b;
		}
		.listnum{
			width:100%;
			height:44px;
			line-height: 44px;
			font-size:15px;
			font-weight:bold;
			padding-left:15px;
		}
		.listbooktitle{
			width:100%;
			height:36px;
			padding:0 15px;
			font-size:14px;
			color:#999;
			line-height: 36px;
			background-color:#f6f7f9;
		}
		.listbox{
			width:100%;
			padding:5px 15px;
			box-sizing:border-box;
			.listitem{
				display: inline-block;
				width:100%;
				font-size:14px;
				padding:13px 0;
				overflow:hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
</style>
