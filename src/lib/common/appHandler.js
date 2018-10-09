import setUid from '$lib/common/setUid';

const handler = {
  connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      callback(window.WebViewJavascriptBridge);
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function () {
          callback(window.WebViewJavascriptBridge);
        }, false);
    }
  },
  //关闭app webView
  closeWebPage() {
    var os_type_native = this.judgeDevice();
    if (os_type_native === 'android') {
      HostApp.goBack();
    } else if (os_type_native === 'ios') {
      this.connectWebViewJavascriptBridge(function (bridge) {
        try {
          bridge.init(function (message, responseCallback) {
            var data = { 'Javascript Responds': 'Wee!' };
            responseCallback(data);
          });
        } catch (e) {
          console.log(e);
        }
        bridge.callHandler('closeWebHandler', {},
          function () {
          });
      });
    }
  },
  // 关闭按钮是否显示
  //接管app导航 <meta content="1" name="controlNavigationHandler" />
  //接管关闭按钮
  //接管app导航
  navigationHandler() {
    var os_type_native = this.judgeDevice();
    if (os_type_native === 'android') {
      // HostApp.goBack();
    } else if (os_type_native === 'ios') {
      this.connectWebViewJavascriptBridge(function (bridge) {
        try {
          bridge.init(function (message, responseCallback) {
            var data = { 'Javascript Responds': 'Wee!' };
            responseCallback(data);
          });
        } catch (e) {
          console.log(e);
        }
        bridge.callHandler('controlNavigationHandler', {
          isControlClose: true,
          isControlTitle: true,
        }, function () {
        });
      });
    }
  },
  // 关闭按钮是否显示
  //接管app导航 <meta content="1" name="controlNavigationHandler" />
  isShowCloseBtn(isShow) {
    var os_type_native = this.judgeDevice();
    if (os_type_native === 'android') {
      // HostApp.goBack();
    } else if (os_type_native === 'ios') {
      this.connectWebViewJavascriptBridge(function (bridge) {
        try {
          bridge.init(function (message, responseCallback) {
            var data = { 'Javascript Responds': 'Wee!' };
            responseCallback(data);
          });
        } catch (e) {
          console.log(e);
        }
        bridge.callHandler('closeBtnHandler', { isShowCloseBtn: isShow },
          function () {
          });
      });
    }
  },
  isShowShareBtn(isShow) {
    var os_type_native = this.judgeDevice();
    if (os_type_native === 'android') {
      HostApp.shareBtnHandler(isShow);
    } else if (os_type_native === 'ios') {
      this.connectWebViewJavascriptBridge(function (bridge) {
        try {
          bridge.init(function (message, responseCallback) {
            var data = { 'Javascript Responds': 'Wee!' };
            responseCallback(data);
          });
        } catch (e) {
          console.log(e);
        }
        bridge.callHandler('shareBtnHandler', { isShowShareBtn: isShow },
          function () {
          });
      });
    }
  },
  //修改title
  modifyTitle(title) {
    var os_type_native = this.judgeDevice();
    if (os_type_native === 'android') {
      // HostApp.modifyTitleHandler(title);
      document.title = title;
    } else if (os_type_native === 'ios') {
      this.connectWebViewJavascriptBridge(function (bridge) {
        try {
          bridge.init(function (message, responseCallback) {
            var data = { 'Javascript Responds': 'Wee!' };
            responseCallback(data);
          });
        } catch (e) {
          console.log(e);
        }
        bridge.callHandler('modifyTitleHandler', { title: title },
          function () {
          });
      });
    }
  },
  share(message) {
    if (message.type === 5) {
      this.copylink(message.url);
      return false;
    }
    var os_type_native = this.judgeDevice();
    if (os_type_native === 'android') {
      HostApp.sharecallback(message);
    } else if (os_type_native === 'ios') {
      this.connectWebViewJavascriptBridge(function (bridge) {
        try {
          bridge.init(function (message, responseCallback) {
            var data = { 'Javascript Responds': 'Wee!' };
            responseCallback(data);
          });
        } catch (e) {
          console.log(e);
        }
        bridge.callHandler('shareHandler', { paramter_name: message },
          function () {
          });
      });
    }
  },
  auth() {
    var os_type_native = this.judgeDevice();
    if (os_type_native === 'android') {
      HostApp.registerDoctorCallBack();
    } else if (os_type_native === 'ios') {
      this.connectWebViewJavascriptBridge(function (bridge) {
        try {
          bridge.init(function (message, responseCallback) {
            var data = { 'Javascript Responds': 'Wee!' };
            responseCallback(data);
          });
        } catch (e) {
          console.log(e);
        }
        bridge.callHandler('registerDoctorHandler', {},
          function () {
          });
      });
    }
  },
  login(_this, callback) {
    var os_type_native = this.judgeDevice();
    if (os_type_native === 'android') {
      HostApp.signInCallBack((response) => {
        const data = response.split('===');
        _this.uid = data[0];
        _this.token = data[1];
        window.sessionStorage.setItem('uid', data[0]);
        window.sessionStorage.setItem('token', data[1]);
        setUid.setAuth(data[0], data[1]);
        if (callback) {
          callback();
        }
      });
    } else if (os_type_native === 'ios') {
      this.connectWebViewJavascriptBridge(function (bridge) {
        try {
          bridge.init(function (message, responseCallback) {
            var data = { 'Javascript Responds': 'Wee!' };
            responseCallback(data);
          });
        } catch (e) {
          console.log(e);
        }
        bridge.callHandler('loginHandler', {},
          function (response) {
            _this.uid = response.result.user_id;
            _this.token = response.result.token;
            window.sessionStorage.setItem('uid', response.result.user_id);
            window.sessionStorage.setItem('token', response.result.token);
            setUid.setAuth(response.result.user_id, response.result.token);
            if (callback) {
              callback();
            }
          });
      });
    }
  },
  copylink(url) {
    var os_type_native = this.judgeDevice();
    if (os_type_native === 'android') {
      setTimeout(function () {
        HostApp.copyLinkHandler(url);
      }, 200);
    } else {
      this.connectWebViewJavascriptBridge(function (bridge) {
        try {
          bridge.init(function (message, responseCallback) {
            var data = { 'Javascript Responds': 'Wee!' };
            responseCallback(data);
          });
        } catch (e) {
          console.log(e);
        }
        bridge.callHandler('shareHandler', { url: url },
          function () {
          });
      });
    }
  },
  getUserId(_this, callback) {
    var os_type_native = this.judgeDevice();
    if (os_type_native === 'android') {
      setTimeout(function () {
        HostApp.getParamCallBack('user_id,token,mac,app_version,sn', v => {
          _this.uid = v.result.user_id;
          _this.token = v.result.token;
          window.sessionStorage.setItem('uid', v.result.user_id);
          window.sessionStorage.setItem('token', v.result.token);
          window.sessionStorage.setItem('mac', v.result.mac);
          window.sessionStorage.setItem('sn', v.result.sn);
          window.sessionStorage.setItem('app_version', v.result.app_version);
          setUid.setAuth(v.result.user_id, v.result.token);
          if (callback) {
            callback();
          }
        });
      }, 200);
    } else {
      this.connectWebViewJavascriptBridge(function (bridge) {
        try {
          bridge.init(function (message, responseCallback) {
            var data = { 'Javascript Responds': 'Wee!' };
            responseCallback(data);
          });
        } catch (e) {
          console.log(e);
        }
        bridge.callHandler('getParameterHandler', { paramter_name: 'user_id,token,mac,app_version,sn' },
          function (v) {
            _this.uid = v.result.user_id;
            _this.token = v.result.token;
            window.sessionStorage.setItem('uid', v.result.user_id);
            window.sessionStorage.setItem('token', v.result.token);
            window.sessionStorage.setItem('mac', v.result.mac);
            window.sessionStorage.setItem('sn', v.result.sn);
            window.sessionStorage.setItem('app_version', v.result.app_version);
            setUid.setAuth(v.result.user_id, v.result.token);
            if (callback) {
              callback();
            }
          });
      });
    }
  },
  judgeDevice() {
    var browser = {
      versions: function () {
        var u = navigator.userAgent;
        return {
          trident: u.indexOf('Trident') > -1,
          presto: u.indexOf('Presto') > -1,
          webKit: u.indexOf('AppleWebKit') > -1,
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
          mobile: !!u.match(/AppleWebKit.*Mobile.*/),
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
          iPhone: u.indexOf('iPhone') > -1, iPad: u.indexOf('iPad') > -1,
          webApp: u.indexOf('Safari') === -1,
        };
      }(),
      language: (navigator.browserLanguage || navigator.language).toLowerCase(),
    };
    var os_type_native = 'pc';
    if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
      os_type_native = 'ios';
    } else if (browser.versions.android) {
      os_type_native = 'android';
    }
    return os_type_native;
  },

};

module.exports = handler;
