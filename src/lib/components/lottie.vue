<template>
  <div :style="style"
       ref="lavContainer"></div>
</template>

<script>
import lottie from 'lottie-web';

export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
    height: String,
    width: String,
    pauseFrame: Number,
  },

  data() {
    return {
      style: {
        width: this.width ? this.width : '100%',
        height: this.height ? this.height : '100%',
        overflow: 'hidden',
        margin: '0 auto',
      },
    };
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.lavContainer,
      renderer: 'svg',
      loop: this.options.loop !== false,
      autoplay: this.options.autoplay !== false,
      animationData: this.options.animationData,
      rendererSettings: this.options.rendererSettings,
    });
    if (this.pauseFrame || this.pauseFrame === 0) {
      this.anim.playSegments([0, this.pauseFrame], true);
    }
    this.$emit('animCreated', this.anim);
  },
};
</script>
