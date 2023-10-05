const express = require("express");
const router = express.Router();

const Journal = require("../models/journal");

router.get("/", async (req, res) => {
    try {
        const { title } = req.query;
        let filter = {};
        if (title) {
            if (title) {
                filter.title = title;
            }
        }

        res.status(200).send(await Journal.find(filter));
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

router.post("/", async (req, res) => {
    try {
        const newJournal = new Journal({
            title: req.body.title,
            content: req.body.content,
            createDate: req.body.createDate,
            status: req.body.status,
        });
        await newJournal.save();

        res.status(200).send(newJournal);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

router.put("/:id", async (req, res) => {
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
        res.status(400).send({ message: error._message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const Journal_id = req.params.id;
        const deletedJournal = await Journal.findByIdAndDelete(Journal_id);
        res.status(200).send(deletedJournal);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

//warning-------------------------
router.put("/:id/complete", async (req, res) => {
    try {
        const Journal_id = req.params.id;
        const completedJournal = await Journal.findByIdAndUpdate(
            Journal_id,
            {
                status: "Private",
            },
            {
                new: true,
            }
        );
        res.status(200).send(completedJournal);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

module.exports = router;
