
var htmls = [], js = [];
data.forEach(function(item){
	htmls.push([
		'<div class="slide">',
			item.html,
			'<div class="dcode mt10"><script type="syntaxhighlighter" class="brush:html"><![CDATA[',
				item.comment ? item.comment.replace(/</g, '&lt;') : item.html.replace(/</g, '&lt;'),
			']]></script></div>',
			item.js && ['<div class="dcode mt10"><script type="syntaxhighlighter" class="brush:js"><![CDATA[',
				item.js.replace(/</g, '&lt;'),
			']]></script></div>'].join(''),
		'</div>',
	].join(''));
	js.push(item.js);
});

var box = $('#content');
box.append($(htmls.join('')));

js.forEach(function(item){
	eval(item);
});

SyntaxHighlighter.defaults["quick-code"] = false;
SyntaxHighlighter.defaults["gutter"] = false;
SyntaxHighlighter.all();

var ele = new Fathom('#content')

xmSelect.render({
	el: '#header',
	data: data.map(function(item, index){
		return {
			name: (index + 1) + '. ' + item.title,
			value: index,
			empty: !!item.title
		}
	}).filter(function(item){
		return item.empty;
	}),
	filterable: true,
	model: {
		label: {
			type: 'text',
			text: {
				left: '',
				right: '',
				separator: ', ',
			},
		},
	},
	radio: true,
	clickClose: true,
	on: function(data){
		data.selected && ele.scrollToSlide($('.slide:nth-child('+(data.item.value + 1)+')'));
	}
});