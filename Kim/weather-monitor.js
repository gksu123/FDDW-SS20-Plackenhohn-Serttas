var request = require("request")

var url = 'http://api.openweathermap.org/data/2.5/weather?q=Spain&appid=3e27c1f2db4a1c6e83eadbacbdc32e28'

request({
	url: url,
	json: true
}, function (error, response, body) {
	if (!error && response.statusCode === 200) {
		console.log(body) // Print the json response
	}
})





