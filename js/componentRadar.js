var h5ComponentRadar = function(name, cfg){
	var component = new h5ComponentBase(name, cfg)
	// component.text('111')

	var w = cfg.width
	var h = cfg.height

	var cns = document.createElement('canvas')
	var ctx = cns.getContext('2d')
	cns.width = ctx.width = w
	cns.height = ctx.height = h
	component.append(cns)
	step = cfg.data.length
	r = w/2
	ctx.beginPath()
	
	ctx.stroke()
	ctx.beginPath()
	// ctx.arc(r,r,r,0,2*Math.PI)
	ctx.stroke()
	var isBlue = true
	for (var s = 10; s > 0; s--) {
		isBlue = !isBlue
		ctx.beginPath()
		for (var i = 0; i < step; i++) {
			var rad = (2*Math.PI/360)*(360/step)*i + Math.PI
			var x = r + Math.sin(rad)*r*(s/10)
			var y = r + Math.cos(rad)*r*(s/10)
			
			// ctx.arc(x,y,5,0,2*Math.PI)
			ctx.lineTo(x,y)
			
		}
			ctx.closePath()
			ctx.fillStyle = isBlue ? '#99c0ff' : "#f1f9ff"
			ctx.fill()
			ctx.stroke()
	}

	for (var i = 0; i < step; i++) {
			var rad = (2*Math.PI/360)*(360/step)*i + Math.PI
			var x = r + Math.sin(rad)*r
			var y = r + Math.cos(rad)*r
			
			// ctx.arc(x,y,5,0,2*Math.PI)
			ctx.beginPath()
			ctx.moveTo(r,r)
			ctx.lineTo(x,y)
			ctx.stroke()

			var text = $('<div class="text">')
			text.css('transition',`.5s all ${0.5*i}s`)
			text.text(cfg.data[i][0])
			if( x > w/2) {
				// console.log(x,w/2)
				text.css('left', x/2-10)
			}else {
				// console.log(x,w/2)
				// console.log(text.style)
				text.css('right', (w-x)/2+5)
			}
			if( y > h/2) {
				text.css('top', y/2+5)
			}else {
				text.css('bottom', (w-y)/2+5)
			}
			text.css('opacity', 0)
			component.append(text)
		}

	var cns2 = document.createElement('canvas')
	var ctx2 = cns2.getContext('2d')
	cns2.width = ctx2.width = w
	cns2.height = ctx2.height = h
	component.append(cns2)

	ctx2.strokeStyle = '#f00'
	function draw(per) {	
		if (per >= 1) {
			component.find('.text').css('opacity',1)
		}
		if (per <= 1) {
			component.find('.text').css('opacity',0)
		}
		ctx2.clearRect(0,0,w,h)
		ctx2.beginPath()
		for (var i=0;i<step;i++) {
			var rad = (2*Math.PI/360)*(360/step)*i + Math.PI
			var rate = cfg.data[i][1]
			var x = r + Math.sin(rad)*r*rate*per
			var y = r + Math.cos(rad)*r*rate*per

			ctx2.lineTo(x,y)
			ctx2.arc(x,y,5,0,2*Math.PI)
			ctx2.fillStyle = 'rgba(255,136,120,0.38)'
			ctx2.fill()
		}
		ctx2.closePath()
		ctx2.stroke()
	}

		

	component.on('onLoad', function() {
		var s = 0
		for (var i = 0; i < 100; i++) {
			setTimeout(function(){
				s+=.01
				draw(s)
			}, i*10)
			
		}
	})
	component.on('onLeave', function() {
		var s = 1
		for (var i = 0; i < 100; i++) {
			setTimeout(function(){
				s-=.01
				draw(s)
			}, i*10)
			
		}
	})
	return component
}