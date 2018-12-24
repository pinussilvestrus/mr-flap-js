/* global Canvas, Footer, KeyboardHandler */
var mrflap;

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

  const canvas = new Canvas({
    mrflapDiv: mrflap
  });

  canvas.drawBird();

};

/**
 * initialize keyboard listeners
 */
const initKeyboardBindings = function () {

  const keyboard = new KeyboardHandler();

  // register listeners
  keyboard.register({
    keyCode: 'KeyJ',
    fn: function () {

      alert('Implement me!');
    
    }
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
