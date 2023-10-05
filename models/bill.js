const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// const Budget = require("./budget");

const billSchema = new Schema({
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
    model: {
        type: String,
        enum: ["Income", "Expenses"],
        required: true,
    },
    status: {
        type: String,
        default: "Undone",
        enum: ["Undone", "Done"],
    },
});

const Bill = model("Bill", billSchema);
module.exports = Bill;
