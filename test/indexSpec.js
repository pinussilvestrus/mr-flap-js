/* global it, describe, expect, __html__ */
/* eslint-disable no-unused-expressions */

describe('Demo index page', function () {

  it('should expose the templates to __html__', function () {

    document.body.innerHTML = __html__['index.html'];
    expect(document.getElementsByClassName('mrflap-playground')).to.not.be.undefined;
  
  });
  
});
