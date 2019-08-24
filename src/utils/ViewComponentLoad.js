import Full from "./../containers/Full";
import Dashboard from "./../views/Dashboard";
import Delivery from "./../views/Delivery";
import Introduction from "./../views/Introduction";
import Buttons from "./../views/components/Buttons.vue";
import HoverButtons from "./../views/components/HoverButtons.vue";
import Alert from "./../views/components/Alert.vue";
import NavigationLists from "./../views/navigation/NavigationLists";
import NavigationAdd from "./../views/navigation/NavigationAdd";

/**
 * View 组件加载器
 * @type {{lists: {"@/containers/Full.vue": {name, components, computed}, "@/views/Dashboard.vue": {components, name, data, methods, mounted}, "@/views/Delivery.vue": {name, data, created, methods}, "@/views/Introduction.vue": {components, name, data, methods, mounted}, "@/views/components/Buttons.vue": {name, data, methods}, "@/views/components/HoverButtons.vue": {name, components}, ViewRoute: {render(*): *}}, getComment: ViewComponentLoad.getComment}}
 */
const ViewComponentLoad = {
    lists: {
        "@/containers/Full.vue": Full, // 主一级导航
        "@/views/Dashboard.vue": Dashboard, // 主一级导航的控制台
        "@/views/Delivery.vue": Delivery, // 运费模板
        "@/views/Introduction.vue": Introduction, // 介绍页面
        "@/views/components/Buttons.vue": Buttons, // 按钮组件
        '@/views/components/HoverButtons.vue':HoverButtons, // 悬停特效按钮
        '@/views/components/Alert.vue':Alert, // Alert警告提示
        '@/views/navigation/NavigationLists.vue':NavigationLists, // 导航列表
        '@/views/navigation/NavigationAdd.vue':NavigationAdd, // 添加导航
        "ViewRoute": {
            render(c) {
                return c('router-view')
            }
        },
    },
    /**
     * 获取组件
     * @param name
     */
    getComment: function (name) {
        if (typeof this.lists[name] != "undefined") {
            return this.lists[name];
        } else {
            return false;
        }
    },
}

export default ViewComponentLoad;
