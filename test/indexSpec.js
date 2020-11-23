/* global it, describe, expect, __html__ */
/* eslint-disable no-unused-expressions */

describe('Demo index page', function () {

  const _initPlayground = function () {

    $('body').append('<div class="mrflap-playground"></div>');
  
  };

  it('should expose the templates to __html__', function () {

    // given
    document.body.innerHTML = __html__['test.html'];

    _initPlayground;

    // when
    const playground = $('.mrflap-playground');

    // then
    expect(playground).not.to.be.undefined;
  
  });
  
});
