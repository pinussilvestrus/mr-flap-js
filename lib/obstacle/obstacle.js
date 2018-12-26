/**
 * basic obstacle component
 * @param {Canvas} canvas
 * @param {Number} width
 * @param {Number} height
 * @param {Number} x
 * @param {Number} y
 * @param {String} shapeId
 * @param {String} color
 * @param {Number} maxX
 */
function Obstacle (constructor) {

  this.canvas = constructor.canvas;
  this.width = constructor.width || 12;
  this.height = constructor.height || 12;
  this.x = typeof constructor.x === 'number' ? constructor.x : 0;
  this.y = typeof constructor.y === 'number' ? constructor.y : 50;
  this.shapeId = constructor.shapeId;
  this.color = constructor.color;
  
  this.maxX = constructor.maxX || 0;
  
  this._clear = function () {
  
    var ctx = this.canvas.canvasCtx;
    ctx.clearRect(this.x, this.y, this.width, this.height);
    
  };
  
  this._moveX = function (step) {
  
    // remove old rect
    this._clear();
  
    // update props
    var newX = this.x + step;
    if (newX >= this.maxX) {
  
      this.x = newX;
      
    }
  
    // create new rect
    this.draw();
    
  };
  
}
  
/**
   * draws a bird component
   * @returns {String} shape identifier
   */
Obstacle.prototype.draw = function () {
  
  var ctx = this.canvas.canvasCtx;
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
  
  if (!this.shapeId) {
  
    // create new shape
    this.shapeId = this.canvas.addShape({
      shape: this,
      type: 'Obstacle'
    });
    
  }
  
  return this.shapeId;
  
};

/**
   * moves the obstacle to left by given speed
   * @param {Number} speed
   */
Obstacle.prototype.moveLeft = function (options) {
  
  const {
    speed
  } = options;
  
  this._moveX(-speed);
  
};
