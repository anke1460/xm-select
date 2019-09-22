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
		//搜索延迟 ms
		delay: 500,
		//搜索默认提示
		searchTips: setting.searchTips,
		//是否开始本地搜索
		filterable: false,
		//本地搜索过滤方法
		filterMethod: function(val, item, index, prop){
			if(!val) return true;
			return item[prop.name].indexOf(val) != -1;
		},
		//是否开启远程搜索
		remoteSearch: false,
		//远程搜索回调
		remoteMethod: function(val, cb){
			cb([]);
		},
		//下拉方向
		direction: 'auto',
		//自定义样式
		style: {},
		//默认多选的高度
		height: '200px',
		//是否开启分页
		paging: false,
		//分页每页的条数
		pageSize: 10,
		//是否开启单选模式
		radio: false,
		//是否开启重复选模式
		repeat: false,
		//是否点击选项后自动关闭下拉框
		clickClose: false,
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
		template({ item, sels, name, value }){
			return name;
		},
		//监听选中事件
		on({ arr, item, selected }){
			
		}
	}
}