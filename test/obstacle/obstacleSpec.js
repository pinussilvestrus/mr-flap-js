/* global it, describe, expect, beforeEach,  __html__, Obstacle, Canvas */
/* eslint-disable no-unused-expressions */
describe('Obstacle', function () {
    
  var canvas;
  var width = 12;
  var height = 12;
  var x = 20;
  var y = 0;
  var maxX = 0;
  var minX = 200;
  var color = 'black';
      
  beforeEach(function () {
      
    document.body.innerHTML = __html__['index.html'];
    var mrflapDiv = $('.mrflap-playground');
    canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });
    
  });
      
  it('#constructor', function () {
        
    // given
    var obstacle = new Obstacle({
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
    var obstacle = new Obstacle({
      canvas: canvas
    });
  
    // when
  
    var id = obstacle.draw();
  
    // then
    expect(obstacle).to.exist;
    expect(canvas.shapes.length).to.equal(1);
    expect(canvas.getShape(id)).not.to.be.undefined;
    expect(canvas.getShape(id).shape).to.eql(obstacle);
    
  });
  
  describe('#moveLeft', function () {
  
    var obstacle;
  
    beforeEach(function () {
  
      obstacle = new Obstacle({
        canvas: canvas,
        x: x
      });
    
    });
  
    it('should move left', function () {
  
      // given
      var previousX = obstacle.x;
    
      var speed = 5;
    
      // when
      obstacle.moveLeft({
        speed: speed
      });
    
      // then
      expect(obstacle.x).to.not.equal(previousX);
      expect(obstacle.x).to.equal(previousX - speed);
      
    });
  
    it('should delete if edge is arrived', function () {
  
      var previousX = obstacle.x;
    
      var speed = 500;

      obstacle.moveLeft({
        speed: 10
      });

      // assure
      expect(obstacle.x).to.not.equal(previousX);
    
      // when
      obstacle.moveLeft({
        speed: speed
      });

      var isIncluded = canvas.shapes.filter(s => s.id === obstacle.shapeId).length > 0;
    
      // then
      expect(obstacle.x).to.not.equal(previousX - speed);
      expect(isIncluded).to.be.false;
      
    });
    
  });
          
});
