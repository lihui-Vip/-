<template>
  <div class="main">
    <img class="bg1"
         src="~$res/images/seeding/seed-bg1.png"
         alt="">
    <div class="rule-box">
      <div class="act-obj">活动对象：</div>
      <div>2018年9月26日之前已提交资料，但未上传身份证明的用户。</div>
      <div class="rule-title">如何获取奖励？</div>
      <div class="mb45">1. 按照认证步骤，完善资料并上传身份证明材料，进行提交，审核通过，即为认证成功，系统即会发放常规认证奖励500禾苗。 </div>
      <div class="mb45">2. 凡在9月26日-9月28日活动期间提交身份证明材料，且审核通过用户，可添加禾医助客服微信：13588265934，将“我的”页面截图+手机号发送给客服，客服核实之后，将在1个工作日内，将额外的500禾苗奖励发送至您的账户。</div>
      <div class="mb45">3. 如奖励没有在规定时间内到账，请联系禾医助客服微信。</div>
      <div>4. 同一手机号、同一认证资料的情形，均视为同一用户，如重复提交认证资料者，不予再次发放奖励。</div>
    </div>
    <img class="bg2"
         src="~$res/images/seeding/seed-bg2.png"
         alt="">
    <div class="btn-mask">
      <div class="btn"
           @click="getSeeding">去认证，领1000禾苗</div>
    </div>
  </div>
</template>

<script type="text/javascript">
import publicFuc from '$lib/utils/common';
import ajax from '$lib/common/config';
import useStyle from '$lib/mixins/use-style';
import appHandler from '$lib/common/appHandler';
import { MessageBox } from 'mint-ui';
import style from './css';

export default {
  mixins: [
    useStyle(style),
  ],
  data() {
    return {
      uid: '',
      token: '',
      authStates: '',
      userInfoApi: ajax({
        url: () => `/v3/user/${this.uid}`,
        idType: 1,
      }),
      helianShare: publicFuc.getUrlParam('helian_share'),
    };
  },
  watch: {
  },
  components: {
  },
  methods: {
    getUserInfo(type) {
      this.userInfoApi.fetch().then(res => {
        this.authStates = res.result.authStates;
        if (type !== 3) {
          this.goProcess(type);
        }
      });
    },
    goProcess(type) {
      if (this.authStates === 'authfatal' || !this.authStates || this.authStates === 'unauth') {
        if (type !== 1) {
          appHandler.auth();
        }
        publicFuc.sendLog(`hmfb9_hdzy_wrzclick_c_${this.uid}`);
        return false;
      } else if (this.authStates === 'authing') {
        publicFuc.sendLog('hmfb9_hdzy_shzclick_e');
        MessageBox.alert('您已提交过认证资料，暂时不能参加此次活动哦~');
        return false;
      } else if (this.authStates === 'authed') {
        MessageBox.alert('您是已认证用户，不能参加此活动哦~');
        publicFuc.sendLog('hmfb9_hdzy_yrzclick_d');
      }
    },
    getSeeding() {
      if (this.helianShare === '1') {
        publicFuc.Open_app();
        return false;
      }
      publicFuc.sendLog('hmfb9_hdzy_totalclick_b');
      if (!this.uid) {
        appHandler.login(this, () => {
          this.getUserInfo(1);
          return false;
        });
      } else {
        this.goProcess(2);
      }
    },
  },
  created() {
  },
  mounted() {
    const entryType = publicFuc.getUrlParam('entryType');
    if (this.helianShare === '1') {
      publicFuc.sendLog(entryType);
      publicFuc.sendLog('hmfb9_hdzy_jr_a');
    } else {
      appHandler.getUserId(this, () => {
        if (this.uid) {
          this.getUserInfo(3);
        }
        if (entryType) {
          publicFuc.sendLog(entryType);
        }
        publicFuc.sendLog('hmfb9_hdzy_jr_a');
      });
    }
  },
};
</script>
