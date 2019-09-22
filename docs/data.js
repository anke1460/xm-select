window.data = [
{ html: `
<a href='https://gitee.com/maplemei/xm-select'><img src='https://gitee.com/maplemei/xm-select/widgets/widget_6.svg' alt='Fork me on Gitee'></img></a>
<p>xm-select始于layui, 前身formSelects, 此版本引入第三方preact库, 利用jsx渲染页面结构</p>
<p>作者: 热爱前端的Java程序猿</p>
<p>QQ号: 707200833</p>
<p>QQ群: 660408068</p>
<a target="_blank" class="qqicon" href="https://shang.qq.com/wpa/qunwpa?idkey=9f9d4de074f2cb4d13afb3f04b874742a5f400eac2c0648fcfd20afb5413fb0a"><img border="0" src="docs/group.png" alt="技术交流群" title="技术交流群"></a>
<div class="example">
	<p>↓↓↓ 捐赠作者 ↓↓↓</p>
	<p>
		<img src="docs/wx.jpg" width="230px" style="border: 1px solid #009688">
	</p>
	<p>你们的支持, 是我们坚持的动力</p>
</div>
<div id="test01"></div>
`, js: `
xmSelect.render({
	// 这里是指定渲染的地方
	el: '#test01', 
	// 这里是渲染的数据
	data: [{name: '水果', value: 1}, {name: '蔬菜', value: 2}]
})
`, comment: `
简单的使用方法:
1. 引入xm-select.js文件
2. <div id="test01"></div>
3. 使用js渲染指定元素
`, brush: 'html', title: '简介'}, 
	
	
{ html: `
<p>如果有bug欢迎提issues, 或者在群内@群主进行反馈</p>

<h3>更新日志</h3>
`, js: ``, comment: `,
[2019-09-22] v1.0.1
1. [新增]物理分页配置
2. [新增]自定义搜索模式(远程搜索)
3. [新增]下拉选高度配置
4. [修改]调整布局为flex布局
5. [修改]展开下拉选时, 自动聚焦搜索框


[2019-07-29] v1.0.0.0729
1. 更新文档显示问题


[2019-07-27] v1.0.0.0727
1. 新增单选模式, {radio: true|false}
2. 新增重复选模式, {repeat: true|false}
3. 新增配置, 可以控制是否自动关闭下拉框, {clickClose: true|false}
4. 新增on方法, 可以监听已选择数据, data: {arr, item, selected}

更新文档演示

[---] v1.0.0
很久很久以前...

`, brush: 'html', title: '更新日志'}, 


{ html: `
<h3>默认配置项options</h3>
`, comment: `
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
	//是否开启自定义搜索, 必须设置 filterable: true
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
`, brush: 'js', title: '默认配置项'}, 


{ html: `
<h3>所有的方法</h3>
`, comment: `
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
`, brush: 'js', title: '所有的方法method'}, 


{ html: `
<h3>这是一个国语版</h3>
<div id="demo1"></div>
`, js: `
var demo1 = xmSelect.render({
	el: '#demo1', 
	language: 'zn',
	data: ''.padEnd(100, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
})
`, brush: 'js', title: '这是一个国语版'}, 


{ html: `
<h3>这是一个国际版(English)</h3>
<div id="demo2"></div>
`, js: `
var demo02 = xmSelect.render({
	el: '#demo2', 
	language: 'en',
	data: ''.padEnd(100, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
})
`, brush: 'js', title: '这是一个国际版(English)'}, 


{ html: `
<h3>有基础数据</h3>
<div id="demo3"></div>
`, js: `
var demo3 = xmSelect.render({
	el: '#demo3', 
	data: [
		{name: '水果', value: 1},
		{name: '蔬菜', value: 2},
		{name: '桌子', value: 3},
	]
})
`, brush: 'js', title: '有基础数据'},


{ html: `
<h3>有选中, 禁用的</h3>
<div id="demo4"></div>
`, js: `
var demo4 = xmSelect.render({
	el: '#demo4', 
	data: [
		{name: '水果', value: 1, selected: true, disabled: true},
		{name: '蔬菜', value: 2, selected: true},
		{name: '桌子', value: 3, disabled: true},
		{name: '北京', value: 4},
	]
})
`, brush: 'js', title: '有选中, 禁用的'},


{ html: `
<h3>自定义key</h3>
<div id="demo5"></div>
`, js: `
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
`, brush: 'js', title: '自定义key'},


{ html: `
<h3>使用template自己构建选项1</h3>
<div id="demo6"></div>
`, js: `
var demo6 = xmSelect.render({
	el: '#demo6', 
	data: [
		{name: '水果', value: 1, selected: true, disabled: true},
		{name: '蔬菜', value: 2, selected: true},
		{name: '桌子', value: 3, disabled: true},
		{name: '北京', value: 4},
	],
	template: function({item, arr, name, value}){
		return name  + '<span style="color: red; margin-left: 20px;">'+value+'</span>' 
	}
})
`, brush: 'js', title: '使用template自己构建选项1'},


{ html: `
<h3>使用template自己构建选项2</h3>
<div id="demo7"></div>
`, js: `
var demo7 = xmSelect.render({
	el: '#demo7', 
	data: [
		{name: '水果', value: 1, selected: true, disabled: true},
		{name: '蔬菜', value: 2, selected: true},
		{name: '桌子', value: 3, disabled: true},
		{name: '北京', value: 4},
	],
	template: function({item, arr, name, value}){
		return name  + '<span style="position: absolute; right: 10px; color: red">'+value+'</span>' 
	}
})
`, brush: 'js', title: '使用template自己构建选项2'},


{ html: `
<h3>简单的展示形式1</h3>
<div id="demo8"></div>
`, js: `
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
`, brush: 'js', title: '简单的展示形式1'},


{ html: `
<h3>简单的展示形式2</h3>
<div id="demo9"></div>
`, js: `
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
				template: function(data, arr){
					return "已选中 " + arr.length + " 项, 共 " + data.length + " 项"
				}
			}
		}
	}
})
`, brush: 'js', title: '简单的展示形式2'},


{ html: `
<h3>自定义展示</h3>
<div id="demo10"></div>
`, js: `
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
				template: function(data, arr){
					return "我是自定义的... 已选中 " + arr.length + " 项, 共 " + data.length + " 项"
				}
			}
		}
	}
})
`, brush: 'js', title: '自定义展示'},


{ html: `
<h3>多余的用 +隐藏</h3>
<div id="demo11"></div>
`, js: `
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
				showIcon: true,
			}
		}
	}
})
`, brush: 'js', title: '多余的用 +隐藏'},


{ html: `
<h3>不显示删除图标</h3>
<div id="demo12"></div>
`, js: `
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
`, brush: 'js', title: '不显示删除图标'},


{ html: `
<h3>换一个主题</h3>
<div id="demo13"></div>
`, js: `
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
`, brush: 'js', title: '换一个主题'},


{ html: `
<h3>开启搜索模式</h3>
<div id="demo14"></div>
`, js: `
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
`, brush: 'js', title: '开启搜索模式'},


{ html: `
<h3>自定义搜索方法</h3>
<div id="demo15"></div>
`, js: `
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
`, brush: 'js', title: '自定义搜索方法'},


{ html: `
<h3>自定义搜索延迟 和 提示</h3>
<div id="demo16"></div>
`, js: `
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
`, brush: 'js', title: '自定义搜索延迟 和 提示'},


{ html: `
<h3>1000条数据测试</h3>
<div id="demo17"></div>
`, js: `
var startTime = Date.now();
var demo17 = xmSelect.render({
	el: '#demo17', 
	data: ''.padEnd(1000, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
	filterable: true, //开启搜索
})
console.log('1000条数据渲染耗时: ' + (Date.now() - startTime) + 'ms');
`, brush: 'js', title: '1000条数据测试'},


{ html: `
<h3>自动判断下拉方向</h3>
<div id="demo18"></div>
`, js: `
var demo18 = xmSelect.render({
	el: '#demo18', 
	data: ''.padEnd(100, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
	filterable: true, //开启搜索
	direction: 'auto',
})
`, brush: 'js', title: '自动判断下拉方向'},


{ html: `
<h3>只会往下</h3>
<div id="demo19"></div>
`, js: `
var demo19 = xmSelect.render({
	el: '#demo19', 
	data: ''.padEnd(100, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
	filterable: true, //开启搜索
	direction: 'down',
})
`, brush: 'js', title: '只会往下'},


{ html: `
<h3>只会往上</h3>
<div id="demo20"></div>
`, js: `
var demo20 = xmSelect.render({
	el: '#demo20', 
	data: ''.padEnd(100, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
	filterable: true, //开启搜索
	direction: 'up',
})
`, brush: 'js', title: '只会往上'},


{ html: `
<h3>自定义style样式</h3>
<div id="demo21"></div>
`, js: `
var demo21 = xmSelect.render({
	el: '#demo21', 
	data: ''.padEnd(100, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
	filterable: true, //开启搜索
	style: {
		width: '200px',
		marginLeft: '20px',
	}
})
`, brush: 'js', title: '自定义style样式'},


{ html: `
<h3>单选模式</h3>
<div id="demo22"></div>
`, js: `
var demo22 = xmSelect.render({
	el: '#demo22', 
	data: ''.padEnd(100, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
	radio: true,
	clickClose: true,
})
`, brush: 'js', title: '单选模式'},


{ html: `
<h3>重复选模式</h3>
<div id="demo23"></div>
`, js: `
var demo23 = xmSelect.render({
	el: '#demo23', 
	data: ''.padEnd(100, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
	repeat: true,
})
`, brush: 'js', title: '重复选模式'},


{ html: `
<h3>多选选完即关闭下拉选</h3>
<div id="demo24"></div>
`, js: `
var demo24 = xmSelect.render({
	el: '#demo24', 
	data: ''.padEnd(100, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
	clickClose: true,
})
`, brush: 'js', title: '多选选完即关闭下拉选'},


{ html: `
<h3>监听已选择数据</h3>
<div id="demo25"></div>
`, js: `
var demo25 = xmSelect.render({
	el: '#demo25', 
	data: ''.padEnd(100, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
	on: function({ arr, item, selected }){
		console.log('已选择: ', arr);
		console.log('点击选项: ', item);
		console.log('点击状态: ', selected);
		alert('选择: ' + JSON.stringify(item) + ', 状态: ' + selected);
	}
})
`, brush: 'js', title: '监听已选择数据on'},


{ html: `
<h3>监听下拉框的打开与关闭</h3>
<div id="demo26"></div>
`, js: `
var demo26 = xmSelect.render({
	el: '#demo26', 
	data: ''.padEnd(100, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
	show: function(){
		alert('打开了');
	},
	hidn: function(){
		alert('关闭了');
	}
})
`, brush: 'js', title: '监听下拉框的打开与关闭'},


{ html: `
<h3>控制下拉框的打开与关闭</h3>
<div id="demo27"></div>
`, js: `
var demo27 = xmSelect.render({
	el: '#demo27', 
	data: ''.padEnd(100, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
	show: function(){
		//这里也可以组件受控
		//return false;
	},
	hidn: function(){
		var arr = demo27.getValue();
		//如果已选择数据小于1, 则不会关闭下拉框
		if(arr.length < 1){
			return false;//组件受控
		}
	}
})
`, brush: 'js', title: '控制下拉框的打开与关闭'},


{ html: `
<h3>启用分页</h3>
<div id="demo28"></div>
`, js: `
var demo28 = xmSelect.render({
	el: '#demo28', 
	data: ''.padEnd(100, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
	paging: true,//开启分页
	pageSize: 10,//每页10条
})
`, brush: 'js', title: '启用分页'},


{ html: `
<h3>自定义搜索</h3>
<div id="demo29"></div>
`, js: `
var demo29 = xmSelect.render({
	el: '#demo29', 
	data: ''.padEnd(100, ' ').split('').map((a, i) => ( {name: 'name' + i, value: i} )),
	filterable: true,//开启搜索
	remoteSearch: true,//自定义搜索
	remoteMethod: function(val, cb){
		//这里模拟2s后回调
		setTimeout(() =>  {
			cb([{name: 'xxx' + val, value: 1}])
		}, 2000);
	},
})
`, brush: 'js', title: '自定义搜索'},


];