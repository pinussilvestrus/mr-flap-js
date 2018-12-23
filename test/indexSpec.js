/* global it, describe, expect, __html__ */
/* eslint-disable no-unused-expressions */

describe('Demo index page', function () {

  it('should expose the templates to __html__', function () {

    // given
    document.body.innerHTML = __html__['index.html'];

    // when
    var playground = $('.mrflap-playground');

    // then
    expect(playground).not.to.be.undefined;
  
  });
  
});
