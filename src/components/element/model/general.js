import { h, Component, render } from '@/components/preact'
import { isFunction, safety, mergeArr, IEVersion } from '@/components/common/util'

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
			pageSize: 10,
		});

        this.searchCid = 0;
        this.inputOver = true;
        this.__value = '';
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

        if(v === this.__value){
            return ;
        }

        clearTimeout(this.searchCid);
        if(this.inputOver){
            //保证输入框内的值是实时的
            this.__value = v;

            //让搜索变成异步的
            this.searchCid = setTimeout(() => this.setState({
                filterValue: this.__value,
                remote: true,
            }), this.props.delay);
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

		let { data, prop, template, theme, radio, sels, empty, filterable, filterMethod, remoteSearch, remoteMethod, delay, searchTips } = config

		const { name, value, disabled } = prop;

		let arr = data;
		//是否开启了搜索
		if(filterable){
			if(remoteSearch){//是否进行远程搜索
				if(this.state.remote){
					this.setState({ loading: true, remote: false });
					//让输入框失去焦点
					this.blur();
					remoteMethod(this.state.filterValue, result => {
						//回调后可以重新聚焦
						this.focus();

						this.setState({ loading: false });
						this.props.onReset(result, 'data');
					});
				}
			}else{
				arr = data.filter((item, index) => filterMethod(this.state.filterValue, item, index, prop));
			}
		}

		const search = (
			<div class='xm-search'>
				<i class="xm-iconfont xm-icon-sousuo"></i>
				<input type="text" class="xm-input xm-search-input" placeholder={ searchTips }
					ref={ input => this.searchInputRef = input }
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

			//如有总页码>1, 但是因为搜索造成的页码=0的情况
			if(size > 0 && this.state.pageIndex <= 0){
				this.changePageIndex(1);
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
				<div class='xm-paging'>
					<span style={ prevStyle } onClick={ this.pagePrevClick.bind(this) }>上一页</span>
					<span>{ this.state.pageIndex } / { size }</span>
					<span style={ nextStyle } onClick={ e => this.pageNextClick.bind(this, e, size)() }>下一页</span>
				</div>
			)

		}

        let safetyArr = safety(arr);
        //工具条操作
        const toolbar = (
            <div class='xm-toolbar'>
                { config.toolbar.list.map(tool => {
                    const toolClass = 'toolbar-tag';

                    let info;
                    if(tool === 'ALL'){
                        info = { icon: 'xm-iconfont xm-icon-quanxuan', name: '全选', method: (data) => {
                            this.props.onReset(mergeArr(data, sels, prop), 'sels');
                        } };
                    }else if(tool === 'CLEAR'){
                        info = { icon: 'xm-iconfont xm-icon-qingkong', name: '清空', method: (data) => {
                            this.props.onReset([], 'sels');
                        } };
                    }else {
                        info = tool
                    }

                    const hoverChange = e => {
                        if(e.type === 'mouseenter') e.target.style.color = theme.color;
                        if(e.type === 'mouseleave') e.target.style.color = '';
                    }

                    return (<div class={ toolClass } onClick={ () => {
                        isFunction(info.method) && info.method(safetyArr)
                    } } onMouseEnter={ hoverChange } onMouseLeave={ hoverChange }>
                        { config.toolbar.showIcon && <i class={ info.icon }></i> }
                        <span>{ info.name }</span>
                    </div>)
                }).filter(a => a) }
            </div>
        )


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
			const iconClass = ['xm-option-icon xm-iconfont', radio ? 'xm-icon-danx' : 'xm-icon-duox'].join(' ');

			return (
				<div class={className} value={ item[value] } onClick={ this.optionClick.bind(this, item, selected, item[disabled]) }>
					<i class={ iconClass } style={ iconStyle }></i>
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
}

export default General;
