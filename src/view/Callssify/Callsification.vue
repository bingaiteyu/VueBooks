<template>
	<div class="callssifyloading">
		<div v-if="iscalssify">
			<book-tops></book-tops>
			<div class="callssifybox">
				<div class="callssifyitem" v-for="(item,i) in callssification.male" :key="i" v-if="callssifications.male[i].mins.length>0">
					<div class="calssifytitle" @click="goclassify(item.name)">
						<div class="calssifyname">{{item.name}}</div>
						<div class="bookcount">共 {{item.bookCount}} 本作品</div>
						<div class="gocalssify icon-cheveron-right"></div>
					</div>
					<div class="calssifylist">
						<div class="lisbox" v-for="(cals,y) in callssifications.male" :key="y" v-if="cals.major === item.name"
						>
							<div class="lis" v-for="(lis,index) in cals.mins" :key="index" @click="goclassifys({major:item.name,minor:lis})">
								{{lis}}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			加载中
		</div>
		
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import BookTops from '../../components/BookTops.vue'
	export default {
		name:'Callsification',
		components:{
			BookTops
		},
		computed:{
			...mapState(['iscalssify','callssification','callssifications'])
		},
		methods:{
			goclassify(name){
				console.log(name)
				this.$store.commit('callssifytitledata',name)
				this.$store.dispatch('ajaxcallssifyitem',{major:name,minor:'',axios:this.axios}),
				this.$router.push('/category')
			},
			goclassifys({major,minor}){
				console.log(major,minor)
				this.$store.commit('callssifytitledata',minor)
				this.$store.dispatch('ajaxcallssifyitem',{major,minor,axios:this.axios}),
				this.$router.push('/category')
			}
		},
		beforeRouteEnter:(to,from,next)=>{
			next(vm=>{
				if(to.path==='/callsify'&& from.path==='/category'){
					vm.$store.commit('texttitledata','分类')
				}
			})
		}
	}
</script>

<style lang="scss">
	.callssifyloading{
		width:100%;
		height:100%;
		background-color:#fff;
		
		.callssifybox{
			width:100%;
			padding:0 10px;
			border-top:1px solid #ececec;
			box-sizing:border-box;
			
			.callssifyitem{
				width:100%;
				.calssifytitle{
					display: flex;
					width:100%;
					height:40px;
					padding:0 5px;
					box-sizing:border-box;
					line-height: 40px;
					border-bottom:1px solid #ececec;
					
					.calssifyname{
						font-family:楷体;
						font-size:16px;
					}
					
					.bookcount{
						flex:1;				
						padding-left:15px;
						font-size:13px;
						color:#999;
					}
					
					.gocalssify{
						width:10px;
						height:40px;
						line-height: 40px;
						color:#bbb;
					}
				}
				.calssifylist{
					width:100%;
					padding:5px 0;
					.lisbox{
						width:100%;
						min-height:50px;
						.lis{
							display: inline-block;
							padding:8px 12px;
							border:1px solid #999;
							font-size:13px;
							color:#999;
							border-radius:15px;
							margin:8px 5px;
						}
					}
				}
			}
		}
	}
</style>
