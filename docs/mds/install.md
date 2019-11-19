## 安装


### 简介

:::tip
基于 [layui](https://layui.com) 的一个多选解决方案。前身 [formSelects](https://github.com/hnzzmsf/layui-formSelects/)，经历了4个大版本的更新迭代，移除了对 `jquery` 的依赖，以一种全新的面貌诞生了。
:::

- 唯一依赖库[preactjs](https://preactjs.com/)
- 打包方式[webpack](https://www.webpackjs.com/)
- 文档借鉴于[ElementUI](https://element.eleme.cn/#/zh-CN)的编写方式
- [Fly社区交流贴](https://fly.layui.com/jie/57776/)
- QQ交流群: `660408068`

> 作者: maplemei, 热爱前端的Java程序猿, 如果喜欢作者的插件, 可以请作者吃雪糕 ^_^

<p>
	<a href="javascript:;">
		<img src="../assets/wx.jpg" alt="打赏" width="300">
	</a>
</p>



### 下载

[![star](https://gitee.com/maplemei/xm-select/badge/star.svg?theme=dark)](https://gitee.com/maplemei/xm-select/stargazers)
[![fork](https://gitee.com/maplemei/xm-select/badge/fork.svg?theme=dark)](https://gitee.com/maplemei/xm-select/members)

[码云下载](https://gitee.com/maplemei/xm-select/releases)



### 二次开发

```
$ git clone https://gitee.com/maplemei/xm-select.git
$ cd xm-select
$ npm install && npm run dev
```


### Hello World


:::demo 只需引入`xm-select.js`
```html
<div id="demo1" class="xm-select-demo"></div>
<button class="btn" id="demo1-getValue">获取选中值</button>
<pre id="demo1-value"></pre>

<script>
var demo1 = xmSelect.render({
	el: '#demo1', 
	language: 'zn',
	data: [
		{name: '张三', value: 1},
		{name: '李四', value: 2},
		{name: '王五', value: 3},
	]
})

document.getElementById('demo1-getValue').onclick = function(){
	//获取当前多选选中的值
	var selectArr = demo1.getValue();
	document.getElementById('demo1-value').innerHTML = JSON.stringify(selectArr, null, 2);
}
</script>

```
:::
