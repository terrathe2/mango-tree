// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import vuefire from 'vuefire'

Vue.use(firebase)
Vue.use(vuefire)

var config = {
  apiKey: 'AIzaSyCj_TuXjyQymYyD_HLiYzhAF8kAhY4w1Zk',
  databaseURL: 'https://one-for-all-b4f1e.firebaseio.com',
  projectId: 'one-for-all-b4f1e'
}

firebase.initializeApp(config)

Vue.prototype.$db = firebase.database()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
