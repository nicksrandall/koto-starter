import Chart from './chart.js';

// Add your chart to our the registry with your chart's unique name.
AutoWidgets.register('DomoBarChartDomo', function(container) {

  // Descripe Data
  var columns = [{
    name: 'Name',
    type: 'string',
    accessor: function (row) { return row.Name; },
    validation: function (row) { return String(this.accessor(row)); }
  }];
   
  // Descripe Available Configs
  var configs = [{
    name: 'barFill',
    description: 'Fill color for the bars.',
    type: 'color',
    category: 'colors'
  }];

  var events = [{
    name: 'mouseover:bars:external',
    description: 'this will fire when mouse hovers over bars'
  }, {
    name: 'highlight:bars:interal',
    description: 'this will highlight a specific bar'
  }];

  // Setup Sample Data
  var sampleData = [
    {Name: 'Jan', Value: 4},
    {Name: 'Feb', Value: 10},
    {Name: 'Mar', Value: 7},
    {Name: 'Apr', Value: 12}
  ];

  // get size of widget we want to render
  var bBox = container.select('[id^=chartBounds]')
    .node()
    .getBBox();

  // Transform our chart's container to fit where the user placed the wiget
  container.attr('transform', `translate(${bBox.x}, ${bBox.y})`);

  // Remove stuff I don't need
  container.selectAll('*').remove();

  // Create instance o widget
  var widget = new Chart(container);

  widget.config({
    height: bBox.height,
    width: bBox.width,
    chartName: 'Vertical',
    orientation: 'vertical',
    layout: 'single',
    hasSeriesData: false,
    yAxisAddGridlines: true
  });

  return {
    'widget': widget, // The fully configured widget.
    'columns': columns, //Data Column Names
    'data': sampleData, // sample data to render widget
    'configs': [configs], // All PUBLIC config options
    'events': events, // All PUBLIC events
    'filters': {}, // Optional
    
    // over-rides
    renderWithData: function (data) { this.draw(data); }, // this context is widget.
    prepareForArtboard: function () {}, // this context is widget.
  };
});