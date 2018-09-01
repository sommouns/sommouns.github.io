const H5 = function () {
	this.id = `h5_c_${Math.random()}`.replace('.', '_')
	this.el = $(`<div class="h5" id=${this.id}>`).hide()
	this.pages = []
	$('body').append(this.el)

	this.addPage = function (name, text) {
		const page = $('<div class="h5_page section">')
		if (name) {
			page.addClass(`h5_page_${name}`)
		}
		if (text) {
			page.text(text)
		}
		this.el.append(page)
		this.pages.push(page)
		return this
	}
	this.addComponent = function (name, cfg) {
		var cfg = cfg || {}
		cfg = $.extend({
			type: 'base'
		}, cfg)

		var component
		var page = this.pages.slice(-1)[0]

		switch(cfg.type) {
			case 'base' :
				component = new h5ComponentBase(name, cfg);break;
			default:
		}
		page.append(component)

		return this
	}
	this.loader = function () {
		this.el.fullpage({
			onLeave(index, nextIndex, direction) {
				$(this).find('.h5_component').trigger('onLeave')
			},
			afterLoad(anchorLink, index) {
				$(this).find('.h5_component').trigger('onLoad')
			} 
		})
		this.pages[0].find('.h5_component').trigger('onLoad')
		this.el.show()
	}

	return this
}