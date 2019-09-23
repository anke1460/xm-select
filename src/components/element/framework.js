import { h, Component, render } from '@/components/preact'
import { checkUserAgent } from '@/components/common/util'

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
		this.resetDate(this.props.data);
	}
	
	resetDate(data = []){
		this.setState({ data });
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
	
	onReset(data){
		this.resetDate(data);
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
				let clientHeight = document.documentElement.clientHeight;
				let rect = this.base.getBoundingClientRect();
				let diff = clientHeight - (rect.y || rect.top) - rect.height - 20;
				direction = diff > bodyViewHeight || (rect.y || rect.top) < diff ? 'down' : 'up';
			}
			this.setState({ directionVal: direction })
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
	
	componentWillReceiveProps(props){
		this.resetDate(props.data);
	}
	
	render(config, { sels, show }) {
		const { tips, theme, prop, style, radio, repeat, clickClose, on } = config;
		const borderStyle = { borderColor: theme.color };
		//最外层边框的属性
		const xmSelectProps = {
			style: {
				...style,
				...(show ? borderStyle : {})
			},
			onClick: this.onClick.bind(this),
			ua: checkUserAgent(),
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
		
		//选项, 选中状态, 禁用状态, 是否强制删除:在label上点击删除
		const ck = (item, selected, disabled, mandatoryDelete) => {
			//如果是禁用状态, 不能进行操作
			if(disabled) return;
			
			//如果现在是选中状态
			if(selected && (!repeat || mandatoryDelete)){
				let index = sels.findIndex(sel => sel[valueProp] == item[valueProp])
				if(index != -1){
					sels.splice(index, 1);
					this.setState(sels);
				}
			}else{
				//如果是单选模式
				if(radio){
					this.setState({ sels: [item] });
				}else{
					this.setState({ sels: [...sels, item] });
				}
			}
			
			on && on({ arr: sels, item, selected: !selected });

			//检查是否为选择即关闭状态, 强制删除情况下不做处理
			clickClose && !mandatoryDelete && this.onClick();
		};
		
		const labelProps = {  ...config, data: this.state.data, sels, ck, title: sels.map(sel => sel[prop.name]).join(',') }
		const bodyProps = {  ...config, data: this.state.data, sels, ck, show, onReset: this.onReset.bind(this) }
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