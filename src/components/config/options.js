import zn from './language/zn'
import en from './language/en'

const lanSetting = { zn, en }

export default function (lan = 'zn') {
	let setting = lanSetting[lan] || zn;
	
	return {
		//多选数据
		data: [],
		//默认选中数据, 优先级大于selected
		initValue: null,
		//默认提示
		tips: setting.tips,
		//空数据提示
		empty: setting.empty,
		//是否重置多选
		reset: false,
		//用来判断多选是否显示
		isShow: false,
		//自定义属性名称
		prop: {
			name: 'name',
			value: 'value',
			selected: 'selected',
			disabled: 'disabled',
		},
		//主题配置
		theme: {
			color: '#009688',
		},
		//模型
		model: {
			label: {
				type: 'block',
				text: {
					left: '',
					right: '',
					separator: ', ',
				},
				block: {
					showCount: 0,
					showIcon: true,
				},
				count: {
					template(data, sels){
						return `已选中 ${sels.length} 项, 共 ${data.length} 项`
					}
				},
			},
		},
		
		// 展开下拉框
		show(){
			
		},
		// 隐藏下拉框
		hidn(){
			
		},
		// 模板组成, 当前option数据, 已经选中的数据, name, value  
		template(item, sels, name, value){
			return name;
		}
	}
}