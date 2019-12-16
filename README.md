# xm-select

#### 介绍
始于Layui, 下拉选择框的多选解决方案

前身[前往formSelectes](https://github.com/hnzzmsf/layui-formSelects), 由于渲染速度慢, 代码冗余, 被放弃了

`xm-select`使用了新的开发方式, 利用preact进行渲染, 大幅度提高渲染速度, 并且可以灵活拓展

[xm-select演示站点](https://maplemei.gitee.io/xm-select/)

> 支持功能

- [x] 国际化 - 中文/英文
- [x] 多选
- [x] 单选
- [x] 重复选
- [x] 分组
- [x] 工具条
- [x] 创建条目
- [x] 显示模式
- [x] 搜索模式 (本地数据过滤, 远程搜索)
- [x] 分页模式
- [x] 下拉树
- [x] 下拉任意 - 可以自己写html

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
		<img src="docs/assets/wx.jpg" alt="打赏" width="300"  style="border: 1px solid #EFEFEF">
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

#### 相关

> 支持IE吗

简单适配IE10以上的版本, 如有其它兼容性问题, 请加群反馈

> 为什么没有css文件

已经内置到js代码中了, 直接引入`xm-select.js`即可使用

> 开源 != 无私

有问题请自己多动手尝试^_^

> 成长之路

```
maplemei, 一个90后, 热爱前端的程序猿

16年接触了 贤心大大 的 layui, 开始走向了前端的不归之路
17年尝试自己写了一个基于layui的省市区联动插件, 同年底开发了layui select多选第一版
18年6月发布了formSelects
19年6月发布了xm-select

其实每个版本的更新都是自己对前端的一个新的认知, 也是一个新的学习之路

目前作者几乎不怎么使用layui, 已经走向了vue, react的新途 , xm-select的维护是对layui的一种情怀 ^_^
```

