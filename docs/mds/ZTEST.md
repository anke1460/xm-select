## 测试

:::demo 
```html
<div id="demo1" class="xm-select-demo"></div>

<script>
var demo1 = xmSelect.render({
	el: '#demo1', 
	paging: true,
	pageSize: 2,
	autoRow: true,
	tree: {
		strict: false,
		show: true,
		showFolderIcon: true,
		showLine: true,
		indent: 20,
		expandedKeys: [ 14 ],
		lazy: true,
		load: function(item, cb){
			setTimeout(function(){
				if(item.name.endsWith('2')){
					return cb([]);
				}
				cb([
					{name: item.name + 1, value: item.value + '1', children: [] },
					{name: item.name + 2, value: item.value + '2', children: [] },
				])
			}, 500)
		}
	},
	model: {
		icon: 'show'
	},
	radio: true,
	toolbar: {
		show: true
	},
	height: 'auto',
	on: function(a){
		console.log(this)
	}.bind('#demo1'),
	data(){
		return [
			{name: '北京市时代峰峻莱克斯顿荆防颗粒受到了开发建设的路口附近', value: -1, children: [
				{name: '朝阳区', value: 1, children: [
					{name: '河北省', value: -12, children: [
						{name: '廊坊市', value: 14, selected: true},
						{name: '石家庄', value: 15, selected: true},
						{name: '邯郸市', value: 16},
					]}
					
				]},
				{name: '海淀区', value: 2},
				{name: '通州区', value: 3},
			]},
			{name: '河北省', value: -2, children: [
				{name: '廊坊市', value: 4},
				{name: '石家庄', value: 5},
				{name: '邯郸市', value: 6},
			]},
		]
	},
})
</script>
```
:::
