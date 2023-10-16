const express = require("express");
const router = express.Router();

const Journal = require("../models/journal");

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

        res.status(200).send(await Journal.find(filter).sort({ _id: -1 }));
    } catch (error) {
        res.status(400).send("Journal not found");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const data = await Journal.findOne({ _id: req.params.id });
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ message: "Journal not found" });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const newJournal = new Journal({
            title: req.body.title,
            content: req.body.content,
            customerEmail: req.body.customerEmail,
            password: req.body.password,
        });
        await newJournal.save();

        res.status(200).send(newJournal);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const Journal_id = req.params.id;
        const updatedJournal = await Journal.findByIdAndUpdate(
            Journal_id,
            req.body,
            {
                runValidators: true,
                new: true,
            }
        );
        res.status(200).send(updatedJournal);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error._message });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const Journal_id = req.params.id;
        const deletedJournal = await Journal.findByIdAndDelete(Journal_id);
        res.status(200).send(deletedJournal);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

module.exports = router;
