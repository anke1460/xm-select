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
		expandedKeys: [ -1, -2 ],
	},
	model: {
		icon: 'hidden'
	},
	toolbar: {
		show: true
	},
	height: 'auto',
	data(){
		return [
			{name: '北京市时代峰峻莱克斯顿荆防颗粒受到了开发建设的路口附近', value: -1, children: [
				{name: '朝阳区', value: 1},
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
	on: function(data){
		var arr = data.arr;
		var item = data.change[0];
		var isAdd = data.isAdd;
		
		if(isAdd){
			//检查是否有父节点
			var parent = item.__node.parent;
			if(parent){//有父节点，选中的是子节点，移除父节点的选中状态
				var index = arr.findIndex(function(option){
					return option.value === parent.value
				})
				if(index != -1){
					arr.splice(index, 1)
				}
			}else{//无父节点，选中的是父节点，移除子节点的选中状态
				var child = item.children;
				child.forEach(function(childItem){
					var index = arr.findIndex(function(option){
						return option.value === childItem.value
					})
					if(index != -1){
						arr.splice(index, 1)
					}
				})
			}
			return arr;
		}
	}
})
</script>
```
:::
