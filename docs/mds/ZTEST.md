## 测试

:::demo 
```html
<div id="demo1" class="xm-select-demo"></div>

<script>
var demo1 = xmSelect.render({
	el: '#demo1', 
	autoRow: true,
	filterable: true,
	tree: {
		strict: false,
		show: true,
		showFolderIcon: true,
		showLine: true,
		indent: 20,
		expandedKeys: [ -1 ],
		lazy: true,
		load: function(item, cb){
			setTimeout(function(){
				var name = item.name + 1;
				cb([
					{name: item.name + 1, value: item.value + '1', children: [] },
					{name: item.name + 2, value: item.value + '2' },
				])
			}, 500)
		}
	},
	height: 'auto',
	data(){
		return [
			{name: '销售员', value: -1, children: [
				{name: '张三1', value: 100, selected: true, children: []},
				{name: '李四1', value: 2, selected: true},
				{name: '王五1', value: 3, disabled: true},
			]},
			{name: '奖品', value: -2, children: [
				{name: '奖品3', value: -3, children: [
					{name: '苹果3', value: 14, selected: true},
					{name: '香蕉3', value: 15},
					{name: '葡萄3', value: 16},
				]},
				{name: '苹果2', value: 4, selected: true, disabled: true},
				{name: '香蕉2', value: 5},
				{name: '葡萄2', value: 6},
			]},
		]
	}
})
</script>
```
:::
