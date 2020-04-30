const readline = require('readline');
var request = require('request')
  
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const question1 = 'Bitte geben Sie ein Startort ein: ';
//stattdessen Koordinaten eingeben

//const question2 = 'Bitte geben Sie ein Zielort ein: ';
const question3 = 'Geben Sie ein Verkehrsmittel ein: ';


const question4 = 'Möchten Sie die Wetterdaten für Ihr Zielort haben? (y/n): ';

const question5 = 'Möchten Sie die Verkehrsinfos anzeigen lassen? (y/n): ';

const ziel = 'Switzerland';   //'Berghütte in den Schweizer Alpen';

async function mainFlow() {
    let ans1 = await askAnything(question1);
//    let ans2 = await askAnything(question2);
    let ans3 = await askAnything(question3);
    let ans4 = await askAnything(question4);
    let ans5 = await askAnything(question5);

  console.log('');
  
  let apiKey = '09d42d940cc979f914409599ef6b7251';
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${ziel}&units=imperial&appid=${apiKey}`;

  let apiKey2 = '061864de-5ff2-43a3-abbd-a26d08e0284c'; 
  let url2 = `https://graphhopper.com/api/1/route?point_hint=${ans1}&point=46.3,10.0&vehicle=${ans3}&locale=de&calc_points=true&key=${apiKey2}`;
//  let url2 = 'https://graphhopper.com/api/1/route?point=50.9395,6.977547&point=50.938811,7.008111&vehicle=car&locale=de&calc_points=true&key=061864de-5ff2-43a3-abbd-a26d08e0284c';

//WETTER
  if(ans4 == 'y')
  {
    console.log('Jetzt kommen die Wetterdaten: ');
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (error) {
        console.log('error:', error);
        } else {
        (!error && response.statusCode === 200)
        console.log(body)
    //    console.log('Sie haben ausgewählt: ' + ans2);
        rl.close();
        process.exit();
        }
    })
}
//VERKEHR
    if(ans5 == 'y')
    {
        console.log('Jetzt kommen die Verkehrsinfos: ');
        request({
            url: url2,
            json: true
        }, function (error, response, json) {
            if (error) {
            console.log('error:', error);
            } else {
            (!error && response.statusCode === 200)
            console.log(json)
            console.log('Ihre Route: ' + ans1 + ' nach ' + ziel);
            rl.close();
            process.exit();
            }
        })
        }else{
            rl.close();
            process.exit();
        }
}

function askAnything(question) {
  return new Promise((resolve, reject) => {
    if (question == null) {
      reject(new Error('Sie müssen eine Frage angeben'));
    }
    else {
      rl.question(question, (answer) => resolve(answer));
    }
  })
}
mainFlow();

