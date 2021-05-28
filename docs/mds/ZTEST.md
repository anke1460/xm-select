## 测试

:::demo 
```html
<div id="demo1" class="xm-select-demo"></div>

<script>
xmSelect.render({
	el: '#demo1', 
	autoRow: true,
	cascader: {
		show: true,
		indent: 200,
	},
	height: '200px',
	max: 1,
	maxMethod(a, item){
		console.log(item)
	},
	submitConversion(sels, prop){
		return sels.map(item => item[prop.name]).join(',')
	},
	data(){
		return [
			{name: '销售员', value: -1, disabled: false, children: [
				{name: '张三1', value: 1, selected: true, children: []},
				{name: '王五1', value: 13, disabled: true},
				{name: '王五1', value: 131, disabled: true},
				{name: '王五1', value: 132, disabled: true},
				{name: '王五1', value: 133, disabled: true},
				{name: '王五1', value: 134, disabled: true},
				{name: '王五1', value: 135, disabled: true},
				{name: '王五1', value: 136, disabled: true},
				{name: '王五1', value: 137, disabled: true},
				{name: '王五1', value: 138, disabled: true},
			]},
			{name: '奖品', value: -2, children: [
				{name: '奖品3', value: -3, children: [
					
				]},
				{name: '苹果2', value: 4, disabled: true},
				{name: '香蕉2', value: 5},
				{name: '葡萄2', value: 6},
			]},
			{name: '李四1', value: 2},
			{name: '王五1', value: 3, disabled: true},
			{name: '王五1', value: 31, disabled: true},
			{name: '王五1', value: 32, disabled: true},
			{name: '王五1', value: 33, disabled: true},
			{name: '王五1', value: 34, disabled: true},
			{name: '王五1', value: 35, disabled: true},
			{name: '王五1', value: 36, disabled: true},
			{name: '王五1', value: 37, disabled: true},
			{name: '王五1', value: 38, disabled: true},
		]
	}
	
})

</script>
```
:::
