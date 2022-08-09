<template>
	<div id='dev_main'>
		<el-dialog v-model="devVisible" :close-on-click-modal ="false" width='800px'>
			<h2>YoungFog's Console</h2>
			<h3 style="color:gray;margin-top: 30px;">New Match</h3>
			<el-row class="create_match" justify="center" style="margin-top: 20px;" align="middle">
				<el-col :span="9" style="border-radius: 20px;">
					<el-input readonly v-model="match_id_recent" placeholder="Your match ID will be generated here" />
				</el-col>
			    <el-col :span="6">
					<el-button @click="create_click" type="primary" color="#626aef" round size="large">
						New a match</el-button>
				</el-col>
			</el-row>
			<h3 style="color:gray;margin-top: 30px;">Change Status</h3>
			<el-row class="change_status_input" justify="center" style="margin-top: 20px;" align="middle">
			  	<el-col :span="14" style="border-radius: 20px;">
			  		<el-input v-model="match_id_input" clearable placeholder="Input a match_id to change its status" />
			  	</el-col>
			</el-row>
			<el-row class="change_status_buttons" justify="center" style="margin-top: 25px;margin-bottom: 40px;" align="middle">
			  	<el-col :span="6">
			  		<el-button @click="start_click" type="success" round size="large">
			  			Start The Game</el-button>
			  	</el-col>
				<el-col :span="6">
					<el-button @click="end_click" type="danger" round size="large">
						End The Game</el-button>
				</el-col>
			</el-row>
		</el-dialog>
	</div>
</template>

<script setup>
	import { ref,inject,watch } from "vue"
	const axios = inject('axios')
	const devVisible=ref(false)
	const match_id_recent=ref(null)
	const match_id_input=ref(null)
	
	defineExpose({
	  devVisible,
	})
	
	const create_click=()=>{
		axios.get("match/create").then((response)=>{
			if(response.data.data==null){
				ElNotification({
				    title: '创建失败',
				    message: '请勿在短时间内频繁生成新比赛！',
				    type: 'warning',
				  })
			}
			else{
				match_id_recent.value=response.data.data
				ElNotification({
				    title: '成功创建',
				    message: '比赛代码为'+response.data.data+',快叫上你的小伙伴一起玩吧！',
				    type: 'success',
				  })
			}
			console.log(response)
		})
	}
	
	const start_click=()=>{
		axios.get("match/start",{params:{
			match_id:match_id_input.value
		}}).then((response)=>{
			if(response.data.code!=200){
				ElNotification({
				    title: '无法开始比赛',
				    message: response.data.msg,
				    type: 'warning',
				  })
			}
			else{
				ElNotification({
				    title: '比赛已成功开始',
				    message: response.data.msg,
				    type: 'success',
				  })
			}
			console.log(response)
		})
	}
	
	const end_click=()=>{
		axios.get("match/end",{params:{
			match_id:match_id_input.value
		}}).then((response)=>{
			if(response.data.code!=200){
				ElNotification({
				    title: '无法结束比赛',
				    message: response.data.msg,
				    type: 'warning',
				  })
			}
			else{
				ElNotification({
				    title: '比赛已成功结束',
				    message: response.data.msg,
				    type: 'success',
				  })
			}
			console.log(response)
		})
	}
	
	watch(devVisible, async (newDevVisible, oldDevVisible) => {
		if(newDevVisible==false){
			match_id_recent.value=null;
			match_id_input.value=null;
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