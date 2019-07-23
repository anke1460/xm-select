import { h, Component, render } from '@/components/preact'

/**
 * 标签的渲染
 */
class Label extends Component{
	
	constructor(options){
		super(options);
	}
	
	iconClick(item, selected, disabled, e){
		this.props.ck(item, selected, disabled);
		//阻止父组件上的事件冒泡
		e.stopPropagation();
	}
	
	render({ data, prop, theme, model, sels }) {
		//获取变换属性
		const { name, disabled } = prop;
		
		//获取配置项
		const label = model.label;
		const type = label.type;
		const conf = label[type];
		
		//渲染结果
		let html = '';
		
		if(type === 'text'){
			html = sels.map(sel => `${conf.left}${sel[name]}${conf.right}`).join(conf.separator)
		}else if(type === 'block'){
			//已选择的数据
			let arr = [...sels];
			
			const style = { backgroundColor: theme.color }
			//显示的个数
			const count = conf.showCount <= 0 ? arr.length : conf.showCount;

			html = arr.splice(0, count).map(sel => {
				const styleProps = { width: conf.showIcon ? 'calc(100% - 20px)' : '100%', }
				const className = ['xm-label-block', sel[disabled] ? 'disabled':''].join(' ');
				return (
					<div class={className} style={ style }>
						<span style={ styleProps }>{ sel[name] }</span>
						{ conf.showIcon && <i class="xm-iconfont xm-icon-close" onClick={ this.iconClick.bind(this, sel, true, sel[disabled]) }></i> }
					</div>
				)
			})
			
			//剩余没显示的数据
			if(arr.length){
				html.push(
					<div class="xm-label-block" style={ style }>
						+ { arr.length }
					</div>
				)
			}
		}else{
			if(sels.length && conf && conf.template){
				html = conf.template(data, sels);
			}else{
				html = sels.map(sel => sel[name]).join(',')
			}
		}
		
		
		return (
			<div class="xm-label">
				{ html }
			</div>
		)
	}
}

export default Label;