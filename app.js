#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//step Generate a random number with math.ramdom()
const randomNumber = Math.floor(Math.random() * 100) + 1;
//console.log(ramdomNumber);  //to check if this function generate a random number or not.
let remainingChances = 6;
//Step 02  Validate User input
function validateNumber(input) {
    const number = parseFloat(input);
    if (isNaN(number)) {
        return "please enter a valid number.";
    }
    if (number < 0 || number > 100) {
        return "please enter a number between 1 to 100";
    }
    return true;
}
//Step 03  Creating an async function to ask for the number to guess
async function askForGuess() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "guess",
            message: "Please enter a number between 1 and 100: ",
            validate: validateNumber,
        },
    ])
        //Step 04 Creating logics to manipulate the answer to show the relevent output against the User input
        .then((answers) => {
        const guessNumber = parseInt(answers.guess);
        if (guessNumber === randomNumber) {
            console.log(chalk.yellow.bgGreenBright(`Congratulations you guessed the number ${randomNumber} correctly!`));
            process.exit(0);
        }
        else if (guessNumber < randomNumber) {
            console.log(chalk.white.bgRed(`Too low, kindly guess again.You have ${remainingChances} chances left: `));
        }
        else {
            console.log(chalk.white.bgBlueBright(`Too high, kindly guess again. You have ${remainingChances} chances left: `));
        }
        remainingChances--;
        if (remainingChances === 0) {
            console.log(chalk.green.bgRed(`We are really sorry you have missed you all chances and the correct number is ${randomNumber}`));
            process.exit(0);
        }
        else {
            askForGuess();
        }
    });
}
askForGuess();
