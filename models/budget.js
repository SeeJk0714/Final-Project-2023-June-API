const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const budgetSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    bills: [
        {
            type: Schema.Types.ObjectId,
            ref: "Bill",
        },
    ],
});

const Budget = model("Budget", budgetSchema);
module.exports = Budget;
