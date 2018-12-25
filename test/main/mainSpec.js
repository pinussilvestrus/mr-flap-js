/* global it, describe, expect, before,  __html__, _init, bird */
/* eslint-disable no-unused-expressions */
describe('Main', function () {
  
  describe('#_init', function () {
      
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
        
    it('should start gravitiy', function () {

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
      
      }, 500);
    
    });
  
  });
      
});
