class ScreenComponent {
  constructor(sheet, x, y, width, height) {
    this.sheet = sheet;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    // console.log("ScreenComponent:draw()");
  }

  isVisibleOnScreen() {
    return !(this.x + this.sheet.scrollX + this.width < 0 || this.x + this.sheet.scrollX > this.sheet.width ||
      this.y + this.sheet.scrollY + this.height < 0 || this.y + this.sheet.scrollY > this.sheet.height);
  }

  isCollision(canvasX, canvasY) {
    return canvasX > this.x + this.sheet.scrollX &&
      canvasX < this.x + this.sheet.scrollX + this.width &&
      canvasY > this.y + this.sheet.scrollY &&
      canvasY < this.y + this.sheet.scrollY + this.height;
  }
}

export default ScreenComponent;
