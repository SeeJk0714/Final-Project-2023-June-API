const express = require("express");
const router = express.Router();

const Plan = require("../models/plan");

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

        res.status(200).send(await Plan.find(filter).sort({ _id: -1 }));
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

router.post("/", authMiddleware, async (req, res) => {
    try {
        const newPlan = new Plan({
            title: req.body.title,
            content: req.body.content,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            customerEmail: req.body.customerEmail,
        });
        await newPlan.save();

        res.status(200).send(newPlan);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const Plan_id = req.params.id;
        const updatedPlan = await Plan.findByIdAndUpdate(Plan_id, req.body, {
            runValidators: true,
            new: true,
        });
        res.status(200).send(updatedPlan);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error._message });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const Plan_id = req.params.id;
        const deletedPlan = await Plan.findByIdAndDelete(Plan_id);
        res.status(200).send(deletedPlan);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

module.exports = router;
