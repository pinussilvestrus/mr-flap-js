/* global Canvas, Footer, KeyboardHandler, CollisionDetection */
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

  mrflap.append(`<h2 class="mrflap-header">mr-flap-js</h2>`);

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

    // execute collision detection inside web worker
    const {
      collisionDetection,
      collideCheckObject
    } = CollisionDetection.wrapped(canvas);

    const job = collisionDetection(collideCheckObject);

    job.done = (isCollided) => {

      if (isCollided) {

        canvas.onClear();
      
      }
    
    };

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
