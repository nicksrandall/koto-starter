var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

(function (factory) {
  !(typeof exports === "object" && typeof module !== "undefined") && typeof define === "function" && define.amd ? define(factory) : factory();
})(function () {
  "use strict";

  koto.chart("Name", function (Chart) {
    // make sure to change the name!

    var Name = (function (Chart) {
      function Name(selection) {
        _classCallCheck(this, Name);

        _get(Object.getPrototypeOf(Name.prototype), "constructor", this).call(this, selection);

        // Setup Default Options
        this.config("width", 500);
        this.config("height", 500);

        this.accessor("value", function (line) {
          return line[2];
        });

        // Initialize Chart Helpers (Scales, Layouts, Ect)
        this.xScale = d3.scale.linear();

        // Setup Layers
        this.layer("bars", this.base.append("g"), {
          dataBind: function dataBind(data) {
            return this.selectAll(".selection").data(data);
          },
          insert: function insert() {
            return this;
          }
        }).on("enter", function onEnter() {
          return this;
        }).on("update:transition", function onTrans() {
          return this;
        }).on("exit", function onExitTrans() {
          return this;
        });
      }

      _inherits(Name, Chart);

      _prototypeProperties(Name, null, {
        preDraw: {

          // add/override chart methods

          value: function preDraw(data) {
            this.xScale.domain(d3.extent(data, (function (item) {
              return this.accessor("value")(item);
            }).bind(this))).range([0, this.config("width")]);
          },
          writable: true,
          configurable: true
        }
      });

      return Name;
    })(Chart);

    return Name;
  });
});
//# sourceMappingURL=./chart.js.map