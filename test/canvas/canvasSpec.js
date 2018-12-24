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
  
  });
      
});
