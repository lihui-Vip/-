<template>
  <div class="main">
    <p>
      <a href="/seeding.html?entryType=1">禾苗翻倍活动</a>
    </p>
    <p>
      Hello,My name is {{userName}}
    </p>
    <div @click="goTwo">跳转到第二个页面</div>
    <br>
    <div @click="closePage">关闭页面</div>
    <a href="aaa.html">goAAA</a>
    <div>本页面调用了接管导航</div>
    <div>修改了title</div>
  </div>
</template>

<script type="text/javascript">
import useStyle from '$lib/mixins/use-style';

import ajax from '$lib/common/config';
import setUid from '$lib/common/setUid';
import appHandler from '$lib/common/appHandler';
import '$lib/common/public';

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
    async getUser() {
      const { data } = await this.dataApi.post();
      this.userName = data;
      // this.$toast('Upload Complete');
      // this.$messagebox({ message: '确定执行此操作1?', showCancelButton: true });
      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'snake',
      });
      setTimeout(() => {
        this.$indicator.close();
        this.$messagebox.alert('adasfasdf');
        // this.$indicator.close();
      }, 500);
    },
    goTwo() {

      this.$router.push({ path: '/two' });
    },
    closePage() {
      appHandler.closeWebPage();
    },
  },
  created() {
  },
  mounted() {
    // document.title = '第1页修改成功';
    appHandler.modifyTitle('第1页修改成功');
    setUid.setAuth('aaa', 'bbb');
    // this.getUser();
    appHandler.isShowShareBtn(true);
    appHandler.closeBtnHandler();
    appHandler.isShowCloseBtn(false);
  },
};
</script>
