<template>
  <div class="main">
    第二个页面
    <!-- <div @click="goFirst">跳转到第一个页面</div> -->
  </div>
</template>

<script type="text/javascript">
import useStyle from '$lib/mixins/use-style';

import ajax from '$lib/common/config';
import appHandler from '$lib/common/appHandler';

import style from './css';

export default {
  mixins: [
    useStyle(style),
  ],
  data() {
    return {
      dataApi: ajax({
        url: '/getUser',
        id: 1,
      }),
      userName: '',
    };
  },
  watch: {

  },
  components: {
  },
  methods: {
    goFirst() {
      // location.herf = window;
    },
  },
  created() {
  },
  mounted() {
    appHandler.isShowCloseBtn(true);
    appHandler.isShowShareBtn(false);
    // document.title = '123';
    appHandler.modifyTitle('第二页修改成功');
  },
};
</script>
