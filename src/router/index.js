import Vue from 'vue';
import Router from 'vue-router';
/**
 * 引入方法
 */
const _import = require('./_import_' + process.env.NODE_ENV);
/**
 * Views - Error Pages
 */
import Page404 from '@/views/errorPages/Page404'
import Page500 from '@/views/errorPages/Page500'
/**
 * Master
 */
import Full from '@/containers/Full';
/**
 * 登录页面
 */
const Login = _import('login/index');
/**
 * 引用vue
 */
Vue.use(Router);
/**
 * 路由组
 * @type {*[]}
 */
export const constantRouterMap = [
    /**
     * 登录页面
     */
    {
        path: '/login',
        component: Login,
        hidden: true
    },
    {
        path: '/',
        // redirect: '/dashboard',
        name: '首页',
        component: Full,
        hidden: false,
    },
    /**
     * 错误页面
     */
    {
        path: '/pages', redirect: '/pages/p404', name: 'Pages',
        component: {
            render(c) {
                return c('router-view')
            }
            // Full,
        },
        children: [
            {
                path: '404',
                name: 'Page404',
                component: _import('errorPages/Page404')
            },
            {
                path: '500',
                name: 'Page500',
                component: _import('errorPages/Page404')
            },
        ]
    }
];
/**
 * 导出路由
 */
export default new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
});
