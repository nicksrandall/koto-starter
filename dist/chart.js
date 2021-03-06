var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('d3'), require('koto')) : typeof define === 'function' && define.amd ? define(['d3', 'koto'], factory) : global.chart = factory(global.d3, global.koto);
})(this, function (d3, koto) {
  'use strict';

  var configs = [{
    name: 'height',
    description: 'The height of the chart.',
    value: 500,
    type: 'number',
    units: 'px',
    category: 'Size',
    getter: function getter() {
      // get value
      console.log('getter');
      return this.value;
    },
    setter: function setter(newValue) {
      // Set something
      console.log('setter');
      return newValue;
    }
  }, {
    name: 'width',
    description: 'The widthj of the chart.',
    value: 800,
    units: 'px',
    type: 'number',
    category: 'Size'
  }];

  var BarChart = (function (_koto$Base) {
    function BarChart(selection) {
      _classCallCheck(this, BarChart);

      _get(Object.getPrototypeOf(BarChart.prototype), 'constructor', this).call(this, selection);

      // Setup
      var chart = this;

      // define configs
      configs.forEach(function (item) {
        chart.configs.set(item.name, item);
      });

      // Scales
      chart.x = d3.scale.linear().range([0, this.config('width')]);

      chart.y = d3.scale.linear().domain([0, 100]).rangeRound([0, this.config('height')]);

      // Layer
      chart.layer('bars', this.base.append('g'), {
        dataBind: function dataBind(data) {
          return this.selectAll('rect').data(data, function (d) {
            return d.time;
          });
        },
        insert: function insert() {
          return this.append('rect');
        }
      }).on('enter', function () {
        var length = this.data().length;
        this.attr('x', function (d, i) {
          return chart.x(i + 1) - 0.5;
        }).attr('y', function (d) {
          return chart.config('height') - chart.y(d.value) - 0.5;
        }).attr('width', chart.config('width') / length).style('fill', 'steelBlue').attr('height', function (d) {
          return chart.y(d.value);
        });
      }).on('enter:transition', function () {
        this.duration(1000).attr('x', function (d, i) {
          return chart.x(i) - 0.5;
        });
      }).on('update:transition', function () {
        this.duration(1000).attr('x', function (d, i) {
          return chart.x(i) - 0.5;
        });
      }).on('exit:transition', function () {
        this.duration(1000).attr('x', function (d, i) {
          return chart.x(i - 1) - 0.5;
        }).remove();
      });
    }

    _inherits(BarChart, _koto$Base);

    _createClass(BarChart, [{
      key: 'preDraw',

      //override methods
      value: function preDraw(data) {
        this.x.domain([0, data.length]);
      }
    }]);

    return BarChart;
  })(koto.Base);

  // Export
  koto.BarChart = BarChart;
  var chart = koto.BarChart;

  return chart;
});
//# sourceMappingURL=./chart.js.map