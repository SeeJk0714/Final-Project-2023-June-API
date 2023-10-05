const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const planSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Private"],
    },
});

const Plan = model("Plan", planSchema);
module.exports = Plan;
