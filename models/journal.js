const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const journalSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
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

const Journal = model("Journal", journalSchema);
module.exports = Journal;
