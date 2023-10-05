const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const incomeSchema = new Schema({
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

const Income = model("Income", incomeSchema);
module.exports = Income;
