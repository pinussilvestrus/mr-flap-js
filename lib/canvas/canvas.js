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

  this.height = $('.mr-flap-canvas')[0].height;
  this.width = $('.mr-flap-canvas')[0].width;

  this.canvas = initDiv[0];
  this.canvasCtx = this.canvas.getContext('2d');

  /** structure:
   * { id: String, type: String, shape: Shape }
   * todo(pinussilvestrus): create own class "ShapeEntry"
   */
  this.shapes = [];

  this._createUniqueId = function () {

    return Math.random().toString(36).substr(2, 9);
  
  };

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
    id: `shape-${this._createUniqueId()}`,
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
    speed: 2.5
  }));

};

/**
 * create new obstacle
 * @param heightBottom {Number}
 * @return {Obstacle}
 */
Canvas.prototype.drawObstacle = function (options) {

  var {
    heightBottom
  } = options;

  heightBottom = heightBottom || 50;

  const gapSize = 50;
  const width = 12;

  // bottom
  const optionsBottom = {
    y: this.canvas.height - heightBottom,
    x: this.canvas.width,
    width: width,
    height: heightBottom,
    canvas: this,
    maxX: 0 - width,
    minX: this.canvas.width,
    color: 'black'
  };

  const obstacleBottom = new Obstacle(optionsBottom);

  obstacleBottom.draw();

  // top
  const optionsTop = {
    y: 0,
    x: this.canvas.width,
    width: width,
    height: this.height - heightBottom - gapSize,
    canvas: this,
    maxX: 0 - width,
    minX: this.canvas.width,
    color: 'black'
  };

  const obstacleTop = new Obstacle(optionsTop);

  obstacleTop.draw();

  return {
    obstacleBottom,
    obstacleTop
  };

};

/**
 * removes obstacle by given @param id
 * @param {String} id
 */
Canvas.prototype.removeObstacle = function (id) {

  // todo(pinussilvestrus): use canvas.obstacles after refactoring
  this.shapes.forEach((s, i) => {

    if (s.id === id) {

      // remove completely from array and reorder
      this.shapes = this.shapes.slice(0, i).concat(this.shapes.slice(i + 1));
    
    }
  
  });

};

/**
 * checks collision between obstacles and bird object
 */
Canvas.prototype.collisionDetection = function () {

  let oBird = this.shapes[0].shape;
  let oObst = this.shapes.slice(1);
  let birdWidth = oBird.x + oBird.width;

  for (let i = 0; i < oObst.length; i++) {

    let obstHeight = oObst[i].shape.y + oObst[i].shape.height;
    let obst = oObst[i].shape;
    let obstWidth = obst.x + obst.width;

    if ((oBird.x >= obst.x && birdWidth <= obstWidth) || (birdWidth >= obst.x && birdWidth <= obstWidth) || oBird.x === obstWidth || oBird.x === obst.x || birdWidth === obstWidth) {

      if (obst.y === 0) { // check upper obstacle

        if (oBird.y <= obstHeight) {

          // hit event

        }

      } else { // check lower obstacle

        if (oBird.y + oBird.height >= obst.y) {

          // hit event

        }

      }

    }

  }

};
