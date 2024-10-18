import { useEffect, useState } from "react"

import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import highchartsMore from "highcharts/highcharts-more"
highchartsMore(Highcharts)

export default function Chart({ date, cityId, model, product, type }) {
	const [chart, setChart] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const pointStart = `${date.year}-${date.month}-${date.day} ${date.hour}:00:00`
	const urlJson = "https://ftp.cptec.inpe.br/modelos/tempo/{{model}}/{{product}}/recortes/grh/json2/{{year}}/{{month}}/{{day}}/{{hour}}/{{cityId}}.json"
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

	// Global
	const optionsGlobal = {
		global: {
			useUTC: true,
		},
		lang: {
			months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
			shortMonths: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
			weekdays: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
			exportData: {
				annotationHeader: "Anotações",
				categoryDatetimeHeader: "Data e hora",
				categoryHeader: "Categoria",
			},
			loading: ["Carregando o gráfico..."],
			contextButtonTitle: "Exportar gráfico",
			decimalPoint: ",",
			thousandsSep: ".",
			downloadJPEG: "Baixar imagem JPEG",
			downloadPDF: "Baixar arquivo PDF",
			downloadPNG: "Baixar imagem PNG",
			downloadSVG: "Baixar vetor SVG",
			printChart: "Imprimir gráfico",
			rangeSelectorFrom: "De",
			rangeSelectorTo: "Para",
			rangeSelectorZoom: "Zoom",
			resetZoom: "Resetar zoom",
			resetZoomTitle: "Resetar zoom para original",
			viewFullscreen: "Ver em tela cheia",
			viewData: "Ver tabela de dados",
			hideData: "Ocultar tabela de dados",
		},
		accessibility: {
			enabled: false,
		},
		credits: {
			text: "Previsão numérica do CPTEC",
			href: "https://previsaonumerica.cptec.inpe.br",
			position: {
				x: 0,
			},
		},
	}

	// Temperatura, pressão e precipitação
	const optionsTempPressPrec = {
		...optionsGlobal,
		chart: {
			zoomType: "xy",
		},
		title: {
			text: `Temperatura, pressão e precipitação para ${chart.area}`,
			align: "left",
		},
		subtitle: {
			text: `Fonte: CPTEC`,
			align: "left",
		},
		xAxis: [
			{
				type: "datetime",
				offset: 0,
				crosshair: true,
			},
		],
		yAxis: [
			{
				// Primeiro yAxis
				labels: {
					format: "{value}°C",
					style: {
						color: Highcharts.getOptions().colors[2],
					},
				},
				title: {
					text: "Temperatura",
					style: {
						color: Highcharts.getOptions().colors[2],
					},
				},
				opposite: true,
			},
			{
				// Segundo yAxis
				gridLineWidth: 0,
				title: {
					text: "Precipitação",
					style: {
						color: Highcharts.getOptions().colors[0],
					},
				},
				labels: {
					format: "{value} mm",
					style: {
						color: Highcharts.getOptions().colors[0],
					},
				},
			},
			{
				// Terceiro yAxis
				gridLineWidth: 0,
				title: {
					text: "Pressão",
					style: {
						color: Highcharts.getOptions().colors[1],
					},
				},
				labels: {
					format: "{value} mb",
					style: {
						color: Highcharts.getOptions().colors[1],
					},
				},
				opposite: true,
			},
		],
		plotOptions: {
			series: {
				// Configura o eixo X para ser a partir da data fornecida
				pointStart: Date.UTC(parseInt(pointStart.substr(0, 4)), parseInt(pointStart.substr(5, 2)) - 1, parseInt(pointStart.substr(8, 2)), parseInt(pointStart.substr(11, 2)), parseInt(pointStart.substr(14, 2)), parseInt(pointStart.substr(17, 2))),
				pointInterval: 36e5,
			},
		},
		tooltip: {
			shared: true,
			xDateFormat: "%d/%m/%Y %H:%M",
			valueDecimals: 1,
		},
		legend: {
			layout: "vertical",
			align: "left",
			x: 80,
			verticalAlign: "top",
			y: 55,
			floating: true,
			backgroundColor:
				Highcharts.defaultOptions.legend.backgroundColor || // theme
				"rgba(255,255,255,0.25)",
		},
		series: [
			{
				id: "prec",
				name: "Precipitação",
				type: "column",
				yAxis: 1,
				data: chart.data.map((item) => parseFloat(item.prec.toFixed(1))),
				connectNulls: false,
				fillOpacity: 0.5,
				//color: "#2542FF",
				tooltip: {
					valueSuffix: " mm/h",
				},
			},
			{
				name: "Pressão",
				type: "spline",
				yAxis: 2,
				data: chart.data.map((item) => parseFloat(item.press.toFixed(1))),
				marker: {
					enabled: false,
				},
				dashStyle: "shortdot",
				//color: "#2542FF",
				tooltip: {
					valueSuffix: " hPa",
				},
			},
			{
				name: "Temperatura",
				type: "spline",
				data: chart.data.map((item) => parseFloat(item.temp.toFixed(1))),
				//color: "#2542FF",
				tooltip: {
					valueSuffix: " °C",
				},
			},
		],
		responsive: {
			rules: [
				{
					condition: {
						maxWidth: 500,
					},
					chartOptions: {
						legend: {
							floating: false,
							layout: "horizontal",
							align: "center",
							verticalAlign: "bottom",
							x: 0,
							y: 0,
						},
						yAxis: [
							{
								labels: {
									align: "right",
									x: 0,
									y: -6,
								},
								showLastLabel: false,
							},
							{
								labels: {
									align: "left",
									x: 0,
									y: -6,
								},
								showLastLabel: false,
							},
							{
								visible: false,
							},
						],
					},
				},
			],
		},
	}

	// Temperatura mínima, máxima e média
	const tempMinMax = chart.data.map((item) => [parseFloat(item.temp_mn.toFixed(2)), parseFloat(item.temp_mx.toFixed(2))])
	const tempAverage = chart.data.map((item) => parseFloat(((parseFloat(item.temp_mn) + parseFloat(item.temp_mx)) / 2).toFixed(2)))
	const optionsTempMinMaxMedia = {
		...optionsGlobal,
		chart: {
			type: "arearange",
			zoomType: "x",
			scrollablePlotArea: {
				minWidth: 600,
				scrollPositionX: 1,
			},
		},
		title: {
			text: "Temperatura mínima, maxima e média",
		},
		subtitle: {
			text: "Fonte: CPTEC",
			align: "left",
		},
		xAxis: [
			{
				labels: {
					enabled: false,
				},
				type: "datetime",
				offset: 0,
				crosshair: true,
			},
		],
		yAxis: {
			title: {
				text: null,
			},
		},
		plotOptions: {
			series: {
				// Configura o eixo X para ser a partir da data fornecida
				pointStart: Date.UTC(parseInt(pointStart.substr(0, 4)), parseInt(pointStart.substr(5, 2)) - 1, parseInt(pointStart.substr(8, 2)), parseInt(pointStart.substr(11, 2)), parseInt(pointStart.substr(14, 2)), parseInt(pointStart.substr(17, 2))),
				pointInterval: 36e5,
			},
		},
		tooltip: {
			crosshairs: true,
			shared: true,
			valueSuffix: "°C",
			xDateFormat: "%d/%m/%Y %H:%M",
			valueDecimals: 1,
		},
		legend: {
			enabled: false,
		},
		series: [
			{
				name: "Temperaturas mín. e máx.",
				showInLegend: false,
				data: tempMinMax,
				color: {
					linearGradient: {
						x1: 0,
						x2: 0,
						y1: 0,
						y2: 1,
					},
					stops: [
						[0, "#ff0000"],
						[1, "#0000ff"],
					],
				},
			},
			{
				name: "Temperatura média",
				showInLegend: false,
				type: "spline",
				data: tempAverage,
				//color: "#2542FF",
				tooltip: {
					valueSuffix: " °C",
				},
			},
		],
	}

	// Type Options
	let options = ""
	if (type === "tempPressPrec") {
		// Temperatura, Pressão e Precipitação
		options = optionsTempPressPrec
	} else if (type === "tempMinMaxMedia") {
		// Temperatura
		options = optionsTempMinMaxMedia
	} else if (type === "press") {
		// Pressão
		options = optionsPress
	}

	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	)
}
