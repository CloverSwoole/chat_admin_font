import Vue from 'vue';
import App from './App';
/**
 * 导入路由
 */
import router from './router';
import store from './store';
/**
 * mockjs
 */
import './mock/index.js';  // 该项目所有请求使用mockjs模拟
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


