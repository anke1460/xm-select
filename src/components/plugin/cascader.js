import { h, Component, render } from 'preact'
import { deepMerge, isFunction } from '@/common/util'

class Cascader extends Component{


	constructor(options){
		super(options);

		this.state = {
			expand: [],
		}
	}

	blockClick(e){
		e.stopPropagation();
	}

	optionClick(item, selected, disabled, index, e){

		console.log(item, index);

		this.props.ck(item, selected, disabled);

		let expand = this.state.expand.slice(0, index + 1);
		expand[index] = item[this.props.prop.value];

		this.setState({ expand });

		//阻止父组件上的事件冒泡
		this.blockClick(e);
	}

	//组件将要接收新属性
	componentWillReceiveProps(props){

	}

	//组件将要被挂载
	componentWillMount(){

	}

	render(config, state) {

		const { prop, empty, sels, theme, radio, template, data, cascader } = config;
		let { name, value, disabled, children } = prop;
		const showIcon = config.model.icon != 'hidden';

		const renderItem = (item, indent, index) => {
			//是否被选中
			let selected = !!sels.find(sel => sel[value] == item[value]);
			//是否禁用
			let dis = item[disabled]
			// 是否半选
			let half = item.__node.half === true;

			selected = selected || half || item.__node.selected
			dis = dis || item.__node.disabled;

			const iconStyle = selected ? {
				color: theme.color,
				border: 'none'
			} : {
				borderColor: theme.color,
			};

			const itemStyle = { backgroundColor: 'transparent' }
			const className = ['xm-option', (dis ? ' disabled' : ''), (selected ? ' selected' : ''), (showIcon ? 'show-icon' : 'hide-icon') ].join(' ');
			const iconClass = ['xm-option-icon xm-iconfont', radio ? 'xm-icon-danx' : half ? 'xm-icon-banxuan' : 'xm-icon-duox'].join(' ');


			//处理鼠标选择的背景色
			const hoverChange = e => {
				if(e.type === 'mouseenter'){
					if(!item[disabled]){
						this.setState({ val: item[value] })
					}
				}else if(e.type === 'mouseleave'){
					this.setState({ val: '' })
				}
			}

			return (
				<div class={ className } style={ itemStyle } value={ item[value] } onClick={
					this.optionClick.bind(this, item, selected, dis, index)
				} onMouseEnter={ hoverChange } onMouseLeave={ hoverChange }>
					{ showIcon && <i class={ iconClass } style={ iconStyle } ></i> }
					<div class='xm-option-content' dangerouslySetInnerHTML={{ __html: template({ data, item, arr: sels, name: item[name], value: item[value] }) }}></div>
				</div>
			)
		}

		const renderGroup = (item, indent, index) => {

			const child = item[children];

			indent = cascader.indent + 10

			return (
				<div class="xm-cascader">
					{ renderItem(item, indent, index) }
					{ child && this.state.expand[index] === item[value] &&
						<div class="xm-cascader-box" index={ index % 4 } style={{ left: indent + 'px' }}>{ child.map(c => renderGroup(c, indent, index + 1)) }</div>
					}
				</div>
			)
		}

		let arr = data.map(item => renderGroup(item, 0, 0)).filter(a => a);
		// let safetyArr = deepMerge([], arr);
		// let safetySels = deepMerge([], sels);

		if(!arr.length){
			arr.push(<div class="xm-select-empty">{ empty }</div>)
		}

		return (
			<div onClick={ this.blockClick } class="xm-body-cascader">
				{ arr }
			</div>
		)
	}

	//组件完成挂载
	componentDidMount(){
		this.props.onReset('cascader', 'class');

	}

	//此时页面又被重新渲染了
	componentDidUpdate(){

	}
}

export default Cascader;
