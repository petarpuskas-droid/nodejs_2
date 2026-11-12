import { log } from "node:console";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const FILE = join(process.cwd(), "expenses.json");

export function loadExpenses() {
    if (!existsSync(FILE)) {
        return[];
    }

    const text = readFileSync(FILE, "utf-8");
    return JSON.parse(text); // deserijalizacija ili parsiranje teksta u "kod"
}

export function saveExpenses(expenses) {
    writeFileSync(FILE, JSON.stringify(expenses, null, 2)); // spremanje, tj. serijalizacija "koda" u tekst
}
