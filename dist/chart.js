var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

(function (factory) {
	!(typeof exports === "object" && typeof module !== "undefined") && typeof define === "function" && define.amd ? define(factory) : factory();
})(function () {
	"use strict";

	/**
  * # A working Bar Chart
  *
  * To see this chart run `gulp connect` and then navigate to localhost:1337.
  * The js file that renders this chart is found `www > js > main.js`
  */
	koto.chart("BarChart", function (Chart) {
		return (function (Chart) {
			function Donut(selection) {
				_classCallCheck(this, Donut);

				_get(Object.getPrototypeOf(Donut.prototype), "constructor", this).call(this, selection);

				// Setup
				var chart = this;
				this.config("width", 800);
				this.config("height", 500);

				// Scales
				chart.x = d3.scale.linear().range([0, this.config("width")]);

				chart.y = d3.scale.linear().domain([0, 100]).rangeRound([0, this.config("height")]);

				// Layer
				chart.layer("bars", this.base.append("g"), {
					dataBind: function dataBind(data) {
						return this.selectAll("rect").data(data, function (d) {
							return d.time;
						});
					},
					insert: function insert() {
						return this.append("rect");
					}
				}).on("enter", function () {
					var length = this.data().length;
					this.attr("x", function (d, i) {
						return chart.x(i + 1) - 0.5;
					}).attr("y", function (d) {
						return chart.config("height") - chart.y(d.value) - 0.5;
					}).attr("width", chart.config("width") / length).style("fill", "steelBlue").attr("height", function (d) {
						return chart.y(d.value);
					});
				}).on("enter:transition", function () {
					this.duration(1000).attr("x", function (d, i) {
						return chart.x(i) - 0.5;
					});
				}).on("update:transition", function () {
					this.duration(1000).attr("x", function (d, i) {
						return chart.x(i) - 0.5;
					});
				}).on("exit:transition", function () {
					this.duration(1000).attr("x", function (d, i) {
						return chart.x(i - 1) - 0.5;
					}).remove();
				});
			}

			_inherits(Donut, Chart);

			_prototypeProperties(Donut, null, {
				preDraw: {
					//override methods

					value: function preDraw(data) {
						this.x.domain([0, data.length]);
					},
					writable: true,
					configurable: true
				}
			});

			return Donut;
		})(Chart);
	});
});
//# sourceMappingURL=./chart.js.map