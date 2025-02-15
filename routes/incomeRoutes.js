const express = require("express");
const router = express.Router();
const Income = require("../models/Income");

// Fetch all incomes from MongoDB
router.get("/", async (req, res) => {
    try {
        const incomes = await Income.find();
        res.json(incomes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching income" });
    }
});

// Add new income
router.post("/add", async (req, res) => {
    const { source, amount, date } = req.body;

    try {
        const newIncome = new Income({ source, amount, date });
        await newIncome.save();
        res.status(201).json({ message: "Income added successfully", income: newIncome });
    } catch (error) {
        res.status(500).json({ message: "Error adding income", error });
    }
});

// DELETE income from MongoDB
router.delete("/:id", async (req, res) => {
    try {
        const income = await Income.findByIdAndDelete(req.params.id);
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting income", error: err });
    }
});


module.exports = router;
