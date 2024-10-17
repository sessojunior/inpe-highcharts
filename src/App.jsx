import "./index.css"
import Meteogramas from "./components/Meteogramas"

export default function App() {
	return (
		<div className='p-8'>
			<h1 className='text-3xl font-bold'>Highcharts com React</h1>
			<Meteogramas />
		</div>
	)
}
