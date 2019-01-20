/* global it, describe, expect, before,  __html__, _init, bird, canvas */
/* eslint-disable no-unused-expressions */
describe('Main', function () {

  const _initPlayground = function () {

    $('body').append('<div class="mrflap-playground"></div>');

  };

  describe('#_init', function (done) {

    before(function () {

      // given
      document.body.innerHTML = __html__['test.html'];

      _initPlayground();

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
      const startY = bird.y;
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
      const obstacle = canvas.shapes[1];
      const startX = obstacle.shape.x;

      // assure
      expect(obstacle).to.exist;
      expect(obstacle.type).to.equal('Obstacle');

      // then
      window.setTimeout(function () {

        // then
        expect(obstacle.shape.x).to.not.equal(startX);
        expect(obstacle.shape.x).to.be.below(startX);

        done();

      }, 500);

    });

    it('should spawn 2 obstacles after 1 second', function (done) {

      // when
      window.setTimeout(function () {

        // then
        // todo(pinussilvestrus): change to canvas.obstacles after refactoring (#36)
        expect(canvas.shapes.length).to.equal(5);

        done();
      
      }, 1000);
    
    });

  });

});
