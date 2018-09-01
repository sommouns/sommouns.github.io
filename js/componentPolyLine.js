var h5ComponentPolyLine = function(name, cfg){
	var component = new h5ComponentBase(name, cfg)
	// component.text('111')

	var w = cfg.width
	var h = cfg.height

	var cns = document.createElement('canvas')
	cns.classList.add('canvas1')
	var ctx = cns.getContext('2d')
	cns.width = ctx.width = w
	cns.height = ctx.height = h


	//horizontal-line
	var step = 10
	ctx.beginPath()
	ctx.lineWidth = 1
	ctx.strokeStyle = '#aaa'
	var text_w = w/step >> 0

	for(var i = 0 ; i < step+1; i++){
		var y = (h/step) * i
		ctx.moveTo(0, y)
		ctx.lineTo(w, y)
	}	

	//vertical-line
	step = cfg.data.length+1
	for (var i = 0; i < step + 1; i++) {
		var x = (w/step) * i
		ctx.moveTo(x, 0)
		ctx.lineTo(x, h)
		if(cfg.data[i]){
			var text = $('<div class="text">')
			text.text(cfg.data[i][0])
			text.css('width', text_w).css('left', x/2 + text_w/4)
			component.append(text)
		}
		
	}
	ctx.stroke()

	//data
	var cns2 = document.createElement('canvas')
	var ctx2 = cns2.getContext('2d')

	cns2.width = ctx2.width = w
	cns2.height = ctx2.width = h
	function draw(per) {
		ctx2.clearRect(0,0,w,h)
		ctx2.beginPath()
		ctx2.lineWidth = 3
		ctx2.strokeStyle = '#ff8878'
		var x = 0
		var y = 0
		
		for ( var i in cfg.data) {
			var item = cfg.data[i]
			x = (w/(cfg.data.length + 1)) * i + (w/(cfg.data.length + 1))
			y = h-item[1]*h*per
			ctx2.moveTo(x, y)
			ctx2.arc(x, y, 1, 0, 2*Math.PI)
		}
		ctx2.moveTo( (w/(cfg.data.length + 1)), h * (1-cfg.data[0][1]*per))
		for ( i in cfg.data) {
			var item = cfg.data[i]
			x = (w/(cfg.data.length + 1)) * i + (w/(cfg.data.length + 1))
			y = h-item[1]*h*per
			ctx2.lineTo(x, y)
		}

		ctx2.stroke()
		ctx2.strokeStyle = 'rgba(255,255,255,0)'
		ctx2.lineWidth = 1
		ctx2.lineTo(x, h)
		ctx2.lineTo((w/(cfg.data.length + 1)), h)
		ctx2.fillStyle = 'rgba(255,136,120,0.38)'
		ctx2.fill()

		for ( i in cfg.data) {
			var item = cfg.data[i]
			x = (w/(cfg.data.length + 1)) * i + (w/(cfg.data.length + 1))
			y = h-item[1]*h*per
			// ctx2.moveTo(x, y)
			ctx2.fillStyle = '#222'
			ctx2.fillText((item[1]*100*per>>0)+'%', x-10 , y-20)
		}
		ctx2.stroke()
		cns2.classList.add('canvas2')
	}
	

	component.append(cns).append(cns2)

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