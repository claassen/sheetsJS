import Context from './Context';
import Row from './Row';
import ColumnHeaderRow from './ColumnHeaderRow';
import {CELL_WIDTH, CELL_HEIGHT, ROW_HEADER_WIDTH} from './constants';

class Sheet {
  constructor(target, options) {
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
      colCount: 500,
    }, options);

    this.context = new Context(target, {
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
    this.columnHeaderRow = new ColumnHeaderRow(this, 0, 0, this.rowCount);

    //Data rows
    this.rows = [];

    let rowY = CELL_HEIGHT;

    for(let i = 0; i < this.rowCount; i++) {
      this.rows.push(new Row(i, this, 0, rowY, this.colCount));
      rowY += CELL_HEIGHT;
    }

    this.mainLoop();
  }

  mainLoop() {
    this.draw();
    requestAnimationFrame(this.mainLoop.bind(this));
  }

  mouseDown(x, y) {
    if(this.columnHeaderRow.isCollision(x, y)) {
      this.columnHeaderRow.mouseDown(x, y);
    }
    else {
      for(let i = 0; i < this.rows.length; i++) {
        if(this.rows[i].isCollision(x, y)) {
          this.rows[i].mouseDown(x, y);
        }
      }
    }
  }

  mouseMove(x, y) {
    document.body.style.cursor = 'default';

    if(this.columnHeaderRow.isCollision(x, y)) {
      this.columnHeaderRow.mouseMove(x, y);
    }
    else {
      for(let i = 0; i < this.rows.length; i++) {
        if(this.rows[i].isCollision(x, y)) {
          this.rows[i].mouseMove(x, y);
        }
      }
    }
  }

  mouseUp(x, y) {
    if(this.columnHeaderRow.isCollision(x, y)) {
      this.columnHeaderRow.mouseUp(x, y);
    }
    else {
      for(let i = 0; i < this.rows.length; i++) {
        if(this.rows[i].isCollision(x, y)) {
          this.rows[i].mouseUp(x, y);
        }
      }
    }
  }

  mouseClick(x, y) {
    for(let i = 0; i < this.rows.length; i++) {
      if(this.rows[i].isCollision(x, y)) {
        this.rows[i].mouseClick(x, y);
      }
    }
  }

  scroll(dx, dy) {
    if(dy > 0) {
      this.scrollY -= 5 * dy;
    }
    else if(dy < 0) {
      if(this.scrollY <= -5 * -dy) {
        this.scrollY -= 5 * dy;
      }
    }

    if(dx > 0) {
      this.scrollX -= 5 * dx;
    }
    else if(dx < 0) {
      if(this.scrollX <= -5 * -dx) {
        this.scrollX -= 5 * dx;
      }
    }
  }

  draw() {
    //Background and border
    this.context.drawRect(0, 0, this.width, this.height, {
      borderColor: 'darkGray',
      borderWidth: 3,
      fillColor: 'lightGray'
    });

    //Header

    //Rows
    for(let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];

      if(row.isVisibleOnScreen()) {
        this.rows[i].draw();
      }
    }

    //Column headers
    this.columnHeaderRow.draw();
    this.context.drawRect(0, 0, ROW_HEADER_WIDTH, CELL_HEIGHT, {
      borderColor: 'black',
      borderWidth: 1,
      fillColor: 'darkGray'
    });

    //Scroll bars

    //Multiselect borderWidth
    if(this.showMultiSelect) {
      let minRow = this.rows[this.selectMinRowIndex];
      let maxRow = this.rows[this.selectMaxRowIndex];

      let x = minRow.cells[this.selectMinColIndex].x + this.scrollX;
      let y = minRow.y + this.scrollY;

      let width = 0;

      for(let i = this.selectMinColIndex; i <= this.selectMaxColIndex; i++) {
        width += minRow.cells[i].width;
      }

      let height = 0;

      for(let i = this.selectMinRowIndex; i <= this.selectMaxRowIndex; i++) {
        height += this.rows[i].height;
      }

      this.context.drawRect(x, y, width, height, {
        borderColor: 'blue',
        borderWidth: 2
      });
    }
  }

  resizeRow(rowIndex, delta) {
    this.rows[rowIndex].height += delta;

    for(let i = rowIndex + 1; i < this.rows.length; i++) {
      this.rows[i].y += delta;
    }
  }

  resizeCol(colIndex, newWidth) {
    if(newWidth < 0) {
      return;
    }
    
    this.columnHeaderRow.resizeCol(colIndex, newWidth);

    for(let i = 0; i < this.rows.length; i++) {
      this.rows[i].resizeCol(colIndex, newWidth);
    }
  }

  deselectAllCells() {
    for(let i = 0; i < this.rows.length; i++) {
      this.rows[i].deselectAllCells();
    }
  }

  startMultiSelect() {
    this.clearMultiSelect();
    this.isMultiSelecting = true;
    this.showMultiSelect = true;
  }

  endMultiSelect() {
    this.isMultiSelecting = false;
  }

  clearMultiSelect() {
    this.showMultiSelect = false;
    this.selectMinRowIndex = -1;
    this.selectMaxRowIndex = -1;
    this.selectMinColIndex = -1;
    this.selectMaxColIndex = -1;
  }

  multiSelectSize() {
    return (this.selectMaxRowIndex - this.selectMinRowIndex + 1) * (this.selectMaxColIndex - this.selectMinColIndex + 1);
  }

  updateSelection(rowIndex, colIndex) {
    if(this.isMultiSelecting) {
      if(this.selectMinRowIndex == -1 || rowIndex < this.selectMinRowIndex) {
        this.selectMinRowIndex = rowIndex;
      }

      if(this.selectMaxRowIndex == -1 || rowIndex > this.selectMaxRowIndex) {
        this.selectMaxRowIndex = rowIndex;
      }

      if(this.selectMinColIndex == -1 || colIndex < this.selectMinColIndex) {
        this.selectMinColIndex = colIndex;
      }

      if(this.selectMaxColIndex == -1 || colIndex > this.selectMaxColIndex) {
        this.selectMaxColIndex = colIndex;
      }

      this.deselectAllCells();

      for(let i = this.selectMinRowIndex; i <= this.selectMaxRowIndex; i++) {
        this.rows[i].updateSelection(this.selectMinColIndex, this.selectMaxColIndex);
      }
    }
  }

  getCell(rowIndex, colIndex) {
    return this.rows[rowIndex].getCell(colIndex);
  }
}

export default {
  Sheet: Sheet
};
