'use strict';

var _validate = function(specs, vals) {
  var spec, val;

  for(var i in specs) {
    if(!specs.hasOwnProperty(i)) { continue; }

    spec = specs[i];
    val = vals[i];

    if(typeof val === 'undefined') { return false; }

    if(spec instanceof RegExp) {
      if(!spec.test(val)) { return false; }

      continue;
    }

    if(spec instanceof Function) {
      if(!spec(val)) { return false; }

      continue;
    }

    if(spec !== val) { return false; }
  }

  return true;
};

module.exports = {
  create: function(def) {
    var _val = typeof def === 'function'
      ? def()
      : def;

    return Object.create({
      validate: _validate.bind(null, _val)
    });
  }
};