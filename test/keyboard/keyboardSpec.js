/* global it, describe, expect, KeyboardHandler */
/* eslint-disable no-unused-expressions */
describe('KeyboardHandler', function () {
    
  it('#constructor', function () {
        
    // given
    const keyboard = new KeyboardHandler();
      
    // then
    expect(keyboard).not.to.be.undefined;
    expect(Object.keys(keyboard.listeners).length).to.equal(0);
            
  });
    
  it('#register', function () {
  
    // given
    const keyboard = new KeyboardHandler();

    const keyCode = 'Enter';

    // when
    keyboard.register({
      keyCode: keyCode,
      fn: function () {

        return 'foo';
      
      }
    });
      
    // then
    expect(keyboard).not.to.be.undefined;
    expect(keyboard.listeners[keyCode]).to.exist;
    expect(Object.keys(keyboard.listeners).length).to.equal(1);
    
  });

  it('#execute', function () {
  
    // given
    const keyboard = new KeyboardHandler();

    const keyCode = 'Enter';
    keyboard.register({
      keyCode: keyCode,
      fn: function () {
  
        return 'foo';
        
      }
    });

    // when
    const result = keyboard.execute({
      keyCode: keyCode
    });
      
    // then
    expect(result).to.equal('foo');

  });
          
});
