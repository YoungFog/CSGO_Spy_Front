<script setup>
	import Home from './components/Home.vue'
	
	import { reactive } from 'vue'
	const config = reactive({
	  autoInsertSpace: true,
	})
</script>

<template>
	<el-config-provider :button="config">
		<Home></Home>
	</el-config-provider>
</template>

<style>
#app {
 font-family: 'Microsoft YaHei', '微软雅黑',Arial,'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
	   sans-serif;
/*  font-family: Avenir, Helvetica, Arial, sans-serif; */
/*  font-family: Microsoft Yahei, PingFang SC, Arial; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
}
</style>
