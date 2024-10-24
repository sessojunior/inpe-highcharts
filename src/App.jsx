import "./index.css"
import Charts from "./components/Charts"

export default function App() {
	const date = {
		year: "2024",
		month: "10",
		day: "24",
		turn: "00",
	}
	const cityId = 3

	const urlCharts = "https://ftp.cptec.inpe.br/modelos/produtos/BRAMS/ams_15km/grh/json2/{{year}}/{{month}}/{{day}}/{{turn}}/{{cityId}}.json"
	const urlCsv = "https://ftp.cptec.inpe.br/modelos/produtos/BRAMS/ams_15km/grh/csv/{{year}}/{{month}}/{{day}}/{{turn}}/{{cityId}}.csv"

	return (
		<div className='p-8'>
			<h1 className='text-4xl font-bold pb-4'>Highcharts com React</h1>
			<p className='text-lg'>
				Data: {date.year}-{date.month}-{date.day} {date.turn}z
			</p>
			<Charts date={date} urlCharts={urlCharts ? urlCharts.replace("{{year}}", date.year).replace("{{month}}", date.month).replace("{{day}}", date.day).replace("{{turn}}", date.turn).replace("{{cityId}}", cityId) : null} urlCsv={urlCsv ? urlCsv.replace("{{year}}", date.year).replace("{{month}}", date.month).replace("{{day}}", date.day).replace("{{turn}}", date.turn).replace("{{cityId}}", cityId) : null} />
		</div>
	)
}
