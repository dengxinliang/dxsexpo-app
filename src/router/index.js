import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/components/Layout'

const routes = [
    {
        path: '/',
        name: 'layout',
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: 'home',
                name: 'home',
                meta: {
                    title: '首页',
                    active: 'home'
                },
                component: () => import('@/views/home')
            },
            {
                path: 'exhibition-plan',
                name: 'plan',
                meta: {
                    title: '展览计划',
                    active: 'exhibition-plan'
                },
                component: () => import('@/views/plan')
            },
            {
                path: 'exhibition-plan-detail',
                name: 'planDetail',
                meta: {
                    title: '计划详情',
                    active: 'exhibition-plan'
                },
                component: () => import('@/views/plan/detail')
            },
            {
                path: 'exhibition-scene',
                name: 'scene',
                meta: {
                    title: '展会现场',
                    active: 'exhibition-scene'
                },
                component: () => import('@/views/scene')
            },
            {
                path: 'exhibition-scene-detail',
                name: 'sceneDetail',
                meta: {
                    title: '现场详情',
                    active: 'exhibition-scene'
                },
                component: () => import('@/views/scene/detail')
            },
            {
                path: 'exhibition-guide',
                name: 'guide',
                meta: {
                    title: '参展指南',
                    active: 'exhibition-guide'
                },
                component: () => import('@/views/guide')
            },
            {
                path: 'about',
                name: 'about',
                meta: {
                    title: '关于我们',
                    active: 'about'
                },
                component: () => import('@/views/about')
            }
        ]
    }
]
const router = createRouter({
    history: createWebHistory('dxsexpo-app'),
    // history: createWebHistory(),
    scrollBehavior: () => ({ y: 0 }),
    routes
})

export default router