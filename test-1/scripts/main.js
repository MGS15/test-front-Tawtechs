$(window).on('load', function () {
	$.getJSON('./storage/data.json', function (data) {
		({ earnings, consultant, earningsByMonth, totalBills, courses, trainningLader, callsByMonth,
			advertisingChannels, callsDetailsByMonth, salesByTeam, salesByConsultant } = data)
		setEarnings(earnings)
		setConsultant(consultant)
		setEarningsByMonth(earningsByMonth)
		setTotalBills(totalBills)
		setCourses(courses)
		setTrainningLader(trainningLader)
		setCallsByMonth(callsByMonth)
		setAdvertisingChannels(advertisingChannels['maxBudget'], advertisingChannels['channels'])
		setCallDetailsByMonth(callsDetailsByMonth)
		setSalesByTeam(salesByTeam)
		setSalesByConsultant(salesByConsultant)
	});
})

function setEarnings(data) {
	var formatted = formatNumber(data['earnings']['amount'])
	setValueToElement('#earnings', formatted)
	setValueToElement('#currency', data['earnings']['currency'])
	formatted = formatNumber(data['paid-calls'])
	setValueToElement('#calls', formatted)
}

function setConsultant(data) {
	const consultants = data.sort((a, b) => b['revenue'] - a['revenue'])
	var innerHTML = ''
	consultants.forEach((consultant) => {
		innerHTML += `<div class="consultant-lader">
		<div class="consultant-revenue"><h4>${formatNumber(consultant['revenue'])}</h4></div>
		<div class="consultant-name"><h4>${consultant['name']}</h4></div>
		</div>`
	})
	$('#consultants-stats').html(innerHTML)
}

function setEarningsByMonth(earningsByMonth) {
	const months = []
	const earnings = []
	earningsByMonth.forEach((month) => {
		months.push(month['month'])
		earnings.push(month['amount'])
	})

	const options = {
		series: [
			{name: "earnings", data: earnings},
		],
		chart: {
			width: '100%',
			height: 150,
			type: 'area',
			redrawOnParentResize: true,
			toolbar: {show: false},
			selection: {enabled: false},
			zoom: {enabled: false},
			grid: {
				yaxis: {
					lines: {
						show: false
					}
				}
			}
		},
		dataLabels: {
			enabled: true,
			background: {enabled: false},
			offsetY: -10,
			formatter: function(val) {
				if (val >= 1e9) return (val / 1e9).toFixed(1) + 'B';
				else if (val >= 1e6) return (val / 1e6).toFixed(1) + 'M';
				else if (val >= 1e3) return (val / 1e3).toFixed(1) + 'K';
				else return val;
			}
		},
		markers: {
			size: 5
		},
		xaxis: {
			categories: months,
			labels: {show: false},
		},
		yaxis: {
			labels: {show: false}
		}
	}

	const earningsChart = new ApexCharts(
		document.querySelector('#earnings-by-month'), options
	)

	earningsChart.render();

	const highest = $('#highest-earning').html()
	const lowest = $('#lowest-earning').html()
	const average = $('#average-earning').html()
	$('#highest-earning').html(highest + `<h4 class="text-secondary">${formatNumber(Math.max(...earnings))}</h4>`)
	$('#lowest-earning').html(lowest + `<h4 class="text-secondary">${formatNumber(Math.min(...earnings))}</h4>`)
	$('#average-earning').html(average + `<h4 class="text-secondary">${formatNumber((earnings.reduce((a, b) => a + b, 0) / earnings.length))}</h4>`)
}

function setTotalBills(totalBills) {

	const paid = ((totalBills['paid'] / totalBills['total']) * 100).toFixed(2)
	const unpaid = ((totalBills['unpaid'] / totalBills['total']) * 100).toFixed(2)
	const options1 = {
		series: [paid],
		labels: ['paid'],
		chart: {
			width: '50%',
			height: 130,
			type: 'radialBar',
		},
		colors: ['#28a745'],
		plotOptions: {
			radialBar: {
				hollow: {size: '60%'},
				
				dataLabels: {
					show: true,
					name: {show: false},
					value: {
						fontSize: '12px',
						fontWeight: 600,
						color: '#6c757d',
						offsetY: 5
					}
				}
			}
		},
		stroke: {
			lineCap: "round",
		},
	};
	const options2 = {
		series: [unpaid],
		labels: ['unpaid'],
		chart: {
			width: '50%',
			height: 130,
			type: 'radialBar',
		},
		colors: ['#dc3545'],
		plotOptions: {
			radialBar: {
				startAngle: 0,
          		endAngle: 360,
				hollow: {size: '60%'},
				dataLabels: {
					show: true,
					name: {show: false},
					value: {
						fontSize: '12px',
						fontWeight: 600,
						color: '#6c757d',
						offsetY: 5
					}
				}
			}
		},
		stroke: {
			lineCap: "round",
		},
	};

	const chart1 = new ApexCharts(document.querySelector("#paid-bills"), options1);
	const chart2 = new ApexCharts(document.querySelector("#unpaid-bills"), options2);
	chart1.render();
	chart2.render();
	$('#total-paid-bills').html(formatNumber(totalBills['paid']))
	$('#total-unpaid-bills').html(formatNumber(totalBills['unpaid']))
}

