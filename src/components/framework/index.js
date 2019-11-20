import { h, Component, render } from 'preact'
import { datas, childData } from '@/index.js';
import { checkUserAgent, isFunction, isArray, toNum, mergeArr } from '@/common/util'

import Label from '../label';
import General from '../plugin/general';
import Custom from '../plugin/custom';
import Tree from '../plugin/tree';

/**
 * 框架渲染类, 渲染基础的外边框 + 属性变化监听
 */
class Framework extends Component{

	constructor(options){
		super(options);
		//保留对象引用
		childData[options.el] = this;
		//初始化state数据
		this.state = this.initState();
		this.bodyView = null;
	}

	initState(){
		return {
			data: [],
			dataObj: {},
			flatData: [],
			sels: [],
			show: false,
			tmpColor: '',
		}
	}

	init(props, refresh){
		let { data } = props, sels;

		//如果新数据和旧数据不同 或者 强制刷新 才进行数据处理
		if(refresh){
			let dataObj = {};
			let flatData = [];
			this.load(data, dataObj, flatData);
			sels = props.initValue ? this.exchangeValue(props.initValue) : Object.values(dataObj).filter(item => item[props.prop.selected] === true).filter(item => item[this.props.prop.optgroup] !== true)
			this.setState({ sels, dataObj, flatData });
		}

		this.setState({ data });

		return sels;
	}

	exchangeValue(arr, filterGroup = true){
		let list = arr.map(sel => typeof sel === 'object' ? sel : this.state.dataObj[sel]).filter(a => a)
		filterGroup && (list = list.filter(item => item[this.props.prop.optgroup] !== true))
		return list;
	}

	value(sels, show, listenOn){
		if(show !== false && show !== true){
			show = this.state.show;
		}

		const { prop, tree } = this.props;
		let changeData = this.exchangeValue(sels, !tree.show);
		if(tree.show){
			let data = this.state.data;
			this.clearAndReset(data, changeData);
			changeData = this.init({ data, prop }, true);
		}

		this.resetSelectValue(changeData, changeData, true, listenOn);
		this.setState({ show })
	}

	clearAndReset(data, changeData){
		const { selected, children, value } = this.props.prop;
		data.forEach(item => {
			item[selected] = changeData.findIndex(c => c[value] === item[value]) != -1;
			let child = item[children];
			child && isArray(child) && this.clearAndReset(child, changeData)
		})
	}

	load(data, dataObj, flatData, parent){
		const { children, optgroup, value, selected, disabled } = this.props.prop;
		data.forEach(item => {
			//数据提取/处理
			item.__node = { parent }
			dataObj[item[value]] = item;
			flatData.push(item);
			//遍历子级数据
			let child = item[children];
			if(child && isArray(child)){
				let len = child.length;
				if(len > 0){
					this.load(child, dataObj, flatData, item);

					//严格的父子结构
					item[optgroup] = true;
					if(item[selected] === true){
						delete item[selected]
						child.forEach(c => c[selected] = true)
					}
					if(item[disabled] === true){
						delete item[disabled]
						child.forEach(c => c[disabled] = true)
					}

					//检查子节点的数据是否都被选中
					let slen = child.filter(i => i[selected] === true || i.__node.selected === true).length;
					item.__node.selected = slen === len;
					item.__node.half = slen > 0 && slen < len;
					item.__node.disabled = child.filter(i => i[disabled] === true || i.__node.disabled === true).length === len;
				}
			}
		});
	}

	//重置已选择数据
	resetSelectValue(sels = [], change = [], isAdd, listenOn = true){
		let on = this.props.on;
		if(isFunction(on) && this.prepare && listenOn){
			on({ arr: sels, change, isAdd });
		}
		this.setState({ sels });
	}

	updateBorderColor(tmpColor){
		this.setState({ tmpColor });
	}

