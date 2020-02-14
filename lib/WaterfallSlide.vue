<template>
  <div
    ref="waterfallSilde"
    :style="style"
    :class="{ 'show': init }"
    class="waterfall-silde"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'WaterfallSlide',
  inject: ['parent'],
  props: {
    // 需要预加载的图片数组
    imgs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      height: 0,
      top: 0,
      left: 0,
      resize: false,
      init: false,
    };
  },
  computed: {
    style() {
      const style = {
        width: `${this.parent.mySlideWidth}px`,
      };

      if (this.init) {
        style.top = `${this.top}px`;
        style.left = `${this.left}px`;
      }

      return style;
    },
  },
  mounted() {
    this.notificationParent();
  },
  methods: {
    // 通知父组件添加子实例
    notificationParent() {
      this.parent.allChildren.push(this);
      this.parent.childrens.push(this);
    },
    // 刷新高度
    getHeight() {
      return this.imgLoad()
        .then(() => {
          this.height = this.$refs.waterfallSilde.offsetHeight;
        });
    },
    // 图片不定高的时候预加载
    imgLoad() {
      if (!this.imgs.length) return Promise.resolve('imgLoadJump');
      return Promise.all(this.imgs.map(item => this.everyImgLoad(item)));
    },
    // 单张图片预加载
    everyImgLoad(imgSrc) {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = imgSrc;
        img.onload = () => {
          resolve('imgLoadFinish');
        };
        img.onerror = () => {
          resolve('imgLoadError');
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.waterfall-silde {
  position: absolute;
  transition: left 0.5s, top 0.5s;
  visibility: hidden;
}
.show {
  visibility: visible;
  animation: show-card 0.5s;
}
@keyframes show-card {
  0% {
    transform: translateY(50px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
