/**
 * basic bird component
 * @param {Canvas} canvas
 * @param {Number} width
 * @param {Number} height
 * @param {Number} x
 * @param {Number} y
 * @param {String} shapeId
 */
function Bird (constructor) {

  this.canvas = constructor.canvas;
  this.width = constructor.width || 12;
  this.height = constructor.width || 12;
  this.x = typeof constructor.x === 'number' ? constructor.x : 0;
  this.y = typeof constructor.y === 'number' ? constructor.y : 50;
  this.shapeId = constructor.shapeId;

  this._clear = function () {

    var ctx = this.canvas.canvasCtx;
    ctx.clearRect(this.x, this.y, this.width, this.height);
  
  };

}

/**
 * draws a bird component
 * @returns {String} shape identifier
 */
Bird.prototype.draw = function () {

  var ctx = this.canvas.canvasCtx;
  ctx.fillRect(this.x, this.y, this.width, this.height);

  if (!this.shapeId) {

    // create new shape
    this.shapeId = this.canvas.addShape(this);
  
  }

  return this.shapeId;

};

Bird.prototype.moveCirclePath = function () {
  // todo(pinussilvestrus): implement
};

/**
 * moves the bird up by given speed
 * @param {Number} speed
 */
Bird.prototype.moveUp = function (options) {

  const {
    speed
  } = options;

  // remove old rect
  this._clear();

  // update props
  this.y -= speed;

  // create new rect
  this.draw();

};
