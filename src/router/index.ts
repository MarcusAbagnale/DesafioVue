import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/produtos',
      name: 'produtos',
      component: () => import('../views/ProdutoList.vue')
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: () => import('../views/CategoriaList.vue')
    }
  ]
})

export default router
