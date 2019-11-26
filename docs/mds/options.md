## 配置项与方法


### 配置项

| 参数				| 说明							| 类型			| 可选值			| 默认值		|
| ----------------- | ----------------------------- | ------------- | ------------- | --------- |
| el				| 渲染对象, css选择器, dom元素		| string		|	-			|	-	  	|
| language			| 语言选择						| string		|	zn / en		|	zn		|
| data				| 显示的数据						| array			|	-			|	[ ]		|
| content			| 自定义下拉框html				| string		|	-			|	-		|
| initValue			| 初始化选中的数据, 需要在data中存在 | array			|	-			|	null	|
| tips				| 默认提示, 类似于placeholder		| string		|	-			|	请选择	|
| empty				| 空数据提示						| string		|	-			|	暂无数据	|
| filterable		| 是否开启搜索					| boolean		| true / false	|	false	|
| searchTips		| 搜索提示						| string		|	-			|	请选择	|
| delay				| 搜索延迟 ms						| int			|	-			|	500		|
| filterMethod		| 搜索回调函数					| function(val, item, index, prop)  val: 当前搜索值, item: 每个option选项, index: 位置数据中的下标, prop: 定义key		   |	-	|	-	|
| filterDone		| 搜索完成函数					| function(val, list)  val: 当前搜索值, list: 过滤后的数据		   |	-	|	-	|
| remoteSearch		| 是否开启自定义搜索 (远程搜索)		| boolean		| true / false	|	false	|
| remoteMethod		| 自定义搜索回调函数				| function(val, cb, show, pageIndex)  val: 当前搜索值, cb(arr, totalPage): 回调函数, 需要回调一个数组, 结构同data, 远程分页需要第二个参数: 总页码, show: 下拉框显示状态, pageIndex: 分页下当前页码		 |	-	|	-	|
| direction			| 下拉方向						| string 		|	auto / up / down | auto	|
| style				| 自定义样式						| object		|	-   		| { }		|
| height			| 默认最大高度					| string		|	-   		| 200px		|
| paging			| 是否开启自定义分页				| boolean		| true / false	| false		|
| pageSize			| 分页条数						| int		   	|	-   		| 10		|
| pageEmptyShow		| 分页无数据是否显示				| boolean		| true / false	| true		|
| pageRemote		| 是否开启远程分页					| boolean		| true / false	| true		|
| radio				| 是否开启单选模式					| boolean		| true / false	| false		|
| repeat			| 是否开启重复性模式				| boolean		| true / false	| false		|
| clickClose		| 是否点击选项后自动关闭下拉框		| boolean		| true / false	| false		|
| prop				| 自定义属性名称, 具体看下表		| object		|   - 			|			|
| theme				| 主题配置, 具体看下表				| object		|   -  			|			|
| model				| 模型, 多选的展示方式, 具体见下表 	| object		|   -  			|			|
| show				| 展开下拉的回调					| function		|   -  			|	-		|
| hide				| 隐藏下拉的回调					| function		|   - 			|	-		|
| template			| 自定义渲染选项					| function({ item, sels, name, value })  |   -  |	-	|
| on				| 监听选中变化					| function({ arr, change, isAdd })  |   -  |	-	|
| max				| 设置多选选中上限					| int  			|   -  			|	0		|
| maxMethod			| 达到选中上限的回到				| function(sels, item), sels: 已选中数据, item: 当前选中的值  |   -  |	-	|
| name				| 表单提交时的name			 	|  string  		|   -  			|	select	|
| layVerify			| 表单验证, 同layui的lay-verify  	|  string  		|   - 			|	''		|
| layVerType		| 表单验证, 同layui的lay-verType  |  string  		|   -  			|	''		|
| toolbar			| 工具条, 具体看下表			 	|  object  		|   -  			|	-		|
| showCount			| 展示在下拉框中的最多选项数量	 	|  int  		|   - 		 	|	0		|
| autoRow			| 是否开启自动换行(选项过多时)	 	|  boolean  	| true / false  |	false	|
| size				| 尺寸						 	|  string  		| large / medium / small / mini  |	medium	|
| disabled			| 是否禁用多选				 	|  boolean		| true / false	|	false	|
| create			| 创建条目					 	|  function(val, data), val: 搜索的数据, data: 当前下拉数据		   |	-   |	null	|
| tree				| 树形结构, 具体看下表			 	|  object		|	-  			|	-		|


### prop

| 参数			| 说明						| 类型		 | 可选值 	| 默认值 		|
| ------------- | ------------------------- | ---------- | -------- | ------------- |
| name			| 显示名称					| string	 |	-		|	name		|
| value	   		| 选中值, 当前多选唯一			| string	 |	-		|	value	 	|
| selected		| 是否选中	 			 	| string	 |	-		|	selected	|
| disabled		| 是否禁用	  				| string	 |	-		|	disabled	|
| children		| 分组children		 		| string	 |	-		|	children	|
| optgroup		| 分组optgroup 				| string	 |	-		|	optgroup	|


### 分组说明

如果children属性为数组的时候开启分组模式

```
{name: '销售员', children: [
	{name: '李四', value: 4, selected: true},
	{name: '王五', value: 5},
]},

//可在分组上定义click属性, 来定义点击事件
{name: '选中', children: [...], click: 'SELECT'},
{name: '清空', children: [...], click: 'CLEAR'},
{name: '自动', children: [...], click: 'AUTO'},
{name: '自定义', children: [...], click: function(item){
	alert('自定义的, 想干嘛干嘛');
}},



```


