import { h, Component, render } from 'preact'
import { isFunction, isArray, safety, deepMerge, mergeArr, IEVersion } from '@/common/util'

/**
 * 普通的多选渲染
 */
class General extends Component{

	constructor(options){
		super(options);

		this.setState({
			filterValue: '',
			remote: true,
			loading: false,
			pageIndex: 1,
			totalSize: 0,
		});

		this.searchCid = 0;
		this.inputOver = true;
		this.__value = '';
		this.dynamicInput = false;
	}

	optionClick(item, selected, disabled, e){
		this.props.ck(item, selected, disabled);
		//阻止父组件上的事件冒泡
		this.blockClick(e);
	}

	groupClick(item, e){
		const { click, children, disabled } = this.props.prop;
		let m = item[click], arr = item[children].filter(opt => !opt[disabled]);

		if(m === 'SELECT'){
			this.props.onReset(arr, 'append');
		}else if(m === 'CLEAR'){
			this.props.onReset(arr, 'delete');
		}else if(m === 'AUTO'){
			this.props.onReset(arr, 'auto');
		}else if(isFunction(m)){
			m(item);
		}
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
		this.props.pageRemote && this.postData(index - 1, true);
	}
	pageNextClick(e, size){
		let index = this.state.pageIndex;
		if(index >= size){
			return ;
		}
		this.changePageIndex(index + 1);
		this.props.pageRemote && this.postData(index + 1, true);
	}

	changePageIndex(index){
		this.setState({
			pageIndex: index
		})
	}

	searchInput(e){
		let v = e.target.value;

		if(v === this.__value){
			return ;
		}

		clearTimeout(this.searchCid);
		if(this.inputOver){
			//保证输入框内的值是实时的
			this.__value = v;

			//让搜索变成异步的
			this.searchCid = setTimeout(() => {
				this.callback = true;
				this.setState({ filterValue: this.__value, remote: true })
			}, this.props.delay);
		}
	}

	focus(){
		this.searchInputRef && this.searchInputRef.focus();
	}

	blur(){
		this.searchInputRef && this.searchInputRef.blur();
	}

	handleComposition(e){
		let type = e.type;

		if(type === 'compositionstart'){
			this.inputOver = false;
			clearTimeout(this.searchCid);
		}else if(type === 'compositionend'){
			this.inputOver = true;
			this.searchInput(e);
		}
	}

	postData(pageIndex = this.state.pageIndex, mandatory = false){
		if(this.state.remote || mandatory){
			this.callback = false;
			this.setState({ loading: true, remote: false });
			//让输入框失去焦点
			this.blur();
			this.props.remoteMethod(this.state.filterValue, (result, totalSize) => {
				//回调后可以重新聚焦
				this.focus();

				this.callback = true;
				this.setState({ loading: false, totalSize });
				this.props.onReset(result, 'data');
			}, this.props.show, pageIndex);
		}
	}

	//组件将要接收新属性
	componentWillReceiveProps(props){
		if(this.props.show != props.show){
			if(!props.show){
				//清空输入框的值
				this.setState({ filterValue: '' });
				this.__value = '';
				this.searchInputRef && (this.searchInputRef.value = '');
			}else{
				//聚焦输入框
				setTimeout(() => this.focus(), 0);
			}
		}
	}

