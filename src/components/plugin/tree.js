import { h, Component, render } from 'preact'

class Tree extends Component{

	constructor(options){
		super(options);

		this.state = {
			expandedKeys: [],
		}
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
			if(item.__node.loading === true){
				return;
			}

			let val = item[this.props.prop.value];
			let expandedKeys = this.state.expandedKeys;
			let index = expandedKeys.findIndex(v => v === val);
			index === -1 ? expandedKeys.push(val) : expandedKeys.splice(index, 1);
			this.setState({ expandedKeys });

			//是否需要懒加载
			const { tree, prop, sels } = this.props;
			let child = item[prop.children];
			if(tree.lazy && child && child.length === 0 && item.__node.loading !== false){
				item.__node.loading = true;
				tree.load(item, (result) => {
					item.__node.loading = false;
					item[prop.children] = result;
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

	//组件将要接收新属性
	componentWillReceiveProps(props){
		// this.init(props);
	}

	//组件将要被挂载
	componentWillMount(){
		this.init(this.props);
	}

	render(config, { expandedKeys }) {
		let { prop, empty, sels, theme, radio, template, data, tree } = config;
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

		let arr = data.map(item => renderGroup(item, 10 - tree.indent));

		if(!arr.length){
			//查看无数据情况下是否显示分页
			arr.push(<div class="xm-select-empty">{ empty }</div>)
		}

		return (
			<div onClick={ this.blockClick } class="xm-body-tree" >
				<div class="scroll-body" style={ {maxHeight: config.height} }>{ arr }</div>
			</div>
		)
	}
}

export default Tree;
