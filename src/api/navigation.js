import axiosService from "../utils/axiosService";
import ViewComponentLoad from '../utils/ViewComponentLoad';
/**
 * 导航相关接口
 * @type {{get_lists()}}
 */
const navigation = {
    /**
     * 获取路由
     * @returns {Promise<unknown>}
     */
    getRoutes(){
        return new Promise((resolve, reject)=>{
            axiosService.getService().post('/Admin/Common/get_navigation').then((data)=>{
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
                resolve(data.data);
            }).catch((error)=>{
                reject(error);
            });
        })
    },
    /**
     * 获取导航列表
     * @returns {Promise<unknown>}
     */
    getLists(){
        return new Promise((resolve, reject)=>{
            axiosService.getService().post('/Admin/Navigation/lists').then((data)=>{
                resolve(data);
            }).catch((error)=>{
                reject(error);
            });
        });
    },
    /**
     * 添加导航
     * @param name
     * @param path
     * @param icon
     * @param component
     * @param hidden
     * @param redirect
     * @returns {Promise<unknown>}
     */
    addNavigation(name,path,icon,component,hidden,redirect)
    {
        return new Promise((resolve, reject)=>{
            axiosService.getService().post('/Admin/Navigation/create',{
                name,
                path,
                icon,
                component,
                hidden,
                redirect,
            }).then((data)=>{
                resolve(data);
            }).catch((error)=>{
                reject(error);
            });
        })
    },
    /**
     * 删除导航
     * @param ids
     * @returns {Promise<unknown>}
     */
    deleteNavigation(ids)
    {
        return new Promise((resolve, reject)=>{
            axiosService.getService().post('/Admin/Navigation/remove',{ids}).then((data)=>{
                resolve(data);
            }).then((error)=>{
                reject(error);
            });
        });
    }


};

export default navigation;