	render(config) {
		let { data, flatData, prop, template, theme, radio, sels, empty, filterable, filterMethod, remoteSearch, remoteMethod, delay, searchTips, create, pageRemote } = config

		const { name, value, disabled, children, optgroup } = prop;

		let arr = deepMerge([], flatData), creator;
		//是否开启了搜索
		if(filterable){
			if(remoteSearch){//是否进行远程搜索
				this.postData();
			}else{
				const filterData = (item, index) => {
					const isGroup = item[optgroup];
					if(isGroup){
						delete item.__del;
						return true;
					}
					return filterMethod(this.state.filterValue, item, index, prop);
				}
				arr = arr.filter(filterData);

				for(let i = 0; i < arr.length - 1; i++){
					let a = arr[i];
					let b = arr[i + 1];
					if(a[optgroup] && b[optgroup]){
						arr[i].__del = true;
					}
				}
				if(arr.length && arr[arr.length - 1][optgroup]){
					arr[arr.length - 1].__del = true;
				}
				arr = arr.filter(item => !item.__del);
				//创建条目
				creator = this.state.filterValue && isFunction(create);
			}
		}

		//远程分页
		if(pageRemote){
			this.postData();
		}

		const search = (
			<div class='xm-search'>
				<i class="xm-iconfont xm-icon-sousuo"></i>
				<input class="xm-input xm-search-input" placeholder={ searchTips } />
			</div>
		);

		//如果是分组模式, 要分页先去除分组, 然后在计算分页, 最后再加上分组
		let groups = [], groupInfo = {};
		groups = arr.filter(item => item[optgroup]).forEach(g => {
			g[children].forEach(item => groupInfo[item[value]] = g);
		});
		arr = arr.filter(item => !item[optgroup]);

		let paging = '';
		if(config.paging){
			//计算当前分页的总页码
			let size = pageRemote ? this.state.totalSize : Math.floor((arr.length - 1) / config.pageSize) + 1;
			size <= 0 && (size = 1);

			let pageIndex = this.state.pageIndex;

			//如果当前页码大于总页码, 重置一下
			if(pageIndex > size){
				pageIndex = size;
			}

			//如有总页码>1, 但是因为搜索造成的页码=0的情况
			if(size > 0 && pageIndex <= 0){
				pageIndex = 1;
			}

			if(!pageRemote){
				//实现简单的物理分页
				let start = (pageIndex - 1) * config.pageSize;
				let end = start + config.pageSize;
				arr = arr.slice(start, end);
			}

			const disabledStyle = {cursor: 'no-drop', color: '#d2d2d2'};

			let prevStyle = {}, nextStyle = {};
			pageIndex <= 1 && (prevStyle = disabledStyle);
			pageIndex == size && (nextStyle = disabledStyle);

			this.state.pageIndex !== pageIndex && this.changePageIndex(pageIndex);

			paging = (
				<div class='xm-paging'>
					<span style={ prevStyle } onClick={ this.pagePrevClick.bind(this) }>上一页</span>
					<span>{ this.state.pageIndex } / { size }</span>
					<span style={ nextStyle } onClick={ e => this.pageNextClick.bind(this, e, size)() }>下一页</span>
				</div>
			)
		}else{
			//检查是否设置了显示数量上限
			if(config.showCount > 0){
				arr = arr.slice(0, config.showCount);
			}
		}

		let newArr = [], group;
		arr.forEach(item => {
			let g = groupInfo[item[value]];
			if(g != group){
				group = g;
				newArr.push(group);
			}
			newArr.push(item);
		});
		arr = newArr;

		//查看是否创建了条目
		if(creator){
			creator = create(this.state.filterValue, deepMerge([], arr));
			creator && arr.splice(0, 0, creator);
		}

		let safetyArr = deepMerge([], arr);
		this.tempData = safetyArr;

		//工具条操作
		const toolbar = (
			<div class='xm-toolbar'>
				{ config.toolbar.list.map(tool => {
					const toolClass = 'toolbar-tag';
					const toolStyle = {};

					let info, name = config.languageProp.toolbar[tool];
					if(tool === 'ALL'){
						info = { icon: 'xm-iconfont xm-icon-quanxuan', name, method: (pageData) => {
							const { optgroup, disabled } = prop;
							const list = pageData.filter(item => !item[optgroup]).filter(item => !item[disabled])
							this.props.onReset(mergeArr(list, sels, prop), 'sels');
						} };
					}else if(tool === 'CLEAR'){
						info = { icon: 'xm-iconfont xm-icon-qingkong', name, method: (pageData) => {
							this.props.onReset(sels.filter(item => item[prop.disabled]), 'sels');
						} };
					}else if(tool === 'REVERSE'){
						info = { icon: 'xm-iconfont xm-icon-fanxuan', name, method: (pageData) => {
							const { optgroup, disabled } = prop;
							const list = pageData.filter(item => !item[optgroup]).filter(item => !item[disabled])

							let selectedList = [];
							sels.forEach(item => {
								let index = list.findIndex(pageItem => pageItem[value] === item[value]);
								if(index == -1){
									selectedList.push(item);
								}else{
									list.splice(index, 1);
								}
							})
							this.props.onReset(mergeArr(list, selectedList, prop), 'sels');
						} };
					}else {
						info = tool
					}

					const hoverChange = e => {
						if(e.type === 'mouseenter') e.target.style.color = theme.color;
						if(e.type === 'mouseleave') e.target.style.color = '';
					}

					return (<div class={ toolClass } style={ toolStyle } onClick={ () => {
						isFunction(info.method) && info.method(safetyArr)
					} } onMouseEnter={ hoverChange } onMouseLeave={ hoverChange }>
						{ config.toolbar.showIcon && <i class={ info.icon }></i> }
						<span>{ info.name }</span>
					</div>)
				}).filter(a => a) }
			</div>
		)

		const showIcon = config.model.icon != 'hidden';
		const renderItem = item => {
			const selected = !!sels.find(sel => sel[value] == item[value])
			const iconStyle = selected ? {
				color: theme.color,
				border: 'none'
			} : {
				borderColor: theme.color,
			};
			const itemStyle = {}
			if(!showIcon && selected){
				itemStyle.backgroundColor = theme.color;
				item[disabled] && (itemStyle.backgroundColor = '#C2C2C2');
			}
			const className = ['xm-option', (item[disabled] ? ' disabled' : ''), (selected ? ' selected' : ''), (showIcon ? 'show-icon' : 'hide-icon') ].join(' ');
			const iconClass = ['xm-option-icon xm-iconfont', radio ? 'xm-icon-danx' : 'xm-icon-duox'].join(' ');

			return (
				<div class={ className } style={ itemStyle } value={ item[value] } onClick={ this.optionClick.bind(this, item, selected, item[disabled]) }>
					{ showIcon && <i class={ iconClass } style={ iconStyle }></i> }
					<div class='xm-option-content' dangerouslySetInnerHTML={{ __html: template({ data, item, arr: sels, name: item[name], value: item[value] }) }}></div>
				</div>
			)
		}

		const renderGroup = item => {
			const isGroup = item[optgroup];
			if(isGroup){//分组模式
				return (
					<div class="xm-group">
						<div class="xm-group-item" onClick={ this.groupClick.bind(this, item) }>{ item[name] }</div>
					</div>
				)
			}
			return renderItem(item);
		}

		arr = arr.map(renderGroup);

		if(!arr.length){
			//查看无数据情况下是否显示分页
			!config.pageEmptyShow && (paging = '');
			arr.push(<div class="xm-select-empty">{ empty }</div>)
		}

		return (
			<div onClick={ this.blockClick }>
				<div>
					{ config.toolbar.show && toolbar }
					{ filterable && search }
					<div class="scroll-body" style={ {maxHeight: config.height} }>{ arr }</div>
					{ config.paging && paging }
				</div>
				{ this.state.loading && <div class="loading" >
					<span class="loader"></span>
				</div> }
			</div>
		)
	}

	//组件完成挂载
	componentDidMount(){
		let input = this.base.querySelector('.xm-search-input');
		if(input){
			input.addEventListener('compositionstart', this.handleComposition.bind(this));
			input.addEventListener('compositionupdate', this.handleComposition.bind(this));
			input.addEventListener('compositionend', this.handleComposition.bind(this));
			input.addEventListener('input', this.searchInput.bind(this));
			this.searchInputRef = input;
		}
	}

	//此时页面又被重新渲染了
	componentDidUpdate(){
		if(this.callback){
			this.callback = false;

			let done = this.props.filterDone;
			if(isFunction(done)){
				done(this.state.filterValue, this.tempData || []);
			}
		}
	}

}

export default General;
