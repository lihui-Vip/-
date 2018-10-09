<template>
  <div>
    <div class="main"
         v-if="pageType==='question'">
      <div class="numbox">
        {{this.index+1}}/5
      </div>
      <div class="listbox">
        <div class="head"></div>
        <div class="list">
          <div class="bg"></div>
          <div class="clear-border"></div>
          <img class="img"
               src="~$res/images/midmoon/mid-quesbg.png"
               alt="">
          <div class="title">{{curQuestion.title}}</div>
          <div class="btns">
            <span class="btn"
                  v-for="v in curQuestion.answer"
                  @click="selectAnswer(v)">
              {{v}}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="result-main"
         v-if="pageType==='result'">
      <lottie class="cloud-json"
              :options="defaultOptions1"
              :height="'3.72rem'" />
      <lottie :options="defaultOptions"
              :pauseFrame="12 * rightTotal +1"
              :height="'3.72rem'"
              :width="'3.72rem'" />

      <!-- <div v-if="rightTotal === 5"
           class="allMoon"></div>
      <div v-else
           class="img"></div> -->
      <img class="cloud"
           src="~$res/images/midmoon/mid_cloud.png"
           alt="">
      <div class="type">
        <img class="fail"
             v-if="rightTotal !== 5 && !ranking"
             src="~$res/images/midmoon/mid-fail.png"
             alt="">
        <div class="ranking"
             v-if="rightTotal !== 5 && ranking">
          <img src="~$res/images/midmoon/mid-rank.png"
               alt="">
          <span :class="{'two': ranking>9&&ranking<100, 'three':ranking>99&&ranking<1000,'four':ranking>999}">{{ranking}}</span>
        </div>
        <img class="suc"
             v-if="rightTotal === 5"
             src="~$res/images/midmoon/mid-suc.png"
             alt="">
      </div>
      <div v-if="rightTotal !== 5"
           class="title fail-title">好遗憾，本轮不能赏到圆月啦～</div>
      <div class="box">
        <div class="head">
          <span></span>答题结果
        </div>
        <div class="text">
          <p v-if="rightTotal !== 5">本轮答对：{{rightTotal}} 道题</p>
          <p v-if="rightTotal !== 5">本轮答错：{{wrongTotal}} 道题</p>
          <p v-if="rightTotal === 5">当前排名：第 {{ranking}} 名</p>
          <p>本轮用时：{{useTime | formatTime}}</p>
          <div v-if="rightTotal === 5"
               class="btn share-btn"
               @click="shareRecord">分享战绩</div>
          <div v-else
               class="btn"
               @click="againChallenge">再次挑战</div>
          <span class="goto"
                @click="goDetail">查看答题详情
            <img src="~$res/images/midmoon/mid-seeDetail.png"
                 alt="">
          </span>
        </div>
      </div>
    </div>
    <div class="detail-main"
         v-if="pageType === 'detail'">
      <div class="listbox">
        <div class="head"></div>
        <div class="list">
          <div class="bg"></div>
          <div class="ques-item"
               v-for="(v, index) in answerList">
            <img class="img"
                 src="~$res/images/midmoon/mid-quesbg.png"
                 alt="">
            <div class="title">{{index + 1}}.{{v.title}}</div>
            <div class="btns">
              <span class="btn"
                    v-for="k in v.answer"
                    :class="{'selected':v.chooseAnswer===k}">
                {{k}}
                <img v-if="v.rightAnswer === k"
                     src="~$res/images/midmoon/mid-quesright.png"
                     alt="">
                <img v-if="v.chooseAnswer === k && v.rightAnswer !== k"
                     src="~$res/images/midmoon/mid-queswrong.png"
                     alt="">
              </span>
              <span class="right-answer">答案：{{v.rightTag}}</span>
            </div>
          </div>
        </div>
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
import useStyle from '$lib/mixins/use-style';
import ajax from '$lib/common/config';
import { Toast, MessageBox, Indicator } from 'mint-ui';
import appHandler from '$lib/common/appHandler';
import share from '$lib/components/share';
import lottie from '$lib/components/lottie';
import * as animationData from '$res/json/moon.json';
import * as animationData1 from '$res/json/cloud.json';
import style from './css';

