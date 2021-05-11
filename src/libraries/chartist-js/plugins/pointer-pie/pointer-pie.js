function ctDonutMarks(options) {
  return function ctDonutMarksPlugin(chart) {
    var defaultOptions = {
      marks: [],
      offset: 10,
      lineAttributes: {
        stroke: '#1f1f1f',
        'stroke-width': '5px',
        'stroke-linecap': 'round'
      }
    };

    options = Chartist.extend({}, defaultOptions, options);

    if(chart instanceof Chartist.Pie && chart.options.donut) {

      chart.on('created', function(context) {
        if (context.options.donut) {
          var radius = 
            Math.min(context.chartRect.width() / 2, 
                     context.chartRect.height() / 2) - 
              context.options.donutWidth / 2;
    
          var center = {
            x: context.chartRect.x1 + context.chartRect.width() / 2,
            y: context.chartRect.y2 + context.chartRect.height() / 2
          };
          
          var data = Chartist.getDataArray(chart.data);
    
          var totalDataSum = context.options.total || data.reduce(function(total, value) {
            return total + value;
          }, 0);
          
          options.marks.forEach(function(mark) {
            var angle = context.options.startAngle + mark / totalDataSum * 360;
            var position = Chartist.polarToCartesian(center.x, center.y, radius, angle);
            var offset = context.options.donutWidth / 2 + options.offset;
            var p1 = Chartist.polarToCartesian(position.x, position.y, offset, angle);
            var p2 = Chartist.polarToCartesian(position.x, position.y, offset, angle - 180);
            context.svg.append(new Chartist.Svg('line', Chartist.extend({
              x1: p1.x,
              y1: p1.y,
              x2: p2.x,
              y2: p2.y,
              stroke: 'black'
            }, options.lineAttributes)));
          });
        }
      });
    }
  };
}