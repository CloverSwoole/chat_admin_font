import Dashboard from "./../views/Dashboard";
import Delivery from "./../views/Delivery";
import Introduction from "./../views/Introduction";
import Buttons from "./../views/components/Buttons.vue";
import HoverButtons from "./../views/components/HoverButtons.vue";
import Alert from "./../views/components/Alert.vue";
import NavigationLists from "./../views/navigation/NavigationLists";
import NavigationAdd from "./../views/navigation/NavigationAdd";

/**
 * 组件
 * @type {{"@/views/navigation/NavigationLists.vue": *, "@/views/navigation/NavigationAdd.vue": *, "@/views/components/Alert.vue": *, ViewRoute: {render(*): *}, "@/views/Dashboard.vue": *, "@/views/Introduction.vue": *, "@/views/components/HoverButtons.vue": *, "@/views/components/Buttons.vue": *, "@/views/Delivery.vue": *}}
 */
const components = {
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
}
export default components;
