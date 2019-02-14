/* global Bird, Obstacle */

/**
 * basic canvas component
 * @param {Element} mrflapDiv
 * @param {Function} onClear
 */
class Canvas {

  constructor (options) {

    this.mrflapDiv = options.mrflapDiv;
    const initDiv = $(`<canvas class="mr-flap-canvas">
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

    this.onClear = options.onClear;

    this._createUniqueId = () => {

      return Math.random().toString(36).substr(2, 9);
    
    };

  }

  /**
   * draws a bird on canvas
   * @return {Bird}
   */
  drawBird () {

    const size = 12;

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

  }

  /**
   * add a shape to shape collection
   * @param {Shape} shape
   * @param {String} type
   * @return {String} shape identifier
   */
  addShape (options) {

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

  }

  /**
   * returns a shape with a given id
   * @param {String} id
   * @return {ShapeEntry}
   */
  getShape (id) {

    let elem;

    this.shapes.forEach(f => {

      if (f.id === id) {

        elem = f;

      }

    });

    return elem;

  }

  /**
   * move all obstacles
   */
  moveObstacles () {

    const obstacles = this.shapes.filter(s => s.type === 'Obstacle');

    obstacles.forEach(o => o.shape.moveLeft({
      speed: 2.5
    }));

  }

  /**
   * create new obstacle
   * @param heightBottom {Number}
   * @return {Obstacle}
   */
  drawObstacle (options) {

    let {
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

  }

  /**
   * removes obstacle by given @param id
   * @param {String} id
   */
  removeObstacle (id) {

    // todo(pinussilvestrus): use canvas.obstacles after refactoring
    this.shapes.forEach((s, i) => {

      if (s.id === id) {

        // remove completely from array and reorder
        this.shapes = this.shapes.slice(0, i).concat(this.shapes.slice(i + 1));
      
      }
    
    });

  }

  /**
   * checks collision between obstacles and bird object
   */
  collisionDetection () {

    let birdShape = this.shapes[0].shape;
    let obstacles = this.shapes.slice(1);
    let birdWidth = birdShape.x + birdShape.width;

    const _hitAction = () => {

      if (typeof this.onClear === 'function') {

        this.onClear();
      
      }
    
    };

    obstacles.forEach(obstacle => {

      let obstacleShape = obstacle.shape;
      let obstacleHeight = obstacleShape.y + obstacleShape.height;
      let obstacleWidth = obstacleShape.x + obstacleShape.width;

      if (
        (birdShape.x >= obstacleShape.x && birdWidth <= obstacleWidth) ||
        (birdWidth >= obstacleShape.x && birdWidth <= obstacleWidth) ||
        (birdShape.x === obstacleWidth) ||
        (birdShape.x === obstacleShape.x) ||
        (birdWidth === obstacleWidth)
      ) {

        if (obstacleShape.y === 0) { // check upper obstacle

          if (birdShape.y <= obstacleHeight) {

            _hitAction();

          }

        } else { // check lower obstacle

          if (birdShape.y + birdShape.height >= obstacleShape.y) {

            _hitAction();

          }

        }

      }

    });

  }

  /**
   * completely deletes canvas and all its shapes
   */
  reset () {
    
    this.shapes.forEach(s => {

      const shape = s.shape || {};

      if (typeof shape.clear === 'function') {

        shape.clear();
      
      }
    
    });

    this.shapes = [];

    this.canvas.remove();

    delete this;
  
  }

}
