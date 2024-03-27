$(window).on('load', function () {
	$.getJSON('./storage/data.json', function (data) {
		({ earnings, consultant, earningsByMonth } = data)
		// console.log(earnings);
		setEarnings(earnings)
		setConsultant(consultant)
		setEarningsByMonth(earningsByMonth)
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
	$('#highest-earning').html(highest + formatNumber(Math.max(...earnings)))
	$('#lowest-earning').html(lowest + formatNumber(Math.min(...earnings)))
	$('#average-earning').html(average + formatNumber((earnings.reduce((a, b) => a + b, 0) / earnings.length)))
}

function setValueToElement(elemID, value) {
	$(elemID).text(value);
}

function formatNumber(numStr) {
	return parseFloat(numStr).toLocaleString('en')
}
