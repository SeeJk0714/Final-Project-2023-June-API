const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const budgetSchema = new Schema({
    customerEmail: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
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
