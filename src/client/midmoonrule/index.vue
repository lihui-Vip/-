<template>
  <div class="main">
    <div class="font-bold mb40">1.活动奖品：</div>
    <div class="fs30">1）特等奖（第1名）：</div>
    <div class="gift-box">
      <img src="~$res/images/midmoon/mid-gift1.png"
           alt="">
      <span>500元 京东e卡中秋节礼品卡</span>
    </div>
    <div class="fs30">2）一等奖（第2名至第4名）：</div>
    <div class="gift-box">
      <img src="~$res/images/midmoon/mid-gift2.png"
           alt="">
      <span>299元 九阳全自动豆浆机</span>
    </div>
    <div class="fs30">3）二等奖（第5名至第10名）：</div>
    <div class="gift-box">
      <img src="~$res/images/midmoon/mid-gift3.png"
           alt="">
      <span>188元 三只松鼠中秋坚果礼包</span>
    </div>
    <div class="fs30">4）三等奖（第11名至第20名）：</div>
    <div class="gift-box">
      <img src="~$res/images/midmoon/mid-gift4.png"
           alt="">
      <span>79元 颈椎按摩枕</span>
    </div>
    <div class="fs30">5）参与奖：</div>
    <div class="font-bold mb60">赏到圆月的用户均可获得100禾苗</div>
    <div class="mb60">
      <span class="font-bold">2.活动时间：</span>
      <span>2018年9月22日-2018年9月24日；</span>
    </div>
    <div class="mb60">
      <span class="font-bold">3.活动对象：</span>
      <span>禾医助认证用户；</span>
    </div>
    <div class="font-bold mb20">4.参与方式：</div>
    <div class="type">
      <span>1）</span>点击【答题赏圆月】按钮答题，5道题全答对 则答题成功、可赏到圆月；有1题答错则答题 失败，不能赏到圆月。
    </div>
    <div class="type">
      <span>2）</span>当天每个用户最多只能答题3次。
    </div>
    <div class="type mb50"><span>3）</span>参与用户的排名会被刷新，最终只保留答对5 题最短用时的排名。</div>
    <div class="mb60">
      <span class="font-bold">5.获奖名单公布：</span>
      <span>2018年9月25日；</span>
    </div>
    <div class="font-bold">6.奖品发放：</div>
    <div class="mb50 pl10">获奖名单公布后3个工作日内寄出，请添加客服 微信领取奖品，微信号：13588265934；</div>
    <div class="font-bold">7.本活动最终解释权归禾医助所有，有任何疑 问，请添加上方客服微信咨询。</div>
  </div>
</template>

<script type="text/javascript">
import '$lib/utils/common';
import useStyle from '$lib/mixins/use-style';
import appHandler from '$lib/common/appHandler';
import style from './css';

export default {
  mixins: [
    useStyle(style),
  ],
  data() {
    return {
    };
  },
  watch: {
  },
  components: {
  },
  methods: {
  },
  created() {
  },
  mounted() {
    appHandler.isShowShareBtn(false);
  },
};
</script>
