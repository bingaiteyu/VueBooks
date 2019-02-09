<template>
	<div class="bookstop">
		<div class="back">
			<div @click="back" class="icon-cheveron-left"></div>
			<div class="title">
				{{texttitle}}
			</div>
		</div>
		<div class="searchbook">
			<div class="icon-search booktopsearch" @click="gosearch"></div>
			<div class="icon-menu"></div>
		</div>
	</div>
	
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name:'BookTop',
		computed:{
			...mapState(['texttitle'])
		},
		methods:{
			back(){
				this.$store.commit('isshowsearch',true)
				this.$router.back()
			},
			gosearch(){
				this.$store.commit('isshowsearch',false)
				this.$router.push('/search')
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
</style>
