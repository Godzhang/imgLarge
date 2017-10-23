(function(){
	var picZoom = function(options){
		this.opt = Object.assign({}, options);
		this.smallbox = this.opt.smallbox;
		this.smallImg = this.smallbox.getElementsByTagName('img')[0];
		this.shade = this.opt.shade;
		this.bigBox = this.opt.bigBox;
		this.bigImg = this.bigBox.getElementsByTagName('img')[0];
		this.endX = 0;
		this.endY = 0;
		this.shadeWidth = 0;
		this.shadeHeight = 0;
		this.percent = this.bigImg.clientWidth / this.smallImg.clientWidth;
		this.init();
	}
	picZoom.prototype = {
		init: function(){
			var self = this;

			// this.getShade();

			// this.setBigBox();

			this.addEvent(this.smallbox, "mouseenter", function(){
				self.shade.style.display = "block";
				self.bigBox.style.display = "block";
				self.shadeWidth = self.shade.clientWidth;
				self.shadeHeight = self.shade.clientHeight;
			}, false);

			this.addEvent(this.smallbox, "mousemove", function(event){
				event = event || window.event;
				self.endX = event.clientX - self.smallbox.offsetLeft;
				self.endY = event.clientY - self.smallbox.offsetTop;

				self.moveShade(self.endX, self.endY);
			}, false);

			this.addEvent(this.smallbox, "mouseleave", function(){
				self.shade.style.display = "none";
				self.bigBox.style.display = "none";
			}, false);
		},
		// getShade: function(){
		// 	this.shade.top = "-9999px";
		// 	this.shade.left = "-9999px";
		// 	this.shade.style.display = "block";
		// 	this.shadeWidth = this.shade.clientWidth;
		// 	this.shadeHeight = this.shade.clientHeight;
		// 	this.shade.style.display = "none";
		// },
		// setBigBox: function(){
		// 	this.bigBox.style.width = this.shadeWidth * this.percent + "px";
		// 	this.bigBox.style.height = this.shadeHeight * this.percent + "px";
		// },
		moveShade: function(x, y){
			var left = x - this.shadeWidth/2,
				top = y - this.shadeHeight/2;

			if(left < 0){
				left = 0;
			}
			if(left > this.smallbox.clientWidth - this.shadeWidth){
				left = this.smallbox.clientWidth - this.shadeWidth;
			}
			if(top < 0){
				top = 0;
			}
			if(top > this.smallbox.clientHeight - this.shadeHeight){
				top = this.smallbox.clientHeight - this.shadeHeight;
			}

			this.shade.style.left = left + "px";
			this.shade.style.top = top + "px";

			//设置大图的位置
			var bigLeft = - left * this.bigBox.clientWidth / this.shadeWidth;
			var bigTop = - top * this.bigBox.clientWidth / this.shadeWidth;

			this.bigImg.style.left = bigLeft + "px";
			this.bigImg.style.top = bigTop + "px";
		},
		addEvent: function(elem, type, fn, bubble){
			if(document.addEventListener){
				elem.addEventListener(type, fn, bubble);
			}else if(document.attachEvent){
				elem.attachEvent('on' + type, function(){
					fn.call(elem);
				});
			}else{
				elem['on' + type] = fn;
			}
		}
	}

	window.picZoom = picZoom;
})();
