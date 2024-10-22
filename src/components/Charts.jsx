import { useEffect, useState } from "react"

import Chart from "./Chart"

export default function Charts({ date, urlJson, urlCsv }) {
	const [dataJson, setDataJson] = useState(null)
	const [dataCsv, setDataCsv] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		async function fetchJson() {
			setLoading(true)
			try {
				const response = await fetch(urlJson)
				const data = await response.json()
				if (data.datasets?.length == 0) {
					throw new Error("Dados não encontrados no JSON")
				}
				setDataJson(data.datasets[0])
			} catch (error) {
				console.log("Erro ao obter dados do JSON: " + urlJson + ".", error)
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

		if (urlJson) fetchJson()
		if (urlCsv) fetchCsv()
	}, [])

	if (loading) {
		return <div className='text-xl py-4'>Carregando...</div>
	}

	if (error) {
		return <div className='text-xl py-4'>{error.message}</div>
	}

	//console.log("type chart:", type, chart)

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
	// heatmapCo - Heatmap de monóxido de carbono
	// heatmapPm25 - Heatmap de material micro-particulado
	// heatmapNox - Heatmap de óxido de nitrogenio

	return (
		<div>
			<h2 className='text-3xl font-bold py-4 text-red-600'>Meteogramas</h2>
			<p className='text-lg pb-4'>URL JSON: {urlJson}</p>
			<p className='text-lg pb-4'>URL CSV: {urlCsv}</p>
			<Chart date={date} dataJson={dataJson} dataCsv={dataCsv} product='tempPressPrec' />
			<Chart date={date} dataJson={dataJson} dataCsv={dataCsv} product='tempMinMaxMedia' />
			<Chart date={date} dataJson={dataJson} dataCsv={dataCsv} product='press' />
			<Chart date={date} dataJson={dataJson} dataCsv={dataCsv} product='prec' />
			<Chart date={date} dataJson={dataJson} dataCsv={dataCsv} product='wind' />
			<Chart date={date} dataJson={dataJson} dataCsv={dataCsv} product='ur' />
			<Chart date={date} dataJson={dataJson} dataCsv={dataCsv} product='cloud' />
			<Chart date={date} dataJson={dataJson} dataCsv={dataCsv} product='co' />
			<Chart date={date} dataJson={dataJson} dataCsv={dataCsv} product='pm25' />
			<Chart date={date} dataJson={dataJson} dataCsv={dataCsv} product='heatmapCo' />
			<Chart date={date} dataJson={dataJson} dataCsv={dataCsv} product='heatmapPm25' />
			<Chart date={date} dataJson={dataJson} dataCsv={dataCsv} product='heatmapNox' />
		</div>
	)
}
