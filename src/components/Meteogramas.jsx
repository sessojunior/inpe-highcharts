import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

export default function Meteogramas() {
	const options = {
		title: {
			text: "My chart",
		},
		series: [
			{
				data: [1, 2, 3],
			},
		],
	}

	return (
		<div>
			<h2>Meteogramas</h2>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	)
}
