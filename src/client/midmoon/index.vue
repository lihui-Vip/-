<template>
  <div class="main">
    <div class="animationbox">
      <div class="head"
           @click="goRule">活动规则</div>
      <div v-if="isActivityIng&&!myBestRank"
           class="img"></div>
      <div v-else
           class="allMoon"></div>
      <div class="text"></div>
      <div v-if="isActivityIng"
           class="title">答对5道题，月亮就会变圆哦～</div>
      <div v-else
           class="title">本次活动已结束，感谢小伙伴们的参与</div>
    </div>
    <div class="listbox">
      <div v-if="isActivityIng"
           class="question"
           @click="verification('answer')">
        <span v-if="todayAnswerTimes === 0">答题赏圆月</span>
        <span v-else>再次挑战</span>
      </div>
      <div v-else
           class="question seeDetail"
           @click="verification('list')">查看参与详情</div>
      <div class="head">
        <div class="headdown">
        </div>
        <div class="headtop">
        </div>
        <div v-if="isActivityIng"
             class="headlogo">
        </div>
        <div v-else
             class="headlogo winnerlogo"></div>
      </div>
      <div class="list"
           v-if="isActivityIng && isShowPage">
        <ul>
          <li class="min"
              v-if="myBestRank">
            <span class="top"
                  :class="{'top1':myBestRank.ranking===1,'top2':myBestRank.ranking>=2&&myBestRank.ranking<=4,'top3':myBestRank.ranking>=5&&myBestRank.ranking<11,'top4':myBestRank.ranking>=11&&myBestRank.ranking<21}">
              {{myBestRank.ranking}}
            </span>
            <span class="img">
              <img v-if="myBestRank.userInfo.avatar"
                   :src="myBestRank.userInfo.avatar | avatar"
                   alt="">
              <img v-else
                   src="//doctor.helianhealth.com/images/icon_touxiang_da.png">
            </span>
            <span class="name">{{myBestRank.userInfo.userName}}</span>
            <span class="right">{{myBestRank.time | formatTime}}</span>
          </li>
          <li :key="index"
              v-for="(v,index) in allRank">
            <span class="top"
                  :class="{'top1':index===0,'top2':index>=1&&index<=3,'top3':index>=4&&index<=10}">
              {{index+1}}
            </span>
            <span class="img">
              <img v-if="v.userInfo.avatar"
                   :src="v.userInfo.avatar | avatar"
                   alt="">
              <img v-else
                   src="//doctor.helianhealth.com/images/icon_touxiang_da.png">
            </span>
            <span class="name">{{v.userInfo.userName}}</span>
            <span class="right">{{v.time | formatTime}}</span>
          </li>
        </ul>
        <div class="btn"
             @click="seeList">
          <span class="text">
            查看更多
            <i class="arrow"></i>
          </span>
        </div>
      </div>
      <div class="winnerList"
           v-if="!isActivityIng && isShowPage">
        <ul>
          <div class="item-box"
               :key="index"
               :class="{'no-border': index===0 ||index===3||index===9}"
               v-for="(v,index) in allRank">
            <div v-if="index === 0"
                 class="prize-title">特等奖</div>
            <div v-if="index === 1"
                 class="prize-title">一等奖</div>
            <div v-if="index === 4"
                 class="prize-title">二等奖</div>
            <div v-if="index === 10"
                 class="prize-title">三等奖</div>
            <li>
              <span class="top"
                    :class="{'top1':index===0,'top2':index>=1&&index<=3,'top3':index>=4&&index<10,'top4':index>=10&&index<20}">
                {{index+1}}
              </span>
              <span class="img">
                <img v-if="v.userInfo.avatar"
                     :src="v.userInfo.avatar | avatar"
                     alt="">
                <img v-else
                     src="//doctor.helianhealth.com/images/icon_touxiang_da.png">
              </span>
              <span class="name">{{v.userInfo.userName}}</span>
              <span class="right">{{v.time | formatTime}}</span>
            </li>
          </div>
        </ul>
      </div>
    </div>
    <div class="mask"
         v-if="isShowShare"></div>
    <share v-if="isShowShare"
           :message="message"
           @hideShare="hideShare"
           @shareSuc='shareSuc' />
  </div>
