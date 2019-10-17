import { h, Component, render } from '@/components/preact'
import { checkUserAgent, isFunction, toNum, filterGroupOption, findSelected, mergeArr } from '@/components/common/util'

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
		this.reset(this.props);
		//回传子组件
		this.props.onRef(this);
		this.bodyView = null;
	}

	reset(props){
        //用于多选上限的边框颜色变化
        this.updateBorderColor('');
		this.resetDate(props.data);
		this.value(props.initValue ? props.initValue : this.findValue(this.state.data), !!this.state.show);
	}

    findValue(data){
        let list = [];
        findSelected(list, data, this.props.prop);
        return list;
    }

    resetSelectValue(sels = [], change = [], isAdd){
        let on = this.props.on;
        if(isFunction(on)){
            on({ arr: sels, change, isAdd });
        }
        this.setState({ sels });
    }

	resetDate(data = []){
		this.setState({ data });
	}

	value(sels, show){
        if(show !== false && show !== true){
            show = this.state.show;
        }
        let changeData = this.exchangeValue(sels);
        this.resetSelectValue(changeData, changeData, true);
		this.setState({ show })
	}

    exchangeValue(sels){
        let data = this.state.data;
        let value = this.props.prop.value;
        let list = [];
        filterGroupOption(list, data, this.props.prop);
        return sels.map(sel => typeof sel === 'object' ? sel[value] : sel).map(val => list.find(item => item[value] == val)).filter(a => a);
    }

    append(arr){
        let changeData = this.exchangeValue(arr);
        this.resetSelectValue(mergeArr(changeData, this.state.sels, this.props.prop), changeData, true);
    }

    del(arr){
        let value = this.props.prop.value;
        let sels = this.state.sels;
        arr = this.exchangeValue(arr);
        arr.forEach(v => {
            let index = sels.findIndex(item => item[value] === v[value]);
            if(index != -1){
                sels.splice(index, 1);
            }
        });
        this.resetSelectValue(sels, arr, false);
    }

    auto(arr){
        let value = this.props.prop.value;
        let sels = arr.filter(v => this.state.sels.findIndex(item => item[value] === v) != -1);
        sels.length == arr.length ? this.del(arr) : this.append(arr);
    }

    updateBorderColor(tmpColor){
        this.setState({ tmpColor });
    }

	onReset(data, type){
        //重置数据
        if(type === 'data'){
            let changeData = this.findValue(data);
            this.resetSelectValue(mergeArr(changeData, this.state.sels, this.props.prop), changeData, true);
            this.setState({ data });
        }else
        //重置选中数据
        if(type === 'sels'){
            this.resetSelectValue(data, data, true);
        }else
        //追加数据
        if(type === 'append'){
            this.append(data);
        }else
        //清理数据
        if(type === 'delete'){
            this.del(data);
        }else
        //自动判断模式
        if(type === 'auto'){
            this.auto(data);
        }
	}

	onClick(e){
		let show = !this.state.show;

		if(show){
			if(this.props.show && this.props.show() == false){
				return;
			}
			//事件互斥原则, 打开一个多选, 关闭其他所有多选
			this.props.onClose(this.props.el);

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
        this.reset(props)
	}

    componentDidUpdate(){
        let direction = this.props.direction;
        let rect = this.base.getBoundingClientRect();
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
        	let diff = clientHeight - (rect.y || rect.top) - rect.height - 20;
        	direction = diff > bodyViewHeight || (rect.y || rect.top) < diff ? 'down' : 'up';
        }

        if(direction == 'down'){
            this.bodyView.style.top = rect.height + 4 + 'px';
            this.bodyView.style.bottom = 'auto';
        }else{
            this.bodyView.style.top = 'auto';
            this.bodyView.style.bottom = rect.height + 4 + 'px';
        }
    }

	render(config, { sels, show }) {
		const { tips, theme, prop, style, radio, repeat, clickClose, on, max, maxMethod } = config;
		const borderStyle = { borderColor: theme.color };
		//最外层边框的属性
		const xmSelectProps = {
			style: {
				...style,
				...(show ? borderStyle : {})
			},
			onClick: this.onClick.bind(this),
			ua: checkUserAgent(),
            size: config.size,
		}
        if(this.state.tmpColor){
            xmSelectProps.style.borderColor = this.state.tmpColor;
            setTimeout(() => {
                xmSelectProps.style.borderColor = '';
                this.updateBorderColor('')
            }, 300);
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
					this.resetSelectValue(sels, [item], !selected);
				}
			}else{
                //查看是否设置了多选上限
                let maxCount = toNum(max);
                if(maxCount > 0 && sels.length >= maxCount){
                    this.updateBorderColor(theme.maxColor);
                    //查看是否需要回调
                    maxMethod && isFunction(maxMethod) && maxMethod(sels, item);
                    return ;
                }

				//如果是单选模式
				if(radio){
					this.resetSelectValue([item], [item], !selected);
				}else{
					this.resetSelectValue([...sels, item], [item], !selected);
				}
			}

			//检查是否为选择即关闭状态, 强制删除情况下不做处理
			clickClose && !mandatoryDelete && this.onClick();
		};

        const select = (
            <input class="xm-select-default" name={ config.name } value={ sels.map(item => item[prop.value]).join(',') }></input>
        )

		const labelProps = {  ...config, data: this.state.data, sels, ck, title: sels.map(sel => sel[prop.name]).join(',') }
		const bodyProps = {  ...config, data: this.state.data, sels, ck, show, onReset: this.onReset.bind(this) }
		//控制下拉框的显示于隐藏
		const bodyClass = ['xm-body', show ? '' : 'dis'].join(' ');

		return (
			<xm-select { ...xmSelectProps } >
                { select }
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
