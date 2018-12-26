/* global Bird, Obstacle */

/**
 * basic canvas component
 * @param {Element} mrflapDiv
 */
function Canvas (constructor) {

  this.mrflapDiv = constructor.mrflapDiv;
  var initDiv = $(`<canvas class="mr-flap-canvas">
    This text is displayed if your browser does not support HTML5 Canvas.
   </canvas>
  `);

  this.mrflapDiv.append(initDiv);

  this.canvas = initDiv[0];
  this.canvasCtx = this.canvas.getContext('2d');
  /** structure:
   * { id: String, type: String, shape: Shape }
   * todo(pinussilvestrus): create own class "ShapeEntry"
   */
  this.shapes = [];

}

/**
 * draws a bird on canvas
 * @return {Bird}
 */
Canvas.prototype.drawBird = function () {

  var size = 12;

  const options = {
    y: this.canvas.height - size,
    x: 20,
    width: size,
    height: size,
    canvas: this,
    maxY: 0,
    minY: this.canvas.height - size,
    color: '#00AEFF'
  };

  const bird = new Bird(options);

  bird.draw();

  return bird;

};

/**
 * add a shape to shape collection
 * @param {Shape} shape
 * @param {String} type
 * @return {String} shape identifier
 */
Canvas.prototype.addShape = function (options) {

  const {
    shape,
    type
  } = options;

  const newShape = {
    id: `shape-${this.shapes.length}`,
    type: type,
    shape: shape
  };

  this.shapes.push(newShape);

  return newShape.id;

};

/**
 * returns a shape with a given id
 * @param {String} id
 * @return {ShapeEntry}
 */
Canvas.prototype.getShape = function (id) {

  var elem;

  this.shapes.forEach(f => {

    if (f.id === id) {

      elem = f;
    
    }
  
  });

  return elem;

};

/**
 * move all obstacles
 */
Canvas.prototype.moveObstacles = function () {

  const obstacles = this.shapes.filter(s => s.type === 'Obstacle');

  obstacles.forEach(o => o.shape.moveLeft({
    speed: 10
  }));

};

/**
 * create new obstacle
 * @return {Obstacle}
 */
Canvas.prototype.drawObstacle = function () {

  var width = 12;
  var height = 24;

  const options = {
    y: this.canvas.height - height,
    x: this.canvas.width,
    width: width,
    height: height,
    canvas: this,
    maxX: 0 - width,
    minX: this.canvas.width,
    color: 'black'
  };

  const obstacle = new Obstacle(options);

  obstacle.draw();

  return obstacle;

};
