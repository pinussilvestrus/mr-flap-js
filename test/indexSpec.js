/* global it, describe, define */
define(['../node_modules/chai/chai'], function (chai) {
  const expect = chai.expect;

  describe('Test suite', function () {
    it('should work', function () {
      expect(true).to.equal(true);
    });
  });
});
