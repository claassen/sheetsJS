import ScreenComponent from './ScreenComponent';
import Context from './Context';
import {ROW_HEADER_WIDTH} from './constants';
import {aToI} from './util';

class Cell extends ScreenComponent {
  constructor(index, rowIndex, sheet, x, y, width, height, options) {
    super(sheet, x, y, width, height);

    this.index = index;
    this.rowIndex = rowIndex;
    this.text = "";

    Object.assign(this, {
      color: 'black',
      backGroundColor: 'white',
      borderColor: 'darkGray',
      borderWidth: 1
    }, options);

    this.dependentCells = [];
  }

  registerDependentValueCell(cell) {
    this.dependentCells.push(cell);
  }

  updateValue(value) {
    this.value = value;

    //TODO: Should nulls be displayed the same as undefined (i.e. blank)?
    if(value === undefined || value === null) {
      return;
    }

    const getIndividualArgValue = (arg) => {
      // let colAlphaMatch = arg.match(/[A-Z]+/);

      if(/[A-Z]+/.test(arg)) {
        //Cell reference
        let colAlpha = colAlphaMatch[0];
        let col = aToI(colAlpha);
        let row = arg.match(/\d+/)[0] - 1;

        let cell = this.sheet.getCell(row, col);

        return cell.value;
      }
      else {
        //Number literal (we assume)
        return arg;
      }
    };

    if(value.indexOf("=") == 0) {
      let functionName = value.substr(1).split('(')[0];
      let args = value.substr(1).split('(')[1].replace(')', '').split(',');

      let argValues = [];

      for(let i = 0; i < args.length; i++) {
        let arg = args[i].trim();

        if(arg.indexOf(":") !== -1) {
          let rangeIndexes = arg.split(':');

          //TODO: This is not actually a range right now
          for(let j = 0; j < rangeIndexes.length; j++) {
            argValues.push(getIndividualArgValue(rangeIndexes[j]));
          }
        }
        else {
          argValues.push(getIndividualArgValue(arg));
        }
      }

      let result = formulajs[functionName].apply(null, argValues);

      this.text = result;
    }
    else {
      this.text = value;
    }

    if(!this.isTextBufferInitialized) {
      this.textBufferCanvas = document.createElement('canvas');

      this.textBufferContext = new Context(this.textBufferCanvas, {
        width: this.width,
        height: this.height
      });

      this.isTextBufferInitialized = true;
    }

    this.isNumeric = this.text && /^\d*(\.\d+)?$/.test(this.text);

    this.repaint();
  }

  repaint() {
    if(this.isTextBufferInitialized) {
      this.textBufferContext = new Context(this.textBufferCanvas, {
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

    if(this.isEditing) {
      if(this.width > 4) {
        this.inputElement.width(this.width - 4);
      }
      else {
        this.blur();
      }
    }
  }

  draw() {
    if(!this.isTextBufferInitialized) {
      this.sheet.context.drawRect(this.sheet.scrollX + this.x, this.sheet.scrollY + this.y, this.width, this.height, {
        fillColor: this.isSelected ? '#c9e2f9' : this.backGroundColor,
        borderColor: this.borderColor,
        borderWidth: this.borderWidth
      });
    }
    else {
      this.sheet.context.drawImage(this.textBufferCanvas, this.x + this.sheet.scrollX, this.y + this.sheet.scrollY, this.width, this.height);
    }

    if(this.isEditing) {
      if(this.sheet.scrollX + this.x < ROW_HEADER_WIDTH || this.sheet.scrollX + this.x > this.sheet.width - this.width || this.sheet.scrollY + this.y < 20 || this.sheet.scrollY + this.y > this.sheet.height - this.height) {
        this.inputElement.hide();
      }
      else {
        this.inputElement.show();
        this.inputElement.css("left", this.sheet.scrollX + this.x + "px");
        this.inputElement.css("top", this.sheet.scrollY + this.y + "px");
        this.inputElement.focus();
      }
    }
  }

  blur() {
    this.isSelected = false;

    if(this.isEditing) {
      this.isEditing = false;
      this.updateValue(this.inputElement.val());
      this.inputElement.remove();
      this.inputElement = undefined;
    }
  }

  mouseDown(x, y) {
    this.sheet.startMultiSelect();
    this.sheet.updateSelection(this.rowIndex, this.index);
  }

  mouseMove(x, y) {
    if(this.sheet.isMultiSelecting) {
      this.sheet.updateSelection(this.rowIndex, this.index);
    }
  }

  mouseUp(x, y) {
    if(this.sheet.multiSelectSize() == 1) {
      this.edit();
      this.sheet.clearMultiSelect();
    }

    this.sheet.endMultiSelect();
  }

  mouseClick(x, y) {

  }

  edit() {
    this.sheet.deselectAllCells();

    this.isEditing = true;
    this.inputElement = $("<input>", {
      type: "text",
      id: "cell-input",
      style:
        "text-align: " + (this.isNumeric ? "right" : "left") + ";" +
        "position: fixed;" +
        "left: " + this.sheet.scrollX + this.x + "px;" +
        "top: " + this.sheet.scrollY + this.y + "px;" +
        "width: " + (this.width - 4) + "px; height: " + (this.height - 4) + "px;"
    });

    $("body").append(this.inputElement);

    let dirty = false;

    this.inputElement.val(this.value);

    this.inputElement.keydown((e) => {
      let keyCode = e.keyCode || e.which;

      //TODO: auto scroll if moving to cell would make the input disappear

      if(keyCode === 13) {
        //Enter, go to next row
        this.sheet.rows[this.rowIndex + (e.shiftKey ? -1 : 1)].cells[this.index].edit();
      }
      else if(keyCode === 9) {
        //Tab, go to next column
        this.sheet.rows[this.rowIndex].cells[this.index + (e.shiftKey ? -1 : 1)].edit();
        e.preventDefault();
      }
      else if(keyCode === 37) {
        //Left arrow
        if(!dirty) {
          this.sheet.rows[this.rowIndex].cells[this.index - 1].edit();
        }
      }
      else if(keyCode === 39) {
        //Right arrow
        if(!dirty) {
          this.sheet.rows[this.rowIndex].cells[this.index + 1].edit();
        }
      }
      else if(keyCode === 38) {
        //Up arrow
        this.sheet.rows[this.rowIndex - 1].cells[this.index].edit();
      }
      else if(keyCode === 40) {
        //Down arrow
        this.sheet.rows[this.rowIndex + 1].cells[this.index].edit();
      }
      else if((keyCode === 46 /* Delete */ || keyCode === 8 /* Backspace */) && !dirty) {
        this.inputElement.val(undefined);
        this.updateValue(undefined);
      }
    });

    this.inputElement.keyup((e) => {
      let keyCode = e.keyCode || e.which;

      if(keyCode !== 13 && keyCode !== 9 && keyCode !== 37 && keyCode !== 39 && keyCode !== 38 && keyCode !== 40) {
        dirty = true;

        this.updateValue(this.inputElement.val());

        if(this.isNumeric) {
          this.inputElement.css("text-align", this.isNumeric ? "right" : "left")
        }
      }
    });

    this.inputElement.bind('paste', (e) => {
      var pastedData = e.originalEvent.clipboardData.getData('text');

    });

    this.inputElement.focus();
  }
}

export default Cell;
