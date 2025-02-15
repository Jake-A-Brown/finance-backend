const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    source: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true }
});

module.exports = mongoose.model('Income', IncomeSchema);
