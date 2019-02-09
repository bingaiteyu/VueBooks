<template>
	<div class="serachall">
		<div class="searchbox">
			<div class="searchtext">
				<div class="icon-search con"></div>
				<input v-model="src" type="text"/>
				<div v-if="src!==''" class="icon-close delsrc" @click="deltext"></div>
			</div>
			
			<div class="searchitem">
				<div v-if="src==''" @click="goback">取消</div>
				<div v-else @click="serachbook">搜索</div>
			</div>
		</div>
		<div v-if="showsearch">
			<div v-if="issearchdata">
				<search-list></search-list>
			</div>
			<div v-else>
				搜索中...
			</div>
		</div>
		
		
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import SearchList from './SearchList.vue'
	export default {
		name:'SearchBook',
		data(){
			return {
				src:''
			}
		},
		computed:{
			...mapState(['issearchdata','showsearch'])
		},
		components:{
			SearchList
		},
		methods:{
			deltext(){
				this.src = ''
			},
			goback(){
				this.$router.back()
			},
			serachbook(){
				this.$store.commit('isshowsearch',true)
				console.log(this.src)
				this.$store.dispatch('ajaxserach',{src:this.src,axios:this.axios})
			}
		}
	}
</script>

<style lang="scss">
.serachall{
	position:absolute;
	width:100%;
	height:100%;
	
	.searchbox{
		position: relative;
		width:100%;
		display:flex;
		box-sizing:border-box;
		padding:10px 0;
		
		.searchtext{
			display: flex;
			width:100%;
			height:30px;
			flex:1;
			margin:0 0 0 10px;				
			border-radius:5px;
			background-color:#f3f3f3;
			&>.con{
				width:30px;
				height:30px;
				text-align:center;
				color:#bbb;
				line-height: 30px;
			}
			input{
				border:0;
				flex:1;
				outline: none;
				border-radius:5px;
				background-color:#f3f3f3;
			}
			.delsrc{
				flex:0 0 30px;
				width:30px;
				height:30px;
				vertical-align:middle;
				text-align:center;
				color:#999;
				font-size:12px;
				line-height: 30px;
			}
		}
		.searchitem{
			flex:0 0 60px;
			width:60px;
			text-align:center;
			font-size:15px;
			line-height: 30px;
		}
	}
	
	.searchcontent{
		width:100%;
		height:100%;
		
	}
}
</style>
