## 测试

:::demo 
```html
<div id="demo1" class="xm-select-demo"></div>

<script>
var demo1 = xmSelect.render({
	el: '#demo1', 
	autoRow: true,
	height: '300px',
	radio: true,
	tree: {
		show: false,
		simple: true,
		expandedKeys: [-1],
	},
	toolbar: {
		show: true,
		list: ['ALL', 'REVERSE', 'CLEAR']
	},
	filterable: true,
	paging: true,
	pageRemote: true,
	remoteSearch: true,
	remoteMethod(val, cb, show, pageIndex){
		cb([
			{name: '张三11111111111', value: 1, selected: true, children: []},
			{name: '李四1', value: 2, selected: true},
			{name: '王五1', value: 3, disabled: false},
		])
	},
	data(){
		return []
	}
})

</script>
```
:::
