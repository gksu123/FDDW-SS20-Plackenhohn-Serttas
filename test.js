const OpenWeatherMapHelper = require("openweathermap-node");

const helper = new OpenWeatherMapHelper(
	{
		APPID: '09d42d940cc979f914409599ef6b7251',
		units: "imperial"
	}
);

helper.getCurrentWeatherByCityName("Troisdorf", (err, currentWeather) => {
	if(err){
		console.log(err);
	}
	else{
        console.log(currentWeather.weather);
    }
    
});



