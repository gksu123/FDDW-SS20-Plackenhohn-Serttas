const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var enduser = require('./weather-monitor')

var apiKey = require('./weather.json').openWeatherKey


const question2 = "Bitte geben Sie ein Land ein: ";
async function mainFlow() {
    let ans1 = await askAnything(question2);
    console.log("");
 //   console.log(`Ihr ausgewähltes Land: ${ans1}`);
    console.log("Temperatur für Ihr Land:"+enduser+"");
    rl.close();
    process.exit();

}

function askAnything(question) {
    return new Promise((resolve, reject) => {
        if (question == null) {
            reject(new Error("Sie müssen eine Frage angeben"));
        }
        else {
            rl.question(question, (answer) => resolve(answer));
        }
    })
}
mainFlow();


