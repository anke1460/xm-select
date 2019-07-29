# xm-select

#### 介绍
始于Layui, 下拉选择框的多选解决方案

#### 软件架构
1. 引入第三方[preact](https://preactjs.com/)库, 利用jsx渲染页面结构
2. 使用[webpack](https://www.webpackjs.com/)进行打包

#### 安装教程
```
1. git clone https://gitee.com/maplemei/xm-select.git
2. cd xm-select
3. yarn 或者 npm install
```

#### 使用说明

> 历史版本

[formSelectes](https://github.com/hnzzmsf/layui-formSelects)

> 联系方式 

QQ群: 769620939

> 默认配置项

```
{
	//多选数据
	data: [],
	//默认选中数据, 优先级大于selected
	initValue: null,
	//默认提示
	tips: '请选择', //please selected
	//空数据提示
	empty: '暂无数据', //no data
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
	//下拉方向
	direction: 'auto',
	//自定义样式
	style: {},
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
					return '已选中 '+sels.length+' 项, 共 '+data.length+' 项'
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
```

> 默认方法

```
//更新组件
xmSelect: update(options)

//重置组件
xmSelect: reset()

//重新渲染
xmSelect: render(options)

//主动关闭
xmSelect: opened()

//主动关闭
xmSelect: closed()

//获取已选中数据
xmSelect: getValue()

//设置选中数据, array: 选中数据, show: 是否展开下拉框
xmSelect: setValue(array, show)
```

#### 示例

[示例页面](https://maplemei.gitee.io/xm-select/)

```
<h3>这是一个多选</h3>
<div id="demo1"></div>

<h3>这是一个国际版多选</h3>
<div id="demo2"></div>

<h3>有基础数据</h3>
<div id="demo3"></div>

<h3>有选中, 禁用的</h3>
<div id="demo4"></div>

<h3>自定义key</h3>
<div id="demo5"></div>

<h3>使用template自己构建选项1</h3>
<div id="demo6"></div>

<h3>使用template自己构建选项2</h3>
<div id="demo7"></div>

<h3>简单的展示形式1</h3>
<div id="demo8"></div>

<h3>简单的展示形式2</h3>
<div id="demo9"></div>

<h3>自定义展示</h3>
<div id="demo10"></div>

<h3>多余的用 +隐藏</h3>
<div id="demo11"></div>

<h3>不显示删除图标</h3>
<div id="demo12"></div>

<h3>换一个主题</h3>
<div id="demo13"></div>

<h3>开启搜索模式</h3>
<div id="demo14"></div>

<h3>自定义搜索方法</h3>
<div id="demo15"></div>

<h3>自定义搜索延迟 和 提示</h3>
<div id="demo16"></div>

<h3>1000条数据测试</h3>
<div id="demo17"></div>

<h3>自动判断下拉方向</h3>
<div id="demo18"></div>

<h3>只会往下</h3>
<div id="demo19"></div>

<h3>只会往上</h3>
<div id="demo20"></div>

<h3>自定义style样式</h3>
<div id="demo21"></div>


<script src="../dist/xm-select.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
	
	var demo1 = xmSelect.render({
		el: '#demo1', 
		language: 'zn',
		isShow: true,
	})

	var demo2 = xmSelect.render({
		el: '#demo2', 
		language: 'en'
	})

	var demo3 = xmSelect.render({
		el: '#demo3', 
		data: [
			{name: '水果', value: 1},
			{name: '蔬菜', value: 2},
			{name: '桌子', value: 3},
		]
	})

	var demo4 = xmSelect.render({
		el: '#demo4', 
		data: [
			{name: '水果', value: 1, selected: true, disabled: true},
			{name: '蔬菜', value: 2, selected: true},
			{name: '桌子', value: 3, disabled: true},
			{name: '北京', value: 4},
		]
	})

	var demo5 = xmSelect.render({
		el: '#demo5', 
		data: [
			{label: '水果', val: 1, sel: true, dis: true},
			{label: '蔬菜', val: 2, sel: true},
			{label: '桌子', val: 3, dis: true},
			{label: '北京', val: 4},
		],
		prop: {
			name: 'label',
			value: 'val',
			selected: 'sel',
			disabled: 'dis'
		}
	})

	var demo6 = xmSelect.render({
		el: '#demo6', 
		data: [
			{name: '水果', value: 1, selected: true, disabled: true},
			{name: '蔬菜', value: 2, selected: true},
			{name: '桌子', value: 3, disabled: true},
			{name: '北京', value: 4},
		],
		template: function(item, sels, name, value){
			return name  + '<span style="color: red; margin-left: 20px;">'+value+'</span>' 
		}
	})

	var demo7 = xmSelect.render({
		el: '#demo7', 
		data: [
			{name: '水果', value: 1, selected: true, disabled: true},
			{name: '蔬菜', value: 2, selected: true},
			{name: '桌子', value: 3, disabled: true},
			{name: '北京', value: 4},
		],
		template: function(item, sels, name, value){
			return name  + '<span style="position: absolute; right: 10px; color: red">'+value+'</span>' 
		}
	})

	var demo8 = xmSelect.render({
		el: '#demo8', 
		data: [
			{name: '水果', value: 1, selected: true, disabled: true},
			{name: '蔬菜', value: 2, selected: true},
			{name: '桌子', value: 3, disabled: true},
			{name: '北京', value: 4},
		],
		model: {
			label: {
				type: 'text',
				text: {
					left: '<',
					right: '>',
					separator: ', ',
				},
			}
		}
	})

	var demo9 = xmSelect.render({
		el: '#demo9', 
		data: [
			{name: '水果', value: 1, selected: true, disabled: true},
			{name: '蔬菜', value: 2, selected: true},
			{name: '桌子', value: 3, disabled: true},
			{name: '北京', value: 4},
		],
		model: {
			label: {
				type: 'count',
				count: {
					template: function(data, sels){
						return "已选中 " + sels.length + " 项, 共 " + data.length + " 项"
					}
				}
			}
		}
	})

	var demo10 = xmSelect.render({
		el: '#demo10', 
		data: [
			{name: '水果', value: 1, selected: true, disabled: true},
			{name: '蔬菜', value: 2, selected: true},
			{name: '桌子', value: 3, disabled: true},
			{name: '北京', value: 4},
		],
		model: {
			label: {
				type: 'count',
				count: {
					template: function(data, sels){
						return "我是自定义的... 已选中 " + sels.length + " 项, 共 " + data.length + " 项"
					}
				}
			}
		}
	})

	var demo11 = xmSelect.render({
		el: '#demo11', 
		data: [
			{name: '水果', value: 1, selected: true, disabled: true},
			{name: '蔬菜', value: 2, selected: true},
			{name: '桌子', value: 3, disabled: true},
			{name: '北京', value: 4},
		],
		model: {
			label: {
				type: 'block',
				block: {
					showCount: 1,
				}
			}
		}
	})

	var demo12 = xmSelect.render({
		el: '#demo12', 
		data: [
			{name: '水果', value: 1, selected: true, disabled: true},
			{name: '蔬菜', value: 2, selected: true},
			{name: '桌子', value: 3, disabled: true},
			{name: '北京', value: 4},
		],
		model: {
			label: {
				type: 'block',
				block: {
					showCount: 1,
					showIcon: false,
				}
			}
		}
	})

	var demo13 = xmSelect.render({
		el: '#demo13', 
		data: [
			{name: '水果', value: 1, selected: true, disabled: true},
			{name: '蔬菜', value: 2, selected: true},
			{name: '桌子', value: 3, disabled: true},
			{name: '北京', value: 4},
		],
		theme: {
			color: 'red',
		},
	})
	
	var demo14 = xmSelect.render({
		el: '#demo14', 
		data: [
			{name: '水果', value: 1, selected: true, disabled: true},
			{name: '蔬菜', value: 2, selected: true},
			{name: '桌子', value: 3, disabled: true},
			{name: '北京', value: 4},
		],
		filterable: true, //开启搜索
	})
	
	var demo15 = xmSelect.render({
		el: '#demo15', 
		data: [
			{name: '水果', value: 1, selected: true, disabled: true},
			{name: '蔬菜', value: 2, selected: true},
			{name: '桌子', value: 3, disabled: true},
			{name: '北京', value: 4},
		],
		filterable: true, //开启搜索
		filterMethod: function(val, item, index, prop){
			if(!val) return true;
			return item[prop.name].indexOf(val) != -1;
		},
	})
	
	var demo16 = xmSelect.render({
		el: '#demo16', 
		data: [
			{name: '水果', value: 1, selected: true, disabled: true},
			{name: '蔬菜', value: 2, selected: true},
			{name: '桌子', value: 3, disabled: true},
			{name: '北京', value: 4},
		],
		filterable: true, //开启搜索
		delay: 2000,
		searchTips: '搜索呀 搜索呀...',
	})
	
	var startTime = Date.now();
	var demo17 = xmSelect.render({
		el: '#demo17', 
		data: ''.padEnd(1000, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
		filterable: true, //开启搜索
	})
	console.log('1000条数据渲染耗时: ' + (Date.now() - startTime) + 'ms');
	
	var demo18 = xmSelect.render({
		el: '#demo18', 
		data: ''.padEnd(100, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
		filterable: true, //开启搜索
		direction: 'auto',
	})
	
	var demo19 = xmSelect.render({
		el: '#demo19', 
		data: ''.padEnd(100, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
		filterable: true, //开启搜索
		direction: 'down',
	})
	
	var demo20 = xmSelect.render({
		el: '#demo20', 
		data: ''.padEnd(100, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
		filterable: true, //开启搜索
		direction: 'up',
	})
	
	var demo21 = xmSelect.render({
		el: '#demo21', 
		data: ''.padEnd(100, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
		filterable: true, //开启搜索
		style: {
			width: '200px',
			marginLeft: '20px',
		}
	})
</script>
```
