import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/views/SigninView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignupView.vue')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('@/views/ShopView.vue')
  },
  {
    path: '/community',
    name: 'community',
    component: () => import('@/views/CommunityView.vue')
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: () => import('@/views/MypageView.vue')
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('@/views/RankingView.vue')
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('@/views/GameView.vue')
  },
  {
    path: '/gear',
    name: 'gear',
    component: () => import('@/views/GearView.vue')
  },
  {
    path: '/password',
    name: 'password',
    component: () => import('@/views/PwView.vue')
  },
  {
    path: '/post',
    name: 'post',
    component: () => import('@/views/PostView.vue')
  },
  {
    path: '/postdetail/:id',
    name: 'postdetail',
    component: () => import('@/views/PostReadView.vue')
  },
  {
    path: '/postupdate/:id',
    name: 'postupdate',
    component: () => import('@/views/PostUpdateView.vue')
  },
  {
    path: '*',
    name: 'gohome',
    component: () => import('@/components/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
