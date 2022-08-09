<template>
	<div class="vote_main">
		<el-dialog v-model="voteVisible" :close-on-click-modal ="false" width='800px'>
			<h3>Vote</h3>
			<el-row class="match_id_container" justify="center" style="margin-top: 40px;" align="middle">
				<el-col :span="4">
					<h4 style="color:gray;">比赛编号：</h4>
				</el-col>
				<el-col :span="7">
					<el-select @change="showOptions" @clear="handleClear" v-model="match_id" placeholder="选择比赛编号" clearable>
						<el-option 
						v-for="(matchId_op,index) in matchId_flitered"
						:name_op="matchId_op"
						:index="index"
						:label="matchId_op"
						:value="matchId_op"
						></el-option>
					</el-select>
				</el-col>
			</el-row>
			<el-row class="player_id_container" justify="center" style="margin-top: 10px;" align="middle">
				<el-col :span="4">
					<h4 style="color:gray;">你的编号：</h4>
				</el-col>
				<el-col :span="7">
					<el-input v-model="player_id" placeholder="输入队内编号" />
				</el-col>
			</el-row>
			<el-row class="A_container" v-if="match_id!=null" justify="center" style="margin-top: 10px;" align="middle">
				<el-col >
					<h4 style="color:gray;">A队：</h4>
				</el-col>
				<el-col >
					<el-checkbox-group v-model="checkedNames_A" :max="2">
					    <el-checkbox-button v-for="name in playerNames_A" :key="name" :label="name">{{
					      name
					    }}</el-checkbox-button>
					</el-checkbox-group>
				</el-col>
			</el-row>
			<el-row class="B_container" v-if="match_id!=null" justify="center" style="margin-top: 10px;margin-bottom: 30px;" align="middle">
				<el-col >
					<h4 style="color:gray;">B队：</h4>
				</el-col>
				<el-col >
					<el-checkbox-group v-model="checkedNames_B" :max="2">
					    <el-checkbox-button v-for="name in playerNames_B" :key="name" :label="name">{{
					      name
					    }}</el-checkbox-button>
					</el-checkbox-group>
				</el-col>
			</el-row>
			<el-button @click="handleVote" color="#626aef" round 
			style="margin-top: 30px; margin-bottom: 20px; font-weight: bold;width: 110px;height: 40px;">
			开始投票</el-button>
		</el-dialog>
	</div>
</template>

<script setup>
	import { ref,inject,watch } from "vue"
	const axios = inject('axios')
	const voteVisible=ref(false)
	const match_id=ref(null)
	const player_id=ref(null)
	const matchData=ref([])
	const matchId_flitered=ref([])
	const playerNames_A=ref([])
	const playerNames_B=ref([])
	const checkedNames_A=ref([])
	const checkedNames_B=ref([])
	
	defineExpose({
	  voteVisible,
	})
	
	const showOptions=()=>{
		console.log(match_id);
		axios.get("player/getPlayersPublicly",{params:{
			match_id:match_id.value
		}}).then((response)=>{
			for(const index in response.data.data.A队){
				var player=response.data.data.A队[index]
				playerNames_A.value.push(player.name)
			}
			for(const index in response.data.data.B队){
				var player=response.data.data.B队[index]
				playerNames_B.value.push(player.name)
			}
			console.log(response);
			console.log(playerNames_A.value);
			console.log(playerNames_B.value);
		})
	}
	const handleClear=()=>{
		match_id.value=null
		playerNames_A.value=[]
		playerNames_B.value=[]
		checkedNames_A.value=[]
		checkedNames_B.value=[]
	}
	
	const handleVote=()=>{
		axios.post("vote/add",{match_id:match_id.value,
			player_id_from:player_id.value,
			player_name_to:checkedNames_A.value.concat(checkedNames_B.value)}).then((response)=>{
				console.log(response)
				if(response.data.code!=200){
					ElNotification({
						title: '投票失败',
						message: response.data.msg,
						type: 'warning',
					})
				}
				else{
					ElNotification({
						title: '投票成功',
						message: '恭喜你成功投票，你可以在“比赛-投票结果”中查看卧底情况，以及其他人的投票情况。',
						type: 'success',
					})
					voteVisible.value=false
				}
			})
		}
	
	watch(voteVisible, async (newVoteVisible, oldVoteVisible) => {
		if(newVoteVisible==true){
			axios.get("match/getAll").then((response)=>{
				console.log(response)
				matchData.value=[]
				matchId_flitered.value=[]
				matchData.value=response.data.data
				for(const index in matchData.value) {
					var match=matchData.value[index]
					console.log(match)
					if(match.status==1) {
						matchId_flitered.value.push(match.id)
					}
				}
				console.log(matchId_flitered.value)
			})
		}
		else{
			match_id.value=null
			player_id.value=null
			playerNames_A.value=[]
			playerNames_B.value=[]
			checkedNames_A.value=[]
			checkedNames_B.value=[]
		}
	})
</script>

<style>
	
</style>