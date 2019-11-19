import { name, version } from '../package.json'
import { selector, warn } from '@/common/util'
import Select from '@/components/xm-select'

export const datas = {};
export const optionData = {};
export const childData = {};

export default {
	name,
	version,
	render(options) {
		let { el } = options;
		optionData[el] = options;
		
		let instance = new Select(options);
		//已经渲染
		if (instance) {
			datas[el] = instance;
		}
		return instance;
	},
	get(filter, single) {
		let type = Object.prototype.toString.call(filter);
		let method;
		switch (type) {
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
		let keys = Object.keys(datas)
		let list = (method ? keys.filter(method) : keys).map(key => datas[key]).filter(instance => selector(instance.options.el));
		return single ? list[0] : list;
	},
	batch(filter, method) {
		let args = [...arguments];
		args.splice(0, 2);
		return this.get(filter).map(instance => instance[method](...args));
	}
}
