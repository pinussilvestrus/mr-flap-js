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
 * initialize keyboard listeners
 */
function initKeyboardBindings () {

  const keyboard = new KeyboardHandler();

  // register listeners
  keyboard.register({
    keyCode: 'ArrowUp',
    fn: jumpShape
  });

  window.addEventListener('keydown', function (e) {

    keyboard.execute({
      keyCode: e.code
    });
  
  }, false);

};

function _init () {

  mrflap = $('.mrflap-playground');
  appendHeader();
  appendFooter();
  initCanvas();
  initKeyboardBindings();
  initGravity();

};

document.addEventListener('DOMContentLoaded', function (event) {

  _init();

});
