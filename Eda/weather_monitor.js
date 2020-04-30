const fetch = require("node-fetch");

let city = 'seoul,kr';


let url = 'http://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=09d42d940cc979f914409599ef6b7251'

fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then((out) => {
        console.log('Hier die JSON!', out);
    })
    .catch(err => { throw err});
   

/*
      let apiKey = '09d42d940cc979f914409599ef6b7251'
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${ans2}&units=imperial&appid=${apiKey}`

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (error) {
            console.log('error:', error);
            } else {
            (!error && response.statusCode === 200)
            console.log(body)
            }
   
    */