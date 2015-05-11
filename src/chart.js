import d3 from 'd3';
import koto from 'koto';
import configs from './configs';

/**
 * # A working Bar Chart
 *
 * To see this chart run `gulp serve` and then navigate to localhost:1337.
 * The js file that renders this chart is found `demo > js > main.js`
 */

class BarChart extends koto.Base {
	constructor(selection) {
		super(selection);

		// Setup
		var chart = this;

    // define configs
    configs.forEach(function (item) {
      chart.configs.set(item.name, item);
    });

		// Scales
		chart.x = d3.scale.linear()
			.range([0, this.config('width')]);

		chart.y = d3.scale.linear()
			.domain([0, 100])
			.rangeRound([0, this.config('height')]);

		// Layer
		chart.layer('bars', this.base.append('g'), {
			dataBind: function dataBind(data) {
				return this.selectAll('rect')
					.data(data, function(d) { return d.time; });
			},
			insert: function insert() {
				return this.append('rect');
			}
		})
		.on('enter', function() {
			var length = this.data().length;
			this.attr('x', function(d, i) { return chart.x(i + 1) - 0.5; })
				.attr('y', function(d) { return chart.config('height') - chart.y(d.value) - 0.5; })
				.attr('width', chart.config('width') / length)
				.style('fill', 'steelBlue')
				.attr('height', function(d) { return chart.y(d.value); });
		})
		.on('enter:transition', function() {
			this.duration(1000)
				.attr('x', function(d, i) { return chart.x(i) - 0.5; });
		})
		.on('update:transition', function() {
			this.duration(1000)
				.attr('x', function(d, i) { return chart.x(i) - 0.5; });
		})
		.on('exit:transition', function() {
			this.duration(1000)
				.attr('x', function(d, i) { return chart.x(i - 1) - 0.5; })
				.remove();
		});
	}

	//override methods
	preDraw(data) {
		this.x.domain([0, data.length]);
	}
}

// Export
koto.BarChart = BarChart;
export default koto.BarChart;
