/* global it, describe, expect, before,  __html__, Footer */
/* eslint-disable no-unused-expressions */
describe('Footer', function () {

  var flatIcons = [{
    href: 'https://www.foo.bar',
    title: 'Foo'
      
  }];
  
  var mrflapDiv;

  before(function () {

    document.body.innerHTML = __html__['index.html'];
    mrflapDiv = $('.mrflap-playground');
  
  });

  it('#constructor', function () {
  
    // given
    var footer = new Footer({
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
    var footer = new Footer({
      flatIcons: flatIcons,
      mrflapDiv: mrflapDiv
    });

    // when
    footer.initCredits();

    // then
    expect($('.mrflap-footer')[0]).to.exist;
  
  });
    
});
