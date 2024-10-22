import "./index.css"
import Charts from "./components/Charts"

export default function App() {
	const date = {
		year: "2024",
		month: "10",
		day: "20",
		turn: "00",
	}
	const cityId = "1083"

	const translateUrl = (url, cityId, date) => {
		return url.replace("{{year}}", date.year).replace("{{month}}", date.month).replace("{{day}}", date.day).replace("{{turn}}", date.turn).replace("{{cityId}}", cityId)
	}

	const urlJson1 = "https://ftp.cptec.inpe.br/modelos/tempo/WRF/ams_07km/recortes/grh/json2/{{year}}/{{month}}/{{day}}/{{turn}}/{{cityId}}.json"
	const urlJson2 = "https://ftp.cptec.inpe.br/modelos/produtos/BRAMS/ams_15km/grh/json2/{{year}}/{{month}}/{{day}}/{{turn}}/{{cityId}}.json"

	return (
		<div className='p-8'>
			<h1 className='text-4xl font-bold pb-4'>Highcharts com React</h1>
			<p className='text-lg'>
				Data: {date.year}-{date.month}-{date.day} {date.turn}z
			</p>
			<Charts date={date} urlCharts={translateUrl(urlJson1, cityId, date)} />
			<Charts date={date} urlCharts={translateUrl(urlJson2, cityId, date)} />
		</div>
	)
}
