/**
 * basic bird component
 * @param {Canvas} canvas
 * @param {Number} width
 * @param {Number} height
 * @param {Number} x
 * @param {Number} y
 */
function Bird (constructor) {

  this.canvas = constructor.canvas;
  this.width = constructor.width || 64;
  this.height = constructor.width || 64;
  this.x = constructor.x || 0;
  this.y = constructor.y || 0;

}

/**
 * draws a bird component
 */
Bird.prototype.draw = function () {

  var ctx = this.canvas.canvasCtx;
  ctx.fillRect(this.x, this.y, this.width, this.height);
  this.canvas.shapes.push({
    id: `shape-${this.canvas.shapes.length}`,
    shape: this
  });

};

Bird.prototype.moveCirclePath = function () {
  // todo(pinussilvestrus): implement
};
