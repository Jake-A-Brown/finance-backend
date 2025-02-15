const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    expensename: { type: String, required: true },
    category:{ type: String, required: true},
    amount: { type: Number, required: true },
    duedate: { type: String, required: true },
    dateentered: { type: String, required: true },
    datepaid: { type: String, required: true }
});

module.exports = mongoose.model('Expenses', ExpenseSchema);