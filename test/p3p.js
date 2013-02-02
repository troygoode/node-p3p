var should = require('should'),
    p3p = require('../lib'),
    fakeResponse = function(){
      this._headers = {};
      this.header = function(key, val){
        this._headers[key] = val;
      };
    };

describe('p3p', function(){
  it('support ref to full policy', function(done){
    // arrange
    var res = new fakeResponse(),
        next = function(){
          // assert
          res._headers.P3P.should.equal('policyref="/w3c/p3p.xml"');
          done();
        },
        config = {
          full: '/w3c/p3p.xml'
        };

    // act
    p3p(config)(null, res, next);
  });

  it('support ref to full policy and compact policy', function(done){
    // arrange
    var res = new fakeResponse(),
        next = function(){
          // assert
          res._headers.P3P.should.equal('policyref="/w3c/p3p.xml", CP="foo"');
          done();
        },
        config = {
          full: '/w3c/p3p.xml',
          purpose: {
            foo: true
          }
        };

    // act
    p3p(config)(null, res, next);
  });

  it('purpose.foo adds foo', function(done){
    // arrange
    var res = new fakeResponse(),
        next = function(){
          // assert
          res._headers.P3P.should.equal('CP="foo"');
          done();
        },
        config = {
          purpose: {
            foo: true
          }
        };

    // act
    p3p(config)(null, res, next);
  });

  describe('access', function(){
    it('nonident (hash)', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            res._headers.P3P.should.equal('CP="NOI"');
            done();
          },
          config = {
            access: {
              nonident: true
            }
          };

      // act
      p3p(config)(null, res, next);
    });
  });

  describe('disputes', function(){
    it('present when true', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            res._headers.P3P.should.equal('CP="DIS"');
            done();
          },
          config = {
            disputes: true
          };

      // act
      p3p(config)(null, res, next);
    });

    it('not present otherwise', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            should.not.exist(res._headers.P3P);
            done();
          },
          config = {
          };

      // act
      p3p(config)(null, res, next);
    });
  });

  describe('remedies', function(){
    it('correct (string)', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            res._headers.P3P.should.equal('CP="COR"');
            done();
          },
          config = {
            remedies: 'correct'
          };

      // act
      p3p(config)(null, res, next);
    });
  });

  describe('non-identifiable', function(){
    it('present when true', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            res._headers.P3P.should.equal('CP="NID"');
            done();
          },
          config = {
            'non-identifiable': true
          };

      // act
      p3p(config)(null, res, next);
    });

    it('not present otherwise', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            should.not.exist(res._headers.P3P);
            done();
          },
          config = {
          };

      // act
      p3p(config)(null, res, next);
    });
  });

  describe('purpose', function(){
    it('current (hash)', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            res._headers.P3P.should.equal('CP="CUR"');
            done();
          },
          config = {
            purpose: {
              current: true
            }
          };

      // act
      p3p(config)(null, res, next);
    });

    it('current (string)', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            res._headers.P3P.should.equal('CP="CUR"');
            done();
          },
          config = {
            purpose: 'current'
          };

      // act
      p3p(config)(null, res, next);
    });

    it('current + admin', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            res._headers.P3P.should.equal('CP="CUR ADM"');
            done();
          },
          config = {
            purpose: {
              current: true,
              admin: true
            }
          };

      // act
      p3p(config)(null, res, next);
    });
  });

  describe('recipient', function(){
    it('ours (hash)', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            res._headers.P3P.should.equal('CP="OUR"');
            done();
          },
          config = {
            recipient: {
              ours: true
            }
          };

      // act
      p3p(config)(null, res, next);
    });
  });

  describe('retention', function(){
    it('no-retention (hash)', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            res._headers.P3P.should.equal('CP="NOR"');
            done();
          },
          config = {
            retention: {
              'no-retention': true
            }
          };

      // act
      p3p(config)(null, res, next);
    });
  });

  describe('categories', function(){
    it('physical (hash)', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            res._headers.P3P.should.equal('CP="PHY"');
            done();
          },
          config = {
            categories: {
              physical: true
            }
          };

      // act
      p3p(config)(null, res, next);
    });
  });

  describe('test', function(){
    it('present when true', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            res._headers.P3P.should.equal('CP="TST"');
            done();
          },
          config = {
            test: true
          };

      // act
      p3p(config)(null, res, next);
    });

    it('not present otherwise', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            should.not.exist(res._headers.P3P);
            done();
          },
          config = {
          };

      // act
      p3p(config)(null, res, next);
    });
  });

  describe('creq', function(){
    it('tailoring:true has no creq', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            res._headers.P3P.should.equal('CP="TAI"');
            done();
          },
          config = {
            purpose: {
              tailoring: true
            }
          };

      // act
      p3p(config)(null, res, next);
    });

    it('tailoring:always is TAIa', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            res._headers.P3P.should.equal('CP="TAIa"');
            done();
          },
          config = {
            purpose: {
              tailoring: 'always'
            }
          };

      // act
      p3p(config)(null, res, next);
    });

    it('tailoring:opt-in is TAIi', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            res._headers.P3P.should.equal('CP="TAIi"');
            done();
          },
          config = {
            purpose: {
              tailoring: 'opt-in'
            }
          };

      // act
      p3p(config)(null, res, next);
    });

    it('tailoring:opt-out is TAIo', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            res._headers.P3P.should.equal('CP="TAIo"');
            done();
          },
          config = {
            purpose: {
              tailoring: 'opt-out'
            }
          };

      // act
      p3p(config)(null, res, next);
    });

    it('tailoring:foo is TAIfoo', function(done){
      // arrange
      var res = new fakeResponse(),
          next = function(){
            // assert
            res._headers.P3P.should.equal('CP="TAIfoo"');
            done();
          },
          config = {
            purpose: {
              tailoring: 'foo'
            }
          };

      // act
      p3p(config)(null, res, next);
    });
  });
});
