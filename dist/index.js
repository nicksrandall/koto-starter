var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

(function () {
  var TestClass = (function () {
    function TestClass(name) {
      _classCallCheck(this, TestClass);

      this.name = name;
    }

    _prototypeProperties(TestClass, null, {
      sayName: {
        value: function sayName() {
          console.log(this.name);
        },
        writable: true,
        configurable: true
      }
    });

    return TestClass;
  })();

  var test = new TestClass("test");
  test.sayName();
})();