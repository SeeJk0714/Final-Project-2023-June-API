const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const todolistSchema = new Schema({
    customerEmail: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    lists: [
        {
            type: Schema.Types.ObjectId,
            ref: "List",
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

const Todolist = model("Todolist", todolistSchema);
module.exports = Todolist;
