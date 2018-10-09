import Vue from 'vue';
import VueResouce from 'vue-resource';
import appHandler from '$lib/common/appHandler';

Vue.use(VueResouce);

!function (e) {
  var cl = null;

  function o() {
    var d = e.document, a = d.documentElement;
    var c = a.getBoundingClientRect().width > 750 ? 750 : a.getBoundingClientRect().width, b = c / (750 / 100);
    a.style.fontSize = `${b}px`;
  }

  window.addEventListener('resize', () => {
    clearTimeout(cl), cl = setTimeout(o, 300);
  }, !1), o();

}(window);

Vue.directive('scroll', {
  bind: function (el, binding) {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop + window.innerHeight >= el.clientHeight - 5) {
        const fnc = binding.value;
        fnc();
      }
    });
  },
});

Vue.filter('avatar', avatar => `//${avatar.split('://')[1]}@50w`);

const publicFuc = {
  formatTime(T) {
    const time = Math.ceil(T / 1000),
      s = `${time % 60}秒`,
      m = parseInt(time / 60) > 0 ? `${parseInt(time / 60)}分` : '';
    return `${m}${s}`;
  },
  getUrlParam(name) {
    if (name) {
      var reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
      var r = window.location.search.substr(1).match(reg);
      if (r !== null) return decodeURI(r[2]);
      return null;
    } else {
      var url = location.search; //获取url中'?'符后的字串
      var theRequest = new Object();
      if (url.indexOf('?') !== -1) {
        var str = url.substr(1);
        if (str.indexOf('&') !== -1) {
          const strs = str.split('&');
          for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
          }
        } else {
          theRequest[str.split('=')[0]] = decodeURI(str.split('=')[1]);
        }
      }
      return theRequest;
    }
  },
  sendLog(data_type) {
    const mac = window.sessionStorage.getItem('mac'),
      sn = window.sessionStorage.getItem('sn'),
      os_type_native = appHandler.judgeDevice(),
      platform_os = os_type_native === 'android' ? '1' : '2';
    Vue.http.jsonp('//data.helianhealth.com/api/activity/activity2Logjsonp.json', {
      params: {
        platform_os: platform_os,
        mac: mac,
        sn: sn,
        data_type: data_type,
      },
      jsonp: 'callback',
      jsonpCallback: 'callback',
    }).catch((res) => {
      console.log(res);
    });
  },
  Open_app(url) {
    let h5_Url = url;
    if(!url){
      h5_Url = '';
    }
    var ua = navigator.userAgent.toLowerCase();
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      var ver = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
      ver = parseInt(ver[1], 10);
      if (ver < 9 || h5_Url === '') {
        if (ua.indexOf('qq/') > 0 || ua.indexOf('micromessenger') > 0 || ua.indexOf('weibo') > 0) {
          window.location.href = 'http://url.cn/28Q7ZUe';
        } else {
          var ifrr = document.createElement('iframe');
          ifrr.src = 'helianwx://';
          ifrr.style.display = 'none';
          document.body.appendChild(ifrr);
          window.setTimeout(function () {
            document.body.removeChild(ifrr);
          }, 10);
          setTimeout(function () {
            window.location.href = 'http://url.cn/28Q7ZUe';
          }, 200);
        }
        return false;
      } else {
        window.location.href = h5_Url;
      }
      window.location.href = 'http://url.cn/28Q7ZUe';
    } else if (/(Android)/i.test(navigator.userAgent)) {
      var ifraa = document.createElement('iframe');
      ifraa.src = `helian://com.heliandoctor.app/${h5_Url}`;
      ifraa.style.display = 'none';
      document.body.appendChild(ifraa);
      window.setTimeout(function () {
        document.body.removeChild(ifraa);
      }, 10);
      setTimeout(function () {
        window.location.href = 'http://url.cn/28Q7ZUe';
      }, 200);
    }
  },
};

module.exports = publicFuc;
