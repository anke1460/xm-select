import { name, version, website } from '../package.json'
import { selector, warn } from '@/common/util'
import Select from '@/components/xm-select'

export const datas = {};
export const optionData = {};
export const childData = {};

export default {
	name,
	version,
	doc: website,
	render(options) {
		let { el } = options;
		options.dom = selector(el);

		if(el.nodeType){
			let id = "DOM_RENDER_" + Date.now() + '_' + Math.random();
			el.setAttribute(name, id);
			el = `[${name}='${id}']`
			options.el = el;
		}
		optionData[el] = options;

		let instance = new Select(options);
		//已经渲染
		if (instance && instance.options.__render_success) {
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
	},
	arr2tree(arr=[], pid='pid', id='id', children='children', topParentId=0){
		const datas = {}				// 数据缓存
		return safety(arr).filter(item =>{
			const _id = item[id] 		// 提取自身id 必须唯一
			const _pid = item[pid] 		// 提取父级id
			const self = datas[_id] 	// 读取数据缓存中的数据
			let parent = datas[_pid] 	// 读取父级数据
			if(self){ 					// 如果缓存中有数据
				item[children] = self[children] // 把缓存的数据保存到自身
			}
			datas[_id] = item 					// 替换缓存中的数据
			if(!parent){ 						// 如果没有找到父级数据
				parent = { 						// 创建一个全新的父级数据
					[children]:[]
				}
				datas[_pid] = parent 			// 记录到缓存
			}
			parent.push(item) 					// 推送自身到父级
			return id == topParentId 			// 这里用 == 防止出现 字符串不等于数字类型的情况
		})
	}
}
