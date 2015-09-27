
  var m = [50,50,50,50]; 
  var w = 450 ; 
  var h = 150; 
  
  var data=[1,5,3,15,6,10,17];
  
    function formatCurrency (d){
    return d; 
  }

  var xLabels = d3.time.scale().domain([new Date(2015, 0, 1), new Date(2015, 05, 31)]).range([0, 250]);
  var x = d3.scale.linear().domain([0, data.length]).range([0, 250]);
  var y = d3.scale.linear().domain([0, 25]).range([100, 0]);

  var line = d3.svg.line()
    .x(function(d,i) { 
      
      return x(i); 
    })
    .y(function(d) { 
      
      return y(d); 
    })
 

    
  var graph = d3.select("#monthChart").append("svg:svg")
        .attr("width", w)
        .attr("height", h + 100)
		.attr("style","display:block;margin-left : -70px;")		
        .append("svg:g")
        .attr("transform", "translate(" + 100 + "," + 0 + ")");
		

        

  var xAxis = d3.svg.axis().scale(xLabels).ticks(d3.time.months,1).tickFormat(d3.time.format("%b")).tickSize(-h).tickSubdivide(true);
  graph.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);

 
   
    graph.append("svg:path")
      .transition()
      .duration(2000)
      .attrTween('d', getSmoothInterpolation)
      .attr('class', 'line');

     
      

function getSmoothInterpolation() {
  var interpolate = d3.scale.linear()
      .domain([0, 1])
      .range([1, data.length + 1]);

  return function(t) {
      var flooredX = Math.floor(interpolate(t));
      var interpolatedLine = data.slice(0, flooredX);
          
      if(flooredX > 0 && flooredX < data.length) {
          var weight = interpolate(t) - flooredX;
          var weightedLineAverage = data[flooredX].y * weight + data[flooredX-1].y * (1-weight);
          interpolatedLine.push( {"x":interpolate(t)-1, "y":weightedLineAverage} );
          }
  
      return line(interpolatedLine);
      }
  }
      
  