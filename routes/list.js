const express = require("express");
const TodoList = require("../models/todolist");
const router = express.Router();

const List = require("../models/list");

router.get("/", async (req, res) => {
    try {
        const { name } = req.query;
        let filter = {};
        if (name) {
            if (name) {
                filter.name = name;
            }
        }

        res.status(200).send(await List.find(filter).populate("budget"));
    } catch (error) {
        res.status(400).send("List not found");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const data = await List.findOne({ _id: req.params.id });
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ message: "List not found" });
    }
});

router.post("/", async (req, res) => {
    try {
        const newList = new List({
            name: req.body.name,
        });
        await newList.save();

        res.status(200).send(newList);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const List_id = req.params.id;
        const updatedList = await List.findByIdAndUpdate(List_id, req.body, {
            runValidators: true,
            new: true,
        });
        res.status(200).send(updatedList);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const List_id = req.params.id;
        const deletedList = await List.findByIdAndDelete(List_id);
        res.status(200).send(deletedList);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

module.exports = router;
