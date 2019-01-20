/**
 * basic keyboard handling component
 * stores listener for keyboard events
 */
class KeyboardHandler {

  constructor () {

    this.listeners = {};

  }

  /**
   * registers new listener for given keycode
   * @param keyCode {String} https://developer.mozilla.org/de/docs/Web/API/KeyboardEvent/keyCode
   * @param fn {Function}
   */
  register (options) {

    const {
      keyCode,
      fn
    } = options;

    this.listeners[keyCode] = fn;

  }

  /**
   * executes registered function with given arguments
   * @param keyCode {String}
   * @param args {Object}
   */
  execute (options) {

    const {
      keyCode,
      args
    } = options;

    const callback = this.listeners[keyCode];

    if (typeof callback === 'function') {

      return callback(args);
    
    }

  }

}
