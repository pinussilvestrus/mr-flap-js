/* global Canvas, Footer, KeyboardHandler */
var mrflap, canvas, bird;

const appendFooter = function () {

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
const appendHeader = function () {

  mrflap.append(`<h2 class="mrflap-header">mr-flap-js</h2>`);

};

/**
 * initialize canvas playground
 */
const initCanvas = function () {

  canvas = new Canvas({
    mrflapDiv: mrflap
  });

  bird = canvas.drawBird();

};

/**
 * triggers bird jumping
 */
const jumpShape = function () {

  if (bird) {

    bird.moveUp({
      speed: 10
    });
  
  }

};

/**
 * initialize keyboard listeners
 */
const initKeyboardBindings = function () {

  const keyboard = new KeyboardHandler();

  // register listeners
  keyboard.register({
    keyCode: 'KeyJ',
    fn: jumpShape
  });

  window.addEventListener('keydown', function (e) {

    keyboard.execute({
      keyCode: e.code
    });
  
  }, false);

};

const _init = function () {

  mrflap = $('.mrflap-playground');
  appendHeader();
  appendFooter();
  initCanvas();
  initKeyboardBindings();

};

document.addEventListener('DOMContentLoaded', function (event) {

  _init();

});
