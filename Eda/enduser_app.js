const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Bitte suchen Sie eine der folgenden Städte aus:");
console.log("");
console.log("Tokyo, Japan");
console.log("Seoul, Korea");
console.log("Berlin, Deutschland");
console.log("London, England");
console.log("Paris, Frankreich");
console.log("Rom, Italien");
console.log("");


const question1 = "Bitte geben Sie ein Stadt ein: ";
const question2 = "Bitte geben Sie nun die Land ein: ";

async function mainFlow() {
    let ans1 = await askAnything(question1);
    let ans2 = await askAnything(question2);

	console.log("");
	console.log(`Sie haben ausgewählt: ${ans1}, ${ans2}`); 
	console.log("");
	console.log("Vielen Dank. Sie erhalten in kürze alle Wetter Daten.");
    console.log("Auf Wiedersehen!");
    console.log("");

    rl.close();
    process.exit();
}


function askAnything(question) {
    return new Promise((resolve, reject) => {
        if (question == null) {
            reject(new Error("Sie müssen eine Stadt angeben!"));
        }
        else {
            rl.question(question, (ans) => resolve(ans));
        }
    })
}

mainFlow();