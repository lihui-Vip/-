export default function (style) {
  return {
    created() {
      style.use();
    },
    destroyed() {
      this.$nextTick(() => style.unuse());
    },
  };
}
