 var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 510 - margin.top - margin.bottom;
    var barPadding = 1;
    var padding = 30;

function getData(data) {
    $('#chart').empty();

    var yScale = d3.scale.linear()
        .domain([0, d3.max(data) *1.25])
        .range([height - padding, padding]);
    
    var xScale = d3.scale.linear()
        .domain([0, data.length])
        .range([padding, width - padding * 2]);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");
                 
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");


    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("y", function(d) {
            return yScale(d);
        })
        .attr("width", (((width - 2 * padding) / data.length)  - barPadding))
        .attr("height", function(d) { 
            return (height - padding) - yScale(d);
        });

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);

    svg.append("text")
        .attr("class", "label")
        .attr("text-anchor", "end")
        .attr("x", 50)
        .attr("y", 6)
        .attr("dy", ".75em")
        .text("time (sec)");

    svg.append("text")
        .attr("class", "label")
        .attr("text-anchor", "end")
        .attr("x", 900)
        .attr("y", 430)
        .attr("dy", ".75em")
        .text("location (from left)"); 
}

function mapError(msg) {
    alert(msg);
}

