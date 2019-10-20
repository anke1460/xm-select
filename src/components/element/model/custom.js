import { h, Component, render } from '@/components/preact'

/**
 * 默认提示
 */
class Custom extends Component{

	constructor(options){
		super(options);
	}

    blockClick(e){
    	e.stopPropagation();
    }

    shouldComponentUpdate(){
        return !this.already;
    }

	render(config) {
        this.already = true;
		return (
			<div onClick={ this.blockClick } class="xm-body-custom" dangerouslySetInnerHTML={{ __html: config.content }}>

            </div>
		)
	}
}

export default Custom;
