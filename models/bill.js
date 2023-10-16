const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Budget = require("./budget");

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
    date: {
        type: Date,
        default: Date.now,
    },
    budgets: { type: Schema.Types.ObjectId, ref: "Budget" },
});

billSchema.post("save", async function () {
    const billID = this._id;
    const budgetID = this.budgets;
    const selectedBudget = await Budget.findById(budgetID);
    selectedBudget.bills.push(billID);
    await selectedBudget.save();
});

const Bill = model("Bill", billSchema);
module.exports = Bill;
