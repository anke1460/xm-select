import { h, Component, render } from 'preact'

class Tree extends Component{

	constructor(options){
		super(options);

		this.state = {
			expandedKeys: [],
			filterValue: '',
		}

		this.searchCid = 0;
		this.inputOver = true;
		this.__value = '';
	}

	init(props){
		const { tree, dataObj, prop } = props;
		const { value } = prop

		let keys = [];
		tree.expandedKeys.forEach(key => {
			keys.push(key);

			let item = dataObj[key];
			while(item){
				let pkey = item[value];
				keys.findIndex(k => k === pkey) === -1 && (keys.push(pkey))
				item = item.__node.parent
			}
		});
		this.setState({ expandedKeys: keys })
	}

	blockClick(e){
		e.stopPropagation();
	}

	optionClick(item, selected, disabled, type, e){
		if(type === 'line'){
			//加载中的不需要进行处理
			if(item.__node.loading === true){
				return;
			}

			const { tree, prop, sels } = this.props;

			//不是父节点的不需要处理
			if(!tree.lazy && !item[prop.optgroup]){
				return
			}

			let val = item[this.props.prop.value];
			let expandedKeys = this.state.expandedKeys;
			let index = expandedKeys.findIndex(v => v === val);
			index === -1 ? expandedKeys.push(val) : expandedKeys.splice(index, 1);
			this.setState({ expandedKeys });

			//是否需要懒加载
			let child = item[prop.children];
			if(tree.lazy && child && child.length === 0 && item.__node.loading !== false){
				item.__node.loading = true;
				tree.load(item, (result) => {
					item.__node.loading = false;
					item[prop.children] = this.handlerData(result, prop.children);
					item[prop.selected] = sels.findIndex(i => i[prop.value] === item[prop.value]) != -1
					this.props.onReset(item, 'treeData');
				});
			}
		}else if(type === 'checkbox'){
			this.props.ck(item, selected, disabled);
		}
		//阻止父组件上的事件冒泡
		this.blockClick(e);
	}

	handlerData(data, children){
		return data.map(item => {
			item.__node = {};
			if(item[children]){
				item[children] = this.handlerData(item[children], children);
			}
			return item;
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
				this.setState({ filterValue: this.__value })
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

	filterData(data, val){
		const { prop, filterMethod, tree } = this.props;
		const { children, optgroup, name, value } = prop;
		data.forEach((item, index) => {
			if(item[optgroup]){
				let child = this.filterData(item[children], val);
				item.__node.hidn = val ? child.filter(c => !c.__node.hidn).length === 0 : false;
				if(!item.__node.hidn){
					let keys = this.state.expandedKeys;
					if(val && keys.findIndex(key => key === item[value]) === -1){
						keys.push(item[value]);
						this.setState({ expandedKeys: keys })
					}
					return
				}
				if(tree.strict){
					return
				}
			}
			item.__node.hidn = val ? !filterMethod(val, item, index, prop) : false;
		});
		return data;
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

	//组件将要被挂载
	componentWillMount(){
		this.init(this.props);
	}

	render(config, { expandedKeys }) {
		let { prop, empty, sels, theme, radio, template, data, tree, filterable, searchTips } = config;
		let { name, value, disabled, children } = prop;

		const showIcon = config.model.icon != 'hidden';
		const renderItem = (item, indent, expand) => {
			//是否被选中
			let selected = !!sels.find(sel => sel[value] == item[value]);
			//是否禁用
			let dis = item[disabled]
			// 是否半选
			let half = item.__node.half === true;

			//tree是否遵义严格父子结构
			if(tree.strict){
				selected = selected || half || item.__node.selected
				dis = dis || item.__node.disabled;
			}

			const iconStyle = selected ? {
				color: theme.color,
				border: 'none'
			} : {
				borderColor: theme.color,
			};
			const itemStyle = { paddingLeft: indent + 'px' }
			if(!showIcon && selected){
				itemStyle.backgroundColor = theme.color;
				dis && (itemStyle.backgroundColor = '#C2C2C2');
			}
			const className = ['xm-option', (dis ? ' disabled' : ''), (selected ? ' selected' : ''), (showIcon ? 'show-icon' : 'hide-icon') ].join(' ');
			const iconClass = ['xm-option-icon xm-iconfont', radio ? 'xm-icon-danx' : tree.strict && half ? 'xm-icon-banxuan' : 'xm-icon-duox'].join(' ');
			const treeIconClass = ['xm-tree-icon', expand ? 'expand':'', item[children] && (item[children].length > 0 || (tree.lazy && item.__node.loading !== false)) ? 'visible':'hidden'].join(' ');

			return (
				<div class={ className } style={ itemStyle } value={ item[value] } onClick={ this.optionClick.bind(this, item, selected, item[disabled], 'line') }>
					{ tree.showFolderIcon && <i class={ treeIconClass }></i> }
					{ tree.showFolderIcon && tree.showLine && <i class={ expand ? 'top-line expand' : 'top-line' } style={ { left: indent - tree.indent + 3 + 'px', width: tree.indent + (expand === 0 ? 10 : -2) + 'px' } }></i> }
					{ tree.showFolderIcon && tree.showLine && <i class={ expand ? 'left-line expand' : 'left-line' } style={ {left: indent - tree.indent + 3 + 'px'} }></i> }
					{ item.__node.loading && <span class="loader"></span> }
					{ showIcon && <i class={ iconClass } style={ iconStyle } onClick={ this.optionClick.bind(this, item, selected, item[disabled], 'checkbox') }></i> }
					<div class='xm-option-content' dangerouslySetInnerHTML={{ __html: template({ data, item, arr: sels, name: item[name], value: item[value] }) }}></div>
				</div>
			)
		}

		const renderGroup = (item, indent) => {
			if(item.__node.hidn){
				return;
			}

			const child = item[children];
			indent = indent + tree.indent
			if(child){//分组模式
				let expand = this.state.expandedKeys.findIndex(k => item[value] === k) !== -1;
				child.length === 0 && (expand = false)
				return (
					<div class="xm-tree">
						{ tree.showFolderIcon && tree.showLine && expand && <i class='left-line left-line-group' style={ {left: indent + 3 + 'px'} }></i> }
						{ renderItem(item, indent, child.length === 0 && item.__node.loading === false ? 0 : expand) }
						{ expand && <div class="xm-tree-box">{ child.map(c => renderGroup(c, indent)) }</div> }
					</div>
				)
			}
			return renderItem(item, indent, 0);
		}

		//这里处理过滤数据
		if(filterable){
			this.filterData(data, this.state.filterValue);
		}

		let arr = data.map(item => renderGroup(item, 10 - tree.indent)).filter(a => a);

		if(!arr.length){
			//查看无数据情况下是否显示分页
			arr.push(<div class="xm-select-empty">{ empty }</div>)
		}

		const search = (
			<div class='xm-search'>
				<i class="xm-iconfont xm-icon-sousuo"></i>
				<input class="xm-input xm-search-input" placeholder={ searchTips } />
			</div>
		);

		return (
			<div onClick={ this.blockClick } class="xm-body-tree" >
				{ filterable && search }
				<div class="scroll-body" style={ {maxHeight: config.height} }>{ arr }</div>
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

}

export default Tree;
