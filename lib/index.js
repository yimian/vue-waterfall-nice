// export { default as Waterfall } from './Waterfall.vue';
// export { default as WaterfallSlide } from './WaterfallSlide.vue';
import Waterfall from './Waterfall.vue';
import WaterfallSlide from './WaterfallSlide.vue';

const myPlugin = {
    install: function install(Vue) {
        Vue.component('Waterfall', Waterfall);
        Vue.component('WaterfallSlide', WaterfallSlide);
    },
};

export default myPlugin;