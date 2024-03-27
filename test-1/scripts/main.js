$(window).on('load', function () {
	$.getJSON('./storage/data.json', function (data) {
		({ earnings, consultant } = data)
		console.log(earnings);
		setEarnings(earnings)
		setConsultant(consultant)
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
		<div class="consultant-revenue"><h6>${formatNumber(consultant['revenue'])}</h6></div>
		<div class="consultant-name"><h6>${consultant['name']}</h6></div>
		</div>`
	})
	$('#consultants-stats').html(innerHTML)
}

function setValueToElement(elemID, value) {
	$(elemID).text(value);
}

function formatNumber(numStr) {
	return parseFloat(numStr).toLocaleString('en')
}
