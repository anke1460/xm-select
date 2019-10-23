import { h, Component, render } from '@/components/preact'
import Framework from '@/components/element/framework'
import { selector, warn, listenerClose, isArray, deepMerge, exchangeOptionsData } from '@/components/common/util'
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
		this.update(options);
	}

	/**
	 * 更新数据 + 重新渲染
	 */
	update(options = {}){
		//记录最新的配置项
		this.options = deepMerge(this.options, options);

		//如果dom不存在, 则不进行渲染事项
		let dom = selector(this.options.el);
		if(!dom){
			warn(`没有找到渲染对象: ${options.el}, 请检查`)
			return ;
		}
        //判断data的数据类型
        let optionsData = this.options.data || [];
        if(typeof(optionsData) === 'function'){
            optionsData = optionsData();
            this.options.data = optionsData;
        }
        if(!isArray(optionsData)){
            warn(`data数据必须为数组类型, 不能是${ typeof(data) }类型`)
            return ;
        }
        //调整数据结构
        this.options.data = exchangeOptionsData(optionsData, this.options);

		const onRef = (ref) => childs[this.options.el] = ref;

		render(<Framework { ...this.options } onClose={ onClose } onRef={ onRef } />, dom);

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
	getValue(type){
		let arr = deepMerge([], childs[this.options.el].state.sels);

        if(type === 'name'){
            return arr.map(item => item[this.options.prop.name]);
        }else
        if(type === 'nameStr'){
            return arr.map(item => item[this.options.prop.name]).join(',');
        }else
        if(type === 'value'){
            return arr.map(item => item[this.options.prop.value]);
        }else
        if(type === 'valueStr'){
            return arr.map(item => item[this.options.prop.value]).join(',');
        }

        return arr;
	}

	/**
	 * 设置多选数据
	 */
	setValue(sels, show, listenOn = false){
		if(!isArray(sels)){
			warn('请传入数组结构...')
			return ;
		}
		childs[this.options.el].value(sels, show, listenOn);
		return this;
	}

    /**
     * 追加赋值
     */
    append(sels){
        if(!isArray(sels)){
        	warn('请传入数组结构...')
        	return ;
        }
        childs[this.options.el].append(sels);
        return this;
    }

    /**
     * 删除赋值
     */
    delete(sels){
        if(!isArray(sels)){
        	warn('请传入数组结构...')
        	return ;
        }
        childs[this.options.el].del(sels);
        return this;
    }

    /**
     * 闪烁警告边框
     */
    warning(color, sustain = false){
        let showColor = color || this.options.theme.maxColor;

        sustain === true ? (
            childs[this.options.el].base.style.borderColor = showColor
        ) : (
            childs[this.options.el].updateBorderColor(showColor)
        )
        return this;
    }


}

export default xmOptions;
