import { createRouter,createWebHistory } from "vue-router";

import loginVue from '@/views/Login.vue'
import layoutVue from '@/views/Layout.vue'

import ArticleCategoryVue from '@/views/article/ArticleCategory.vue'
import ArticleManageVue from '@/views/article/ArticleManage.vue'
import UserInfoVue from '@/views/user/UserInfo.vue'
import UserAvatarVue from '@/views/user/UserAvatar.vue'
import UserResetPasswordVue from '@/views/user/UserResetPassword.vue'

const routes = [
    { path: '/login', component: loginVue},
    { path: '/', component: layoutVue, redirect: '/article/manage', children: [
        { path: '/article/category', component: ArticleCategoryVue },
        { path: 'article/manage', component: ArticleManageVue },
        { path: '/user/info', component: UserInfoVue},
        { path: '/user/avatar', component: UserAvatarVue},
        { path: '/user/password', component:UserResetPasswordVue},
    ]}
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router