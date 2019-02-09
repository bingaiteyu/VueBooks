<template>
	<div class="topheader">
		<div class="booklogo">小说网</div>
		<div class="books">
			<div class="login">登陆</div>
			<div class="collect">收藏</div>
		</div>
	</div>
</template>

<script>
	export default {
		nam:'TopHeader'
		
	}
</script>

<style lang="scss">
	.topheader{
		width:100%;
		height:50px;
		display:flex;
		background-color:#fff;
		
		.booklogo{
			flex:1;
			line-height:50px;
			font-size:18px;
			font-weight:bold;
			padding-left:20px;
		}
		.books{
			flex:0 0 100px;
			width:100px;
			display: flex;
			
			.login,.collect{
				flex:1;
				line-height: 50px;
				text-align:center;
			}
			.collect{
				color:#fa4679;
			}
		}
		
	}
</style>
