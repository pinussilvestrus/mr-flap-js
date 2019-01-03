/* global it, describe, expect, beforeEach,  __html__, Canvas */
/* eslint-disable no-unused-expressions */
describe('Canvas', function () {

  var mrflapDiv;

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
    var canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });

    // then
    expect(canvas).not.to.be.undefined;
    expect(canvas.mrflapDiv).to.equal(mrflapDiv);
    expect(canvas.shapes.length).to.equal(0);

  });

  it('#drawBird', function () {

    // given
    var canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });

    // when
    var bird = canvas.drawBird();

    // then
    expect(bird).not.to.be.undefined;
    expect(bird.canvas).to.equal(canvas);

    expect(canvas.shapes.length).to.equal(1);
    expect(canvas.shapes[0].id).to.equal('shape-0');
    expect(canvas.shapes[0].shape).to.eql(bird);
    expect(canvas.shapes[0].type).to.equal('Bird');

  });

  it('#addShape', function () {

    // given
    var canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });

    var shape = { val: 'foo' };

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
    var canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });

    var shape = { val: 'foo' };

    var id = canvas.addShape({
      shape: shape
    });

    // when
    var s = canvas.getShape(id);

    // then
    expect(s).not.to.be.undefined;
    expect(s.shape).to.eql(shape);

  });

  it('#drawObstacle', function () {

    // given
    var canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });

    // when
    var {
      obstacleBottom,
      obstacleTop
    } = canvas.drawObstacle();

    // then

    expect(canvas.shapes.length).to.equal(2);

    expect(obstacleBottom).not.to.be.undefined;
    expect(obstacleBottom.canvas).to.equal(canvas);
    expect(canvas.shapes[0].id).to.equal('shape-0');
    expect(canvas.shapes[0].shape).to.eql(obstacleBottom);
    expect(canvas.shapes[0].type).to.equal('Obstacle');

    expect(obstacleTop).not.to.be.undefined;
    expect(obstacleTop.canvas).to.equal(canvas);
    expect(canvas.shapes[1].id).to.equal('shape-1');
    expect(canvas.shapes[1].shape).to.eql(obstacleTop);
    expect(canvas.shapes[1].type).to.equal('Obstacle');

  });

  it('#collisionDetection', function () {

    // given
    var canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });

    var {
      obstacleBottom
    } = canvas.drawObstacle();

    var originalX = obstacleBottom.x;

    // when
    canvas.moveObstacles();

    // then
    expect(obstacleBottom.x).to.not.equal(originalX);
    expect(obstacleBottom.x).to.equal(originalX - 2.5);

  });

  it('#hitsObstacle', function () {

    // given
    var canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });

    var {
      obstacleBottom
    } = canvas.drawObstacle();

    var bird = canvas.drawBird();

    var originalX = obstacleBottom.x;

    // when
    for (let i = 0; i < 120; i++) {

      canvas.moveObstacles();

    }

    // then
    expect(bird.x).to.be.gte(obstacleBottom.x);
    expect(obstacleBottom.x).to.not.equal(originalX);
    expect(obstacleBottom.x).to.equal(originalX - 300);

  });

});