</template>

<script type="text/javascript">
import publicFuc from '$lib/utils/common';
import appHandler from '$lib/common/appHandler';
import ajax from '$lib/common/config';
import share from '$lib/components/share';
// import setUid from '$lib/common/setUid';
import { Toast, MessageBox, Indicator } from 'mint-ui';
import useStyle from '$lib/mixins/use-style';
import style from './css';

export default {
  mixins: [
    useStyle(style),
  ],
  data() {
    return {
      dataApi: ajax({
        url: '/operation/festival/moon/home',
        page: 1,
        limit: () => this.limit,
      }),
      checkTimeApi: ajax({
        url: '/operation/festival/moon/checkTime',
      }),
      shareCountApi: ajax({
        url: '/operation/festival/moon/countTodayShare',
      }),
      shareApi: ajax({
        url: '/operation/festival/moon/share',
      }),
      userInfoApi: ajax({
        url: () => `/v3/user/${this.uid}`,
        idType: 1,
      }),
      limit: 5,
      shareCount: 0,
      todayAnswerTimes: 0,
      allRank: [],
      myBestRank: null,
      uid: '',
      token: '',
      isActivityIng: true,
      message: {},
      isShowShare: false,
      authStates: '',
      isShowPage: false,
      getUserInfoIng: false,
      getShareCountIng: false,
      helianShare: publicFuc.getUrlParam('helian_share'),
    };
  },
  watch: {
  },
  filters: {
    formatTime(time) {
      return publicFuc.formatTime(time);
    },
  },
  components: {
    share,
  },
  methods: {
    goRule() {
      publicFuc.sendLog('zqj_hdzy_gz_f');
      location.href = 'midmoonrule.html';
    },
    seeList() {
      if (this.helianShare === '1') {
        publicFuc.Open_app();
        return false;
      }
      location.href = `midmoonlist.html?isActivityIng=${this.isActivityIng ? 1 : 0}&authStates=${this.authStates}`;
    },
    verification(page) {
      if (this.helianShare === '1') {
        publicFuc.Open_app();
        return false;
      }
      if (page === 'answer') {
        if (this.todayAnswerTimes === 0) {
          publicFuc.sendLog('zqj_hdzy_dtsyy_b');
        } else {
          publicFuc.sendLog('zqj_hdzy_zctz_c');
        }
      } else {
        publicFuc.sendLog('zqj_hdzy_ckgd_d');
      }
      if (this.authStates === 'authed') {
        if (page === 'list') {
          location.href = `midmoonlist.html?isActivityIng=${this.isActivityIng ? 1 : 0}`;
        } else {
          if (this.todayAnswerTimes === 0) {
            location.href = 'midmoonquestion.html';
          } else if (this.todayAnswerTimes === 3) {
            MessageBox.alert('今天挑战机会已用完');
          } else {
            if (this.shareCount < this.todayAnswerTimes) {
              Toast('分享到微信群可以再次挑战哦');
              this.isShowShare = true;
            } else {
              location.href = 'midmoonquestion.html';
            }
          }
        }
        return false;
      }
      if (!this.uid) {
        appHandler.login(this, () => {
          this.getShareCount(1, page);
          return false;
        });
      } else {
        this.getUserInfo(2, page);
      }
    },
    hideShare() {
      this.isShowShare = false;
    },
    shareSuc(m) {
      this.shareApi.fetch().then(() => {
        this.shareCount = this.shareCount + 1;
      });
      this.getShareCount(4);
      if (m === 1) {
        publicFuc.sendLog('zqj_fxqd_wx_a');
      } else if (m === 2) {
        publicFuc.sendLog('zqj_fxqd_pyq_b');
      } else if (m === 3) {
        publicFuc.sendLog('zqj_fxqd_qq_e');
      } else if (m === 4) {
        publicFuc.sendLog('zqj_fxqd_wb_c');
      } else if (m === 5) {
        publicFuc.sendLog('zqj_fxqd_czlj_d');
      }
    },
    getUserInfo(type, page) {
      if (this.getUserInfoIng) {
        return false;
      }
      this.getUserInfoIng = true;
      this.userInfoApi.fetch().then(res => {
        this.authStates = res.result.authStates;
        this.getUserInfoIng = false;
        if (type === 3) {
          return false;
        }
        if (this.authStates === 'authfatal' || !this.authStates || this.authStates === 'unauth') {
          if (type !== 1) {
            appHandler.auth();
          }
          return false;
        } else if (this.authStates === 'authing') {
          appHandler.auth();
          return false;
        } else if (this.authStates === 'authed') {
          if (page === 'list') {
            location.href = `midmoonlist.html?isActivityIng=${this.isActivityIng ? 1 : 0}`;
          } else {
            if (this.todayAnswerTimes === 0) {
              location.href = 'midmoonquestion.html';
            } else if (this.todayAnswerTimes === 3) {
              MessageBox.alert('今天挑战机会已用完');
            } else {
              if (this.shareCount < this.todayAnswerTimes) {
                Toast('分享到微信群可以再次挑战哦');
                this.isShowShare = true;
              } else {
                location.href = 'midmoonquestion.html';
              }
            }
          }
        }
      });
    },
    getList() {
      this.dataApi.fetch().then(data => {
        this.allRank = data.result.allRank || [];
        this.myBestRank = data.result.myBestRank;
        this.todayAnswerTimes = data.result.todayAnswerTimes;
        this.isShowPage = true;
        Indicator.close();
      });
    },
    getCheckTime() {
      this.checkTimeApi.fetch().then(({ result }) => {
        this.isActivityIng = result;
        if (!result) {
          this.limit = 20;
        }
        this.getList();
      });
    },
    getShareCount(type, page) {
      if (this.getShareCountIng) {
        return false;
      }
      this.getShareCountIng = true;
      this.shareCountApi.fetch().then(({ result }) => {
        this.shareCount = result;
        this.getShareCountIng = false;
        if (type === 1 || type === 3) {
          this.getUserInfo(type, page);
        }
      });
    },
  },
  created() {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'snake',
    });
    const entryType = publicFuc.getUrlParam('entryType');
    // setUid.setAuth(this.uid, this.token);
    // this.getCheckTime();
    // this.getShareCount();
    if (this.helianShare === '1') {
      this.getCheckTime();
      const m = publicFuc.getUrlParam('m') ? parseInt(publicFuc.getUrlParam('m')) : 0;
      if (m === 1) {
        publicFuc.sendLog('zqj_wx_click_g');
      } else if (m === 2) {
        publicFuc.sendLog('zqj_pyq_click_h');
      } else if (m === 3) {
        publicFuc.sendLog('zqj_qq_click_j');
      } else if (m === 4) {
        publicFuc.sendLog('zqj_wb_click_i');
      } else if (m === 5) {
        publicFuc.sendLog('zqj_copy_click_i');
      } else {
        publicFuc.sendLog('no_m_share');
      }
      if (entryType) {
        publicFuc.sendLog(entryType);
      }
    } else {
      appHandler.getUserId(this, () => {
        this.getCheckTime();
        if (this.uid) {
          this.getShareCount(3);
        }
        if (entryType) {
          publicFuc.sendLog(entryType);
        }
      });
    }
    publicFuc.sendLog('zqj_hdzy_rs_a');
    this.message = {
      url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?helian_share=1`,
      title: '中秋赏圆月，答题领好礼！',
      description: '来和我一起参加中秋赏圆月挑战吧，还有500元京东中秋礼卡等节日大礼等你来拿。',
      icon: 'http://helian.image.alimmdn.com/guke/midmoon.png',
    };
  },
  mounted() {
    window.getShareParameterHandler = function () {
      publicFuc.sendLog('zqj_hdzy_fx_e');
      let json = {
        'title': '中秋赏圆月，答题领好礼！',
        'content': '来和我一起参加中秋赏圆月挑战吧，还有500元京东中秋礼卡等节日大礼等你来拿。',
        'icon': 'http://helian.image.alimmdn.com/guke/midmoon.png',
        'url': `${window.location.protocol}//${window.location.host}${window.location.pathname}`,
        'type': '',
        'id': '',
      };
      json = JSON.stringify(json);
      return json;
    };
  },
};
</script>
