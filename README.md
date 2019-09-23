# xm-select

#### 介绍
始于Layui, 下拉选择框的多选解决方案

前身`formSelectes`, 移除了对`jquery`的依赖, 提高渲染速度

[xm-select演示站点](https://maplemei.gitee.io/xm-select/)

> 历史版本

[前往formSelectes](https://github.com/hnzzmsf/layui-formSelects)

> 联系方式 

QQ群: 660408068


[更新日志](docs/changelog.md)


#### 软件架构
1. 引入第三方[preact](https://preactjs.com/)库, 利用jsx渲染页面结构
2. 使用[webpack](https://www.webpackjs.com/)进行打包


#### 快读上手

> 直接使用

```
1. 引入 `dist/xm-select.js`
2. 写一个`<div id="demo1"></div>`
3. 渲染
	var demo1 = xmSelect.render({
		el: '#demo1', 
		data: [
			{name: '水果', value: 1, selected: true, disabled: true},
			{name: '蔬菜', value: 2, selected: true},
			{name: '桌子', value: 3, disabled: true},
			{name: '北京', value: 4},
		],
   })
```

> 二次开发

```
1. git clone https://gitee.com/maplemei/xm-select.git
2. cd xm-select
3. yarn 或者 npm install
```

> 打赏

如果喜欢作者的插件, 可以请作者吃雪糕 ^_^

<p>
  <a href="javascript:;">
    <img src="docs/wx.jpg" alt="打赏" width="300">
  </a>
</p>


#### 使用说明

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
	//是否开启远程搜索
	remoteSearch: false,
	//远程搜索回调
	remoteMethod: function(val, cb){
		//val: 搜索的值, cb: 回调函数
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
	//模型, 用来控制插件的显示方式, 标签/文字/汇总个数/自定义
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
	hide(){
		
	},
	// 模板组成, 当前option数据
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

> 一个小栗子

```
<!-- 占位 -->
<div id="demo1"></div>


<!-- 引入插件 -->
<script src="../dist/xm-select.js" type="text/javascript" charset="utf-8"></script>
<!-- 渲染页面 -->
<script type="text/javascript">
	var demo1 = xmSelect.render({
		// 这里绑定css选择器
		el: '#demo1', 
		// 渲染的数据
		data: [
			{name: '水果', value: 1, selected: true, disabled: true},
			{name: '蔬菜', value: 2, selected: true},
			{name: '桌子', value: 3, disabled: true},
			{name: '北京', value: 4},
		],
	})
	
	// 变量, demo1 可以通过API操作
	// 获取选中值, demo1.getValue();
	// 设置选中值, demo1.setValue([{ name: '动态值', value: 999 }])
	// ...
</script>
```
