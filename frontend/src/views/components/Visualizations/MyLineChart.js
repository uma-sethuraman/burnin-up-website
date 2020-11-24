import React from 'react';
import { LineChart, Line, XAxis, YAxis } from "recharts";

/* Line chart visualization to visualize carbon emissions data */
class MyLineChart extends React.Component {

    render() {
			return(
				<div className="LineChart">
					{/* Used line chart from recharts */}
					<LineChart
						width={1000}
						height={500}
						data={this.props.data}
						margin={{ top: 20, right: 20, left: 230, bottom: 40 }}
						>
						<XAxis
							dataKey="Year"
							stroke="white"
							label={{
							value: "Year",
							position: "insideBottomRight",
							dx: -300,
							dy: 30,
							fill: "white",
							fontSize: 20,
							}}
							tick={{ fontSize: 12 }}
							domain={["dataMin", "dataMax"]}
							type="number"
							tickCount={16}
						/>
						<YAxis
							dataKey="CarbonEmissions"
							stroke="white"
							label={{
							value: "Carbon Emissions (ppm)",
							position: "insideLeft",
							angle: -90,
							dx: -10,
							dy: 90,
							fill: "white",
							fontSize: 20,
							}}
							tick={{ fontSize: 12 }}
							domain={[270, "auto"]}
							tickCount={35}
							interval={1}
						/>
						<Line
							type="monotone"
							dataKey="CarbonEmissions"
							stroke="white"
							dot={false}
							strokeWidth="3"
						/>
						</LineChart>
				</div>
			);
    }
}

export default MyLineChart;