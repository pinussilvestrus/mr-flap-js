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
     * { id: String, shape: Shape }
     * todo(pinussilvestrus): create own class "ShapeEntry"
     */
    this.obstacles = [];

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
   * add a obstacle to collection
   * @param {Obstacle} obstacleShape
   * @return {String} obstacle identifier
   */
  addObstacle (options) {

    const {
      obstacleShape
    } = options;

    const newObstacle = {
      id: `obstacle-${this._createUniqueId()}`,
      shape: obstacleShape
    };

    this.obstacles.push(newObstacle);

    return newObstacle.id;

  }

  /**
   * add a bird
   * @param {Bird} birdShape
   * @return {String} bird identifier
   */
  addBird (options) {

    const {
      birdShape
    } = options;

    const newBird = {
      id: `bird-${this._createUniqueId()}`,
      shape: birdShape
    };

    this.bird = newBird;

    return newBird.id;
  
  }

  /**
   * returns a obstacle with a given id
   * @param {String} id
   * @return {ShapeEntry}
   */
  getObstacle (id) {

    let elem;

    this.obstacles.forEach(f => {

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

    const obstacles = this.obstacles;

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

    this.obstacles.forEach((s, i) => {

      if (s.id === id) {

        // remove completely from array and reorder
        this.obstacles = this.obstacles.slice(0, i).concat(this.obstacles.slice(i + 1));
      
      }
    
    });

  }

  /**
   * completely deletes canvas and all its shapes
   */
  reset () {
    
    this.obstacles.forEach(o => {

      const obstacle = o.shape || {};

      if (typeof obstacle.clear === 'function') {

        obstacle.clear();
      
      }
    
    });

    this.obstacles = [];

    if (this.bird) {

      this.bird.shape.clear();
    
    }

    this.canvas.remove();

    delete this;
  
  }

}
