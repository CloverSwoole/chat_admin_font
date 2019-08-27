import Vue from 'vue';
import Router from 'vue-router';
/**
 * 登录页面
 */
import login from "./../views/login/index";
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
        component: login,
        hidden: true
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
