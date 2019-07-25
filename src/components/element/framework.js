import { h, Component, render } from '@/components/preact'

//渲染类
import Tips from './tips';
import Label from './label';
import General from './model/general';

/**
 * 框架渲染类, 渲染基础的外边框 + 属性变化监听
 */
class Framework extends Component{
	
	constructor(options){
		super(options);
		//初始化多选数据
		this.reset();
		//回传子组件
		this.props.onRef(this);
		this.bodyView = null;
	}
	
	reset(){
		let selected = this.props.prop.selected;
		this.value(this.props.initValue ? this.props.initValue : this.props.data.filter(item => item[selected]), false);
	}
	
	value(sels, show){
		let data = this.props.data;
		let value = this.props.prop.value;
		let direction = this.props.direction;
		this.setState({ 
			sels: sels.map(sel => typeof sel === 'object' ? sel[value] : sel).map(val => data.find(item => item[value] == val)).filter(a => a),
			//下拉框是否展开
			show,
			//下拉方向
			direction,
			directionVal: '',
		})
	}
	
	onClick(e){
		let show = !this.state.show;
		
		if(show){
			if(this.props.show && this.props.show() == false){
				return;
			}
			//事件互斥原则, 打开一个多选, 关闭其他所有多选
			this.props.onClose(this.props.el);
			
			let direction = this.state.direction;
			if(direction === 'auto'){
				//确定下拉框是朝上还是朝下
				let bodyHeight = document.documentElement.clientHeight;
				let rect = this.base.getBoundingClientRect();
				let diff = bodyHeight - rect.y - rect.height - 20;
				direction = diff > 300 ? 'down' : 'up';
			}
			this.setState({ directionVal: direction })
		}else{
			if(this.props.hidn && this.props.hidn() == false){
				return;
			}
			//如果产生滚动条, 关闭下拉后回到顶部
			this.bodyView.scroll(0, 0);
		}
		
		this.setState({ show });
		
		//阻止其他绑定事件的冒泡
		e && e.stopPropagation();
	}
	
	componentWillReceiveProps(props){
		
	}
	
	render(config, { sels, show }) {
		const { tips, theme, data, prop, template, model, empty, style } = config;
		const borderStyle = { borderColor: theme.color };
		//最外层边框的属性
		const xmSelectProps = {
			style: {
				...style,
				...(show ? borderStyle : {})
			},
			onClick: this.onClick.bind(this)
		}
		//右边下拉箭头的变化class
		const iconClass = show ? 'xm-icon xm-icon-expand' : 'xm-icon';
		//提示信息的属性
		const tipsProps = {
			tips,
			//没有已选择数据, 则显示提示
			show: !sels.length
		}
		//普通多选数据
		const valueProp = prop.value;
		
		const ck = (item, selected, disabled) => {
			//如果是禁用状态, 不能进行操作
			if(disabled) return;
			
			//如果现在是选中状态
			if(selected){
				let index = sels.findIndex(sel => sel[valueProp] == item[valueProp])
				if(index != -1){
					sels.splice(index, 1);
					this.setState(sels);
				}
			}else{
				this.setState({
					sels: [...sels, item]
				})
			}
		};
		
		const labelProps = {  ...config, sels, ck, title: sels.map(sel => sel[prop.name]).join(',') }
		const bodyProps = {  ...config, sels, ck, show }
		//控制下拉框的显示于隐藏
		const bodyClass = ['xm-body', this.state.directionVal, show ? '' : 'dis'].join(' ');
		
		return (
			<xm-select { ...xmSelectProps } >
				<i class={ iconClass } />
				<Tips { ...tipsProps } />
				<Label { ...labelProps } />
				<div class={ bodyClass } ref={ ref => this.bodyView = ref}>
					<General { ...bodyProps } />
				</div>
			</xm-select>
		);
	}
}

export default Framework;