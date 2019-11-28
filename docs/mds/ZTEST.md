## 测试

:::demo 
```html
<div id="demo1" class="xm-select-demo"></div>

<script>
var demo1 = xmSelect.render({
	el: '#demo1', 
	autoRow: true,
	paging: true,
	pageSize: 2,
	tree: {
		strict: false,
		show: true,
		showFolderIcon: true,
		showLine: true,
		indent: 20,
		expandedKeys: [ -1 ],
		lazy: false,
		load: function(item, cb){
			setTimeout(function(){
				var name = item.name + 1;
				cb([
					{name: item.name + 1, value: item.value + '1', children: [] },
					{name: item.name + 2, value: item.value + '2' },
				])
			}, 500)
		},
	},
	toolbar: {
		show: true
	},
	height: 'auto',
	data(){
		return [
			{name: '销售员', value: -1, selected: true},
			{name: '奖品', value: -2, children: [
				{name: '奖品3', value: -3, children: [
					{name: '苹果3', value: 14, selected: false},
					{name: '香蕉3', value: 15},
					{name: '葡萄3', value: 16},
				]},
				{name: '苹果2', value: 4, selected: false, disabled: true},
				{name: '香蕉2', value: 5},
				{name: '葡萄2', value: 6},
			]},
		]
	}
})
</script>
```
:::
