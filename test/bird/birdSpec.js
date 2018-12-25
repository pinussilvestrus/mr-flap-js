/* global it, describe, expect, beforeEach, before,  __html__, Bird, Canvas */
/* eslint-disable no-unused-expressions */
describe('Bird', function () {
    
  var canvas;
  var width = 12;
  var height = 12;
  var x = 0;
  var y = 0;
  var maxY = -30;
  var minY = 50;
    
  beforeEach(function () {
    
    document.body.innerHTML = __html__['index.html'];
    var mrflapDiv = $('.mrflap-playground');
    canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });
  
  });
    
  it('#constructor', function () {
      
    // given
    var bird = new Bird({
      canvas: canvas,
      width: width,
      height: height,
      x: x,
      y: y,
      maxY: maxY,
      minY: minY
    });
    
    // then
    expect(bird).not.to.be.undefined;
    expect(bird.canvas).to.equal(canvas);
    expect(bird.width).to.equal(width);
    expect(bird.height).to.equal(height);
    expect(bird.x).to.equal(x);
    expect(bird.y).to.equal(y);
    expect(bird.maxY).to.equal(maxY);
    expect(bird.minY).to.equal(minY);
          
  });
  
  it('#draw', function () {

    // given
    var bird = new Bird({
      canvas: canvas
    });

    // when

    var id = bird.draw();

    // then
    expect(bird).to.exist;
    expect(canvas.shapes.length).to.equal(1);
    expect(canvas.getShape(id)).not.to.be.undefined;
    expect(canvas.getShape(id).shape).to.eql(bird);
  
  });

  describe('#moveUp', function () {

    var bird;

    before(function () {

      bird = new Bird({
        canvas: canvas
      });
  
    });

    it('should move up', function () {

      // given
      var previousY = bird.y;
  
      var speed = 10;
  
      // when
      bird.moveUp({
        speed: speed
      });
  
      // then
      expect(bird.y).to.not.equal(previousY);
      expect(bird.y).to.equal(previousY - speed);
    
    });

    it('should not move up if edges arrived', function () {

      var previousY = bird.y;
  
      var speed = 500;
  
      // when
      bird.moveUp({
        speed: speed
      });
  
      // then
      expect(bird.y).to.equal(previousY);
      expect(bird.y).to.not.equal(previousY - speed);
    
    });
  
  });

  describe('#moveDown', function () {

    var bird;

    before(function () {

      bird = new Bird({
        canvas: canvas,
        minY: 100
      });
  
    });

    it('should move down', function () {

      // given
      var previousY = bird.y;
  
      var speed = 10;
  
      // when
      bird.moveDown({
        speed: speed
      });
  
      // then
      expect(bird.y).to.not.equal(previousY);
      expect(bird.y).to.equal(previousY + speed);
    
    });

    it('should not move down if edges arrived', function () {

      var previousY = bird.y;
  
      var speed = 500;
  
      // when
      bird.moveDown({
        speed: speed
      });
  
      // then
      expect(bird.y).to.equal(previousY);
      expect(bird.y).to.not.equal(previousY + speed);
    
    });
  
  });
        
});
