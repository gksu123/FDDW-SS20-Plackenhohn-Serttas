const readline = require('readline');
var request = require('request')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const frage = 'Bitte geben Sie ein/e Land/Stadt ein: ';
async function mainFlow() {
  let antwort = await askAnything(frage);
  console.log('');

  let apiKey = '3e27c1f2db4a1c6e83eadbacbdc32e28'
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${antwort}&units=imperial&appid=${apiKey}`

  request({
    url: url,
    json: true
  }, function (error, response, body) {
    if (error) {
      console.log('error:', error);
    } else {
      (!error && response.statusCode === 200)
      console.log(body)
      console.log('Ihr/e ausgewählte/s Stadt/Land: ' + antwort);
      rl.close();
      process.exit();
    }
  })
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


