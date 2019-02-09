<template>
	<div class="bookstoptails">
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
		<div class="tailsbox">
			<div class="rankingtails" v-for="(item,i) in rankingdate.male" :key="item._id">
				<div class="rankingtitle" @click="gorankingitem(i)"><i></i>{{item.shortTitle}}</div>
				<div class="rankinglists" v-for="(yer,y) in rankingitemdata[i].books" :key="yer._id" v-if="y<5"
				@click="gobooks({id:yer._id,name:yer.title})">
					<i class="rankingnum">{{y+1}}.</i>
					<div class="rankingname">{{yer.title}}</div>
					<div class="rankingrights icon-cheveron-right"></div>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name:'RankingBook',
		computed:{
			...mapState(['texttitle','rankingdate','rankings','rankingitemdata'])
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
			gobooks({id,name}){
				console.log(id)
				this.$store.commit('texttitledata',name)
				this.$store.dispatch('bookitemdata',{id,axios:this.axios})
				this.$router.push('/books')
			},
			gorankingitem(i){
				this.$store.commit('isloadings',false)
				this.$store.commit('rankingsbooksdata',i)
				this.$router.push('/rankingitem')
			}
		},
		beforeRouteEnter:(to,from,next)=>{
			next(vm=>{
				if(to.path==='/ranking'&& from.path==='/books'){
					vm.$store.commit('texttitledata','排行榜')
				}
			})
		}
	}
</script>

<style lang="scss">
.bookstoptails{
		position: relative;
	}
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
 
 .tailsbox{
	 width:100%;
	 height:100%;
	 border-top:1px solid #ececec;
	 .rankingtails{
			 width:100%;
			 box-sizing:border-box;
			 border-bottom:10px solid #ececec;
			 
			 .rankingtitle{
				 position: relative;
				 width:100%;
				 height:50px;
				 padding:0 30px;
				 font-size:16px;
				 color:#666;	 
				 box-sizing:border-box;
				 border-bottom:1px solid #d0d0d0;
				 line-height:50px;
				 &>i{
					 position:absolute;
					 top:50%;
					 margin-left: -15px;
					 margin-top:-9px;
					 display: inline-block;
					 width:5px;
					 height:18px;
					 border-radius:5px;
					 background-color:#fa4679;
				 }
			 }
			 .rankinglists{
				 display: flex;
				 width:100%;
				 height:35px;
				 padding:0 10px;
				 font-size:14px;
				 border-bottom:1px solid #ececec;
				 box-sizing:border-box;
				 line-height:35px;
				 font-weight:bold;
				 .rankingnum{
					 display: inline-block;
					 text-align: center;
					 width:30px;
					 height:40px;
				 }
				 .rankingname{
					 flex:1;
				 }
				 .rankingrights{
					 flex:0 0 30;
					 width:30px;
					 text-align:center;
					 color:#bbb;
					 height:40px;
					 font-size:21px;
					 font-weight: 100;
					 line-height: 40px;
				 }
			 }
	 }
 }
 
</style>
