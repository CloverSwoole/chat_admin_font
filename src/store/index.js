import Vue from 'vue';
import Vuex from 'vuex';

/**
 * 应用模块
 */
import app from './modules/app';
/**
 * 用户模块
 */
import user from './modules/user';
/**
 * 导入许可
 */
import permission from './modules/permission';


import getters from './getters';

Vue.use(Vuex);
/**
 * Vuex
 * @type {Store|Store}
 */
const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  getters
});
/**
 * 导出store
 */
export default store
