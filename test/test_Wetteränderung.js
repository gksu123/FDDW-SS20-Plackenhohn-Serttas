const fetch = require("node-fetch");

 let currentTemp = 0; 


let url = 'http://api.openweathermap.org/data/2.5/weather?q=cologne&appid=3e27c1f2db4a1c6e83eadbacbdc32e28'


function convertToCelsius(kelvin){
    return (kelvin - 273.15);
  }


setInterval(() => {
fetch(url)
    .then(res => res.json())
    .then((out) => {
        let newTemp = convertToCelsius(out.main.temp)
        if(newTemp != currentTemp){
              currentTemp = newTemp
              console.log('Neue Temperatur: ' + currentTemp + ' Grad ')
          }
          else {
              console.log('Wait...')
              
          }
        
    })

 
},10000)
