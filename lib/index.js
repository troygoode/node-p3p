var _ = require('underscore'),
    mappings = require('./mappings'),
    recommended = require('./recommended'),
    creqs = mappings.creqs;

module.exports = function(options){
  return function(req, res, next){
    var values = [],
        parseMultiple = function(options, mapping){
          if(options && typeof(options) === 'string'){
            var short = mapping[options];
            values.push(short || options);
          }else if(options){
            for(var key in options){
              var value = options[key],
                  creq = creqs[value] ? creqs[value] : value,
                  short = mapping[key] || key;
              values.push(short + (creq === true ? '' : creq));
            }
          }
        },
        parseBoolean = function(options, value){
          if(options && options === true){
            values.push(value);
          }
        };

    // P3P access
    parseMultiple(options.access, mappings.accesses);

    // P3P disputes
    parseBoolean(options.disputes, 'DIS');

    // P3P remedies
    parseMultiple(options.remedies, mappings.remedies);

    // P3P disputes
    parseBoolean(options['non-identifiable'], 'NID');

    // P3P purpose
    parseMultiple(options.purpose, mappings.purposes);

    // P3P recipient
    parseMultiple(options.recipient, mappings.recipients);

    // P3P retention
    parseMultiple(options.retention, mappings.retentions);

    // P3P retention
    parseMultiple(options.categories, mappings.categories);

    // P3P disputes
    parseBoolean(options.test, 'TST');

    if(options.full && values.length){
      res.header('P3P', 'policyref="' + options.full + '", CP="' + values.join(' ') + '"');
    }else if(options.full){
      res.header('P3P', 'policyref="' + options.full + '"');
    }else if(values.length){
      res.header('P3P', 'CP="' + values.join(' ') + '"');
    }

    next();
  };
};

module.exports.mappings = mappings;
module.exports.recommended = recommended;
