import { userInfo } from '@/service/api';
import store from '@/store';
import Home from '@/views/home/home';
import Vue from 'vue';
import VueRouter from 'vue-router';

// 按需加载，访问路径的时候才会加载，不访问，不加载
const Recipe = () => import('@/views/recipe/recipe');
const Login = () => import('@/views/user-login/index');
const Detail = () => import('@/views/detail/detail');
const Create = () => import('@/views/create/create');
const Edit = () => import('@/views/user-space/edit');

const Space = () => import( /* webpackChunkName: "space" */ '@/views/user-space/space');
const MenuList = () => import( /* webpackChunkName: "space" */ '@/views/user-space/menu-list');
const Fans = () => import( /* webpackChunkName: "space" */ '@/views/user-space/fans');

Vue.use(VueRouter)

const viewsRoute = [{
  path: '/recipe',
  name: 'recipe',
  title: '菜谱大全',
  component: Recipe,
}, {
  path: '/detail',
  name: 'detail',
  title: '菜谱细节',
  component: Detail
}, {
  path: '/create',
  name: 'create',
  title: '发布菜谱',
  component: Create,
  meta: {
    login: true
  }
}, {
  path: '/edit',
  title: '编辑个人资料',
  name: 'edit',
  meta: {
    login: true
  },
  component: Edit
}, {
  path: '/space',
  title: '个人空间',
  name: 'space',
  component: Space,
  redirect: {
    name: 'works'
  },
  meta: {
    login: true
  },
  children: [{
    path: 'works',
    name: 'works',
    title: '作品',
    component: MenuList,
    meta: {
      login: true
    }
  }, {
    path: 'fans',
    name: 'fans',
    title: '我的粉丝',
    component: Fans,
    meta: {
      login: true
    }
  }, {
    path: 'following',
    name: 'following',
    title: '我的关注',
    component: Fans,
    meta: {
      login: true
    }
  }, {
    path: 'collection',
    name: 'collection',
    title: '收藏',
    component: MenuList,
    meta: {
      login: true
    }
  }]
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
    meta: {
      login: true
    },
  }, ...viewsRoute, {
    path: '*',
    name: 'noFound',
    title: '未找到',
    redirect: {
      name: 'home'
    }
  }]
})


router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(item => item.meta.login) && (!from.matched.length || from.matched[0].path !== to.matched[0].path)) {
    console.log('路由守卫');
    if (token) {
      const res = await userInfo();
      if (res.error === 400) {
        localStorage.removeItem('token');
        store.commit('changeUserInfo', {});
        next({ name: 'login' });
        return
      } else {
        store.commit('changeUserInfo', res.data);
      }

      if (to.name === 'login') {
        next({ name: 'home' });
      } else {
        next();
      }
    } else {
      if (to.name === 'login') {
        next();
      } else {
        next({ name: 'login' });
      }
    }
  } else {
    next();
  }
})

export default router
