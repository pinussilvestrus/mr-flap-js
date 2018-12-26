/* global it, describe, expect, beforeEach,  __html__, Canvas */
/* eslint-disable no-unused-expressions */
describe('Canvas', function () {
    
  var mrflapDiv;
  
  beforeEach(function () {
  
    document.body.innerHTML = __html__['index.html'];
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
    var obstacle = canvas.drawObstacle();

    // then
    expect(obstacle).not.to.be.undefined;
    expect(obstacle.canvas).to.equal(canvas);

    expect(canvas.shapes.length).to.equal(1);
    expect(canvas.shapes[0].id).to.equal('shape-0');
    expect(canvas.shapes[0].shape).to.eql(obstacle);
    expect(canvas.shapes[0].type).to.equal('Obstacle');
  
  });

  it('#moveObstacles', function () {

    // given
    var canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });

    var obstacle = canvas.drawObstacle();
    var originalX = obstacle.x;

    // when
    canvas.moveObstacles();

    // then
    expect(obstacle.x).to.not.equal(originalX);
    expect(obstacle.x).to.equal(originalX - 10);
  
  });
      
});
