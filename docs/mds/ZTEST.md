## 测试

:::demo 
```html
<div id="demo1" class="xm-select-demo"></div>

<script>
var demo1 = xmSelect.render({
	el: '#demo1', 
	data: [
	],
})

setTimeout(function(){
	demo1.update({
		empty: 'xxx'
	})
}, 1000)


</script>
```
:::
