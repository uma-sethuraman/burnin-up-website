import React from 'react';
import BubbleChartOrig from "@weknow/react-bubble-chart-d3";

/* Bubble chart visualization used to present ours and our provider's data */
class BubbleChart extends React.Component {

    render() {
			return(
				<div className="BubbleChart">
					{/* used bubble chart React component from @weknowinc 
							customizeable aspects are graph, height, legend
							percentage, and data */}
					<BubbleChartOrig
						graph={{
							zoom: this.props.zoom,
							offsetX: this.props.offsetX,
							offsetY: -0.01,
						}}
						width={1400}
						height={this.props.height}
						padding={15}
						showLegend={true}
						legendPercentage={this.props.legendPercentage}
						legendFont={{
							family: "Arial",
							size: 16,
							color: "#FFFFFF",
							weight: "bold",
						}}
						valueFont={{
							family: "Arial",
							size: 12,
							color: "#fff",
							weight: "bold",
						}}
						labelFont={{
							family: "Arial",
							size: 16,
							color: "#fff",
							weight: "bold",
						}}
						data={this.props.data}
					/>
				</div>
			);
    }
}

export default BubbleChart;