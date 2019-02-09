<template>
	<div>
		<div class="bookstop">
			<div class="back">
				<div class="icon-cheveron-left" @click="back"></div>
				<div class="title">
					{{texttitle}}
				</div>
			</div>
			<div class="searchbook">
				<div class="icon-search booktopsearch" @click="gosearch"></div>
				<div class="icon-menu"></div>
			</div>
		</div>
		<div class="colectionlist">
			<div class="colectionlistitem" v-for="(item,o) in collection" :key="o">
				<div class="dev-close icon-close" @click="devclose(o)"></div>
				<div class="colectionlistimgs">
					<img :src="item.cover | imgurl" alt="" width="92px" height="120px">
				</div>
				<div class="colectionlisttitle">
					<div class="colectionlistname">{{item.title}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {imgs} from '../../assets/js/image.js'
	import {mapState} from 'vuex'
	export default {
		name:'Mycollection',
		computed:{
			...mapState(['texttitle','collection'])
		},
		filters:{
			imgurl(url){
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
			devclose(index){
				this.$store.commit('devclosess',index)
			}
		}
	}
</script>

<style lang="scss">
.bookstop{
	width:100%;
	height:50px;
	display: flex;
	
}

 .bookstop .back{
	 flex:1;
	 display: flex;
	
 }
 .back .icon-cheveron-left{
	 flex:0 0 50px;
	 width:50px;
	 height:50px;
	 font-size:25px;
	 color:#666;
	 overflow: hidden;
	 white-space:nowrap;
	 text-overflow:ellipsis;
	 text-align:center;
	 line-height: 50px;
 }
 .back .title{
	 flex:1;
	 height:50px;
	 font-size:14px;
	 line-height: 50px;
 }
 .bookstop .searchbook{
	 flex:0 0 100px;
	 display:flex;
 }
 .booktopsearch,.icon-menu{
	 width:100%;
	 flex:1;
	 color:#bbb;
	 font-size:20px;
	 line-height: 50px;
	 text-align:center;
 }
 
 .colectionlist{
	 width:100%;
	 height:100%;
	 padding:0 10px;
	 
	 .colectionlistitem{
		 position:relative;
		 width:92px;
		 height:100%;
		 float:left;
		 margin:10px 12px;
		 border-bottom:1px solid #000;
		 border-right:1px solid #000;
		 border-left:1px solid #000;
		 
		 .dev-close{
			 position: absolute;
			 width:20px;
			 height:20px;
			 line-height: 20px;
			 text-align: center;
			 top:-10px;
			 right:-10px;
			 font-size:12px;
			 border-radius:50%;
			 border:1px solid #000;
			 background-color:#fff;
		 }
		 .colectionlistimgs{
			 width:100%;
			 height:100%;
		 }
		 .colectionlisttitle{
			 .colectionlistname{
				 width:100%;
				 text-align: center;
				 font-size:15px;
				 overflow: hidden;
				 white-space:nowrap;
				 text-overflow: ellipsis;
				 line-height: 25px;
				 min-height: 25px;
			 }
		 }
	 }
	 
 }
</style>
