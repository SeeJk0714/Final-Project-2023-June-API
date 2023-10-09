const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const journalSchema = new Schema({
    customerEmail: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: "Public",
        enum: ["Public", "Private"],
    },
});

const Journal = model("Journal", journalSchema);
module.exports = Journal;