	treeHandler(sels, parent, change, type){
		const { value, selected, disabled, children, optgroup } = this.props.prop;
		let child = parent[children];
		child.filter(item => !(item[disabled] || item.__node.disabled)).forEach(item => {
			if(item[optgroup]){
				this.treeHandler(sels, item, change, type);
			}else{
				let index = sels.findIndex(sel => sel[value] == item[value])
				if(type === 'del'){
					if(index != -1){
						sels.splice(index, 1);
						change.push(item);
					}
				}else if(type === 'half' || type === 'add'){
					if(index == -1){
						sels.push(item);
						change.push(item);
					}
				}
			}
		})
		let len = child.length;
		let slen = child.filter(i => sels.findIndex(sel => sel[value] === i[value]) !== -1 || i.__node.selected === true).length;
		parent.__node.selected = slen === len;
		parent.__node.half = slen > 0 && slen < len;
	}

	//选项, 选中状态, 禁用状态, 是否强制删除:在label上点击删除
	itemClick(item, itemSelected, itemDisabled, mandatoryDelete){

		const { theme, prop, radio, repeat, clickClose, max, maxMethod } = this.props
		let { sels } = this.state
		const { value, selected, disabled, children, optgroup } = prop

		//如果是禁用状态, 不能进行操作
		if(itemDisabled) return;

		if(item[optgroup]){
			let child = item[children], change = [], isAdd = true;
			if(item.__node.selected){
				this.treeHandler(sels, item, change, 'del');
				isAdd = false;
			}else if(item.__node.half){
				this.treeHandler(sels, item, change, 'half');
			}else{
				this.treeHandler(sels, item, change, 'add');
			}
			this.resetSelectValue(sels, change, isAdd);
			this.setState({ data: this.state.data })
		}else{
			//如果现在是选中状态
			if(itemSelected && (!repeat || mandatoryDelete)){
				let index = sels.findIndex(sel => sel[value] == item[value])
				if(index != -1){
					sels.splice(index, 1);
					this.resetSelectValue(sels, [item], !itemSelected);
				}
			}else{
				//查看是否设置了多选上限
				let maxCount = toNum(max);
				if(maxCount > 0 && sels.length >= maxCount){
					this.updateBorderColor(theme.maxColor);
					//查看是否需要回调
					maxMethod && isFunction(maxMethod) && maxMethod(sels, item);
					return ;
				}

				//如果是单选模式
				if(radio){
					sels = [item];
				}else{
					sels = [...sels, item]
				}
				this.resetSelectValue(sels, [item], !itemSelected);
			}
			let parent = item.__node.parent;
			if(parent){
				while(parent){
					let child = parent[children], len = child.length;
					let slen = child.filter(i => sels.findIndex(sel => sel[value] === i[value]) !== -1 || i.__node.selected === true).length;
					parent.__node.selected = slen === len;
					parent.__node.half = slen > 0 && slen < len;
					parent = parent.__node.parent;
				}
				this.setState({ data: this.state.data })
			}
		}



		//检查是否为选择即关闭状态, 强制删除情况下不做处理
		clickClose && !mandatoryDelete && this.onClick();
	};

	//select框被点击
	onClick(e){
		if(this.props.disabled){
			this.state.show !== false && this.setState({ show: false });
			return ;
		}

		let show = !this.state.show;
		if(show){
			if(this.props.show && this.props.show() == false){
				return;
			}
			//事件互斥原则, 打开一个多选, 关闭其他所有多选
			Object.keys(datas).filter(key => key != this.props.el).forEach(el => datas[el].closed())
		}else{
			if(this.props.hide && this.props.hide() == false){
				return;
			}
			//如果产生滚动条, 关闭下拉后回到顶部
			this.bodyView.scroll && this.bodyView.scroll(0, 0);
		}

		this.setState({ show });

		//阻止其他绑定事件的冒泡
		e && e.stopPropagation();
	}

	onReset(data, type){
		//重置数据
		if(type === 'data'){
			let changeData = data.filter(item => item[this.props.prop.selected] === true);
			this.resetSelectValue(mergeArr(changeData, this.state.sels, this.props.prop), changeData, true);

			let dataObj = {};
			let flatData = [];
			this.load(data, dataObj, flatData);
			this.setState({ data, flatData });
		}else
		//重置选中数据
		if(type === 'sels'){
			this.resetSelectValue(data, data, true);
		}else
		//追加数据
		if(type === 'append'){
			this.append(data);
		}else
		//清理数据
		if(type === 'delete'){
			this.del(data);
		}else
		//自动判断模式
		if(type === 'auto'){
			this.auto(data);
		}
	}

