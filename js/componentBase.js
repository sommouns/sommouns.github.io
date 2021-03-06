// const h5ComponentBase = function(cfg) {
// 	const config = cfg || {}
// 	const id = `h5_c_${Math.random()}`.replace('.', '_')
// 	 console.log( config);
	        
// 	const cls = `h5_component_${config.type}`
// 	 console.log( cls);
	 
// 	const component = $(`<div class="h5_component" id="${id}">`)
// 	config.text && component.text(config.text)
// 	return component
// } 

const h5ComponentBase = function(name, cfg) {
	cfg = cfg || {}
	
	const id = `h5_c_${Math.random()}`.replace('.', '_')
	const cls = ` h5_component_${cfg.type}`
	const component = $(`<div class="h5_component_name_${name} h5_component ${cls}" id="${id}">` )

	cfg.text && component.text(cfg.text)
	cfg.width&& component.width(cfg.width/2)
	cfg.height && component.height(cfg.height/2)
	cfg.bg && component.css('backgroundImage', `url(${cfg.bg})`)
	cfg.css && component.css(cfg.css)
	if (cfg.center) {
		component.css({
			left:'50%',
			transform: 'translateX(-50%)',
			
		})
	}

	if(typeof cfg.onclick == 'function') {
		component.on('click', cfg.onclick)
	}
	component.on('onLoad', function() {
		setTimeout(function() {
			component.addClass(cls + '_load').removeClass(cls + '_leave')
			cfg.animateIn && component.animate(cfg.animateIn)
		}, cfg.delay || 0)
		
		return false
	})
	component.on('onLeave', function() {
		setTimeout(function() {
			component.addClass(cls + '_leave').removeClass(cls + '_load')
			cfg.animateOut && component.animate(cfg.animateOut)
		}, cfg.delay || 0)
		return false
	})

	return component

}