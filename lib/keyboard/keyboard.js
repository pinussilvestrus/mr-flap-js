/**
 * basic keyboard handling component
 * stores listener for keyboard events
 */
function KeyboardHandler (constructor) {

  this.listeners = {};

}

/**
 * registers new listener for given keycode
 * @param keyCode {String} https://developer.mozilla.org/de/docs/Web/API/KeyboardEvent/keyCode
 * @param fn {Function}
 */
KeyboardHandler.prototype.register = function (options) {

  const {
    keyCode,
    fn
  } = options;

  this.listeners[keyCode] = fn;

};

/**
 * executes registered function with given arguments
 * @param keyCode {String}
 * @param args {Object}
 */
KeyboardHandler.prototype.execute = function (options) {

  const {
    keyCode,
    args
  } = options;

  var callback = this.listeners[keyCode];

  if (typeof callback === 'function') {

    return callback(args);
  
  }

};
