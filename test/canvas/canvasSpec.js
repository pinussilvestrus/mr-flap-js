/* global it, describe, expect, beforeEach,  __html__, Canvas */
/* eslint-disable no-unused-expressions */
describe('Canvas', function () {

  let mrflapDiv;

  const _initPlayground = function () {

    $('body').append('<div class="mrflap-playground"></div>');

  };

  beforeEach(function () {

    document.body.innerHTML = __html__['test.html'];
    _initPlayground();
    mrflapDiv = $('.mrflap-playground');

  });

  it('#constructor', function () {

    // given
    const canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });

    // then
    expect(canvas).not.to.be.undefined;
    expect(canvas.mrflapDiv).to.equal(mrflapDiv);
    expect(canvas.shapes.length).to.equal(0);

  });

  it('#drawBird', function () {

    // given
    const canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });

    // when
    const bird = canvas.drawBird();

    // then
    expect(bird).not.to.be.undefined;
    expect(bird.canvas).to.equal(canvas);

    expect(canvas.shapes.length).to.equal(1);
    expect(canvas.shapes[0].id).not.to.be.undefined;
    expect(canvas.shapes[0].shape).to.eql(bird);
    expect(canvas.shapes[0].type).to.equal('Bird');

  });

  it('#addShape', function () {

    // given
    const canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });

    const shape = { val: 'foo' };

    // when
    canvas.addShape({
      type: 'foo',
      shape: shape
    });

    // then
    expect(canvas.shapes.length).to.equal(1);
    expect(canvas.shapes[0].type).to.equal('foo');
    expect(canvas.shapes[0].shape).to.eql(shape);

  });

  it('#getShape', function () {

    // given
    const canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });

    const shape = { val: 'foo' };

    const id = canvas.addShape({
      shape: shape
    });

    // when
    const s = canvas.getShape(id);

    // then
    expect(s).not.to.be.undefined;
    expect(s.shape).to.eql(shape);

  });

  it('#drawObstacle', function () {

    // given
    const canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });

    // when
    const {
      obstacleBottom,
      obstacleTop
    } = canvas.drawObstacle({
      heightBottom: 50
    });

    // then

    expect(canvas.shapes.length).to.equal(2);

    expect(obstacleBottom).not.to.be.undefined;
    expect(obstacleBottom.canvas).to.equal(canvas);
    expect(canvas.shapes[0].id).to.equal(obstacleBottom.shapeId);
    expect(canvas.shapes[0].shape).to.eql(obstacleBottom);
    expect(canvas.shapes[0].type).to.equal('Obstacle');

    expect(obstacleTop).not.to.be.undefined;
    expect(obstacleTop.canvas).to.equal(canvas);
    expect(canvas.shapes[1].id).to.equal(obstacleTop.shapeId);
    expect(canvas.shapes[1].shape).to.eql(obstacleTop);
    expect(canvas.shapes[1].type).to.equal('Obstacle');

  });

  it('#moveObstacles', function () {

    // given
    const canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });

    const {
      obstacleBottom
    } = canvas.drawObstacle({
      heightBottom: 50
    });

    const originalX = obstacleBottom.x;

    // when
    canvas.moveObstacles();

    // then
    expect(obstacleBottom.x).to.not.equal(originalX);
    expect(obstacleBottom.x).to.equal(originalX - 2.5);

  });

  describe('#collisionDetection', function () {

    let canvas, bird;

    beforeEach(function () {

      canvas = new Canvas({
        mrflapDiv: mrflapDiv
      });
  
      bird = canvas.drawBird();

    });

    it('should hit lower obstacle', function () {

      // given
      const {
        obstacleBottom
      } = canvas.drawObstacle({
        heightBottom: 50
      });
  
      const originalX = obstacleBottom.x;
  
      // when
      for (let i = 0; i < 110; i++) {
  
        canvas.moveObstacles();
  
      }
  
      canvas.collisionDetection();
  
      // then
      // todo(pinussilvestrus): test real hit event after it's implemented
      expect(bird.x + bird.width).to.be.gte(obstacleBottom.x);
      expect(bird.y + bird.height).to.equal(150);
      expect(obstacleBottom.y).to.equal(100);
      expect(bird.y + bird.height).to.be.gte(obstacleBottom.y);
      expect(obstacleBottom.x).to.not.equal(originalX);
      expect(obstacleBottom.x).to.equal(originalX - 275);
  
    });

    it('should hit upper obstacle', function () {

      // given
      const {
        obstacleTop
      } = canvas.drawObstacle({
        heightBottom: 50
      });

      bird.moveUp({
        speed: 100
      });
  
      const originalX = obstacleTop.x;
  
      // when
      for (let i = 0; i < 110; i++) {
  
        canvas.moveObstacles();
  
      }
  
      canvas.collisionDetection();
  
      // then
      // todo(pinussilvestrus): test real hit event after it's implemented
      expect(bird.x + bird.width).to.be.gte(obstacleTop.x);
      expect(obstacleTop.y).to.equal(0);
      expect(bird.y + bird.height).to.be.lte(obstacleTop.y + obstacleTop.height);
      expect(obstacleTop.x).to.not.equal(originalX);
      expect(obstacleTop.x).to.equal(originalX - 275);
  
    });

  });

});
