import ScreenComponent from './ScreenComponent';

class RowHeader extends ScreenComponent {
  constructor(index, rowIndex, sheet, x, y, width, height, options) {
    super(sheet, x, y, width, height, options);

    this.rowIndex = rowIndex;

    Object.assign(this, {
      color: 'black',
      backGroundColor: 'lightGray',
      borderColor: 'darkGray',
      borderWidth: 1
    }, options);

    this.textBufferCanvas = document.createElement('canvas');
    this.textBufferContext = this.textBufferCanvas.getContext('2d');

    this.textBufferCanvas.width = this.width * 2;
    this.textBufferCanvas.height = this.height * 2;
    this.textBufferCanvas.style.width = this.width;
    this.textBufferCanvas.style.height = this.height;

    this.textBufferContext.scale(2, 2);

    this.textBufferContext.font = this.height * 0.8  + 'px Sans';
    this.textBufferContext.fillStyle = this.color;
    this.textBufferContext.textAlign = 'center';
    this.textBufferContext.textBaseline = 'middle';

    this.updateText(rowIndex + 1);
  }

  updateText(text) {
    this.text = text;
    this.textBufferContext.fillText(this.text, this.width / 2, this.height / 2);
  }

  draw() {
    this.sheet.context.drawRect(this.x, this.sheet.scrollY + this.y, this.width, this.height, {
      fillColor: this.backGroundColor,
      borderColor: this.borderColor,
      borderWidth: this.borderWidth
    });

    this.sheet.context.drawImage(this.textBufferCanvas, this.x, this.y + this.sheet.scrollY, this.width, this.height);
  }
}

export default RowHeader;
