const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Todolist = require("./todolist");

const listSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

// listSchema.post("save", async function () {
//     const listID = this._id;
//     const todolistID = this.todolist;
//     const selectedTodolist = await Todolist.findById(todolistID);
//     selectedTodolist.lists.push(listID);
//     await selectedTodolist.save();
// });

const List = model("List", listSchema);
module.exports = List;
