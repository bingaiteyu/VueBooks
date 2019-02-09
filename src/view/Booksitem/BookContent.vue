<template>
	<div class="contenttails">
		<div class="bookcontents" @click="clickbtn">
			<div>
				<p class="content">{{Contents}}</p>
			</div>
		</div>
		<div class="contentboxshow">
			<transition name="topback">
				<div class="backbox" v-show="showback">
					<div class="icon-cheveron-left" @click="goback"></div>
				</div>
			</transition>
			<transition name="rightcat">
				<div class="rightcom" v-show="showback">加入书架</div>
			</transition>
			<transition name="bottomback">
			<div class="bottombtn" v-show="showback">
				<div class="item" @click="showright">
					<div class="item-icon icon-menu"></div>
					<div class="item-title">目录</div>
				</div>
				<div class="item" @click="showrightleft">
					<div class="item-icon icon-equalizer2"></div>
					<div class="item-title">进度</div>
				</div>
				<div class="item" @click="showsetups">
					<div class="item-icon icon-font-size"></div>
					<div class="item-title">设置</div>
				</div>
				<div class="item" @click="suncontrast">
					<div class="item-icon icon-sun" v-if="this.iscontrasts"></div>
					<div class="item-icon icon-contrast" v-else></div>
					<div class="item-title">夜间</div>
				</div>
			</div>
			</transition>
			<div class="bottom-book-box">
				<div class="btnnextb" v-show="showrightlefts">
					<div class="rightbtn" @click="last">上一章</div>
					<div class="leftbtn" @click="next">下一章</div>
				</div>
				
				<div class="ratebooks" v-show="showsetup">
					<mu-flex>
						<div class="font-item">A-</div>
						<mu-slider v-model="size" :min="1" :step="1" :max="8" color="red" @change="sizeset"/>
						<div class="font-item">A+</div>
					</mu-flex>
					<div class="color-list">
						<div class="color-item" style="background:#c4b395;" @click="skenpeeler('#c4b395')"></div>
						<div class="color-item" style="background:#c3d4e6;" @click="skenpeeler('#c3d4e6')"></div>
						<div class="color-item" style="background:#d1edd1;" @click="skenpeeler('#d1edd1')"></div>
						<div class="color-item" style="background:#e6e6e6;" @click="skenpeeler('#ffffff')"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="rightbox-item" v-show="showresove">
			<div class="shadowshow" @click="hiddenresove"></div>
			<div class="resove">
					<div class="booklist">
					<div class="listtitle">目录</div>
					<div class="menuresovebox" ref="resoves">
						<div>
							<div class="listnum">共几章</div>
							<div class="listbooktitle">正文卷</div>
							<div class="listbox">
								<p class="listitem" v-for="item in listbook" :key="item.order" @click="gobook(item.link)">
									{{item.title}}
								</p>
							</div>
						</div>
						
					</div>
					
					
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import BScroll from 'better-scroll'
	import {mapState} from 'vuex'
	export default {
		name:'BookContent',
		computed:{
			...mapState(['Contents','bookbackground','listbook','listbook','index'])
		},
		data(){
			return {
				showback:false,
				showsetup:false,//设置展示
				showresove:false,//目录展示
				showrightlefts:false,//进度展示
				size:null,
				iscontrasts:false,
			}
		},
		created(){
			this.$nextTick(()=>{
				let textcon = window.document.getElementsByClassName('bookcontents')[0]
				textcon.style.backgroundColor = this.bookbackground.backgrounds
				
				
			})
		},
		watch:{
			showresove(newdata,oldate){
				if(oldate==false){
					if(!this.resoves){
							this.resoves = new BScroll (this.$refs.resoves,{
								click:true,
								scrollX:true
							})
						}else{
							this.resoves.refresh()
					}
				}
			}
		},
		methods:{
			goback(){
				this.$router.back()
			},
			clickbtn(e){
				if(e.clientY>230 && e.clientY<440){
					// console.log(e)
					this.showsetup = false
					this.showrightlefts = false
					this.showback = !this.showback
// 					let textcon = window.document.getElementsByClassName('bookcontents')[0]
// 					textcon.style.backgroundColor = 'red'
				}
				if(e.clientY>440){
					this.showback = false
					let h = window.scrollY
					let height = window.outerHeight
					let moveh = h + height
					// console.log(window,height,moveh,pageYOffset)
						window.scrollTo(0,moveh)
				}
				if(e.clientY<220){
					this.showback = false
					let h = window.scrollY
					let height = window.outerHeight
					let moveh = h - height
					// console.log(window,height,moveh,pageYOffset)
					window.scrollTo(0,moveh)
				}
				
			},
			showsetups(){
				this.showsetup = !this.showsetup
				this.showrightlefts = false
			},
			skenpeeler(b){
				this.$store.commit('skenpleeters',{backgrounds:b})
				let textcon = window.document.getElementsByClassName('bookcontents')[0]
				textcon.style.backgroundColor = this.bookbackground.backgrounds
			},
			sizeset(){
				let num = this.size
				let textcon = window.document.getElementsByClassName('content')[0]
				textcon.style.fontSize = 18 + num + 'px'
			},
			showright(){
				this.showresove = !this.showresove
				this.showrightlefts = false
				this.showsetup = false
			},
			hiddenresove(){
				this.showresove = false
			},
			gobook(url){
				let urls = encodeURIComponent(url)			
				console.log(urls)
				this.$store.dispatch('ajaxchapter',{url:urls,axios:this.axios})
				this.$router.push('/bookcontent')
			},
			showrightleft(){
				this.showrightlefts = !this.showrightlefts
				this.showsetup = false
			},
			suncontrast(){
				this.iscontrasts = !this.iscontrasts
				let textcon = window.document.getElementsByClassName('bookcontents')[0]
				if(this.iscontrasts){
					textcon.style.backgroundColor = this.bookbackground.constrast
					textcon.style.color = this.bookbackground.color
				}else{
					textcon.style.backgroundColor = this.bookbackground.backgrounds
					textcon.style.color = '#000'
				}
				
			},
			next(){
				let indexs = 0
				if(this.index==this.listbook.length-1){
					return
				}else{
					indexs = this.index+1
					let url = this.listbook[indexs].link
					let urls = encodeURIComponent(url)
					console.log(indexs)
					this.$store.commit('showindexitem',indexs)
					this.$store.dispatch('ajaxchapter',{url:urls,axios:this.axios})
					this.$router.push('/bookcontent')
				}
				
			},
			last(){
				let indexs = 0
				if(this.index==0){
					return
				}else{
					indexs = this.index-1
					let url = this.listbook[indexs].link
					let urls = encodeURIComponent(url)
					console.log(indexs)
					this.$store.commit('showindexitem',indexs)
					this.$store.dispatch('ajaxchapter',{url:urls,axios:this.axios})
					this.$router.push('/bookcontent')
				}
			}
		}
		
	}
