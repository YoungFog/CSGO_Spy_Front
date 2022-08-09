<template>
	<div id='result_main'>
		<el-dialog v-model="resultVisible" :close-on-click-modal ="false">
			<h2>本场卧底游戏结果</h2>
			<el-divider />
				<el-table :data="players" size="large" style="margin-top: 40px;"
				:default-sort="{ prop: 'voted_num', order:'descending' }" border>
					<el-table-column label="姓名" prop="name"></el-table-column>
					<el-table-column label="所属队伍">
						<template #default="scope">
							<div v-if="scope.row.player_id.includes('A@')">A队</div>
							<div v-else>B队</div>
						</template>
					</el-table-column>
<!-- 					<el-table-column label="选手队内编号" prop="player_id"></el-table-column> -->
					<!-- hasVoted -->
					<el-table-column label="是否完成投票">
						<template #default="scope">
							<div v-if="scope.row.hasVoted==1" style="color: green;">已经投票</div>
							<div v-else>未投票</div>
						</template>
					</el-table-column>
					<!-- isSpy -->
					<el-table-column label="是否为卧底">
						<template #default="scope">
							<div v-if="scope.row.isSpy==1" style="color: red;">是卧底</div>
							<div v-else>不是卧底</div>
						</template>
					</el-table-column>
					<el-table-column label="目前得票数" prop="voted_num" sortable></el-table-column>
				</el-table>
				<h2 style="margin-top: 90px;">目前具体投票情况如下所示</h2>
				<h3 style="margin-bottom: 30px;">（时间顺序）</h3>
				<el-divider />
				<div v-for="(value,index) in votes">
					<h4>{{value.name_from}} 投给了 {{value.name_to}}</h4>
<!-- 					<el-divider v-if="(index+1)%4==0">
					    <el-icon><star-filled /></el-icon>
					</el-divider> -->
				</div>
				<el-divider content-position="center" style="color: gray;margin-top: 50px;">如要获取最新数据，请重新打开此结果框</el-divider>
		</el-dialog>
	</div>
</template>

<script setup>
	import { ref,inject,watch } from "vue"
	const axios = inject('axios')
	const resultVisible=ref(false)
	const match_id=ref(null)
	const players=ref([])
	const votes=ref([])
	
	defineExpose({
	  resultVisible,
	  match_id,
	})
	
	watch(resultVisible, async (newResultVisible, oldResultVisible) => {
		if(newResultVisible==true){
			axios.get("player/getPlayers",{params:{
				match_id:match_id.value
			}}).then((response)=>{
				console.log(response)
				players.value=response.data.data
			})
			axios.get("vote/getVotes",{params:{
				match_id:match_id.value
			}}).then((response)=>{
				console.log(response)
				votes.value=response.data.data
			})
		}
		else{
			match_id.value=null;
		}
	})
</script>

<style scoped>
	.el-card.is-always-shadow{
		height: 40px;
	}
	.el-card__body{
		height: 40px;
	}
</style>