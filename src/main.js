import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 配置axios
// import * as Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL = 'https://back.csgospy.youngfog.cn/'

//icons-vue
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(VueAxios,axios).provide('axios',app.config.globalProperties.axios).mount('#app')