<template>
  <div class="share_box">
    <ul class="share_imglist">
      <li @click="sharebtn(1)"><img src="~$res/images/share/share-weixin.png">
        <span>微信好友</span>
      </li>
      <li @click="sharebtn(2)"><img src="~$res/images/share/share-pengyouquan.png">
        <span>朋友圈</span>
      </li>
      <li @click="sharebtn(4)"><img src="~$res/images/share/share-weibo.png">
        <span>新浪微博</span>
      </li>
      <li @click="sharebtn(3)"><img src="~$res/images/share/share-qq.png">
        <span>QQ</span>
      </li>
      <li @click="sharebtn(5)"><img src="~$res/images/share/share-copy.png">
        <span>复制链接</span>
      </li>
    </ul>
    <a class="share_cancel_btn"
       @click="hideShare">取消</a>
  </div>
</template>

<script>
import appHandler from '$lib/common/appHandler';
export default {
  props: {
    onsubmit: {
      type: Function,
      default: null,
    },
    message: {
    },
  },
  data() {
    return {
    };
  },
  methods: {
    hideShare() {
      this.$emit('hideShare');
    },
    //分享
    sharebtn(m) {
      this.$emit('shareSuc', m);
      this.message.type = m;
      this.message.url = `${this.message.url}&m=${m}`;
      appHandler.share(this.message);
    },
  },
};
</script>

<style lang="less" rel="stylesheet/less">
.share_box {
  background: #f8f8f8;
  width: 100%;
  height: 3.6rem;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
}
.share_imglist {
  margin: 0 0 1.4rem 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}
.share_imglist li {
  float: left;
  margin: 0.6rem 0;
  width: 20%;
  text-align: center;
  list-style: none;
  span {
    font-size: 0.24rem;
    color: #292f43;
    display: block;
    margin-top: 0.16rem;
  }
}
.share_imglist li img {
  width: 0.9rem;
  margin: 0 auto;
}
.share_cancel_btn {
  background: #fff;
  text-align: center;
  color: #151515;
  font-size: 0.34rem;
  padding: 0.3rem 0;
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