	append(arr){
		let changeData = this.exchangeValue(arr);
		this.resetSelectValue(mergeArr(changeData, this.state.sels, this.props.prop), changeData, true);
	}

	del(arr){
		let value = this.props.prop.value;
		let sels = this.state.sels;
		arr = this.exchangeValue(arr);
		arr.forEach(v => {
			let index = sels.findIndex(item => item[value] === v[value]);
			if(index != -1){
				sels.splice(index, 1);
			}
		});
		this.resetSelectValue(sels, arr, false);
	}

	auto(arr){
		let value = this.props.prop.value;
		let sels = arr.filter(v => this.state.sels.findIndex(item => item[value] === v[value]) != -1);
		sels.length == arr.length ? this.del(arr) : this.append(arr);
	}

	//组件将要接收新属性
	componentWillReceiveProps(props){
		this.init(props, props.updateData);
	}

	//组件将要被挂载
	componentWillMount(){
		this.init(this.props, true);
	}

	render(config, state) {

		const { theme, prop, radio, repeat, clickClose, on, max, maxMethod, content, disabled, tree } = config;
		const borderStyle = { borderColor: theme.color };
		let { data, dataObj, flatData, sels, show, tmpColor } = state;

		//组件为禁用状态
		if(disabled){
			show = false;
		}

		//最外层边框的属性
		const xmSelectProps = {
			style: { ...config.style, ...(show ? borderStyle : {}) },
			onClick: this.onClick.bind(this),
			ua: checkUserAgent(),
			size: config.size,
		}
		if(tmpColor){
			xmSelectProps.style.borderColor = tmpColor;
			setTimeout(() => {
				xmSelectProps.style.borderColor = '';
				this.updateBorderColor('');
			}, 300);
		}

		//普通多选数据
		const valueProp = prop.value;
		const labelProps = {  ...config, data, sels, ck: this.itemClick.bind(this), title: sels.map(sel => sel[prop.name]).join(',') }
		const bodyProps = {  ...config, data, dataObj, flatData, sels, ck: this.itemClick.bind(this), show, onReset: this.onReset.bind(this) }

		//渲染组件
		let Body = content ? <Custom { ...bodyProps } /> : tree.show ? <Tree { ...bodyProps } /> : <General { ...bodyProps } />;


		return (
			<xm-select { ...xmSelectProps } >
				<input class="xm-select-default" name={ config.name } value={ sels.map(item => item[prop.value]).join(',') }></input>
				<i class={ show ? 'xm-icon xm-icon-expand' : 'xm-icon' } />
				{ sels.length === 0 && <div class="xm-tips">{ config.tips }</div> }
				<Label { ...labelProps } />
				<div class={ show ? 'xm-body' : 'xm-body dis' } ref={ ref => this.bodyView = ref}>
					{ Body }
				</div>
				{ disabled && <div class="xm-select-disabled"></div> }
			</xm-select>
		);
	}

	//组件完成挂载
	componentDidMount(){
		this.prepare = true;
	}

	//此时页面又被重新渲染了
	componentDidUpdate(){
		let { direction } = this.props;
		let rect = this.base.getBoundingClientRect();
		if(direction === 'auto'){
			//用于控制js获取下拉框的高度
			this.bodyView.style.display = 'block';
			this.bodyView.style.visibility = 'hidden';

			//获取下拉元素的高度
			let bodyViewRect = this.bodyView.getBoundingClientRect();
			let bodyViewHeight = bodyViewRect.height;

			//还原控制效果
			this.bodyView.style.display = '';
			this.bodyView.style.visibility = '';

			//确定下拉框是朝上还是朝下
			let y = rect.y || rect.top || 0;
			let clientHeight = document.documentElement.clientHeight;
			let diff = clientHeight - y - rect.height - 20;
			direction = diff > bodyViewHeight || y < diff ? 'down' : 'up';
		}

		if(direction == 'down'){
			this.bodyView.style.top = rect.height + 4 + 'px';
			this.bodyView.style.bottom = 'auto';
		}else{
			this.bodyView.style.top = 'auto';
			this.bodyView.style.bottom = rect.height + 4 + 'px';
		}
	}

}

export default Framework;
