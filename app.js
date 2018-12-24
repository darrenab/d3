// @TODO: YOUR CODE HERE!
var svgW = 900;
var svgH = 500;

var margin = {
  top: 30,
  right: 40,
  bottom: 80,
  left: 120
};

var width = svgW - margin.left - margin.right;
var height = svgH - margin.top - margin.bottom;


var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgW)
  .attr("height", svgH);




var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(data) {
  console.log(data);
  data.noHealthInsurance = +data.noHealthInsurance;
  data.income = +data.incomeMoe;
  
    
  // });
      
// defining the chart axes
    var xScale = d3.scaleLinear()
    .domain([0,28])
    .range([0, width]);

    var yScale = d3.scaleLinear()
    .domain([35000, 80000])
    .range([height, 0]);

    
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // adding axes to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);

      // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.healthcare))
    .attr("cy", d => yScale(d.income))
    .attr("r", "15")
    .attr("class","stateCircle" );

    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Healthcare: ${d.healthcare}<br>Avg Income: ${d.income}`);
      });

    chartGroup.call(toolTip);


    chartGroup.selectAll() 
      .data(data)
      .enter()
      .append('text')
      .attr("x", d => xScale(d.healthcare))
      .attr("y", d => yScale(d.income)+7.5)
      .attr("class","stateText")
      .text(function(d)
      {return d.abbr}
      );
      

      // Create axes labels
      chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 1.5))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Avg State HH Income");     


    chartGroup.append("text")
      .attr("transform", `translate(${width / 3}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("% of State Pop Lacking Healthcare");



}
);