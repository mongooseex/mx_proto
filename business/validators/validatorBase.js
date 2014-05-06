'use strict';

var _getType = function(obj) {
  var types = {'RegExp': RegExp, 'Function': Function, 'String': Object };
  for(var i in types) {
      if(!types.hasOwnProperty(i)) { continue; }
      if(typeof obj === types[i] || obj instanceof types[i]) { return i; }
  }
    
  return typeof {};
};

var _validate = function(vals) {
  var val = ''
    , pass = true;

  for(var i in vals) {
    if(!vals.hasOwnProperty(i)) { continue; }

    val = vals[i];

    if(this[i].test) {
      pass = this[i].test(val);
    }
    else if() {

    }
  }
};

module.exports = {
  create: function(def) {
    var _val = typeof def === 'function'
      ? def()
      : def;

    return Object.create({
      validate: _validate.bind(_val)
    });
  }
};