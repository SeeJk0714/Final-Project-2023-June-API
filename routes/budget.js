const express = require("express");
const router = express.Router();

// import model into router
const Budget = require("../models/budget");

router.get("/", async (req, res) => {
    try {
        res.status(200).send(await Budget.find().populate("bills"));
    } catch (error) {
        res.status(400).send({ message: "Failed to update the budget" });
    }
});

router.post("/", async (req, res) => {
    try {
        const newBudget = new Budget({
            date: req.body.date,
            totalAmount: req.body.totalAmount,
            bills: req.body.bills,
        });
        await newBudget.save();
        res.status(200).send(newBudget);
    } catch {
        res.status(400).send({ message: error._message });
    }
});

module.exports = router;
