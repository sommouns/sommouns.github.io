var h5ComponentBar = function(name, config) {
	var component = new h5ComponentBase(name, config)

	$.each(config.data, function(idx, item) {

		var line = $('<div class="line">')
		var name = $('<div class="name">')
		var rate = $('<div class="rate">')
		var per = $('<div class="per">')

		let width = item[1]*100 + '%'

		name.text(item[0])
		rate.css('width', width)
		var bg
		if (item[2]) {
			bg = `style="background-color:${item[2]}"`

		}
		rate.html(`<div class='bg' ${bg}></div>`)
		per.text(width)

		line.append(name).append(rate).append(per)

		component.append(line)
		console.log(item)
	})


	return component
}