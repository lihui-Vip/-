import ajax from '$lib/utils/api-factory';

export default ajax({
  url: v => `${API_PREFIX}api${v.url}`,
  optionParams: ['url'],
  params: {
    _: {
      defaultValue: () => Date.now(),
    },
  },
});

