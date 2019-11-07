import { name, version } from '../package.json'
import '@/components/common/expand'
import Core from '@/components/core'
import '@/style/index.less'
import '@/style/iconfont.less'
import { selector, warn } from '@/components/common/util'

const object = {}
const xmSelect = {
	name,
	version,
	render(options) {
		let instance = new Core(options);
        if(instance){
            let { el } = options;
            let select = object[el];
            select !== undefined && (delete object[el]);
            object[el] = instance;
        }
        return instance;
	},
    get(filter, single){
        let type = Object.prototype.toString.call(filter);
        let method;
        switch (type){
            case '[object String]':
                filter && (method = item => item === filter);
                break;
            case '[object RegExp]':
                method = item => filter.test(item);
                break;
            case '[object Function]':
                method = filter;
                break;
            default:
                break;
        }
        let keys = Object.keys(object)
        let list = (method ? keys.filter(method) : keys).map(key => object[key]).filter(instance => selector(instance.options.el));
        return single ? list[0] : list;
    },
    batch(filter, method){
        let args = [ ...arguments ];
        args.splice(0, 2);
        return this.get(filter).map(instance => instance[method](...args));
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
