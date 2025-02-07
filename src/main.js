import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/index.css'
import 'element-plus/dist/index.css';
import App from './App.vue'
import router from './router'
import piniaPersist from 'pinia-plugin-persist'
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia)
app.use(router)

app.mount('#app')
