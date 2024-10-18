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

	return (
		<div className='p-8'>
			<h1 className='text-3xl font-bold'>Highcharts com React</h1>
			<Charts date={date} cityId={cityId} model={model} product={product} />
		</div>
	)
}
