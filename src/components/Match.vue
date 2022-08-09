<template>
	<Join ref="join_ref" @regain="handleRegain"></Join>
	<Result ref="result_ref"></Result>
	<div class="match_main">
		<el-dialog v-model="matchVisible" :close-on-click-modal ="false" width="70%">
			<h3>Match</h3>
			<el-table :data="filterTableData" size='large' style="margin-top: 30px;">
				<el-table-column type="expand">
					<template #default='props'>
						<h4 style="margin-left: 95px;">A队</h4>
						<el-table :data="props.row.playersInf.A队" style="margin-left: 80px;margin-right: 80px;">
							<el-table-column label="比赛编号" prop="match_id"></el-table-column>
							<el-table-column label="选手队内编号" prop="player_id"></el-table-column>
							<el-table-column label="姓名" prop="name"></el-table-column>
						</el-table>
						<h4 style="margin-left: 95px;">B队</h4>
						<el-table :data="props.row.playersInf.B队" style="margin-left: 80px;margin-right: 80px;margin-bottom: 40px;">
							<el-table-column label="比赛编号" prop="match_id"></el-table-column>
							<el-table-column label="选手队内编号" prop="player_id"></el-table-column>
							<el-table-column label="姓名" prop="name"></el-table-column>
						</el-table>
					</template>
				</el-table-column>
				<el-table-column label="比赛编号" prop="id"></el-table-column>
				<el-table-column label="比赛状态" >
					<template #default='scope'>
						<div v-if="scope.row.status==0">
							<el-icon size="" color="#285AD7" style="vertical-align: middle;margin-right: 6px;">
							    <BellFilled />
							</el-icon>
							未开始
						</div>
						<div v-else-if="scope.row.status==1">
							<el-icon size="" color="green" style="vertical-align: middle;margin-right: 6px;">
							    <Flag />
							</el-icon>
							进行中
						</div>
						<div v-else-if="scope.row.status==2">
							<el-icon size="" color="red" style="vertical-align: middle;margin-right: 6px;">
							    <RemoveFilled />
							</el-icon>
							已结束
						</div>
						<div v-else>未知状态</div>
					</template>
				</el-table-column>
				<el-table-column align="center">
					<template #header>
						<el-input v-model="search" size="default" placeholder="输入比赛编码进行搜索" >
							<template #prefix>
							    <el-icon size="small"><Search /></el-icon>
							 </template>
						</el-input>
					</template>
					<template #default='scope'>
						<el-button @click="handleJoin(scope.row.id)" size="large" color='#1c6bff' round 
						v-if="scope.row.status==0" style="font-weight: bold;">报名参赛</el-button>
						<el-button @click="handleGetSpy(scope.row.id)" size="large" color='#00aa05' round 
						v-else-if="scope.row.status==1" style="font-weight: bold;">查看卧底</el-button>
						<el-button @click="handleVoteResult(scope.row.id)" size="large" color='#ec0003' round 
						v-else style="font-weight: bold;">投票结果</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>

<script setup>
	import { ref,inject,watch,computed } from "vue"
	import Join from './Join.vue'
	import Result from './Result.vue'
	const join_ref=ref()
	const result_ref=ref()
	const axios = inject('axios')
	const matchVisible=ref(false)
	
	const tableData=ref([]);
	const search = ref('')
	const filterTableData = computed(() =>
	  tableData.value.filter(
	    (data) =>
	      !search.value ||
	      data.id.toLowerCase().includes(search.value.toLowerCase())
	  )
	)
	
	watch(matchVisible, async (newMatchVisible, oldMatchVisible) => {
		if(newMatchVisible==true){
			axios.get("match/getAllWithPlayerInf").then((response)=>{
				console.log(response)
				tableData.value=response.data.data.reverse();
			})
		}
	})
	
	const handleRegain=()=>{
		console.log("regain");
		axios.get("match/getAllWithPlayerInf").then((response)=>{
			console.log(response)
			tableData.value=response.data.data.reverse();
		})
	}
	
	const handleJoin=(id)=>{
		console.log(id)
		join_ref.value.match_id=id
		join_ref.value.joinVisible=true
	}
	const handleGetSpy=(id)=>{
		console.log(id)
		axios.get("player/getSpyIdPublicly?match_id="+id).then((response)=>{
			console.log(response)
			ElMessageBox.alert(response.data.data, 'Spy is:', {
			    confirmButtonText: 'Copy that!',
			})
		})
	}
	const handleVoteResult=(id)=>{
		console.log(id)
		result_ref.value.match_id=id
		result_ref.value.resultVisible=true
	}

	defineExpose({
	  matchVisible,
	})
</script>

<style>
	
</style>