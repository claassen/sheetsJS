
class Context {
  constructor(target, options) {
    options = Object.assign({
      onMouseMove: (x, y) => {},
      onMouseDown: (x, y) => {},
      onMouseUp: (x, y) => {},
      onMouseClick: (x, y) => {},
      onScroll: (dx, dy) => {}
    }, options);

    target.width = options.width * 2;
    target.height = options.height * 2;
    target.style.width = options.width + "px";
    target.style.height = options.height + "px";

    this.ctx = target.getContext("2d");
    this.ctx.scale(2, 2);

    var self = this;

    const getMouseCoords = function (e) {
  		var rect = self.ctx.canvas.getBoundingClientRect();

  		return {
  			x: e.clientX - rect.left,
  			y: e.clientY - rect.top
  		};
  	};

    this.ctx.canvas.onmousemove = function(e) {
      var coords = getMouseCoords(e);
    	options.onMouseMove(coords.x, coords.y);
      e.preventDefault();
    };

    this.ctx.canvas.onmousedown = function (e) {
    	var coords = getMouseCoords(e);
    	options.onMouseDown(coords.x, coords.y);
      e.preventDefault();
    };

    this.ctx.canvas.onmouseup = function (e) {
    	var coords = getMouseCoords(e);
    	options.onMouseUp(coords.x, coords.y);
      e.preventDefault();
    };

    this.ctx.canvas.onclick = function (e) {
    	var coords = getMouseCoords(e);
    	options.onMouseClick(coords.x, coords.y);
      e.preventDefault();
    };

    this.ctx.canvas.onmousewheel = function(e) {
      options.onScroll(e.deltaX, e.deltaY);
      e.preventDefault();
    };

    // this.textBufferCanvas = document.createElement('canvas');
    // this.textBufferContext = this.textBufferCanvas.getContext('2d');
  }

  drawLine(points, options) {
    options = Object.assign({
      width: 1,
      color: 'black',
      cap: 'square',
      lineJoin: 'miter'
    }, options);

    this.ctx.beginPath();
    this.ctx.moveTo(points[0][0], points[0][1]);
    for(let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i][0], points[i][1]);
    }
    this.ctx.lineWidth = options.width;
    this.ctx.strokeStyle = options.color;
    this.ctx.lineCap = options.cap;
    this.ctx.lineJoin = options.lineJoin;
    this.ctx.stroke();
  }

  drawRect(x, y, width, height, options) {
    options = Object.assign({
      borderWidth: 1,
      borderColor: undefined,
      fillColor: undefined
    }, options);

    this.ctx.beginPath();

    if(options.fillColor) {
      this.ctx.fillStyle = options.fillColor;
    }

    if(options.borderColor) {
      this.ctx.lineWidth = options.borderWidth;
      this.ctx.strokeStyle = options.borderColor;
    }

    this.ctx.rect(x, y, width, height);

    if(options.fillColor) {
      this.ctx.fill();
    }

    if(options.borderColor) {
      this.ctx.stroke();
    }
  }

  drawText(text, x, y, options) {
    options = Object.assign({
      font: '14px Sans',
      color: 'white',
      align: 'center',
      baseLine: 'middle'
    }, options);

    this.ctx.font = options.font;
    this.ctx.fillStyle = options.color;
    this.ctx.textAlign = options.align;
    this.ctx.textBaseline = options.baseLine;

    this.ctx.fillText(text, x, y);
  }

  drawImage(img, x, y, width, height) {
    this.ctx.drawImage(img, x, y, width, height);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}

export default Context;
