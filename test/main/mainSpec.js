/* global it, describe, expect, before,  __html__, _init, _reset, bird, canvas, sinon, _isTestMode */
/* eslint-disable no-unused-expressions */
describe('Main', function () {

  const _initPlayground = function () {

    $('body').append('<div class="mrflap-playground"></div>');

  };

  describe('#_init', function () {

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

    // todo(pinussilvestrus): implement tests
    it.skip('should binding keyboard events');

    it('should start gravity', function (done) {

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
      const obstacle = canvas.obstacles[0];
      const startX = obstacle.shape.x;

      // assure
      expect(obstacle).to.exist;

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
        expect(canvas.obstacles.length).to.equal(4);

        done();
      
      }, 1000);
    
    });

  });

  describe('#_isTestMode', function () {

    it('should return true in test mode', function () {

      // given
      const isTestMode = _isTestMode();

      // then
      expect(isTestMode).to.be.true;
    
    });
  
  });

  describe('#_reset', function () {

    before(function () {

      document.body.innerHTML = __html__['test.html'];

      _initPlayground();

      _init();

    });

    it('should reset canvas', function () {

      // given
      const resetSpy = sinon.spy(canvas, 'reset');

      // when
      _reset();

      // then
      expect(resetSpy).to.have.been.called;

    });
  
  });

});
