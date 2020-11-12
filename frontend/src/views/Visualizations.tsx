import React from "react";
import Image from "react-bootstrap/Image";
import Navbar from "./components/OurNavbar";
import "./Visualizations.css";
import catf_img from "../assets/CATF.png";
import crfn_img from "../assets/cfrn-min.png";
import climate from "../assets/fightClimate.png";
import d3 from "d3";
import BarChart from "./BarChart"


// // set the dimensions and margins of the graph
// var margin = {top: 10, right: 100, bottom: 30, left: 30},
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#my_dataviz")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");

// //Read the data
// d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_connectedscatter.csv", function(data) {

//     // List of groups (here I have one group per column)
//     var allGroup = ["valueA", "valueB", "valueC"]

//     // add the options to the button
//     d3.select("#selectButton")
//       .selectAll('myOptions')
//      	.data(allGroup)
//       .enter()
//     	.append('option')
//       .text(function (d) { return d; }) // text showed in the menu
//       .attr("value", function (d) { return d; }) // corresponding value returned by the button

//     // Add X axis --> it is a date format
//     var x = d3.scaleLinear()
//       .domain([0,10])
//       .range([ 0, width ]);
//     svg.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x));

//     // Add Y axis
//     var y = d3.scaleLinear()
//       .domain( [0,20])
//       .range([ height, 0 ]);
//     svg.append("g")
//       .call(d3.axisLeft(y));

//     // Initialize line with group a
//     var line = svg
//       .append('g')
//       .append("path")
//         .datum(data)
//         .attr("d", d3.line()
//           .x(function(d) { return x(+d.time) })
//           .y(function(d) { return y(+d.valueA) })
//         )
//         .attr("stroke", "black")
//         .style("stroke-width", 4)
//         .style("fill", "none")

//     // Initialize dots with group a
//     var dot = svg
//       .selectAll('circle')
//       .data(data)
//       .enter()
//       .append('circle')
//         .attr("cx", function(d) { return x(+d.time) })
//         .attr("cy", function(d) { return y(+d.valueA) })
//         .attr("r", 7)
//         .style("fill", "#69b3a2")


//     // A function that update the chart
//     function update(selectedGroup) {

//       // Create new data with the selection?
//       var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })

//       // Give these new data to update line
//       line
//           .datum(dataFilter)
//           .transition()
//           .duration(1000)
//           .attr("d", d3.line()
//             .x(function(d) { return x(+d.time) })
//             .y(function(d) { return y(+d.value) })
//           )
//       dot
//         .data(dataFilter)
//         .transition()
//         .duration(1000)
//           .attr("cx", function(d) { return x(+d.time) })
//           .attr("cy", function(d) { return y(+d.value) })
//     }

//     // When the button is changed, run the updateChart function
//     d3.select("#selectButton").on("change", function(d) {
//         // recover the option that has been chosen
//         var selectedOption = d3.select(this).property("value")
//         // run the updateChart function with this selected option
//         update(selectedOption)
//     })

// });

/* page for Helpful Links */
function Visuals() {
  return (
    <div className="Visuals">
      <Navbar />
      <h1>Visualizations</h1>
      <div className="Visuals-header">
        <Image src={climate} fluid />
        <div className="Visuals-body">
          <BarChart data={[5,10,1,3]} size={[500,500]} />
          <br />
          <div className="row">
            <div className="p_Visuals">
              <a href="https://www.rainforestcoalition.org/">
                <Image src={crfn_img} />
                <br/>
                Coalition for Rainforest Nations
              </a>

              <br />
              
              <i>
                "The Coalition for Rainforest Nations (CfRN or the ‘Coalition)
                 assists tropical governments, communities and peoples 
                 responsibly manage their rainforests. Healthy rainforests 
                 protect against a changing climate, generate needed 
                 biodiversity and provide safe habitats."
              </i>
            </div>
          </div>

          <br/>

          <div className="row">
            <div className="p_Visuals">
              <a href="https://www.catf.us/">
                <Image src={catf_img} />
                <br />
                Clean Air Task Force
              </a>
              <br />
              <i>"Our task is to reduce climate change by applying an 
                overwhelming amount of force to some of the biggest levers to 
                reduce carbon and other climate warming emissions.
              <br />
              Through technology innovation, policy change, and thought 
              leadership, the Clean Air Task Force drives impact to prevent 
              catastrophic climate change through realistic solutions."</i>
            </div>
            <br />
          </div>

          <br />
        </div>
      </div>
    </div>
  );
}

export default Visuals;