function setCourses(courses) {

	var sum = courses.reduce((total, course) => total + course['students'], 0)
	$('#number-courses').html(formatNumber(sum))
	$('#average-courses').html(formatNumber(sum / courses.length))
	const options = {
		series: [{
			name: 'Students',
			data: courses.map(course => course['students'])
		}],
		colors: ['#563D7C'],
		chart: {
			type: 'line',
			height: 120,
			redrawOnParentResize: true,
			toolbar: {show: false},
			selection: {enabled: false},
			zoom: {enabled: false},
			grid: {
				yaxis: {
					lines: {show: false}
				}
			}
		},
		stroke: {width: 3},
		yaxis: {
			labels: {show: false}
		},
		xaxis: {
			categories: courses.map(course => course['name']),
			labels: {show: false},
		}
	}
	const chart = new ApexCharts(document.querySelector("#courses-chart"), options);
	chart.render();
}

function setTrainningLader(trainningLader) {
	const trainning = trainningLader.sort((a, b) => b['revenue'] - a['revenue'])
	var innerHTML = ''
	trainning.forEach((trainning) => {
		innerHTML += `<div class="text-secondary trainning-lader">
		<div class="trainning-revenue"><h4>${formatNumber(trainning['revenue'])}</h4></div>
		<div class="trainning-name"><h4>${trainning['name']} L. ${trainning['level']}</h4></div>
		</div>`
	})
	$('#trainning-lader').html(innerHTML)
}

function setCallsByMonth(callsByMonth)  {
	const months = []
	const calls = []
	callsByMonth.forEach((month) => {
		months.push(month['month'])
		calls.push(month['calls'])
	})

	const options = {
		series: [
			{name: "calls", data: calls},
		],
		colors: ['#563D7C'],
		chart: {
			width: '100%',
			height: 150,
			type: 'area',
			redrawOnParentResize: true,
			toolbar: {show: false},
			selection: {enabled: false},
			zoom: {enabled: false},
			grid: {
				yaxis: {
					lines: {show: false}
				}
			}
		},
		dataLabels: {enabled: false},
		xaxis: {
			show: false,
			labels: {show: false},
		},
		yaxis: {
			show: false,
			labels: {show: false}
		}
	}

	const callsChart = new ApexCharts(
		document.querySelector('#calls-by-month-chart'), options
	)

	callsChart.render();
	$('#average-calls').html(formatNumber((calls.reduce((a, b) => a + b, 0) / calls.length).toFixed(2)))

}

function setAdvertisingChannels(maxBudget, advertisingChannels) {
	const channels = []
	const budgets = []
	advertisingChannels.forEach((channel) => {
		channels.push(channel['name'])
		budgets.push(channel['budget'])
	})

	var options = {
		chart: {
		  height: 280,
		  type: "radialBar",
		},
		colors: ['#0866FF', '#DA412D', '#0084B4', '#C70001', '#ff00ff', '#E40072'],
		series: budgets.map(budget => (budget / maxBudget).toFixed(2) * 100),
		plotOptions: {
			hollow: {size: '0%'},
			radialBar: {
				dataLabels: {
					name: {fontSize: '16px',},
					value: {fontSize: '16px',},
					total: {
						show: false,
						label: 'paid advertisements',
						fontSize: '12px',
					}
				}
			}
		},
		labels: channels
	}

	const chart = new ApexCharts(document.querySelector("#advertising-channels"), options);
	chart.render();
	var innerHTML = ''
	advertisingChannels.forEach((channel) => {
		innerHTML += `<div class="text-secondary">
		<div><h6>${channel['name']}</h6></div>
		<div><h6>${formatNumber(channel['budget'])}</h6></div>
		</div>`
	})
	$('#advertising-details').html(innerHTML)
}

