## 测试


:::demo 
```html

<div id="demo1" class="xm-select-demo"></div>

<script>
//先渲染多选
var demo1 = xmSelect.render({
    el: '#demo1', 
    autoRow: true,
    filterable: true,
    toolbar: {show: true},
    paging: true,
    create: (val, data) => {
        console.log(val, data)
        return {
            name: val,
            value: val,
        }
    },
    data(){
        return [
            {name: '销售员', children: [
                {name: '张三1', value: 1, selected: true},
                {name: '李四1', value: 2, selected: true},
                {name: '王五1', value: 3, disabled: true},
            ]},
            {name: '奖品', children: [
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
