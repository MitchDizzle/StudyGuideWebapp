import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import StudyView from '@/views/StudyView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/study',
    name: 'study',
    component: StudyView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
