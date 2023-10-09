const express = require("express");
const router = express.Router();

// import model into router
const TodoList = require("../models/todolist");

const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, async (req, res) => {
    try {
        const { title } = req.query;
        let filter = {};

        if (title) {
            if (title) {
                filter.title = title;
            }
        }

        if (req.user && req.user.role === "user") {
            filter.customerEmail = req.user.email;
        }

        res.status(200).send(
            await TodoList.find().populate("lists").sort({ _id: -1 })
        );
    } catch (error) {
        res.status(400).send({ message: "Failed to update the todolist" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const data = await TodoList.findOne({ _id: req.params.id });
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ message: "Product not found" });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const newTodoList = new TodoList({
            title: req.body.title,
            customerEmail: req.body.customerEmail,
        });
        await newTodoList.save();
        res.status(200).send(newTodoList);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const todolist_id = req.params.id;
        const updatedTodoList = await TodoList.findByIdAndUpdate(
            todolist_id,
            req.body,
            {
                runValidators: true,
                new: true,
            }
        );
        res.status(200).send(updatedTodoList);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const TodoList_id = req.params.id;
        const deletedTodoList = await TodoList.findByIdAndDelete(TodoList_id);
        res.status(200).send(deletedTodoList);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

module.exports = router;
