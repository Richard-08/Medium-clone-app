import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main'},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/new-post',
    name: 'Create-Post',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/CreatePost.vue')
  },
  {
    path: '/edit-post',
    name: 'Edit-Post',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/EditPost.vue')
  },
  {
    path: '/my-posts',
    name: 'My-Posts',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/MyPosts.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = store.state.user.role === 'writer';
  const requireAuth = to.matched.some(v => v.meta.auth);

  if (requireAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }
})

export default router
