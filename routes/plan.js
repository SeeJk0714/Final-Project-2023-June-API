const express = require("express");
const router = express.Router();

const Plan = require("../models/plan");

router.get("/", async (req, res) => {
    try {
        const { title } = req.query;
        let filter = {};
        if (title) {
            if (title) {
                filter.title = title;
            }
        }

        res.status(200).send(await Plan.find(filter));
    } catch (error) {
        res.status(400).send("Plan not found");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const data = await Plan.findOne({ _id: req.params.id });
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ message: "Plan not found" });
    }
});

router.post("/", async (req, res) => {
    try {
        const newPlan = new Plan({
            title: req.body.title,
            content: req.body.content,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            createDate: req.body.createDate,
            status: req.body.status,
        });
        await newPlan.save();

        res.status(200).send(newPlan);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const Journal_id = req.params.id;
        const updatedJournal = await Plan.findByIdAndUpdate(
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
        const deletedJournal = await Plan.findByIdAndDelete(Journal_id);
        res.status(200).send(deletedJournal);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

//warning-------------------------
router.put("/:id/complete", async (req, res) => {
    try {
        const Journal_id = req.params.id;
        const completedJournal = await Plan.findByIdAndUpdate(
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