function setCallDetailsByMonth(callsDetailsByMonth) {
	const duration = []
	const months = []
	callsDetailsByMonth.forEach((month) => {
		months.push(month['month'])
		duration.push(month['duration'])
	})
	const min = secondsToTime(Math.min(...duration))
	const max = secondsToTime(Math.max(...duration))
	const average = secondsToTime(Math.floor(duration.reduce((a, b) => a + b, 0) / duration.length))

	const options = {
		chart: {
			height: 250,
			type: 'scatter',
			toolbar: {show: false},
			selection: {enabled: false},
			zoom: {enabled: false},
		},
		colors: ['#563D7C'],
		series: [{
			name: "duration",
			data: duration.map(d => secondsToTime(d))
		}],
		xaxis: {categories: months},
		yaxis: {categories: duration.map(d => secondsToTime(d))}
	}
	const chart = new ApexCharts(document.querySelector("#paid-calls-duration-chart"), options);
	chart.render();
	$('#duration-min').html(min)
	$('#duration-max').html(max)
	$('#average-duration').html(average + " " + $('#average-duration').html())
}

function setSalesByTeam(salesByTeam) {

	const teams = []
	const sales = []

	salesByTeam.forEach((team) => {
		teams.push(team['team'])
		sales.push(team['sales'])
	})

	const options = {

		series: [
			{name: "sales", data: sales},
		],
		chart: {
			width: '100%',
			height: 200,
			type: 'bar',
			toolbar: {show: false},
			selection: {enabled: false},
			zoom: {enabled: false},
		},
		colors: ['#5E0FDD', '#F76385', '#F1C03D', '#009D1F'],
		plotOptions: {
			bar: {
				borderRadius: 4,
				horizontal: true,
				barHeight: '50%',
				distributed: true,
			}
		},
		dataLabels: {
			enabled: true,
			formatter: function(val) {
				if (val >= 1e9) return (val / 1e9).toFixed(1) + 'B';
				else if (val >= 1e6) return (val / 1e6).toFixed(1) + 'M';
				else if (val >= 1e3) return (val / 1e3).toFixed(1) + 'K';
				else return val;
			}
		},
		xaxis: {
			categories: teams,
			labels: {show: false},
		},	
		yaxis: {
			categories: teams,
		}
	}
	const chart = new ApexCharts(document.querySelector("#sales-by-team-chart"), options);
	chart.render();
	const bestSelling = salesByTeam.find(team => team['sales'] === Math.max(...sales))
	$('#best-selling-team').html(bestSelling['team'])
	$('#best-selling-amount').html(shortenAmount(bestSelling['sales']))
	console.log(salesByTeam)
}

function setSalesByConsultant(salesByConsultant) {
	const consultants = []
	const sales = []
	salesByConsultant.forEach((consultant) => {
		consultants.push(consultant['name'])
		sales.push(consultant['sales'])
	})

	const options = {
		series: [
			{name: "sales", data: sales},
		],
		chart: {
			width: '100%',
			height: 200,
			type: 'bar',
			toolbar: {show: false},
			selection: {enabled: false},
			zoom: {enabled: false},
		},
		colors: ['#5E0FDD', '#F76385', '#F1C03D', '#009D1F'],
		plotOptions: {
			bar: {
				borderRadius: 4,
				horizontal: true,
				barHeight: '50%',
				distributed: true,
			}
		},
		dataLabels: {
			enabled: true,
			formatter: () => shortenAmount(val)
		},
		xaxis: {
			categories: consultants,
			labels: {show: false},
		},	
		yaxis: {
			categories: consultants,
		}
	}
	const chart = new ApexCharts(document.querySelector("#sales-consultant-chart"), options);
	chart.render();
	const bestSelling = salesByConsultant.find(consultant => consultant['sales'] === Math.max(...sales))
	$('#best-selling-consultant').html(bestSelling['name'])
	$('#best-selling-consultant-amount').html(shortenAmount(bestSelling['sales']))

}

function setValueToElement(elemID, value) {
	$(elemID).text(value);
}

function formatNumber(numStr) {
	return parseFloat(numStr).toLocaleString('en')
}

function shortenAmount(amount) {
	if (amount >= 1e9) return (amount / 1e9).toFixed(1) + 'B';
	else if (amount >= 1e6) return (amount / 1e6).toFixed(1) + 'M';
	else if (amount >= 1e3) return (amount / 1e3).toFixed(1) + 'K';
	else return amount;
}

function secondsToTime(s) {
    let minutes = Math.floor(s / 60);
    let seconds = s % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
