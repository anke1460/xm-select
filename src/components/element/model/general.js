import { h, Component, render } from '@/components/preact'

/**
 * 普通的多选渲染
 */
class General extends Component{
	
	constructor(options){
		super(options);
		this.searchCid = 0;
		this.setState({ 
			searchVal: '',
			remote: true,
			loading: false,
			pageIndex: 1,
			pageSize: 10,
			
			inputOver: true,
		});
	}
	
	optionClick(item, selected, disabled, e){
		this.props.ck(item, selected, disabled);
		//阻止父组件上的事件冒泡
		this.blockClick(e);
	}
	
	blockClick(e){
		e.stopPropagation();
	}
	
	pagePrevClick(e){
		let index = this.state.pageIndex;
		if(index <= 1){
			return ;
		}
		this.changePageIndex(index - 1);
	}
	pageNextClick(e, size){
		let index = this.state.pageIndex;
		if(index >= size){
			return ;
		}
		this.changePageIndex(index + 1);
	}
	
	changePageIndex(index){
		this.setState({
			pageIndex: index
		})
	}
	
	searchInput(e){
		
		let v = e.target.value;
		
		setTimeout(() => {
			if(this.state.inputOver){
				clearTimeout(this.searchCid);
				this.searchCid = setTimeout(() => this.setState({ 
					searchVal: v,
					remote: true,
				}), this.props.delay);
			}
		}, 0)
	}
	
	focus(){
		this.searchInputRef.focus();
	}
	
	handleComposition(e){
		let type = e.type;
		
		if(type === 'compositionstart'){
			this.setState({ inputOver: false })
		}else if(type === 'compositionend'){
			this.setState({ inputOver: true })
		}
	}
	
	componentWillReceiveProps(props){
		if(this.props.show != props.show){
			if(!props.show){
				//清空输入框的值
				this.setState({ searchVal: '' });
			}else{
				//聚焦输入框
				setTimeout(() => this.focus(), 0);
			}
		}
	}
	
	render(config) {
	
		let { data, prop, template, theme, sels, empty, filterable, filterMethod, remoteSearch, remoteMethod, delay, searchTips } = config
		
		const { name, value, disabled } = prop;
		
		let arr = data;
		//是否开启了搜索
		if(filterable){
			if(remoteSearch){//是否进行远程搜索
				if(this.state.remote){
					this.setState({ loading: true, remote: false });
					remoteMethod(this.state.searchVal, result => {
						this.setState({ loading: false });
						this.props.onReset(result);
					});
				}
			}else{
				arr = data.filter((item, index) => filterMethod(this.state.searchVal, item, index, prop));
			}
		}
		
		const searchClass = ['xm-search', filterable ? '':'dis'].join(' ');
		const search = (
			<div class={ searchClass }>
				<i class="xm-iconfont xm-icon-sousuo"></i>
				<input type="text" class="xm-input xm-search-input" placeholder={ searchTips } value={ this.state.searchVal } 
					ref={ (input) => { this.searchInputRef = input; } }
					autoFocus
					onClick={ this.blockClick.bind(this) } 
					onInput={ this.searchInput.bind(this) } 
					onCompositionStart={ this.handleComposition.bind(this) }
					onCompositionUpdate={ this.handleComposition.bind(this) }
					onCompositionEnd={ this.handleComposition.bind(this) }
				/>
			</div>
		);
		
		
		let paging = '';
		
		if(config.paging){
			
			//计算当前分页的总页码
			const size = Math.floor((arr.length - 1) / config.pageSize) + 1;
			
			//如果当前页码大于总页码, 重置一下
			if(this.state.pageIndex > size){
				this.changePageIndex(size);
			}
			
			//实现简单的物理分页
			let start = (this.state.pageIndex - 1) * config.pageSize;
			let end = start + config.pageSize;
			arr = arr.slice(start, end);
			
			const disabledStyle = {cursor: 'no-drop', color: '#d2d2d2'};
			
			let prevStyle = {}, nextStyle = {};
			this.state.pageIndex <= 1 && (prevStyle = disabledStyle);
			this.state.pageIndex == size && (nextStyle = disabledStyle);
			
			const defaultCurrClass = {
				position: 'relative',
				borderRadius: '1px',
			}
			const pagingClass = 'xm-paging';
			// {
			// 	''.padEnd(size, ' ').split('').map((s, i) => (
			// 		<span style={
			// 			this.state.pageIndex == i + 1 ? { 
			// 				...defaultCurrClass, 
			// 				backgroundColor: theme.color, 
			// 				borderColor: theme.color,
			// 				color: '#FFF',
			// 			} : defaultCurrClass 
			// 		}>{ i + 1 }</span>
			// 	))
			// }
			paging = (
				<div class={ pagingClass }>
					<span style={ prevStyle } onClick={ this.pagePrevClick.bind(this) }>上一页</span>
					<span>{ this.state.pageIndex } / { size }</span>
					<span style={ nextStyle } onClick={ e => this.pageNextClick.bind(this, e, size)() }>下一页</span>
				</div>
			)
			
		}
		
		arr = arr.map(item => {
			
			const selected = !!sels.find(sel => sel[value] == item[value])
			const iconStyle = selected ? {
				color: theme.color,
				border: 'none',
				fontSize: '18px'
			} : {
				borderColor: theme.color,
			};
			const className = ['xm-option', (item[disabled] ? ' disabled' : ''), (selected ? ' selected' : '')].join(' ');
			
			return (
				<div class={className} value={ item[value] } onClick={ this.optionClick.bind(this, item, selected, item[disabled]) }>
					<i class="xm-option-icon xm-iconfont xm-icon-duox" style={ iconStyle }></i>
					<div class='xm-option-content' dangerouslySetInnerHTML={{ __html: template({ data, item, arr: sels, name: item[name], value: item[value] }) }}></div>
				</div>
			)
		}) 
		
		if(!arr.length){
			arr.push(
				<div class="xm-select-empty">{ empty }</div>
			)
		}
		
		return (
			<div onClick={ this.blockClick }> 
				<div>
					{ search }
					<div style={ {maxHeight: config.height, overflow: 'auto'} }>{ arr }</div>
					{ config.paging && paging }
				</div>
				{ this.state.loading && <div class="loading" >
					<span class="loader"></span>
				</div> }
			</div>
		)
	}
}

export default General;