var beakColor = '#FF9601';
var beakSize = 2;
var eyeColor = 'black';
var eyeSize = 2;
var birdColor = 'white';
var birdSize = 4;

/**
 * basic bird component
 * @param {Canvas} canvas
 * @param {Number} width
 * @param {Number} height
 * @param {Number} x
 * @param {Number} y
 * @param {String} shapeId
 * @param {String} color
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
  this.color = constructor.color;

  this.maxY = constructor.maxY || 0;
  this.minY = constructor.minY || 50;

  this._clear = function () {

    var ctx = this.canvas.canvasCtx;

    // clear body, eye and wing
    ctx.clearRect(this.x, this.y, this.width, this.height);

    // clear beak
    var beakCoords = this._getBeakCoordinates();
    ctx.clearRect(
      beakCoords[0].x,
      beakCoords[0].y,
      beakCoords[1].x - beakCoords[0].x,
      beakCoords[2].y - beakCoords[0].y);
  
  };

  this._getBeakCoordinates = function () {

    return [
      { x: this.x + this.width, y: this.y + this.height / 2 - beakSize },
      { x: this.x + this.width + beakSize, y: this.y + this.height / 2 },
      { x: this.x + this.width, y: this.y + this.height / 2 + beakSize }
    ];
  
  };

  this._moveY = function (step) {

    // remove old bird
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

  // draw body
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);

  // draw beak
  var beakCoords = this._getBeakCoordinates();
  ctx.beginPath();
  ctx.moveTo(beakCoords[0].x, beakCoords[0].y);
  ctx.lineTo(beakCoords[1].x, beakCoords[1].y);
  ctx.lineTo(beakCoords[2].x, beakCoords[2].y);
  ctx.closePath();
  ctx.fillStyle = beakColor;
  ctx.fill();

  // draw eye
  ctx.fillStyle = eyeColor;
  ctx.fillRect(this.x + this.width - eyeSize * 2, this.y + eyeSize, eyeSize, eyeSize);

  // draw wing
  ctx.fillStyle = birdColor;
  ctx.fillRect(this.x + birdSize / 2, this.y + this.height / 2, birdSize, birdSize / 2);

  if (!this.shapeId) {

    // create new shape
    this.shapeId = this.canvas.addShape({
      shape: this,
      type: 'Bird'
    });
  
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
