import { useEffect, useState } from "react"

import Chart from "./Chart"

export default function Charts({ date, cityId, model, product }) {
	const [chart, setChart] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	// const urlJson = "https://ftp.cptec.inpe.br/modelos/tempo/{{model}}/{{product}}/recortes/grh/json2/{{year}}/{{month}}/{{day}}/{{hour}}/{{cityId}}.json"
	const urlJson = "https://ftp.cptec.inpe.br/modelos/produtos/{{model}}/{{product}}/grh/json2/{{year}}/{{month}}/{{day}}/{{hour}}/{{cityId}}.json"
	const urlChart = urlJson.replaceAll("{{year}}", date.year).replaceAll("{{month}}", date.month).replaceAll("{{day}}", date.day).replaceAll("{{hour}}", date.hour).replaceAll("{{cityId}}", cityId).replaceAll("{{model}}", model).replaceAll("{{product}}", product)

	useEffect(() => {
		async function fetchJson() {
			setLoading(true)
			try {
				const response = await fetch(urlChart)
				const data = await response.json()
				if (data.datasets?.length == 0) {
					throw new Error("Dados não encontrados no JSON")
				}
				setChart(data.datasets[0])
			} catch (error) {
				console.log("Erro ao obter dados do JSON: " + url + ".", error)
				setError(error)
			} finally {
				setLoading(false)
			}
		}

		fetchJson()
	}, [])

	if (loading) {
		return <div>Carregando...</div>
	}

	if (error) {
		return <div>{error.message}</div>
	}

	console.log(chart)

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

	return (
		<div>
			<h2>Meteogramas</h2>
			<Chart date={date} chart={chart} type='tempPressPrec' />
			<Chart date={date} chart={chart} type='tempMinMaxMedia' />
			<Chart date={date} chart={chart} type='press' />
			<Chart date={date} chart={chart} type='prec' />
			<Chart date={date} chart={chart} type='wind' />
			<Chart date={date} chart={chart} type='ur' />
			<Chart date={date} chart={chart} type='cloud' />
			<Chart date={date} chart={chart} type='co' />
			<Chart date={date} chart={chart} type='pm25' />
		</div>
	)
}
