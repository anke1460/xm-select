import { h, Component, render } from '@/components/preact'

/**
 * 普通的多选渲染
 */
class General extends Component{
	
	constructor(options){
		super(options);
	}
	
	optionClick(item, selected, disabled, e){
		this.props.ck(item, selected, disabled);
		//阻止父组件上的事件冒泡
		e.stopPropagation();
	}
	
	render({ data, prop, template, theme, sels, empty }) {
		
		const { name, value, disabled } = prop;
		
		const arr = data.map(item => {
			
			const selected = !!sels.find(sel => sel[value] == item[value])
			const iconStyle = { color: selected ? theme.color : '' }
			// const className = 'xm-option' + (item.disabled ? ' disabled' : '');
			const className = ['xm-option', (item[disabled] ? ' disabled' : ''), (selected ? ' selected' : '')].join(' ');
			
			return (
				<div class={className} value={ item[value] } onClick={ this.optionClick.bind(this, item, selected, item[disabled]) }>
					<div class="xm-option-icon" style={ { borderColor: theme.color, } }>
						<i class="xm-iconfont xm-icon-duox" style={ iconStyle }></i>
					</div>
					<div class='xm-option-content' dangerouslySetInnerHTML={{ __html: template(item, sels, item[name], item[value]) }}></div>
				</div>
			)
		}) 
		
		if(!data.length){
			arr.push(
				<div class="xm-select-empty">{ empty }</div>
			)
		}
		
		return (
			<div> { arr } </div>
		)
	}
}

export default General;