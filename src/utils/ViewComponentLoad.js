import components from "../router/components";

/**
 * View 组件加载器
 * @type {{components: *, getComment: ViewComponentLoad.getComment}}
 */
const ViewComponentLoad = {
    components: components,
    /**
     * 获取组件
     * @param name
     */
    getComment: function (name) {
        if (typeof this.components[name] != "undefined") {
            return this.components[name];
        } else {
            return false;
        }
    },
}

export default ViewComponentLoad;
