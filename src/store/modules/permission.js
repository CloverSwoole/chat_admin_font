/**
 * 导入异步路由及静态路由
 */
import {constantRouterMap} from 'src/router';

/**
 * 导入axios
 */
import axiosService from "./../../utils/axiosService";
/**
 * 页面组件加载
 */
import ViewComponentLoad from "./../../utils/ViewComponentLoad";

function getNowRouter(asyncRouterMap, to) {
    return asyncRouterMap.some(route => {
        if (to.path.indexOf(route.path) !== -1) {
            return true;
        }
        else if (route.children && route.children.length) { //如果有孩子就遍历孩子
            return getNowRouter(route.children, to)
        }
    })

}

/**
 * 许可导航
 * @type {{mutations: {SET_ROUTERS: permission.mutations.SET_ROUTERS, SET_NOW_ROUTERS: permission.mutations.SET_NOW_ROUTERS}, state: {siderbar_routers: [], routers: *, addRouters: []}, actions: {getNowRoutes({commit: *}, *=): *, GenerateRoutes({commit?: *}, *): *}}}
 */
const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: [],
        siderbar_routers: [],
    },
    /**
     * 变化
     */
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.siderbar_routers = routers;
            state.routers = constantRouterMap.concat(routers);
            // state.routers.forEach(function(e){
            //     if(e.name==="首页"){
            //     state.siderbar_routers=e;

            //     }

            // })

        },
        SET_NOW_ROUTERS: (state, to) => {


            // 递归访问 accessedRouters，找到包含to 的那个路由对象，设置给siderbar_routers
            // console.log(state.addRouters)
            state.addRouters.forEach(e => {
                if (e.children && e.children.length) {
                    if (getNowRouter(e.children, to) === true)
                        state.siderbar_routers = e;
                }

            })


        }

    },
    /**
     * 操作
     */
    actions: {
        /**
         * 生成路由
         * @param commit
         * @param data
         * @returns {Promise<unknown>}
         * @constructor
         */
        GenerateRoutes({commit}, data) {
            return new Promise(resolve => {
                /**
                 * 获取异步路由
                 */
                axiosService.getService().post('/Admin/Common/get_navigation').then((data) => {
                    /**
                     * 处理component
                     */
                    for (var i in data.data){
                        data.data[i].hidden = data.data[i].hidden==1?true:false;
                        data.data[i].component = ViewComponentLoad.getComment(data.data[i].component);

                        for( var ci in data.data[i].children){
                            data.data[i].children[ci].hidden = data.data[i].children[ci].hidden==1?true:false;
                            data.data[i].children[ci].component = ViewComponentLoad.getComment(data.data[i].children[ci].component);

                            for(var cci in data.data[i].children[ci].children){
                                data.data[i].children[ci].children[cci].hidden = data.data[i].children[ci].children[cci].hidden==1?true:false;
                                data.data[i].children[ci].children[cci].component = ViewComponentLoad.getComment(data.data[i].children[ci].children[cci].component);
                            }
                        }
                    }
                    commit('SET_ROUTERS', data.data);
                    resolve();
                });
            })
        },
        /**
         * 获取路由
         * @param commit
         * @param data
         * @returns {Promise<unknown>}
         */
        getNowRoutes({commit}, data) {
            return new Promise(resolve => {
                //data => to
                commit('SET_NOW_ROUTERS', data);
                resolve();
            })
        },
    },
};
/**
 * 导出导航许可
 */
export default permission;
