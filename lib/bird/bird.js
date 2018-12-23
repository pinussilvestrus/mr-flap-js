/**
 * basic bird component
 * @param {CanvasRenderingContext2D} canvasCtx
 * @param {String} src
 */
function Bird (constructor) {

  this.canvasCtx = constructor.canvasCtx;
  this.src = constructor.src;

}

/**
 * draws a bird component
 * @returns {Image}
 */
Bird.prototype.draw = function () {

  var img = new Image();
  var ctx = this.canvasCtx;
  
  img.onload = function () {
  
    ctx.drawImage(img, 100, 100);
    
  };

  img.src = this.src;

  return img;

};

Bird.prototype.moveCirclePath = function () {
  // todo(pinussilvestrus): implement
};
