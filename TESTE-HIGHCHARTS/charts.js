// Gráfico
// Essa função é executada automaticamente e retorna o JSON
// Ela pega a data e o JSON do modelo desejado e passa para a função gerarGrafico
;(async function () {
	// Data que irá pegar os dados dos modelos
	const date = {
		year: "2024",
		month: "10",
		day: "17",
		hour: "00",
	}

	const id = 1083

	// URL do JSON
	const url = {
		//WRF_ams_07km: "WRF_ams_07km.json",
		//BRAMS_ams_08km: "BRAMS_ams_08km.json",
		//BAM: "BAM.json",
		//Eta: "Eta.json",
		WRF_ams_07km: `http://ftp.cptec.inpe.br/modelos/tempo/WRF/ams_07km/recortes/grh/json2/${date.year}/${date.month}/${date.day}/${date.hour}/${id}.json`,
		BRAMS_ams_08km: `http://ftp.cptec.inpe.br/modelos/tempo/BRAMS/ams_08km/recortes/grh/json2/${date.year}/${date.month}/${date.day}/${date.hour}/${id}.json`,
		BAM: `http://ftp.cptec.inpe.br/modelos/tempo/BAM/TQ0666L064/recortes/grh/json2/${date.year}/${date.month}/${date.day}/${date.hour}/${id}.json`,
		Eta: `http://ftp.cptec.inpe.br/modelos/tempo/Eta/ams_08km/recortes/grh/json2/${date.year}/${date.month}/${date.day}/${date.hour}/${id}.json`,
	}
	//console.log(url);
	document.querySelector("#date").innerHTML = `${date.day}/${date.month}/${date.year} ${date.hour}z`
	document.querySelector("#json_WRF_ams_07km").setAttribute("href", url.WRF_ams_07km)
	document.querySelector("#json_BRAMS_ams_08km").setAttribute("href", url.BRAMS_ams_08km)
	document.querySelector("#json_BAM").setAttribute("href", url.BAM)
	document.querySelector("#json_Eta").setAttribute("href", url.Eta)

	// Obter dados do JSON
	const fetchJson = async (url) => {
		try {
			const response = await fetch(url)
			const data = await response.json()
			return data
		} catch (error) {
			console.log("Erro ao obter dados do JSON: " + url + ".", error)
			return {}
		}
	}
	const dataJson = {
		WRF_ams_07km: await fetchJson(url.WRF_ams_07km),
		BRAMS_ams_08km: await fetchJson(url.BRAMS_ams_08km),
		BAM: await fetchJson(url.BAM),
		Eta: await fetchJson(url.Eta),
	}
	//console.log("dataJson", dataJson);

	// Chama a função de gerar os gráficos
	gerarGraficos(dataJson, date)
})()

