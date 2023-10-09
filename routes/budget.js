const express = require("express");
const router = express.Router();

// import model into router
const Budget = require("../models/budget");

const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, async (req, res) => {
    try {
        const { title } = req.query;
        let filter = {};

        if (req.user && req.user.role === "user") {
            filter.customerEmail = req.user.email;
        }

        res.status(200).send(
            await Budget.find().populate("bills").sort({ _id: -1 })
        );
    } catch (error) {
        res.status(400).send({ message: "Failed to update the budget" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const data = await Budget.findOne({ _id: req.params.id });
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ message: "Budget not found" });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const newBudget = new Budget({
            date: req.body.date,
            customerEmail: req.body.customerEmail,
        });
        await newBudget.save();
        res.status(200).send(newBudget);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

module.exports = router;
