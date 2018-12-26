/* global Bird */

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
   * { id: String, shape: Shape }
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
 * @return {String} shape identifier
 */
Canvas.prototype.addShape = function (shape) {

  const newShape = {
    id: `shape-${this.shapes.length}`,
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
