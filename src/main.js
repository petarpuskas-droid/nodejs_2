import formatExpense, {currency} from "./format.js";
import { loadExpenses, saveExpenses } from "./storage.js";

const APP_NAME = "Troškovnik";
console.log(`== ${APP_NAME} ==`);

// console.log("Varijabla okruženja: ", process.env.CURRENCY);

/*
const args = process.argv.slice(2);
// console.log("Argumenti", args);

const command = args[0];
const arg1 = args[1];
const arg2 = args[2];
*/

const [command, arg1, arg2] = process.argv.slice(2); //npr. ["add", "Kruh", 3.2]
// console.log("Naredba i argumenti", command, arg1, arg2);

let expenses;
try {
    expenses = loadExpenses();
} catch (error) {
    console.error('Datoteka expenses.json nije ispravna: ${error.mesage}'); //ne dela ovaj error!!!!!!!!
    process.exit(1);
}
// console.log("Trenutni troškovi", expenses);

switch (command) {
    case "add":
        const amount = Number(arg2);
        if (arg1 === undefined || Number.isNaN(amount)) {
            console.error('Korištenje: add "opis" iznos');
            process.exit(1);
        }

        let newId = 1; 
        if(expenses.length > 0) {
            newId= expenses[expenses.length - 1].id +1;
        }
        expenses.push({ id: newId, description: arg1, amount: amount});
        saveExpenses(expenses); // spremamo troškove
        console.log(`Dodano: ${arg1} (broj ${newId})`);
        break;

    case "list":
        if(expenses.length === 0){
            console.log("Nema troškova.");
        } else {
            /*
            for(let i = 0; i<expenses.length; i++) {
                const expense = expenses[i];
                console.log(`${expense.id}. ${expense.description}: ${expense.amount}`);
            }
            */
           expenses.forEach((expense) => console.log(formatExpense(expense)));
        }
        break;

    case "total":
        let total = 0;
        for(const expense of expenses) {
            total = total + expense.amount;
        }
        console.log(`Ukupno ${total} ${currency}`);
        break;

    default:
        console.error("Nepoznata naredba. Koristi: add, list ili total.");
        process.exit(1);
}