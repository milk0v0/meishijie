import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from '@/views/home/Home.vue';

const Detail = () => import('@/views/detail/detail');

const Space = () => import( /* webpackChunkName: "space" */ '@/views/user-space/space');

const viewsRoute = [{
    path: '/detail',
    name: 'detail',
    title: '菜谱细节',
    component: Detail
}, {
    path: '/space',
    title: '个人空间',
    name: 'space',
    component: Space,
}]

const router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'home',
        title: '首页',
        component: Home,
    },
    ...viewsRoute]
})

export default router;