import { Transaction } from "./out/demo.ts";

const transaction: Transaction = {
    time: new Date(),
    value: {
        currency: "EUR",
        amount: 100_00,
    }
}

const encoded = Transaction.encode(transaction).finish();
const decoded = Transaction.decode(encoded);
console.log(decoded);