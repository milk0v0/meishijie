import Home from '@/views/home/home';
import Vue from 'vue';
import VueRouter from 'vue-router';

// 按需加载，访问路径的时候才会加载，不访问，不加载
const Recipe = () => import('@/views/recipe/recipe');
const Login = () => import('@/views/user-login/index');

Vue.use(VueRouter)

const viewsRoute = [{
  path: '/recipe',
  name: 'recipe',
  title: '菜谱大全',
  component: Recipe,
}]

const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/login',
    name: 'login',
    title: '登录页',
    component: Login,
  }, ...viewsRoute, {
    path: '*',
    name: 'noFound',
    title: '未找到',
    component: Home,
  }]
})

export default router
