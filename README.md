# xm-select

#### 介绍
始于Layui, 下拉选择框的多选解决方案

前身`formSelectes`, 移除了对`jquery`的依赖, 提高渲染速度

[xm-select演示站点](https://maplemei.gitee.io/xm-select/)

> 历史版本

[前往formSelectes](https://github.com/hnzzmsf/layui-formSelects)

> 联系方式 

QQ群: 660408068


[更新日志](CHANGELOG.md)


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
    <img src="docs/assets/wx.jpg" alt="打赏" width="300">
  </a>
</p>

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
