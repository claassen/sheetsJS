import ScreenComponent from './ScreenComponent';
import RowHeader from './RowHeader';
import Cell from './Cell';
import {CELL_WIDTH, CELL_HEIGHT, ROW_HEADER_WIDTH} from './constants';

class Row extends ScreenComponent {
  constructor(index, sheet, x, y, colCount, options) {
    //TODO: Calculate width, also update width on column resize
    //TODO: Pass in width and height as options
    super(sheet, x, y, ROW_HEADER_WIDTH + colCount * CELL_WIDTH, CELL_HEIGHT);

    this.index = index;

    //Header cell
    this.rowHeader = new RowHeader(0, index, sheet, 0, this.y, ROW_HEADER_WIDTH, CELL_HEIGHT, {
      color: 'black',
      backGroundColor: 'lightGray',
      borderColor: 'black',
      borderWidth: 1
    });

    //Data cells
    this.cells = [];

    let cellX = ROW_HEADER_WIDTH;

    for(let i = 0; i < colCount; i++) {
      this.cells.push(new Cell(i, index, sheet, cellX, this.y, CELL_WIDTH, CELL_HEIGHT, options));
      cellX += CELL_WIDTH;
    }
  }

  draw() {
    for(let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];

      if(cell.isVisibleOnScreen()) {
        cell.draw();
      }
    }

    this.rowHeader.draw();
  }

  resizeCol(colIndex, newWidth) {
    let cell = this.cells[colIndex]
    let oldWidth = cell.width;

    cell.width = newWidth;
    cell.repaint();

    for(let i = colIndex + 1; i < this.cells.length; i++) {
      this.cells[i].x += (newWidth - oldWidth);
    }
  }

  mouseDown(x, y) {
    for(let i = 0; i < this.cells.length; i++) {
      if(this.cells[i].isCollision(x, y)) {
        this.cells[i].mouseDown(x, y);
      }
    }
  }

  mouseMove(x, y) {
    for(let i = 0; i < this.cells.length; i++) {
      if(this.cells[i].isCollision(x, y)) {
        this.cells[i].mouseMove(x, y);
      }
    }
  }

  mouseUp(x, y) {
    for(let i = 0; i < this.cells.length; i++) {
      if(this.cells[i].isCollision(x, y)) {
        this.cells[i].mouseUp(x, y);
      }
    }
  }

  mouseClick(x, y) {
    for(let i = 0; i < this.cells.length; i++) {
      if(this.cells[i].isCollision(x, y)) {
        this.cells[i].mouseClick(x, y);
      }
    }
  }

  deselectAllCells() {
    for(let i = 0; i < this.cells.length; i++) {
      this.cells[i].blur();
    }
  }

  updateSelection(minColIndex, maxColIndex) {
    for(let i = minColIndex; i <= maxColIndex; i++) {
      this.cells[i].isSelected = true;
    }
  }

  getCell(colIndex) {
    return this.cells[colIndex];
  }
}

export default Row;