export default {
  mixins: [
    useStyle(style),
  ],
  data() {
    return {
      dataApi: ajax({
        url: '/operation/festival/moon/listMoonQuestion',
      }),
      answerCountApi: ajax({
        url: '/operation/festival/moon/home',
        page: 1,
        limit: 1,
      }),
      shareCountApi: ajax({
        url: '/operation/festival/moon/countTodayShare',
      }),
      shareApi: ajax({
        url: '/operation/festival/moon/share',
      }),
      moonAnswerApi: ajax(
        {
          url: '/operation/festival/moon/moonAnswer',
          wrongTotal: () => this.wrongTotal,
          rightTotal: () => this.rightTotal,
          time: () => this.useTime,
        },
        () => (
          JSON.stringify(this.answerInfo)
        ),
      ),
      questionList: [],
      index: 0,
      pageType: 'question',
      answerInfo: [],
      wrongTotal: 0,
      rightTotal: 0,
      startTime: Date.now(),
      useTime: 0,
      ranking: null,
      answerList: [],
      shareCount: 0,
      message: {},
      todayAnswerTimes: 0,
      isShowShare: false,
      saveIng: false,
      defaultOptions: {
        animationData: animationData,
        loop: false,
      },
      defaultOptions1: {
        animationData: animationData1,
      },
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
    lottie,
  },
  methods: {
    selectAnswer(v) {
      const isRight = this.curQuestion.rightAnswer === v;
      if (isRight) {
        this.rightTotal = this.rightTotal + 1;
      } else {
        this.wrongTotal = this.wrongTotal + 1;
      }
      this.curQuestion.chooseAnswer = v;
      this.curQuestion.rightTag = this.curQuestion.rightAnswer.split('.')[0];
      this.answerList.push(this.curQuestion);
      this.answerInfo.push({ id: this.curQuestion.id, answer: v, isRight: isRight });
      if (this.index === 4) {
        this.useTime = (Date.now() - this.startTime);
        if (this.useTime > 3600000) {
          MessageBox.alert('挑战超时！');
          return false;
        }
        this.saveResult();
      }
      if (this.index < 4) {
        this.index = this.index + 1;
      }
    },
    goDetail() {
      this.pageType = 'detail';
      if (this.rightTotal === 5) {
        publicFuc.sendLog('zqj_cgy_dtxq_c');
      } else {
        publicFuc.sendLog('zqj_sby_dtxq_c');
      }
    },
    saveResult() {
      if (this.saveIng) return false;
      this.saveIng = true;
      this.moonAnswerApi.post().then(v => {
        this.pageType = 'result';
        this.ranking = parseInt(v.result.ranking);
        this.getMyList();
        this.saveIng = false;
        if (this.rightTotal === 5) {
          this.message = {
            url: `${window.location.protocol}//${window.location.host}/midmoon.html?helian_share=1`,
            title: '我成功赏到中秋圆月啦，快来和我一起赏圆月吧。',
            description: '现在参与中秋赏圆月挑战，还有超值礼品可以拿哦，快来和我一起挑战吧！',
            icon: 'http://helian.image.alimmdn.com/guke/midmoon.png',
          };
          publicFuc.sendLog('zqj_cgy_rs_a');
        } else {
          this.message = {
            url: `${window.location.protocol}//${window.location.host}/midmoon.html?helian_share=1`,
            title: '中秋赏圆月，答题领好礼！',
            description: '来和我一起参加中秋赏圆月挑战吧，还有500元京东中秋礼卡等节日大礼等你来拿。',
            icon: 'http://helian.image.alimmdn.com/guke/midmoon.png',
          };
          publicFuc.sendLog('zqj_sby_rs_a');
        }
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
    getShareCount() {
      this.shareCountApi.fetch().then(({ result }) => {
        this.shareCount = result;
      });
    },
    getMyList() {
      this.answerCountApi.fetch().then(data => {
        this.todayAnswerTimes = data.result.todayAnswerTimes;
      });
    },
    againChallenge() {
      publicFuc.sendLog('zqj_sby_zctz_b');
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
    },
    shareRecord() {
      publicFuc.sendLog('zqj_cgy_fxzj_b');
      if (this.todayAnswerTimes < 3) {
        Toast('分享到微信群可以再次挑战哦');
      }
      this.isShowShare = true;
    },
    getQuestionList() {
      this.dataApi.fetch().then(v => {
        this.questionList = v.result;
        Indicator.close();
      });
    },
  },
  computed: {
    curQuestion() {
      const question = {
        ...this.questionList[this.index],
        answer: this.questionList[this.index] ? this.questionList[this.index].answer.split(',') : null,
      };
      return question;
    },
  },
  created() {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'snake',
    });
    this.getQuestionList();
    this.getMyList();
    this.getShareCount();

  },
  mounted() {
    appHandler.isShowShareBtn(false);
  },

};
</script>
