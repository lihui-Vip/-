import { MessageBox } from 'mint-ui';

import { setup } from '$lib/utils/api-factory';

setup((axios, ejection) => {
  axios.interceptors.response.use(res => {
    if (res.status === 401) {
      // auth.setAuth();

      return ejection;
    }

    if (res.data.$opts && res.data.$opts.callback) {
      return res.data.$opts.callback(res, ejection);
    }
    if (res.data.code === 0) {

      return res;
    } else {
      if (res.data.code === 86) {
        MessageBox.alert(res.data.errorMsg || '--', '请求异常');

        return ejection;
      }
    }

    MessageBox.alert(res.data.errorMsg || '--', '请求异常');

    if (res.config.$opts && res.config.$opts.continue) {
      return Promise.reject(res.data);
    } else {
      return ejection;
    }
  }, error => {
    error.toString();

    MessageBox.alert('我们遇到了网络问题。', '网络异常');

    return ejection;
  });
});
