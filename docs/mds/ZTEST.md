## 测试


:::demo 
```html

<div id="demo1" class="xm-select-demo"></div>

<script>
var demo1 = xmSelect.render({
    el: '#demo1', 
    filterable: true,
    toolbar: {
        show: true
    },
    height: '500px',
    model: {
        icon: 'hidden',
    },
    autoRow: true,
    data: [
        {name: '城市', optgroup: true},
        {name: '北京13', value: 1},
        {name: '天津1', value: 2, selected: true, disabled: true},
        {name: '上海1', value: 3},
        {name: '销售员', children: [
            {name: '李四23', value: 4, selected: true},
            {name: '王五2', value: 5},
        ]},
    ],
})
</script>
```
:::
