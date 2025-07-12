import '@/assets/main.css'
import { createApp, type Component } from 'vue'

export function createPage(page: Component) {
  createApp(page).mount('#app')
}
