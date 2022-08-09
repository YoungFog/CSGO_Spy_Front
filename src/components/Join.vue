<template>
	<div id='join_main'>
		<el-dialog v-model="joinVisible" :close-on-click-modal ="false">
			<h2>报名</h2>
			
			<el-row class="match_id_container" justify="center" style="margin-top: 40px;" align="middle">
				<el-col :span="4">
					<h4 style="color:gray;">比赛编号：</h4>
				</el-col>
				<el-col :span="7">
					<el-input readonly v-model="match_id" placeholder="match_id" />
				</el-col>
			</el-row>
			<el-row class="team_container" justify="center" style="margin-top: 10px;" align="middle">
				<el-col :span="4">
					<h4 style="color:gray;">你的队伍：</h4>
				</el-col>
				<el-col :span="7">
					<el-select v-model="team" placeholder="选择队伍">
						<el-option label="A队" value="A队"></el-option>
						<el-option label="B队" value="B队"></el-option>
					</el-select>
				</el-col>
			</el-row>
			<el-row class="name_container" justify="center" style="margin-top: 10px;" align="middle">
				<el-col :span="4">
					<h4 style="color:gray;">你的姓名：</h4>
				</el-col>
				<el-col :span="7">
					<el-select v-model="name" placeholder="选择名字">
						<el-option 
						v-for="(name_op,index) in nameData"
						:name_op="name_op"
						:index="index"
						:label="name_op"
						:value="name_op"
						></el-option>
					</el-select>
				</el-col>
			</el-row>
			<el-button @click="handleJoin" type="primary" color="#626aef" round 
			style="margin-top: 30px; margin-bottom: 20px; font-weight: bold;width: 110px;height: 40px;">
			参加比赛</el-button>
		</el-dialog>
	</div>
</template>

<script setup>
	import { ref,inject,watch } from "vue"
	const axios = inject('axios')
	const joinVisible=ref(false)
	const match_id=ref(null)
	const name=ref(null)
	const team=ref(null)
	const nameData=ref([]);
	
	defineExpose({
	  joinVisible,
	  match_id,
	})
	
	const emit = defineEmits(['regain'])
	
	const handleJoin=()=>{
		axios.get("player/addPlayer",{params:{
			match_id:match_id.value,
			team:team.value,
			name:name.value
		}}).then((response)=>{
			console.log(response)
			if(response.data.code!=200){
				ElNotification({
				    title: '参加失败',
				    message: response.data.msg,
				    type: 'warning',
				})
			}
			else{
				ElNotification({
				    title: '参加成功',
				    message: "恭喜你成功参加比赛，你的队内编号为"+response.data.data+"，请一定要复制保存！",
				    type: 'success',
					duration: 0,
				})
				emit("regain")
				joinVisible.value=false
			}
		})
	}
	
	watch(joinVisible, async (newJoinVisible, oldJoinVisible) => {
		if(newJoinVisible==true){
			axios.get("getNames").then((response)=>{
				console.log(response)
				nameData.value=response.data.data;
			})
		}
		else{
			name.value=null;
			match_id.value=null;
			team.value=null;
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