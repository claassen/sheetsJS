var sheets =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Context = __webpack_require__(1);
	
	var _Context2 = _interopRequireDefault(_Context);
	
	var _Row = __webpack_require__(2);
	
	var _Row2 = _interopRequireDefault(_Row);
	
	var _ColumnHeaderRow = __webpack_require__(8);
	
	var _ColumnHeaderRow2 = _interopRequireDefault(_ColumnHeaderRow);
	
	var _constants = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Sheet = function () {
	  function Sheet(target, options) {
	    _classCallCheck(this, Sheet);
	
	    this.scrollY = 0;
	    this.scrollX = 0;
	
	    this.selectMinRowIndex = -1;
	    this.selectMaxRowIndex = -1;
	    this.selectMinColIndex = -1;
	    this.selectMaxColIndex = -1;
	
	    Object.assign(this, {
	      width: undefined,
	      height: undefined,
	      rowCount: 2000,
	      colCount: 500
	    }, options);
	
	    this.context = new _Context2.default(target, {
	      onMouseMove: this.mouseMove.bind(this),
	      onMouseDown: this.mouseDown.bind(this),
	      onMouseUp: this.mouseUp.bind(this),
	      onMouseClick: this.mouseClick.bind(this),
	      onScroll: this.scroll.bind(this),
	      width: this.width,
	      height: this.height
	    });
	
	    //TODO: make target a div and have library create canvas element
	    //TODO: allow to fill size of div placed in
	
	    //Column headerX
	    this.columnHeaderRow = new _ColumnHeaderRow2.default(this, 0, 0, this.rowCount);
	
	    //Data rows
	    this.rows = [];
	
	    var rowY = _constants.CELL_HEIGHT;
	
	    for (var i = 0; i < this.rowCount; i++) {
	      this.rows.push(new _Row2.default(i, this, 0, rowY, this.colCount));
	      rowY += _constants.CELL_HEIGHT;
	    }
	
	    this.mainLoop();
	  }
	
	  _createClass(Sheet, [{
	    key: 'mainLoop',
	    value: function mainLoop() {
	      this.draw();
	      requestAnimationFrame(this.mainLoop.bind(this));
	    }
	  }, {
	    key: 'mouseDown',
	    value: function mouseDown(x, y) {
	      if (this.columnHeaderRow.isCollision(x, y)) {
	        this.columnHeaderRow.mouseDown(x, y);
	      } else {
	        for (var i = 0; i < this.rows.length; i++) {
	          if (this.rows[i].isCollision(x, y)) {
	            this.rows[i].mouseDown(x, y);
	          }
	        }
	      }
	    }
	  }, {
	    key: 'mouseMove',
	    value: function mouseMove(x, y) {
	      document.body.style.cursor = 'default';
	
	      if (this.columnHeaderRow.isCollision(x, y)) {
	        this.columnHeaderRow.mouseMove(x, y);
	      } else {
	        for (var i = 0; i < this.rows.length; i++) {
	          if (this.rows[i].isCollision(x, y)) {
	            this.rows[i].mouseMove(x, y);
	          }
	        }
	      }
	    }
	  }, {
	    key: 'mouseUp',
	    value: function mouseUp(x, y) {
	      if (this.columnHeaderRow.isCollision(x, y)) {
	        this.columnHeaderRow.mouseUp(x, y);
	      } else {
	        for (var i = 0; i < this.rows.length; i++) {
	          if (this.rows[i].isCollision(x, y)) {
	            this.rows[i].mouseUp(x, y);
	          }
	        }
	      }
	    }
	  }, {
	    key: 'mouseClick',
	    value: function mouseClick(x, y) {
	      for (var i = 0; i < this.rows.length; i++) {
	        if (this.rows[i].isCollision(x, y)) {
	          this.rows[i].mouseClick(x, y);
	        }
	      }
	    }
	  }, {
	    key: 'scroll',
	    value: function scroll(dx, dy) {
	      if (dy > 0) {
	        this.scrollY -= 5 * dy;
	      } else if (dy < 0) {
	        if (this.scrollY <= -5 * -dy) {
	          this.scrollY -= 5 * dy;
	        }
	      }
	
	      if (dx > 0) {
	        this.scrollX -= 5 * dx;
	      } else if (dx < 0) {
	        if (this.scrollX <= -5 * -dx) {
	          this.scrollX -= 5 * dx;
	        }
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      //Background and border
	      this.context.drawRect(0, 0, this.width, this.height, {
	        borderColor: 'darkGray',
	        borderWidth: 3,
	        fillColor: 'lightGray'
	      });
	
	      //Header
	
	      //Rows
	      for (var i = 0; i < this.rows.length; i++) {
	        var row = this.rows[i];
	
	        if (row.isVisibleOnScreen()) {
	          this.rows[i].draw();
	        }
	      }
	
	      //Column headers
	      this.columnHeaderRow.draw();
	      this.context.drawRect(0, 0, _constants.ROW_HEADER_WIDTH, _constants.CELL_HEIGHT, {
	        borderColor: 'black',
	        borderWidth: 1,
	        fillColor: 'darkGray'
	      });
	
	      //Scroll bars
	
	      //Multiselect borderWidth
	      if (this.showMultiSelect) {
	        var minRow = this.rows[this.selectMinRowIndex];
	        var maxRow = this.rows[this.selectMaxRowIndex];
	
	        var x = minRow.cells[this.selectMinColIndex].x + this.scrollX;
	        var y = minRow.y + this.scrollY;
	
	        var width = 0;
	
	        for (var _i = this.selectMinColIndex; _i <= this.selectMaxColIndex; _i++) {
	          width += minRow.cells[_i].width;
	        }
	
	        var height = 0;
	
	        for (var _i2 = this.selectMinRowIndex; _i2 <= this.selectMaxRowIndex; _i2++) {
	          height += this.rows[_i2].height;
	        }
	
	        this.context.drawRect(x, y, width, height, {
	          borderColor: 'blue',
	          borderWidth: 2
	        });
	      }
	    }
	  }, {
	    key: 'resizeRow',
	    value: function resizeRow(rowIndex, delta) {
	      this.rows[rowIndex].height += delta;
	
	      for (var i = rowIndex + 1; i < this.rows.length; i++) {
	        this.rows[i].y += delta;
	      }
	    }
	  }, {
	    key: 'resizeCol',
	    value: function resizeCol(colIndex, newWidth) {
	      if (newWidth < 0) {
	        return;
	      }
	
	      this.columnHeaderRow.resizeCol(colIndex, newWidth);
	
	      for (var i = 0; i < this.rows.length; i++) {
	        this.rows[i].resizeCol(colIndex, newWidth);
	      }
	    }
	  }, {
	    key: 'deselectAllCells',
	    value: function deselectAllCells() {
	      for (var i = 0; i < this.rows.length; i++) {
	        this.rows[i].deselectAllCells();
	      }
	    }
	  }, {
	    key: 'startMultiSelect',
	    value: function startMultiSelect() {
	      this.clearMultiSelect();
	      this.isMultiSelecting = true;
	      this.showMultiSelect = true;
	    }
	  }, {
	    key: 'endMultiSelect',
	    value: function endMultiSelect() {
	      this.isMultiSelecting = false;
	    }
	  }, {
	    key: 'clearMultiSelect',
	    value: function clearMultiSelect() {
	      this.showMultiSelect = false;
	      this.selectMinRowIndex = -1;
	      this.selectMaxRowIndex = -1;
	      this.selectMinColIndex = -1;
	      this.selectMaxColIndex = -1;
	    }
	  }, {
	    key: 'multiSelectSize',
	    value: function multiSelectSize() {
	      return (this.selectMaxRowIndex - this.selectMinRowIndex + 1) * (this.selectMaxColIndex - this.selectMinColIndex + 1);
	    }
	  }, {
	    key: 'updateSelection',
	    value: function updateSelection(rowIndex, colIndex) {
	      if (this.isMultiSelecting) {
	        if (this.selectMinRowIndex == -1 || rowIndex < this.selectMinRowIndex) {
	          this.selectMinRowIndex = rowIndex;
	        }
	
	        if (this.selectMaxRowIndex == -1 || rowIndex > this.selectMaxRowIndex) {
	          this.selectMaxRowIndex = rowIndex;
	        }
	
	        if (this.selectMinColIndex == -1 || colIndex < this.selectMinColIndex) {
	          this.selectMinColIndex = colIndex;
	        }
	
	        if (this.selectMaxColIndex == -1 || colIndex > this.selectMaxColIndex) {
	          this.selectMaxColIndex = colIndex;
	        }
	
	        this.deselectAllCells();
	
	        for (var i = this.selectMinRowIndex; i <= this.selectMaxRowIndex; i++) {
	          this.rows[i].updateSelection(this.selectMinColIndex, this.selectMaxColIndex);
	        }
	      }
	    }
	  }, {
	    key: 'getCell',
	    value: function getCell(rowIndex, colIndex) {
	      return this.rows[rowIndex].getCell(colIndex);
	    }
	  }]);
	
	  return Sheet;
	}();
	
	exports.default = {
	  Sheet: Sheet
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Context = function () {
	  function Context(target, options) {
	    _classCallCheck(this, Context);
	
	    options = Object.assign({
	      onMouseMove: function onMouseMove(x, y) {},
	      onMouseDown: function onMouseDown(x, y) {},
	      onMouseUp: function onMouseUp(x, y) {},
	      onMouseClick: function onMouseClick(x, y) {},
	      onScroll: function onScroll(dx, dy) {}
	    }, options);
	
	    target.width = options.width * 2;
	    target.height = options.height * 2;
	    target.style.width = options.width + "px";
	    target.style.height = options.height + "px";
	
	    this.ctx = target.getContext("2d");
	    this.ctx.scale(2, 2);
	
	    var self = this;
	
	    var getMouseCoords = function getMouseCoords(e) {
	      var rect = self.ctx.canvas.getBoundingClientRect();
	
	      return {
	        x: e.clientX - rect.left,
	        y: e.clientY - rect.top
	      };
	    };
	
	    this.ctx.canvas.onmousemove = function (e) {
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
	
	    this.ctx.canvas.onmousewheel = function (e) {
	      options.onScroll(e.deltaX, e.deltaY);
	      e.preventDefault();
	    };
	
	    // this.textBufferCanvas = document.createElement('canvas');
	    // this.textBufferContext = this.textBufferCanvas.getContext('2d');
	  }
	
	  _createClass(Context, [{
	    key: "drawLine",
	    value: function drawLine(points, options) {
	      options = Object.assign({
	        width: 1,
	        color: 'black',
	        cap: 'square',
	        lineJoin: 'miter'
	      }, options);
	
	      this.ctx.beginPath();
	      this.ctx.moveTo(points[0][0], points[0][1]);
	      for (var i = 1; i < points.length; i++) {
	        this.ctx.lineTo(points[i][0], points[i][1]);
	      }
	      this.ctx.lineWidth = options.width;
	      this.ctx.strokeStyle = options.color;
	      this.ctx.lineCap = options.cap;
	      this.ctx.lineJoin = options.lineJoin;
	      this.ctx.stroke();
	    }
	  }, {
	    key: "drawRect",
	    value: function drawRect(x, y, width, height, options) {
	      options = Object.assign({
	        borderWidth: 1,
	        borderColor: undefined,
	        fillColor: undefined
	      }, options);
	
	      this.ctx.beginPath();
	
	      if (options.fillColor) {
	        this.ctx.fillStyle = options.fillColor;
	      }
	
	      if (options.borderColor) {
	        this.ctx.lineWidth = options.borderWidth;
	        this.ctx.strokeStyle = options.borderColor;
	      }
	
	      this.ctx.rect(x, y, width, height);
	
	      if (options.fillColor) {
	        this.ctx.fill();
	      }
	
	      if (options.borderColor) {
	        this.ctx.stroke();
	      }
	    }
	  }, {
	    key: "drawText",
	    value: function drawText(text, x, y, options) {
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
	  }, {
	    key: "drawImage",
	    value: function drawImage(img, x, y, width, height) {
	      this.ctx.drawImage(img, x, y, width, height);
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	    }
	  }]);
	
	  return Context;
	}();
	
	exports.default = Context;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ScreenComponent2 = __webpack_require__(3);
	
	var _ScreenComponent3 = _interopRequireDefault(_ScreenComponent2);
	
	var _RowHeader = __webpack_require__(4);
	
	var _RowHeader2 = _interopRequireDefault(_RowHeader);
	
	var _Cell = __webpack_require__(5);
	
	var _Cell2 = _interopRequireDefault(_Cell);
	
	var _constants = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Row = function (_ScreenComponent) {
	  _inherits(Row, _ScreenComponent);
	
	  function Row(index, sheet, x, y, colCount, options) {
	    _classCallCheck(this, Row);
	
	    var _this = _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this, sheet, x, y, _constants.ROW_HEADER_WIDTH + colCount * _constants.CELL_WIDTH, _constants.CELL_HEIGHT));
	    //TODO: Calculate width, also update width on column resize
	    //TODO: Pass in width and height as options
	
	
	    _this.index = index;
	
	    //Header cell
	    _this.rowHeader = new _RowHeader2.default(0, index, sheet, 0, _this.y, _constants.ROW_HEADER_WIDTH, _constants.CELL_HEIGHT, {
	      color: 'black',
	      backGroundColor: 'lightGray',
	      borderColor: 'black',
	      borderWidth: 1
	    });
	
	    //Data cells
	    _this.cells = [];
	
	    var cellX = _constants.ROW_HEADER_WIDTH;
	
	    for (var i = 0; i < colCount; i++) {
	      _this.cells.push(new _Cell2.default(i, index, sheet, cellX, _this.y, _constants.CELL_WIDTH, _constants.CELL_HEIGHT, options));
	      cellX += _constants.CELL_WIDTH;
	    }
	    return _this;
	  }
	
	  _createClass(Row, [{
	    key: 'draw',
	    value: function draw() {
	      for (var i = 0; i < this.cells.length; i++) {
	        var cell = this.cells[i];
	
	        if (cell.isVisibleOnScreen()) {
	          cell.draw();
	        }
	      }
	
	      this.rowHeader.draw();
	    }
	  }, {
	    key: 'resizeCol',
	    value: function resizeCol(colIndex, newWidth) {
	      var cell = this.cells[colIndex];
	      var oldWidth = cell.width;
	
	      cell.width = newWidth;
	      cell.repaint();
	
	      for (var i = colIndex + 1; i < this.cells.length; i++) {
	        this.cells[i].x += newWidth - oldWidth;
	      }
	    }
	  }, {
	    key: 'mouseDown',
	    value: function mouseDown(x, y) {
	      for (var i = 0; i < this.cells.length; i++) {
	        if (this.cells[i].isCollision(x, y)) {
	          this.cells[i].mouseDown(x, y);
	        }
	      }
	    }
	  }, {
	    key: 'mouseMove',
	    value: function mouseMove(x, y) {
	      for (var i = 0; i < this.cells.length; i++) {
	        if (this.cells[i].isCollision(x, y)) {
	          this.cells[i].mouseMove(x, y);
	        }
	      }
	    }
	  }, {
	    key: 'mouseUp',
	    value: function mouseUp(x, y) {
	      for (var i = 0; i < this.cells.length; i++) {
	        if (this.cells[i].isCollision(x, y)) {
	          this.cells[i].mouseUp(x, y);
	        }
	      }
	    }
	  }, {
	    key: 'mouseClick',
	    value: function mouseClick(x, y) {
	      for (var i = 0; i < this.cells.length; i++) {
	        if (this.cells[i].isCollision(x, y)) {
	          this.cells[i].mouseClick(x, y);
	        }
	      }
	    }
	  }, {
	    key: 'deselectAllCells',
	    value: function deselectAllCells() {
	      for (var i = 0; i < this.cells.length; i++) {
	        this.cells[i].blur();
	      }
	    }
	  }, {
	    key: 'updateSelection',
	    value: function updateSelection(minColIndex, maxColIndex) {
	      for (var i = minColIndex; i <= maxColIndex; i++) {
	        this.cells[i].isSelected = true;
	      }
	    }
	  }, {
	    key: 'getCell',
	    value: function getCell(colIndex) {
	      return this.cells[colIndex];
	    }
	  }]);
	
	  return Row;
	}(_ScreenComponent3.default);
	
	exports.default = Row;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ScreenComponent = function () {
	  function ScreenComponent(sheet, x, y, width, height) {
	    _classCallCheck(this, ScreenComponent);
	
	    this.sheet = sheet;
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	  }
	
	  _createClass(ScreenComponent, [{
	    key: "draw",
	    value: function draw() {
	      // console.log("ScreenComponent:draw()");
	    }
	  }, {
	    key: "isVisibleOnScreen",
	    value: function isVisibleOnScreen() {
	      return !(this.x + this.sheet.scrollX + this.width < 0 || this.x + this.sheet.scrollX > this.sheet.width || this.y + this.sheet.scrollY + this.height < 0 || this.y + this.sheet.scrollY > this.sheet.height);
	    }
	  }, {
	    key: "isCollision",
	    value: function isCollision(canvasX, canvasY) {
	      return canvasX > this.x + this.sheet.scrollX && canvasX < this.x + this.sheet.scrollX + this.width && canvasY > this.y + this.sheet.scrollY && canvasY < this.y + this.sheet.scrollY + this.height;
	    }
	  }]);
	
	  return ScreenComponent;
	}();
	
	exports.default = ScreenComponent;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ScreenComponent2 = __webpack_require__(3);
	
	var _ScreenComponent3 = _interopRequireDefault(_ScreenComponent2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RowHeader = function (_ScreenComponent) {
	  _inherits(RowHeader, _ScreenComponent);
	
	  function RowHeader(index, rowIndex, sheet, x, y, width, height, options) {
	    _classCallCheck(this, RowHeader);
	
	    var _this = _possibleConstructorReturn(this, (RowHeader.__proto__ || Object.getPrototypeOf(RowHeader)).call(this, sheet, x, y, width, height, options));
	
	    _this.rowIndex = rowIndex;
	
	    Object.assign(_this, {
	      color: 'black',
	      backGroundColor: 'lightGray',
	      borderColor: 'darkGray',
	      borderWidth: 1
	    }, options);
	
	    _this.textBufferCanvas = document.createElement('canvas');
	    _this.textBufferContext = _this.textBufferCanvas.getContext('2d');
	
	    _this.textBufferCanvas.width = _this.width * 2;
	    _this.textBufferCanvas.height = _this.height * 2;
	    _this.textBufferCanvas.style.width = _this.width;
	    _this.textBufferCanvas.style.height = _this.height;
	
	    _this.textBufferContext.scale(2, 2);
	
	    _this.textBufferContext.font = _this.height * 0.8 + 'px Sans';
	    _this.textBufferContext.fillStyle = _this.color;
	    _this.textBufferContext.textAlign = 'center';
	    _this.textBufferContext.textBaseline = 'middle';
	
	    _this.updateText(rowIndex + 1);
	    return _this;
	  }
	
	  _createClass(RowHeader, [{
	    key: 'updateText',
	    value: function updateText(text) {
	      this.text = text;
	      this.textBufferContext.fillText(this.text, this.width / 2, this.height / 2);
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      this.sheet.context.drawRect(this.x, this.sheet.scrollY + this.y, this.width, this.height, {
	        fillColor: this.backGroundColor,
	        borderColor: this.borderColor,
	        borderWidth: this.borderWidth
	      });
	
	      this.sheet.context.drawImage(this.textBufferCanvas, this.x, this.y + this.sheet.scrollY, this.width, this.height);
	    }
	  }]);
	
	  return RowHeader;
	}(_ScreenComponent3.default);
	
	exports.default = RowHeader;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ScreenComponent2 = __webpack_require__(3);
	
	var _ScreenComponent3 = _interopRequireDefault(_ScreenComponent2);
	
	var _Context = __webpack_require__(1);
	
	var _Context2 = _interopRequireDefault(_Context);
	
	var _constants = __webpack_require__(6);
	
	var _util = __webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Cell = function (_ScreenComponent) {
	  _inherits(Cell, _ScreenComponent);
	
	  function Cell(index, rowIndex, sheet, x, y, width, height, options) {
	    _classCallCheck(this, Cell);
	
	    var _this = _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).call(this, sheet, x, y, width, height));
	
	    _this.index = index;
	    _this.rowIndex = rowIndex;
	    _this.text = "";
	
	    Object.assign(_this, {
	      color: 'black',
	      backGroundColor: 'white',
	      borderColor: 'darkGray',
	      borderWidth: 1
	    }, options);
	
	    _this.dependentCells = [];
	    return _this;
	  }
	
	  _createClass(Cell, [{
	    key: 'registerDependentValueCell',
	    value: function registerDependentValueCell(cell) {
	      this.dependentCells.push(cell);
	    }
	  }, {
	    key: 'updateValue',
	    value: function updateValue(value) {
	      var _this2 = this;
	
	      this.value = value;
	
	      //TODO: Should nulls be displayed the same as undefined (i.e. blank)?
	      if (value === undefined || value === null) {
	        return;
	      }
	
	      var getIndividualArgValue = function getIndividualArgValue(arg) {
	        // let colAlphaMatch = arg.match(/[A-Z]+/);
	
	        if (/[A-Z]+/.test(arg)) {
	          //Cell reference
	          var colAlpha = colAlphaMatch[0];
	          var col = (0, _util.aToI)(colAlpha);
	          var row = arg.match(/\d+/)[0] - 1;
	
	          var cell = _this2.sheet.getCell(row, col);
	
	          return cell.value;
	        } else {
	          //Number literal (we assume)
	          return arg;
	        }
	      };
	
	      if (value.indexOf("=") == 0) {
	        var functionName = value.substr(1).split('(')[0];
	        var args = value.substr(1).split('(')[1].replace(')', '').split(',');
	
	        var argValues = [];
	
	        for (var i = 0; i < args.length; i++) {
	          var arg = args[i].trim();
	
	          if (arg.indexOf(":") !== -1) {
	            var rangeIndexes = arg.split(':');
	
	            //TODO: This is not actually a range right now
	            for (var j = 0; j < rangeIndexes.length; j++) {
	              argValues.push(getIndividualArgValue(rangeIndexes[j]));
	            }
	          } else {
	            argValues.push(getIndividualArgValue(arg));
	          }
	        }
	
	        var result = formulajs[functionName].apply(null, argValues);
	
	        this.text = result;
	      } else {
	        this.text = value;
	      }
	
	      if (!this.isTextBufferInitialized) {
	        this.textBufferCanvas = document.createElement('canvas');
	
	        this.textBufferContext = new _Context2.default(this.textBufferCanvas, {
	          width: this.width,
	          height: this.height
	        });
	
	        this.isTextBufferInitialized = true;
	      }
	
	      this.isNumeric = this.text && /^\d*(\.\d+)?$/.test(this.text);
	
	      this.repaint();
	    }
	  }, {
	    key: 'repaint',
	    value: function repaint() {
	      if (this.isTextBufferInitialized) {
	        this.textBufferContext = new _Context2.default(this.textBufferCanvas, {
	          width: this.width,
	          height: this.height
	        });
	
	        this.textBufferContext.clear();
	
	        this.textBufferContext.drawRect(0, 0, this.width, this.height, {
	          fillColor: this.isSelected ? '#c9e2f9' : this.backGroundColor,
	          borderColor: this.borderColor,
	          borderWidth: this.borderWidth
	        });
	
	        //TODO: Formatting
	
	        this.textBufferContext.drawText(this.text, this.isNumeric ? this.width : 0, this.height / 2, {
	          font: this.height * 0.8 + 'px Sans',
	          color: this.color,
	          align: this.isNumeric ? 'end' : 'start',
	          baseLine: 'middle'
	        });
	      }
	
	      if (this.isEditing) {
	        if (this.width > 4) {
	          this.inputElement.width(this.width - 4);
	        } else {
	          this.blur();
	        }
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      if (!this.isTextBufferInitialized) {
	        this.sheet.context.drawRect(this.sheet.scrollX + this.x, this.sheet.scrollY + this.y, this.width, this.height, {
	          fillColor: this.isSelected ? '#c9e2f9' : this.backGroundColor,
	          borderColor: this.borderColor,
	          borderWidth: this.borderWidth
	        });
	      } else {
	        this.sheet.context.drawImage(this.textBufferCanvas, this.x + this.sheet.scrollX, this.y + this.sheet.scrollY, this.width, this.height);
	      }
	
	      if (this.isEditing) {
	        if (this.sheet.scrollX + this.x < _constants.ROW_HEADER_WIDTH || this.sheet.scrollX + this.x > this.sheet.width - this.width || this.sheet.scrollY + this.y < 20 || this.sheet.scrollY + this.y > this.sheet.height - this.height) {
	          this.inputElement.hide();
	        } else {
	          this.inputElement.show();
	          this.inputElement.css("left", this.sheet.scrollX + this.x + "px");
	          this.inputElement.css("top", this.sheet.scrollY + this.y + "px");
	          this.inputElement.focus();
	        }
	      }
	    }
	  }, {
	    key: 'blur',
	    value: function blur() {
	      this.isSelected = false;
	
	      if (this.isEditing) {
	        this.isEditing = false;
	        this.updateValue(this.inputElement.val());
	        this.inputElement.remove();
	        this.inputElement = undefined;
	      }
	    }
	  }, {
	    key: 'mouseDown',
	    value: function mouseDown(x, y) {
	      this.sheet.startMultiSelect();
	      this.sheet.updateSelection(this.rowIndex, this.index);
	    }
	  }, {
	    key: 'mouseMove',
	    value: function mouseMove(x, y) {
	      if (this.sheet.isMultiSelecting) {
	        this.sheet.updateSelection(this.rowIndex, this.index);
	      }
	    }
	  }, {
	    key: 'mouseUp',
	    value: function mouseUp(x, y) {
	      if (this.sheet.multiSelectSize() == 1) {
	        this.edit();
	        this.sheet.clearMultiSelect();
	      }
	
	      this.sheet.endMultiSelect();
	    }
	  }, {
	    key: 'mouseClick',
	    value: function mouseClick(x, y) {}
	  }, {
	    key: 'edit',
	    value: function edit() {
	      var _this3 = this;
	
	      this.sheet.deselectAllCells();
	
	      this.isEditing = true;
	      this.inputElement = $("<input>", {
	        type: "text",
	        id: "cell-input",
	        style: "text-align: " + (this.isNumeric ? "right" : "left") + ";" + "position: fixed;" + "left: " + this.sheet.scrollX + this.x + "px;" + "top: " + this.sheet.scrollY + this.y + "px;" + "width: " + (this.width - 4) + "px; height: " + (this.height - 4) + "px;"
	      });
	
	      $("body").append(this.inputElement);
	
	      var dirty = false;
	
	      this.inputElement.val(this.value);
	
	      this.inputElement.keydown(function (e) {
	        var keyCode = e.keyCode || e.which;
	
	        //TODO: auto scroll if moving to cell would make the input disappear
	
	        if (keyCode === 13) {
	          //Enter, go to next row
	          _this3.sheet.rows[_this3.rowIndex + (e.shiftKey ? -1 : 1)].cells[_this3.index].edit();
	        } else if (keyCode === 9) {
	          //Tab, go to next column
	          _this3.sheet.rows[_this3.rowIndex].cells[_this3.index + (e.shiftKey ? -1 : 1)].edit();
	          e.preventDefault();
	        } else if (keyCode === 37) {
	          //Left arrow
	          if (!dirty) {
	            _this3.sheet.rows[_this3.rowIndex].cells[_this3.index - 1].edit();
	          }
	        } else if (keyCode === 39) {
	          //Right arrow
	          if (!dirty) {
	            _this3.sheet.rows[_this3.rowIndex].cells[_this3.index + 1].edit();
	          }
	        } else if (keyCode === 38) {
	          //Up arrow
	          _this3.sheet.rows[_this3.rowIndex - 1].cells[_this3.index].edit();
	        } else if (keyCode === 40) {
	          //Down arrow
	          _this3.sheet.rows[_this3.rowIndex + 1].cells[_this3.index].edit();
	        } else if ((keyCode === 46 /* Delete */ || keyCode === 8 /* Backspace */) && !dirty) {
	          _this3.inputElement.val(undefined);
	          _this3.updateValue(undefined);
	        }
	      });
	
	      this.inputElement.keyup(function (e) {
	        var keyCode = e.keyCode || e.which;
	
	        if (keyCode !== 13 && keyCode !== 9 && keyCode !== 37 && keyCode !== 39 && keyCode !== 38 && keyCode !== 40) {
	          dirty = true;
	
	          _this3.updateValue(_this3.inputElement.val());
	
	          if (_this3.isNumeric) {
	            _this3.inputElement.css("text-align", _this3.isNumeric ? "right" : "left");
	          }
	        }
	      });
	
	      this.inputElement.bind('paste', function (e) {
	        var pastedData = e.originalEvent.clipboardData.getData('text');
	      });
	
	      this.inputElement.focus();
	    }
	  }]);
	
	  return Cell;
	}(_ScreenComponent3.default);
	
	exports.default = Cell;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ROW_HEADER_WIDTH = exports.ROW_HEADER_WIDTH = 40;
	var CELL_WIDTH = exports.CELL_WIDTH = 70;
	var CELL_HEIGHT = exports.CELL_HEIGHT = 20;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //0 = A, 25 = Z
	
	var iToA = exports.iToA = function iToA(i) {
	  var current = i;
	
	  var a = "";
	
	  while (current > -1) {
	    var digit = current % 26;
	    a = alpha[digit] + "" + a;
	
	    //This is not a straight number base conversion, we need to
	    //treat A as
	    current = Math.floor(current / 26) - 1;
	  }
	
	  return a;
	};
	
	var aToI = exports.aToI = function aToI(a) {
	  var index = (alpha.indexOf(a[0]) + 1) * Math.pow(26, a.length - 1) - 1;
	
	  for (var i = a.length - 1; i > 0; i--) {
	    index += (alpha.indexOf(a[i]) + 1) * Math.pow(26, a.length - i - 1);
	  }
	
	  return index;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ScreenComponent2 = __webpack_require__(3);
	
	var _ScreenComponent3 = _interopRequireDefault(_ScreenComponent2);
	
	var _ColumnHeader = __webpack_require__(9);
	
	var _ColumnHeader2 = _interopRequireDefault(_ColumnHeader);
	
	var _constants = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ColumnHeaderRow = function (_ScreenComponent) {
	  _inherits(ColumnHeaderRow, _ScreenComponent);
	
	  function ColumnHeaderRow(sheet, x, y, colCount, options) {
	    _classCallCheck(this, ColumnHeaderRow);
	
	    var _this = _possibleConstructorReturn(this, (ColumnHeaderRow.__proto__ || Object.getPrototypeOf(ColumnHeaderRow)).call(this, sheet, x, y, _constants.ROW_HEADER_WIDTH + colCount * _constants.CELL_WIDTH, _constants.CELL_HEIGHT));
	
	    _this.columnHeaders = [];
	
	    var headerX = _constants.ROW_HEADER_WIDTH;
	
	    for (var i = 0; i < colCount; i++) {
	      _this.columnHeaders.push(new _ColumnHeader2.default(i, sheet, headerX, _this.y, _constants.CELL_WIDTH, _constants.CELL_HEIGHT, {
	        color: 'black',
	        backGroundColor: 'lightGray',
	        borderColor: 'black',
	        borderWidth: 1
	      }));
	
	      headerX += _constants.CELL_WIDTH;
	    }
	    return _this;
	  }
	
	  _createClass(ColumnHeaderRow, [{
	    key: 'draw',
	    value: function draw() {
	      for (var i = 0; i < this.columnHeaders.length; i++) {
	        var columnHeader = this.columnHeaders[i];
	
	        if (columnHeader.isVisibleOnScreen()) {
	          columnHeader.draw();
	        }
	      }
	    }
	  }, {
	    key: 'resizeCol',
	    value: function resizeCol(colIndex, newWidth) {
	      var columnHeader = this.columnHeaders[colIndex];
	      var oldWidth = columnHeader.width;
	
	      columnHeader.width = newWidth;
	      columnHeader.repaint();
	
	      for (var i = colIndex + 1; i < this.columnHeaders.length; i++) {
	        this.columnHeaders[i].x += newWidth - oldWidth;
	      }
	    }
	  }, {
	    key: 'mouseMove',
	    value: function mouseMove(x, y) {
	      if (this.isResizing) {
	        var xDelta = x - this.resizeStartX;
	
	        this.sheet.resizeCol(this.resizeHeader.index, this.resizeStartWidth + xDelta);
	      } else {
	        for (var i = 0; i < this.columnHeaders.length; i++) {
	          var columnHeader = this.columnHeaders[i];
	
	          if (x > columnHeader.x + this.sheet.scrollX + columnHeader.width - 5 && x < columnHeader.x + this.sheet.scrollX + columnHeader.width + 5) {
	            document.body.style.cursor = 'col-resize';
	            this.resizeHeader = columnHeader;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'mouseDown',
	    value: function mouseDown(x, y) {
	      if (this.resizeHeader) {
	        this.resizeStartX = x;
	        this.resizeStartWidth = this.resizeHeader.width;
	        this.isResizing = true;
	      }
	    }
	  }, {
	    key: 'mouseUp',
	    value: function mouseUp(x, y) {
	      this.resizeHeader = undefined;
	      this.isResizing = false;
	    }
	  }, {
	    key: 'mouseClick',
	    value: function mouseClick(x, y) {
	      for (var i = 0; i < this.columnHeaders.length; i++) {
	        if (this.columnHeaders[i].isCollision(x, y)) {
	          this.columnHeaders[i].mouseClick(x, y);
	        }
	      }
	    }
	  }]);
	
	  return ColumnHeaderRow;
	}(_ScreenComponent3.default);
	
	exports.default = ColumnHeaderRow;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ScreenComponent2 = __webpack_require__(3);
	
	var _ScreenComponent3 = _interopRequireDefault(_ScreenComponent2);
	
	var _util = __webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ColumnHeader = function (_ScreenComponent) {
	  _inherits(ColumnHeader, _ScreenComponent);
	
	  function ColumnHeader(index, sheet, x, y, width, height, options) {
	    _classCallCheck(this, ColumnHeader);
	
	    var _this = _possibleConstructorReturn(this, (ColumnHeader.__proto__ || Object.getPrototypeOf(ColumnHeader)).call(this, sheet, x, y, width, height, options));
	
	    _this.index = index;
	
	    Object.assign(_this, {
	      color: 'black',
	      backGroundColor: 'lightGray',
	      borderColor: 'darkGray',
	      borderWidth: 1
	    }, options);
	
	    _this.updateText((0, _util.iToA)(_this.index));
	    return _this;
	  }
	
	  _createClass(ColumnHeader, [{
	    key: 'isVisibleOnScreen',
	    value: function isVisibleOnScreen() {
	      return !(this.x + this.sheet.scrollX + this.width < 0 || this.x + this.sheet.scrollX > this.sheet.width || this.y + this.height < 0 || this.y > this.sheet.height);
	    }
	  }, {
	    key: 'updateText',
	    value: function updateText(value) {
	      this.text = value;
	
	      this.repaint();
	    }
	  }, {
	    key: 'repaint',
	    value: function repaint() {
	      this.textBufferCanvas = document.createElement('canvas');
	      this.textBufferContext = this.textBufferCanvas.getContext('2d');
	
	      this.textBufferCanvas.width = this.width * 2;
	      this.textBufferCanvas.height = this.height * 2;
	      this.textBufferCanvas.style.width = this.width;
	      this.textBufferCanvas.style.height = this.height;
	
	      this.textBufferContext.scale(2, 2);
	
	      this.textBufferContext.font = this.height * 0.8 + 'px Sans';
	      this.textBufferContext.fillStyle = this.color;
	      this.textBufferContext.textAlign = 'center';
	      this.textBufferContext.textBaseline = 'middle';
	
	      this.textBufferContext.fillText(this.text, this.width / 2, this.height / 2);
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      this.sheet.context.drawRect(this.x + this.sheet.scrollX, this.y, this.width, this.height, {
	        fillColor: this.backGroundColor,
	        borderColor: this.borderColor,
	        borderWidth: this.borderWidth
	      });
	
	      this.sheet.context.drawImage(this.textBufferCanvas, this.x + this.sheet.scrollX, this.y, this.width, this.height);
	    }
	  }]);
	
	  return ColumnHeader;
	}(_ScreenComponent3.default);
	
	exports.default = ColumnHeader;
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=sheets.js.map