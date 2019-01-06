/* global Canvas, Footer, KeyboardHandler */
var mrflap, canvas, bird;

function appendFooter () {

  const footer = new Footer({
    flatIcons: [
      {
        href: 'https://www.flaticon.com/authors/pixel-buddha',
        title: 'Pixel Buddha'
      }
    ],
    mrflapDiv: mrflap
  });

  footer.initCredits();

};

/**
 * creates application headline
 */
function appendHeader () {

  mrflap.append(`<h2 class="mrflap-header">mr-flap-js</h2>`);

};

/**
 * initialize canvas playground
 */
function initCanvas () {

  canvas = new Canvas({
    mrflapDiv: mrflap
  });

  bird = canvas.drawBird();

};

/**
 * creates gravitiy feeling by taking bird back to ground
 */
function initGravity () {

  setInterval(function () {

    bird.moveDown({
      speed: 2
    });

  }, 1000 / 30);

};

/**
 * triggers bird jumping
 */
function jumpShape () {

  if (bird) {

    bird.moveUp({
      speed: 20
    });

  }

};

/**
 * timer tick for handling obstacles
 */
function spawnObstacles () {

  // spawn 4 obstacles in the beginning
  canvas.drawObstacle();
  setInterval(function () {

    // todo(pinussilvestrus): update this to canvas.obstacles if refactored (#36)
    if ((canvas.shapes || []).length < 8) {

      canvas.drawObstacle();
    
    }
  
    // todo(pinussilvestrus): make it variable/ random
  
  }, 800);

  // move obstacles
  setInterval(function () {

    canvas.moveObstacles();
    canvas.collisionDetection();

  }, 1000 / 30);

}

/**
 * initialize keyboard listeners
 */
function initKeyboardBindings () {

  const keyboard = new KeyboardHandler();

  // register listeners

  // ↑
  keyboard.register({
    keyCode: 'ArrowUp',
    fn: jumpShape
  });

  // Space
  keyboard.register({
    keyCode: 'Space',
    fn: jumpShape
  });

  window.addEventListener('keydown', function (e) {

    keyboard.execute({
      keyCode: e.code
    });

  }, false);

};

function _init () {

  if ($('.mrflap-playground').length) {

    mrflap = $('.mrflap-playground');
    appendHeader();
    appendFooter();
    initCanvas();
    initKeyboardBindings();
    initGravity();
    spawnObstacles();
  
  }

};

document.addEventListener('DOMContentLoaded', function (event) {

  _init();

});
