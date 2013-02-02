var should = require('should'),
    p3p = require('../lib'),
    fakeResponse = function(){
      this._headers = {};
      this.header = function(key, val){
        this._headers[key] = val;
      };
    };

describe('when using the recommended settings', function(){
  it('should add the correct response header', function(done){
    // arrange
    var res = new fakeResponse(),
        next = function(){
          // assert
          res._headers.P3P.should.equal('CP="NOI ADM DEV PSAi OUR OTRo STP IND COM NAV DEM"');
          done();
        };

    // act
    p3p(p3p.recommended)(null, res, next);
  });
});
