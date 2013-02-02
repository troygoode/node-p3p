# p3p

A node.js package for providing a connect/express middleware that enables P3P with various options.

[![build status](https://secure.travis-ci.org/TroyGoode/node-p3p.png)](http://travis-ci.org/TroyGoode/node-p3p)

## Installation (via [npm](https://npmjs.org/package/p3p))

```bash
$ npm install p3p
```

## Usage

### Simple Usage (Recommended P3P Settings)

```javascript
var express = require('express')
  , p3p = require('p3p')
  , app = express();

app.get('/', p3p(p3p.recommended), function(req, res, next){
  res.send('Rendered with a P3P privacy policy header!');
});

app.listen(80, function(){
  console.log('P3P-enabled web server listening on port 80');
});
```

### Advanced Usage (Custom P3P Settings)

```javascript
var express = require('express')
  , p3p = require('p3p')
  , p3pConfig = {
    access: 'nonident',
    purpose: {
      current: true,
      'individual-analysis': 'opt-in'
    }
  }
  , app = express();

app.get('/', p3p(p3pConfig), function(req, res, next){
  res.send('Rendered with a *CUSTOM* P3P privacy policy header!');
});

app.listen(80, function(){
  console.log('*CUSTOM* P3P-enabled web server listening on port 80');
});
```

## The Compact Specification

[http://compactprivacypolicy.org/compact_specification.htm](http://compactprivacypolicy.org/compact_specification.htm)

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)

## Author

[Troy Goode](https://github.com/TroyGoode) ([troygoode@gmail.com](mailto:troygoode@gmail.com))
