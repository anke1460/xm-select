import { h, Component, render } from '@/components/preact'

/**
 * 默认提示
 */
class Tips extends Component{
	
	constructor(options){
		super(options);
	}
	
	render({ tips, show }) {
		const tipsClass = show ? 'xm-tips' : 'xm-tips dis';
		return (
			<div class={ tipsClass }>{ tips }</div>
		)
	}
}

export default Tips;