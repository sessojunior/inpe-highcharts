import "./index.css"
import Charts from "./components/Charts"

export default function App() {
	const date = {
		year: "2024",
		month: "10",
		day: "17",
		hour: "00",
	}
	const cityId = 1083
	const model = "BRAMS" // Ex: WRF
	const product = "ams_15km" // Ex: ams_07km

	// const urlJson = "https://ftp.cptec.inpe.br/modelos/tempo/{{model}}/{{product}}/recortes/grh/json2/{{year}}/{{month}}/{{day}}/{{hour}}/{{cityId}}.json"
	const urlJson = "https://ftp.cptec.inpe.br/modelos/produtos/{{model}}/{{product}}/grh/json2/{{year}}/{{month}}/{{day}}/{{hour}}/{{cityId}}.json"
	const urlChart = urlJson.replaceAll("{{year}}", date.year).replaceAll("{{month}}", date.month).replaceAll("{{day}}", date.day).replaceAll("{{hour}}", date.hour).replaceAll("{{cityId}}", cityId).replaceAll("{{model}}", model).replaceAll("{{product}}", product)

	return (
		<div className='p-8'>
			<h1 className='text-3xl font-bold'>Highcharts com React</h1>
			<Charts date={date} urlChart={urlChart} />
		</div>
	)
}
