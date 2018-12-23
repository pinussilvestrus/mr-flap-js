/* global it, describe, expect, Footer */
/* eslint-disable no-unused-expressions */
describe('Footer', function () {

  it('should create new Footer', function () {

    var flatIcons = [{
      href: 'https://www.foo.bar',
      title: 'Foo'
    
    }];
  
    var footer = new Footer({
      flatIcons: flatIcons,
      mrflapDiv: null
    });

    expect(footer).to.not.be.undefined;
    expect(footer.flatIcons).to.equal(flatIcons);
      
  });
    
});
