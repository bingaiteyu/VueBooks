<template>
	<div class="books">
			<book-tops></book-tops>
			<div class="booksinforbox">
				<div class="bookitems">
					<div class="imgsbox">
						<img :src="bookinformation.cover | imgurl" width="84px" height="112px">
					</div>
					<div class="bookinformation">
						<div class="booktitle">{{bookinformation.title}}</div>
						<div class="bookauthor">{{bookinformation.author}}</div>
						<div class="bookcate">{{bookinformation.majorCate}}/{{bookinformation.minorCate}}</div>
						<div class="bookscore">{{bookinformation.rating.score.toFixed(1)}}分/{{bookinformation.rating.count}}评过</div>
						<div class="bookwordCount">{{(bookinformation.wordCount/10000).toFixed(2)}}万字 | 连载</div>
					</div>
				</div>
				<div class="btnbox">
					<div class="read-left">开始阅读</div>
					<div class="collecttion-right" @click="addmycollection">收藏</div>
				</div>
			</div>
			<div class="brief" :class="{isonfors:this.showinfor}" @click="isshowinfor">
				<p>{{bookinformation.longIntro}}</p>
			</div>
			<div class="catalog" @click="golist">
				<div class="catalogtitle">目录</div>
				<div class="cattalogbook">
					<span>{{bookinformation.lastChapter}}</span>
				</div>
				<div class="icon-cheveron-right"></div>
			</div>
			<div class="recomment">
				<h2 class="comme">
					<i></i><span>热门小说</span>
				</h2>
				<div class="comments" ref='hotmuse'>
					<div class="coment-itembox">
						<div class="itembooks" v-for="item in sixbookrecoment" :key="item._id" @click="booksitem({id:item._id,name:item.title})">
							<img :src="item.cover | imgurl" width="96px" height="130px">
							<div class="bookname">{{item.title}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="commentbook">
				<h2 class="commentarea">评论区 <span>共{{commentall.length}}条评论</span></h2>
				<div class="commentbox">
					<div class="itemuser" v-for="item in commentall" :key="item._id">
						<div class="picbook">
							<img :src="item.author.avatar | avatorimg" alt="" width="42px" height="42px">
						</div>
						<div class="usercomment">
							<div class="username">{{item.author.nickname}} <i :class="{lvcolor:item.author.lv>6}">Lv{{item.author.lv}}</i></div>
							<p class="content">{{item.content}}</p>
						</div>
						
					</div>
				</div>
			</div>
	</div>
</template>

<script>
	import {mapState,mapGetters,mapActions} from 'vuex'
	import BScroll from 'better-scroll'
	import BookTops from '../../components/BookTops.vue'
	import {imgs} from '../../assets/js/image.js'
	export default {
		name:'BooksItem',
		data(){
			return {
				showinfor:false
			}
		},
		created(){
			this.$nextTick(()=>{
				if(!this.hotmuse){
					this.hotmuse = new BScroll(this.$refs.hotmuse,{
						click:true,
						scrollX:true
					})
				}else{
					this.hotmuse.refresh()
				}
			})
		},
		computed:{
			...mapState(['isloading','bookinformation','bookviewId']),
			...mapGetters(['sixfreebooks','sixbookrecoment','commentall'])
		},
		filters:{
			imgurl(url){
				return imgs(url)
			},
			avatorimg(url){
				return `http://statics.zhuishushenqi.com${url}`
			}
		},
		methods:{
			...mapActions(['bookitemdata']),
			isshowinfor(){
				this.showinfor = !this.showinfor
			},
			booksitem({id,name}){
				console.log(name)
				this.$store.commit('texttitledata',name)
				this.bookitemdata({id,axios:this.axios})
			},
			golist(){
				console.log(this.bookviewId)
				this.$store.dispatch('ajaxbooklist',{id:this.bookviewId,axios:this.axios})
				this.$router.push('/booklist')
			},
			addmycollection(){
				this.$store.commit('datacollection',this.bookinformation)
			}
		},
		components:{
			BookTops
		}
	}
</script>

<style lang="scss">
	.books{
		position:relative;
		width:100%;
		height:100%;
		overflow: hidden;
		
		.booksinforbox{
			width:100%;
			border-bottom:1px solid #ececec;
			box-sizing:border-box;
			
			.bookitems{
				width:100%;
				margin:16px;
				display: flex;
				.imgsbox{
					flex:0 0 84px;
				}
				
				.bookinformation{
					flex:1;
					padding:0 10px;
					.booktitle{
						width:100%;
						font-size:19px;
						font-weight:bold;
					}
					.bookauthor,.bookcate,.bookscore,.bookwordCount{
						width:100%;
						font-size:13px;
						padding-top:8px;
					}
					.bookscore{
						color:#bbb;
					}
				}
			}
			
			.btnbox{
				width:100%;
				display:flex;
				box-sizing:border-box;
				padding:0 16px 16px 16px;
				
				.read-left,.collecttion-right{
					flex:1;
					height:35px;
					text-align:center;
					line-height:35px;
					margin:0 8px;
					font-size:14px;
					border-radius:5px;
				}
				.read-left{
					color:#fff;
					border-color:#ed424b;
					background-color:#ed424b;
				}
				.collecttion-right{
					background-color:#ececec;
				}
			}
		}
		.brief{
			width:100%;
			padding:16px 0;
			border-bottom:1px solid #ececec;
			p{	
				max-height:50px;
				overflow:hidden;
				padding:0 15px;
				font-size:15px;
				text-indent:2rem;
				line-height:25px;
			}
		}
		.isonfors > p{
			max-height:100%;
		}
		.catalog{
			width:100%;
			height:50px;
			display:flex;
			box-sizing:border-box;
			padding:0 10px;
			.catalogtitle{
				flex:0 0 50px;
				line-height: 50px;
				font-size:16px;
				font-weight:bold;
			}
			.cattalogbook{
				flex:1;
				line-height: 50px;
				span{
					max-width:200px;
					margin-right:5px;
					font-size:15px;
					overflow:hidden;
					white-space:nowrap;
					text-overflow:ellipsis;
					float:right;
					right:0;
					color:#999;
				}
			}
			.icon-cheveron-right{
				flex:0 0 20px;
				line-height: 50px;
				text-align:center;
				color:#bbb;
			}
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
		
		.commentbook{
			width:100%;
			border-top:10px solid #ececec;
			.commentarea{
				width:100%;
				height:50px;
				line-height: 50px;
				font-size:18px;
				font-weight:bold;
				padding-left:15px;
				border-bottom:1px solid #ececec;
				
				span{
					font-size:14px;
					font-weight:100;
					color:#999;
				}
			}
			.commentbox{
				width:100%;
				.itemuser{
					width:100%;
					display: flex;
					padding:5px;				
					box-sizing:border-box;
					border-bottom:1px solid #ececec;
					.picbook{
						flex:0 0 42px;
						margin:10px;
						width:42px;
						height:42px;
						border-radius:50%;
						overflow: hidden;
						.username{
							width:100%;
							
						}
					}
					
					.usercomment{
						flex:1;
						width:100%;
						margin:5px 10px;
						.username{
							width:100%;
							height:30px;
							line-height: 30px;
							color:#bbb;
							font-size:13px;
							i{
								color:skyblue;
								font-size:12px;
								margin-left:5px;
							}
							.lvcolor{
								color:red;
							}
						}
						.content{
							margin:5px 0;
							width:100%;
							font-size:15px;
							line-height: 20px;
							min-height:35px;
						}
					}
				}
			}
		}
	}
</style>