// Essa função é responsável por plotar os gráficos na página web
function gerarGraficos(dataJson, date) {
	// dataJson e date
	//console.log(dataJson);
	//console.log(date);

	// Dados
	let pointStart = `${date.year}-${date.month}-${date.day} ${date.hour}:00:00`
	let WRF_ams_07km = false
	let BRAMS_ams_08km = false
	let BAM = false
	let Eta = false

	// WRF_ams_07km
	if (dataJson.WRF_ams_07km.datasets !== undefined) {
		WRF_ams_07km = {
			datasets: dataJson.WRF_ams_07km.datasets[0],
			lat: dataJson.WRF_ams_07km.datasets[0].lat,
			lon: dataJson.WRF_ams_07km.datasets[0].lon,
			area: dataJson.WRF_ams_07km.datasets[0].area,
			data: dataJson.WRF_ams_07km.datasets[0].data,
		}
		//console.log(WRF_ams_07km.datasets);
		//console.log(WRF_ams_07km.lat);
		//console.log(WRF_ams_07km.lon);
		//console.log(WRF_ams_07km.data);
		document.querySelector("#WRF_ams_07km_lat").innerHTML = WRF_ams_07km.lat
		document.querySelector("#WRF_ams_07km_lon").innerHTML = WRF_ams_07km.lon
		document.querySelector("#WRF_ams_07km_area").innerHTML = WRF_ams_07km.area
	}

	// BRAMS_ams_08km
	if (dataJson.BRAMS_ams_08km.datasets !== undefined) {
		BRAMS_ams_08km = {
			datasets: dataJson.BRAMS_ams_08km.datasets[0],
			lat: dataJson.BRAMS_ams_08km.datasets[0].lat,
			lon: dataJson.BRAMS_ams_08km.datasets[0].lon,
			area: dataJson.BRAMS_ams_08km.datasets[0].area,
			data: dataJson.BRAMS_ams_08km.datasets[0].data,
		}
		// console.log(BRAMS_ams_08km.datasets);
		// console.log(BRAMS_ams_08km.lat);
		// console.log(BRAMS_ams_08km.lon);
		// console.log(BRAMS_ams_08km.data);
		document.querySelector("#BRAMS_ams_08km_lat").innerHTML = BRAMS_ams_08km.lat
		document.querySelector("#BRAMS_ams_08km_lon").innerHTML = BRAMS_ams_08km.lon
		document.querySelector("#BRAMS_ams_08km_area").innerHTML = BRAMS_ams_08km.area
	}

	// BAM
	if (dataJson.BAM.datasets !== undefined) {
		BAM = {
			datasets: dataJson.BAM.datasets[0],
			lat: dataJson.BAM.datasets[0].lat,
			lon: dataJson.BAM.datasets[0].lon,
			area: dataJson.BAM.datasets[0].area,
			data: dataJson.BAM.datasets[0].data,
		}
		//console.log(BAM.datasets);
		// console.log(BAM.lat);
		// console.log(BAM.lon);
		// console.log(BAM.data);
		document.querySelector("#BAM_lat").innerHTML = BAM.lat
		document.querySelector("#BAM_lon").innerHTML = BAM.lon
		document.querySelector("#BAM_area").innerHTML = BAM.area
	}

	// Eta
	if (dataJson.Eta.datasets !== undefined) {
		Eta = {
			datasets: dataJson.Eta.datasets[0],
			lat: dataJson.Eta.datasets[0].lat,
			lon: dataJson.Eta.datasets[0].lon,
			area: dataJson.Eta.datasets[0].area,
			data: dataJson.Eta.datasets[0].data,
		}
		//console.log(Eta.datasets);
		// console.log(Eta.lat);
		// console.log(Eta.lon);
		// console.log(Eta.data);
		document.querySelector("#Eta_lat").innerHTML = Eta.lat
		document.querySelector("#Eta_lon").innerHTML = Eta.lon
		document.querySelector("#Eta_area").innerHTML = Eta.area
	}

	// Gráfico 1 (WRF_ams_07km)
	const chart1 = {
		data: {
			prec: [],
			press: [],
			temp: [],
		},
		valueDecimals: 1,
		pointStart: pointStart,
	}
	if (WRF_ams_07km) {
		WRF_ams_07km.data.forEach((item) => {
			chart1.data.prec.push(parseFloat(item.prec.toFixed(chart1.valueDecimals)))
			chart1.data.press.push(parseFloat(item.press.toFixed(chart1.valueDecimals)))
			chart1.data.temp.push(parseFloat(item.temp.toFixed(chart1.valueDecimals)))
		})
	}
	//console.log("chart1", chart1);
	//console.log("prec", chart1.data.prec);
	//console.log("press", chart1.data.press);
	//console.log("temp", chart1.data.temp);

	// Gráfico 2 (WRF_ams_07km, BRAMS_ams_08km, BAM)
	const chart2 = {
		data: [],
		dataAverage: [],
		valueDecimals: 1,
		pointStart: pointStart,
	}
	//console.log("chart2", chart2);
	const tminTmax = {
		temp: {
			WRF_ams_07km: [],
			BRAMS_ams_08km: [],
			BAM: [],
		},
	}
	// Array com o temp de WRF_ams_07km
	if (WRF_ams_07km) {
		WRF_ams_07km.data.forEach((item) => {
			tminTmax.temp.WRF_ams_07km.push(parseFloat(item.temp.toFixed(chart2.valueDecimals)))
		})
	}
	// Array com o temp de BRAMS_ams_08km
	if (BRAMS_ams_08km) {
		BRAMS_ams_08km.data.forEach((item) => {
			tminTmax.temp.BRAMS_ams_08km.push(parseFloat(item.temp.toFixed(chart2.valueDecimals)))
		})
	}
	// Array com o temp de BAM
	if (BAM) {
		BAM.data.forEach((item, index) => {
			// BAM tem 240 arrays, esse if limitaria o array para 181, igualando-o a quantidade de arrays do WRF_ams_07km e BRAMS_ams_08km
			if (index < 181) {
				tminTmax.temp.BAM.push(parseFloat(item.temp.toFixed(chart2.valueDecimals)))
			}
		})
	}
	//console.log(tminTmax.temp);
	// Array com o temp de tminTmax
	//let timestamp = Date.parse(`${date.year}-${date.month}-${date.day} ${date.hour}:00:00`); // Formato: "2024-01-18 00:00:00"
	if (WRF_ams_07km && BRAMS_ams_08km && BAM) {
		for (let i = 0; i < tminTmax.temp.BAM.length; i++) {
			//timestamp += i * 3600000; // Adiciona 1 hora (3600000 milisegundos) a cada iteração (i)
			chart2.data[i] = []
			//chart2.data[i][0] = timestamp;
			chart2.data[i][0] = Math.min(tminTmax.temp.WRF_ams_07km[i], tminTmax.temp.BRAMS_ams_08km[i], tminTmax.temp.BAM[i]) // Temperatura mínima
			chart2.data[i][1] = Math.max(tminTmax.temp.WRF_ams_07km[i], tminTmax.temp.BRAMS_ams_08km[i], tminTmax.temp.BAM[i]) // Temperatura máxima
			chart2.dataAverage[i] = parseFloat(((chart2.data[i][0] + chart2.data[i][1]) / 2).toFixed(2)) // Temperatura média
		}
	}
	//console.log("chart2.dataAverage", chart2.dataAverage);
	//console.log("chart2.data", chart2.data);

	// Gráfico 3 (WRF_ams_07km, BRAMS_ams_08km, BAM, Eta) de coluna
	const chart3 = {
		prec: {
			WRF_ams_07km: [],
			BRAMS_ams_08km: [],
			BAM: [],
			Eta: [],
		},
		valueDecimals: 2,
		pointStart: pointStart,
	}
	// Array com o prec de WRF_ams_07km
	if (WRF_ams_07km) {
		WRF_ams_07km.data.forEach((item) => {
			chart3.prec.WRF_ams_07km.push(parseFloat(item.prec.toFixed(chart3.valueDecimals)))
		})
		//console.log("prec WRF_ams_07km", chart3.prec.WRF_ams_07km);
	}
	// Array com o prec de BRAMS_ams_08km
	if (BRAMS_ams_08km) {
		BRAMS_ams_08km.data.forEach((item) => {
			chart3.prec.BRAMS_ams_08km.push(parseFloat(item.prec.toFixed(chart3.valueDecimals)))
		})
		//console.log("prec BRAMS_ams_08km", chart3.prec.BRAMS_ams_08km);
	}
	// Array com o prec de BAM
	if (BAM) {
		BAM.data.forEach((item, index) => {
			// BAM tem 240 arrays, esse if limitaria o array para 181, igualando-o a quantidade de arrays do WRF_ams_07km e BRAMS_ams_08km
			if (index < 181) {
				chart3.prec.BAM.push(parseFloat(item.prec.toFixed(chart3.valueDecimals)))
			}
		})
		//console.log("prec BAM", chart3.prec.BAM);
	}
	// Array com o prec de ETA
	if (Eta) {
		Eta.data.forEach((item, index) => {
			// Se ETA tiver mais de 180 arrays, esse if limitaria o array para 181
			if (index < 181) {
				chart3.prec.Eta.push(parseFloat(item.prec.toFixed(chart3.valueDecimals)))
			}
		})
		console.log("prec ETA", chart3.prec.Eta)
	}

	// Gráfico 4 (WRF_ams_07km, BRAMS_ams_08km, BAM) de área
	const chart4 = {
		prec: {
			WRF_ams_07km: [],
			BRAMS_ams_08km: [],
			BAM: [],
		},
		valueDecimals: 2,
		pointStart: pointStart,
	}
	// Array com o prec de WRF_ams_07km
	if (WRF_ams_07km) {
		WRF_ams_07km.data.forEach((item) => {
			chart4.prec.WRF_ams_07km.push(parseFloat(item.prec.toFixed(chart4.valueDecimals)))
		})
		//console.log("prec WRF_ams_07km", chart4.prec.WRF_ams_07km);
	}
	// Array com o prec de BRAMS_ams_08km
	if (BRAMS_ams_08km) {
		BRAMS_ams_08km.data.forEach((item) => {
			chart4.prec.BRAMS_ams_08km.push(parseFloat(item.prec.toFixed(chart4.valueDecimals)))
		})
		//console.log("prec BRAMS_ams_08km", chart4.prec.BRAMS_ams_08km);
	}
	// Array com o prec de BAM
	if (BAM) {
		BAM.data.forEach((item, index) => {
			// BAM tem 240 arrays, esse if limitaria o array para 181, igualando-o a quantidade de arrays do WRF_ams_07km e BRAMS_ams_08km
			if (index < 181) {
				chart4.prec.BAM.push(parseFloat(item.prec.toFixed(chart4.valueDecimals)))
			}
		})
		//console.log("prec BAM", chart4.prec.BAM);
	}

	// Opções padrão do Highcharts
	Highcharts.setOptions({
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
	})

	// Gráfico 1 (WRF_ams_07km)
	Highcharts.chart("chart1", {
		chart: {
			zoomType: "xy",
		},
		title: {
			text: `Temperatura, pressão e precipitação para ${WRF_ams_07km.area}`,
			align: "left",
		},
		subtitle: {
			text: "Fonte: previsaonumerica.cptec.inpe.br (WRF/ams_07km)",
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
				pointStart: Date.UTC(parseInt(chart1.pointStart.substr(0, 4)), parseInt(chart1.pointStart.substr(5, 2)) - 1, parseInt(chart1.pointStart.substr(8, 2)), parseInt(chart1.pointStart.substr(11, 2)), parseInt(chart1.pointStart.substr(14, 2)), parseInt(chart1.pointStart.substr(17, 2))),
				pointInterval: 36e5,
			},
		},
		tooltip: {
			shared: true,
			xDateFormat: "%d/%m/%Y %H:%M",
			valueDecimals: chart1.valueDecimals,
		},
		credits: {
			text: 'Previsão numérica oferecida pelo <a href="http://www.cptec.inpe.br">CPTEC/INPE</a>',
			href: "https://previsaonumerica.cptec.inpe.br",
			position: {
				x: 0,
			},
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
				data: chart1.data.prec,
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
				data: chart1.data.press,
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
				data: chart1.data.temp,
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
	})

	// Gráfico 2
	Highcharts.chart("chart2", {
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
			text: "Fonte: previsaonumerica.cptec.inpe.br (WRF/ams_07km, BRAMS/ams_08km, BAM)",
			align: "left",
		},
		xAxis: [
			{
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
				pointStart: Date.UTC(parseInt(chart2.pointStart.substr(0, 4)), parseInt(chart2.pointStart.substr(5, 2)) - 1, parseInt(chart2.pointStart.substr(8, 2)), parseInt(chart2.pointStart.substr(11, 2)), parseInt(chart2.pointStart.substr(14, 2)), parseInt(chart2.pointStart.substr(17, 2))),
				pointInterval: 36e5,
			},
		},
		tooltip: {
			crosshairs: true,
			shared: true,
			valueSuffix: "°C",
			xDateFormat: "%d/%m/%Y %H:%M",
			valueDecimals: chart2.valueDecimals,
		},
		credits: {
			text: 'Previsão numérica oferecida pelo <a href="http://www.cptec.inpe.br">CPTEC/INPE</a>',
			href: "https://previsaonumerica.cptec.inpe.br",
			position: {
				x: 0,
			},
		},
		legend: {
			enabled: false,
		},
		series: [
			{
				name: "Temperaturas",
				showInLegend: true,
				data: chart2.data,
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
				showInLegend: true,
				type: "spline",
				data: chart2.dataAverage,
				//color: "#2542FF",
				tooltip: {
					valueSuffix: " °C",
				},
			},
		],
	})

	// Gráfico 3
	Highcharts.chart("chart3", {
		chart: {
			type: "column",
		},
		title: {
			text: "Precipitação",
		},
		subtitle: {
			text: "Fonte: previsaonumerica.cptec.inpe.br (WRF/ams_07km, BRAMS/ams_08km, BAM, Eta)",
			align: "left",
		},
		xAxis: [
			{
				type: "datetime",
				offset: 0,
				crosshair: true,
			},
		],
		yAxis: {
			min: 0,
			title: {
				text: "milimetros por hora",
			},
		},
		tooltip: {
			crosshairs: true,
			shared: true,
			valueSuffix: "mm/h",
			xDateFormat: "%d/%m/%Y %H:%M",
			valueDecimals: chart3.valueDecimals,
		},
		credits: {
			text: 'Previsão numérica oferecida pelo <a href="http://www.cptec.inpe.br">CPTEC/INPE</a>',
			href: "https://previsaonumerica.cptec.inpe.br",
			position: {
				x: 0,
			},
		},
		plotOptions: {
			series: {
				// Configura o eixo X para ser a partir da data fornecida
				pointStart: Date.UTC(parseInt(chart3.pointStart.substr(0, 4)), parseInt(chart3.pointStart.substr(5, 2)) - 1, parseInt(chart3.pointStart.substr(8, 2)), parseInt(chart3.pointStart.substr(11, 2)), parseInt(chart3.pointStart.substr(14, 2)), parseInt(chart3.pointStart.substr(17, 2))),
				pointInterval: 36e5,
			},
		},
		series: [
			{
				name: "WRF/ams_07km",
				data: chart3.prec.WRF_ams_07km,
			},
			{
				name: "BRAMS/ams_08km",
				data: chart3.prec.BRAMS_ams_08km,
			},
			{
				name: "BAM",
				data: chart3.prec.BAM,
			},
			{
				name: "Eta",
				data: chart3.prec.Eta,
			},
		],
	})

	// Gráfico 4
	Highcharts.chart("chart4", {
		chart: {
			type: "area",
		},
		title: {
			text: "Precipitação",
		},
		subtitle: {
			text: "Fonte: previsaonumerica.cptec.inpe.br (WRF/ams_07km, BRAMS/ams_08km, BAM)",
			align: "left",
		},
		xAxis: [
			{
				type: "datetime",
				offset: 0,
				crosshair: true,
			},
		],
		yAxis: {
			min: 0,
			title: {
				text: "milimetros por hora",
			},
		},
		tooltip: {
			crosshairs: true,
			shared: true,
			valueSuffix: "mm/h",
			xDateFormat: "%d/%m/%Y %H:%M",
			valueDecimals: chart3.valueDecimals,
		},
		credits: {
			text: 'Previsão numérica oferecida pelo <a href="http://www.cptec.inpe.br">CPTEC/INPE</a>',
			href: "https://previsaonumerica.cptec.inpe.br",
			position: {
				x: 0,
			},
		},
		plotOptions: {
			area: {
				// Configura o eixo X para ser a partir da data fornecida
				pointStart: Date.UTC(parseInt(chart4.pointStart.substr(0, 4)), parseInt(chart4.pointStart.substr(5, 2)) - 1, parseInt(chart4.pointStart.substr(8, 2)), parseInt(chart4.pointStart.substr(11, 2)), parseInt(chart4.pointStart.substr(14, 2)), parseInt(chart4.pointStart.substr(17, 2))),
				pointInterval: 36e5,
				marker: {
					enabled: false,
					symbol: "circle",
					radius: 2,
					states: {
						hover: {
							enabled: true,
						},
					},
				},
			},
		},
		series: [
			{
				name: "WRF/ams_07km",
				data: chart4.prec.WRF_ams_07km,
				fillOpacity: 0.5,
			},
			{
				name: "BRAMS/ams_08km",
				data: chart4.prec.BRAMS_ams_08km,
				fillOpacity: 0.5,
			},
			{
				name: "BAM",
				data: chart4.prec.BAM,
				fillOpacity: 0.5,
			},
		],
	})
}
