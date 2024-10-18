import Chart from "./Chart"

export default function Charts({ date, cityId, model, product }) {
	return (
		<div>
			<h2>Meteogramas</h2>
			<Chart date={date} cityId={cityId} model={model} product={product} type='tempPressPrec' />
			<Chart date={date} cityId={cityId} model={model} product={product} type='tempMinMaxMedia' />
		</div>
	)
}
