import Vue from 'vue';
import App from './App';
/**
 * 导入路由
 */
import router from './router';
/**
 * 引入Vuex
 */
import store from './store';
/**
 * 废弃
 */
import './login.js'
/**
 * UI
 */
import './ui.js'

/**
 * 提示
 * @type {boolean}
 */
Vue.config.productionTip = true;
/**
 * 运行
 */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