### theme

| 参数		| 说明				| 类型		| 可选值  | 默认值 	|
| --------- | ----------------- | --------- | ------ | -------- |
| color		| 主题颜色   		| string	|	-	 |	#009688 |
| maxColor	| 选中上限闪烁边框颜色| string	|	-	 |	#e54d42 |
| hover		| 键盘操作的背景色	| string	|	-	 |	#f2f2f2 |


### model

目前仅配置label即可

```
model: {
	//是否展示复选框或者单选框图标 show, hidden:变换背景色
	icon: 'show',
	label: {
		//使用方式
		type: 'block',
		//使用字符串拼接的方式
		text: {
			//左边拼接的字符
			left: '',
			//右边拼接的字符
			right: '',
			//中间的分隔符
			separator: ', ',
		},
		//使用方块显示
		block: {
			//最大显示数量, 0:不限制
			showCount: 0,
			//是否显示删除图标
			showIcon: true,
			//自定义渲染label, 默认渲染name, 回调参数(item, sels)
			template: null,
		},
		//自定义文字
		count: {
			//函数处理
			template(data, sels){
				//data: 所有的数据
				//sels: 选中的数据
				return `已选中 ${sels.length} 项, 共 ${data.length} 项`
			}
		},
	},
},
```


### toolbar

| 参数		 | 说明	 							 						| 类型		 | 可选值  		| 默认值			 	 |
| ---------- | -------------------------------------------------------- | ---------- | ------------ | ------------------ |
| show		 | 是否展示工具条  										 	| boolean	 | true / false	| false				 |
| showIcon	 | 是否显示工具图标 											| boolean	 | true / false	| true   			 |
| list		 | 工具条数组 (默认有 全选/清空, 可以自定义), 还有 REVERSE:反选	| array	   	 |	-			| [ "ALL", "CLEAR" ] |

> 自定义方式

```

list: [ "ALL", "CLEAR", 
	{
		//显示图标, 可以是layui内置的图标, 也可以是自己引入的图标
		//传入的icon会转化为 <i class="layui-icon layui-icon-face-smile"></i>
		icon: 'layui-icon layui-icon-face-smile',
		//显示名称 
		name: 'xxx',
		//点击时触发的回调
		method: function(data){
			//data 当前页面的数据
			
		}
	} 
]


```

### tree

| 参数		  		| 说明	  				| 类型			| 可选值 		| 默认值	 |
| ----------------- | --------------------- | ------------- | ------------- | ------ |
| show				| 是否展示为树状结构   	| boolean		| true / false	| false  |
| showFolderIcon	| 是否显示节点前的三角图标	| boolean	 	| true / false	| true   |
| showLine			| 是否显示虚线		 	| boolean	 	| true / false	| true   |
| indent	   		| 间距	 				| int	   		|	-   		| 20 	 |
| expandedKeys 		| 默认展开的节点数组	 	| array	   		|	-			| [ ]	 |
| strict 			| 是否遵循严格父子结构	 	| boolean	 	| true / false	| true	 |


### 全局方法


| 事件名  | 说明					| 参数					 						| 返回值 			|
| ------ | -------------------- | --------------------------------------------- | ----------------- |
| render | 渲染多选				| (options: 配置项) 								| 实例对象 			|
| get	 | 获取页面中已经渲染的多选	| (filter: 过滤`el`, single: 是否返回单实例) 		| 符合条件的实例数组 	|
| batch  | 批量操作已渲染的多选	    | (filter: 过滤`el`, method: 方法, ...方法参数) 	| 符合条件的实例数组 	|

```
//render 使用方式
xmSelect.render(OPTIONS);

//get 使用方式
xmSelect.get('#demo1');	 //指定某一个获取
xmSelect.get(/.*demo1.*/);  //正则获取
//自定义方法获取
xmSelect.get(function(el){
	return el == '#demo1' || el == '#demo2';
});  
//单实例
xmSelect.get('#demo2', true);

//batch 使用方式
//批量执行禁用
xmSelect.batch(/.*demo/, 'update', {
	disabled: true,
});   
//批量执行warning
xmSelect.batch(/.*demo/, 'warning', '#F00', true);   
```


### 实例方法

:::warning
xmSelect.render()后会返回一个xmSelect对象, 可以进行方法调用
:::

| 事件名 	| 说明						| 参数 				|
| --------- | ------------------------- | ----------------- |
| getValue  | 获取当前选中的数据 			| (type: 类型), 可选值: name, nameStr, value, valueStr |
| setValue  | 动态设置数据				| (array: 选中的数据, show: 是否展开下拉,不传默认当前显示状态,取值: true/false, listenOn: 是否触发on的监听, 默认false) |
| append  	| 追加赋值 					| (array: 追加的数据) |
| delete  	| 删除赋值 					| (array: 删除的数据) |
| opened  	| 主动展开下拉 				| -		 			|
| closed  	| 主动关闭下拉 				| - 				|
| reset  	| 重置为上一次的render状态 	| - 				|
| update  	| 更新多选选中, reset不保留 	| (options: 见配置项) |
| warning  	| 警告 						| (color: 默认同theme.maxColor, sustain: 是否持续显示) |
