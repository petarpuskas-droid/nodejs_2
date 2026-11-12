import chalk from "chalk";

export const currency = process.env.CURRENCY || "EUR";
// process.env.CURRENCY ? process.env.CURRENCY : "EUR"

export default function formatExpense (expense) {
    const { id, description, amount } = expense;
    return `${id}. ${description}: ${chalk.green(amount)} ${currency}`;
}