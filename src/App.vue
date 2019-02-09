<template>
  <div id="app">
		<div v-if="isloading">
			 <router-view/>
		</div>
   	<loading v-else></loading>
  </div>
</template>

<script> 
import Loading from './components/Loading.vue'
import {mapState} from 'vuex'
export default {
  name: 'App',
	components:{
		Loading
	},
	computed:{
		...mapState(['isloading'])
	}
}
</script>

<style>
	#app{
		position:relative;
		width:100%;
		height:100%;
	}
</style>
