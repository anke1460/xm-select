import { h, Component, render } from '@/components/preact'

/**
 * 普通的多选渲染
 */
class General extends Component{
	
	constructor(options){
		super(options);
		this.searchCid = 0;
		this.setState({ searchVal: '', });
	}
	
	optionClick(item, selected, disabled, e){
		this.props.ck(item, selected, disabled);
		//阻止父组件上的事件冒泡
		e.stopPropagation();
	}
	
	searchInputClick(e){
		e.stopPropagation();
	}
	
	searchInput(e){
		clearTimeout(this.searchCid);
		this.searchCid = setTimeout(() => this.setState({ searchVal: e.target.value }), this.props.delay);
	}
	
	componentWillReceiveProps(props){
		if(!props.show){
			//清空输入框的值
			this.setState({ searchVal: '', });
		}
	}
	
	render({ data, prop, template, theme, sels, empty, filterable, filterMethod, delay, searchTips }) {
		
		const { name, value, disabled } = prop;

		const arr = (filterable ? data.filter((item, index) => filterMethod(this.state.searchVal, item, index, prop)) : data).map(item => {
			
			const selected = !!sels.find(sel => sel[value] == item[value])
			const iconStyle = { color: selected ? theme.color : '' }
			// const className = 'xm-option' + (item.disabled ? ' disabled' : '');
			const className = ['xm-option', (item[disabled] ? ' disabled' : ''), (selected ? ' selected' : '')].join(' ');
			
			return (
				<div class={className} value={ item[value] } onClick={ this.optionClick.bind(this, item, selected, item[disabled]) }>
					<div class="xm-option-icon" style={ { borderColor: theme.color, } }>
						<i class="xm-iconfont xm-icon-duox" style={ iconStyle }></i>
					</div>
					<div class='xm-option-content' dangerouslySetInnerHTML={{ __html: template({ data, item, arr: sels, name: item[name], value: item[value] }) }}></div>
				</div>
			)
		}) 
		
		if(!arr.length){
			arr.push(
				<div class="xm-select-empty">{ empty }</div>
			)
		}
		
		const searchClass = ['xm-search', filterable ? '':'dis'].join(' ');
		const search = (
			<div class={ searchClass }>
				<i class="xm-iconfont xm-icon-sousuo"></i>
				<input type="text" class="xm-input xm-search-input" placeholder={ searchTips } value={ this.state.searchVal } onInput={ this.searchInput.bind(this) } onClick={ this.searchInputClick.bind(this) } />
			</div>
		);
		
		return (
			<div> 
				{ search }
				<div>{ arr }</div>
			</div>
		)
	}
}

export default General;