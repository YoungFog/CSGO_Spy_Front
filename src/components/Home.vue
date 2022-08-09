<template>
	<Dev ref="dev_ref"></Dev>
	<Match ref="match_ref"></Match>
	<Vote ref="vote_ref"></Vote>
	<el-container>
		<el-header class="nav">
			<el-row justify="space-between">
				<el-col :span="4">
					<img class="unselectable" draggable="false" oncontextmenu="return false;" src="../assets/logo_home.png" alt="" style="height: 70px;">
				</el-col>
			    <el-col :span="4">
					<el-button @click="dev_click" color="#626aef" round style="width:120px;height:43px;font-weight:600;">开发控制台</el-button>
				</el-col>
			</el-row>
		</el-header>
		
		<el-main class="content">
			<el-row class="functions" justify="space-evenly" align="middle">
				<div class="match" @click="match_click"></div>
				<div class="vote" @click="vote_click"></div>
			</el-row>
		</el-main>
		<el-divider />
		<el-footer class="footer">
			<p style="color: grey;font-size: 10px;">CopyRight © 2022 YoungFog_CSGO_SPY 版权所有</p>
		</el-footer>
	</el-container>
	
</template>

<script setup>
	import Dev from './Dev.vue'
	import Match from './Match.vue'
	import Vote from './Vote.vue'
	import { ref } from "vue"
	
	const dev_ref=ref()
	const match_ref=ref()
	const vote_ref=ref()
	const dev_click=()=>{
		dev_ref.value.devVisible=true;
	}
	const match_click=()=>{
		match_ref.value.matchVisible=true;
	}
	const vote_click=()=>{
		vote_ref.value.voteVisible=true;
	}
</script>

<style scoped>
	.content{
		height: 900px;
		background-image: url(../assets/bg_home.png);
		background-size: cover;
	}
	.functions{
		height: 650px;
	}
	.match{
		width: 258px;
		height: 382px;
		background-image: url(../assets/match.png);
		background-size: cover;
		transition: .2s;
		cursor: pointer;
		
	}
	.match:hover{
		width: 284px;
		height: 420px;
	}
	.vote{
		width: 258px;
		height: 382px;
		background-image: url(../assets/vote.png);
		background-size: cover;
		transition: .2s;
		cursor: pointer;
	}
	.vote:hover{
		width: 284px;
		height: 420px;
	}
	.unselectable {
	  -moz-user-select: -moz-none;
	  -khtml-user-select: none;
	  -webkit-user-select: none;
	  -o-user-select: none;
	  user-select: none;
	}
</style>