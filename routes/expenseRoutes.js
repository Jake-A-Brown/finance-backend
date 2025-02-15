const express = require("express");
const router = express.Router();
const Expenses = require("../models/Expenses");

// Fetch all expenses from MongoDB
router.get("/", async (req, res) => {
    try {
        const expenses = await Expenses.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: "Error fetching expenses" });
    }
});

// Add new expense
router.post("/add", async (req, res) => {
    const { expensename, category, amount, duedate, dateentered, datepaid } = req.body;

    try {
        const newExpense = new Expenses({ expensename, category, amount, duedate, dateentered, datepaid });
        await newExpense.save();
        res.status(201).json({ message: "Expense added successfully", expense: newExpense });
    } catch (error) {
        res.status(500).json({ message: "Error adding expense", error });
    }
});

// DELETE expense from MongoDB
router.delete("/:id", async (req, res) => {
    try {
        const expense = await Expenses.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({ message: "Expense deleted successfully", deletedExpense: expense });
    } catch (err) {
        res.status(500).json({ message: "Error deleting expense", error: err });
    }
});

module.exports = router;