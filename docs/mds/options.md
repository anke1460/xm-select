## 配置项与方法


### 配置项

| 参数              | 说明                             | 类型            | 可选值 | 默认值 |
| ----------------- | ------------------------------  | --------------- | ------ | ------ |
| el                | 渲染对象, css选择器      | string          |    -    |    -      |
| language          | 语言选择              | string           |    zn / en    |    zn    |
| data              | 显示的数据              | array           |    -    |    [ ]    |
| initValue         | 初始化选中的数据, 需要在data中存在 | array           |    -    |    null    |
| tips              | 默认提示, 类似于placeholder | string           |    -    |    请选择    |
| empty             | 空数据提示 | string           |    -    |    暂无数据    |
| filterable        | 是否开启搜索 | boolean           |    true / false    |    false    |
| searchTips        | 搜索提示 | string           |    -    |    请选择    |
| delay             | 搜索延迟 ms | int           |    -    |    500    |
| filterMethod      | 搜索回调函数 | function(val, item, index, prop)  val: 当前搜索值, item: 每个option选项, index: 位置数据中的下标, prop: 定义key           |    -    |    -    |
| filterDone        | 搜索完成函数 | function(val)  val: 当前搜索值           |    -    |    -    |
| remoteSearch      | 是否开启自定义搜索 (远程搜索)| boolean           |    true / false   |    false    |
| remoteMethod      | 自定义搜索回调函数 | function(val, cb, show)  val: 当前搜索值, cb: 回调函数, 需要回调一个数组, 结构同data, show: 下拉框显示状态         |    -    |    -    |
| direction         | 下拉方向| string           |    auto / up / down   |    auto    |
| style             | 自定义样式| object           |    -   |    { }    |
| height            | 默认最大高度| string           |    -   |    200px   |
| paging            | 是否开启自定义分页 | boolean           |    true / false   |    false    |
| pageSize          | 分页条数 | int           |    -   |    10    |
| radio             | 是否开启单选模式 | boolean           |    true / false   |    false    |
| repeat            | 是否开启重复性模式 | boolean           |    true / false   |    false    |
| clickClose        | 是否点击选项后自动关闭下拉框 | boolean           |    true / false   |    false    |
| prop              | 自定义属性名称, 具体看下表 | object           |   -  |        |
| theme             | 主题配置, 具体看下表 | object           |   -  |        |
| model             | 模型, 多选的展示方式, 具体见下表 | object           |   -  |        |
| show              | 展开下拉的回调 | function           |   -  |    -    |
| hide              | 隐藏下拉的回调 | function           |   -  |    -    |
| template          | 自定义渲染选项 | function({ item, sels, name, value })  |   -  |    -    |
| on                | 监听选中变化 | function({ arr, change, isAdd })  |   -  |    -    |
| max               | 设置多选选中上限 | int  |   -  |    0    |
| maxMethod         | 达到选中上限的回到 | function(sels, item), sels: 已选中数据, item: 当前选中的值  |   -  |    -    |
| name              | 表单提交时的name  |  string  |   -  |    select    |
| toolbar           | 工具条, 具体看下表  |  object  |   -  |    -    |
| showCount         | 展示在下拉框中的最多选项数量  |  int  |   -  |    0    |
| autoRow           | 是否开启自动换行(选项过多时)  |  boolean  |   -  |    false    |


### prop

| 参数              | 说明                             | 类型            | 可选值 | 默认值 |
| ----------------- | ------------------------------  | --------------- | ------ | ------ |
| name        | 显示名称      | string     |    -    |    name      |
| value       | 选中值, 当前多选唯一        | string     |    -    |    value     |
| selected    | 是否选中      | string     |    -    |    selected      |
| disabled    | 是否禁用      | string     |    -    |    disabled      |
| children    | 分组children | string     |    -    |    children      |
| optgroup    | 分组optgroup | string     |    -    |    optgroup      |


### 分组说明

如果children属性为数组, 或者optgroup=true的时候开启分组模式

```
//平级结构下面的数据为一组
{name: '城市', optgroup: true},

//children下的数组为一组
{name: '销售员', children: [
    {name: '李四', value: 4, selected: true},
    {name: '王五', value: 5},
]},

//可在分组上定义click属性, 来定义点击事件
//这里以optgroup模式为例, children模式同理
{name: '选中', optgroup: true, click: 'SELECT'},
{name: '清空', optgroup: true, click: 'CLEAR'},
{name: '自动', optgroup: true, click: 'AUTO'},
{name: '自定义', optgroup: true, click: function(item){
    alert('自定义的, 想干嘛干嘛');
}},



```


### theme

| 参数          | 说明      | 类型            | 可选值 | 默认值 |
| ------------ | --------- | --------------- | ------ | ------ |
| color        | 主题颜色   | string     |    -    |    #009688  |
| maxColor     | 选中上限闪烁边框颜色      | string     |    -    |    #e54d42  |


### model

目前仅配置label即可

```
model: {
    //是否展示复选框或者单选框图标 show, hidden:变换背景色
    icon: 'show',
    label: {
        //使用方式
        type: 'block',
        //使用字符串拼接的方式
        text: {
            //左边拼接的字符
            left: '',
            //右边拼接的字符
            right: '',
            //中间的分隔符
            separator: ', ',
        },
        //使用方块显示
        block: {
            //最大显示数量, 0:不限制
            showCount: 0,
            //是否显示删除图标
            showIcon: true,
        },
        //自定义文字
        count: {
            //函数处理
            template(data, sels){
                //data: 所有的数据
                //sels: 选中的数据
                return `已选中 ${sels.length} 项, 共 ${data.length} 项`
            }
        },
    },
},
```


### toolbar

| 参数          | 说明      | 类型            | 可选值 | 默认值 |
| ------------ | --------- | --------------- | ------ | ------ |
| show         | 是否展示工具条   | boolean     |    true / false    |    false  |
| showIcon     | 是否显示工具图标 | boolean     |    true / false    |    true   |
| list         | 工具条数组 (默认有 全选/清空, 可以自定义)     | array       |    -    |   [ "ALL", "CLEAR" ] |

> 自定义方式

```

list: [ "ALL", "CLEAR", 
    {
        //显示图标, 可以是layui内置的图标, 也可以是自己引入的图标
        //传入的icon会转化为 <i class="layui-icon layui-icon-face-smile"></i>
        icon: 'layui-icon layui-icon-face-smile',
        //显示名称 
        name: 'xxx',
        //点击时触发的回调
        method: function(data){
            //data 当前页面的数据
            
        }
    } 
]


```


### 方法

:::warning
xmSelect.render()后会返回一个xmSelect对象, 可以进行方法调用
:::

| 事件名 | 说明               | 参数 |
| ------ | ------------------ | -------- |
| getValue  | 获取当前选中的数据 | (type: 类型), 可选值: name, nameStr, value, valueStr |
| setValue  | 动态设置数据 | (array: 选中的数据, show: 是否展开下拉, 不传默认当前显示状态, 取值: true/false) |
| append  | 追加赋值 | (array: 追加的数据) |
| delete  | 删除赋值 | (array: 删除的数据) |
| opened  | 主动展开下拉 | - |
| closed  | 主动关闭下拉 | - |
| reset  | 重置为上一次的render状态 | - |
| update  | 更新多选选中, reset不保留 | (options: 见配置项) |
