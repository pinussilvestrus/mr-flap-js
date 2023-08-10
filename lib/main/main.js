/* global Canvas, Footer, KeyboardHandler */
let mrflap, canvas, bird;

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

  mrflap.append('<h2 class="mrflap-header">mr-flap-js</h2>');

};

/**
 * initialize canvas playground
 */
function initCanvas () {

  canvas = new Canvas({
    mrflapDiv: mrflap,
    onClear: _reset
  });

  bird = canvas.drawBird();

};

/**
 * creates gravity feeling by taking bird back to ground
 */
function initGravity () {

  setInterval(() => {

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
  canvas.drawObstacle({
    heightBottom: 50
  });

  setInterval(() => {

    const height = Math.floor((Math.random() * 50) + 25);
    canvas.drawObstacle({
      heightBottom: height
    });
    
  }, 1500);

  // move obstacles
  setInterval(() => {

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

  window.addEventListener('keydown', e => {

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

function _reset () {

  canvas.reset();
  initCanvas();

}

document.addEventListener('DOMContentLoaded', event => {

  _init();

});

const observer = new MutationObserver(function (mutationsList) {

  mutationsList.forEach(function (mutation) {

    mutation.addedNodes.forEach(function (addedNode) {

      if (addedNode.querySelectorAll('.mrflap-playground').length) {

        _init();
      
      }
    
    });
  
  });

});

observer.observe(document.body, { subtree: true, childList: true });
