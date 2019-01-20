/* global it, describe, expect, beforeEach, before,  __html__, Bird, Canvas */
/* eslint-disable no-unused-expressions */
describe('Bird', function () {
    
  let canvas;
  const width = 12;
  const height = 12;
  const x = 0;
  const y = 0;
  const maxY = -30;
  const minY = 50;
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
    const bird = new Bird({
      canvas: canvas,
      width: width,
      height: height,
      x: x,
      y: y,
      maxY: maxY,
      minY: minY,
      color: color
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
    expect(bird.color).to.equal(color);
          
  });
  
  it('#draw', function () {

    // given
    const bird = new Bird({
      canvas: canvas
    });

    // when

    const id = bird.draw();

    // then
    expect(bird).to.exist;
    expect(canvas.shapes.length).to.equal(1);
    expect(canvas.getShape(id)).not.to.be.undefined;
    expect(canvas.getShape(id).shape).to.eql(bird);
  
  });

  describe('#moveUp', function () {

    let bird;

    before(function () {

      bird = new Bird({
        canvas: canvas
      });
  
    });

    it('should move up', function () {

      // given
      const previousY = bird.y;
  
      const speed = 10;
  
      // when
      bird.moveUp({
        speed: speed
      });
  
      // then
      expect(bird.y).to.not.equal(previousY);
      expect(bird.y).to.equal(previousY - speed);
    
    });

    it('should not move up if edges arrived', function () {

      const previousY = bird.y;
  
      const speed = 500;
  
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

    let bird;

    before(function () {

      bird = new Bird({
        canvas: canvas,
        minY: 100
      });
  
    });

    it('should move down', function () {

      // given
      const previousY = bird.y;
  
      const speed = 10;
  
      // when
      bird.moveDown({
        speed: speed
      });
  
      // then
      expect(bird.y).to.not.equal(previousY);
      expect(bird.y).to.equal(previousY + speed);
    
    });

    it('should not move down if edges arrived', function () {

      const previousY = bird.y;
  
      const speed = 500;
  
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
