/**
 * basic bird component
 * @param {Canvas} canvas
 * @param {Number} width
 * @param {Number} height
 * @param {Number} x
 * @param {Number} y
 * @param {String} shapeId
 * @param {Number} maxY
 * @param {Number} minY
 */
function Bird (constructor) {

  this.canvas = constructor.canvas;
  this.width = constructor.width || 12;
  this.height = constructor.height || 12;
  this.x = typeof constructor.x === 'number' ? constructor.x : 0;
  this.y = typeof constructor.y === 'number' ? constructor.y : 50;
  this.shapeId = constructor.shapeId;

  this.maxY = constructor.maxY || 0;
  this.minY = constructor.minY || 50;

  this._clear = function () {

    var ctx = this.canvas.canvasCtx;
    ctx.clearRect(this.x, this.y, this.width, this.height);
  
  };

  this._moveY = function (step) {

    // remove old rect
    this._clear();

    // update props
    var newY = this.y + step;
    if (newY >= this.maxY && newY <= this.minY) {

      this.y = newY;
    
    }

    // create new rect
    this.draw();
  
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

  this._moveY(-speed);

};

/**
 * moves the bird down by given speed
 * @param {Number} speed
 */
Bird.prototype.moveDown = function (options) {

  const {
    speed
  } = options;

  this._moveY(speed);

};
