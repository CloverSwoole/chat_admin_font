import Vue from 'vue';
import Vuex from 'vuex';




import app from './modules/app';
import user from './modules/user';
/**
 * 导入许可
 */
import permission from './modules/permission';


import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  getters
});

export default store
