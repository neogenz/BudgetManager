(function init(exports) {

  function BaseClass() {
    if (this.initialize !== undefined && this.initialize !== null) {
      this.initialize.apply(this, arguments);
    }
    // var _currentPrototype = null,
    // _prototypesChain = [],
    // _prototypesChainLength = 0;
    //
    // _currentPrototype = Object.getPrototypeOf(this);
    // while(_currentPrototype.initialize !== undefined && _currentPrototype.initialize !== null){
    //     _prototypesChain.push(_currentPrototype);
    //     _currentPrototype = Object.getPrototypeOf(_currentPrototype);
    // }
    // _prototypesChainLength = _prototypesChain.length;
    //
    // for(var i = _prototypesChainLength; i > 0; i--){
    //     _prototypesChain[i-1].initialize.apply(this, arguments);
    // }
  };

  BaseClass.extend = function (childPrototype) {
    var _superConstructor = this;
    var _childConstructor = function () {
      _superConstructor.apply(this, arguments);
    };

    _childConstructor.extend = _superConstructor.extend;

    _childConstructor.prototype = Object.create(_superConstructor.prototype, {
      constructor: {value: _childConstructor, writable: true, enumerable: false}
    });

    for (var key in childPrototype) {
      _childConstructor.prototype[key] = childPrototype[key];
    }

    return _childConstructor;
  };

  exports.BaseClass = BaseClass;
})(neogenz);
