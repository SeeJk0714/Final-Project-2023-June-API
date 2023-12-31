const express = require("express");
const router = express.Router();

const Bill = require("../models/bill");

const authMiddleware = require("../middleware/auth");

router.get("/", async (req, res) => {
    try {
        const { source, category } = req.query;
        let filter = {};
        if (source || category) {
            if (source) {
                filter.source = source;
            }
            if (category) {
                filter.category = category;
            }
        }

        res.status(200).send(
            await Bill.find(filter).populate("budgets").sort({ _id: -1 })
        );
    } catch (error) {
        res.status(400).send("Bill not found");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const data = await Bill.findOne({ _id: req.params.id }).populate(
            "budgets"
        );
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ message: "Bill not found" });
    }
});

router.post("/", async (req, res) => {
    try {
        const newBill = new Bill({
            source: req.body.source,
            category: req.body.category,
            amount: req.body.amount,
            date: req.body.date,
            model: req.body.model,
            status: req.body.status,
            budgets: req.body.budgets,
        });
        await newBill.save();

        res.status(200).send(newBill);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const bill_id = req.params.id;
        const deletedBill = await Bill.findByIdAndDelete(bill_id);
        res.status(200).send(deletedBill);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

module.exports = router;
