import { name, version } from '../package.json'
import '@/components/common/expand'
import Core from '@/components/core'
import '@/style/index.less'
import '@/style/iconfont.less'


const xmSelect = {
	name,
	version,
	render(options) {
		return new Core(options);
	}
}


if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
	module.exports = xmSelect;
} else if (typeof define === 'function' && define.amd) {
	define(xmSelect);
} else if (window.layui && layui.define) {
	layui.define(function(exports) {
		exports('xmSelect', xmSelect);
	});
}
window.xmSelect = xmSelect;
