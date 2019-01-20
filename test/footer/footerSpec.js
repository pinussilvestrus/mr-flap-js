/* global it, describe, expect, before,  __html__, Footer */
/* eslint-disable no-unused-expressions */
describe('Footer', function () {

  const flatIcons = [{
    href: 'https://www.foo.bar',
    title: 'Foo'
      
  }];

  const _initPlayground = function () {

    $('body').append('<div class="mrflap-playground"></div>');

  };
  
  let mrflapDiv;

  before(function () {

    document.body.innerHTML = __html__['test.html'];
    _initPlayground();
    mrflapDiv = $('.mrflap-playground');
  
  });

  it('#constructor', function () {
  
    // given
    const footer = new Footer({
      flatIcons: flatIcons,
      mrflapDiv: mrflapDiv
    });

    // then
    expect(footer).to.not.be.undefined;
    expect(footer.flatIcons).to.equal(flatIcons);
    expect(footer.mrflapDiv).to.equal(mrflapDiv);
      
  });

  it('#initCredits', function () {

    // given
    const footer = new Footer({
      flatIcons: flatIcons,
      mrflapDiv: mrflapDiv
    });

    // when
    footer.initCredits();

    // then
    expect($('.mrflap-footer')[0]).to.exist;
  
  });
    
});
