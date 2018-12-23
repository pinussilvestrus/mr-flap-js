/* global it, describe, expect, beforeEach,  __html__, Bird, Canvas */
/* eslint-disable no-unused-expressions */
describe('Bird', function () {
    
  var ctx;
  
  var src = '/image.png';
    
  beforeEach(function () {
    
    document.body.innerHTML = __html__['index.html'];
    var mrflapDiv = $('.mrflap-playground');
    var canvas = new Canvas({
      mrflapDiv: mrflapDiv
    });

    ctx = canvas.canvasCtx;
  
  });
    
  it('#constructor', function () {
      
    // given
    var bird = new Bird({
      canvasCtx: ctx,
      src: src
    });
    
    // then
    expect(bird).not.to.be.undefined;
    expect(bird.canvasCtx).to.equal(ctx);
    expect(bird.src).to.equal(src);
          
  });
  
  it('#draw', function () {

    // given
    var bird = new Bird({
      canvasCtx: ctx,
      src: src
    });

    // when
    var birdImg = bird.draw();

    // then
    expect(bird).to.exist;
    expect(birdImg.src).to.contain(src);
  
  });
        
});
