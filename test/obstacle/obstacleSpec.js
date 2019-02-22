/* global it, describe, expect, beforeEach,  __html__, Obstacle, Canvas, sinon */
/* eslint-disable no-unused-expressions */
describe('Obstacle', function () {
    
  let canvas;
  const width = 12;
  const height = 12;
  const x = 20;
  const y = 0;
  const maxX = 0;
  const minX = 200;
  const color = 'black';

  const _initPlayground = function () {

    $('body').append('<div class="mrflap-playground"></div>');

  };
      
  beforeEach(function () {
      
    document.body.innerHTML = __html__['test.html'];
    _initPlayground();
    const mrflapDiv = $('.mrflap-playground');
    canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });
    
  });
      
  it('#constructor', function () {
        
    // given
    const obstacle = new Obstacle({
      canvas: canvas,
      width: width,
      height: height,
      x: x,
      y: y,
      maxX: maxX,
      minX: minX,
      color: color
    });
      
    // then
    expect(obstacle).not.to.be.undefined;
    expect(obstacle.canvas).to.equal(canvas);
    expect(obstacle.width).to.equal(width);
    expect(obstacle.height).to.equal(height);
    expect(obstacle.x).to.equal(x);
    expect(obstacle.y).to.equal(y);
    expect(obstacle.maxX).to.equal(maxX);
    expect(obstacle.minX).to.equal(minX);
    expect(obstacle.color).to.equal(color);
            
  });
    
  it('#draw', function () {
  
    // given
    const obstacle = new Obstacle({
      canvas: canvas
    });
  
    // when
    const id = obstacle.draw();
  
    // then
    expect(obstacle).to.exist;
    expect(canvas.obstacles.length).to.equal(1);
    expect(canvas.getObstacle(id)).not.to.be.undefined;
    expect(canvas.getObstacle(id).shape).to.eql(obstacle);
    
  });
  
  describe('#moveLeft', function () {
  
    let obstacle;
  
    beforeEach(function () {
  
      obstacle = new Obstacle({
        canvas: canvas,
        x: x
      });
    
    });
  
    it('should move left', function () {
  
      // given
      const previousX = obstacle.x;
    
      const speed = 5;
    
      // when
      obstacle.moveLeft({
        speed: speed
      });
    
      // then
      expect(obstacle.x).to.not.equal(previousX);
      expect(obstacle.x).to.equal(previousX - speed);
      
    });
  
    it('should delete if edge is arrived', function () {
  
      const previousX = obstacle.x;
    
      const speed = 500;

      obstacle.moveLeft({
        speed: 10
      });

      // assure
      expect(obstacle.x).to.not.equal(previousX);
    
      // when
      obstacle.moveLeft({
        speed: speed
      });

      const isIncluded = canvas.obstacles.filter(s => s.id === obstacle.obstacleId).length > 0;
    
      // then
      expect(obstacle.x).to.not.equal(previousX - speed);
      expect(isIncluded).to.be.false;
      
    });
    
  });

  describe('#clear', function () {

    let obstacle;
  
    beforeEach(function () {
  
      obstacle = new Obstacle({
        canvas: canvas,
        x: x
      });
    
    });

    it('should clear obstacle', function () {

      // given
      const clearSpy = sinon.spy(canvas.canvasCtx, 'clearRect');

      // when
      obstacle.clear();

      // then
      expect(clearSpy).to.have.been.called;
      
    });
  
  });
          
});
