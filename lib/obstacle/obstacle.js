/**
 * basic obstacle component
 * @param {Canvas} canvas
 * @param {Number} width
 * @param {Number} height
 * @param {Number} x
 * @param {Number} y
 * @param {String} obstacleId
 * @param {String} color
 * @param {Number} maxX
 */
class Obstacle {

  constructor (options) {

    this.canvas = options.canvas;
    this.width = options.width || 12;
    this.height = options.height || 12;
    this.x = typeof options.x === 'number' ? options.x : 0;
    this.y = typeof options.y === 'number' ? options.y : 50;
    this.obstacleId = options.obstacleId;
    this.color = options.color;
      
    this.maxX = options.maxX || 0;
    this.minX = options.minX || 200;
    
    this._moveX = function (step) {
    
      // remove old rect
      this.clear();
    
      // update props
      const newX = this.x + step;
      if (newX >= this.maxX) {
    
        this.x = newX;

        // create new rect
        this.draw();
        
      } else {

        // remove obstacle on the left edge
        this.canvas.removeObstacle(this.obstacleId);
        delete this;
      
      }
      
    };
    
  }

  /**
   * clears obstacle
   */
  clear () {

    const ctx = this.canvas.canvasCtx;
    ctx.clearRect(this.x, this.y, this.width, this.height);
  
  }

  /**
     * draws a bird component
     * @returns {String} shape identifier
     */
  draw () {
    
    const ctx = this.canvas.canvasCtx;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width - 1, this.height);
    
    if (!this.obstacleId) {
    
      // create new shape
      this.obstacleId = this.canvas.addObstacle({
        obstacleShape: this
      });
      
    }
    
    return this.obstacleId;
    
  }

  /**
     * moves the obstacle to left by given speed
     * @param {Number} speed
     */
  moveLeft (options) {
    
    const {
      speed
    } = options;
    
    this._moveX(-speed);
    
  }

}
