import { h, Component, render } from '@/components/preact'
import Framework from '@/components/element/framework'
import { selector, warn, listenerClose, watch, safety, isArray } from '@/components/common/util'
import defaultOptions from '@/components/config/options'



/**
 * 保留初始化的数据
 */
const initData = {};
const data = {};
const onClose = (el) => Object.keys(data).filter(a => a != el).forEach(el => data[el].closed());
listenerClose(data, onClose);

/**
 * 子组件集合
 */
const childs = {};


/**
 * 对外提供的处理方法
 */
class xmOptions {

	constructor(options) {
		//保留初始化时的数据
		initData[options.el] = options;
		//定义默认值
		this.options = defaultOptions(options.language);
		//开始渲染数据
		this.update(options, true);
	}
	
	/**
	 * 更新数据 + 重新渲染
	 */
	update(options = {}, isNew){
		//记录最新的配置项
		this.options = Object.assign(this.options, options);
		
		//如果dom不存在, 则不进行渲染事项
		let dom = selector(this.options.el);
		if(!dom){
			warn(`没有找到渲染对象: ${options.el}, 请检查`)
			return ;
		}
		//如果是历史渲染过的数据, 重置一下数据
		isNew && childs[this.options.el] && childs[this.options.el].reset();
		
		let isRender = false;
		const onRef = (ref) => childs[this.options.el] = ref;
		const onReset = result => {
			this.options.data = result;
		}
		
		render(<Framework { ...this.options } onReset={ onReset } onClose={ onClose } onRef={ onRef } />, dom);
		
		//记录数据
		data[this.options.el] = this;
		//返回多选对象
		return this;
	}
	
	/**
	 * 重置多选, 回到初始化的状态
	 */
	reset(){
		let initVal = this.options;
		//设置options的默认数据
		this.options = defaultOptions(initVal.language);
		//更新渲染
		this.update({ ...initData[initVal.el]});
		//子组件初始化
		childs[this.options.el].reset();
		return this;
	}
	
	/**
	 * 主动打开多选
	 */
	opened(){
		let ref = childs[this.options.el];
		!ref.state.show && ref.onClick();
		return this;
	}

	/**
	 * 主动关闭多选
	 */
	closed(){
		let ref = childs[this.options.el];
		ref.state.show && ref.onClick();
		return this;
	}
	
	/**
	 * 获取多选选中的数据
	 */
	getValue(){
		return safety(childs[this.options.el].state.sels);
	}
	
	/**
	 * 设置多选数据
	 */
	setValue(sels, show){
		if(!isArray(sels)){
			warn('请传入数组结构...')
			return ;
		}
		childs[this.options.el].value(sels, !!show);
		return this;
	}
	

}

export default xmOptions;