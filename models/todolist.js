const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const todolistSchema = new Schema({
    lists: [
        {
            type: Schema.Types.ObjectId,
            ref: "List",
        },
    ],
    title: {
        type: String,
        required: true,
    },
});

const Todolist = model("Todolist", todolistSchema);
module.exports = Todolist;
