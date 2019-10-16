import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/color-brewer.css'
import VueRouter from 'vue-router';
import routes from './router';
import App from './App.vue';
import demoBlock from './components/demo-block.vue';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);

import './assets/common.less'


const router = new VueRouter({
	mode: 'hash',
	base: __dirname,
	routes
});


router.afterEach(route => {
	Vue.nextTick(() => {
		const blocks = document.querySelectorAll('pre code:not(.hljs)');
		Array.prototype.forEach.call(blocks, hljs.highlightBlock);
	});
});

new Vue({
	el: '#app',
	router,
	render: h => h(App)
});
