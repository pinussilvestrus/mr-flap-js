/* global it, describe, expect, before,  __html__, _init, bird, canvas */
/* eslint-disable no-unused-expressions */
describe('Main', function () {
  
  describe('#_init', function (done) {
      
    before(function () {
      
      // given
      document.body.innerHTML = __html__['index.html'];

      // when
      _init();
    
    });

    it('should append header', function () {

      // then
      expect($('.mrflap-header')[0]).to.exist;
      expect($('.mrflap-header').text()).to.equal('mr-flap-js');
    
    });

    it('should append footer', function () {

      // then
      expect($('.mrflap-footer')[0]).to.exist;
    
    });

    it('should create canvas', function () {

      // then
      expect($('.mr-flap-canvas')[0]).to.exist;
    
    });

    // todo(pinussvilestrus): implement tests
    it.skip('should binding keyboard events');
        
    it('should start gravitiy', function (done) {

      // given
      var startY = bird.y;
      bird.moveUp({
        speed: 10
      });

      // assure
      expect(bird.y).to.equal(startY - 10);

      // when
      window.setTimeout(function () {

        // then
        expect(bird.y).to.equal(startY);

        done();
      
      }, 500);
    
    });

    it('should start moving obstacles', function (done) {

      // given
      // todo(pinussilvestrus): not using hardcoded index
      var obstacle = canvas.shapes[1];
      var startX = obstacle.shape.x;

      // assure
      expect(obstacle).to.exist;
      expect(obstacle.type).to.equal('Obstacle');

      // then
      window.setTimeout(function () {

        // then
        expect(obstacle.shape.x).to.not.equal(startX);
        expect(obstacle.shape.x).to.be.below(startX);

        done();
      
      }, 1001);
    
    });
  
  });
      
});
