/* global it, describe, expect, beforeEach,  __html__, Canvas, sinon */
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
    expect(canvas.obstacles.length).to.equal(0);

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

    const canvasBird = canvas.bird;

    expect(canvasBird).to.exist;
    expect(canvasBird.id).not.to.be.undefined;
    expect(canvasBird.shape).to.eql(bird);

  });

  it('#addObstacle', function () {

    // given
    const canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });

    const shape = { val: 'foo' };

    // when
    canvas.addObstacle({
      obstacleShape: shape
    });

    // then
    const obstacles = canvas.obstacles;

    expect(obstacles.length).to.equal(1);
    expect(obstacles[0].shape).to.eql(shape);

  });

  it('#addBird', function () {

    // given
    const canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });

    const shape = { val: 'foo' };

    // when
    canvas.addBird({
      birdShape: shape
    });

    // then
    const bird = canvas.bird;

    expect(bird).to.exist;
    expect(bird.shape).to.eql(shape);

  });

  it('#getObstacle', function () {

    // given
    const canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });

    const shape = { val: 'foo' };

    const id = canvas.addObstacle({
      obstacleShape: shape
    });

    // when
    const o = canvas.getObstacle(id);

    // then
    expect(o).not.to.be.undefined;
    expect(o.shape).to.eql(shape);

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
    const obstacles = canvas.obstacles;

    expect(obstacles.length).to.equal(2);

    expect(obstacleBottom).not.to.be.undefined;
    expect(obstacleBottom.canvas).to.equal(canvas);
    expect(obstacles[0].id).to.equal(obstacleBottom.obstacleId);
    expect(obstacles[0].shape).to.eql(obstacleBottom);

    expect(obstacleTop).not.to.be.undefined;
    expect(obstacleTop.canvas).to.equal(canvas);
    expect(obstacles[1].id).to.equal(obstacleTop.obstacleId);
    expect(obstacles[1].shape).to.eql(obstacleTop);

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

});
