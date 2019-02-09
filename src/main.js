import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import muse from './muse-ui.config.js'
import './assets/scss/_icon.scss'
import store from './store/index.js'

Vue.use(muse)

Vue.use(VueAxios,axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  render: h => h(App)
})

store.dispatch('homeajax',axios)
store.dispatch('ajaxrankinglist',{axios})
router.replace('/home')
