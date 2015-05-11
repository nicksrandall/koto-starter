var configs = [{
  name: 'height',
  description: 'The height of the chart.',
  value: 500,
  type: 'number',
  units: 'px',
  category: 'Size',
  getter: function (){
    // get value
    console.log('getter');
    return this.value;
  },
  setter: function (newValue){
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

export default configs;
