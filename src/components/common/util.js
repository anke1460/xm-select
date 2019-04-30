/**
 * 选中dom元素
 */
export function selector(el) {
	return document.querySelector(el);
}

/**
 * 警告提示
 */
export function warn() {
	let arr = [];
	for (var i = 0; i < arguments.length; i++) {
		arr.push(`${i + 1}. ${arguments[i]}`);
	}
	console.warn(arr.join('\n'));
}

/**
 * 全局监听点击事件
 */
export function listenerClose(data, handler){
	window.addEventListener('click', (e) => handler(e));
}

/**
 * 安全拷贝数据
 */
export function safety(data){
	return JSON.parse(JSON.stringify(data));
}

/**
 * 检测对象是否为数组
 */
export function isArray(obj){
	return Object.prototype.toString.call(obj) == "[object Array]";
}

export function watch(data) {
	return new Promise((resolve, reject) => {
		for (let key in data) {
			let value = data[key];
			Object.defineProperty(data, key, {
				configurable: false, // 该状态下的属性描述符不能被修改和删除
				enumerable: false, // 该状态下的属性描述符中的属性不可被枚举
				get() {
					return value;
				},
				set(newVal) {
					if (newVal !== value) {
						resolve(key, newVal, value);
						value = newVal;
					}
				}
			});
		}
	});
}
