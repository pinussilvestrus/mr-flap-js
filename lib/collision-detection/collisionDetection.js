
/* global threadify */
class CollisionDetection {

  /**
   *  @param {Bird} options.bird
   *  @param {Array<Obstacle>} options.obstacle
   */
  static collisionDetection ({ bird, obstacles }) {

    const thread = this;
      
    let birdWidth = bird.x + bird.width;
        
    obstacles.forEach(obstacle => {

      let obstacleHeight = obstacle.y + obstacle.height;
      let obstacleWidth = obstacle.x + obstacle.width;
        
      if (
        (bird.x >= obstacle.x && birdWidth <= obstacleWidth) ||
                (birdWidth >= obstacle.x && birdWidth <= obstacleWidth) ||
                (bird.x === obstacleWidth) ||
                (bird.x === obstacle.x) ||
                (birdWidth === obstacleWidth)
      ) {
        
        if (obstacle.y === 0) { // check upper obstacle
        
          if (bird.y <= obstacleHeight) {
        
            thread.return(true);
        
          }
        
        } else { // check lower obstacle
        
          if (bird.y + bird.height >= obstacle.y) {
        
            thread.return(true);
        
          }
        
        }
        
      }
        
    });

    thread.return(false);
        
  }

  static wrapped (canvas) {

    // cleanup objects for later use
    const bird = {
      x: canvas.bird.shape.x,
      y: canvas.bird.shape.y,
      width: canvas.bird.shape.width,
      height: canvas.bird.shape.height
    };

    const obstacles = canvas.obstacles.map(o => {

      return {
        x: o.shape.x,
        y: o.shape.y,
        width: o.shape.width,
        height: o.shape.height
      };
    
    });

    const wrappedFn = threadify(this.collisionDetection);

    return {
      collisionDetection: wrappedFn,
      collideCheckObject: {
        bird,
        obstacles
      }
    };
  
  }

}
