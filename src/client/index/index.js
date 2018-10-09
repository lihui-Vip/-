import Vue from 'vue';
import MintUI from 'mint-ui';
import Router from 'vue-router';
// import 'mint-ui/lib/style.css';

import content from './index.vue';
import first from './first';
import two from './two';
import '$lib/common/exception';

Vue.use(MintUI);
Vue.use(Router);

const router = new Router({
  routes: [
    { path: '/', component: first },
    { path: '/two', component: two },
    // { path: '/city/:pcode', component: city },
    // { path: '/hospital/:ccode', component: hospital },
    // { path: '/choosePosition/:levels', component: choosePosition },
    // { path: '/backFlowBigImage', component: backFlowBigImage },
    // { path: '/selectDepartments/:whereCome', component: selectDepartments },
  ],
});

new Vue({
  router,
  render: h => h(content),
}).$mount('#app');
