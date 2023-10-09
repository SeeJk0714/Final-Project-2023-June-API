const express = require("express");
const router = express.Router();

const List = require("../models/list");

const authMiddleware = require("../middleware/auth");

router.get("/", async (req, res) => {
    try {
        const { name, status } = req.query;
        let filter = {};
        if (name || status) {
            if (name) {
                filter.name = name;
            }
            if (status) {
                filter.status = status;
            }
        }

        res.status(200).send(
            await List.find(filter).populate("todolists").sort({ _id: -1 })
        );
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
            status: req.body.status,
            todolists: req.body.todolists,
        });
        await newList.save();

        res.status(200).send(newList);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
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

router.put("/:id/update", authMiddleware, async (req, res) => {
    try {
        const List_id = req.params.id;
        const updatedStatusList = await List.findByIdAndUpdate(
            List_id,
            { status: true },
            {
                new: true,
            }
        );
        res.status(200).send(updatedStatusList);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

router.put("/:id/unupdate", authMiddleware, async (req, res) => {
    try {
        const List_id = req.params.id;
        const unupdateStatusList = await List.findByIdAndUpdate(
            List_id,
            { status: false },
            {
                new: true,
            }
        );
        res.status(200).send(unupdateStatusList);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const List_id = req.params.id;
        const deletedList = await List.findByIdAndDelete(List_id);
        res.status(200).send(deletedList);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

module.exports = router;
