import { useEffect, useState } from "react"

import Chart from "./Chart"

export default function Charts({ date, urlCharts, urlCsv }) {
	const [dataCharts, setDataCharts] = useState(null)
	const [dataCsv, setDataCsv] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		async function fetchCharts() {
			setLoading(true)
			try {
				const response = await fetch(urlCharts)
				const data = await response.json()
				if (data.datasets?.length == 0) {
					throw new Error("Dados não encontrados no JSON")
				}
				setDataCharts(data.datasets[0])
			} catch (error) {
				console.log("Erro ao obter dados do JSON: " + urlCharts + ".", error)
				setError(error)
			} finally {
				setLoading(false)
			}
		}

		async function fetchCsv() {
			setLoading(true)
			try {
				const response = await fetch(urlCsv)
				const text = await response.text()
				if (text == "") {
					throw new Error("Dados não encontrados no CSV")
				}
				setDataCsv(text)
			} catch (error) {
				console.log("Erro ao obter dados do CSV: " + urlCsv + ".", error)
				setError(error)
			} finally {
				setLoading(false)
			}
		}

		if (urlCharts) fetchCharts()
		if (urlCsv) fetchCsv()
	}, [])

	if (loading) {
		return <div className='text-xl py-4'>Carregando...</div>
	}

	if (error) {
		return <div className='text-xl py-4'>{error.message}</div>
	}

	// Tipos de charts:
	// tempPressPrec - Temperatura, pressão e precipitação
	// tempMinMaxMedia - Temperatura mínima, maxima e média
	// press - Pressão
	// prec - Precipitação
	// wind - Vento
	// ur - Umidade relativa
	// cloud - Nuvens
	// co - Monóxido de carbono
	// pm25 - Material micro-particulado
	// csvCo - Heatmap de monóxido de carbono
	// csvPm25 - Heatmap de material micro-particulado
	// csvNox - Heatmap de óxido de nitrogenio
	// csvWdir - Heatmap de direção do vento
	// csvSpeed - Heatmap de velocidade

	return (
		<div>
			<h2 className='text-3xl font-bold py-4 text-red-600'>Meteogramas</h2>
			<p className='text-lg pb-4'>URL Charts: {urlCharts}</p>
			<p className='text-lg pb-4'>URL CSV: {urlCsv}</p>
			{dataCharts !== null && (
				<>
					<Chart date={date} dataCharts={dataCharts} product='tempPressPrec' />
					<Chart date={date} dataCharts={dataCharts} product='tempMinMaxMedia' />
					<Chart date={date} dataCharts={dataCharts} product='press' />
					<Chart date={date} dataCharts={dataCharts} product='prec' />
					<Chart date={date} dataCharts={dataCharts} product='wind' />
					<Chart date={date} dataCharts={dataCharts} product='ur' />
					<Chart date={date} dataCharts={dataCharts} product='cloud' />
					<Chart date={date} dataCharts={dataCharts} product='co' />
					<Chart date={date} dataCharts={dataCharts} product='pm25' />
				</>
			)}
			{dataCsv !== null && (
				<>
					<Chart date={date} dataCsv={dataCsv} product='csvCo' />
					<Chart date={date} dataCsv={dataCsv} product='csvPm25' />
					<Chart date={date} dataCsv={dataCsv} product='csvNox' />
					<Chart date={date} dataCsv={dataCsv} product='csvWdir' />
					<Chart date={date} dataCsv={dataCsv} product='csvSpeed' />
				</>
			)}
		</div>
	)
}
