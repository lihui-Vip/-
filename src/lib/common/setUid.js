import { setup } from '$lib/utils/api-factory';

export default {
  setAuth: (uid = null, token = null) => {
    setup(axios => {
      axios.defaults.headers.common.uid = uid;
      axios.defaults.headers.common.token = token;
    });
  },
};
