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

}

/**
 * draws a bird on canvas
 * @param {String} src
 */
Canvas.prototype.drawBird = function (options) {

  const {
    src
  } = options;

  const bird = new Bird({
    canvasCtx: this.canvasCtx,
    src
  });

  bird.draw();

};