</script>

<style lang="scss">
	.contenttails{
		position:relative;
		width:100%;
		height:100%;
		.bookcontents{
			position:relative;
			z-index: 20;
			top:0;
			left:0;
			width:100%;
			height:100%;
			transition: all 2s all linear;
			background-color:#c4b395;
			
			.content{
				padding:0 20px;
				text-indent:2rem;
				font-size:18px;
				line-height: 35px;			
				letter-spacing:2px;
			}
		}
		
		.contentboxshow{
			position:fixed;
			z-index:30;
			width:100%;
			height:100%;
			// background-color:red;
			
			.backbox{
				position:fixed;
				top:0;
				width:100%;
				height:50px;
				background-color:#000;
				.icon-cheveron-left{
					width:50px;
					height:50px;
					font-size:25px;
					color:#000;
					text-align:center;
					color:#fff;
					line-height: 50px;
				}
				
			}
			
			.topback-enter-active,.topback-leave-active{
				transition:all 0.2s;
			}
			.topback-enter{
				transform:translateY(-100%);
				opacity:0.3;
			}
			.topback-leave-to{
				transform:translateY(-100%)
			}
			
			.rightcom{
				position:fixed;
				right:0;
				top:70px;
				width:80px;
				height:40px;
				text-align:center;
				font-size:15px;
				line-height: 40px;
				border-radius:20px 0 0 20px;
				background-color:#000;
				color:#fff;
			}
			.rightcat-enter-active,.rightcat-leave-active{
				transition:all 0.2s;
			}
			.rightcat-enter{
				transform:translateX(100%);
			}
			.rightcat-leave-to{
				transform:translateX(100%)
			}
			
			.bottombtn{
				width:100%;
				height:50px;
				position:fixed;
				bottom:0;
				background-color:#000;
				color:#fff;
				display: flex;
				
				.item{
					flex:1;
					height:100%;
					
					.item-icon{
						width:100%;
						height:30px;
					}
					.item-icon.icon-menu,.icon-equalizer2,.icon-font-size,.icon-contrast,.icon-sun{
						text-align: center;
						font-size:15px;
						height:30px;
						line-height: 30px;
					}
					.item-title{
						font-size:12px;
						text-align: center;
					}
				}
				
			}
			.bottomback-enter-active,.bottomback-leave-active{
				transition:all 0.2s;
			}
			.bottomback-enter{
				transform:translateY(100%);
			}
			.bottomback-leave-to{
				transform:translateY(100%)
			}
			
			.bottom-book-box{
				position:fixed;
				bottom:50px;
				width:100%;
				background-color:#000;
				
				.btnnextb{
					width:100%;
					height:50px;
					background-color:#000;
					display:flex;
					
					.rightbtn,.leftbtn{
						flex:1;
						height:50px;
						line-height:50px;
						text-align:center;
						color:#fff;
					}
				}
				.ratebooks{
					width:100%;
					height:150px;
					.flex-row{
						color:#fff;
						height:50px;
						.mu-slider {
							height:50px;
						}
						
						.font-item{
							width:50px;
							height:50px;
							text-align:center;
							line-height:50px;
						}
					}
					.color-list{
						width:100%;
						display: flex;
						box-sizing:border-box;
						padding:8px;
						.color-item{
							width:100px;
							height:40px;
							margin:8px;
							box-sizing:border-box;
							background-color:red;
						}
					}
				}
			}
		}
		
		.rightbox-item{
			position:fixed;
			top:0;
			z-index: 50;
			width:100%;
			height:100%;
			display: flex;
			.shadowshow{
				width:15%;
				height:100%;
				background-color:rgba(7,17,27,0.5);
				
			}
			.resove{
				flex:1;
				width:85%;
				height:100%;
				right:0;
				background-color:#fff;
				.menuresovebox{
					width:100%;
					height:620px;
					overflow: hidden;
				}
			}
		}
	}

</style>
