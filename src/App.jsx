import "./index.css"
import Charts from "./components/Charts"

export default function App() {
	const date = {
		year: "2024",
		month: "10",
		day: "17",
		hour: "00",
	}

	const translateUrl = (url, model, product, cityId, date) => {
		return url.replace("{{year}}", date.year).replace("{{month}}", date.month).replace("{{day}}", date.day).replace("{{hour}}", date.hour).replace("{{cityId}}", cityId).replace("{{model}}", model).replace("{{product}}", product)
	}

	const urlJson1 = "https://ftp.cptec.inpe.br/modelos/tempo/{{model}}/{{product}}/recortes/grh/json2/{{year}}/{{month}}/{{day}}/{{hour}}/{{cityId}}.json"

	const urlJson2 = "https://ftp.cptec.inpe.br/modelos/produtos/{{model}}/{{product}}/grh/json2/{{year}}/{{month}}/{{day}}/{{hour}}/{{cityId}}.json"

	return (
		<div className='p-8'>
			<h1 className='text-4xl font-bold pb-4'>Highcharts com React</h1>
			<p className='text-lg'>
				Data: {date.year}-{date.month}-{date.day} {date.hour}z
			</p>
			<Charts date={date} urlChart={translateUrl(urlJson1, "WRF", "ams_07km", 1083, date)} />
			<Charts date={date} urlChart={translateUrl(urlJson2, "BRAMS", "ams_15km", 1083, date)} />
		</div>
	)
}
