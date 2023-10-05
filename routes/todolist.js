const express = require("express");
const router = express.Router();

// import model into router
const TodoList = require("../models/todolist");

router.get("/", async (req, res) => {
    try {
        res.status(200).send(await TodoList.find().populate("lists"));
    } catch (error) {
        res.status(400).send({ message: "Failed to update the todolist" });
    }
});

router.post("/", async (req, res) => {
    try {
        const newTodoList = new TodoList({
            title: req.body.title,
        });
        await newTodoList.save();
        res.status(200).send(newTodoList);
    } catch {
        res.status(400).send({ message: error._message });
    }
});

module.exports = router;
