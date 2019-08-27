import router from './router'
import store from './store'
/**
 * Progress 进度条
 */
import NProgress from 'nprogress'
/**
 * Progress 进度条样式
 */
import 'nprogress/nprogress.css'
// permissiom judge
function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
    if (!permissionRoles) return true
    return roles.some(role => permissionRoles.indexOf(role) >= 0)
}


/**
 * 路由拦截器
 */
router.beforeEach((to, from, next) => {
    /**
     * 开启Progress 进度条
     */
    NProgress.start();
    /**
     * 判断admin-token 是否已经获取过了
     */
    if (window.localStorage.getItem('admin-token')==null && to.fullPath != '/login') {
        next({path: '/login'});
        /**
         * 结束进度条
         */
        NProgress.done();
        return;
    }
    if(store.getters.addRouters.length <= 0){
        /**
         * 生成可访问的路由表
         */
        store.dispatch('GenerateRoutes', {}).then(() => {
            /**
             * 动态添加可访问路由表
             */
            router.addRoutes(store.getters.addRouters);
            next({...to});
        }).catch(() => {
            store.dispatch('FedLogOut').then(() => {
                next({ path: '/login' })
            })
        })
    }else{
        store.dispatch('getNowRoutes', to);
        next();
    }
})
/**
 * 导航守卫 用于处理进度条
 */
router.afterEach(() => {
    /**
     * 结束进度条
     */
    NProgress.done();
})
