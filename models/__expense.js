const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const expenseSchema = new Schema({
    source: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Expense = model("Expense", expenseSchema);
module.exports = Expense;
