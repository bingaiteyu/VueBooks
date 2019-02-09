<template>
	<div class="homepage">
			<top-header/>
			<mu-carousel hide-controls	>
			  <mu-carousel-item>
				<img src="../assets/images/banner1.jpg" width="100%">
			  </mu-carousel-item>
			  <mu-carousel-item>
				<img src="../assets/images/banner2.jpg" width="100%">
			  </mu-carousel-item>
			  <mu-carousel-item>
				<img src="../assets/images/banner3.jpg" width="100%">
			  </mu-carousel-item>
			  <mu-carousel-item>
				<img src="../assets/images/banner4.jpg" width="100%">
			  </mu-carousel-item>
			</mu-carousel>
			<div class="seach" @click="goserach">
				<div class="seach-icon"><i class="icon-search"></i>搜索</div>
			</div>
			<div class="classification">
				<div class="seachbtn">
					<div class="icon-menu icon" @click.self="gocallssifitation"></div>
					<div class="seachname">分类</div>
				</div>
				<div class="seachbtn">
					<div class="icon-bookmark icon" @click="goranking"></div>
					<div class="seachname">排行榜</div>
				</div>
				<div class="seachbtn">
					<div class="icon-lock-open icon"></div>
					<div class="seachname">免费</div>
				</div>
				<div class="seachbtn">
					<div class="icon-folder-open icon" @click="mycollectionbook"></div>
					<div class="seachname">收藏</div>
				</div>
			</div>
			<div class="banneritem">
				<img src="../assets/images/banner5.jpg" width="100%" height="100%">
			</div>
			<div class="recomment">
				<h2 class="comme">
					<i></i><span>最优推荐</span>
				</h2>
				<div class="comments" ref='remuse'>
					<div class="coment-itembox">
						<div class="itembooks" v-for="item in sixrecommend" :key="item._id" @click="booksitem({id:item._id,name:item.title})">
							<img :src="item.cover | imgurls" width="96px" height="130px">
							<div class="bookname">{{item.title}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="recomment">
				<h2 class="comme">
					<i></i><span>热门小说</span>
				</h2>
				<div class="comments" ref='remuses'>
					<div class="coment-itembox">
						<div class="itembooks" v-for="item in sixfreebooks" :key="item._id" @click="booksitem({id:item._id,name:item.title})">
							<img :src="item.cover | imgurls" width="96px" height="130px">
							<div class="bookname">{{item.title}}</div>
						</div>
					</div>
				</div>
			</div>
			
	</div>
</template>

<script>
	import {mapState,mapGetters} from 'vuex'
	import BScroll from 'better-scroll'
	import TopHeader from '../components/TopHeader.vue'
	import {imgs} from '../assets/js/image.js'
	export default {
		name:'HomePage',
		components:{
			TopHeader
		},
		computed:{
			...mapGetters(['sixrecommend','sixfreebooks']),
			...mapState(['isloading','rankings'])
		},
		created(){
			this.$nextTick(()=>{
				if(!this.remuse){
					this.remuse = new BScroll (this.$refs.remuse,{
						click:true,
						scrollX:true
					})
				}else{
					this.remuse.refresh()
				}
				if(!this.remuses){
					this.remuses = new BScroll (this.$refs.remuses,{
						click:true,
						scrollX:true
					})
				}else{
					this.remuses.refresh()
				}
			})
		},
		filters:{
			imgurls(url){
				return imgs(url)
			}
		},
		methods:{
			booksitem({id,name}){
				this.$store.commit('texttitledata',name)
				this.$store.dispatch('bookitemdata',{id,axios:this.axios})
				this.$router.push('/books')
			},
			goserach(){
				this.$store.commit('isshowsearch',false)
				this.$router.push('/search')
			},
			gocallssifitation(e){
				this.$store.commit('texttitledata','分类')
				this.$store.dispatch('ajaxcallssify',{axios:this.axios})
				this.$router.push('/callsify')
			},
			goranking(){
				this.$store.commit('texttitledata','排行榜')
				this.$store.dispatch('ajaxrankinglists',{id:this.rankings,axios:this.axios})
				this.$router.push('/ranking')
			},
			mycollectionbook(){
				this.$store.commit('texttitledata','我的收藏')
				this.$router.push('/collection')
			}
		},
		beforeRouteEnter:(to,from,next)=>{
			next(vm=>{
				if(from.path==='/books'&& to.path==='/home'){
					vm.$store.commit('texttitledata','')
				}
			})
		}
	}
</script>

<style lang="scss">
	.homepage{
			width:100%;
			height:100%;
				.mu-carousel{
					width:100%;
					height:152px;
				}
				.seach{
					width:100%;
					height:50px;
					display: flex;
					padding:10px;
					box-sizing:border-box;
					background-color:#ececec;
					
					.seach-icon{
						flex:1;
						width:100%;
						height:30px;
						line-height: 30px;
						text-align:center;
						background-color:#fff;
						border-radius:5px;
						color:#666;
						
						.icon-search{
							display: inline-block;
							width:30px;
							font-size:14px;
							color:#666;
						}
						
					}
				}
				
				.classification{
					width:100%;
					height:82px;
					display: flex;
					box-sizing:border-box;
					padding:2px 0;
					
					.seachbtn{
						flex:1;
						
						.icon{
							height:50px;
							line-height: 50px;
							font-size:25px;
							text-align:center;
							color:#fa4679;
						}
						
						.seachname{
							text-align: center;
							font-size:15px;
						}
					}
					
			}
			
				.banneritem{
					width:100%;
					height:100%;
					display: flex;
					padding:10px 10px 0 10px;
					box-sizing:border-box;
					background-color:#ececec;
				}
			
				.recomment{
					width:100%;
					height:100%;
					overflow:hidden;
					border-top:10px solid #ececec;
					.comme{
						position:relative;
						width:100%;
						line-height: 50px;
						padding-left:10px;
						box-sizing:border-box;
						
						i{	
							position:absolute;
							top:50%;
							margin-top:-10px;
							display: inline-block;
							width:5px;
							height:20px;
							border-radius:3px;
							background-color:#fa4679;
						}
						span{
							padding-left:10px;
						}
					}
					
					.comments{
						width:100%;
						height:100%;
						box-sizing:border-box;
						.coment-itembox{
							width:660px;
							height:100%;
							display:flex;
							box-sizing:border-box;
							padding:10px;
							.itembooks{
								display: inline-block;
								width:96px;
								margin:0 5px;
								
								.bookname{
									width:100%;
									height:15px;
									font-size:15px;
									padding:5px 0;
									line-height: 18px;
									max-height:15px;
									overflow:hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
								}
							}
						}
					}
					
				}
				
				
	
	}
	
</style>
