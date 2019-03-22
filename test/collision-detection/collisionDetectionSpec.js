/* global it, describe, expect, beforeEach,  __html__, Canvas, sinon, CollisionDetection */
/* eslint-disable no-unused-expressions */
describe('CollisionDetection', function () {

  let mrflapDiv;
  
  const _initPlayground = function () {
  
    $('body').append('<div class="mrflap-playground"></div>');
  
  };
  
  beforeEach(function () {
  
    document.body.innerHTML = __html__['test.html'];
    _initPlayground();
    mrflapDiv = $('.mrflap-playground');
  
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
      canvas.drawObstacle({
        heightBottom: 50
      });
    
      // when
      for (let i = 0; i < 110; i++) {
  
        canvas.moveObstacles();
  
      }
  
      // when
      const {
        collisionDetection,
        collideCheckObject
      } = CollisionDetection.wrapped(canvas);
  
      const job = collisionDetection(collideCheckObject);
  
      job.done = (isCollided) => {
  
        // then
        expect(isCollided).to.be.true;
      
      };
  
    });

    it('should hit upper obstacle', function () {

      // given
      canvas.drawObstacle({
        heightBottom: 50
      });

      bird.moveUp({
        speed: 100
      });
  
      // when
      for (let i = 0; i < 110; i++) {
  
        canvas.moveObstacles();
  
      }
  
      // when
      const {
        collisionDetection,
        collideCheckObject
      } = CollisionDetection.wrapped(canvas);
  
      const job = collisionDetection(collideCheckObject);
  
      job.done = (isCollided) => {
  
        // then
        expect(isCollided).to.be.true;
      
      };
  
    });

  });

});
