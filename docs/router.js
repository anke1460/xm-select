import Component from './components/component.vue';

function importVue(path) {
	return r => require.ensure([], () => r(require(`./pages${path}.vue`)));
}
function importMd(path) {
	return r => require.ensure([], () => r(require(`./mds${path}.md`)));
}



export default [{
		path: '*',
		hidden: true,
		redirect: '/',
	},{
		path: '/',
		name: '/',
		hidden: true,
		redirect: '/component',
	}, {
		path: '/changelog',
		name: '更新日志',
		component: importVue('/changelog'),
	}, {
		path: '/add',
		name: 'QQ群: 660408068',
		redirect: '/',
	}, {
		path: '/component',
		name: '入门指南',
		redirect: '/component/install',
		component: Component,
		children: [{
			path: '/component/install',
			name: '安装与使用',
			component: importMd('/install'),
		}, {
			path: '/component/options',
			name: '配置项与方法',
			component: importMd('/options'),
		}]
	}, {
		path: '/example',
		name: '示例',
		redirect: '/example/XM01',
		component: Component,
		children: [
            { path: '/example/XM01', name: 'Base 基础使用', component: importMd('/XM01') },
            { path: '/example/XM02', name: 'Language 国际化', component: importMd('/XM02') },
            { path: '/example/XM03', name: 'InitValue 默认选中', component: importMd('/XM03') },
            { path: '/example/XM04', name: 'Tips 修改提示', component: importMd('/XM04') },
            { path: '/example/XM05', name: 'Filterable 搜索模式', component: importMd('/XM05') },
            { path: '/example/XM06', name: 'Direction 下拉方向', component: importMd('/XM06') },
            { path: '/example/XM07', name: 'Style 自定义样式', component: importMd('/XM07') },
            { path: '/example/XM08', name: 'Paging 分页', component: importMd('/XM08') },
            { path: '/example/XM09', name: 'Radio 单选', component: importMd('/XM09') },
            { path: '/example/XM10', name: 'Repeat 重复选', component: importMd('/XM10') },
            { path: '/example/XM11', name: 'Prop 自定义属性', component: importMd('/XM11') },
            { path: '/example/XM12', name: 'Theme 主题', component: importMd('/XM12') },
            { path: '/example/XM13', name: 'Show 显示与隐藏', component: importMd('/XM13') },
            { path: '/example/XM14', name: 'Model 显示方式', component: importMd('/XM14') },
            { path: '/example/XM15', name: 'Template 构建选项', component: importMd('/XM15') },
            { path: '/example/XM16', name: 'On 监听选择', component: importMd('/XM16') },
            { path: '/example/XM17', name: 'Test 性能测试', component: importMd('/XM17') },
            { path: '/example/XM18', name: 'Max 多选上限', component: importMd('/XM18') },
            { path: '/example/XM19', name: 'Toolbar 工具条', component: importMd('/XM19') },
            { path: '/example/XM20', name: 'ShowCount 选项数量', component: importMd('/XM20') },
            { path: '/example/XM21', name: 'Optgroup 分组', component: importMd('/XM21') },
        ]
	}, {
		path: '/example-custom',
		name: '进阶示例',
		redirect: '/example-custom/ZM01',
		component: Component,
		children: [
            { path: '/example-custom/ZM01', name: '赋值与取值', component: importMd('/ZM01') },
            { path: '/example-custom/ZM02', name: '表单提交', component: importMd('/ZM02') },
            // { path: '/example-custom/ZM03', name: '表格中多选', component: importMd('/ZM03') },
            // { path: '/example-custom/ZTEST', name: '测试', component: importMd('/ZTEST') },
        ]
	}, {
		path: '/question',
		name: '常见问题',
		component: importMd('/question'),
	},

];
