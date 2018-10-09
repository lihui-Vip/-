<template>
  <div class="main">
    <div class="listbox">
      <div class="head">
        <div class="headdown">
        </div>
        <div class="headfixed">
          <div class="headtop">
          </div>
          <div class="headlogo">
          </div>
        </div>
      </div>
      <div class="list"
           v-if="allRank.length>0"
           v-scroll="loadMore">
        <ul>
          <li :key="index"
              v-for="(v,index) in allRank">
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
            <img class="gift"
                 v-if="index < 20"
                 @click="gorule"
                 src="~$res/images/midmoon/mid_gift.png"
                 alt="">
          </li>
        </ul>
        <div class="nodata">
          <span v-if="total<=page*limit && !isLoading"
                class="text">没有更多啦</span>
          <span v-else
                class="text">加载中...</span>
          <span class="line"></span>
        </div>
      </div>
    </div>
    <div class="fixedbtn"
         v-if="isShowBottom">
      <div v-if="myBestRank">
        <span class="top"
              :class="{'top1':myBestRank.ranking===1,'top2':myBestRank.ranking>=2&&myBestRank.ranking<=4,'top3':myBestRank.ranking>=5&&myBestRank.ranking<11,'top4':myBestRank.ranking>=11&&myBestRank.ranking<21,'white':myBestRank.ranking>20}">{{myBestRank.ranking}}</span>
        <span class="img">
          <img v-if="myBestRank.userInfo.avatar"
               :src="myBestRank.userInfo.avatar | avatar"
               alt="">
          <img v-else
               src="//doctor.helianhealth.com/images/icon_touxiang_da.png">
        </span>
        <span class="name">{{myBestRank.userInfo.userName}}</span>
        <div class="challenge-btn"
             @click="goAnswer">挑战排行榜</div>
      </div>
      <div v-else
           class="challenge-btn only-btn"
           @click="goAnswer">快去挑战吧</div>
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
import useStyle from '$lib/mixins/use-style';
import ajax from '$lib/common/config';
import { Toast, MessageBox, Indicator } from 'mint-ui';
import share from '$lib/components/share';
import style from './css';
import appHandler from '$lib/common/appHandler';
// import setUid from '$lib/common/setUid';

export default {
  mixins: [
    useStyle(style),
  ],
  data() {
    return {
      dataApi: ajax({
        url: '/operation/festival/moon/home',
        page: () => this.page,
        limit: () => this.limit,
      }),
      listApi: ajax({
        url: '/operation/festival/moon/listMoonAnswerRank',
        page: () => this.page,
        limit: () => this.limit,
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
      total: 0,
      page: 1,
      limit: 15,
      allRank: [],
      shareCount: 0,
      message: {},
      todayAnswerTimes: 0,
      myBestRank: null,
      isLoading: false,
      isShowShare: false,
      isShowBottom: false,
      getUserInfoIng: false,
      getShareCountIng: false,
      uid: window.sessionStorage.getItem('uid'),
      authStates: publicFuc.getUrlParam('authStates'),
      isActivityIng: publicFuc.getUrlParam('isActivityIng'),
      // uid: '17002189615',
      // token: '8f81c244e765b774f81893ef2bbec638',
    };
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
    loadMore() {
      if (this.total <= this.page * this.limit || this.isLoading) {
        return false;
      }
      this.page = this.page + 1;
      this.getList();
    },
    getList() {
      if (this.isLoading) return false;
      this.isLoading = true;
      this.listApi.fetch().then(data => {
        this.allRank = [...this.allRank, ...data.result] || [];
        this.isLoading = false;
        this.total = data.total;
        Indicator.close();
      });
    },
    hideShare() {
      this.isShowShare = false;
    },
    shareSuc(m) {
      this.shareApi.fetch().then(() => {
        this.shareCount = this.shareCount + 1;
      });
      this.getShareCount();
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
    getUserInfo(type) {
      if (this.getUserInfoIng) {
        return false;
      }
      this.getUserInfoIng = true;
      this.userInfoApi.fetch().then(res => {
        this.authStates = res.result.authStates;
        this.getUserInfoIng = false;
        if (this.authStates === 'authfatal' || !this.authStates || this.authStates === 'unauth') {
          if (type !== 1) {
            appHandler.auth();
          }
          return false;
        } else if (this.authStates === 'authing') {
          appHandler.auth();
          return false;
        } else if (this.authStates === 'authed') {
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
      });
    },
    getShareCount(type) {
      if (this.getShareCountIng) {
        return false;
      }
      this.getShareCountIng = true;
      this.shareCountApi.fetch().then(({ result }) => {
        this.getShareCountIng = false;
        this.shareCount = result;
        if (type === 1) {
          this.getUserInfo(type);
        }
      });
    },
    getMyList() {
      this.dataApi.fetch().then(data => {
        this.myBestRank = data.result.myBestRank;
        this.todayAnswerTimes = data.result.todayAnswerTimes;
        this.isShowBottom = true;
      });
    },
    goAnswer() {
      publicFuc.sendLog('zqj_phb_tzph_b');
      if (this.isActivityIng === '0') {
        return false;
      }
      if (!this.uid) {
        appHandler.login(this, () => {
          this.getShareCount(1);
          this.getMyList();
          return false;
        });
      } else {
        if (this.authStates === 'authfatal' || !this.authStates || this.authStates === 'unauth') {
          appHandler.auth();
          return false;
        } else if (this.authStates === 'authing') {
          appHandler.auth();
          return false;
        } else if (this.authStates === 'authed') {
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

      // if (this.todayAnswerTimes === 0) {
      //   location.href = 'midmoonquestion.html';
      // } else if (this.todayAnswerTimes === 3) {
      //   MessageBox.alert('今天挑战机会已用完');
      // } else {
      //   if (this.shareCount < this.todayAnswerTimes) {
      //     Toast('分享到微信群可以再次挑战哦');
      //     this.isShowShare = true;
      //   } else {
      //     location.href = 'midmoonquestion.html';
      //   }
      // }
    },
    gorule() {
      location.href = 'midmoonrule.html';
    },
  },
  created() {
    // setUid.setAuth(this.uid, this.token);
    Indicator.open({
      text: '加载中...',
      spinnerType: 'snake',
    });
    this.getMyList();
    this.getList();
    if (this.uid) {
      this.getShareCount();
    }
    this.message = {
      url: `${window.location.protocol}//${window.location.host}/midmoon.html?helian_share=1`,
      title: '中秋赏圆月，答题领好礼！',
      description: '来和我一起参加中秋赏圆月挑战吧，还有500元京东中秋礼卡等节日大礼等你来拿。',
      icon: 'http://helian.image.alimmdn.com/guke/midmoon.png',
    };
  },
  mounted() {
    appHandler.isShowShareBtn(false);
    publicFuc.sendLog('zqj_phb_rs_a');
  },
};
</script>
