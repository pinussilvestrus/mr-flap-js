/* global Canvas, Footer */
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

  canvas.drawBird({
    src: './vendor/bird.png'
  });

};

const _init = function () {

  mrflap = $('.mrflap-playground');
  appendHeader();
  appendFooter();
  initCanvas();

};

document.addEventListener('DOMContentLoaded', function (event) {

  _init();

});
