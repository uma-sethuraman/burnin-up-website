import React, {Component} from 'react';
import '../../App.css';
import * as d3 from 'd3';

class BarChart extends Component {
    constructor(props){
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
    }

    componentDidMount(){
        this.createBarChart();
    }

    componentDidUpdate(){
        this.createBarChart();
    }

    createBarChart(){
		
        const margin = { top: 100, right: 20, bottom: 150, left: 110};
        const height = 600 - margin.top - margin.bottom;
        const width = 1200 - margin.left - margin.right;
        const padding = -110; // Space around the chart, not including labels

        const svg = d3
            .select(this.refs.barChart)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .style('color', 'white')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        const x = d3
            .scaleBand()
            .range([0, width])
            .domain(this.props.data.map(d => d[this.props.xAttr]))
            .padding(0.2);
            svg
            .append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('transform', 'translate(-10,0)rotate(-45)')
            .style('text-anchor', 'end');

        const maxValue = Math.max(...this.props.data.map(d => d[this.props.yAttr]));
        const y = d3
            .scaleLinear()
            .domain([0, Math.ceil(maxValue / 10) * 10])
            .range([height, 0]);
            svg.append('g').call(d3.axisLeft(y));

        svg
            .selectAll('mybar')
            .data(this.props.data)
            .enter()
            .append('rect')
            .attr('x', d => x(d[this.props.xAttr]))
            .attr('y', d => y(d[this.props.yAttr]))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(d[this.props.yAttr]))
            .attr("fill", 'orange')

        // Now add titles to the axes
        svg.append("text")
        .attr("text-anchor", "middle") // This makes it easy to centre the text as the transform is applied to the anchor.
        .attr("transform", "translate(" + (padding / 2) + "," + (height / 2) + ")rotate(-90)") // Text is drawn off the screen top left, move down and out and rotate.
        .text(this.props.yLabel)
        .attr('fill', 'white');

        svg.append("text")
        .attr("text-anchor", "middle") // This makes it easy to centre the text as the transform is applied to the anchor.
        .attr("transform", "translate(" + (width / 2) + "," + (height + 100) + ")") // Centre below axis.
        .text(this.props.xLabel)
        .attr('fill', 'white');
			
    }

    render(){
        return <div ref="barChart"></div>;
    }

}
export default BarChart;
