import Vue from 'vue';
import content from './index.vue';
import '$lib/common/exception';
new Vue({
  render: h => h(content),
}).$mount('#app');
